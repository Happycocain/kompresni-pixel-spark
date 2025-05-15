
import React from 'react';
import { Zap } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

const CompressionHeader: React.FC = () => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  
  return (
    <div className="flex items-center gap-2">
      <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      <h2 className="text-xl font-bold">Compressify</h2>
    </div>
  );
};

export default CompressionHeader;
