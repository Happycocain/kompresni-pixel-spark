
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { processBatch } from '@/api/compressionApi';
import { FileUpload, FileX, Save } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface BatchFile {
  id: string;
  name: string;
  content: string;
  size: number;
  compressed?: string;
  compressedSize?: number;
  ratio?: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

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
      
      // Kontrola velikosti souboru (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Soubor je příliš velký",
          description: `${file.name} překračuje maximální velikost 5MB`,
          variant: "destructive",
        });
        continue;
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
      // Zpracování souborů po dávkách
      const batchSize = 5;
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
    
    // Vytvoření ZIP archivu by vyžadovalo dodatečnou knihovnu
    // Pro jednoduchost stáhneme soubory jednotlivě
    processedFiles.forEach(file => {
      const blob = new Blob([file.compressed!], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name}.compressed`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
    
    toast({
      title: "Stahování zahájeno",
      description: `Stahování ${processedFiles.length} souborů`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Dávkové zpracování</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            <FileUpload className="w-4 h-4 mr-2" />
            Nahrát soubory
          </Button>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            accept=".txt,.json,.xml,.csv,text/plain,application/json,application/xml,text/csv"
          />
          
          <Button 
            onClick={processFiles}
            disabled={files.length === 0 || isProcessing}
          >
            Zpracovat {files.length} souborů
          </Button>
          
          <Button
            variant="outline"
            onClick={downloadAll}
            disabled={!files.some(f => f.status === 'completed')}
          >
            <Save className="w-4 h-4 mr-2" />
            Stáhnout vše
          </Button>
        </div>
      </div>
      
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-right">{progress}% dokončeno</p>
        </div>
      )}
      
      {files.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Název souboru</th>
                <th className="px-4 py-2 text-right">Původní velikost</th>
                <th className="px-4 py-2 text-right">Komprimovaná velikost</th>
                <th className="px-4 py-2 text-right">Kompresní poměr</th>
                <th className="px-4 py-2 text-center">Stav</th>
                <th className="px-4 py-2 text-center">Akce</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-t">
                  <td className="px-4 py-2">{file.name}</td>
                  <td className="px-4 py-2 text-right">{(file.size / 1024).toFixed(2)} KB</td>
                  <td className="px-4 py-2 text-right">
                    {file.compressedSize 
                      ? `${(file.compressedSize / 1024).toFixed(2)} KB` 
                      : '-'}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {file.ratio 
                      ? <span className={file.ratio > 0 ? "text-green-500" : "text-red-500"}>
                          {file.ratio.toFixed(2)}%
                        </span> 
                      : '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {file.status === 'pending' && <span className="text-gray-500">Čeká</span>}
                    {file.status === 'processing' && <span className="text-blue-500">Zpracovává se</span>}
                    {file.status === 'completed' && <span className="text-green-500">Hotovo</span>}
                    {file.status === 'error' && (
                      <span className="text-red-500" title={file.error}>Chyba</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      disabled={isProcessing}
                    >
                      <FileX className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
          <p className="text-gray-500">Nahrajte soubory pro dávkové zpracování</p>
        </div>
      )}
    </div>
  );
};

export default BatchCompression;
