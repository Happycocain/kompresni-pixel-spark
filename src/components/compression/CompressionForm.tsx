
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FastForward, RotateCcw } from 'lucide-react';

interface CompressionFormProps {
  inputText: string;
  outputText: string;
  compressMode: boolean;
  onInputChange: (text: string) => void;
  onToggleMode: () => void;
  onSave: () => void;
}

const CompressionForm: React.FC<CompressionFormProps> = ({
  inputText,
  outputText,
  compressMode,
  onInputChange,
  onToggleMode,
  onSave,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleMode}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {compressMode ? "Original Text" : "Compressed Text"}
          </label>
          <Textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
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
        <Button onClick={onSave} disabled={!inputText || !outputText}>
          Save Result
        </Button>
      </div>
    </div>
  );
};

export default CompressionForm;
