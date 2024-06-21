'use client'

import HospitalIcon from '../comp/icons/hospitalIcon'
import { Button, Checkbox, DataTable, LineTabsTrigger, Popover, PopoverContent, PopoverTrigger, Tabs, TabsContent, TabsList, } from '@/components/core'
import { FilterIcon, Search } from '../comp/icons'
import { CaretDown } from '@/components/icons'
import { ColumnDef, PaginationState } from '@tanstack/react-table'
import { MockTreatmentRecords, TreatmentRecord } from './misc/mock'
import React from 'react'
import VisitationChart from '../comp/components/chart'
import Link from 'next/link'
// import { useState } from 'react'

export default function page() {
  // treatment_date: string | Date;
  // recipient: string;
  // hospital: string;
  // diagnosis_type: string;
  // file_no: string;
  // total_cost: number;
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
    <main className=''>
      <div className='bg-[#171F45] px-2.5 md:px-5 rounded-lg py-4 md:py-8'>
        <div className='bg-[#FFFFFF26] rounded-10 py-4 px-2 md:px-6'>
          <div className='bg-white rounded-10 flex flex-col lg:flex-row py-1 md:pl-8 md:gap-3'>
            <div className='py-6 md:py-12 font-sans px-2 lg:pr-8'>
              <p className='text-black text-base md:text-xl font-bold '>Hello, <span className='text-[#1B1687]'>Abdulramon Keulere</span></p>
              <p className=' text-sm md:text-base tracking-tight'>Enrollment Number:<span className='font-bold text-[#1B1687]'>330990663047</span></p>
            </div>
            <div className='border-[.2992px] border-[#bbb8ef] mr-5'></div>
            <div className='flex flex-col lg:flex-row items-center py-3 px-3 gap-6'>
              <div className='bg-[#19224A] rounded-10 text-white py-3 px-12 md:px-4 flex flex-col md:flex-row gap-4'>
                <div>
                  <h1 className='flex justify-center items-center text-lg font-medium'>1</h1>
                  <p className='mt-2 mb-0.5 text-[#FFFFFFCC] font-sans font-light flex justify-center text-xxs items-center '>Individual Plan</p>
                  <Link href='/plan-details'> <button className='rounded-full px-5 py-3 bg-[#FFFFFF4D] text-xs whitespace-nowrap'>View details</button></Link>
                </div>
                <div className='md:border-[.0496px] md:border-[#D6D6D6] lg:h-16'></div>
                <div>
                  <h1 className='flex justify-center items-center text-lg font-medium'>0</h1>
                  <p className='mt-2 mb-0.5 text-[#FFFFFFCC] font-sans font-light flex justify-center text-xxs items-center '>Family Plan</p>
                  <Link href='/plan-details'> <button className='rounded-full px-5 py-3 bg-[#FFFFFF4D] text-xs whitespace-nowrap'>View details</button></Link>
                </div>
              </div>
              <div className='bg-[#19224A] rounded-10 gap-4 pl-6 py-9 flex pr-[26px]'>
                <HospitalIcon className='size-12' />
                <div>
                  <p className='text-white text-lg font-normal'>0</p>
                  <p className='text-[#FFFFFFCC] text-xs'>Total hospital visit</p>
                </div>
              </div>
              <div className='bg-[#19224A] rounded-10 gap-4 pl-6 py-9 flex pr-[57px]'>
                <HospitalIcon className='size-12' />
                <div>
                  <p className='text-white text-lg font-normal'>0</p>
                  <p className='text-[#FFFFFFCC] text-xs'>Total amount</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-4 w-full font-sans'>
          <Tabs defaultValue='individual'>
            <TabsList className="flex flex-col md:flex-row md:w-full items-center justify-center md:justify-start pt-8 pb-3 md:pl-12 bg-white">
              <LineTabsTrigger className='' value="individual">Individual Insurance Plan</LineTabsTrigger>
              <LineTabsTrigger value="family" className='hidden md:block'>Family Insurance Plan</LineTabsTrigger>
              <LineTabsTrigger value="family" className='block md:hidden'>Family Insurance Plan</LineTabsTrigger>
            </TabsList>
            <div className='mt-4 gap-4 flex flex-col lg:flex-row '>
              <div className='bg-white rounded-10 pt-6 pb-9 pl-6 pr-9 grow'>
                <TabsContent value='individual'>
                  <VisitationChart />
                </TabsContent>
                <TabsContent value='family' className=''>
                  <VisitationChart />
                </TabsContent>
              </div>
              <div className='flex flex-col'>

                <div className='bg-white rounded-10 p-4'>
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
                <div className='bg-white rounded-10 p-4 mt-4'>
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
          </Tabs>
        </div>
        <div className='bg-white rounded-10 my-4 pl-10 pr-16 pt-3 pb-2 '>
          <p className='text-[#1B1687] font-bold text-sm'>Visitation History</p>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='pt-1 flex flex-col md:flex-row gap-4'>
              <div className='flex justify-center items-center border-[.2992px] border-[#D6D6D6] pl-4 py-1.5 w-max rounded-lg gap-[10px]'>
                <Search />
                <input type="text" placeholder='Search' className='outline-none w-28 sm:w-auto' />
              </div>
              <div className='flex justify-center items-center text-[#1B1687] py-1.5 md:pl-4 border-[.2992px] border-[#1B1687] rounded-lg '>
                <p className='font-sans font-medium '>Filter</p>
                <CaretDown />
              </div>
            </div>
            <button className='rounded-full capitalize bg-[#1B1687] text-white mt-2 md:mt-0 py-2 px-12'>export</button>
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
