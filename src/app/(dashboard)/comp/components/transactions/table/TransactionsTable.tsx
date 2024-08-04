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
import { useQuery } from "react-query";
import { getTransaction } from "@/app/(dashboard)/dashboard/api/fetchTransaction";
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";
import { capitalizeFirstLetter } from "@/utils";
import TransactionsReceipts from "./TransactionsReceipts";
import TransactionReceivedModal from "./TransactionsReceipts";
import { NoData } from "../../../icons";

interface transactionHeader {
  id?: number;
  checkbox?: string;
  type: string;
  mode: string;
  amount: number;
  reference_id: string;
  status: string;
  action?: string;
}
interface Prop {
  userData: UserDataTypes | undefined;
  loadinUser: boolean;
}
const TransactionsTable = ({ userData, loadinUser }: Prop) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const [TransactionDetails, setTransactionDetails] = useState(false);

  // const [selectedRows, setSelectedRows] = useState<{
  //   [key: string]: boolean;
  // }>({});

  const { data: transaction, isLoading } = useQuery({
    queryFn: () => getTransaction(String(userData?.phone_number)),
    queryKey: ["fetch-transaction", userData?.phone_number],
    enabled: !!userData?.phone_number,
  });

  const columnHelper = createColumnHelper<transactionHeader>();

  // Function to toggle all checkboxes
  // const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = e.target.checked;
  //   const newSelectedRows: { [key: string]: boolean } = {};
  //   transactionData?.forEach((row) => {
  //     newSelectedRows[row.id] = isChecked;
  //   });
  //   setSelectedRows(newSelectedRows);
  // };

  // // Function to toggle individual checkbox
  // const handleCheckboxChange = (row: any) => {
  //   setSelectedRows((prev) => ({
  //     ...prev,
  //     [row.id]: !prev[row.id],
  //   }));
  // };

  const columns = [
    // {
    //   id: "checkbox", // Unique identifier for the checkbox column
    //   accessor: "checkbox",
    //   header: () => (
    //     <input
    //       checked={
    //         Object.keys(selectedRows)?.length === transactionData?.length &&
    //         Object.values(selectedRows).every(Boolean)
    //       }
    //       type="checkbox"
    //       onChange={handleSelectAll}
    //     />
    //   ),
    //   //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   cell: (info) => (
    //     <input
    //       checked={selectedRows[info.row.original.id] || false}
    //       type="checkbox"
    //       onChange={() => handleCheckboxChange(info.row.original)}
    //     />
    //   ),
    // },
    columnHelper.accessor("type", {
      header: () => "Type",
      cell: (info) => <>{info?.getValue() ?? "Nil"}</>,
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
        const { color, backgroundColor } = statusColor(
          capitalizeFirstLetter(info?.getValue())
        );

        return (
          <p
            className="block w-auto max-w-[6.25rem] text-center text-xs font-medium rounded-10 px-3 py-2"
            style={{
              color,
              backgroundColor,
            }}
          >
            {capitalizeFirstLetter(info?.getValue())}
          </p>
        );
      },
    }),
    columnHelper.accessor("action", {
      header: () => "Action",
      cell: () => (
        <Button
          className="rounded-10 bg-[#F6F9FF] py-1 px-3 text-[#242424] text-xs"
          onClick={() => setTransactionDetails(true)}
        >
          Details
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: transaction?.transactions ?? [],
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
    () => transaction?.transactions ?? [],
    [transaction?.transactions]
  );

  const SkeletonLoading = () => (
    <div className="animate-pulse">
      <div className="h-3 bg-gray-200 rounded mb-2"></div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between flex-wrap items-center">
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-[#0E0E2C]">Transactions</h2>
            <div className="bg-[#F0F5FF] shrink-0 px-2 py-1 rounded-full text-xs text-[#032282]">
              <p>{table?.getRowModel()?.rows?.length ?? 0}</p>
            </div>
          </div>
          <div className="lg:w-50">
            <DebounceInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
            />
          </div>
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
      <div className="w-full mt-4">
        {isLoading || loadinUser ? (
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
            {rows?.length > 0 && (
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
            )}
          </Table>
        )}
        {!loadinUser && table?.getRowModel()?.rows?.length === 0 && (
          <div className="py-8">
            <div className="w-full flex justify-center items-center text-sm p-5">
              <NoData />
            </div>
            <div className="text-center flex justify-center items-center text-[#0E0E2C] font-sans text-xs">
              <p className=" md:max-w-[12rem] text-center">
                {" "}
                No data to display yet as you haven't made any transactions.
              </p>
            </div>
          </div>
        )}
      </div>
      {TransactionDetails && (
        <TransactionReceivedModal
          heading="Transaction Details"
          subsection="Other details"
          isTransactionDetailsModalOpen={TransactionDetails}
          setTransactionDetailsModal={setTransactionDetails}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
