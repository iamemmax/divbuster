'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/core';
import { Spinner } from '@/icons/core';
import { cn } from '@/utils/classNames';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  isFetching: boolean;
  isLoading: boolean;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  rows: TData[] | null | undefined;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  columnsVisibilityList?: {
    actions: boolean;
  };
  hasOuterPadding?: boolean;
  tableContainerClassName?: string;
  setSelectedRows?: React.Dispatch<React.SetStateAction<TData[] | undefined>>;
  setRestockPayload?: (submission: TData[]) => void;
  selectedRows?: TData[];
  hasCheckBox?: boolean;
  restockPayload?: TData[];
  emptyRestockCountRef?: { current: number };
}

export default function DataTable<TData, TValue>({
  columns,
  isFetching,
  isLoading,
  pageCount,
  pageIndex,
  pageSize,
  rows,
  setPagination,
  hasOuterPadding = true,
  tableContainerClassName,
  setSelectedRows,
  setRestockPayload,
  hasCheckBox,
  restockPayload,
  emptyRestockCountRef,
}: DataTableProps<TData, TValue>) {
  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: rows ?? defaultData,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,

      // columnVisibility: columnsVisibilityList,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const selectedItems = table.getSelectedRowModel().rows.map(item => {
    return item.original;
  });

  React.useEffect(() => {
    if (hasCheckBox) {
      setSelectedRows?.(selectedItems);
      setRestockPayload?.(selectedItems);
    }
    if (
      restockPayload?.length === 0 &&
      emptyRestockCountRef &&
      emptyRestockCountRef?.current >= 2
    ) {
      table.toggleAllRowsSelected(false);
      emptyRestockCountRef.current = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems.length, restockPayload?.length]);

  return (
    <>
      <div
        className={cn(
          'overflow-hidden rounded-full opacity-0 transition-opacity',
          isFetching && !isLoading && 'opacity-100'
        )}
      >
        <div className="bg-main-solid/20 h-1 w-full overflow-hidden">
          <div className="h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-main-solid "></div>
        </div>
      </div>

      <div
        className={cn(
          'rounded-10 bg-white',
          hasOuterPadding && 'p-3 md:p-6 md:pt-0 lg:pb-8',
          tableContainerClassName
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  {isLoading ? (
                    <Spinner className="mx-auto inline-flex w-max" />
                  ) : (
                    'No results.'
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center space-x-2 py-4">
          <Button
            className="gap-2 border-[#C4C4C4]/50"
            disabled={
              !table.getCanPreviousPage() ||
              pageIndex <= 1 ||
              !table.getRowModel().rows?.length
            }
            variant="outlined"
            onClick={() => table.previousPage()}
          >
            <svg
              fill="none"
              height={12}
              viewBox="0 0 12 12"
              width={12}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M1.478 3.643a3.333 3.333 0 0 0-.126 4.582l.126.132L4.91 11.59a.833.833 0 0 0 1.247-1.1l-.069-.079L2.656 7.18a1.667 1.667 0 0 1-.097-2.251l.097-.106L6.09 1.59A.833.833 0 0 0 4.99.342l-.078.07-3.433 3.231Z"
                fill="#111C38"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d="M6.478 3.643a3.333 3.333 0 0 0-.126 4.582l.126.132L9.91 11.59a.833.833 0 0 0 1.248-1.1l-.07-.079L7.656 7.18a1.667 1.667 0 0 1-.097-2.251l.097-.106L11.09 1.59A.833.833 0 0 0 9.99.342l-.078.07-3.433 3.231Z"
                fill="#B8BBC3"
                fillRule="evenodd"
              />
            </svg>
            <span>Previous</span>
          </Button>
          <Button
            className="gap-2 border-[#C4C4C4]/50"
            disabled={
              !table.getCanNextPage() || !table.getRowModel().rows?.length
            }
            variant="outlined"
            onClick={() => table.nextPage()}
          >
            Next
            <svg
              fill="none"
              height={12}
              viewBox="0 0 12 12"
              width={12}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10.522 3.643a3.334 3.334 0 0 1 .126 4.582l-.126.132L7.09 11.59a.833.833 0 0 1-1.247-1.1l.069-.079L9.344 7.18a1.667 1.667 0 0 0 .097-2.251l-.097-.106L5.91 1.59A.833.833 0 0 1 7.01.342l.078.07 3.433 3.231Z"
                fill="#111C38"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d="M5.522 3.643a3.333 3.333 0 0 1 .126 4.582l-.126.132L2.09 11.59a.833.833 0 0 1-1.247-1.1l.069-.079L4.344 7.18a1.667 1.667 0 0 0 .097-2.251l-.097-.106L.91 1.59A.833.833 0 0 1 2.01.342l.078.07 3.433 3.231Z"
                fill="#B8BBC3"
                fillRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div
        className={clsx(
          'overflow-hidden rounded-full opacity-0 transition-opacity',
          isFetching && !isLoading && 'opacity-100'
        )}
      >
        <div className="bg-main-solid/20 h-1 w-full overflow-hidden">
          <div className="h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-main-solid "></div>
        </div>
      </div>
    </>
  );
}