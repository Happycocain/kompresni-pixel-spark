
import React, { useState, useEffect } from 'react';
import { compressText, decompressText } from "@/utils/compressionAlgorithm";
import { aiCompressText } from "@/utils/aiEnhancedCompression";
import CompressionVisualizer from "@/components/CompressionVisualizer";
import CompressionInsights from "@/components/compression/CompressionInsights";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { CompressionRecord } from "@/components/CompressionHistory";
import CompressionHeader from './compression/CompressionHeader';
import CompressionTabs from './compression/CompressionTabs';

const CompressionInterface: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [compressMode, setCompressMode] = useState<boolean>(true);
  const [useAI, setUseAI] = useState<boolean>(true);
  const [showInsights, setShowInsights] = useState<boolean>(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [compressResult, setCompressResult] = useState<{
    ratio: number;
    steps: any[];
    insights?: any;
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
      if (useAI) {
        const result = aiCompressText(inputText, { 
          industry: selectedIndustry as any,
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
        const result = compressText(inputText);
        setOutputText(result.compressed);
        setCompressResult({ ratio: result.ratio, steps: result.steps });
      }
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
  }, [inputText, compressMode, useAI, selectedIndustry]);
  
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
  
  // Select industry profile
  const handleSelectIndustry = (industry: string | null) => {
    setSelectedIndustry(industry);
    toast({
      title: industry ? `${industry} profile activated` : "General profile activated",
      description: industry ? "Compression optimized for your industry" : "Using general compression",
    });
  };
  
  return (
    <div className="container mx-auto space-y-6 py-6">
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
              <span className={useAI ? "text-purple-400" : "text-gray-400"}>AI Compression</span>
              {useAI && (
                <span className="bg-purple-500/20 text-purple-200 text-xs px-1.5 py-0.5 rounded">PRO</span>
              )}
            </Label>
          </div>
          
          {useAI && selectedIndustry && (
            <span className="bg-purple-700/30 border border-purple-500/30 text-purple-300 text-xs px-2 py-1 rounded-full flex items-center">
              {selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1)} profile
              <button 
                className="ml-2 text-purple-400 hover:text-purple-200"
                onClick={() => handleSelectIndustry(null)}
              >
                ×
              </button>
            </span>
          )}
        </div>
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
        
        <div>
          <CompressionVisualizer
            originalSize={compressMode ? inputText.length : outputText.length}
            compressedSize={compressMode ? outputText.length : inputText.length}
            ratio={compressResult.ratio}
            steps={compressResult.steps}
          />
          
          {useAI && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Select Industry Profile:</div>
              <div className="grid grid-cols-2 gap-2">
                {["medical", "finance", "tech", "legal"].map((industry) => (
                  <button
                    key={industry}
                    className={`p-2 text-xs rounded border ${
                      selectedIndustry === industry
                        ? "bg-purple-700 border-purple-500 text-white"
                        : "bg-white/10 border-white/20 hover:bg-white/20"
                    }`}
                    onClick={() => handleSelectIndustry(industry)}
                  >
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompressionInterface;
