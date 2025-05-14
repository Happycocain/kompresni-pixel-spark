
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileX } from 'lucide-react';
import { BatchFile } from '@/types/compression';

interface BatchFileTableProps {
  files: BatchFile[];
  onRemoveFile: (id: string) => void;
  isProcessing: boolean;
  formatFileSize: (size: number) => string;
}

const BatchFileTable: React.FC<BatchFileTableProps> = ({ 
  files, 
  onRemoveFile,
  isProcessing,
  formatFileSize 
}) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500">Nahrajte soubory pro dávkové zpracování</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">Název souboru</th>
            <th className="px-4 py-2 text-right">Původní velikost</th>
            <th className="px-4 py-2 text-right">Komprimovaná velikost</th>
            <th className="px-4 py-2 text-right">Kompresní poměr</th>
            <th className="px-4 py-2 text-center">Stav</th>
            <th className="px-4 py-2 text-center">Akce</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="border-t">
              <td className="px-4 py-2">{file.name}</td>
              <td className="px-4 py-2 text-right">{formatFileSize(file.size)}</td>
              <td className="px-4 py-2 text-right">
                {file.compressedSize 
                  ? formatFileSize(file.compressedSize)
                  : '-'}
              </td>
              <td className="px-4 py-2 text-right">
                {file.ratio 
                  ? <span className={file.ratio > 0 ? "text-green-500" : "text-red-500"}>
                      {file.ratio.toFixed(2)}%
                    </span> 
                  : '-'}
              </td>
              <td className="px-4 py-2 text-center">
                <FileStatus status={file.status} error={file.error} />
              </td>
              <td className="px-4 py-2 text-center">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onRemoveFile(file.id)}
                  disabled={isProcessing}
                >
                  <FileX className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface FileStatusProps {
  status: BatchFile['status'];
  error?: string;
}

const FileStatus: React.FC<FileStatusProps> = ({ status, error }) => {
  switch (status) {
    case 'pending':
      return <span className="text-gray-500">Čeká</span>;
    case 'processing':
      return <span className="text-blue-500">Zpracovává se</span>;
    case 'completed':
      return <span className="text-green-500">Hotovo</span>;
    case 'error':
      return <span className="text-red-500" title={error}>Chyba</span>;
    default:
      return null;
  }
};

export default BatchFileTable;
