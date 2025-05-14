
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Code2, CopyIcon, CheckIcon } from "lucide-react";
import { compressViaApi, decompressViaApi } from "@/api/compressionApi";

const ApiDocs: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [testInput, setTestInput] = useState('');
  const [apiResult, setApiResult] = useState('');
  const { toast } = useToast();

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleTestApi = (type: 'compress' | 'decompress') => {
    try {
      if (!testInput.trim()) {
        toast({
          title: "Prázdný vstup",
          description: "Zadejte text pro testování API",
          variant: "destructive",
        });
        return;
      }

      const result = type === 'compress' 
        ? compressViaApi(testInput)
        : decompressViaApi(testInput);

      setApiResult(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('API test error:', error);
      toast({
        title: "Chyba API",
        description: "Došlo k chybě při testování API",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6">API Dokumentace</h1>
        <p className="text-xl mb-12">
          Toto API umožňuje integraci naší pokročilé kompresní technologie do vašich systémů.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6">
              <div className="flex items-center space-x-3">
                <Code2 className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Komprese textu</h2>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Endpoint</h3>
                <div className="bg-gray-800 p-3 rounded-md flex justify-between items-center">
                  <code>POST /api/compress</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard('POST /api/compress', 'compress-endpoint')}
                  >
                    {copied === 'compress-endpoint' ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Request Body</h3>
                <div className="bg-gray-800 p-3 rounded-md flex flex-col">
                  <div className="flex justify-between">
                    <span>JSON</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => copyToClipboard(JSON.stringify({ text: "Text k kompresi" }, null, 2), 'compress-request')}
                    >
                      {copied === 'compress-request' ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="mt-2 overflow-x-auto">
                    {JSON.stringify({ text: "Text k kompresi" }, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Response</h3>
                <div className="bg-gray-800 p-3 rounded-md flex flex-col">
                  <div className="flex justify-between">
                    <span>JSON</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => copyToClipboard(JSON.stringify({
                        originalSize: 14,
                        compressedSize: 10,
                        ratio: 28.57,
                        compressed: "Tx† k kmprs",
                        success: true
                      }, null, 2), 'compress-response')}
                    >
                      {copied === 'compress-response' ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="mt-2 overflow-x-auto">
                    {JSON.stringify({
                      originalSize: 14,
                      compressedSize: 10,
                      ratio: 28.57,
                      compressed: "Tx† k kmprs",
                      success: true
                    }, null, 2)}
                  </pre>
                </div>
              </div>
            </section>

            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6">
              <div className="flex items-center space-x-3">
                <Code2 className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Dekomprese textu</h2>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Endpoint</h3>
                <div className="bg-gray-800 p-3 rounded-md flex justify-between items-center">
                  <code>POST /api/decompress</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard('POST /api/decompress', 'decompress-endpoint')}
                  >
                    {copied === 'decompress-endpoint' ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Request Body</h3>
                <div className="bg-gray-800 p-3 rounded-md flex flex-col">
                  <div className="flex justify-between">
                    <span>JSON</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => copyToClipboard(JSON.stringify({ compressedText: "Tx† k kmprs" }, null, 2), 'decompress-request')}
                    >
                      {copied === 'decompress-request' ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="mt-2 overflow-x-auto">
                    {JSON.stringify({ compressedText: "Tx† k kmprs" }, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Response</h3>
                <div className="bg-gray-800 p-3 rounded-md flex flex-col">
                  <div className="flex justify-between">
                    <span>JSON</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => copyToClipboard(JSON.stringify({
                        originalSize: 14,
                        compressedSize: 10,
                        ratio: 28.57,
                        decompressed: "Text k kompresi",
                        success: true
                      }, null, 2), 'decompress-response')}
                    >
                      {copied === 'decompress-response' ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="mt-2 overflow-x-auto">
                    {JSON.stringify({
                      originalSize: 14,
                      compressedSize: 10,
                      ratio: 28.57,
                      decompressed: "Text k kompresi",
                      success: true
                    }, null, 2)}
                  </pre>
                </div>
              </div>
            </section>
          </div>

          <div>
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold">Testování API</h2>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Vstupní text</label>
                <Textarea
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="Zadejte text pro testování API..."
                  className="h-32"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button onClick={() => handleTestApi('compress')}>
                  Testovat kompresi
                </Button>
                <Button variant="outline" onClick={() => handleTestApi('decompress')}>
                  Testovat dekompresi
                </Button>
              </div>
              
              {apiResult && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Výsledek API</h3>
                  <div className="bg-gray-800 p-3 rounded-md">
                    <pre className="overflow-x-auto whitespace-pre-wrap">
                      {apiResult}
                    </pre>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6 mt-6">
              <h2 className="text-2xl font-bold">SDK knihovny</h2>
              <p>
                Pro snadnější integraci nabízíme SDK v několika programovacích jazycích. 
                Stáhněte si knihovnu pro váš preferovaný jazyk a začněte používat naši 
                kompresní technologii ihned.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center space-x-2 justify-center">
                  <span>JavaScript SDK</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 justify-center">
                  <span>Python SDK</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 justify-center">
                  <span>Java SDK</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 justify-center">
                  <span>.NET SDK</span>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
