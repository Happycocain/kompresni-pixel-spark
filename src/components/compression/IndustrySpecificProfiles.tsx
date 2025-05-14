
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileCode, FileText, FileSpreadsheet, Microscope, Stethoscope, 
         BarChart3, LineChart, Film, BookOpen, ShieldCheck, Building2 } from 'lucide-react';

interface IndustryProfile {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  optimizedFor: string[];
  compressionBoost: number;
}

interface IndustrySpecificProfilesProps {
  onSelectProfile: (profileId: string) => void;
}

const IndustrySpecificProfiles: React.FC<IndustrySpecificProfilesProps> = ({ onSelectProfile }) => {
  const profiles: IndustryProfile[] = [
    {
      id: "medical",
      name: "Zdravotnictví",
      description: "Optimalizováno pro zdravotnické záznamy, výsledky testů a medicínské dokumenty.",
      icon: <Stethoscope className="h-8 w-8 text-blue-400" />,
      tags: ["DICOM", "HL7", "EMR", "EHR"],
      optimizedFor: ["Lékařské zprávy", "Laboratorní výsledky", "Pacientské záznamy"],
      compressionBoost: 18
    },
    {
      id: "finance",
      name: "Finance",
      description: "Specializováno na finanční data, transakce a výkaznictví.",
      icon: <BarChart3 className="h-8 w-8 text-green-400" />,
      tags: ["CSV", "FIX", "SWIFT", "XBRL"],
      optimizedFor: ["Transakční data", "Finanční výkazy", "Obchodní záznamy"],
      compressionBoost: 15
    },
    {
      id: "tech",
      name: "Technologie",
      description: "Vyladěno pro zdrojové kódy, logy a technickou dokumentaci.",
      icon: <FileCode className="h-8 w-8 text-purple-400" />,
      tags: ["JSON", "XML", "YAML", "Logs"],
      optimizedFor: ["Zdrojové kódy", "API odpovědi", "Systémové logy"],
      compressionBoost: 22
    },
    {
      id: "research",
      name: "Výzkum",
      description: "Ideální pro vědecká data, výsledky experimentů a publikace.",
      icon: <Microscope className="h-8 w-8 text-amber-400" />,
      tags: ["HDF5", "NetCDF", "LaTeX", "CSV"],
      optimizedFor: ["Vědecké publikace", "Experimentální data", "Statistické výsledky"],
      compressionBoost: 17
    },
    {
      id: "media",
      name: "Média",
      description: "Přizpůsobeno pro textové scénáře, knihy a články.",
      icon: <Film className="h-8 w-8 text-red-400" />,
      tags: ["Manuscripts", "Screenplays", "Articles"],
      optimizedFor: ["Články", "Scénáře", "Novinové texty"],
      compressionBoost: 12
    },
    {
      id: "legal",
      name: "Právní",
      description: "Specializováno na právní dokumenty, smlouvy a předpisy.",
      icon: <ShieldCheck className="h-8 w-8 text-indigo-400" />,
      tags: ["Contracts", "Legislation", "Case Law"],
      optimizedFor: ["Smlouvy", "Zákony", "Rozsudky"],
      compressionBoost: 19
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Pro velké korporátní datasety a firemní dokumenty.",
      icon: <Building2 className="h-8 w-8 text-sky-400" />,
      tags: ["Enterprise", "Corporate", "ERP"],
      optimizedFor: ["Korporátní reporty", "Interní dokumenty", "Firemní prezentace"],
      compressionBoost: 20
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Oborově specifické kompresní profily</h2>
        <p className="text-gray-300">
          Naše AI-optimalizované kompresní profily jsou speciálně vyladěné pro jednotlivé obory s vlastními slovníky, 
          váhami a vzory k dosažení maximální efektivity komprese.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className="bg-white/10 border-white/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {profile.icon}
                    <span>{profile.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">{profile.description}</CardDescription>
                </div>
                <Badge className="bg-purple-600">+{profile.compressionBoost}%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400">Optimalizováno pro:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.optimizedFor.map((item, i) => (
                      <span key={i} className="text-sm bg-white/10 px-2 py-0.5 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Podporované formáty:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-black/20 text-gray-300 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full hover:bg-purple-700 hover:text-white"
                onClick={() => onSelectProfile(profile.id)}
              >
                Použít profil
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndustrySpecificProfiles;
