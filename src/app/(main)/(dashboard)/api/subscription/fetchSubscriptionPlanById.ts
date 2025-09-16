import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

interface SubscriptionPlanProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

interface Result {
  id: number;
  name: string;
  token: number;
  description: string;
  duration: string;
  max_photo_upload: number;
  max_video_upload: number;
  max_video_minute: number;
  created_on: string;
  updated_on: string;
}

export const useFetchSubscriptionPlanById = (id: string) => {
  const fetchSubscriptionPlanById = async ({
    pageParam = `subscription-plan/${id}`,
  }: {
    pageParam?: string;
  }) => {
    // Strip domain if next is a full URL
    const relativeUrl = pageParam.replace(/^https?:\/\/[^/]+/, "");
    const response = await adminAxios.get(relativeUrl);
    return response.data as SubscriptionPlanProps;
  };

  return useInfiniteQuery<SubscriptionPlanProps>({
    queryKey: ["subscription-plan-by-id", id], // cache per id
    queryFn: fetchSubscriptionPlanById,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
};
