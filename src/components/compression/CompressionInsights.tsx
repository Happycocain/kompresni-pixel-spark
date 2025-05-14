
import React from 'react';
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar 
} from 'recharts';
import { 
  Brain, 
  Lightbulb, 
  Sparkles, 
  Gauge, 
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface CompressionInsightsProps {
  isVisible: boolean;
  toggleVisibility: () => void;
  originalSize: number;
  compressedSize: number;
  ratio: number;
  insights?: {
    contentType?: "code" | "text" | "document" | "mixed";
    complexityScore?: number;
    patternsDetected?: number;
    estimatedOptimality?: number;
  };
  steps?: any[];
}

const CompressionInsights: React.FC<CompressionInsightsProps> = ({
  isVisible,
  toggleVisibility,
  originalSize,
  compressedSize,
  ratio,
  insights = {},
  steps = []
}) => {
  const { contentType = "text", complexityScore = 0, patternsDetected = 0, estimatedOptimality = 0 } = insights;
  
  // Prepare data for the compression ratio chart
  const sizeData = [
    { name: 'Original', size: originalSize },
    { name: 'Compressed', size: compressedSize }
  ];
  
  // Prepare data for radar chart
  const performanceData = [
    {
      subject: 'Compression Ratio',
      A: ratio > 100 ? 100 : ratio,
      fullMark: 100,
    },
    {
      subject: 'Speed',
      A: 80 - (complexityScore / 5),
      fullMark: 100,
    },
    {
      subject: 'Pattern Detection',
      A: Math.min(100, patternsDetected * 2),
      fullMark: 100,
    },
    {
      subject: 'Algorithm Optimality',
      A: estimatedOptimality,
      fullMark: 100,
    },
    {
      subject: 'Content Adaptation',
      A: contentType === "mixed" ? 70 : 90,
      fullMark: 100,
    },
  ];
  
  // Prepare step efficiency data
  const stepEfficiencyData = steps.filter(step => step.before && step.after)
    .map((step, index) => {
      const beforeLength = typeof step.before === 'string' ? step.before.length : 0;
      const afterLength = typeof step.after === 'string' ? step.after.length : 0;
      const stepRatio = beforeLength > 0 ? ((beforeLength - afterLength) / beforeLength) * 100 : 0;
      
      return {
        name: step.name || `Step ${index + 1}`,
        efficiency: parseFloat(stepRatio.toFixed(1)),
      };
    });
  
  const contentTypeIcon = () => {
    switch(contentType) {
      case "code": return <span className="text-blue-400 text-lg">{'</>'}</span>;
      case "document": return <span className="text-amber-400 text-lg">📄</span>;
      case "mixed": return <span className="text-purple-400 text-lg">🔀</span>;
      default: return <span className="text-green-400 text-lg">📝</span>;
    }
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
      <div 
        className="p-3 bg-white/10 flex items-center justify-between cursor-pointer"
        onClick={toggleVisibility}
      >
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          <h3 className="font-semibold">AI Compression Insights</h3>
        </div>
        <div>
          {isVisible ? 
            <ChevronUp className="h-5 w-5" /> : 
            <ChevronDown className="h-5 w-5" />
          }
        </div>
      </div>
      
      {isVisible && (
        <div className="p-4 space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white/10 rounded p-3 flex flex-col items-center justify-center">
              <div className="text-xs text-gray-400 mb-1">Content Type</div>
              <div className="flex items-center gap-2">
                {contentTypeIcon()}
                <span className="font-medium capitalize">{contentType}</span>
              </div>
            </div>
            
            <div className="bg-white/10 rounded p-3 flex flex-col items-center justify-center">
              <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                <Gauge className="h-3 w-3" />
                <span>Complexity Score</span>
              </div>
              <div className="font-mono text-lg">
                {complexityScore.toFixed(1)}
                <span className="text-xs text-gray-400">/100</span>
              </div>
            </div>
            
            <div className="bg-white/10 rounded p-3 flex flex-col items-center justify-center">
              <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                <span>Patterns Detected</span>
              </div>
              <div className="font-mono text-lg">{patternsDetected}</div>
            </div>
            
            <div className="bg-white/10 rounded p-3 flex flex-col items-center justify-center">
              <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Optimality</span>
              </div>
              <div className="font-mono text-lg">
                {estimatedOptimality.toFixed(1)}%
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Size comparison */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-4">Compression Analysis</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sizeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `${value} bytes`} 
                    contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="size" 
                    name="Size (bytes)" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 text-center">
                <span className="text-sm">Compression ratio: </span>
                <span className="font-mono text-green-400">{ratio.toFixed(1)}%</span>
              </div>
            </div>
            
            {/* Algorithm performance radar */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-4">Algorithm Performance</h4>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart outerRadius={70} data={performanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#ccc', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Step efficiency chart */}
          {stepEfficiencyData.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-4">Compression Step Efficiency</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stepEfficiencyData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip 
                    formatter={(value: number) => `${value}% reduction`}
                    contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
                  />
                  <Bar 
                    dataKey="efficiency" 
                    fill="#82ca9d" 
                    radius={[0, 4, 4, 0]} 
                    name="Efficiency (%)" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompressionInsights;
