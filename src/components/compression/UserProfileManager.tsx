
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash } from "lucide-react";

interface CompressionProfile {
  id: string;
  name: string;
  description: string;
  patterns: Record<string, string>;
  created: number;
}

interface UserProfileManagerProps {
  onSelectProfile: (profile: CompressionProfile) => void;
}

const UserProfileManager: React.FC<UserProfileManagerProps> = ({ onSelectProfile }) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<CompressionProfile[]>(() => {
    const savedProfiles = localStorage.getItem('userProfiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<CompressionProfile | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pattern1Key: '',
    pattern1Value: '',
    pattern2Key: '',
    pattern2Value: '',
    pattern3Key: '',
    pattern3Value: '',
  });
  
  // Save profiles to localStorage when they change
  React.useEffect(() => {
    localStorage.setItem('userProfiles', JSON.stringify(profiles));
  }, [profiles]);
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      pattern1Key: '',
      pattern1Value: '',
      pattern2Key: '',
      pattern2Value: '',
      pattern3Key: '',
      pattern3Value: '',
    });
    setEditingProfile(null);
  };
  
  const openEditDialog = (profile: CompressionProfile) => {
    setEditingProfile(profile);
    const patternEntries = Object.entries(profile.patterns);
    
    setFormData({
      name: profile.name,
      description: profile.description,
      pattern1Key: patternEntries[0]?.[0] || '',
      pattern1Value: patternEntries[0]?.[1] || '',
      pattern2Key: patternEntries[1]?.[0] || '',
      pattern2Value: patternEntries[1]?.[1] || '',
      pattern3Key: patternEntries[2]?.[0] || '',
      pattern3Value: patternEntries[2]?.[1] || '',
    });
    
    setIsOpen(true);
  };
  
  const handleCreateProfile = () => {
    setIsOpen(true);
    resetForm();
  };
  
  const handleSaveProfile = () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Profile name is required',
        variant: 'destructive',
      });
      return;
    }
    
    const patterns: Record<string, string> = {};
    
    if (formData.pattern1Key && formData.pattern1Value) {
      patterns[formData.pattern1Key] = formData.pattern1Value;
    }
    
    if (formData.pattern2Key && formData.pattern2Value) {
      patterns[formData.pattern2Key] = formData.pattern2Value;
    }
    
    if (formData.pattern3Key && formData.pattern3Value) {
      patterns[formData.pattern3Key] = formData.pattern3Value;
    }
    
    if (Object.keys(patterns).length === 0) {
      toast({
        title: 'Error',
        description: 'At least one pattern is required',
        variant: 'destructive',
      });
      return;
    }
    
    if (editingProfile) {
      // Update existing profile
      const updatedProfiles = profiles.map(p => 
        p.id === editingProfile.id 
          ? { 
              ...p, 
              name: formData.name, 
              description: formData.description,
              patterns
            } 
          : p
      );
      setProfiles(updatedProfiles);
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } else {
      // Create new profile
      const newProfile: CompressionProfile = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        patterns,
        created: Date.now(),
      };
      
      setProfiles([...profiles, newProfile]);
      
      toast({
        title: 'Success',
        description: 'Profile created successfully',
      });
    }
    
    setIsOpen(false);
    resetForm();
  };
  
  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(p => p.id !== id));
    
    toast({
      title: 'Success',
      description: 'Profile deleted successfully',
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('customProfiles')}</h3>
        <Button onClick={handleCreateProfile} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          {t('newProfile')}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {profiles.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No custom profiles yet
          </div>
        ) : (
          profiles.map(profile => (
            <div 
              key={profile.id} 
              className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex justify-between"
              onClick={() => onSelectProfile(profile)}
            >
              <div>
                <h4 className="font-medium">{profile.name}</h4>
                <p className="text-xs text-gray-400">{profile.description}</p>
                <div className="text-xs mt-1 text-purple-300">
                  {Object.keys(profile.patterns).length} pattern(s)
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditDialog(profile);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProfile(profile.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProfile ? t('editProfile') : t('createProfile')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">{t('profileName')}</label>
              <Input 
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="grid w-full gap-1.5">
              <label htmlFor="description" className="text-sm font-medium">{t('profileDescription')}</label>
              <Textarea 
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Patterns</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  placeholder="Pattern 1 key" 
                  value={formData.pattern1Key}
                  onChange={(e) => setFormData({...formData, pattern1Key: e.target.value})}
                />
                <Input 
                  placeholder="Pattern 1 value" 
                  value={formData.pattern1Value}
                  onChange={(e) => setFormData({...formData, pattern1Value: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  placeholder="Pattern 2 key" 
                  value={formData.pattern2Key}
                  onChange={(e) => setFormData({...formData, pattern2Key: e.target.value})}
                />
                <Input 
                  placeholder="Pattern 2 value" 
                  value={formData.pattern2Value}
                  onChange={(e) => setFormData({...formData, pattern2Value: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  placeholder="Pattern 3 key" 
                  value={formData.pattern3Key}
                  onChange={(e) => setFormData({...formData, pattern3Key: e.target.value})}
                />
                <Input 
                  placeholder="Pattern 3 value" 
                  value={formData.pattern3Value}
                  onChange={(e) => setFormData({...formData, pattern3Value: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>{t('cancel')}</Button>
              <Button onClick={handleSaveProfile}>{t('save')}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileManager;
