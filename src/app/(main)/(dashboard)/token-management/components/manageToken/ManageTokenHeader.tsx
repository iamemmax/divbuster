


import React from 'react';
import { Download } from 'lucide-react';
import WalletIcon2 from '@/app/icons/(dashboard)/Walleticon2';
import CircleArrow from '@/app/icons/(dashboard)/ArrowCircle';
import InfoColorIcon from '@/app/icons/(dashboard)/InfoColorIcon';
import { tokenHeaderTranslations } from '@/app/(main)/translation/tokenTranslation';
import { useLanguage } from '@/hooks/useLanguage';

interface TokenBalanceCardProps {
  balance?: number;
  onAddTokens?: () => void;
  onInvoice?: () => void;
  onDownload?: () => void;
}



const ManageTokenHeader: React.FC<TokenBalanceCardProps> = ({
  balance,
  onAddTokens,
  onInvoice,
  onDownload,
}) => {
  const {language}= useLanguage()
  const t = tokenHeaderTranslations[language] || tokenHeaderTranslations.en ;

  return (
    <div>
      {/* Token Balance Card */}
      <div className="bg-[#132346] dark:bg-[#1f2937] py-[1.125rem] px-2 md:px-[1.4375rem] rounded-2xl mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white dark:text-gray-200 text-sm md:text-base font-medium font-archivo mb-1">
              {t.totalBalance}
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-white dark:text-gray-100 font-semibold font-archivo text-base md:text-xl">
                {balance?.toFixed(2)}
              </span>
              {/* Token Icon */}
              <InfoColorIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 md:gap-[.625rem] p-2 bg-white dark:bg-gray-800 rounded-2xl py-6 shadow-sm border border-gray-100 dark:border-gray-700">
        {/* Add Tokens Button */}
        <button
          onClick={onAddTokens}
          className="flex items-center gap-2 md:gap-[11px] bg-[#F7F9FC] dark:bg-gray-700 rounded-lg px-4 md:px-[1.3125rem] py-[.6875rem] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
          aria-label={t.addTokens}
        >
          <WalletIcon2 className="w-6 h-6 text-[#292D32] dark:text-gray-300 transition-colors" />
          <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{t.addTokens}</span>
        </button>

        {/* Invoice Button */}
        <button
          onClick={onInvoice}
          className="flex items-center gap-2 md:gap-[11px] bg-[#F7F9FC] dark:bg-gray-700 rounded-lg px-4 md:px-[1.3125rem] py-[.6875rem] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
          aria-label={t.invoice}
        >
          <div className="bg-gray-100 dark:bg-gray-600 rounded-full p-1 flex items-center justify-center transition-colors">
            <CircleArrow className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </div>
          <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{t.invoice}</span>
        </button>

        {/* Download Button */}
        <button
          onClick={onDownload}
          className="flex items-center justify-center px-4 md:px-[1.3125rem] py-[.6875rem] bg-[#F7F9FC] dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
          aria-label={t.download}
        >
          <Download className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default ManageTokenHeader;
