
"use client"
import React, { useState, useMemo, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table'
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import { Button, ErrorModal, LinkButton } from '@/components/core';
import Header from '../../components/shared/Header';
import { buddyResult, useFetchBuddyList } from '../api/buddy/fetchBudies';
import AngleLeft from '@/app/icons/(dashboard)/AngleLeft';
import AngleRight from '@/app/icons/(dashboard)/AngleRight';
// import SuggestedBuddies from './SuggestedBuddies';
import { useErrorModalState } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { SmallSpinner } from '@/icons/core';
import { diverBuddiesTranslations } from '../../translation/diveBuddiesTranslation';
import { useLanguage } from '@/hooks/useLanguage';
import { DiveBuddySkeleton } from '@/components/core';
import SuggestedBuddies from './SuggestedBuddies';

const DiverBuddies = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Get language from user profile
   const {language}=useLanguage()
  const t = diverBuddiesTranslations[language] || diverBuddiesTranslations.en;

  const { 
    data: buddyList, 
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage
  } = useFetchBuddyList(language);

  const allBuddies = useMemo(() => {
    if (!buddyList?.pages) return [];
    return buddyList.pages.flatMap(page => page?.results || []);
  }, [buddyList]);

  const totalCount = useMemo(() => {
    return buddyList?.pages?.[0]?.count || 0;
  }, [buddyList]);

  const currentPageInfo = useMemo(() => {
    const totalResults = allBuddies.length;
    return {
      start: totalResults > 0 ? 1 : 0,
      end: totalResults,
      total: totalCount
    };
  }, [allBuddies.length, totalCount]);

  const getCertificateColor = (cert: string) => {
    switch (cert) {
      case "Padi": return "bg-blue-100 font-archivo text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "BSAC": return "bg-green-100 font-archivo text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "NADD": return "bg-purple-100 font-archivo text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      default: return "bg-gray-100 font-archivo text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleNextPage = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const handlePreviousPage = async () => {
    if (hasPreviousPage && !isFetchingPreviousPage) {
      await fetchPreviousPage();
    }
  };

  useEffect(() => {
    if (isError && error) {
      const errorMessage = formatAxiosErrorMessage(error as AxiosError);
      openErrorModalWithMessage(String(errorMessage));
    }
  }, [isError, error, openErrorModalWithMessage]);

  const columnHelper = createColumnHelper<Partial<buddyResult>>();

  const columns = useMemo(() => [
    columnHelper.accessor('first_name', {
      id: 'name',
      header: () => (
        <div className="text-left font-medium text-gray-700 dark:text-gray-300">
          {t.name}
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
         <div className="relative shrink-0">
  {row.original.profile_details?.profile_picture ? (
    <img
      src={String(row.original.profile_details.profile_picture)}
      alt={row.original.first_name}
      className="w-12 h-12 shrink-0 rounded-full object-cover"
    />
  ) : (
    <div className="w-12 h-12 shrink-0 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-sm uppercase">
      {`${row.original.first_name?.[0] || ''}${row.original.last_name?.[0] || ''}`}
    </div>
  )}

  {row.original?.diver_profile?.online && (
    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
  )}
</div>

          <div className="min-w-0">
            <div className="font-medium text-[#101828] dark:text-gray-100 text-sm font-archivo truncate transition-colors duration-200">
              {row.original.first_name}
            </div>
            <div className="text-sm text-[#667085] dark:text-gray-400 font-archivo truncate transition-colors duration-200">
              {row.original.email}
            </div>
          </div>
        </div>
      ),
      enableSorting: false,
    }),
    // columnHelper.accessor('diver_profile.dive_count', {
    //   id: 'diveBuddies',
    //   header: () => (
    //     <div className="text-left font-medium text-gray-700 dark:text-gray-300">
    //       {t.diveBuddies}
    //     </div>
    //   ),
    //   cell: ({ row }) => (
    //     <div className="flex items-center gap-2">
    //       <div className="flex -space-x-1">
    //         {Number(row?.original?.diver_profile?.dive_count) > 4 && (
    //           <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border border-white dark:border-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 transition-colors duration-200">
    //             +{Number(row?.original?.diver_profile?.dive_count) - 4}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   ),
    //   enableSorting: false,
    // }),
    columnHelper.accessor('certificates', {
      id: 'certificates',
      header: t.certificate,
      cell: ({ row }) => (
        <div className="flex gap-1 flex-wrap">
          {row?.original?.certificates?.map((cert) => (
            <span
              key={cert?.id}
              className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCertificateColor(cert?.issuer_name)}`}
            >
              {cert?.issuer_name}
            </span>
          ))}
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="text-right">
          <LinkButton 
            href={`/div-buddies/profile/${row?.original?.id}`}
            className="text-orange-500 dark:text-orange-400 font-archivo text-sm bg-transparent hover:text-orange-600 dark:hover:text-orange-300 font-medium whitespace-nowrap transition-colors duration-200"
          >
            {t.viewProfile}
          </LinkButton>
        </div>
      ),
    }),
  ], [t]);

  const table = useReactTable({
    data: allBuddies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, value) => {
      const searchableValue = `${row?.original.first_name} ${row.original.email} ${row?.original.certificates?.map(c => c.issuer_name).join(' ')}`
      return searchableValue.toLowerCase().includes(value.toLowerCase())
    },
  });

  return (
    <div>
      <Header 
        title={t?.myBuddies}
        subtitle='' 
      />
      
      <div className="w-full bg-white dark:bg-gray-900 min-h-screen px-4 sm:px-6 lg:px-[1.875rem] transition-colors duration-200">
        <div className="bg-white dark:bg-gray-900 py-4 border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:flex-1 sm:max-w-md">
              <DebouncedSearchInput 
                placeholder={t.searchPlaceholder} 
                onSearch={(value) => setGlobalFilter(value)}
                value={globalFilter}
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <LinkButton href="/notifications?tab=notifications" className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200 font-medium text-sm">
                {t.buddyRequests}
              </LinkButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-10">
          <div className="flex-1 p-4 sm:p-6 border border-[#EAECF0] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">{t.diveBuddies}</h1>
                <div className="bg-[#FEF6F4] dark:bg-orange-900/30 rounded-[1rem] flex justify-center items-center px-2 py-[.1875rem] transition-colors duration-200">
                  <span className="text-[#F7931D] dark:text-orange-400 text-xs font-archivo font-medium">{totalCount} {t.users}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto transition-colors duration-200">
              {isLoading ? (
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">{t.name}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">{t.diveBuddies}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">{t.certificate}</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <DiveBuddySkeleton key={idx} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    {table.getHeaderGroups()?.map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
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
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-6 py-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {!isLoading && (
              <div className="flex items-center justify-between py-6 gap-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed justify-center text-gray-700 dark:text-gray-300"
                  onClick={handlePreviousPage}
                  disabled={!hasPreviousPage || isFetchingPreviousPage}
                >
                  <AngleLeft />
                  {isFetchingPreviousPage ? t.loading : t.previous}
                </button>

                <div className="text-sm text-gray-600 dark:text-gray-400 hidden  md:block">
                  {t.showing} {currentPageInfo.start}-{currentPageInfo.end} {t.of} {currentPageInfo.total} {t.results}
                  {hasNextPage && (
                    <button
                      onClick={handleNextPage}
                      disabled={isFetchingNextPage}
                      className="ml-2 text-orange-500 hover:text-orange-600 disabled:opacity-50"
                    >
                      {isFetchingNextPage ? t.loadingMore : t.loadMore}
                    </button>
                  )}
                </div>

                <button
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed justify-center text-gray-700 dark:text-gray-300"
                  onClick={handleNextPage}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage ? t.loading : t.next}
                  <AngleRight />
                </button>
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden 2xl:block">
            <SuggestedBuddies />
          </div>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="2xl:hidden absolute inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <div className="absolute right-0 top-0 h-full !w-96 bg-white dark:bg-gray-800 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Suggested Buddies</h3> */}
                  <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <SuggestedBuddies />
              </div>
            </div>
          )}

          {/* Floating Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="2xl:hidden fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>
      </div>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      />
    </div>
  )
}

export default DiverBuddies
