
/**
 * Innovative compression algorithm implementation
 * 
 * This implementation uses a combination of:
 * 1. Run-length encoding for repeated characters
 * 2. Dictionary-based compression for common patterns
 * 3. Bit-level optimization for specific character sets
 */

// Dictionary of common sequences
const commonPatterns: Record<string, string> = {
  "the": "†",
  "and": "‡",
  "ing": "§",
  "ion": "¶",
  "that": "©",
  "have": "®",
  "this": "™",
  "with": "¥",
  "from": "€",
  "your": "£",
};

/**
 * Compress text using our custom algorithm
 */
export const compressText = (text: string): { compressed: string; ratio: number; steps: any[] } => {
  if (!text) return { compressed: "", ratio: 0, steps: [] };
  
  const steps = [];
  let workingText = text;
  
  // Step 1: Replace common patterns with special characters
  steps.push({ name: "Dictionary substitution", before: workingText });
  Object.entries(commonPatterns).forEach(([pattern, replacement]) => {
    workingText = workingText.replace(new RegExp(pattern, "g"), replacement);
  });
  steps.push({ name: "After dictionary substitution", after: workingText });
  
  // Step 2: Apply run-length encoding for repeated characters
  steps.push({ name: "Run-length encoding", before: workingText });
  let rleResult = "";
  let count = 1;
  
  for (let i = 0; i < workingText.length; i++) {
    if (workingText[i] === workingText[i + 1]) {
      count++;
    } else {
      // Only encode if there are 3 or more repeated characters
      if (count >= 3) {
        rleResult += `${count}×${workingText[i]}`;
      } else {
        rleResult += workingText[i].repeat(count);
      }
      count = 1;
    }
  }
  
  workingText = rleResult;
  steps.push({ name: "After run-length encoding", after: workingText });
  
  // Step 3: Bit-level optimization (simulated for demonstration)
  // In a real implementation, this would involve actual bit-level operations
  steps.push({ name: "Bit-level optimization", before: workingText });
  // This step is simulated for the demo
  const bitOptimized = workingText; 
  steps.push({ name: "After bit-level optimization", after: bitOptimized });

  // Calculate compression ratio
  const originalSize = text.length;
  const compressedSize = bitOptimized.length;
  const ratio = originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0;
  
  return {
    compressed: bitOptimized,
    ratio: parseFloat(ratio.toFixed(2)),
    steps,
  };
};

/**
 * Decompress text that was compressed with our algorithm
 */
export const decompressText = (compressed: string): string => {
  if (!compressed) return "";
  
  let workingText = compressed;
  
  // Step 1: Reverse run-length encoding
  const rlePattern = /(\d+)×(.)/g;
  workingText = workingText.replace(rlePattern, (_, count, char) => {
    return char.repeat(parseInt(count, 10));
  });
  
  // Step 2: Reverse dictionary substitution
  const reversedPatterns: Record<string, string> = {};
  Object.entries(commonPatterns).forEach(([pattern, replacement]) => {
    reversedPatterns[replacement] = pattern;
  });
  
  Object.entries(reversedPatterns).forEach(([special, original]) => {
    workingText = workingText.replace(new RegExp(special, "g"), original);
  });
  
  return workingText;
};
