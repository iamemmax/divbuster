"use client";
import React, { useEffect, useMemo, useState } from "react";
import HospitalIcon2 from "@/app/(dashboard)/comp/icons/HospitalIcon2";
import { HospitalAroundData } from "@/app/(dashboard)/comp/mocks/HospitalAround";
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
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";
import { getHospitalAroundFunc } from "@/app/(dashboard)/dashboard/api/getHospitalAround";
import { useQuery } from "react-query";
import { capitalizeFirstLetter } from "@/utils";

interface HospitaAroundHeader {
  name: string;
  state: string;
  address: string;
}

interface Prop {
  userData: UserDataTypes | undefined;
}
const SkeletonLoading = () => (
  <div className="animate-pulse">
    <div className="h-3 bg-gray-200 rounded mb-2"></div>
  </div>
);

const HospitalAround = ({ userData }: Prop) => {
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
    columnHelper.accessor("address", {
      header: () => "Address",
      cell: (info) => capitalizeFirstLetter(info?.getValue()),
    }),
  ];

  const table = useReactTable({
    data: HospitalAround ?? [],
    columns: columns,
    debugTable: true,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = useMemo(() => HospitalAround ?? [], [HospitalAround]);

  return (
    <div>
      <div className="flex justify-between flex-wrap items-center">
        <div className="bg-[#F0F5FF] rounded-lg py-2 px-4 flex items-center gap-2">
          <Button className="px-0 py-0 bg-[#D0DFFF] shrink-0 w-5 h-5 flex justify-center items-center rounded-full">
            <HospitalIcon2 />
          </Button>
          <h2 className="text-sm font-medium text-[#032282]">
            Hospital around me
          </h2>
        </div>
        <div className="">
          <LinkButton
            className="bg-[#F0F5FF] px-[1.125rem] py-2 rounded-lg text-xs text-[#032282]"
            href={"/dashboard/hospital-around-me"}
          >
            See all
          </LinkButton>
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
                  {table
                    ?.getRowModel()
                    ?.rows?.slice(0, 5)
                    ?.map((row, rowIndex) => (
                      <React.Fragment key={row?.id}>
                        <TableRow
                          className={`hover:bg-[#f5f7ff]  ${rowIndex !== 0 ? "border-t" : ""}`}
                          key={row?.id}
                        >
                          {row?.getVisibleCells()?.map((cell, idx: number) => (
                            <TableCell
                              className={`text-xs text-[#475569] cursor-pointer font-nunito py-4 border-[#E2E8F0] ${row?.getVisibleCells?.length - 1 === idx ? "border-t-[0.4px] border-[#E2E8F0]" : ""}`}
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
  );
};

export default HospitalAround;
