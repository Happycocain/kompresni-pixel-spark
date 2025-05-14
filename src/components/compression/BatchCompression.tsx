
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { processBatch } from '@/api/compressionApi';
import { Upload, FileX, Save, Database, Building } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import BatchFileTable from './BatchFileTable';
import BatchProcessingHeader from './BatchProcessingHeader';
import BatchControlPanel from './BatchControlPanel';
import { BatchFile } from '@/types/compression';

const BatchCompression: React.FC = () => {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    
    const filePromises: Promise<BatchFile>[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Zvýšení maximální velikosti souboru na 5TB
      const maxSize = 5 * 1024 * 1024 * 1024 * 1024; // 5TB v bajtech
      if (file.size > maxSize) {
        toast({
          title: "Soubor je příliš velký",
          description: `${file.name} překračuje maximální velikost 5TB`,
          variant: "destructive",
        });
        continue;
      }
      
      // Varování pro velmi velké soubory
      if (file.size > 500 * 1024 * 1024 * 1024) { // 500GB
        toast({
          title: "Velmi velký soubor detekován",
          description: `${file.name} je větší než 500GB. Doporučujeme použít enterprise kompresi pro lepší výkon.`,
          variant: "default",
        });
      }
      
      const filePromise = new Promise<BatchFile>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          resolve({
            id: `file-${Date.now()}-${i}`,
            name: file.name,
            content,
            size: file.size,
            status: 'pending'
          });
        };
        
        // Pro velmi velké soubory zobrazíme info o průběhu načítání
        reader.onprogress = (event) => {
          if (event.lengthComputable && file.size > 50 * 1024 * 1024) { // 50MB
            const percentLoaded = Math.round((event.loaded / event.total) * 100);
            toast({
              title: "Načítání souboru",
              description: `${file.name}: ${percentLoaded}% načteno`,
            });
          }
        };
        
        reader.onerror = () => {
          toast({
            title: "Chyba při načítání",
            description: `Soubor ${file.name} se nepodařilo načíst`,
            variant: "destructive",
          });
        };
        
        // Pro velmi velké soubory zobrazíme varování
        if (file.size > 5 * 1024 * 1024) { // 5MB
          toast({
            title: "Načítání velkého souboru",
            description: `Načítání souboru ${file.name} (${formatFileSize(file.size)}) může trvat několik sekund`,
          });
        }
        
        reader.readAsText(file);
      });
      
      filePromises.push(filePromise);
    }
    
    Promise.all(filePromises).then((newFiles) => {
      setFiles(prev => [...prev, ...newFiles]);
    });
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };
  
  const processFiles = async () => {
    if (files.length === 0 || isProcessing) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Označení všech souborů jako zpracovávané
    setFiles(prev => prev.map(file => ({ ...file, status: 'processing' })));
    
    try {
      // Optimalizace zpracování souborů po dávkách
      const batchSize = 5; // Zpracování po 5 souborech najednou
      const totalFiles = files.length;
      
      for (let i = 0; i < totalFiles; i += batchSize) {
        const batch = files.slice(i, i + batchSize);
        const contents = batch.map(file => file.content);
        
        const batchResults = processBatch(contents);
        
        // Aktualizace výsledků
        setFiles(prev => {
          const updated = [...prev];
          batch.forEach((file, index) => {
            const fileIndex = prev.findIndex(f => f.id === file.id);
            if (fileIndex !== -1 && batchResults.results[index]) {
              const result = batchResults.results[index];
              updated[fileIndex] = {
                ...updated[fileIndex],
                compressed: result.compressed || '',
                compressedSize: result.compressedSize,
                ratio: result.ratio,
                status: result.success ? 'completed' : 'error',
                error: result.error
              };
            }
          });
          return updated;
        });
        
        // Aktualizace progresu
        const newProgress = Math.min(100, Math.round(((i + batch.length) / totalFiles) * 100));
        setProgress(newProgress);
        
        // Malá pauza mezi dávkami, aby se UI mohlo aktualizovat
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      toast({
        title: "Zpracování dokončeno",
        description: `Úspěšně zpracováno ${files.filter(f => f.status === 'completed').length} z ${files.length} souborů`,
      });
    } catch (error) {
      console.error("Chyba při zpracování dávek:", error);
      toast({
        title: "Chyba při zpracování",
        description: "Došlo k chybě během zpracování souborů",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };
  
  const downloadAll = () => {
    const processedFiles = files.filter(file => file.status === 'completed' && file.compressed);
    if (processedFiles.length === 0) return;
    
    // Postupné stahování souborů s pauzou mezi nimi
    processedFiles.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.compressed!], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name}.compressed`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, index * 500); // 500ms pauza mezi stahováním souborů
    });
    
    toast({
      title: "Stahování zahájeno",
      description: `Zahajuji postupné stahování ${processedFiles.length} souborů`,
    });
  };
  
  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB`;
    }
  };
  
  return (
    <div className="space-y-6">
      <BatchProcessingHeader />
      
      <BatchControlPanel 
        onUpload={() => fileInputRef.current?.click()}
        onProcess={processFiles}
        onDownloadAll={downloadAll}
        filesCount={files.length}
        isProcessing={isProcessing}
        hasCompletedFiles={files.some(f => f.status === 'completed')}
      />
      
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        accept="*/*"
      />
      
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-right">{progress}% dokončeno</p>
        </div>
      )}
      
      <BatchFileTable 
        files={files} 
        onRemoveFile={removeFile}
        isProcessing={isProcessing}
        formatFileSize={formatFileSize}
      />
    </div>
  );
};

export default BatchCompression;
