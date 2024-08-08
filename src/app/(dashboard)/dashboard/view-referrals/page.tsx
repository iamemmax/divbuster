"use client";
import React, { useEffect, useMemo, useState } from "react";
import HospitalIcon2 from "@/app/(dashboard)/comp/icons/HospitalIcon2";
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
import { hospitalVisitedData } from "@/app/(dashboard)/comp/mocks/hospitalVisited";
import { UserDataTypes, useUser } from "@/app/(auth)/(onboarding)/misc";
import { useQuery } from "react-query";
import { getHospitalVisitedFunc } from "@/app/(dashboard)/dashboard/api/getHospitalVisited";
import moment from "moment";
import { fetchReferralList } from "../api/referral/fetchReferral_list";
import DebounceInput from "../../comp/components/misc/DebounceInput";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FilterIcn } from "../../comp/icons";
import TablePagination from "../../comp/components/TablePagination";
import BackIcon from "../../comp/icons/Backicon";
import { useRouter } from "next/navigation";
import { getWalletBalance } from "../api/walletBalance";
import WithDrawalModal from "../../comp/components/withdrawal/WithdrawalModal";
import WithDrawalSuccessModal from "../../comp/components/withdrawal/WidrawalSuccessModal";

interface ReferralListHeader {
  referral_date: string;
  referee: {
    first_name: string;
    last_name?: string;

    phone_number: string;
    referral_code: string;
  };
  amount_rewarded: number;
}

const SkeletonLoading = () => (
  <div className="animate-pulse">
    <div className="h-3 bg-gray-200 rounded mb-2"></div>
  </div>
);

const Page = () => {
  const [showWithdrawalModal, setshowWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [showWithdrawalSuccessModal, setshowWithdrawalSuccessModal] =
    useState(false);
  const { isLoading, data } = useQuery({
    queryFn: fetchReferralList,
    queryKey: ["fetch-referral-list"],
  });
  const columnHelper = createColumnHelper<ReferralListHeader>();

  const columns = [
    columnHelper.accessor("referee.first_name", {
      header: () => "Name",
      cell: (info) => (
        <>{`${info?.getValue()} ${info?.row?.original?.referee?.last_name}`}</>
      ),
    }),
    columnHelper.accessor("referee.phone_number", {
      header: () => "Phone Number",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("referee.referral_code", {
      header: () => "Referral code",
      cell: (info) => <p>{info?.getValue() ?? ""}</p>,
    }),
    columnHelper.accessor("amount_rewarded", {
      header: () => "Amount Rewarded",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("referral_date", {
      header: () => "Date",
      cell: (info) => moment(info.getValue()).format("ll"),
    }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    debugTable: true,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = useMemo(() => data ?? [], [data]);
  const router = useRouter();
  const { data: users } = useUser();
  const { data: walletBalance } = useQuery({
    queryFn: () => getWalletBalance(String(users?.phone_number)),
    queryKey: ["fetch-wallet-balance", users?.phone_number],
    enabled: !!users?.phone_number,
  });

  return (
    <div className="bg-[#F5F9FE]">
      <div className="px-6  md:px-[4.5rem] lg:px-[7.5rem]  flex justify-between items-center flex-wrap py-10 bg-[#080d27]">
        <Button
          className="flex items- bg-transparent gap-3"
          onClick={() => router?.back()}
        >
          <BackIcon />
          <h2 className="text-white font-bold text-2xl">Referral</h2>
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-1">
            <p className="text-white text-sm text-opacity-75">
              Referral Wallet -
            </p>{" "}
            <h2 className="text-white font-bold text-xl">
              ₦{walletBalance?.referral_balance ?? 0}
            </h2>
          </div>
          <Button
            className="bg-[#099976] text-white py-2 text-xs font-medium"
            onClick={() => setshowWithdrawalModal(true)}
          >
            Withdraw
          </Button>
        </div>
      </div>
      <div className="bg-main min-h-36"></div>
      <div className="h-full w-full px-6  md:px-[4.5rem] lg:px-[7.5rem]  min-h-screen relative -mt-32">
        <div className="bg-white w-full h-full mx-auto py-[1.9375rem] px-[2.625rem] rounded-[.625rem]">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-4 w-full items-center">
              <div className="flex items-center w-full  justify-between flex-wrap gap-4">
                <div className="bg-[#F0F5FF]   rounded-lg py-2 px-4 flex items-center gap-2">
                  <Button className="px-0 py-0 bg-[#D0DFFF] shrink-0 w-5 h-5 flex justify-center items-center rounded-full">
                    <HospitalIcon2 />
                  </Button>
                  <h2 className="text-sm font-medium text-[#032282]">
                    List of Referees
                  </h2>
                  <div className="">
                    {data && data?.length > 10 && (
                      <TablePagination
                        pageSize={10}
                        table={table}
                        totalItems={Number(rows?.length)}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                  <div className="lg:w-64">
                    <DebounceInput
                      value={globalFilter ?? ""}
                      onChange={(value) => setGlobalFilter(String(value))}
                    />
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
              </div>
            </div>
          </div>

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
      {showWithdrawalModal && (
        <WithDrawalModal
          setshowWithdrawalModal={setshowWithdrawalModal}
          showWithdrawalModal={showWithdrawalModal}
          referralWalletBalance={walletBalance?.referral_balance}
          setshowWithdrawalSuccessModal={setshowWithdrawalSuccessModal}
          setWithdrawalAmount={setWithdrawalAmount}
        />
      )}

      {showWithdrawalSuccessModal && (
        <WithDrawalSuccessModal
          showWithdrawalSuccessModal={showWithdrawalSuccessModal}
          setshowWithdrawalSuccessModal={setshowWithdrawalSuccessModal}
          withdrawalAmount={withdrawalAmount}
          setshowWithdrawalModal={setshowWithdrawalModal}
        />
      )}
    </div>
  );
};

export default Page;
