
import React from 'react';
import { Check, X, Building } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FeatureComparisonProps {
  features: {
    name: string;
    standard: boolean;
    enterprise: boolean;
    enterprisePlus?: boolean;
  }[];
}

const EnterpriseComparison: React.FC<FeatureComparisonProps> = ({ features }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left bg-white/5">Funkce</th>
            <th className="p-3 text-center bg-white/5">Standard</th>
            <th className="p-3 text-center bg-purple-800/50">
              <div className="flex items-center justify-center gap-2">
                <Building className="h-4 w-4" />
                <span>Enterprise</span>
              </div>
            </th>
            <th className="p-3 text-center bg-purple-900/50">
              <div className="flex items-center justify-center gap-2">
                <Building className="h-4 w-4" />
                <span>Enterprise+</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className={cn(
              "border-b border-white/10",
              index % 2 === 0 ? "bg-white/5" : "bg-transparent"
            )}>
              <td className="p-3">{feature.name}</td>
              <td className="p-3 text-center">
                {feature.standard ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-400 mx-auto" />
                )}
              </td>
              <td className="p-3 text-center">
                {feature.enterprise ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-400 mx-auto" />
                )}
              </td>
              <td className="p-3 text-center">
                {feature.enterprisePlus ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-400 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnterpriseComparison;
