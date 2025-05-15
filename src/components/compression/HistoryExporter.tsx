
import React from 'react';
import { FileArchive, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';
import { useToast } from "@/components/ui/use-toast";
import type { CompressionRecord } from "@/components/CompressionHistory";

interface HistoryExporterProps {
  history: CompressionRecord[];
  onImport: (records: CompressionRecord[]) => void;
}

const HistoryExporter: React.FC<HistoryExporterProps> = ({ history, onImport }) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleExport = () => {
    if (history.length === 0) {
      toast({
        title: 'Error',
        description: 'No history to export',
      });
      return;
    }
    
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `compression-history-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: 'Success',
      description: 'History exported successfully',
    });
  };
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedHistory = JSON.parse(e.target?.result as string) as CompressionRecord[];
        onImport(importedHistory);
        
        toast({
          title: 'Success',
          description: `${importedHistory.length} records imported successfully`,
        });
        
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to import history: Invalid format',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExport}
        disabled={history.length === 0}
      >
        <FileArchive className="h-4 w-4 mr-1" />
        {t('exportHistory')}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleImportClick}
      >
        <Upload className="h-4 w-4 mr-1" />
        {t('importHistory')}
      </Button>
      
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        accept=".json"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default HistoryExporter;
