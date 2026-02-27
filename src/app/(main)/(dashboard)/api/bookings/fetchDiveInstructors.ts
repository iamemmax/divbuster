import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";





const fetchDiveInstructors = async (
  id: string,
  { pageParam = `dive/instructor-bookings?dive_school_id=${id}` }
) => {
  // Strip domain if next is a full URL
  const relativeUrl = pageParam.replace(/^https?:\/\/[^/]+/, "");
  const response = await adminAxios.get(relativeUrl);
  return response.data ;
};

export const useFetchDiveInstructors = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["dive-instructors", id], // cache per dive school
    queryFn: ({ pageParam }) => fetchDiveInstructors(id, { pageParam }),
    getNextPageParam: (lastPage) => lastPage.data?.next ?? undefined,
  });
};
