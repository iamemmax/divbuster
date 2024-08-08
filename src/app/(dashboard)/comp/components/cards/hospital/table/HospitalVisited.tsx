"use client";
import React, { useEffect, useMemo, useState } from "react";
import HospitalIcon2 from "@/app/(dashboard)/comp/icons/HospitalIcon2";
import {
  Button,
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
  useReactTable,
} from "@tanstack/react-table";
import { hospitalVisitedData } from "@/app/(dashboard)/comp/mocks/hospitalVisited";
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";
import { useQuery } from "react-query";
import { getHospitalVisitedFunc } from "@/app/(dashboard)/dashboard/api/getHospitalVisited";
import { NoData } from "@/app/(dashboard)/comp/icons";

interface HospitaAroundHeader {
  date: string;
  name: string;
  action?: string;
}
interface Prop {
  userData: UserDataTypes | undefined;
  loadinUser: boolean;
}

const SkeletonLoading = () => (
  <div className="animate-pulse">
    <div className="h-3 bg-gray-200 rounded mb-2"></div>
  </div>
);

const HospitalVisited = ({ userData, loadinUser }: Prop) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getHospitalVisitedFunc(String(userData?.phone_number)),
    queryKey: ["fetch-hospital-around-list", userData?.phone_number],
    enabled: !!userData?.phone_number,
  });
  const columnHelper = createColumnHelper<HospitaAroundHeader>();

  const columns = [
    columnHelper.accessor("date", {
      header: () => "Dates",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("name", {
      header: () => "Hospital",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("action", {
      header: () => "",
      cell: () => (
        <Button className="rounded-10 bg-[#F6F9FF] py-1 px-3 text-[#5879FD] text-xs">
          Used
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: data?.hospital_visit ?? [],
    columns: columns,
    debugTable: true,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = useMemo(
    () => data?.hospital_visit ?? [],
    [data?.hospital_visit]
  );

  return (
    <div>
      <div className="flex  items-center flex-wrap gap-3">
        <div className="bg-[#F0F5FF] rounded-lg py-2 px-4 flex items-center gap-2">
          <Button className="px-0 py-0 bg-[#D0DFFF] shrink-0 w-5 h-5 flex justify-center items-center rounded-full">
            <HospitalIcon2 />
          </Button>
          <h2 className="text-sm font-medium text-[#032282]">
            Hospital visits
          </h2>
        </div>
        <div className="">
          <Button className="bg-[#F0F5FF] shrink-0 px-2 py-1 rounded-full text-xs text-[#032282]">
            {data?.count ?? 0}
          </Button>
        </div>
      </div>

      <div className="w-full mt-4">
        {isLoading || loadinUser ? (
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
              {rows?.length > 0 && (
                <TableBody>
                  {table?.getRowModel()?.rows?.map((row, rowIndex) => (
                    <React.Fragment key={row?.id}>
                      <TableRow
                        className={`hover:bg-[#f5f7ff] py-3 ${rowIndex !== 0 ? "border-t" : ""}`}
                        key={row?.id}
                      >
                        {row
                          ?.getVisibleCells()
                          ?.slice(0, 5)
                          ?.map((cell, idx: number) => (
                            <TableCell
                              className={`text-xs text-[#475569] cursor-pointer font-nunito py-3 border-[#E2E8F0] ${row?.getVisibleCells?.length - 1 === idx ? "border-t-[0.4px] border-[#E2E8F0]" : ""}`}
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
              )}
            </>
          </Table>
        )}
      </div>
      {!loadinUser && rows?.length <= 0 && (
        <div className="py-8">
          <div className="w-full flex justify-center items-center text-sm p-5">
            <NoData />
          </div>
          <div className="text-center flex justify-center items-center text-[#0E0E2C] font-sans text-xs">
            <p className=" md:max-w-[12rem] text-center">
              {" "}
              No data to display yet as you have not made any hospital visit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalVisited;
