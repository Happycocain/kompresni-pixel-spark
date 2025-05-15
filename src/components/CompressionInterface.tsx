
import React from 'react';
import CompressionHeader from './compression/CompressionHeader';
import HistoryExporter from './compression/HistoryExporter';
import CompressionSettings from './compression/CompressionSettings';
import CompressionMainContent from './compression/CompressionMainContent';
import VisualizationPanel from './compression/VisualizationPanel';
import CompressionLogic from './compression/CompressionLogic';

const CompressionInterface: React.FC = () => {
  return (
    <CompressionLogic>
      {({
        inputText,
        outputText,
        compressMode,
        useAI,
        showInsights,
        selectedIndustry,
        fileType,
        algorithmInput,
        compressResult,
        history,
        visualizationMode,
        setInputText,
        setUseAI,
        setShowInsights,
        setFileType,
        setAlgorithmInput,
        setVisualizationMode,
        handleInputChange,
        handleAlgorithmInputChange,
        handleFileTypeChange,
        toggleMode,
        saveToHistory,
        loadFromHistory,
        handleSelectIndustry,
        handleSelectProfile,
        handleImportHistory
      }) => (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <CompressionHeader />
            <div className="flex items-center space-x-4">
              <CompressionSettings 
                useAI={useAI}
                setUseAI={setUseAI}
                selectedIndustry={selectedIndustry}
                handleSelectIndustry={handleSelectIndustry}
              />
              
              <HistoryExporter 
                history={history}
                onImport={handleImportHistory}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CompressionMainContent 
              inputText={inputText}
              outputText={outputText}
              compressMode={compressMode}
              fileType={fileType}
              algorithmInput={algorithmInput}
              history={history}
              useAI={useAI}
              showInsights={showInsights}
              setShowInsights={setShowInsights}
              compressResult={compressResult}
              onInputChange={handleInputChange}
              onToggleMode={toggleMode}
              onSave={saveToHistory}
              onSelectFromHistory={loadFromHistory}
              onFileTypeChange={handleFileTypeChange}
              onAlgorithmInputChange={handleAlgorithmInputChange}
            />
            
            <VisualizationPanel 
              visualizationMode={visualizationMode}
              setVisualizationMode={setVisualizationMode}
              compressMode={compressMode}
              inputText={inputText}
              outputText={outputText}
              compressResult={compressResult}
              useAI={useAI}
              selectedIndustry={selectedIndustry}
              history={history}
              onSelectIndustry={handleSelectIndustry}
              onSelectProfile={handleSelectProfile}
            />
          </div>
        </div>
      )}
    </CompressionLogic>
  );
};

export default CompressionInterface;
