import React, { useEffect, useState } from 'react';

interface CheckHistoryItem {
  url: string;
  check_type: string;
  result: boolean;
  details: string | null;
  created_at: string;
}

const CheckHistory: React.FC = () => {
  const [history, setHistory] = useState<CheckHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/history`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setHistory(data))
      .catch(error => {
        console.error('Error fetching history:', error);
        setError('无法加载检查历史。请确保后端服务正在运行。');
      });
  }, []);

  if (error) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">最近检查历史</h2>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">错误</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">最近检查历史</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">暂无检查历史</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {history.map((item, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.url}</p>
                    <p className="text-sm text-gray-500">{item.check_type}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.result ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.result ? '通过' : '未通过'}
                    </p>
                  </div>
                </div>
                {item.details && <p className="mt-1 text-sm text-gray-600">{item.details}</p>}
                <p className="mt-1 text-xs text-gray-400">{new Date(item.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckHistory;