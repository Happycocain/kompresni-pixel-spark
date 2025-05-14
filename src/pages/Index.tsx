
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompressionInterface from '@/components/CompressionInterface';
import BatchCompression from '@/components/compression/BatchCompression';
import CompressionProfiles from '@/components/compression/CompressionProfiles';
import AdvancedVisualization from '@/components/compression/AdvancedVisualization';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';

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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Advanced Compression Suite</h1>
            <span className="bg-purple-500 px-2 py-0.5 rounded text-xs">Enterprise</span>
          </div>
          <div>
            <Button asChild variant="outline">
              <Link to="/api">
                <Code className="h-4 w-4 mr-2" />
                API Dokumentace
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
            <TabsTrigger value="compression">Komprese textu</TabsTrigger>
            <TabsTrigger value="batch">Dávkové zpracování</TabsTrigger>
            <TabsTrigger value="profiles">Kompresní profily</TabsTrigger>
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
                { name: "RLE kódování", before: "Text s rozpoznanými vzory", after: "RLE kódovaný text" },
                { name: "Statistické modelování", before: "RLE kódovaný text", after: "Statisticky optimalizovaný text" }
              ]}
              history={demoHistory}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
