
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, History } from 'lucide-react';
import CompressionForm from './CompressionForm';
import CompressionHistory from "@/components/CompressionHistory";
import type { CompressionRecord } from "@/components/CompressionHistory";

interface CompressionTabsProps {
  inputText: string;
  outputText: string;
  compressMode: boolean;
  history: CompressionRecord[];
  onInputChange: (text: string) => void;
  onToggleMode: () => void;
  onSave: () => void;
  onSelectFromHistory: (record: CompressionRecord) => void;
}

const CompressionTabs: React.FC<CompressionTabsProps> = ({
  inputText,
  outputText,
  compressMode,
  history,
  onInputChange,
  onToggleMode,
  onSave,
  onSelectFromHistory,
}) => {
  return (
    <Tabs defaultValue="interface" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="interface" className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          Compression Tool
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          History
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="interface">
        <CompressionForm 
          inputText={inputText}
          outputText={outputText}
          compressMode={compressMode}
          onInputChange={onInputChange}
          onToggleMode={onToggleMode}
          onSave={onSave}
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
