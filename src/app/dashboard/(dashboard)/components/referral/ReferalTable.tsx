import DebounceInput from '@/app/(main)/components/util/DebounceInput'
import React, { useMemo, useState } from 'react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger, 
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/core'
import { FilterIcon } from '@/components/core/FilterIcon'
import FIlterIcon from '@/app/icons/(dashboard)/FilterIcon'
import { ReferralData, referralMockData } from './mockData'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { convertKebabAndSnakeToTitleCase } from '@/utils'
import { convertNumberToNaira } from '@/utils/currency'

type FilterOption = {
  id: string;
  label: string;
}
export const SkeletonLoading = () => (
    <div className="animate-pulse">
      <div className="h-3 bg-gray-200 rounded mb-2"/>
    </div>
  );

const ReferalTable = () => {
    const [globalFilter, setGlobalFilter] = useState("")
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
    
    const filterOptions: FilterOption[] = [
      { id: 'all', label: 'All Referrals' },
      { id: 'verified', label: 'Verified' },
      { id: 'pending', label: 'Pending' },
      { id: 'rejected', label: 'Rejected' },
      { id: 'recent', label: 'Recent' }
    ]
    
    const handleFilterSelect = (filterId: string) => {
      setSelectedFilter(filterId)
      // Apply filtering logic here
    }




    

  const columnHelper = createColumnHelper<ReferralData>();


  
  const columns = useMemo(
    () => [
      
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => <div>{convertKebabAndSnakeToTitleCase(info?.getValue())}
        </div>
      }),
      columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("date", {
        header: () => "Date",
        cell: (info) => convertKebabAndSnakeToTitleCase(info.getValue() as string),
      }),
      columnHelper.accessor("rewardEarned", {
        header: () => "Reward Earned",
        cell: (info) => convertNumberToNaira(Number(info.getValue())),
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => convertKebabAndSnakeToTitleCase(info.getValue() as string),
      }),
     
   
    ],
    []
  );
  
    const table = useReactTable({
      data:  referralMockData ?? [],
      columns,
      state: {
        globalFilter,
      },
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  
    const rows = useMemo(() =>referralMockData ?? [], [referralMockData]);
  
  const [isLoading, setIsLoading] = useState(false)
    
  return (
    <div className='bg-[#090E29] mt-5 rounded-10 border-[0.3px] border-[#4453DD]'>
        <div className="flex justify-between items-center py-6 px-8">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
                <h2 className='text-white font-verdana text-sm font-bold'>Referral list</h2>
                <div className="w-[2.25rem] h-[2rem] border-[0.3px] border-[#4453DD] rounded-10 flex justify-center items-center p-3 font-verdana text-sm font-bold text-white">{table.getRowModel().rows?.length??0}</div>
            </div>
                <div className="max-w-[15rem] ">
                <DebounceInput
                    className="bg-transparent rounded-md text-white"
                    placeHolder='Search a transaction'
                    value={globalFilter}
                    onChange={(value) => setGlobalFilter(String(value))}
                />
                </div>
        </div>
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border-opacity-70 rounded-md border-[.0187rem] border-[#fff] bg-[#090E29] text-white text-xs">
                    <FIlterIcon />
                    <span>{selectedFilter ? filterOptions.find(f => f.id === selectedFilter)?.label : 'Filter'}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#090E29] border border-[#4453DD] text-white min-w-[180px]">
                    <DropdownMenuLabel className="text-xs text-white/70">Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#4453DD]/30" />
                    <DropdownMenuGroup>
                        {filterOptions.map((option) => (
                            <DropdownMenuItem 
                                key={option.id}
                                className="text-xs cursor-pointer hover:bg-[#4453DD]/20 focus:bg-[#4453DD]/20"
                                onClick={() => handleFilterSelect(option.id)}
                            >
                                <span className={selectedFilter === option.id ? "text-[#5879FD]" : "text-white"}>
                                    {option.label}
                                </span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </div>

<div className="">
    
        {
  isLoading ?
  <Table>
                 <TableHeader className="bg-[#0B1739] border-none">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          className="font-nunito text-sm text-white font-medium"
                          key={header.id}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index} className="hover:bg-[#f5f7ff] py-2">
                      <TableCell className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
  :
         <Table className=''>
                <TableHeader className="bg-[#0B1739] border- px-4 ">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          className="font-nunito text-sm text-white font-medium"
                          key={header.id}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <>
              
                  {rows?.length > 0 && (
                    <TableBody className='px-5 md:px-8 lg:px-16'>
                      {table.getRowModel().rows.map((row, rowIndex) => (
                        <TableRow
                          className={`hover:bg-[#212d4e]  ${
                            rowIndex !== 0 ? "" : ""
                          }`}
                          key={row.id}
                        >
                          {row.getVisibleCells().map((cell, idx) => (
                            <TableCell
                              className={`text-xs text-white cursor-pointer font-nunito py-5 border-opacity-50 border-y-[#E2E8F0] ${
                                row.getVisibleCells().length - 1 === idx
                                  ? "border-y-[0.3px] border-[#E2E8F0]"
                                  : ""
                              }`}
                              key={cell.id}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </>
              </Table>
}
</div>
    </div>
  )
}

export default ReferalTable
