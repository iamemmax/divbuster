"use client";
import React, { useEffect, useMemo, useState } from "react";
import HospitalIcon2 from "@/app/(dashboard)/comp/icons/HospitalIcon2";
import { HospitalAroundData } from "@/app/(dashboard)/comp/mocks/HospitalAround";
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  LinkButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserDataTypes, useUser } from "@/app/(auth)/(onboarding)/misc";
import { getHospitalAroundFunc } from "@/app/(dashboard)/dashboard/api/getHospitalAround";
import { useQuery } from "react-query";
import { capitalizeFirstLetter } from "@/utils";
import DebounceInput from "../../comp/components/misc/DebounceInput";
import TablePagination from "../../comp/components/TablePagination";
import { AroundIcon, FilterIcn } from "../../comp/icons";
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface HospitaAroundHeader {
  name: string;
  state: string;
  lga: string;
  address: string;
}

const SkeletonLoading = () => (
  <div className="animate-pulse">
    <div className="h-3 bg-gray-200 rounded mb-2"></div>
  </div>
);

const HospitalAround = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: userData } = useUser();
  const { data: HospitalAround, isLoading } = useQuery({
    queryFn: () => getHospitalAroundFunc(String(userData?.phone_number)),
    queryKey: ["fetch-hospital-around", userData?.phone_number],
  });

  const columnHelper = createColumnHelper<HospitaAroundHeader>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => capitalizeFirstLetter(info?.getValue()),
    }),
    columnHelper.accessor("state", {
      header: () => "State",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("lga", {
      header: () => "Region",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("address", {
      header: () => "Address",
      cell: (info) => capitalizeFirstLetter(info?.getValue()),
    }),
  ];

  const table = useReactTable({
    data: HospitalAround ?? [],
    columns: columns,
    debugTable: true,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = useMemo(() => HospitalAround ?? [], [HospitalAround]);

  return (
    <div className="bg-main px-6 md:px-[7.5rem] min-h-screen relative">
      <div className="pt-[120px]">
        <button className="bg-[#34307A] rounded-full text-white gap-2 flex justify-center items-center bg-opacity-[20%] px-6 py-3.5">
          <AroundIcon />
          Hospitals around me
        </button>
      </div>
      <p className="text-[42px] font-medium text-white max-w-[801px]">Check and search below  to see the list of hospitals around you.</p>
      <div className="h-full w-full">
        <div className="bg-white  w-full h-full mx-auto py-[1.9375rem] px-[2.625rem] rounded-[.625rem]">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center flex-wrap gap-4">
                <div className="bg-[#F0F5FF] rounded-lg py-2 px-4 flex items-center gap-2">
                  <Button className="px-0 py-0 bg-[#D0DFFF] shrink-0 w-5 h-5 flex justify-center items-center rounded-full">
                    <HospitalIcon2 />
                  </Button>
                  <h2 className="text-sm font-medium text-[#032282]">
                    Hospital around me
                  </h2>
                </div>
                {HospitalAround && HospitalAround?.length > 10 && (
                  <div className=" ">
                    <TablePagination
                      pageSize={10}
                      table={table}
                      totalItems={Number(HospitalAround?.length)}
                    />
                  </div>
                )}

              </div>
              <div className="lg:w-64">
                <DebounceInput
                  value={globalFilter ?? ""}
                  onChange={(value) => setGlobalFilter(String(value))}
                />
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-center items-center text-[#556575] gap-x-3 bg-white border-[#D6D6D6] border-[0.8px] py-2 rounded-10 px-5">
                  <FilterIcn />
                  <h2>Filter</h2>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="w-full mt-4">
            {isLoading ? (
              <Table>
                <TableHeader className="bg-[#f5f7ff]">
                  <TableRow>
                    <TableHead className="font-nunito text-sm text-[#032282] font-medium">
                      Name
                    </TableHead>
                    <TableHead className="font-nunito text-sm text-[#032282] font-medium">
                      State
                    </TableHead>
                    <TableHead className="font-nunito text-sm text-[#032282] font-medium">
                      Region
                    </TableHead>
                    <TableHead className="font-nunito text-sm text-[#032282] font-medium">
                      Address
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index} className="hover:bg-[#f5f7ff] py-2">
                      <TableCell className="text-xs cursor-pointer font-nunito py-2 ">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2 ">
                        <SkeletonLoading />
                      </TableCell>
                      <TableCell className="text-xs cursor-pointer font-nunito py-2 ">
                        <SkeletonLoading />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader className="bg-[#F6F9FF] border-none">
                  {table?.getHeaderGroups()?.map((headerGroup) => (
                    <TableRow key={headerGroup?.id}>
                      {headerGroup?.headers?.map((header) => (
                        <TableHead
                          className="font-nunito text-sm text-[#032282] font-medium"
                          key={header?.id}
                        >
                          {flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <>
                  {rows?.length > 0 ? (
                    <TableBody>
                      {table?.getRowModel()?.rows?.map((row, rowIndex) => (
                        <React.Fragment key={row?.id}>
                          <TableRow
                            className={`hover:bg-[#f5f7ff]  ${rowIndex !== 0 ? "border-t" : ""}`}
                            key={row?.id}
                          >
                            {row
                              ?.getVisibleCells()
                              ?.map((cell, idx: number) => (
                                <TableCell
                                  className={`text-xs text-[#475569]  cursor-pointer font-nunito py-6 border-[#E2E8F0] ${row?.getVisibleCells?.length - 1 === idx ? "border-t-[0.4px] border-[#E2E8F0]" : ""}`}
                                  key={cell?.id}
                                >
                                  {flexRender(
                                    cell?.column?.columnDef?.cell,
                                    cell?.getContext()
                                  )}
                                </TableCell>
                              ))}
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  ) : (
                    <div className="w-full flex justify-center items-center text-sm p-5">
                      No data found
                    </div>
                  )}
                </>
              </Table>
            )}
          </div>
        </div>
      </div>
      <div className='pt-[72px]'>
        <div className='md:flex flex-row bg-[#FFFFFF0D] gap-36 pt-4 pb-6 sm:py-3 items-center justify-center pr-16 pl-6 rounded-lg'>
          <p className='text-xs md:text-[14px] lg:text[16px] text-[#FFFFFFCC] md:pb-0 pb-4'>
            Welcome to Liberty life, where your health and wealth is paramount to us. Enjoy health and wealth!
          </p>
          <button className='flex justify-between items-center bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]'>
            Get insurance
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#032282" />
              <path d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z" fill="white" />
              <path d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalAround;
