
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, ChartLine } from "lucide-react";
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

interface VisualizationSelectorProps {
  visualizationMode: 'basic' | 'extended';
  setVisualizationMode: (mode: 'basic' | 'extended') => void;
}

const VisualizationSelector: React.FC<VisualizationSelectorProps> = ({
  visualizationMode,
  setVisualizationMode
}) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  
  return (
    <div className="flex justify-between items-center">
      <Tabs value={visualizationMode} onValueChange={(v) => setVisualizationMode(v as 'basic' | 'extended')}>
        <TabsList className="mb-2">
          <TabsTrigger value="basic" className="flex items-center gap-1">
            <BarChart className="h-3 w-3" />
            {t('basic')}
          </TabsTrigger>
          <TabsTrigger value="extended" className="flex items-center gap-1">
            <ChartLine className="h-3 w-3" />
            {t('extended')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default VisualizationSelector;
