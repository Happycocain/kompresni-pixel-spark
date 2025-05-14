
/**
 * API Klient pro kompresi dat
 * Umožňuje integraci s externími systémy
 */

import { compressText, decompressText } from "@/utils/compressionAlgorithm";

export interface CompressionApiResponse {
  originalSize: number;
  compressedSize: number;
  ratio: number;
  compressed?: string;
  decompressed?: string;
  success: boolean;
  error?: string;
}

export interface BatchCompressionResponse {
  results: CompressionApiResponse[];
  totalOriginalSize: number;
  totalCompressedSize: number;
  averageRatio: number;
}

/**
 * Zpracuje kompresi textu a vrátí API odpověď
 */
export const compressViaApi = (text: string): CompressionApiResponse => {
  try {
    if (!text || text.trim() === '') {
      return {
        originalSize: 0,
        compressedSize: 0,
        ratio: 0,
        success: false,
        error: 'Prázdný vstup'
      };
    }

    const result = compressText(text);
    return {
      originalSize: text.length,
      compressedSize: result.compressed.length,
      ratio: result.ratio,
      compressed: result.compressed,
      success: true
    };
  } catch (error) {
    console.error('Chyba při kompresi:', error);
    return {
      originalSize: text.length,
      compressedSize: 0,
      ratio: 0,
      success: false,
      error: 'Chyba při kompresi dat'
    };
  }
};

/**
 * Zpracuje dekompresi textu a vrátí API odpověď
 */
export const decompressViaApi = (compressedText: string): CompressionApiResponse => {
  try {
    if (!compressedText || compressedText.trim() === '') {
      return {
        originalSize: 0,
        compressedSize: 0,
        ratio: 0,
        success: false,
        error: 'Prázdný vstup'
      };
    }

    const decompressed = decompressText(compressedText);
    const originalSize = decompressed.length;
    const compressedSize = compressedText.length;
    const ratio = originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0;

    return {
      originalSize,
      compressedSize,
      ratio,
      decompressed,
      success: true
    };
  } catch (error) {
    console.error('Chyba při dekompresi:', error);
    return {
      originalSize: 0,
      compressedSize: compressedText.length,
      ratio: 0,
      success: false,
      error: 'Chyba při dekompresi dat'
    };
  }
};

/**
 * Zpracuje dávkovou kompresi textů
 */
export const processBatch = (texts: string[]): BatchCompressionResponse => {
  const results: CompressionApiResponse[] = texts.map(text => compressViaApi(text));
  
  const totalOriginalSize = results.reduce((sum, item) => sum + item.originalSize, 0);
  const totalCompressedSize = results.reduce((sum, item) => sum + item.compressedSize, 0);
  const averageRatio = totalOriginalSize > 0 
    ? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100 
    : 0;

  return {
    results,
    totalOriginalSize,
    totalCompressedSize,
    averageRatio
  };
};
