
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FastForward, RotateCcw } from 'lucide-react';
import FileTypeSelector, { FileType } from './FileTypeSelector';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

interface CompressionFormProps {
  inputText: string;
  outputText: string;
  compressMode: boolean;
  fileType: FileType;
  algorithmInput: string;
  onInputChange: (text: string) => void;
  onToggleMode: () => void;
  onSave: () => void;
  onFileTypeChange: (type: FileType) => void;
  onAlgorithmInputChange: (input: string) => void;
}

const CompressionForm: React.FC<CompressionFormProps> = ({
  inputText,
  outputText,
  compressMode,
  fileType,
  algorithmInput,
  onInputChange,
  onToggleMode,
  onSave,
  onFileTypeChange,
  onAlgorithmInputChange,
}) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleMode}
          className="flex items-center gap-2"
        >
          {compressMode ? (
            <>
              <FastForward className="h-4 w-4" />
              {t('compressionMode')}
            </>
          ) : (
            <>
              <RotateCcw className="h-4 w-4" />
              {t('decompressionMode')}
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <FileTypeSelector 
            selectedType={fileType} 
            onTypeChange={onFileTypeChange} 
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('algorithmInput')}</label>
            <Input
              value={algorithmInput}
              onChange={(e) => onAlgorithmInputChange(e.target.value)}
              placeholder={t('enterAlgorithmParameters')}
              className="font-mono"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {compressMode ? t('originalText') : t('compressedText')}
          </label>
          <Textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={compressMode 
              ? t('enterTextToCompress') 
              : t('enterTextToDecompress')
            }
            className="h-40 font-mono"
          />
          <div className="text-xs text-right">
            {inputText.length} {t('bytes')}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {compressMode ? t('compressedResult') : t('decompressedResult')}
          </label>
          <Textarea
            value={outputText}
            readOnly
            className="h-40 bg-gray-950/50 font-mono"
          />
          <div className="text-xs text-right">
            {outputText.length} {t('bytes')}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onSave} disabled={!inputText || !outputText}>
          {t('saveResult')}
        </Button>
      </div>
    </div>
  );
};

export default CompressionForm;
