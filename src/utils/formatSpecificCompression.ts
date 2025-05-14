
/**
 * Specializované kompresní utility pro různé formáty dat
 */

import { compressText } from './compressionAlgorithm';

// Pomocné funkce pro práci s formáty
const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const isValidXml = (str: string): boolean => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "application/xml");
    const errorNode = doc.querySelector('parsererror');
    return !errorNode;
  } catch (e) {
    return false;
  }
};

// Detekce formátu vstupu
export enum DataFormat {
  JSON,
  XML,
  CSV,
  PlainText
}

export const detectFormat = (input: string): DataFormat => {
  if (isValidJson(input)) return DataFormat.JSON;
  if (isValidXml(input)) return DataFormat.XML;
  if (input.includes(',') && input.includes('\n') && input.split('\n')[0].includes(',')) return DataFormat.CSV;
  return DataFormat.PlainText;
};

/**
 * Optimalizace JSON dat před kompresí
 */
export const compressJson = (jsonStr: string): { compressed: string; ratio: number; steps: any[] } => {
  try {
    // Parsování a normalizace JSON objektu
    const jsonObj = JSON.parse(jsonStr);
    
    // Odstranění zbytečných mezer z JSON
    const minified = JSON.stringify(jsonObj);
    
    // Aplikace standardní komprese na minifikovaný JSON
    const compressionResult = compressText(minified);
    
    // Přidání informace o původním formátu
    compressionResult.steps.unshift({ 
      name: "Formát detekce", 
      before: "Rozpoznán JSON formát", 
      after: "Minifikováno před kompresí"
    });
    
    return compressionResult;
  } catch (error) {
    console.error("Chyba při kompresi JSON:", error);
    return compressText(jsonStr); // Fallback na standardní kompresi
  }
};

/**
 * Optimalizace XML dat před kompresí
 */
export const compressXml = (xmlStr: string): { compressed: string; ratio: number; steps: any[] } => {
  try {
    // Odstranění zbytečných bílých znaků z XML
    const minified = xmlStr
      .replace(/>\s+</g, '><') // Odstranění mezer mezi tagy
      .replace(/\s+/g, ' ')    // Nahrazení více mezer jednou
      .trim();
    
    // Aplikace standardní komprese na minifikovaný XML
    const compressionResult = compressText(minified);
    
    // Přidání informace o původním formátu
    compressionResult.steps.unshift({ 
      name: "Formát detekce", 
      before: "Rozpoznán XML formát", 
      after: "Minifikováno před kompresí"
    });
    
    return compressionResult;
  } catch (error) {
    console.error("Chyba při kompresi XML:", error);
    return compressText(xmlStr); // Fallback na standardní kompresi
  }
};

/**
 * Optimalizace CSV dat před kompresí
 */
export const compressCsv = (csvStr: string): { compressed: string; ratio: number; steps: any[] } => {
  try {
    // V případě CSV můžeme optimalizovat opakující se hodnoty nebo strukturu
    // Toto je jednoduchá implementace, která by mohla být dále rozšířena
    
    // Aplikace standardní komprese na CSV
    const compressionResult = compressText(csvStr);
    
    // Přidání informace o původním formátu
    compressionResult.steps.unshift({ 
      name: "Formát detekce", 
      before: "Rozpoznán CSV formát", 
      after: "Aplikována standardní komprese"
    });
    
    return compressionResult;
  } catch (error) {
    console.error("Chyba při kompresi CSV:", error);
    return compressText(csvStr); // Fallback na standardní kompresi
  }
};

/**
 * Chytrá komprese dat podle rozpoznaného formátu
 */
export const smartCompress = (input: string): { compressed: string; ratio: number; steps: any[]; format: DataFormat } => {
  const format = detectFormat(input);
  
  let result;
  switch (format) {
    case DataFormat.JSON:
      result = compressJson(input);
      break;
    case DataFormat.XML:
      result = compressXml(input);
      break;
    case DataFormat.CSV:
      result = compressCsv(input);
      break;
    default:
      result = compressText(input);
      result.steps.unshift({ 
        name: "Formát detekce", 
        before: "Nerozpoznán specifický formát", 
        after: "Aplikována standardní komprese" 
      });
  }
  
  return {
    ...result,
    format
  };
};
