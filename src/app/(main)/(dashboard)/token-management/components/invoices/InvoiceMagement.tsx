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
import {  ArrowUpDown, Download, FileText, ChevronDown } from "lucide-react";
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
import autoTable from 'jspdf-autotable';

interface TransHistoryResult {
  id: number;
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
}

// 🔹 Translation object



const MyInvoicesManagement = () => {
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
  const { data } = useFetchPaymentHistory();

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

  const downloadCSV = () => {
    const headers = [t.sn, t.recipient, t.amount, t.date, t.gateway, t.status];
    const csvData = transactions.map((transaction, index) => [
      index + 1,
      transaction.narration,
      `₦${transaction.amount.toLocaleString()}`,
      new Date(transaction.created_on).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      transaction.payment_gateway,
      transaction.transaction_status
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `invoices_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadMenu(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Invoice History', 14, 22);
    
    const tableData = transactions.map((transaction, index) => [
      index + 1,
      transaction.narration,
      `₦${transaction.amount.toLocaleString()}`,
      new Date(transaction.created_on).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      transaction.payment_gateway,
      transaction.transaction_status
    ]);
    
    autoTable(doc, {
      head: [[t.sn, t.recipient, t.amount, t.date, t.gateway, t.status]],
      body: tableData,
      startY: 30,
    });
    
    doc.save(`invoices_${new Date().toISOString().split('T')[0]}.pdf`);
    setShowDownloadMenu(false);
  };

  const columnHelper = createColumnHelper<TransHistoryResult>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: t.sn,
        cell: (info) => info?.row?.index + 1,
        enableSorting: true,
      }),
      // columnHelper.accessor("reference", {
      //   header: ({ column }) => (
      //     <button
      //       className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-gray-100"
      //       onClick={() =>
      //         column.toggleSorting(column.getIsSorted() === "asc")
      //       }
      //     >
      //       <span>{t.transactionId}</span>
      //       <ArrowUpDown className="w-4 h-4" />
      //     </button>
      //   ),
      //   cell: (info) => info.getValue(),
      //   enableSorting: true,
      // }),
      columnHelper.accessor("narration", {
        header: t.recipient,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("amount", {
        header: t.amount,
        cell: (info) => `₦${info.getValue().toLocaleString()}`,
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
            className={`px-2 py-1 text-xs rounded-full ${
              info.getValue() === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      }),
    ],
    [columnHelper, t]
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
          {t.title}
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
          
          {/* Download Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Download
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <button
                  onClick={downloadCSV}
                  className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 first:rounded-t-lg"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </button>
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 last:rounded-b-lg"
                >
                  <FileText className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            )}
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
              {table.getRowModel().rows.length === 0 ? (
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
    </div>
  );
};

export default MyInvoicesManagement;
