
import React from 'react';
import { Database, Building } from 'lucide-react';

const BatchProcessingHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold flex items-center">
          <Database className="w-6 h-6 mr-2 text-purple-500" />
          Dávkové zpracování
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Enterprise řešení pro masivní kompresi dat s podporou až 5TB souborů
        </p>
      </div>
      <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 px-3 py-1.5 rounded-full">
        <Building className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Enterprise Edition</span>
      </div>
    </div>
  );
};

export default BatchProcessingHeader;
