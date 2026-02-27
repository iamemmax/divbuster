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
import { ChevronLeft, ChevronRight } from "lucide-react";

import { DebouncedSearchInput } from "@/components/core/DebouncedSearchInput";
import { useFetchPaymentHistory } from "../../../api/payment/fetchPaymentHistory";
import { invoiceeTranslations } from "@/app/(main)/translation/tokenTranslation";
import { useLanguage } from "@/hooks/useLanguage";
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

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
  plan_name: string;
}

// 🔹 Translation object



const MyInvoicesManagement = () => {
  const {language}= useLanguage()
  const t = invoiceeTranslations[language] || invoiceeTranslations.en;
  const [globalFilter, setGlobalFilter] = useState("");
  const [_showDownloadMenu, setShowDownloadMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const { data, isLoading } = useFetchPaymentHistory("payment");

  // Flatten paginated results into one array
  const transactions: TransHistoryResult[] =
    data?.pages.flatMap((page) => page.results) ?? [];


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
        cell: (info) => `${info.getValue().toLocaleString()}`,
      }),
      columnHelper.accessor("direction", {
        header: t.direction,
        cell: (info) =>(
            <span 
          className={`px-2 py-1 text-xs capitalize rounded-full ${
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
      columnHelper.accessor("plan_name", {
        header: t.plan,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("transaction_status", {
        header: t.status,
        cell: (info) => (
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              info.getValue() === "completed"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      }),
    ],
    [t]
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

  const checkScroll = React.useCallback(() => {
    if (tableScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  React.useEffect(() => {
    checkScroll();
    const container = tableScrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll]);

  React.useEffect(() => {
    checkScroll();
  }, [transactions.length, isLoading, checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (tableScrollRef.current) {
      const scrollAmount = 300;
      tableScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-6 w-full px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 sm:justify-between mb-8">
        <h1 className="text-xl md:text-2xl font-medium text-[#101828] dark:text-gray-100">
          {t.tokenTitle}
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
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative">
        <div ref={tableScrollRef} className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-max">
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

      {(canScrollLeft || canScrollRight) && (
        <div className="mt-3 flex justify-end gap-2">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="p-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="p-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyInvoicesManagement;
