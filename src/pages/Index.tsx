
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompressionInterface from '@/components/CompressionInterface';
import BatchCompression from '@/components/compression/BatchCompression';
import CompressionProfiles from '@/components/compression/CompressionProfiles';
import AdvancedVisualization from '@/components/compression/AdvancedVisualization';
import IndustrySpecificProfiles from '@/components/compression/IndustrySpecificProfiles';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Code, Building, Brain, Sparkles, Gauge, Trophy } from 'lucide-react';

// Typ pro kompresní profil
interface CompressionProfile {
  id: string;
  name: string;
  description?: string;
  patterns: Record<string, string>;
  created: number;
  lastModified: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("compression");
  const [visualizationData, setVisualizationData] = useState({
    originalSize: 0,
    compressedSize: 0,
    ratio: 0,
    steps: [],
    history: []
  });
  
  // Simulace historie kompresí pro testování grafu
  const demoHistory = [
    { originalSize: 1000, compressedSize: 650, ratio: 35, timestamp: Date.now() - 50000 },
    { originalSize: 1200, compressedSize: 720, ratio: 40, timestamp: Date.now() - 40000 },
    { originalSize: 900, compressedSize: 630, ratio: 30, timestamp: Date.now() - 30000 },
    { originalSize: 1500, compressedSize: 900, ratio: 40, timestamp: Date.now() - 20000 },
    { originalSize: 2000, compressedSize: 1200, ratio: 40, timestamp: Date.now() - 10000 },
  ];
  
  // Zpracování výběru profilu
  const handleSelectProfile = (profile: CompressionProfile) => {
    console.log("Vybrán profil:", profile);
    // Tady by se implementovala logika pro použití profilu
  };
  
  // Zpracování výběru oborového profilu
  const handleSelectIndustryProfile = (profileId: string) => {
    console.log("Vybrán oborový profil:", profileId);
    // Tady by se implementovala logika pro použití oborového profilu
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Pokročilá Kompresní Sada</h1>
              <Badge variant="outline" className="ml-2 bg-purple-500 border-none px-2 py-0.5 text-xs">Edice 2025</Badge>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button asChild variant="outline">
              <Link to="/api">
                <Code className="h-4 w-4 mr-2" />
                API Dokumentace
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/enterprise">
                <Building className="h-4 w-4 mr-2" />
                Enterprise řešení
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="bg-gradient-to-r from-purple-800/30 to-blue-900/30 py-8 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <Badge className="mb-2 bg-purple-600/80">Novinka</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Představujeme AI-řízenou kompresi nové generace
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Nejpokročilejší kompresní algoritmy poháněné umělou inteligencí nyní dokáží zmenšit vaše soubory až o 40% efektivněji. 
                Podporujeme soubory až do velikosti 5TB.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Brain className="text-purple-400 h-5 w-5" />
                  <span>Adaptivní algoritmy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="text-purple-400 h-5 w-5" />
                  <span>Maximální efektivita</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="text-purple-400 h-5 w-5" />
                  <span>Pokročilá analýza</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="text-purple-400 h-5 w-5" />
                  <span>Světová špička</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="font-medium text-lg mb-2">Vyzkoušejte rozdíl</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Naše nová AI-řízená komprese dosahuje o 35% lepších výsledků než tradiční algoritmy.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" onClick={() => setActiveTab("compression")}>
                  Vyzkoušet kompresní nástroj
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-4xl mx-auto">
            <TabsTrigger value="compression">Komprese textu</TabsTrigger>
            <TabsTrigger value="batch">Dávkové zpracování</TabsTrigger>
            <TabsTrigger value="profiles">Kompresní profily</TabsTrigger>
            <TabsTrigger value="industry">Oborové profily</TabsTrigger>
            <TabsTrigger value="analytics">Pokročilé analýzy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compression" className="space-y-6">
            <CompressionInterface />
          </TabsContent>
          
          <TabsContent value="batch" className="space-y-6">
            <BatchCompression />
          </TabsContent>
          
          <TabsContent value="profiles" className="space-y-6">
            <CompressionProfiles onSelectProfile={handleSelectProfile} />
          </TabsContent>
          
          <TabsContent value="industry" className="space-y-6">
            <IndustrySpecificProfiles onSelectProfile={handleSelectIndustryProfile} />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Pokročilé analýzy komprese</h2>
              <p className="text-gray-300">
                Prozkoumejte detailní metriky a výkonnostní charakteristiky kompresních algoritmů.
              </p>
            </div>
            
            <AdvancedVisualization 
              originalSize={2000}
              compressedSize={1200}
              ratio={40}
              steps={[
                { name: "Detekce formátu", before: "Vstupní text", after: "Rozpoznán formát" },
                { name: "Slovníková substituce", before: "Původní text", after: "Text po substituci" },
                { name: "ML rozpoznávání vzorů", before: "Text se substituovanými slovy", after: "Text s rozpoznanými vzory" },
                { name: "RLE kódování", before: "RLE kódovaný text", after: "Text s rozpoznanými vzory" },
                { name: "Statistické modelování", before: "Statisticky optimalizovaný text", after: "RLE kódovaný text" }
              ]}
              history={demoHistory}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="bg-black/30 border-t border-white/10 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="font-semibold text-lg">Pokročilá Kompresní Sada</span>
              <Badge variant="outline" className="ml-2">2025</Badge>
            </div>
            <div className="flex gap-6">
              <Link to="/api" className="text-gray-300 hover:text-white">API</Link>
              <Link to="/enterprise" className="text-gray-300 hover:text-white">Enterprise</Link>
              <a href="#" className="text-gray-300 hover:text-white">GitHub</a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-4 pt-4 text-center text-sm text-gray-400">
            © 2025 Pokročilá Kompresní Sada. Vyvinuto s využitím nejmodernějších AI algoritmů.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
