"use client";
import React, { useEffect, useMemo, useState } from "react";
import HospitalIcon2 from "@/app/(dashboard)/comp/icons/HospitalIcon2";
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
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
import { useQuery } from "react-query";
import { capitalizeFirstLetter } from "@/utils";
import DebounceInput from "../../comp/components/misc/DebounceInput";
import TablePagination from "../../comp/components/TablePagination";
import { FilterIcn, NoData } from "../../comp/icons";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { getHospitalAroundFunc } from "@/app/(dashboard)/dashboard/api/getHospitalAround";
import { useUser } from "@/app/(auth)/(onboarding)/misc";

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

  const { data: hospitalData, isLoading } = useQuery({
    queryFn: () => getHospitalAroundFunc(String(userData?.phone_number)),
    queryKey: ["fetch-hospital-around", userData?.phone_number],
    enabled: !!userData?.phone_number,
  });

  const columnHelper = createColumnHelper<HospitaAroundHeader>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => capitalizeFirstLetter(info.getValue()),
      }),
      columnHelper.accessor("state", {
        header: () => "State",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("lga", {
        header: () => "Region",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("address", {
        header: () => "Address",
        cell: (info) => capitalizeFirstLetter(info.getValue()),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: hospitalData ?? [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = useMemo(() => hospitalData ?? [], [hospitalData]);

  return (
    <div className="bg-[#F5F9FE]">
      <div className="bg-main min-h-36"></div>
      <div className="h-full w-full px-6  md:px-[4.5rem] lg:px-[7.5rem]  min-h-screen relative -mt-32">
        <div className="bg-white w-full h-full mx-auto py-[1.9375rem] px-[2.625rem] rounded-[.625rem]">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap  gap-4 items-center">
              <div className="flex items-center flex-wrap gap-4">
                <div className="bg-[#F0F5FF] rounded-lg py-2 px-4 flex items-center gap-2">
                  <Button className="px-0 py-0 bg-[#D0DFFF] shrink-0 w-5 h-5 flex justify-center items-center rounded-full">
                    <HospitalIcon2 />
                  </Button>
                  <h2 className="text-sm font-medium text-[#032282]">
                    Hospital around me
                  </h2>
                </div>
                {hospitalData && hospitalData.length > 10 && (
                  <div className="">
                    <TablePagination
                      pageSize={10}
                      table={table}
                      totalItems={Number(hospitalData.length)}
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
                    {/* Add filter options here */}
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
            ) : (
              <Table>
                <TableHeader className="bg-[#F6F9FF] border-none">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          className="font-nunito text-sm text-[#032282] font-medium"
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
                  {rows.length > 0 && (
                    <TableBody>
                      {table.getRowModel().rows.map((row, rowIndex) => (
                        <TableRow
                          className={`hover:bg-[#f5f7ff] ${
                            rowIndex !== 0 ? "border-t" : ""
                          }`}
                          key={row.id}
                        >
                          {row.getVisibleCells().map((cell, idx) => (
                            <TableCell
                              className={`text-xs text-[#475569] cursor-pointer font-nunito py-6 border-[#E2E8F0] ${
                                row.getVisibleCells().length - 1 === idx
                                  ? "border-t-[0.4px] border-[#E2E8F0]"
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
            )}
          </div>
          {table?.getRowModel()?.rows?.length === 0 && (
            <div className="py-8">
              <div className="w-full flex justify-center items-center text-sm p-5">
                <NoData />
              </div>
              <div className="text-center flex justify-center items-center text-[#0E0E2C] font-sans text-xs">
                <p className=" md:max-w-[12rem] text-center">
                  {" "}
                  No Hospital Found
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalAround;
