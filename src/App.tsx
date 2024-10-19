import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import DetectionForm from './components/DetectionForm';
import ResultsDisplay from './components/ResultsDisplay';
import CheckHistory from './components/CheckHistory';

function App() {
  const [results, setResults] = useState<Record<string, boolean | string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (url: string, selectedChecks: string[]) => {
    try {
      setIsLoading(true);
      setError(null);
      setResults(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, checks: selectedChecks }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      setError(`无法连接到服务器，请确保后端服务正在运行。错误详情：${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Globe className="h-20 w-20 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">网站检测系统</h1>
          <p className="text-xl text-gray-600">全面分析您的网站，提供专业优化建议</p>
        </div>
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-8">
            <DetectionForm onSubmit={handleSubmit} />
            {isLoading && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-gray-600">正在检测中，请稍候...</p>
              </div>
            )}
            {error && (
              <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">错误</p>
                <p>{error}</p>
              </div>
            )}
          </div>
          {results && (
            <div className="border-t border-gray-200">
              <ResultsDisplay results={results} />
            </div>
          )}
        </div>
        <CheckHistory />
      </div>
    </div>
  );
}

export default App;