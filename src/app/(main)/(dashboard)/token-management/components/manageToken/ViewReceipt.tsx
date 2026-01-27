"use client";
import DivebusterLogo from '@/components/icons/Logo'
import React from 'react'
import type { TransHistoryResult } from './RecentTokenTransaction'
import { invoiceeTranslations } from '@/app/(main)/translation/tokenTranslation';
import { Language } from '@/app/(auth)/sign-up/translations';
import { capitalizeFirstLetter } from '@/utils';

interface prop{
  selectedTransaction: TransHistoryResult;
  handleCloseModal: () => void;
  downloadSinglePDF: (transaction: TransHistoryResult) => void;
  language: Language;
  rootId?: string;
  hideButtons?: boolean;
}
const ViewReceipt = ({selectedTransaction,handleCloseModal,downloadSinglePDF,language,rootId,hideButtons}:prop) => {
    const t = invoiceeTranslations[language] || invoiceeTranslations.en;
  return (
  <div id={rootId} className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={()=>handleCloseModal()} />
    <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl z-50 w-full max-w-md md:max-w-lg lg:max-w-xl overflow-hidden">
      {/* Receipt Header */}
      
      <div className="bg-gradient-to-br from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 px-6 py-8 text-center">
        <div className="w-full h-18 bg-white/20 backdrop-blur rounded-full mx-auto mb-3 flex items-center justify-center">
         <DivebusterLogo/>
        </div>
        <h2 className="text-white text-xl font-bold mb-1">{t.transactionReceipt}</h2>
        <p className="text-white/80 text-sm">
          {new Date(selectedTransaction.created_on).toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Receipt Body */}
      <div className="px-6 py-6 space-y-4">
        {/* Amount Section */}
        <div className="text-center py-4 border-b-2 border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide mb-1">{t.amountLabel}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            €{selectedTransaction.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </p>
          {/* <div className="mt-2 flex justify-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 capitalize">
              {selectedTransaction.direction}
            </div>
          </div> */}
        </div>

        {/* Transaction Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">{t.statusLabel}</span>
            <span className={`font-medium text-gray-900 dark:text-gray-100 capitalize ${selectedTransaction.transaction_status === 'successful' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' }`}>{selectedTransaction.transaction_status}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400 capitalize">{capitalizeFirstLetter(t?.direction)}</span>
            <span className={`font-medium text-gray-900 dark:text-gray-100 capitalize ${selectedTransaction.direction === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{selectedTransaction.direction}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">{t.transactionIdLabel}</span>
            <span className="font-mono text-xs text-gray-900 dark:text-gray-100">{selectedTransaction.id}</span>
          </div>

          {selectedTransaction.reference && (
            <div className="flex justify-between gap-5 py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500 dark:text-gray-400">{t.referenceLabel}</span>
              <span style={{wordBreak:"break-word"}} className="font-mono text-xs text-gray-900 dark:text-gray-100">{selectedTransaction.reference}</span>
            </div>
          )}

          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">{t.paymentGatewayLabel}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">{selectedTransaction.payment_gateway}</span>
          </div>

          {selectedTransaction.narration && (
            <div className="flex justify-between py-2 border-gray-100 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 mb-1">{t.descriptionLabel}</p>
              <p className="text-gray-900 dark:text-gray-100 leading-relaxed" style={{wordBreak:"break-word"}}>{selectedTransaction.narration}</p>
            </div>
          )}
        </div>

        {/* Decorative Dashed Line */}
        <div className="border-b-2 border-dashed border-gray-200 dark:border-gray-700 my-4 py-3" />

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          {t.electronicReceipt}
        </p>
      </div>

      {/* Action Buttons */}
      {!hideButtons && (
      <div className="px-6 pb-6 flex gap-3">
        <button 
          onClick={() => { console.log('modal download clicked id=', selectedTransaction?.id); downloadSinglePDF(selectedTransaction); }} 
          className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t.download}
        </button>
        <button 
          onClick={handleCloseModal} 
          className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-colors duration-200"
        >
          {t.close}
        </button>
      </div>
      )}
    </div>
  </div>
  )
}

export default ViewReceipt