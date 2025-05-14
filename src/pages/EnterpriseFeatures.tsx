import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { 
  Database, Building, Server, Warehouse, Factory, 
  Brain, Cpu, Network, LineChart, Lock, Zap,
  BarChart3, PieChart, Rocket 
} from 'lucide-react';
import EnterpriseComparison from '@/components/compression/EnterpriseComparison';

const EnterpriseFeatures: React.FC = () => {
  const enterpriseFeatures = [
    { 
      name: "Maximální velikost souboru", 
      standard: false, 
      enterprise: true, 
      enterprisePlus: true 
    },
    { 
      name: "AI-optimalizované kompresní algoritmy", 
      standard: false, 
      enterprise: true, 
      enterprisePlus: true 
    },
    { 
      name: "Oborově specifické kompresní profily", 
      standard: false, 
      enterprise: true, 
      enterprisePlus: true 
    },
    { 
      name: "Distribuované zpracování", 
      standard: false, 
      enterprise: true, 
      enterprisePlus: true 
    },
    { 
      name: "Neomezený počet souborů", 
      standard: false, 
      enterprise: true, 
      enterprisePlus: true 
    },
    { 
      name: "Dedikovaná infrastruktura", 
      standard: false, 
      enterprise: false, 
      enterprisePlus: true 
    },
    { 
      name: "On-premise řešení", 
      standard: false, 
      enterprise: false, 
      enterprisePlus: true 
    },
    { 
      name: "API pro automatizaci", 
      standard: false, 
      enterprise: true, 
      enterprisePlus: true 
    },
    { 
      name: "Pokročilé šifrování", 
      standard: false, 
      enterprise: true, 
      enterprisePlus: true 
    },
    { 
      name: "SLA 24/7/365", 
      standard: false, 
      enterprise: true, 
      enterprisePlus: true 
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Advanced Compression Suite</h1>
            <Badge variant="outline" className="bg-purple-500 border-none px-2 py-0.5 text-xs">Enterprise</Badge>
          </div>
          <div className="flex space-x-4">
            <Button asChild variant="outline">
              <Link to="/">
                Zpět na hlavní stránku
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Rocket className="h-20 w-20 text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Nejpokročilejší komprese dat na světě</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Představujeme AI-řízené řešení nové generace, které redefinuje možnosti datové komprese
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Vyžádat demo
            </Button>
            <Button size="lg" variant="outline">
              Prohlédnout případové studie
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <Badge className="bg-amber-600 text-white px-4 py-1">Inovace</Badge>
            </div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Brain className="h-6 w-6 text-amber-400" />
              AI-optimalizovaná komprese
            </h2>
            <p className="text-gray-300">
              Náš algoritmus využívá neuronové sítě k identifikaci vzorů a optimalizaci komprese 
              specificky pro váš typ dat. Dosahuje až o 35% lepších výsledků než tradiční algoritmy.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <Badge className="bg-green-600 text-white px-4 py-1">Efektivita</Badge>
            </div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Zap className="h-6 w-6 text-green-400" />
              Masivní škálovatelnost
            </h2>
            <p className="text-gray-300">
              Zvládněte kompresi petabytových datasetů s naší distribuovanou architekturou.
              Systém automaticky škáluje podle vašich potřeb pro maximální výkon.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <Badge className="bg-blue-600 text-white px-4 py-1">Bezpečnost</Badge>
            </div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Lock className="h-6 w-6 text-blue-400" />
              Enterprise-grade zabezpečení
            </h2>
            <p className="text-gray-300">
              Všechna data jsou zabezpečena end-to-end šifrováním a splňují nejpřísnější 
              regulatorní standardy včetně GDPR, HIPAA a dalších.
            </p>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Srovnání Enterprise funkcí</h2>
          <EnterpriseComparison features={enterpriseFeatures} />
          
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Kontaktovat obchodní oddělení
            </Button>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Technologie budoucnosti</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechFeatureCard 
              title="Neuronové kompresní sítě" 
              description="Algoritmy inspirované lidským mozkem, které se učí z vašich dat pro maximální efektivitu."
              icon={<Brain className="h-8 w-8" />}
            />
            
            <TechFeatureCard 
              title="Kvantové výpočty" 
              description="Využíváme kvantových výpočetních technik pro řešení složitých kompresních problémů."
              icon={<Cpu className="h-8 w-8" />}
            />
            
            <TechFeatureCard 
              title="Edge compute" 
              description="Komprese probíhá co nejblíže ke zdroji dat pro minimální latenci a maximální propustnost."
              icon={<Network className="h-8 w-8" />}
            />
            
            <TechFeatureCard 
              title="Prediktivní analýza" 
              description="Průběžná optimalizace založená na analýze trendů ve vašich datech."
              icon={<LineChart className="h-8 w-8" />}
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-900/50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Změňte způsob práce s velkými daty</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Připojte se k předním společnostem, které již používají naše řešení pro transformaci správy svých dat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
              Naplánovat konzultaci
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white">
              Stáhnout whitepaper
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 Advanced Compression Suite. Všechna práva vyhrazena.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">Podmínky služby</a>
            <a href="#" className="text-gray-400 hover:text-white">Ochrana soukromí</a>
            <a href="#" className="text-gray-400 hover:text-white">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface TechFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TechFeatureCard: React.FC<TechFeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all border border-white/10">
      <div className="text-purple-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default EnterpriseFeatures;
