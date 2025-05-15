
import React from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartLine, BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";

interface ExtendedVisualizationProps {
  originalSize: number;
  compressedSize: number;
  ratio: number;
  history: Array<{
    originalSize: number;
    compressedSize: number;
    ratio: number;
    timestamp: number;
  }>;
  steps?: any[];
}

const ExtendedVisualization: React.FC<ExtendedVisualizationProps> = ({
  originalSize,
  compressedSize,
  ratio,
  history,
  steps = []
}) => {
  const { language, theme } = useSettings();
  const { t } = useTranslation(language);
  
  const historyData = history.map((record) => ({
    name: new Date(record.timestamp).toLocaleTimeString(),
    original: record.originalSize,
    compressed: record.compressedSize,
    ratio: record.ratio
  })).slice(-10); // Show only the last 10 items
  
  const stepData = steps.map((step, index) => ({
    name: step.name || `Krok ${index + 1}`,
    efficiency: step.efficiency || Math.random() * 40, // Fallback pro vizualizaci
    size: step.size || Math.random() * 100, // Fallback pro vizualizaci
  }));
  
  const pieData = [
    { name: t('original'), value: originalSize - compressedSize > 0 ? originalSize - compressedSize : 0 },
    { name: t('compressed'), value: compressedSize },
  ];
  
  const COLORS = ['#8C52FF', '#0ED3CF'];
  
  const textColor = theme === 'dark' ? '#e0e0e0' : '#333333';
  
  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <h3 className="text-lg font-semibold text-center mb-4">{t('compressionMetrics')}</h3>
      
      <Tabs defaultValue="bar" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="bar" className="flex items-center gap-1">
            <BarChartIcon className="h-3 w-3" />
            Bar
          </TabsTrigger>
          <TabsTrigger value="line" className="flex items-center gap-1">
            <LineChartIcon className="h-3 w-3" />
            Line
          </TabsTrigger>
          <TabsTrigger value="area" className="flex items-center gap-1">
            <ChartLine className="h-3 w-3" />
            Area
          </TabsTrigger>
          <TabsTrigger value="pie" className="flex items-center gap-1">
            <PieChartIcon className="h-3 w-3" />
            Pie
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bar" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historyData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <XAxis dataKey="name" stroke={textColor} fontSize={10} />
              <YAxis stroke={textColor} fontSize={10} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', 
                  border: 'none',
                  color: textColor
                }}
              />
              <Legend />
              <Bar dataKey="original" name={t('original')} fill="#8C52FF" />
              <Bar dataKey="compressed" name={t('compressed')} fill="#0ED3CF" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="line" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <XAxis dataKey="name" stroke={textColor} fontSize={10} />
              <YAxis stroke={textColor} fontSize={10} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', 
                  border: 'none',
                  color: textColor
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="ratio" name={`${t('compressionRatio')} %`} stroke="#8C52FF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="area" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stepData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <XAxis dataKey="name" stroke={textColor} fontSize={10} />
              <YAxis stroke={textColor} fontSize={10} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', 
                  border: 'none',
                  color: textColor
                }}
              />
              <Area type="monotone" dataKey="efficiency" name="Efficiency %" fill="#8C52FF" stroke="#8C52FF" fillOpacity={0.6} />
              <Area type="monotone" dataKey="size" name="Size" fill="#0ED3CF" stroke="#0ED3CF" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="pie" className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', 
                  border: 'none',
                  color: textColor
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExtendedVisualization;
