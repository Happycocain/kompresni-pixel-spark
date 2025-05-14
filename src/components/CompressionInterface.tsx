
import React, { useState, useEffect } from 'react';
import { compressText, decompressText } from "@/utils/compressionAlgorithm";
import CompressionVisualizer from "@/components/CompressionVisualizer";
import { useToast } from "@/components/ui/use-toast";
import type { CompressionRecord } from "@/components/CompressionHistory";
import CompressionHeader from './compression/CompressionHeader';
import CompressionTabs from './compression/CompressionTabs';

const CompressionInterface: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [compressMode, setCompressMode] = useState<boolean>(true);
  const [compressResult, setCompressResult] = useState<{
    ratio: number;
    steps: any[];
  }>({ ratio: 0, steps: [] });
  const [history, setHistory] = useState<CompressionRecord[]>([]);
  const { toast } = useToast();
  
  // Process text when input changes or mode changes
  useEffect(() => {
    if (inputText.trim() === "") {
      setOutputText("");
      setCompressResult({ ratio: 0, steps: [] });
      return;
    }
    
    if (compressMode) {
      const result = compressText(inputText);
      setOutputText(result.compressed);
      setCompressResult({ ratio: result.ratio, steps: result.steps });
    } else {
      try {
        const decompressed = decompressText(inputText);
        setOutputText(decompressed);
        // Reset visualization data in decompress mode
        setCompressResult({ ratio: 0, steps: [] });
      } catch (error) {
        console.error("Decompression error:", error);
        setOutputText("Error decompressing text");
      }
    }
  }, [inputText, compressMode]);
  
  const handleInputChange = (text: string) => {
    setInputText(text);
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
    };
    
    setHistory(prev => [...prev, record]);
    
    toast({
      title: "Compression saved to history",
      description: `Achieved ${compressResult.ratio}% compression ratio`,
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
    
    setCompressResult({
      ratio: record.ratio,
      steps: [], // Steps aren't stored in history for simplicity
    });
    
    toast({
      title: "Loaded from history",
      description: "Text loaded from history record",
    });
  };
  
  // Toggle compression/decompression mode
  const toggleMode = () => {
    setCompressMode(!compressMode);
    // Swap input and output when changing modes
    setInputText(outputText);
    setOutputText(inputText);
  };
  
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <CompressionHeader />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CompressionTabs
            inputText={inputText}
            outputText={outputText}
            compressMode={compressMode}
            history={history}
            onInputChange={handleInputChange}
            onToggleMode={toggleMode}
            onSave={saveToHistory}
            onSelectFromHistory={loadFromHistory}
          />
        </div>
        
        <div>
          <CompressionVisualizer
            originalSize={compressMode ? inputText.length : outputText.length}
            compressedSize={compressMode ? outputText.length : inputText.length}
            ratio={compressResult.ratio}
            steps={compressResult.steps}
          />
        </div>
      </div>
    </div>
  );
};

export default CompressionInterface;
