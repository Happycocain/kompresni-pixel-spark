
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Text, FileVideo, File, Image, Video } from "lucide-react";
import { useTranslation } from '@/i18n/translations';
import { useSettings } from '@/contexts/SettingsContext';

export type FileType = 'text' | 'image' | 'video' | 'document' | 'generic';

interface FileTypeSelectorProps {
  selectedType: FileType;
  onTypeChange: (type: FileType) => void;
}

const FileTypeSelector: React.FC<FileTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);

  const fileTypes = [
    { id: 'text', label: t('fileTypes.text'), icon: <Text className="h-4 w-4 mr-2" /> },
    { id: 'image', label: t('fileTypes.image'), icon: <Image className="h-4 w-4 mr-2" /> },
    { id: 'video', label: t('fileTypes.video'), icon: <Video className="h-4 w-4 mr-2" /> },
    { id: 'document', label: t('fileTypes.document'), icon: <FileVideo className="h-4 w-4 mr-2" /> },
    { id: 'generic', label: t('fileTypes.generic'), icon: <File className="h-4 w-4 mr-2" /> }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{t('fileType')}</label>
      <Select 
        value={selectedType} 
        onValueChange={(value) => onTypeChange(value as FileType)}
      >
        <SelectTrigger>
          <SelectValue placeholder={t('selectFileType')} />
        </SelectTrigger>
        <SelectContent>
          {fileTypes.map((type) => (
            <SelectItem key={type.id} value={type.id} className="flex items-center">
              <div className="flex items-center">
                {type.icon}
                {type.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FileTypeSelector;
