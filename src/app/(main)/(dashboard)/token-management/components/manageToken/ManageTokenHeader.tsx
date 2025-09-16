import React from 'react';
import { Download } from 'lucide-react';
import WalletIcon2 from '@/app/icons/(dashboard)/Walleticon2';
import CircleArrow from '@/app/icons/(dashboard)/ArrowCircle';

interface TokenBalanceCardProps {
  balance?: number;
  onAddTokens?: () => void;
  onInvoice?: () => void;
  onDownload?: () => void;
}

const ManageTokenHeader: React.FC<TokenBalanceCardProps> = ({
  balance ,
  onAddTokens,
  onInvoice,
  onDownload,
}) => {
  return (
    <div>
      {/* Token Balance Card */}
      <div className="bg-[#132346] dark:bg-gray-900 py-[1.125rem] px-2 md:px-[1.4375rem] rounded-2xl mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white dark:text-gray-200 text-sm md:text-base font-medium font-archivo mb-1">
              Total Token balance:
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-white dark:text-gray-100 font-semibold font-archivo text-base md:text-xl">
                {balance?.toFixed(2)}
              </span>
              {/* Token Icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3806 3.41283L7.91562 1.41199C7.34979 1.08533 6.64979 1.08533 6.07812 1.41199L2.61896 3.41283C2.05312 3.73949 1.70312 4.34616 1.70312 5.00533V8.99533C1.70312 9.64866 2.05312 10.2553 2.61896 10.5878L6.08396 12.5887C6.64979 12.9153 7.34979 12.9153 7.92146 12.5887L11.3865 10.5878C11.9523 10.2612 12.3023 9.65449 12.3023 8.99533V5.00533C12.2965 4.34616 11.9465 3.74533 11.3806 3.41283ZM6.56229 4.52116C6.56229 4.28199 6.76062 4.08366 6.99979 4.08366C7.23896 4.08366 7.43729 4.28199 7.43729 4.52116V7.58366C7.43729 7.82283 7.23896 8.02116 6.99979 8.02116C6.76062 8.02116 6.56229 7.82283 6.56229 7.58366V4.52116ZM7.53646 9.70116C7.50729 9.77116 7.46646 9.83532 7.41396 9.89366C7.30312 10.0045 7.15729 10.0628 6.99979 10.0628C6.92396 10.0628 6.84812 10.0453 6.77812 10.0162C6.70229 9.98699 6.64396 9.94616 6.58562 9.89366C6.53312 9.83532 6.49229 9.77116 6.45729 9.70116C6.42812 9.63116 6.41646 9.55533 6.41646 9.47949C6.41646 9.32783 6.47479 9.17616 6.58562 9.06533C6.64396 9.01283 6.70229 8.97199 6.77812 8.94283C6.99396 8.84949 7.25062 8.90199 7.41396 9.06533C7.46646 9.12366 7.50729 9.18199 7.53646 9.25782C7.56562 9.32783 7.58312 9.40366 7.58312 9.47949C7.58312 9.55533 7.56562 9.63116 7.53646 9.70116Z"
                  fill="#F7931D"
                />
              </svg>
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
    aria-label="Add tokens to wallet"
  >
    <WalletIcon2 className="w-6 h-6 text-[#292D32] dark:text-gray-300 transition-colors" />
    <span className="text-xs md:text-sm font-semibold whitespace-nowrap">Add Tokens</span>
  </button>

  {/* Invoice Button */}
  <button
    onClick={onInvoice}
    className="flex items-center gap-2 md:gap-[11px] bg-[#F7F9FC] dark:bg-gray-700 rounded-lg px-4 md:px-[1.3125rem] py-[.6875rem] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
    aria-label="Generate invoice"
  >
    <div className="bg-gray-100 dark:bg-gray-600 rounded-full p-1 flex items-center justify-center transition-colors">
      <CircleArrow className="w-4 h-4 text-gray-600 dark:text-gray-300" />
    </div>
    <span className="text-xs md:text-sm font-semibold whitespace-nowrap">Invoice</span>
  </button>

  {/* Download Button */}
  <button
    onClick={onDownload}
    className="flex items-center justify-center px-4 md:px-[1.3125rem] py-[.6875rem] bg-[#F7F9FC] dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
    aria-label="Download file"
  >
    <Download className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-colors" />
  </button>
</div>
    </div>
  );
};

export default ManageTokenHeader;
