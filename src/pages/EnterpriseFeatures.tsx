
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Database, Building, Server, Warehouse, Factory } from 'lucide-react';

const EnterpriseFeatures: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Advanced Compression Suite</h1>
            <span className="bg-purple-500 px-2 py-0.5 rounded text-xs">Enterprise</span>
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
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Building className="h-16 w-16 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Enterprise řešení</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pokročilé kompresní nástroje navržené pro rozsáhlá podniková řešení
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            icon={<Database className="h-8 w-8" />}
            title="Masivní datové sady"
            description="Zvládněte kompresi terrabytových souborů s optimalizovaným výkonem a paralelním zpracováním."
          />
          <FeatureCard 
            icon={<Server className="h-8 w-8" />}
            title="Distribuované zpracování"
            description="Využijte sílu cloud computingu pro rozdělení práce napříč mnoha výpočetními zdroji."
          />
          <FeatureCard 
            icon={<Warehouse className="h-8 w-8" />}
            title="Vlastní kompresní profily"
            description="Vytvářejte specializované kompresní algoritmy optimalizované pro vaše specifické typy dat."
          />
          <FeatureCard 
            icon={<Factory className="h-8 w-8" />}
            title="Automatizované workflow"
            description="Integrujte kompresi do vašich firemních procesů pomocí REST API a webhooků."
          />
          <FeatureCard 
            icon={<Building className="h-8 w-8" />}
            title="SLA a podpora 24/7"
            description="Získejte technickou podporu na nejvyšší úrovni a garantovanou dostupnost služby."
          />
          <FeatureCard 
            icon={<Factory className="h-8 w-8" />}
            title="Proprietární algoritmy"
            description="Využijte pokročilé kompresní metody vyvinuté speciálně pro enterprise zákazníky."
          />
        </div>
        
        <div className="bg-white/10 rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Začněte s Enterprise řešením ještě dnes</h2>
          <p className="text-gray-300 mb-6">
            Kontaktujte náš prodejní tým pro vytvoření nabídky přizpůsobené potřebám vaší společnosti.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Vyžádat nabídku
          </Button>
        </div>
      </div>
      
      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Advanced Compression Suite. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
      <div className="text-purple-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default EnterpriseFeatures;
