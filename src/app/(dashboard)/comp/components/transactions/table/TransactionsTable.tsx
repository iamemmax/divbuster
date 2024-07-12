"use client";
import React, { useEffect, useMemo, useState } from "react";
import DebounceInput from "../../misc/DebounceInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core";
import FiltersIcon from "../../../icons/FilterIcons";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { transactionData } from "../../../mocks/transactionData";
import { statusColor } from "@/utils/statusColor";

interface transactionHeader {
  id?: number;
  checkbox?: string;
  type: string;
  mode: string;
  amount: number;
  reference_id: number;
  status: string;
  action?: string;
}
const TransactionsTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const [selectedRows, setSelectedRows] = useState<{
    [key: string]: boolean;
  }>({});

  const columnHelper = createColumnHelper<transactionHeader>();

  // Function to toggle all checkboxes
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newSelectedRows: { [key: string]: boolean } = {};
    transactionData?.forEach((row) => {
      newSelectedRows[row.id] = isChecked;
    });
    setSelectedRows(newSelectedRows);
  };

  // Function to toggle individual checkbox
  const handleCheckboxChange = (row: any) => {
    setSelectedRows((prev) => ({
      ...prev,
      [row.id]: !prev[row.id],
    }));
  };

  const columns = [
    {
      id: "checkbox", // Unique identifier for the checkbox column
      accessor: "checkbox",
      header: () => (
        <input
          checked={
            Object.keys(selectedRows)?.length === transactionData?.length &&
            Object.values(selectedRows).every(Boolean)
          }
          type="checkbox"
          onChange={handleSelectAll}
        />
      ),
      //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cell: (info) => (
        <input
          checked={selectedRows[info.row.original.id] || false}
          type="checkbox"
          onChange={() => handleCheckboxChange(info.row.original)}
        />
      ),
    },
    columnHelper.accessor("type", {
      header: () => "Type",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("mode", {
      header: () => "Mode",
      cell: (info) => info?.getValue(),
    }),

    columnHelper.accessor("amount", {
      header: () => "Amount",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("reference_id", {
      header: () => "Reference ID",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => {
        const { color, backgroundColor } = statusColor(info?.getValue());

        return (
          <p
            className="block w-auto max-w-[5.25rem] text-center text-xs font-medium rounded-10 px-3 py-2"
            style={{
              color,
              backgroundColor,
            }}
          >
            {info?.getValue()}
          </p>
        );
      },
    }),
    columnHelper.accessor("action", {
      header: () => "Action",
      cell: () => (
        <Button className="rounded-10 bg-[#F6F9FF] py-1 px-3 text-[#242424] text-xs">
          Details
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: transactionData ?? [],
    columns: columns,
    debugTable: true,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const rows = useMemo(() => transactionData ?? [], [transactionData]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const SkeletonLoading = () => (
    <div className="animate-pulse">
      <div className="h-3 bg-gray-200 rounded mb-2"></div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-[#0E0E2C]">Transactions</h2>
          <div className="bg-[#F0F5FF] shrink-0 px-2 py-1 rounded-full text-xs text-[#032282]">
            <p>12</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="lg:w-50">
            <DebounceInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
            />
          </div>

          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="flex items-center outline-none bg-white border-[.05rem] text-[#556575] text-sm font-medium px-5 border-[#D6D6D6] gap-x-2">
                  <FiltersIcon /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[100px] px-4 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
                <DropdownMenuItem
                  className="group text-[13px]  leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  defaultValue={"successful"}
                >
                  SuccessFul
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  defaultValue={"pending"}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  defaultValue={"failed"}
                >
                  Failed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        {isLoading ? (
          <>
            <Table>
              {/* <TableHeader className="bg-[#f5f7ff]">
                    <SkeletonLoading length={9} />
                  </TableHeader> */}
              {Array.from({ length: 8 }).map((_, index) => (
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
                  <TableCell className="text-xs cursor-pointer font-nunito py-2 ">
                    <SkeletonLoading />
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </>
        ) : (
          <Table>
            <TableHeader className="bg-[#F9FAFB]">
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <TableRow key={headerGroup?.id}>
                  {headerGroup?.headers?.map((header) => (
                    <TableHead
                      className="font-nunito text-xs text-[#030229] font-medium"
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
            {rows?.length > 0 ? (
              <TableBody>
                {table?.getRowModel()?.rows?.map((row) => (
                  <React.Fragment key={row?.id}>
                    <TableRow className="hover:bg-[#f5f7ff] py-3" key={row?.id}>
                      {row?.getVisibleCells()?.map((cell) => (
                        <TableCell
                          className="text-xs cursor-pointer font-nunito"
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
              <div className="w-ful flex justify-center items-center text-sm p-5">
                No data found
              </div>
            )}
          </Table>
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;
