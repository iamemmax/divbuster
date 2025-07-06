import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import {  ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import AppleCardIcon from '@/app/icons/(dashboard)/card/AppleCardIcon';
import MastercardIcon from '@/app/icons/(dashboard)/card/MatercardIcon';
import PaypalIcon from '@/app/icons/(dashboard)/card/PaypalIcon';
import StripeCardIcon from '@/app/icons/(dashboard)/card/StripeCardIcon';
import VisaCardIcon from '@/app/icons/(dashboard)/card/VisaCardIcon';
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';


interface Invoice {
  id: number;
  transactionId: string;
  recipientDetails: string;
  date: string;
  gateway: string;
}

const MyOrderMangement = () => {
  const [globalFilter, setGlobalFilter] = useState('');

  const data: Invoice[] = useMemo(() => [
    { id: 1, transactionId: '009573828', recipientDetails: '2700 token for 300 Euro', date: '23/09/23, 09:11:04', gateway: 'visa' },
    { id: 2, transactionId: '009573829', recipientDetails: '1500 token for 150 Euro', date: '24/09/23, 10:15:30', gateway: 'mastercard' },
    { id: 3, transactionId: '009573830', recipientDetails: '5000 token for 500 Euro', date: '25/09/23, 14:22:15', gateway: 'stripe' },
    { id: 4, transactionId: '009573831', recipientDetails: '3200 token for 320 Euro', date: '26/09/23, 16:45:22', gateway: 'mastercard' },
    { id: 5, transactionId: '009573832', recipientDetails: '4100 token for 410 Euro', date: '27/09/23, 11:30:45', gateway: 'paypal' },
    { id: 6, transactionId: '009573833', recipientDetails: '2800 token for 280 Euro', date: '28/09/23, 13:20:10', gateway: 'applepay' },
    { id: 7, transactionId: '009573834', recipientDetails: '1900 token for 190 Euro', date: '29/09/23, 15:55:33', gateway: 'visa' },
    { id: 8, transactionId: '009573835', recipientDetails: '3600 token for 360 Euro', date: '30/09/23, 09:40:18', gateway: 'paypal' },
    { id: 9, transactionId: '009573836', recipientDetails: '2200 token for 220 Euro', date: '01/10/23, 12:25:45', gateway: 'mastercard' },
    { id: 10, transactionId: '009573837', recipientDetails: '4500 token for 450 Euro', date: '02/10/23, 14:10:30', gateway: 'stripe' },
    { id: 11, transactionId: '009573838', recipientDetails: '1700 token for 170 Euro', date: '03/10/23, 16:35:22', gateway: 'visa' },
    { id: 12, transactionId: '009573839', recipientDetails: '3900 token for 390 Euro', date: '04/10/23, 10:50:15', gateway: 'mastercard' },
    { id: 13, transactionId: '009573840', recipientDetails: '2600 token for 260 Euro', date: '05/10/23, 13:15:40', gateway: 'stripe' },
    { id: 14, transactionId: '009573841', recipientDetails: '5200 token for 520 Euro', date: '06/10/23, 15:30:25', gateway: 'mastercard' },
    { id: 15, transactionId: '009573842', recipientDetails: '1800 token for 180 Euro', date: '07/10/23, 11:45:50', gateway: 'paypal' },
    { id: 16, transactionId: '009573843', recipientDetails: '4200 token for 420 Euro', date: '08/10/23, 14:20:35', gateway: 'applepay' },
    { id: 17, transactionId: '009573844', recipientDetails: '3100 token for 310 Euro', date: '09/10/23, 16:05:20', gateway: 'visa' },
    { id: 18, transactionId: '009573845', recipientDetails: '2400 token for 240 Euro', date: '10/10/23, 09:30:45', gateway: 'paypal' },
    { id: 19, transactionId: '009573846', recipientDetails: '4800 token for 480 Euro', date: '11/10/23, 12:55:30', gateway: 'mastercard' },
    { id: 20, transactionId: '009573847', recipientDetails: '3500 token for 350 Euro', date: '12/10/23, 15:40:15', gateway: 'stripe' }
  ], []);

  const getGatewayDisplay = (gateway: string) => {
    switch (gateway) {
      case 'visa':
        return <VisaCardIcon />;
      case 'mastercard':
        return <MastercardIcon />;
      case 'stripe':
        return <StripeCardIcon />;
      case 'paypal':
        return <PaypalIcon />;
      case 'applepay':
        return <AppleCardIcon />;
      default:
        return <span className="text-gray-500">{gateway}</span>;
    }
  };

  const columnHelper = createColumnHelper<Invoice>();

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'S/N',
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('transactionId', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-1 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span>TRANSACTION ID</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('recipientDetails', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-1 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span>RECIPIENT DETAILS</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('date', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-1 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span>DATE</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('gateway', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-1 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span>GATEWAY</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: info => getGatewayDisplay(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'ACTION',
      cell: () => (
        <button className="flex items-center gap-[5px] bg-[#027A481A] text-[#027A48] p-[10px] rounded-2xl text-xs font-medium hover:bg-green-200 transition-colors">
          <div className="w-2 h-2 bg-[#027A48] rounded-full"></div>
          <span>View orders</span>
        </button>
      ),
    }),
  ], [columnHelper]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'includesString',
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });



  return (
    <div className="py-6 w-full px-4 md:px-6">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between mb-8">
          <h1 className="text-xl md:text-2xl font-medium text-[#101828]">My Orders</h1>
          
          {/* Search Bar */}
          <div className="w-full sm:w-auto">
             <DebouncedSearchInput
               placeholder="Search for transaction ID, customer name, amount etc.."
               onSearch={(value) => setGlobalFilter(value)}
               debounceTime={300}
               value={globalFilter}
               inputClassName='h-12 w-full rounded-lg'
               className='w-full sm:w-[400px]'
             />
          </div>
        </div>

        {/* Responsive Table with Horizontal Scroll */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
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
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-3 sm:px-6 py-8 text-center text-gray-500">
                      No invoices found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-sm text-gray-700 order-2 sm:order-1">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )} of {table.getFilteredRowModel().rows.length} entries
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 order-1 sm:order-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[5, 10, 25, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium whitespace-nowrap">
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderMangement;