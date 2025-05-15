
import React, { useState, useEffect } from 'react';
import { compressText, decompressText } from "@/utils/compressionAlgorithm";
import { aiCompressText } from "@/utils/aiEnhancedCompression";
import { useToast } from "@/components/ui/use-toast";
import type { CompressionRecord } from "@/components/CompressionHistory";
import { FileType } from './FileTypeSelector';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

interface CompressionLogicProps {
  children: (props: {
    inputText: string;
    outputText: string;
    compressMode: boolean;
    useAI: boolean;
    showInsights: boolean;
    selectedIndustry: string | null;
    fileType: FileType;
    algorithmInput: string;
    compressResult: {
      ratio: number;
      steps: any[];
      insights?: any;
    };
    history: CompressionRecord[];
    visualizationMode: 'basic' | 'extended';
    setInputText: (text: string) => void;
    setUseAI: (useAI: boolean) => void;
    setShowInsights: (show: boolean) => void;
    setFileType: (type: FileType) => void;
    setAlgorithmInput: (input: string) => void;
    setVisualizationMode: (mode: 'basic' | 'extended') => void;
    handleInputChange: (text: string) => void;
    handleAlgorithmInputChange: (input: string) => void;
    handleFileTypeChange: (type: FileType) => void;
    toggleMode: () => void;
    saveToHistory: () => void;
    loadFromHistory: (record: CompressionRecord) => void;
    handleSelectIndustry: (industry: string | null) => void;
    handleSelectProfile: (profile: any) => void;
    handleImportHistory: (importedHistory: CompressionRecord[]) => void;
  }) => React.ReactNode;
}

const CompressionLogic: React.FC<CompressionLogicProps> = ({ children }) => {
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
      description: `${t('selectedFileType')}: ${t(`fileTypes.${type}` as any)}`,
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

  return children({
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
  });
};

export default CompressionLogic;
