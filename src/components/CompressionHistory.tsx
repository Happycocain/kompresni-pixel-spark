
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { FileType } from './compression/FileTypeSelector';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export interface CompressionRecord {
  id: string;
  originalText: string;
  compressedText: string;
  originalSize: number;
  compressedSize: number;
  ratio: number;
  timestamp: number;
  fileType?: FileType;
  algorithmInput?: string;
}

interface CompressionHistoryProps {
  history: CompressionRecord[];
  onSelect: (record: CompressionRecord) => void;
}

const CompressionHistory: React.FC<CompressionHistoryProps> = ({ history, onSelect }) => {
  // Format data for the chart
  const chartData = history.map((record) => ({
    id: record.id,
    name: record.originalText.substring(0, 10) + (record.originalText.length > 10 ? '...' : ''),
    original: record.originalSize,
    compressed: record.compressedSize,
    ratio: record.ratio,
  })).slice(-5); // Show only the last 5 items

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-center mb-4">Compression History</h3>
      
      {history.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No compression history yet
        </div>
      ) : (
        <div className="space-y-6">
          {/* Chart visualization */}
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="original" name="Original" fill="#8C52FF" />
                <Bar dataKey="compressed" name="Compressed" fill="#0ED3CF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* History items */}
          <div className="space-y-2 overflow-y-auto max-h-60">
            {history.slice().reverse().map((record) => (
              <div 
                key={record.id} 
                className="bg-gray-800/30 hover:bg-gray-700/30 p-3 rounded-md cursor-pointer transition-colors"
                onClick={() => onSelect(record)}
              >
                <div className="flex justify-between items-center text-sm">
                  <div className="font-mono truncate max-w-[60%]" title={record.originalText}>
                    {record.originalText.substring(0, 20)}{record.originalText.length > 20 ? '...' : ''}
                  </div>
                  <div className={`font-semibold ${record.ratio >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {record.ratio}%
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(record.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressionHistory;
