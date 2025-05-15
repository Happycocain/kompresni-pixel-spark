
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, History } from 'lucide-react';
import CompressionForm from './CompressionForm';
import CompressionHistory from "@/components/CompressionHistory";
import type { CompressionRecord } from "@/components/CompressionHistory";
import { FileType } from './FileTypeSelector';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

interface CompressionTabsProps {
  inputText: string;
  outputText: string;
  compressMode: boolean;
  fileType: FileType;
  algorithmInput: string;
  history: CompressionRecord[];
  onInputChange: (text: string) => void;
  onToggleMode: () => void;
  onSave: () => void;
  onSelectFromHistory: (record: CompressionRecord) => void;
  onFileTypeChange: (type: FileType) => void;
  onAlgorithmInputChange: (input: string) => void;
}

const CompressionTabs: React.FC<CompressionTabsProps> = ({
  inputText,
  outputText,
  compressMode,
  fileType,
  algorithmInput,
  history,
  onInputChange,
  onToggleMode,
  onSave,
  onSelectFromHistory,
  onFileTypeChange,
  onAlgorithmInputChange,
}) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  
  return (
    <Tabs defaultValue="interface" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="interface" className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          {t('compressionTool')}
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          {t('history')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="interface">
        <CompressionForm 
          inputText={inputText}
          outputText={outputText}
          compressMode={compressMode}
          fileType={fileType}
          algorithmInput={algorithmInput}
          onInputChange={onInputChange}
          onToggleMode={onToggleMode}
          onSave={onSave}
          onFileTypeChange={onFileTypeChange}
          onAlgorithmInputChange={onAlgorithmInputChange}
        />
      </TabsContent>
      
      <TabsContent value="history">
        <CompressionHistory 
          history={history} 
          onSelect={onSelectFromHistory} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default CompressionTabs;
