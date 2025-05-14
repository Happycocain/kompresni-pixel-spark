
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Save } from 'lucide-react';

interface BatchControlPanelProps {
  onUpload: () => void;
  onProcess: () => void;
  onDownloadAll: () => void;
  filesCount: number;
  isProcessing: boolean;
  hasCompletedFiles: boolean;
}

const BatchControlPanel: React.FC<BatchControlPanelProps> = ({
  onUpload,
  onProcess,
  onDownloadAll,
  filesCount,
  isProcessing,
  hasCompletedFiles,
}) => {
  return (
    <div className="flex justify-end items-center gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
      <div className="flex-1">
        <div className="text-xs text-gray-500">
          Podporujeme kompresní algoritmy optimalizované pro data velkých společností
        </div>
      </div>
      <Button
        variant="outline"
        onClick={onUpload}
        disabled={isProcessing}
      >
        <Upload className="w-4 h-4 mr-2" />
        Nahrát soubory
      </Button>
      
      <Button 
        onClick={onProcess}
        disabled={filesCount === 0 || isProcessing}
      >
        Zpracovat {filesCount} souborů
      </Button>
      
      <Button
        variant="outline"
        onClick={onDownloadAll}
        disabled={!hasCompletedFiles}
      >
        <Save className="w-4 h-4 mr-2" />
        Stáhnout vše
      </Button>
    </div>
  );
};

export default BatchControlPanel;
