
import type { FileType } from '../components/compression/FileTypeSelector';

interface CompressionOptions {
  fileType?: FileType;
  algorithmParams?: string;
}

// Simulace základního kompresního algoritmu
export function compressText(text: string, options: CompressionOptions = {}): { 
  compressed: string; 
  ratio: number; 
  steps: Array<{name: string; before: string; after: string}>;
} {
  console.log("Compressing with options:", options);
  
  // Začneme s kroky komprese
  const steps = [];
  
  // Krok 1: Detekce opakujících se vzorců
  const patternStep = {
    name: "Pattern detection",
    before: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
    after: "Identified repeated patterns"
  };
  steps.push(patternStep);
  
  // Krok 2: Substituce
  const substitutionStep = {
    name: "Dictionary substitution",
    before: "Original tokens",
    after: "Substituted tokens"
  };
  steps.push(substitutionStep);
  
  // Krok 3: Finalizace
  const encoded = text
    .split('')
    .map(char => {
      // Velmi jednoduchá "komprese" - nahradí mezery a některé znaky zkratkami
      if (char === ' ') return '_';
      if (char === 'a') return '@';
      if (char === 'e') return '3';
      if (char === 'i') return '1';
      if (char === 'o') return '0';
      return char;
    })
    .join('');
  
  const finalStep = {
    name: "Encoding",
    before: "Prepared sequence",
    after: encoded.substring(0, 50) + (encoded.length > 50 ? "..." : "")
  };
  steps.push(finalStep);
  
  // Aplikujeme specifické optimalizace podle typu souboru
  let optimizedEncoded = encoded;
  if (options.fileType) {
    const fileTypeStep = {
      name: `${options.fileType.charAt(0).toUpperCase() + options.fileType.slice(1)} optimization`,
      before: encoded.substring(0, 30),
      after: "Format-specific optimized"
    };
    steps.push(fileTypeStep);
    
    // Simulujme větší kompresi pro různé typy souborů
    switch (options.fileType) {
      case 'image':
        optimizedEncoded = encoded.substring(0, Math.floor(encoded.length * 0.65));
        break;
      case 'video':
        optimizedEncoded = encoded.substring(0, Math.floor(encoded.length * 0.55));
        break;
      case 'document':
        optimizedEncoded = encoded.substring(0, Math.floor(encoded.length * 0.70));
        break;
      default:
        optimizedEncoded = encoded.substring(0, Math.floor(encoded.length * 0.85));
    }
  }
  
  // Pokud jsou zadány parametry algoritmu, aplikujeme další optimalizaci
  if (options.algorithmParams?.length) {
    const algoParamsStep = {
      name: "Custom algorithm parameters",
      before: optimizedEncoded.substring(0, 30),
      after: `Applied parameters: ${options.algorithmParams.substring(0, 20)}`
    };
    steps.push(algoParamsStep);
    
    // Simulujeme vliv parametrů - čím delší parametry, tím lepší komprese
    const paramFactor = Math.min(0.9, 0.5 + (options.algorithmParams.length / 100));
    optimizedEncoded = optimizedEncoded.substring(0, Math.floor(optimizedEncoded.length * paramFactor));
  }
  
  // Výpočet kompresního poměru
  const ratio = Math.round(((text.length - optimizedEncoded.length) / text.length) * 100);
  
  return {
    compressed: optimizedEncoded,
    ratio,
    steps
  };
}

// Dekompresní funkce
export function decompressText(compressed: string, options: CompressionOptions = {}): string {
  console.log("Decompressing with options:", options);
  
  // Simulace dekomprese - pro demonstrační účely pouze obrátíme základní substituci
  return compressed
    .split('')
    .map(char => {
      if (char === '_') return ' ';
      if (char === '@') return 'a';
      if (char === '3') return 'e';
      if (char === '1') return 'i';
      if (char === '0') return 'o';
      return char;
    })
    .join('');
}
