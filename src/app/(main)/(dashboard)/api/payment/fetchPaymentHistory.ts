import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery, QueryFunctionContext, QueryKey } from "react-query";

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: TransHistoryResult[];
}

interface TransHistoryResult {
  id: number;
  amount: number;
  direction: string;
  transaction_type: string;
  payment_method: string;
  transaction_status: string;
  payment_gateway: string;
  return_url: string;
  narration: string;
  reference: string;
  created_on: string;
  updated_on: string;
  plan: number;
}

const fetchPaymentHistory = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<Data> => {
  const [, type] = queryKey as [string, string];

  const response = await adminAxios.get(
    `payment-history?page=${pageParam}&type=${type}`
  );

  return response.data.data;
};

export const useFetchPaymentHistory = (type: string) => {
  return useInfiniteQuery<Data>(
    ["payment-history", type],
    fetchPaymentHistory,
    {
      getNextPageParam: (lastPage) =>
        lastPage.next
          ? Number(new URL(lastPage.next).searchParams.get("page"))
          : undefined,

      getPreviousPageParam: (firstPage) =>
        firstPage.previous
          ? Number(new URL(firstPage.previous).searchParams.get("page"))
          : undefined,
    }
  );
};
