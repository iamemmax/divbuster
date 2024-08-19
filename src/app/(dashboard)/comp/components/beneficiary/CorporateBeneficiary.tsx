import React, { useMemo, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import { maskPhoneNumber } from "@/utils/strings";
import {
  BeneficiaryData,
  beneficiaryTypeProp,
} from "../plans/api/fetchBeneficairies";
import ThreeDot from "../cards/icons/ThreeDot";
import FiltersIcon from "../../icons/FilterIcons";
import DebounceInput from "../misc/DebounceInput";
import { NoData } from "../../icons";
import { CaretDown } from "@/components/icons";
import { statusColor } from "@/utils/statusColor";
import { capitalizeFirstLetter } from "@/utils";
import { useQuery } from "react-query";
import { getPlan } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
import SelectDurationModal from "../plans/SelectDurationModal";
import Link from "next/link";

const SkeletonLoading = () => (
  <div className="animate-pulse">
    <div className="h-3 bg-gray-200 rounded mb-2"></div>
  </div>
);
interface BenficiaryHeader {
  name: string;
  phone_number: string;
  email: string | null;
  type_of_beneficary?: string;
  enrolee?: {
    created_at: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    referral_code: string;
    email: string;
  };
  ctx?: any;
  status: string;
  id?:number;
}

interface Prop {
  beneficiaryList: beneficiaryTypeProp | undefined;
  loading: boolean;
  setFiterStatus: React.Dispatch<React.SetStateAction<string>>;
}

const CorporateBeneficiary = ({
  beneficiaryList,
  loading: isLoading,
  setFiterStatus,
}: Prop) => {
  const columnHelper = createColumnHelper<BenficiaryHeader>();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedData, setSelectedData] = useState<BeneficiaryData[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const { data: plansData } = useQuery({
    queryFn: getPlan,
    queryKey: ["get-plans"],
  });
  const [beneficiariesList, setBeneficiariesList] = useState<{
    beneficiaries: {
      name_of_beneficiary: string;
      phone_number_of_beneficiary: string;
      type_of_beneficary?: "ADULT" | "MINOR" | undefined;
    }[];
  }>();
  const rows = useMemo(
    () => beneficiaryList?.data ?? [],
    [beneficiaryList && beneficiaryList?.data]
  );

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectedData([]);
    } else {
      const allIndices = rows.map((_, index) => index);
      setSelectedRows(allIndices);
      setSelectedData(rows);
    }
    setSelectAll(!selectAll);
  };

  const toggleRowSelection = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows((prev) => prev.filter((i) => i !== index));
      setSelectedData((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSelectedRows((prev) => [...prev, index]);
      setSelectedData((prev) => [...prev, rows[index]]);
    }
  };

  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.index)}
          onChange={() => toggleRowSelection(row.index)}
        />
      ),
    }),
    columnHelper.accessor("enrolee.created_at", {
      header: () => "Date/Time",
      cell: (info) => moment(info.getValue()).format("YYYY-MM-DD HH:mm:ss"),
    }),
    columnHelper.accessor("enrolee.first_name", {
      header: () => "Beneficiaries",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("enrolee.phone_number", {
      header: () => "Phone Number",
      cell: (info) => <p>{maskPhoneNumber(String(info?.getValue()))}</p>,
    }),
    columnHelper.accessor("enrolee.referral_code", {
      header: () => "Referral code",
      cell: (info) => info?.getValue(),
    }),
    columnHelper.accessor("email", {
      header: () => "Email",
      cell: (info) => (
        <div className=" ">{info.getValue() ? info?.getValue() : "Nil"}</div>
      ),
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
    columnHelper.accessor("ctx", {
      header: () => "Action",
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center outline-none bg-white text-[#556575] text-sm font-medium px-5 border-[#D6D6D6] gap-x-2">
                  <ThreeDot />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="px-4 bg-white z-50 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                sideOffset={5}
                align="end"
              >
                <Link href={`/dashboard/view-beneficiary/${info?.row.original?.id}`}>
                <DropdownMenuItem className="group text-[13px] leading-none text-gray-700 rounded-[3px] flex items-center h-[25px] cursor-pointer font-medium select-none outline-none hover:bg-gray-100">
                View Details
                </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="group text-[13px] leading-none text-gray-700 rounded-[3px] flex items-center h-[25px] cursor-pointer font-medium select-none outline-none hover:bg-gray-100"
                  onClick={() => handleRenewOneActionOnSelected(rowData)}
                >
                  Renew
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        );
      },
    }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data: beneficiaryList?.data ?? [],
    columns: columns,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRenewActionOnSelected = () => {
    const myList = selectedData?.map((data) => ({
      name_of_beneficiary: data?.name,
      phone_number_of_beneficiary: data?.phone_number,
      type_of_beneficary: data?.type_of_beneficary as
        | "ADULT"
        | "MINOR"
        | undefined, // Ensure the correct type is used here
    }));

    setBeneficiariesList({ beneficiaries: myList });
    setShowDurationModal(true);
  };

  const handleRenewOneActionOnSelected = (row: BenficiaryHeader) => {
    const myList = {
      name_of_beneficiary: row?.name,
      phone_number_of_beneficiary: row?.phone_number,
      type_of_beneficary: row?.type_of_beneficary as
        | "ADULT"
        | "MINOR"
        | undefined,
    };

    // Update the beneficiariesList state with the new item inside the beneficiaries array
    setBeneficiariesList({
      beneficiaries: [myList], // Wrap the single item in an array and assign it to the beneficiaries property
    });

    setShowDurationModal(true);
  };

  return (
    <div className="px-6  md:px-[4.5rem] lg:px-[7.5rem]">
      <div className=" bg-white px-12 py-10 mt-4 rounded-10 ">
        <div className="flex justify-between flex-wrap items-center">
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium text-[#0E0E2C]">
                Beneficiaries
              </h2>
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

          <div className="flex gap-x-3">
            {selectedData?.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center outline-none bg-[#f6f9ff] text-[#032282] text-sm font-medium px-3 border-[#D6D6D6] gap-x-1">
                    Actions <CaretDown color="#032282" />
                    {/* Use an appropriate icon or text */}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className=" px-4  bg-white z-50 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                  sideOffset={5}
                  align="end"
                >
                  <DropdownMenuItem
                    className="group text-[13px] leading-none text-gray-700 rounded-[3px] flex items-center h-[25px] cursor-pointer font-medium select-none outline-none hover:bg-gray-100"
                    onClick={handleRenewActionOnSelected}
                  >
                    Renew plan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
                    defaultValue={""}
                    onClick={() => setFiterStatus("")}
                  >
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group text-[13px]  leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    // defaultValue={"SUCCESS"}
                    onClick={() => setFiterStatus("SUCCESS")}
                  >
                    SuccessFul
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    // defaultValue={"PENDING"}
                    onClick={() => setFiterStatus("PENDING")}
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    // defaultValue={"FAILED"}
                    onClick={() => setFiterStatus("FAILED")}
                  >
                    Failed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    // defaultValue={"COMPLETED"}
                    onClick={() => setFiterStatus("COMPLETED")}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    // defaultValue={"CANCELLED"}
                    onClick={() => setFiterStatus("CANCELLED")}
                  >
                    Cancelled
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative cursor-pointer font-medium select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    // defaultValue={"EXPIRED"}
                    onClick={() => setFiterStatus("EXPIRED")}
                  >
                    Expired
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  <TableCell className="text-xs cursor-pointer font-nunito py-2 ">
                    <SkeletonLoading />
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 6 }).map((_, index) => (
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
                            ?.slice(0, 6)
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
          {!isLoading && table?.getRowModel()?.rows?.length === 0 && (
            <div className="py-8">
              <div className="w-full flex justify-center items-center text-sm p-5">
                <NoData />
              </div>
              <div className="text-center flex justify-center items-center text-[#0E0E2C] font-sans text-xs">
                <p className=" md:max-w-[12rem] text-center">
                  {" "}
                  No data to display yet as you haven't added beneficiary.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {showDurationModal && (
        <SelectDurationModal
          isSelectPlanModalOpen={showDurationModal}
          setSelectPlanModal={setShowDurationModal}
          beneficiariesList={beneficiariesList}
          planType="CORPORATE"
          selectedPlan={plansData && plansData[2]?.data}
          actionType="renewal"
        />
      )}
    </div>
  );
};

export default CorporateBeneficiary;
