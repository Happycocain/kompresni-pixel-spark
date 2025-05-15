
import React from 'react';
import CompressionVisualizer from "@/components/CompressionVisualizer";
import ExtendedVisualization from "@/components/compression/ExtendedVisualization";
import IndustrySelector from './IndustrySelector';
import UserProfileManager from './UserProfileManager';
import VisualizationSelector from './VisualizationSelector';
import type { CompressionRecord } from "@/components/CompressionHistory";

interface VisualizationPanelProps {
  visualizationMode: 'basic' | 'extended';
  setVisualizationMode: (mode: 'basic' | 'extended') => void;
  compressMode: boolean;
  inputText: string;
  outputText: string;
  compressResult: {
    ratio: number;
    steps: any[];
    insights?: any;
  };
  useAI: boolean;
  selectedIndustry: string | null;
  history: CompressionRecord[];
  onSelectIndustry: (industry: string) => void;
  onSelectProfile: (profile: any) => void;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  visualizationMode,
  setVisualizationMode,
  compressMode,
  inputText,
  outputText,
  compressResult,
  useAI,
  selectedIndustry,
  history,
  onSelectIndustry,
  onSelectProfile
}) => {
  return (
    <div className="space-y-4">
      <VisualizationSelector 
        visualizationMode={visualizationMode} 
        setVisualizationMode={setVisualizationMode} 
      />
      
      {visualizationMode === 'basic' ? (
        <CompressionVisualizer
          originalSize={compressMode ? inputText.length : outputText.length}
          compressedSize={compressMode ? outputText.length : inputText.length}
          ratio={compressResult.ratio}
          steps={compressResult.steps}
        />
      ) : (
        <ExtendedVisualization
          originalSize={compressMode ? inputText.length : outputText.length}
          compressedSize={compressMode ? outputText.length : inputText.length}
          ratio={compressResult.ratio}
          steps={compressResult.steps}
          history={history.map(record => ({
            originalSize: record.originalSize,
            compressedSize: record.compressedSize,
            ratio: record.ratio,
            timestamp: record.timestamp
          }))}
        />
      )}
      
      {useAI && (
        <IndustrySelector selectedIndustry={selectedIndustry} onSelectIndustry={onSelectIndustry} />
      )}
      
      {/* User profile manager */}
      <UserProfileManager onSelectProfile={onSelectProfile} />
    </div>
  );
};

export default VisualizationPanel;
