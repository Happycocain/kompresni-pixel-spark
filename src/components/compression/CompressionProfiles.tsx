
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Download, Upload, Trash2, Save, Plus, Settings } from 'lucide-react';

interface CompressionProfile {
  id: string;
  name: string;
  description?: string;
  patterns: Record<string, string>;
  created: number;
  lastModified: number;
}

interface CompressionProfilesProps {
  onSelectProfile: (profile: CompressionProfile) => void;
}

const CompressionProfiles: React.FC<CompressionProfilesProps> = ({ onSelectProfile }) => {
  const [profiles, setProfiles] = useState<CompressionProfile[]>([]);
  const [newProfileName, setNewProfileName] = useState('');
  const [editMode, setEditMode] = useState<string | null>(null);
  const { toast } = useToast();

  // Načtení profilů z localStorage
  useEffect(() => {
    const savedProfiles = localStorage.getItem('compressionProfiles');
    if (savedProfiles) {
      try {
        setProfiles(JSON.parse(savedProfiles));
      } catch (e) {
        console.error('Chyba při načítání profilů:', e);
      }
    } else {
      // Vytvoření výchozího profilu
      const defaultProfile: CompressionProfile = {
        id: 'default',
        name: 'Výchozí profil',
        description: 'Standardní nastavení komprese',
        patterns: {
          "the": "†",
          "and": "‡",
          "ing": "§",
          "ion": "¶",
          "that": "©",
          "have": "®",
          "this": "™",
          "with": "¥"
        },
        created: Date.now(),
        lastModified: Date.now()
      };
      setProfiles([defaultProfile]);
      localStorage.setItem('compressionProfiles', JSON.stringify([defaultProfile]));
    }
  }, []);
  
  // Uložení profilů při změně
  useEffect(() => {
    localStorage.setItem('compressionProfiles', JSON.stringify(profiles));
  }, [profiles]);
  
  // Vytvoření nového profilu
  const createProfile = () => {
    if (!newProfileName.trim()) {
      toast({
        title: "Chybí název profilu",
        description: "Zadejte název pro nový profil",
        variant: "destructive",
      });
      return;
    }
    
    // Kontrola duplicity názvu
    if (profiles.some(p => p.name === newProfileName)) {
      toast({
        title: "Duplicitní název",
        description: "Profil s tímto názvem již existuje",
        variant: "destructive",
      });
      return;
    }
    
    const newProfile: CompressionProfile = {
      id: `profile-${Date.now()}`,
      name: newProfileName,
      patterns: {},
      created: Date.now(),
      lastModified: Date.now()
    };
    
    setProfiles([...profiles, newProfile]);
    setNewProfileName('');
    
    toast({
      title: "Profil vytvořen",
      description: `Profil "${newProfileName}" byl vytvořen`
    });
  };
  
  // Smazání profilu
  const deleteProfile = (id: string) => {
    if (id === 'default') {
      toast({
        title: "Nelze smazat",
        description: "Výchozí profil nelze smazat",
        variant: "destructive",
      });
      return;
    }
    
    setProfiles(profiles.filter(p => p.id !== id));
    
    toast({
      title: "Profil smazán",
      description: `Profil byl odstraněn`
    });
  };
  
  // Export profilu
  const exportProfile = (profile: CompressionProfile) => {
    const data = JSON.stringify(profile, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, '_')}_profile.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Profil exportován",
      description: `Profil "${profile.name}" byl exportován`
    });
  };
  
  // Import profilu
  const importProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedProfile = JSON.parse(event.target?.result as string) as CompressionProfile;
        
        // Validace importovaného profilu
        if (!importedProfile.name || !importedProfile.patterns) {
          throw new Error('Neplatný formát profilu');
        }
        
        // Přidání nového ID pro prevenci kolizí
        importedProfile.id = `profile-${Date.now()}`;
        importedProfile.lastModified = Date.now();
        
        // Kontrola duplicity názvu
        let uniqueName = importedProfile.name;
        let counter = 1;
        while (profiles.some(p => p.name === uniqueName)) {
          uniqueName = `${importedProfile.name} (${counter})`;
          counter++;
        }
        importedProfile.name = uniqueName;
        
        setProfiles([...profiles, importedProfile]);
        
        toast({
          title: "Profil importován",
          description: `Profil "${importedProfile.name}" byl importován`
        });
      } catch (error) {
        console.error('Chyba při importu profilu:', error);
        toast({
          title: "Chyba importu",
          description: "Nepodařilo se importovat profil. Ujistěte se, že soubor má správný formát.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    
    // Reset input
    e.target.value = '';
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Kompresní profily</h2>
        <Button variant="outline" onClick={() => document.getElementById('import-profile')?.click()}>
          <Upload className="w-4 h-4 mr-2" />
          Importovat profil
        </Button>
        <input 
          type="file"
          id="import-profile"
          className="hidden"
          accept=".json,application/json"
          onChange={importProfile}
        />
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          placeholder="Název nového profilu"
        />
        <Button onClick={createProfile}>
          <Plus className="w-4 h-4 mr-2" />
          Vytvořit
        </Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Název</th>
              <th className="px-4 py-2 text-left">Popis</th>
              <th className="px-4 py-2 text-right">Vytvořeno</th>
              <th className="px-4 py-2 text-center">Akce</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="border-t">
                <td className="px-4 py-2 font-medium">{profile.name}</td>
                <td className="px-4 py-2 text-gray-500">{profile.description || '-'}</td>
                <td className="px-4 py-2 text-right">
                  {new Date(profile.created).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onSelectProfile(profile)}
                      title="Použít profil"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => exportProfile(profile)}
                      title="Exportovat profil"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteProfile(profile.id)}
                      title="Smazat profil"
                      disabled={profile.id === 'default'}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompressionProfiles;
