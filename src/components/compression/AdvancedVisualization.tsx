
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface CompressionStep {
  name: string;
  before?: string;
  after?: string;
}

interface VisualizationProps {
  originalSize: number;
  compressedSize: number;
  ratio: number;
  steps: CompressionStep[];
  history?: {
    originalSize: number;
    compressedSize: number;
    ratio: number;
    timestamp: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdvancedVisualization: React.FC<VisualizationProps> = ({
  originalSize,
  compressedSize,
  ratio,
  steps,
  history = []
}) => {
  // Data pro sloupcový graf
  const sizeComparisonData = [
    { name: 'Původní', velikost: originalSize },
    { name: 'Komprimované', velikost: compressedSize }
  ];
  
  // Data pro koláčový graf rozdělení úspor
  const savingsData = [
    { name: 'Ušetřeno', value: originalSize - compressedSize },
    { name: 'Výsledná velikost', value: compressedSize }
  ];
  
  // Data pro linii historie kompresních poměrů
  const historyData = history.map(item => ({
    čas: new Date(item.timestamp).toLocaleTimeString(),
    poměr: item.ratio
  }));
  
  // Data pro sloupcový graf kroků komprese
  const calculateStepRatios = () => {
    if (steps.length <= 1) return [];
    
    // Vytvoříme odhad velikosti po každém kroku
    // Toto je zjednodušení, které by v praxi vyžadovalo více dat
    const stepSizes = steps.map((step, index) => {
      const stepProgress = (index + 1) / steps.length;
      const estimatedSize = originalSize - (stepProgress * (originalSize - compressedSize));
      const stepRatio = (originalSize - estimatedSize) / originalSize * 100;
      return {
        name: step.name.split(' ')[0], // Zkrácené jméno pro graf
        hodnota: parseFloat(stepRatio.toFixed(2))
      };
    });
    
    return stepSizes;
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Porovnání velikostí</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sizeComparisonData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: '1px solid #555', borderRadius: '4px' }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#aaa' }}
            />
            <Bar dataKey="velikost" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {ratio > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Rozdělení úspory</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={savingsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({name, value}) => `${name}: ${(value / 1024).toFixed(2)}KB`}
              >
                {savingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: '1px solid #555', borderRadius: '4px' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#aaa' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {historyData.length > 1 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Historie kompresních poměrů</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historyData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="čas" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: '1px solid #555', borderRadius: '4px' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#aaa' }}
              />
              <Line type="monotone" dataKey="poměr" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {steps.length > 1 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Účinnost jednotlivých kroků</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={calculateStepRatios()} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: '1px solid #555', borderRadius: '4px' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#aaa' }}
              />
              <Bar dataKey="hodnota" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AdvancedVisualization;
