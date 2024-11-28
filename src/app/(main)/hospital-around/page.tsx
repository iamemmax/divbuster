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
import { capitalizeFirstLetter } from "@/utils";
import DebounceInput from "@/app/(dashboard)/comp/components/misc/DebounceInput";
// import TablePagination from "../../comp/components/TablePagination";
import FilterIcon from "@/icons/core/FilterIcon";
import {
  Hospital,
  usegetHospitalsByAddress,
} from "../misc/api/postGetHospitalsByAddress";
import { AroundIcon, FilterIcn } from "@/app/(dashboard)/comp/icons";
import TablePagination from "@/app/(dashboard)/comp/components/TablePagination";
import Marquee from "../misc/components/Marquee";

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
  const { mutate: fetchHospitalsByAddress, isLoading } =
    usegetHospitalsByAddress();
  // const { data: HospitalAround, isLoading } = useQuery({
  const [hospitalsAround, setHospitalsAround] = useState([] as Hospital[]);
  const { data: userData } = useUser();
  // const { data: HospitalAround, isLoading } = useQuery({
  //   queryFn: () => getHospitalAroundFunc(String(userData?.phone_number)),
  //   queryKey: ["fetch-hospital-around", userData?.phone_number],
  // });

  const searchHospitals = () => {
    fetchHospitalsByAddress(
      { address: globalFilter },
      {
        onSuccess(data, variables, context) {
          console.log(data, variables, context);
          setHospitalsAround(data.data);
        },
        onError(error, variables, context) {
          // console.log(error, variables, context);
        },
      }
    );
  };

  useEffect(() => {
    searchHospitals();
  }, [globalFilter]);

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

  const rows = useMemo(
    () => hospitalsAround ?? [],
    [hospitalsAround, globalFilter]
  );
  return (
    <div className="bg-main">
      <div className="h-full w-full px-6  md:px-[4.5rem] lg:px-[7.5rem]  min-h-screen relative">
        <div className="hidden md:block pt-20">
          <button className="flex justify-center items-center rounded-full bg-[#34307A] px-6 py-3.5 text-white bg-opacity-[20%] text-sm gap-x-2 ">
            {" "}
            <AroundIcon /> Hospitals around me
          </button>
          <div className="text-[42px] font-medium max-w-[790px] mt-3 text-white leading-snug">
            Find hospitals around you with ease by entering your address below
          </div>
        </div>
        <div className="bg-white  w-full h-full mx-auto md:mt-8 py-[1.9375rem] px-[2.625rem] rounded-[.625rem]">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center flex-wrap gap-4">
                <div className="bg-[#F0F5FF] rounded-lg py-2 px-4 flex items-center gap-2">
                  <Button className="px-0 py-0 bg-[#D0DFFF] shrink-0 w-5 h-5 flex justify-center items-center rounded-full">
                    <HospitalIcon2 />
                  </Button>
                  <h2 className="text-sm font-medium text-[#032282]">
                    Hospitals around me
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
              <div className="w-full lg:w-64">
                <DebounceInput
                  value={globalFilter ?? ""}
                  placeholder="Enter your full address to search"
                  onChange={(value: string) => setGlobalFilter(String(value))}
                />
              </div>
            </div>
            {/* <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:flex justify-center items-center text-[#556575] gap-x-3 bg-white border-[#D6D6D6] border-[0.8px] py-2 rounded-10 px-5">
                  <FilterIcn />
                  <h2 className="hidden md:block">Filter</h2>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
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
                          <tr
                            className={`hover:bg-[#f5f7ff] text-[#475569] text-xs text-nowrap ${
                              index !== 0 ? "border-t" : ""
                            }`}
                            key={index}
                          >
                            <td className="py-2 px-4 border-b ">
                              {hospital.name}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {hospital.state}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {hospital.lga}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {hospital.address}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </TableBody>
                  ) : (
                    <div className="w-full flex justify-center items-center text-sm p-5">
                      <p className="text-xs text-[#888888] text-nowrap">
                        {" "}
                        Search for hospitals around e.g. 27, maddiso Ikeja
                      </p>
                    </div>
                  )}
                </>
              </Table>
            )}
          </div>
        </div>
        <div className="pt-[72px] pb-32 hidden sm:block">
          <div className="md:flex flex-row bg-[#FFFFFF0D] gap-36 pt-4 pb-6 sm:py-3 items-center justify-center pr-16 pl-6 rounded-lg">
            <p className="text-xs md:text-[14px] lg:text[16px] text-[#FFFFFFCC] md:pb-0 pb-4">
              Welcome to Liberty life, where your health and wealth is paramount
              to us. Enjoy health and wealth!
            </p>
            <button className="flex justify-between items-center bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]">
              Get insurance
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="15" fill="#032282" />
                <path
                  d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z"
                  fill="white"
                />
                <path
                  d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <Marquee /> */}
    </div>
  );
};

export default HospitalAround;
