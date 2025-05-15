
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

interface IndustrySelectorProps {
  selectedIndustry: string | null;
  onSelectIndustry: (industry: string) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ selectedIndustry, onSelectIndustry }) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-sm font-medium mb-2">{t('selectIndustryProfile')}:</div>
      <div className="grid grid-cols-2 gap-2">
        {["medical", "finance", "tech", "legal"].map((industry) => (
          <button
            key={industry}
            className={`p-2 text-xs rounded-md border ${
              selectedIndustry === industry
                ? "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200"
                : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            }`}
            onClick={() => onSelectIndustry(industry)}
          >
            {t(industry as any)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IndustrySelector;
