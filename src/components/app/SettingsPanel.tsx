
import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SettingsPanel: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage } = useSettings();
  const { t } = useTranslation(language);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <h3 className="font-semibold">{t('settings')}</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>{t('theme')}</span>
              <Toggle 
                pressed={theme === 'dark'} 
                onPressedChange={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Toggle>
            </div>
            
            <div className="flex justify-between items-center">
              <span>{t('language')}</span>
              <Select value={language} onValueChange={(val) => setLanguage(val as 'cs' | 'en')}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">{t('czech')}</SelectItem>
                  <SelectItem value="en">{t('english')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsPanel;
