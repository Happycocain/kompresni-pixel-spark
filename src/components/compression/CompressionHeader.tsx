
import React from 'react';
import { PanelBottomOpen } from 'lucide-react';

const CompressionHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <PanelBottomOpen className="h-6 w-6 text-teal-400" />
      <h2 className="text-xl font-bold">Inovativní Kompresní Algoritmus</h2>
    </div>
  );
};

export default CompressionHeader;
