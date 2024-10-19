import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';

interface DetectionFormProps {
  onSubmit: (url: string, selectedChecks: string[]) => void;
}

const checkItems = [
  { id: 'inquiryForm', label: '询盘表单存在' },
  { id: 'inquirySubmit', label: '询盘表单提交' },
  { id: 'floatingForm', label: '悬浮表单检测' },
  { id: 'thankYouPage', label: '感谢页面检测' },
  { id: 'liveChat', label: '在线聊天插件检测' },
  { id: 'whatsApp', label: 'WhatsApp插件检测' },
  { id: 'emailHyperlink', label: '邮箱超链接检查' },
  { id: 'websiteSpeed', label: '网站打开速度检测' },
  { id: '404Error', label: '404错误页面检查' },
  { id: 'mobileResponsive', label: '移动适配检查' },
  { id: 'googleMaps', label: 'Google地图插件检测' },
];

const DetectionForm: React.FC<DetectionFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);

  const handleCheckChange = (id: string) => {
    setSelectedChecks(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedChecks(selectedChecks.length === checkItems.length ? [] : checkItems.map(item => item.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && selectedChecks.length > 0) {
      onSubmit(url, selectedChecks);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">网站URL</label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">选择检测项目</span>
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {selectedChecks.length === checkItems.length ? '取消全选' : '全选'}
          </button>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto bg-gray-50 p-3 rounded-md">
          {checkItems.map((item) => (
            <label key={item.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedChecks.includes(item.id)}
                onChange={() => handleCheckChange(item.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <CheckSquare className="w-5 h-5 mr-2" />
        运行检测
      </button>
    </form>
  );
};

export default DetectionForm;