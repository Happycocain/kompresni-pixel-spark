
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';
import { FileType } from './FileTypeSelector';

interface CompressionSettingsProps {
  useAI: boolean;
  setUseAI: (value: boolean) => void;
  selectedIndustry: string | null;
  handleSelectIndustry: (industry: string | null) => void;
}

const CompressionSettings: React.FC<CompressionSettingsProps> = ({
  useAI,
  setUseAI,
  selectedIndustry,
  handleSelectIndustry
}) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="ai-mode"
          checked={useAI}
          onCheckedChange={setUseAI}
        />
        <Label htmlFor="ai-mode" className="cursor-pointer flex items-center gap-1">
          <span className={useAI ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}>{t('aiCompression')}</span>
          {useAI && (
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-1.5 py-0.5 rounded">PRO</span>
          )}
        </Label>
      </div>
      
      {useAI && selectedIndustry && (
        <span className="bg-blue-100 border border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700/30 dark:text-blue-300 text-xs px-2 py-1 rounded-full flex items-center">
          {selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1)} {t('profile')}
          <button 
            className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            onClick={() => handleSelectIndustry(null)}
          >
            ×
          </button>
        </span>
      )}
    </div>
  );
};

export default CompressionSettings;
