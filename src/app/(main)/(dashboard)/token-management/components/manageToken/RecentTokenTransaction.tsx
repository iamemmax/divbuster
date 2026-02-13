"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import AppleCardIcon from "@/app/icons/(dashboard)/card/AppleCardIcon";
import MastercardIcon from "@/app/icons/(dashboard)/card/MatercardIcon";
import PaypalIcon from "@/app/icons/(dashboard)/card/PaypalIcon";
import StripeCardIcon from "@/app/icons/(dashboard)/card/StripeCardIcon";
import VisaCardIcon from "@/app/icons/(dashboard)/card/VisaCardIcon";
import { DebouncedSearchInput } from "@/components/core/DebouncedSearchInput";
import { useFetchPaymentHistory } from "../../../api/payment/fetchPaymentHistory";
import { invoiceeTranslations } from "@/app/(main)/translation/tokenTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
import ViewReceipt from "./ViewReceipt";

export interface TransHistoryResult {
  id: number;
  full_name: string;
email: string;
  amount: number;
  direction: string;
  transaction_type: string;
  payment_method: string;
  transaction_status: string;
  payment_gateway: string;
  return_url: string;
  narration: string;
  reference: string;
  created_on: string;
  updated_on: string;
  plan: number;
  plan_value:number
}

// 🔹 Translation object



const RecentTokenTransaction = () => {
  const {language}= useLanguage()
  const t = invoiceeTranslations[language] || invoiceeTranslations.en;
  const [globalFilter, setGlobalFilter] = useState("");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const { data, isLoading } = useFetchPaymentHistory("fund_wallet");

  // Flatten paginated results into one array
  const transactions: TransHistoryResult[] =
    data?.pages.flatMap((page) => page.results) ?? [];

  const getGatewayDisplay = (gateway: string) => {
    switch (gateway) {
      case "visa":
        return <VisaCardIcon />;
      case "mastercard":
        return <MastercardIcon />;
      case "stripe":
        return <StripeCardIcon />;
      case "paypal":
        return <PaypalIcon />;
      case "applepay":
        return <AppleCardIcon />;
      default:
        return (
          <span className="text-gray-500 dark:text-gray-400">{gateway}</span>
        );
    }
  };

  const [selectedTransaction, setSelectedTransaction] = useState<TransHistoryResult | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentDownloadingId, setCurrentDownloadingId] = useState<number | null>(null);
  const [pendingDownload, setPendingDownload] = useState(false);

  const handleView = (transaction: TransHistoryResult) => {
    // console.log('handleView called for id=', transaction?.id);
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  useEffect(() => {
    if (showModal && pendingDownload && selectedTransaction) {
      const id = setTimeout(() => {
        downloadSinglePDF(selectedTransaction);
      }, 200);
      return () => clearTimeout(id);
    }
  }, [showModal, pendingDownload, selectedTransaction]);

  



const downloadSinglePDF = async (transaction: TransHistoryResult) => {
  setIsDownloading(true);
  setCurrentDownloadingId(transaction.id);
  try {
    const el = document.getElementById('receipt-screenshot');
    if (el) {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(el as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      // Crop whitespace from canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Find the bounding box of non-white pixels
      let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Check if pixel is not white (or transparent)
        if (a > 128 && !(r > 240 && g > 240 && b > 240)) {
          const pixelIndex = i / 4;
          const x = pixelIndex % canvas.width;
          const y = Math.floor(pixelIndex / canvas.width);

          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }

      // Add small padding around content
      const padding = 10;
      minX = Math.max(0, minX - padding);
      minY = Math.max(0, minY - padding);
      maxX = Math.min(canvas.width, maxX + padding);
      maxY = Math.min(canvas.height, maxY + padding);

      const croppedWidth = maxX - minX;
      const croppedHeight = maxY - minY;

      // Create a new canvas with cropped content
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = croppedWidth;
      croppedCanvas.height = croppedHeight;
      const croppedCtx = croppedCanvas.getContext('2d');
      if (!croppedCtx) throw new Error('Could not get cropped canvas context');

      croppedCtx.drawImage(canvas, minX, minY, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);

      // Convert to JPEG for smaller file size
      const imgData = croppedCanvas.toDataURL('image/jpeg', 0.85);
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (croppedHeight * pdfWidth) / croppedWidth;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`transaction_${transaction.id}_${new Date().toISOString().split('T')[0]}.pdf`);
      return;
    }
  } catch (err) {
    console.error('capture failed', err);
  } finally {
    setIsDownloading(false);
    setPendingDownload(false);
    setCurrentDownloadingId(null);
  }

  // Fallback textual PDF
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text('Transaction Receipt', 14, 22);
  doc.text(`ID: ${transaction.id}`, 14, 40);
  doc.text(`Amount: ₦${transaction.amount.toLocaleString()}`, 14, 56);
  doc.save(`transaction_${transaction.id}_${new Date().toISOString().split('T')[0]}.pdf`);
};



 
  const columnHelper = createColumnHelper<TransHistoryResult>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: t.sn,
        cell: (info) => info?.row?.index + 1,
        enableSorting: true,
      }),
      
      columnHelper.accessor("narration", {
        header: t.recipient,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("amount", {
        header: t.amount,
        cell: (info) => `€${info.getValue().toLocaleString()}`,
      }),
      columnHelper.accessor("plan_value", {
        header: t.tokenValue,
        cell: (info) => `${info.getValue()}`,
      }),
      columnHelper.accessor("direction", {
        header: t.direction,
        cell: (info) =>(
            <span 
          className={`px-2 py-1 text-xs rounded-full ${
              String(info.getValue()) === "credit"
                ? " text-green-700  dark:text-green-400"
                : "text-red-700  dark:text-red-400"
            }`}
          >{info.getValue()}</span>
        )
      }),
      columnHelper.accessor("created_on", {
        header: t.date,
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      }),
      columnHelper.accessor("payment_gateway", {
        header: t.gateway,
        cell: (info) => getGatewayDisplay(info.getValue()),
      }),
      columnHelper.accessor("transaction_status", {
        header: t.status,
        cell: (info) => (
          <span
            className={`px-2 py-1 capitalize text-xs rounded-full ${
              info.getValue() === "completed"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : info.getValue() === "pending"
                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <span>{t.actions}</span>,
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('View button clicked for:', info.row.original.id);
                handleView(info.row.original);
              }}
              className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 cursor-pointer"
            >
              {t.view}
            </button>
            {/* {currentDownloadingId === info.row.original.id ? (
              <span className="px-3 py-1 text-xs rounded-md bg-gray-200 text-gray-400">{(t as any).downloading || 'Downloading...'}</span>
            ) : (
              <button
                onClick={() => { setSelectedTransaction(info.row.original); setShowModal(true); setPendingDownload(true); setIsDownloading(true); setCurrentDownloadingId(info.row.original.id); }}
                disabled={isDownloading}
                className={`px-3 py-1 text-xs rounded-md ${isDownloading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
              >
                {(t as any).download || 'Download'}
              </button>
            )} */}
          </div>
        ),
      }),
    ],
    [t, columnHelper]
  );

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="py-6 w-full px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 sm:justify-between mb-8">
        <h1 className="text-xl md:text-2xl font-medium text-[#101828] dark:text-gray-100">
          {t.walletTitle}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="flex-1 w-full">
            <DebouncedSearchInput
            placeholder={t.searchPlaceholder}
            onSearch={(value) => setGlobalFilter(value)}
            debounceTime={300}
            value={globalFilter}
            inputClassName="h-12 w-full rounded-lg dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
            className="w-full "
          />
          </div>
          
        
         
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="px-3 sm:px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-3 sm:px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {t.noTransactions}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100"
                        style={{ position: 'relative', zIndex: 1 }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    {showModal && selectedTransaction && (
     <ViewReceipt selectedTransaction={selectedTransaction}
     handleCloseModal={handleCloseModal}
     downloadSinglePDF={downloadSinglePDF}
     language={language}
     rootId={'receipt-screenshot'}
     hideButtons={isDownloading && currentDownloadingId === selectedTransaction.id}
     />
    )}
    </div>
  );
};

export default RecentTokenTransaction;
