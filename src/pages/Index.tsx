
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
import { Code, Building, Brain, Sparkles, Gauge, Trophy, Zap } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';
import SettingsPanel from '@/components/app/SettingsPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState("compression");
  const [visualizationData, setVisualizationData] = useState({
    originalSize: 0,
    compressedSize: 0,
    ratio: 0,
    steps: [],
    history: []
  });
  
  const { language } = useSettings();
  const { t } = useTranslation(language);
  
  // Demo data for visualization
  const demoHistory = [
    { originalSize: 1000, compressedSize: 650, ratio: 35, timestamp: Date.now() - 50000 },
    { originalSize: 1200, compressedSize: 720, ratio: 40, timestamp: Date.now() - 40000 },
    { originalSize: 900, compressedSize: 630, ratio: 30, timestamp: Date.now() - 30000 },
    { originalSize: 1500, compressedSize: 900, ratio: 40, timestamp: Date.now() - 20000 },
    { originalSize: 2000, compressedSize: 1200, ratio: 40, timestamp: Date.now() - 10000 },
  ];
  
  // Handle profile selection
  const handleSelectProfile = (profile: any) => {
    console.log("Selected profile:", profile);
  };
  
  // Handle industry profile selection
  const handleSelectIndustryProfile = (profileId: string) => {
    console.log("Selected industry profile:", profileId);
  };
  
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-slate-900 dark:text-white">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-blue-600 dark:text-blue-400 mr-2">
                <Zap className="h-6 w-6" />
              </span>
              <h1 className="text-2xl font-bold">Compressify</h1>
              <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-none dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 text-xs">{t('edition')}</Badge>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            <SettingsPanel />
            
            <Button asChild variant="outline">
              <Link to="/api">
                <Code className="h-4 w-4 mr-2" />
                {t('apiDocs')}
              </Link>
            </Button>
            <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/enterprise">
                <Building className="h-4 w-4 mr-2" />
                {t('enterpriseSolution')}
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-gray-800 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <Badge className="mb-2 bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800">{t('newFeature')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('aiHeadline')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t('aiDescription')}
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Brain className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  <span>{t('features.adaptiveAlgorithms')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Sparkles className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  <span>{t('features.maxEfficiency')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Gauge className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  <span>{t('features.advancedAnalysis')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Trophy className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  <span>{t('features.worldClass')}</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white shadow-lg rounded-xl p-6 dark:bg-slate-800 dark:border dark:border-slate-700">
                <h3 className="font-medium text-lg mb-2">{t('tryDifference')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {t('tryDifferenceDesc')}
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setActiveTab("compression")}>
                  {t('tryCompressionTool')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-12 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-2 md:flex md:w-auto gap-1 p-1 md:justify-center mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg">
            <TabsTrigger value="compression" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">{t('tabs.compression')}</TabsTrigger>
            <TabsTrigger value="batch" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">{t('tabs.batch')}</TabsTrigger>
            <TabsTrigger value="profiles" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">{t('tabs.profiles')}</TabsTrigger>
            <TabsTrigger value="industry" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">{t('tabs.industry')}</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">{t('tabs.analytics')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compression" className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <CompressionInterface />
          </TabsContent>
          
          <TabsContent value="batch" className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <BatchCompression />
          </TabsContent>
          
          <TabsContent value="profiles" className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <CompressionProfiles onSelectProfile={handleSelectProfile} />
          </TabsContent>
          
          <TabsContent value="industry" className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <IndustrySpecificProfiles onSelectProfile={handleSelectIndustryProfile} />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Advanced Compression Analytics</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Explore detailed metrics and performance characteristics of compression algorithms.
              </p>
            </div>
            
            <AdvancedVisualization 
              originalSize={2000}
              compressedSize={1200}
              ratio={40}
              steps={[
                { name: "Format Detection", before: "Input text", after: "Format recognized" },
                { name: "Dictionary Substitution", before: "Original text", after: "Text after substitution" },
                { name: "ML Pattern Recognition", before: "Text with substituted words", after: "Text with recognized patterns" },
                { name: "RLE Encoding", before: "RLE encoded text", after: "Text with recognized patterns" },
                { name: "Statistical Modeling", before: "Statistically optimized text", after: "RLE encoded text" }
              ]}
              history={demoHistory}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-blue-600 dark:text-blue-400 mr-2">
                <Zap className="h-5 w-5" />
              </span>
              <span className="font-semibold text-lg">Compressify</span>
              <Badge variant="outline" className="ml-2 text-xs">2025</Badge>
            </div>
            <div className="flex gap-6">
              <Link to="/api" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">API</Link>
              <Link to="/enterprise" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Enterprise</Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">GitHub</a>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
