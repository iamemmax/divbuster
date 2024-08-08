import React, { useMemo, useState } from "react";
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
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import { maskPhoneNumber } from "@/utils/strings";
import { beneficiaryType } from "../plans/api/fetchBeneficairies";

const SkeletonLoading = () => (
  <div className="animate-pulse">
    <div className="h-3 bg-gray-200 rounded mb-2"></div>
  </div>
);

interface BenficiaryHeader {
  created_at?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  phone_number?: string;
  category?: string;
  status?: string;
  action?: string;
}

interface Prop {
  beneficiaryList: beneficiaryType;
  loading: boolean;
}
const FamilyBeneficiary = ({ beneficiaryList, loading: isLoading }: Prop) => {
  const columnHelper = createColumnHelper<BenficiaryHeader>();

  const columns = [
    columnHelper.accessor("created_at", {
      header: () => "Date/Time",
      cell: (info) => (
        <>{`${info?.getValue()} ${info?.row?.original?.created_at}`}</>
      ),
    }),
    columnHelper.accessor("first_name", {
      header: () => "Phone Number",
      cell: (info) => (
        <p>
          {`${info?.row?.original?.first_name}`}{" "}
          {`${info?.row?.original?.middle_name}`}
          {`${info?.row?.original?.last_name}`}
        </p>
      ),
    }),
    columnHelper.accessor("phone_number", {
      header: () => "Phone Number",
      cell: (info) => <p>{maskPhoneNumber(String(info?.getValue()))}</p>,
    }),
    columnHelper.accessor("category", {
      header: () => "Category",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => moment(info.getValue()).format("ll"),
    }),
    columnHelper.accessor("action", {
      header: () => "Action",
      cell: (info) => moment(info.getValue()).format("ll"),
    }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data: (beneficiaryList && beneficiaryList?.data) ?? [],
    columns: columns,
    debugTable: true,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = useMemo(
    () => (beneficiaryList && beneficiaryList?.data) ?? [],
    [beneficiaryList && beneficiaryList?.data]
  );

  return (
    <div>
      <div className="">
        <div className="w-full mt-4">
          {isLoading ? (
            <Table>
              <TableHeader>
                <TableRow>
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
                  <TableCell className="text-xs cursor-pointer font-nunito py-2 ">
                    <SkeletonLoading />
                  </TableCell>
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
  );
};

export default FamilyBeneficiary;
