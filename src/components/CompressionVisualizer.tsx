
import React from 'react';
import { cn } from "@/lib/utils";

interface CompressionVisualizerProps {
  originalSize: number;
  compressedSize: number;
  ratio: number;
  steps: any[];
}

const CompressionVisualizer: React.FC<CompressionVisualizerProps> = ({
  originalSize,
  compressedSize,
  ratio,
  steps
}) => {
  // Color calculation based on compression ratio
  const getEfficiencyColor = (ratio: number) => {
    if (ratio < 0) return "bg-red-500"; // Negative compression (expansion)
    if (ratio < 10) return "bg-amber-500"; // Poor compression
    if (ratio < 30) return "bg-yellow-500"; // Okay compression
    if (ratio < 50) return "bg-lime-500"; // Good compression
    return "bg-green-500"; // Excellent compression
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-center">Compression Metrics</h3>
      
      {/* Size comparison */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Original: {originalSize} bytes</span>
          <span>Compressed: {compressedSize} bytes</span>
        </div>
        
        {/* Visualization bar */}
        <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
          {originalSize > 0 && (
            <div 
              className={cn("h-full transition-all ease-out duration-1000", getEfficiencyColor(ratio))}
              style={{ width: `${Math.min(100, 100 - ratio)}%` }}
            />
          )}
        </div>
        
        <div className="text-center font-mono">
          {ratio >= 0 ? (
            <span className="text-green-400">
              {ratio}% smaller 
              {ratio > 0 && " ✓"}
            </span>
          ) : (
            <span className="text-red-400">
              {Math.abs(ratio)}% larger ✗
            </span>
          )}
        </div>
      </div>
      
      {/* Compression steps visualization */}
      {steps.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Compression Process:</h4>
          <div className="space-y-1 text-xs max-h-40 overflow-y-auto scrollbar-thin">
            {steps.map((step, idx) => (
              <details key={idx} className="bg-gray-800/30 rounded p-2">
                <summary className="cursor-pointer">{step.name}</summary>
                <div className="mt-2 font-mono">
                  {step.before && (
                    <div className="text-amber-300">
                      Before: <span className="text-white">{step.before.substring(0, 100)}{step.before.length > 100 ? '...' : ''}</span>
                    </div>
                  )}
                  {step.after && (
                    <div className="text-green-300">
                      After: <span className="text-white">{step.after.substring(0, 100)}{step.after.length > 100 ? '...' : ''}</span>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressionVisualizer;
