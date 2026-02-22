import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery ,QueryFunctionContext} from "react-query";
import { DiveLogsFilters, divLogsProp } from "../types/buddies/diveLogTypes";



const fetchDiveLogs = async (
  context: QueryFunctionContext<[string, DiveLogsFilters]>
): Promise<divLogsProp> => {
  const { pageParam = "divelog", queryKey } = context;
  const [, filters] = queryKey;

  const params: Record<string, any> = {};
  
  // Only add data_type if it's not "all_time" or undefined
  if (filters.data_type && filters.data_type !== "all_time") {
    params.data_type = filters.data_type;
  }

  if (filters.date_from) {
    params.date_from = new Date(filters.date_from)
      .toISOString()
      .split("T")[0];
  }
  if (filters.date_to) {
    params.date_to = new Date(filters.date_to)
      .toISOString()
      .split("T")[0];
  }

  const relativeUrl = (pageParam as string).replace(/^https?:\/\/[^/]+/, "");

  const response = await adminAxios.get(relativeUrl, { params });
  return response.data as divLogsProp;
};
export const useFetchDiveLogs = (filters: DiveLogsFilters) => {
  return useInfiniteQuery<divLogsProp, unknown, divLogsProp, [string, DiveLogsFilters]>({
    queryKey: ["dive-logs", filters],
    queryFn: fetchDiveLogs,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
};