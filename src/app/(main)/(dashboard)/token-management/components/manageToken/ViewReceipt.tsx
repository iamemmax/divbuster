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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={()=>handleCloseModal()} />
      <div className="relative bg-white dark:bg-gray-50 rounded-lg shadow-2xl z-50 w-full max-w-4xl overflow-hidden">
        {/* Receipt Content - Only this part gets captured for PDF */}
        <div id={rootId} className="bg-white dark:bg-gray-50">
        
        {/* Invoice Header */}
        <div className="px-8 py-8 border-b-4 border-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-start">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <DivebusterLogo/>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-900">DIVEBUSTERS</h1>
              </div>
            </div>
            
            {/* Invoice Title and Number */}
            <div className="text-right">
              <h2 className="sm:text-4xl text-2xl font-bold text-gray-800 dark:text-gray-900 mb-2">INVOICE</h2>
              <p className="text-gray-600 dark:text-gray-700 font-semibold">#{String(selectedTransaction.id).slice(0, 12)}</p>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="px-8 py-8 grid grid-cols-2 gap-8">
          {/* Billed To */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-900 mb-4 border-b-2 border-gray-300 dark:border-gray-400 pb-2">
              Billed To:
            </h3>
            <div className="space-y-1 text-gray-700 dark:text-gray-800">
              <p className="font-semibold">{selectedTransaction.full_name}</p>
              {/* <p>123 Ocean Drive</p>
              <p>Coral City, BC 12345</p> */}
              <p>{selectedTransaction?.email}</p>
            </div>
          </div>

          {/* Company Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-900 mb-4 border-b-2 border-gray-300 dark:border-gray-400 pb-2">
              Company Details:
            </h3>
            <div className="space-y-1 text-gray-700 dark:text-gray-800">
              <p className="font-semibold"></p>
              <p className="font-semibold">{process.env.NEXT_PUBLIC_COMPANY_HEADER!}</p>
              <p>{process.env.NEXT_PUBLIC_COMPANY_ADDRESS!}</p>
              <p>{process.env.NEXT_PUBLIC_COMPANY_ZIP_CODE!}</p>
            </div>
          </div>
        </div>

        {/* Transaction Details Table */}
        <div className="px-8 pb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 dark:bg-gray-700 text-white">
                <th className="text-left py-3 px-4 font-semibold">Description</th>
                <th className="text-center py-3 px-4 font-semibold">Gateway</th>
                <th className="text-right py-3 px-4 font-semibold">Rate</th>
                <th className="text-right py-3 px-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-300">
                <td className="py-4 px-4 text-gray-800 dark:text-gray-900">
                  {selectedTransaction.narration || 'Transaction'}
                </td>
                <td className="text-center py-4 px-4 text-gray-800 dark:text-gray-900">{selectedTransaction.payment_gateway}</td>
                <td className="text-right py-4 px-4 text-gray-800 dark:text-gray-900">
                  €{selectedTransaction.amount.toFixed(2)}
                </td>
                <td className="text-right py-4 px-4 text-gray-800 dark:text-gray-900 font-semibold">
                  €{selectedTransaction.amount.toFixed(2)}
                </td>
              </tr>
              
              {/* Additional transaction details as line items */}
              {/* <tr className="border-b border-gray-200 dark:border-gray-300 bg-gray-50 dark:bg-gray-100">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-800 text-sm">
                  {t.paymentGatewayLabel}: <span className="font-medium capitalize">{selectedTransaction.payment_gateway}</span>
                </td>
                <td className="text-center py-3 px-4 text-gray-700 dark:text-gray-800">-</td>
                <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-800">-</td>
                <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-800">-</td>
              </tr>
              
              {selectedTransaction.reference && (
                <tr className="border-b border-gray-200 dark:border-gray-300 bg-gray-50 dark:bg-gray-100">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-800 text-sm">
                    {t.referenceLabel}: <span className="font-mono text-xs">{selectedTransaction.reference}</span>
                  </td>
                  <td className="text-center py-3 px-4 text-gray-700 dark:text-gray-800">-</td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-800">-</td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-800">-</td>
                </tr> */}
              {/* )} */}
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="mt-8 flex justify-end">
            <div className="w-80 space-y-3">
              <div className="flex justify-between text-gray-700 dark:text-gray-800">
                <span>Subtotal:</span>
                <span className="font-semibold">€{selectedTransaction.amount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-700 dark:text-gray-800 pb-3 border-b-2 border-gray-800 dark:border-gray-700">
                <span>Tax (0%):</span>
                <span className="font-semibold">€0.00</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-800 dark:text-gray-900">Total Due:</span>
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-900">
                  €{selectedTransaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Metadata */}
          {/* <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300 dark:border-gray-400">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-600 mb-1">{t.statusLabel}</p>
                <p className={`font-semibold capitalize ${selectedTransaction.transaction_status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedTransaction.transaction_status}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-600 mb-1 capitalize">{capitalizeFirstLetter(t?.direction)}</p>
                <p className={`font-semibold capitalize ${selectedTransaction.direction === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedTransaction.direction}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-600 mb-1">Date</p>
                <p className="font-semibold text-gray-800 dark:text-gray-900">
                  {new Date(selectedTransaction.created_on).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div> */}

          {/* Footer Message */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-600 italic">
              Thank you for choosing DiveBusters! Safe diving.
            </p>
          </div>
        </div>
        </div>
        {/* End of Receipt Content */}

        {/* Action Buttons */}
        {!hideButtons && (
          <div className="px-8 pb-8 flex gap-3">
            <button 
              onClick={() => { 
                console.log('modal download clicked id=', selectedTransaction?.id); 
                downloadSinglePDF(selectedTransaction); 
              }} 
              className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.download}
            </button>
            <button 
              onClick={handleCloseModal} 
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-300 dark:hover:bg-gray-400 text-gray-800 dark:text-gray-900 rounded-lg font-semibold transition-colors duration-200"
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