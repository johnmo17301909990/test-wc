import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ResultsDisplayProps {
  results: Record<string, boolean | string>;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const getIcon = (result: boolean | string) => {
    if (typeof result === 'string') return <Clock className="w-5 h-5 text-blue-500" />;
    return result ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getResultMessage = (key: string, value: boolean | string): string => {
    const messages: Record<string, { success: string; failure: string }> = {
      inquiryForm: {
        success: "检测到询盘表单，位置正确。",
        failure: "未检测到询盘表单，建议添加以便客户联系。"
      },
      inquirySubmit: {
        success: "表单提交正常，无问题。",
        failure: "表单提交失败，建议检查电话号码输入限制或其他字段。"
      },
      floatingForm: {
        success: "检测到悬浮表单，用户体验良好。",
        failure: "未检测到悬浮表单，建议添加以提高用户转化率。"
      },
      thankYouPage: {
        success: "检测到感谢页面，表单提交后用户反馈完整。",
        failure: "未检测到感谢页面，建议设置感谢页面增强用户体验。"
      },
      liveChat: {
        success: "检测到在线聊天插件，支持用户即时沟通。",
        failure: "未检测到在线聊天插件，建议使用 Tawk.to 以便更好地服务客户。"
      },
      whatsApp: {
        success: "检测到 WhatsApp 插件，用户可便捷联系。",
        failure: "未检测到 WhatsApp 插件，建议添加以便与客户交流。"
      },
      emailHyperlink: {
        success: "邮箱超链接检测成功，用户点击邮箱可直接发邮件。",
        failure: "未检测到邮箱超链接，建议添加 mailto 链接以方便客户联系。"
      },
      websiteSpeed: {
        success: "网站加载时间良好，性能良好。",
        failure: "网站加载时间较长，建议优化。"
      },
      '404Error': {
        success: "未检测到 404 页面，网站结构良好。",
        failure: "检测到 404 页面，建议尽快修复。"
      },
      mobileResponsive: {
        success: "检测到移动适配，用户体验良好。",
        failure: "未检测到移动适配，建议添加响应式设计，提升移动用户体验。"
      },
      googleMaps: {
        success: "检测到 Google 地图插件，帮助客户定位公司地址。",
        failure: "未检测到 Google 地图插件，建议添加以方便客户找到公司。"
      },
    };

    if (typeof value === 'string') {
      if (key === 'websiteSpeed') {
        const [time, score] = value.split(',');
        return `网站加载时间：${time}，性能得分：${score}（满分100）。${parseFloat(time) > 3 ? messages[key].failure : messages[key].success}`;
      }
      return value;
    }

    return value ? messages[key].success : messages[key].failure;
  };

  const getLabel = (key: string): string => {
    const labels: Record<string, string> = {
      inquiryForm: '询盘表单存在',
      inquirySubmit: '询盘表单提交',
      floatingForm: '悬浮表单检测',
      thankYouPage: '感谢页面检测',
      liveChat: '在线聊天插件检测',
      whatsApp: 'WhatsApp插件检测',
      emailHyperlink: '邮箱超链接',
      websiteSpeed: '网站打开速度',
      '404Error': '404错误页面存在',
      mobileResponsive: '移动适配',
      googleMaps: 'Google地图插件检测',
    };
    return labels[key] || key;
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">检测结果</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {Object.entries(results).map(([key, value]) => (
            <li key={key} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getIcon(value)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{getLabel(key)}</p>
                    <p className="text-sm text-gray-500">{getResultMessage(key, value)}</p>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeof value === 'string' ? 'bg-blue-100 text-blue-800' : (value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}`}>
                    {typeof value === 'string' ? '信息' : (value ? '通过' : '未通过')}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultsDisplay;