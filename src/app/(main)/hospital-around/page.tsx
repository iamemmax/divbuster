"use client";
import React, { useEffect, useMemo, useState } from "react";
import HospitalIcon2 from "@/app/(dashboard)/comp/icons/HospitalIcon2";
import { HospitalAroundData } from "@/app/(dashboard)/comp/mocks/HospitalAround";
import {
  Button,
  DataTable,
  DropdownMenu,
  DropdownMenuItem,
  Input,
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
import DebounceInput from "@/app/(dashboard)/comp/components/misc/DebounceInput";
// import TablePagination from "../../comp/components/TablePagination";
import FilterIcon from "@/icons/core/FilterIcon";
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Hospital, usegetHospitalsByAddress } from "../misc/api/postGetHospitalsByAddress";
import { FilterIcn } from "@/app/(dashboard)/comp/icons";
import TablePagination from "@/app/(dashboard)/comp/components/TablePagination";

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
  const { mutate: fetchHospitalsByAddress, isLoading } = usegetHospitalsByAddress()
  // const { data: HospitalAround, isLoading } = useQuery({
  const [hospitalsAround, setHospitalsAround] = useState([] as Hospital[])
  const { data: userData } = useUser();
  // const { data: HospitalAround, isLoading } = useQuery({
  //   queryFn: () => getHospitalAroundFunc(String(userData?.phone_number)),
  //   queryKey: ["fetch-hospital-around", userData?.phone_number],
  // });

  const searchHospitals = () => {
    fetchHospitalsByAddress({ address: globalFilter },
      {
        onSuccess(data, variables, context) {
          console.log(data, variables, context)
          setHospitalsAround(data.data)
        },
        onError(error, variables, context) {
          console.log(error, variables, context)
        },
      }
    )
  }

  useEffect(() => {
    searchHospitals()
  }, [globalFilter])



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
    data: hospitalsAround ?? [],
    columns: columns,
    debugTable: true,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  const rows = useMemo(() => hospitalsAround ?? [], [hospitalsAround, globalFilter]);

  return (
    <div className="bg-[#F5F9FE] ">
      <div className="bg-main min-h-36"></div>
      <div className="h-full w-full px-6 md:px-[7.5rem] min-h-screen relative -mt-32">
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
                {hospitalsAround && hospitalsAround?.length > 10 && (
                  <div className=" ">
                    <TablePagination
                      pageSize={10}
                      table={table}
                      totalItems={Number(hospitalsAround?.length)}
                    />
                  </div>
                )}

              </div>
              <div className="lg:w-64">
                <DebounceInput
                  value={globalFilter ?? ""}
                  onChange={(value: string) => setGlobalFilter(String(value))}
                />
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:flex justify-center items-center text-[#556575] gap-x-3 bg-white border-[#D6D6D6] border-[0.8px] py-2 rounded-10 px-5">
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
                  {/* WE'LL USE THIS FOR NOW */}
                  {rows?.length > 0 ? (
                    <TableBody>
                      {hospitalsAround.length > 0 ? (
                        hospitalsAround.map((hospital, index) => (
                          <tr className={`hover:bg-[#f5f7ff] ${index !== 0 ? "border-t" : ""
                            }`}
                            key={index}>
                            <td className="py-2 px-4 border-b">{hospital.name}</td>
                            <td className="py-2 px-4 border-b">{hospital.state}</td>
                            <td className="py-2 px-4 border-b">{hospital.lga}</td>
                            <td className="py-2 px-4 border-b">{hospital.address}</td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
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
    </div>
  );
};

export default HospitalAround;
