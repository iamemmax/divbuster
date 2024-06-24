'use client'

import React from 'react'
import { FilterIcon, Search } from '../comp/icons'
import { CaretDown } from '@/components/icons'
import { Checkbox, DataTable, Popover, PopoverContent, PopoverTrigger } from '@/components/core'
import { MockTreatmentRecords, TreatmentRecord } from '../dashboard/misc/mock';
import { ColumnDef, PaginationState } from '@tanstack/react-table';

export default function page() {

  const [{ pageIndex, pageSize }, setPagination] =
  React.useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
const pageCount = React.useMemo(
  () => (!!MockTreatmentRecords.length ? Math.ceil(MockTreatmentRecords.length / pageSize) : -1),
  [MockTreatmentRecords.length, pageSize]
);
const columns: ColumnDef<TreatmentRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        aria-label="Select all"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        aria-label="Select row"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "treatment_date",
    header: "Treatment Date",
    cell: ({ row }) => (
      <div className="">{row.getValue("treatment_date")}</div>
    ),
  },
  {
    accessorKey: "recipient",
    header: ({ column }) => {
      return (
        <p
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Recipient
        </p>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("recipient")}</div>,
  },
  {
    accessorKey: "hospital",
    header: ({ column }) => {
      return (
        <p
          className='text-[#0B0A0B] font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hospital
        </p>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("hospital")}</div>,
  },
  {
    accessorKey: "diagnosis_type",
    header: () => <p className='text-[#0B0A0B] font-medium'>Diagnosis Type</p>,
    cell: ({ row }) => (
      <div className="">{row.getValue("diagnosis_type")}</div>
    ),
  },
  {
    accessorKey: "file_no",
    header: () => <p className='text-[#0B0A0B] font-medium'>File No.</p>,
    cell: ({ row }) => (
      <div className="">{row.getValue("file_no")}</div>
    ),
  },
  {
    accessorKey: "total_cost",
    header: () => <p className='text-[#0B0A0B] font-medium'>Total Cost</p>,

    cell: ({ row }) => {
      const amount = row.getValue("total_cost") as number

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },

  {
    id: "actions",
    enableHiding: false,
    header: () => <p className='text-[#0B0A0B] font-medium'>Action</p>,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Popover>
          <PopoverTrigger className='bg-[#DDE9F6] rounded-full text-[#1B1687] py-2 px-8'>
            View
          </PopoverTrigger>
          <PopoverContent align='end'>
            <ul>
              <li>View Detail</li>
              <li>View Detail</li>
              <li>View Detail</li>
              <li>View Detail</li>
            </ul>
          </PopoverContent>
        </Popover>
      )
    },
  },
]

  return (
    <main>
      <div className='bg-[#171F45] px-5 rounded-lg py-8'>
        <div className='flex justify-between items-center bg-white rounded-10 py-3 pl-[2.625rem] pr-[4.5rem]'>
          <p className='font-sans font-bold'>Plan Details</p>
          <button className='rounded-full py-3 px-8 bg-[#1B1687] text-white font-medium text-sm'>Renew Plan</button>
        </div>
        <div className='flex justify-between gap-4'>
          <div className='bg-white rounded-10 mt-4 pt-8 pl-14 pb-10 grow '>
            <div className='border-b grid grid-cols-2 py-5 text-[#0B0A0B] font-sans font-medium'>
              <p>Name</p>
              <p>Abdulramon Keulere</p>
            </div>
            <div className='border-b grid grid-cols-2 py-5 text-[#0B0A0B] font-sans font-medium'>
              <p>Address</p>
              <p>27, Alara street, Sabo, Yaba.</p>
            </div>
            <div className='border-b grid grid-cols-2 py-5 text-[#0B0A0B] font-sans font-medium'>
              <p>Enrollment Number</p>
              <p>330990663047</p>
            </div>
            <div className='border-b grid grid-cols-2 py-5 text-[#0B0A0B] font-sans font-medium'>
              <p>State</p>
              <p>Lagos</p>
            </div>
            <div className='border-b grid grid-cols-2 py-5 text-[#0B0A0B] font-sans font-medium'>
              <p>Plan</p>
              <p>6-Month Individual Plan</p>
            </div>
            <div className='border-b grid grid-cols-2 py-5 text-[#0B0A0B] font-sans font-medium'>
              <p>Date Created</p>
              <p>June 20, 2024</p>
            </div>
            <div className='border-b grid grid-cols-2 py-5 text-[#0B0A0B] font-sans font-medium'>
              <p>Due Date</p>
              <p>December 20, 2024</p>
            </div>
            <div className='border-b grid grid-cols-2 py-5 text-[#0B0A0B] font-sans font-medium'>
              <p>Hospital</p>
              <p>Eko Hospital, Ikeja.</p>
            </div>
          </div>
          <div className='bg-white rounded-10 pt-8 pl-8 pr-[10.625rem] mt-4 pb-[9.3125rem]'>
            <div className='flex flex-col'>

              <div className='rounded-10 p-4 border-[.0187rem] border-[#1B1687]'>
                <div className='flex justify-between items-center gap-8'>
                  <p className='capitalize font-bold text-[#1B1687]'>Total Visit</p>
                  <button className='rounded-full text-white bg-[#1B1687] py-[7px] px-[19px] flex items-center gap-1'>Filter <FilterIcon /></button>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                  <div>
                    <p className='capitalize text-[#080D27] font-normal text-xs py-3'>total</p>
                    <p className='text-[#1B1687] font-semibold text-sm'>0</p>
                  </div>
                  <div>
                    <p className='capitalize text-[#080D27] font-normal text-xs py-3'>today</p>
                    <p className='text-[#1B1687] font-semibold text-sm'>0</p>
                  </div>
                  <div>
                    <p className='capitalize text-[#080D27] font-normal text-xs py-3'>this week</p>
                    <p className='text-[#1B1687] font-semibold text-sm'>1</p>
                  </div>
                  <div>
                    <p className='capitalize text-[#080D27] font-normal text-xs py-3'>this month</p>
                    <p className='text-[#1B1687] font-semibold text-sm'>0</p>
                  </div>
                </div>
              </div>
              <div className='rounded-10 p-4 mt-4 border-[.0187rem] border-[#1B1687]'>
                <div className='flex justify-between items-center gap-8'>
                  <p className='capitalize font-bold text-[#1B1687]'>Total Amount Spent</p>
                  <button className='rounded-full text-white bg-[#1B1687] py-[7px] px-[19px] flex items-center gap-1'>Filter <FilterIcon /></button>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                  <div>
                    <p className='capitalize text-[#080D27] font-normal text-xs py-3'>total</p>
                    <p className='text-[#1B1687] font-semibold text-sm'>₦0</p>
                  </div>
                  <div>
                    <p className='capitalize text-[#080D27] font-normal text-xs py-3'>today</p>
                    <p className='text-[#1B1687] font-semibold text-sm'>₦0</p>
                  </div>
                  <div>
                    <p className='capitalize text-[#080D27] font-normal text-xs py-3'>this week</p>
                    <p className='text-[#1B1687] font-semibold text-sm'>₦6,000</p>
                  </div>
                  <div>
                    <p className='capitalize text-[#080D27] font-normal text-xs py-3'>this month</p>
                    <p className='text-[#1B1687] font-semibold text-sm'>₦0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-10 my-4 pl-10 pr-16 pt-4 pb-2 '>
          <p className='text-[#1B1687] font-bold text-base'>Visitation History</p>
          <div className='flex justify-between'>
            <div className='pt-1 flex gap-4'>
              <div className='flex justify-center items-center border-[.2992px] border-[#D6D6D6] pl-4 py-2 w-max rounded-lg gap-[10px]'>
                <Search />
                <input type="text" placeholder='Search' className='outline-none' />
              </div>
              <div className='flex text-[#1B1687] py-3 pl-4 border-[.2992px] border-[#1B1687] rounded-lg '>
                <p className='font-sans font-medium '>Filter</p>
                <CaretDown />
              </div>
            </div>
            <button className='rounded-full capitalize bg-[#1B1687] text-white py-3 px-12'>export</button>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={MockTreatmentRecords}
          isLoading={false}
          isFetching={false}
          pageCount={pageCount}
          pageSize={pageSize}
          pageIndex={pageIndex}
          setPagination={setPagination}
        />
      </div>
    </main>
  )
}
