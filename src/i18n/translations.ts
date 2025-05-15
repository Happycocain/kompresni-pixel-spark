
import { useCallback } from "react";

type TranslationKey = 
  | "appName"
  | "edition"
  | "apiDocs"
  | "enterpriseSolution"
  | "newFeature"
  | "aiHeadline"
  | "aiDescription"
  | "features.adaptiveAlgorithms"
  | "features.maxEfficiency"
  | "features.advancedAnalysis"
  | "features.worldClass"
  | "tryDifference"
  | "tryDifferenceDesc"
  | "tryCompressionTool"
  | "tabs.compression"
  | "tabs.batch"
  | "tabs.profiles"
  | "tabs.industry"
  | "tabs.analytics"
  | "compressionMode"
  | "decompressionMode"
  | "originalText"
  | "compressedText"
  | "enterTextToCompress"
  | "enterTextToDecompress"
  | "compressedResult"
  | "decompressedResult"
  | "bytes"
  | "saveResult"
  | "compressionTool"
  | "history"
  | "aiCompression"
  | "profile"
  | "compressionSavedToHistory"
  | "achieved"
  | "compressionRatio"
  | "loadedFromHistory"
  | "textLoadedFromHistory"
  | "profileActivated"
  | "generalProfileActivated"
  | "compressionOptimizedForIndustry"
  | "usingGeneralCompression"
  | "profileSelected"
  | "usingCustomProfile"
  | "patterns"
  | "basic"
  | "extended"
  | "medical"
  | "finance"
  | "tech"
  | "legal"
  | "selectIndustryProfile"
  | "footer.rights"
  | "fileType"
  | "selectFileType"
  | "fileTypes.text"
  | "fileTypes.image"
  | "fileTypes.video"
  | "fileTypes.document"
  | "fileTypes.generic"
  | "algorithmInput"
  | "enterAlgorithmParameters"
  | "fileTypeChanged"
  | "selectedFileType";

type Translations = {
  [key in TranslationKey]: {
    en: string;
    cs: string;
  };
};

const translations: Translations = {
  "appName": {
    en: "Data Compression Studio",
    cs: "Datové Komprešní Studio"
  },
  "edition": {
    en: "PRO Edition",
    cs: "PRO Edice"
  },
  "apiDocs": {
    en: "API Documentation",
    cs: "API Dokumentace"
  },
  "enterpriseSolution": {
    en: "Enterprise Solution",
    cs: "Firemní řešení"
  },
  "newFeature": {
    en: "NEW",
    cs: "NOVINKA"
  },
  "aiHeadline": {
    en: "AI-Powered Compression that Understands Your Data",
    cs: "AI komprese, která rozumí vašim datům"
  },
  "aiDescription": {
    en: "Our state-of-the-art AI compression algorithms adapt to your specific data patterns, achieving compression ratios unmatched by traditional methods.",
    cs: "Naše nejmodernější AI kompresní algoritmy se přizpůsobují vašim specifickým datovým vzorům a dosahují kompresních poměrů, které tradiční metody nemohou překonat."
  },
  "features.adaptiveAlgorithms": {
    en: "Adaptive Algorithms",
    cs: "Adaptivní algoritmy"
  },
  "features.maxEfficiency": {
    en: "Maximum Efficiency",
    cs: "Maximální efektivita"
  },
  "features.advancedAnalysis": {
    en: "Advanced Analysis",
    cs: "Pokročilá analýza"
  },
  "features.worldClass": {
    en: "World-Class Compression",
    cs: "Světová komprese"
  },
  "tryDifference": {
    en: "Try the difference",
    cs: "Vyzkoušejte rozdíl"
  },
  "tryDifferenceDesc": {
    en: "See how our AI compression outperforms traditional algorithms",
    cs: "Podívejte se, jak naše AI komprese překonává tradiční algoritmy"
  },
  "tryCompressionTool": {
    en: "Try Compression Tool",
    cs: "Vyzkoušet kompresní nástroj"
  },
  "tabs.compression": {
    en: "Compression Tool",
    cs: "Kompresní nástroj"
  },
  "tabs.batch": {
    en: "Batch Processing",
    cs: "Dávkové zpracování"
  },
  "tabs.profiles": {
    en: "Compression Profiles",
    cs: "Kompresní profily"
  },
  "tabs.industry": {
    en: "Industry Solutions",
    cs: "Oborová řešení"
  },
  "tabs.analytics": {
    en: "Analytics",
    cs: "Analytika"
  },
  "compressionMode": {
    en: "Compression Mode",
    cs: "Kompresní režim"
  },
  "decompressionMode": {
    en: "Decompression Mode",
    cs: "Dekompresní režim"
  },
  "originalText": {
    en: "Original Text",
    cs: "Původní text"
  },
  "compressedText": {
    en: "Compressed Text",
    cs: "Komprimovaný text"
  },
  "enterTextToCompress": {
    en: "Enter text to compress...",
    cs: "Zadejte text ke kompresi..."
  },
  "enterTextToDecompress": {
    en: "Enter compressed text to decompress...",
    cs: "Zadejte komprimovaný text k dekompresi..."
  },
  "compressedResult": {
    en: "Compressed Result",
    cs: "Komprimovaný výsledek"
  },
  "decompressedResult": {
    en: "Decompressed Result",
    cs: "Dekomprimovaný výsledek"
  },
  "bytes": {
    en: "bytes",
    cs: "bajtů"
  },
  "saveResult": {
    en: "Save Result",
    cs: "Uložit výsledek"
  },
  "compressionTool": {
    en: "Compression Tool",
    cs: "Kompresní nástroj"
  },
  "history": {
    en: "History",
    cs: "Historie"
  },
  "aiCompression": {
    en: "AI Compression",
    cs: "AI komprese"
  },
  "profile": {
    en: "profile",
    cs: "profil"
  },
  "compressionSavedToHistory": {
    en: "Compression saved to history",
    cs: "Komprese uložena do historie"
  },
  "achieved": {
    en: "Achieved",
    cs: "Dosaženo"
  },
  "compressionRatio": {
    en: "compression ratio",
    cs: "kompresního poměru"
  },
  "loadedFromHistory": {
    en: "Loaded from history",
    cs: "Načteno z historie"
  },
  "textLoadedFromHistory": {
    en: "Text loaded from history record",
    cs: "Text načten ze záznamu historie"
  },
  "profileActivated": {
    en: "profile activated",
    cs: "profil aktivován"
  },
  "generalProfileActivated": {
    en: "General profile activated",
    cs: "Obecný profil aktivován"
  },
  "compressionOptimizedForIndustry": {
    en: "Compression optimized for your industry",
    cs: "Komprese optimalizovaná pro váš obor"
  },
  "usingGeneralCompression": {
    en: "Using general compression",
    cs: "Používá se obecná komprese"
  },
  "profileSelected": {
    en: "profile selected",
    cs: "profil vybrán"
  },
  "usingCustomProfile": {
    en: "Using custom compression profile with",
    cs: "Používá se vlastní kompresní profil s"
  },
  "patterns": {
    en: "patterns",
    cs: "vzory"
  },
  "basic": {
    en: "Basic",
    cs: "Základní"
  },
  "extended": {
    en: "Extended",
    cs: "Rozšířené"
  },
  "selectIndustryProfile": {
    en: "Select Industry Profile",
    cs: "Vyberte oborový profil"
  },
  "medical": {
    en: "Medical",
    cs: "Medicína"
  },
  "finance": {
    en: "Finance",
    cs: "Finance"
  },
  "tech": {
    en: "Technology",
    cs: "Technologie"
  },
  "legal": {
    en: "Legal",
    cs: "Právní"
  },
  "footer.rights": {
    en: "All rights reserved. Advanced compression algorithms protected by patents.",
    cs: "Všechna práva vyhrazena. Pokročilé kompresní algoritmy jsou chráněny patenty."
  },
  "fileType": {
    en: "File Type",
    cs: "Typ souboru"
  },
  "selectFileType": {
    en: "Select file type",
    cs: "Vyberte typ souboru"
  },
  "fileTypes.text": {
    en: "Text",
    cs: "Text"
  },
  "fileTypes.image": {
    en: "Image",
    cs: "Obrázek"
  },
  "fileTypes.video": {
    en: "Video",
    cs: "Video"
  },
  "fileTypes.document": {
    en: "Document",
    cs: "Dokument"
  },
  "fileTypes.generic": {
    en: "Generic File",
    cs: "Obecný soubor"
  },
  "algorithmInput": {
    en: "Algorithm Parameters",
    cs: "Parametry algoritmu"
  },
  "enterAlgorithmParameters": {
    en: "Enter algorithm parameters...",
    cs: "Zadejte parametry algoritmu..."
  },
  "fileTypeChanged": {
    en: "File type changed",
    cs: "Typ souboru změněn"
  },
  "selectedFileType": {
    en: "Selected file type",
    cs: "Vybraný typ souboru"
  }
};

export function useTranslation(language: string) {
  const t = useCallback((key: TranslationKey): string => {
    const translationObj = translations[key];
    if (!translationObj) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return translationObj[language as keyof typeof translationObj] || translationObj.en;
  }, [language]);

  return { t };
}
