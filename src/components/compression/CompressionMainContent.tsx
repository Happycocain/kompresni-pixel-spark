
import React from 'react';
import CompressionTabs from './CompressionTabs';
import CompressionInsights from './CompressionInsights';
import type { CompressionRecord } from "@/components/CompressionHistory";
import { FileType } from './FileTypeSelector';

interface CompressionMainContentProps {
  inputText: string;
  outputText: string;
  compressMode: boolean;
  fileType: FileType;
  algorithmInput: string;
  history: CompressionRecord[];
  useAI: boolean;
  showInsights: boolean;
  setShowInsights: (show: boolean) => void;
  compressResult: {
    ratio: number;
    steps: any[];
    insights?: any;
  };
  onInputChange: (text: string) => void;
  onToggleMode: () => void;
  onSave: () => void;
  onSelectFromHistory: (record: CompressionRecord) => void;
  onFileTypeChange: (type: FileType) => void;
  onAlgorithmInputChange: (input: string) => void;
}

const CompressionMainContent: React.FC<CompressionMainContentProps> = ({
  inputText,
  outputText,
  compressMode,
  fileType,
  algorithmInput,
  history,
  useAI,
  showInsights,
  setShowInsights,
  compressResult,
  onInputChange,
  onToggleMode,
  onSave,
  onSelectFromHistory,
  onFileTypeChange,
  onAlgorithmInputChange,
}) => {
  return (
    <div className="lg:col-span-2">
      <CompressionTabs
        inputText={inputText}
        outputText={outputText}
        compressMode={compressMode}
        fileType={fileType}
        algorithmInput={algorithmInput}
        history={history}
        onInputChange={onInputChange}
        onToggleMode={onToggleMode}
        onSave={onSave}
        onSelectFromHistory={onSelectFromHistory}
        onFileTypeChange={onFileTypeChange}
        onAlgorithmInputChange={onAlgorithmInputChange}
      />
      
      {useAI && (
        <div className="mt-6">
          <CompressionInsights 
            isVisible={showInsights}
            toggleVisibility={() => setShowInsights(!showInsights)}
            originalSize={compressMode ? inputText.length : outputText.length}
            compressedSize={compressMode ? outputText.length : inputText.length}
            ratio={compressResult.ratio}
            insights={compressResult.insights}
            steps={compressResult.steps}
          />
        </div>
      )}
    </div>
  );
};

export default CompressionMainContent;
