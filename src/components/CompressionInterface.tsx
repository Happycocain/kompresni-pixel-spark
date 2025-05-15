
import React, { useState, useEffect } from 'react';
import { compressText, decompressText } from "@/utils/compressionAlgorithm";
import { aiCompressText } from "@/utils/aiEnhancedCompression";
import CompressionVisualizer from "@/components/CompressionVisualizer";
import ExtendedVisualization from "@/components/compression/ExtendedVisualization";
import CompressionInsights from "@/components/compression/CompressionInsights";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { CompressionRecord } from "@/components/CompressionHistory";
import CompressionHeader from './compression/CompressionHeader';
import CompressionTabs from './compression/CompressionTabs';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';
import HistoryExporter from './compression/HistoryExporter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfileManager from './compression/UserProfileManager';
import { ChartLine, BarChart } from "lucide-react";
import { FileType } from './compression/FileTypeSelector';

const CompressionInterface: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [compressMode, setCompressMode] = useState<boolean>(true);
  const [useAI, setUseAI] = useState<boolean>(true);
  const [showInsights, setShowInsights] = useState<boolean>(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType>('text');
  const [algorithmInput, setAlgorithmInput] = useState<string>("");
  const [compressResult, setCompressResult] = useState<{
    ratio: number;
    steps: any[];
    insights?: any;
  }>({ ratio: 0, steps: [] });
  const [history, setHistory] = useState<CompressionRecord[]>(() => {
    const savedHistory = localStorage.getItem('compressionHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [visualizationMode, setVisualizationMode] = useState<'basic' | 'extended'>('basic');
  
  const { language } = useSettings();
  const { t } = useTranslation(language);
  const { toast } = useToast();
  
  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('compressionHistory', JSON.stringify(history));
  }, [history]);
  
  // Process text when input changes or mode changes
  useEffect(() => {
    if (inputText.trim() === "") {
      setOutputText("");
      setCompressResult({ ratio: 0, steps: [] });
      return;
    }
    
    if (compressMode) {
      if (useAI) {
        const result = aiCompressText(inputText, { 
          industry: selectedIndustry as any,
          fileType: fileType,
          algorithmParams: algorithmInput,
          learningEnabled: true,
          deepAnalysis: true
        });
        setOutputText(result.compressed);
        setCompressResult({ 
          ratio: result.ratio, 
          steps: result.steps,
          insights: result.insights 
        });
      } else {
        const result = compressText(inputText, {
          fileType: fileType,
          algorithmParams: algorithmInput
        });
        setOutputText(result.compressed);
        setCompressResult({ ratio: result.ratio, steps: result.steps });
      }
    } else {
      try {
        const decompressed = decompressText(inputText, {
          fileType: fileType,
          algorithmParams: algorithmInput
        });
        setOutputText(decompressed);
        // Reset visualization data in decompress mode
        setCompressResult({ ratio: 0, steps: [] });
      } catch (error) {
        console.error("Decompression error:", error);
        setOutputText("Error decompressing text");
      }
    }
  }, [inputText, compressMode, useAI, selectedIndustry, fileType, algorithmInput]);
  
  const handleInputChange = (text: string) => {
    setInputText(text);
  };
  
  const handleAlgorithmInputChange = (input: string) => {
    setAlgorithmInput(input);
  };
  
  const handleFileTypeChange = (type: FileType) => {
    setFileType(type);
    toast({
      title: t('fileTypeChanged'),
      description: `${t('selectedFileType')}: ${t(`fileTypes.${type}`)}`,
    });
  };
  
  // Save to history
  const saveToHistory = () => {
    if (inputText.trim() === "" || outputText.trim() === "") return;
    
    const record: CompressionRecord = {
      id: Date.now().toString(),
      originalText: compressMode ? inputText : outputText,
      compressedText: compressMode ? outputText : inputText,
      originalSize: compressMode ? inputText.length : outputText.length,
      compressedSize: compressMode ? outputText.length : inputText.length,
      ratio: compressResult.ratio,
      timestamp: Date.now(),
      fileType: fileType,
      algorithmInput: algorithmInput,
    };
    
    setHistory(prev => [...prev, record]);
    
    toast({
      title: t('compressionSavedToHistory'),
      description: `${t('achieved')} ${compressResult.ratio}% ${t('compressionRatio')}`,
    });
  };
  
  // Load from history
  const loadFromHistory = (record: CompressionRecord) => {
    if (compressMode) {
      setInputText(record.originalText);
      setOutputText(record.compressedText);
    } else {
      setInputText(record.compressedText);
      setOutputText(record.originalText);
    }
    
    // Set saved file type and algorithm input if they exist
    if (record.fileType) {
      setFileType(record.fileType);
    }
    
    if (record.algorithmInput) {
      setAlgorithmInput(record.algorithmInput);
    }
    
    setCompressResult({
      ratio: record.ratio,
      steps: [], // Steps aren't stored in history for simplicity
    });
    
    toast({
      title: t('loadedFromHistory'),
      description: t('textLoadedFromHistory'),
    });
  };
  
  // Toggle compression/decompression mode
  const toggleMode = () => {
    setCompressMode(!compressMode);
    // Swap input and output when changing modes
    setInputText(outputText);
    setOutputText(inputText);
  };
  
  // Select industry profile
  const handleSelectIndustry = (industry: string | null) => {
    setSelectedIndustry(industry);
    if (industry) {
      toast({
        title: `${t(industry as any)} ${t('profileActivated')}`,
        description: t('compressionOptimizedForIndustry'),
      });
    } else {
      toast({
        title: t('generalProfileActivated'),
        description: t('usingGeneralCompression'),
      });
    }
  };
  
  // Import history
  const handleImportHistory = (importedHistory: CompressionRecord[]) => {
    setHistory([...history, ...importedHistory]);
  };
  
  // Handle custom profile selection
  const handleSelectProfile = (profile: any) => {
    toast({
      title: `${profile.name} ${t('profileSelected')}`,
      description: `${t('usingCustomProfile')} ${Object.keys(profile.patterns).length} ${t('patterns')}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CompressionHeader />
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="ai-mode"
              checked={useAI}
              onCheckedChange={setUseAI}
            />
            <Label htmlFor="ai-mode" className="cursor-pointer flex items-center gap-1">
              <span className={useAI ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}>{t('aiCompression')}</span>
              {useAI && (
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-1.5 py-0.5 rounded">PRO</span>
              )}
            </Label>
          </div>
          
          {useAI && selectedIndustry && (
            <span className="bg-blue-100 border border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700/30 dark:text-blue-300 text-xs px-2 py-1 rounded-full flex items-center">
              {selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1)} {t('profile')}
              <button 
                className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                onClick={() => handleSelectIndustry(null)}
              >
                ×
              </button>
            </span>
          )}
          
          <HistoryExporter 
            history={history}
            onImport={handleImportHistory}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CompressionTabs
            inputText={inputText}
            outputText={outputText}
            compressMode={compressMode}
            fileType={fileType}
            algorithmInput={algorithmInput}
            history={history}
            onInputChange={handleInputChange}
            onToggleMode={toggleMode}
            onSave={saveToHistory}
            onSelectFromHistory={loadFromHistory}
            onFileTypeChange={handleFileTypeChange}
            onAlgorithmInputChange={handleAlgorithmInputChange}
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
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Tabs value={visualizationMode} onValueChange={(v) => setVisualizationMode(v as 'basic' | 'extended')}>
              <TabsList className="mb-2">
                <TabsTrigger value="basic" className="flex items-center gap-1">
                  <BarChart className="h-3 w-3" />
                  {t('basic')}
                </TabsTrigger>
                <TabsTrigger value="extended" className="flex items-center gap-1">
                  <ChartLine className="h-3 w-3" />
                  {t('extended')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
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
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium mb-2">{t('selectIndustryProfile')}:</div>
              <div className="grid grid-cols-2 gap-2">
                {["medical", "finance", "tech", "legal"].map((industry) => (
                  <button
                    key={industry}
                    className={`p-2 text-xs rounded-md border ${
                      selectedIndustry === industry
                        ? "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200"
                        : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => handleSelectIndustry(industry)}
                  >
                    {t(industry as any)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* User profile manager */}
          <UserProfileManager onSelectProfile={handleSelectProfile} />
        </div>
      </div>
    </div>
  );
};

export default CompressionInterface;
