import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { ComingSoonTranslations } from '../../translation/dashboardTranslation';

const ComingSoon: React.FC<{ title: string }> = ({ title }) => {
  const { language } = useLanguage();
  const t = ComingSoonTranslations[language] || ComingSoonTranslations.en;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t.description}
        </p>
        
        <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
          {t.comingSoon}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;