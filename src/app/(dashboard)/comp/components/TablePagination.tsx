import React from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import { addCommasToNumber } from "@/utils";
import { Table } from "@tanstack/react-table";
import NextIcon from "../icons/NextIcon";
import PreviousIcon from "../icons/PreviousIcon";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
  totalItems: number | undefined;
  pageSize: number;
}
const TablePagination = ({ table, totalItems, pageSize = 10 }: Props) => {
  return (
    <div className="flex gap-x-4 items-center justify-end w-full">
      <Pagination
        current={table?.getState()?.pagination?.pageIndex + 1}
        defaultPageSize={table?.getState()?.pagination?.pageIndex + 1}
        nextIcon={() => (
          <div
            className=" h-full flex justify-center items-center hover:border"
            title="Next page"
          >
            <NextIcon />
          </div>
        )}
        pageSize={pageSize}
        prevIcon={() => (
          <div
            className=" h-full flex justify-center items-center  hover:border"
            title="Previous page"
          >
            <PreviousIcon />
          </div>
        )}
        showLessItems={true}
        showQuickJumper={false}
        showSizeChanger={false}
        showTotal={(total, range) => (
          <div className="hidden  h-full xl:flex justify-center items-center">
            <p className="text-xs font-nunito text-[#667085]">{`${range[0]}-${range[1]} of ${addCommasToNumber(total)}`}</p>
          </div>
        )}
        style={{ fontSize: "0.75rem" }}
        total={totalItems as number}
        onChange={(value) => {
          table?.setPageIndex(Number(value ? value - 1 : 0));
        }}
      />
    </div>
  );
};

export default TablePagination;
