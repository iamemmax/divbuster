import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
import { noPaginateData } from "./fetchdivesites";
import { useDebounce } from "@/hooks";

 interface filter {
    favorite?: string;
    lang: string;
    search: string;
    paginate:string
  }
const fetchAllDiveSites = async ({ lang, favorite, search }: Omit<filter, 'paginate'>) => {
  try {
    const params = new URLSearchParams();
    params.append("lang", lang);
    params.append("no-paginate", "yes");

    if (favorite === "yes") {
      params.append("favourite", "yes");
    }
    if (search) {
      params.append("title", search);
    }

    const url = `dive/dive-sites?${params.toString()}`;
    const response = await adminAxios.get(url);
    return response.data as noPaginateData;
  } catch (error) {
    console.error("Error fetching all dive sites:", error);
    throw error;
  }
};

export const useFetchAllDiveSites = ({ lang, search }: Omit<filter, 'paginate'>) => {
  const debouncedSearch = useDebounce(search, 300);

  return useQuery({
    queryKey: ["all-dive-sites",  lang, debouncedSearch],
    queryFn: () => fetchAllDiveSites({ lang, search: debouncedSearch }),
    // enabled: !!lang,
    onError: (error) => console.error("Query error:", error),
  });
};
