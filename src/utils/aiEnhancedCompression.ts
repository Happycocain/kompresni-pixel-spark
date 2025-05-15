
import { compressText } from './compressionAlgorithm';
import type { FileType } from '../components/compression/FileTypeSelector';

interface AICompressionOptions {
  industry?: string | null;
  fileType?: FileType;
  algorithmParams?: string;
  learningEnabled?: boolean;
  deepAnalysis?: boolean;
}

export function aiCompressText(text: string, options: AICompressionOptions = {}) {
  console.log("AI compression with options:", options);
  
  // Základní komprese
  let result = compressText(text, { 
    fileType: options.fileType,
    algorithmParams: options.algorithmParams
  });
  
  // Rozšířené kroky komprese pro AI
  const steps = [...result.steps];
  
  // Krok: AI analýza vzorců
  steps.push({
    name: "AI pattern analysis",
    before: "Raw text patterns",
    after: "AI-optimized patterns"
  });
  
  // Krok: Adaptivní komprese podle typu obsahu
  steps.push({
    name: "Content-based optimization",
    before: "Generic compression",
    after: "Content-optimized compression"
  });
  
  // Oborově specifické komprese
  if (options.industry) {
    steps.push({
      name: `${options.industry} industry optimization`,
      before: "Standard compression",
      after: `${options.industry}-optimized compression`
    });
    
    // Simulace lepšího kompresního poměru pro různé obory
    switch (options.industry) {
      case 'medical':
        result.ratio += 15;
        break;
      case 'finance':
        result.ratio += 12;
        break;
      case 'tech':
        result.ratio += 18;
        break;
      case 'legal':
        result.ratio += 10;
        break;
    }
  }
  
  // Specifické optimalizace pro různé typy souborů pomocí AI
  if (options.fileType) {
    steps.push({
      name: `AI ${options.fileType} format optimization`,
      before: "Generic format",
      after: `AI-optimized ${options.fileType} format`
    });
    
    // Simulujeme významnější kompresi pro AI optimalizaci podle typu souboru
    switch (options.fileType) {
      case 'image':
        result.ratio += 20;
        break;
      case 'video':
        result.ratio += 25;
        break;
      case 'document':
        result.ratio += 15;
        break;
      case 'text':
        result.ratio += 10;
        break;
      default:
        result.ratio += 5;
    }
  }
  
  // Pokud jsou zadány parametry algoritmu, aplikujeme AI optimalizaci
  if (options.algorithmParams?.length) {
    steps.push({
      name: "AI parameter optimization",
      before: "Basic parameters",
      after: "AI-enhanced parameters"
    });
    
    // Simulace vlivu AI na parametry
    result.ratio += Math.min(15, options.algorithmParams.length / 2);
  }
  
  // Úprava délky komprimovaného textu na základě námi vypočítaného poměru
  const targetLength = Math.floor(text.length * (1 - (Math.min(95, result.ratio) / 100)));
  const compressed = text.substring(0, targetLength);
  
  // Větší zkrácení pro delší texty (simulace efektivnější komprese)
  const adjustedCompressed = compressed.length > 100 
    ? compressed.substring(0, Math.floor(compressed.length * 0.9))
    : compressed;

  // Generování umělých "insights" (postřehů) o kompresi
  const insights = {
    patternRecognition: {
      repeatingPatterns: 12,
      uniqueTokens: 145,
      entropyReduction: "42%"
    },
    optimizations: [
      { name: "Dictionary mapping", savingsPercent: 23 },
      { name: "Run-length encoding", savingsPercent: 15 },
      { name: "Neural prediction", savingsPercent: 32 }
    ],
    typeSpecific: options.fileType 
      ? { 
          format: options.fileType,
          specializations: [
            { technique: `${options.fileType}-optimized tokenization`, impact: "high" },
            { technique: "Format-specific dictionary", impact: "medium" },
          ]
        }
      : undefined,
    parameters: options.algorithmParams
      ? { 
          applied: options.algorithmParams.split(" ").length,
          effectiveParameters: Math.ceil(options.algorithmParams.length / 3),
          parameterUtilization: "87%"
        }
      : undefined
  };
  
  return {
    compressed: adjustedCompressed,
    ratio: result.ratio,
    steps,
    insights
  };
}
