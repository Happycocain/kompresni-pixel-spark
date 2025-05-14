
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { compressText, decompressText } from "@/utils/compressionAlgorithm";
import CompressionVisualizer from "@/components/CompressionVisualizer";
import CompressionHistory from "@/components/CompressionHistory";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelBottomOpen, Code2, History, FastForward, RotateCcw } from 'lucide-react';
import type { CompressionRecord } from "@/components/CompressionHistory";

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
        <div className="flex items-center gap-2">
          <PanelBottomOpen className="h-6 w-6 text-teal-400" />
          <h2 className="text-xl font-bold">Inovativní Kompresní Algoritmus</h2>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMode}
          className="flex items-center gap-2"
        >
          {compressMode ? (
            <>
              <FastForward className="h-4 w-4" />
              Compression Mode
            </>
          ) : (
            <>
              <RotateCcw className="h-4 w-4" />
              Decompression Mode
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
            
            <TabsContent value="interface" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {compressMode ? "Original Text" : "Compressed Text"}
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={compressMode 
                      ? "Enter text to compress..." 
                      : "Enter compressed text to decompress..."
                    }
                    className="h-40 font-mono"
                  />
                  <div className="text-xs text-right">
                    {inputText.length} bytes
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {compressMode ? "Compressed Result" : "Decompressed Result"}
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    className="h-40 bg-gray-950/50 font-mono"
                  />
                  <div className="text-xs text-right">
                    {outputText.length} bytes
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={saveToHistory} disabled={!inputText || !outputText}>
                  Save Result
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <CompressionHistory 
                history={history} 
                onSelect={loadFromHistory} 
              />
            </TabsContent>
          </Tabs>
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
