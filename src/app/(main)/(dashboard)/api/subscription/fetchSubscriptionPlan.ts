import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

interface subscriptionPlanProps {
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

const fetchSubscriptionPlan = async (
  { pageParam = "subscription-plan" }: { pageParam?: string }
) => {
  // Strip domain if next is a full URL
  const relativeUrl = pageParam.replace(/^https?:\/\/[^/]+/, "");
  const response = await adminAxios.get(relativeUrl);
  return response.data as subscriptionPlanProps;
};

export const useFetchSubscriptionPlan = () => {
  return useInfiniteQuery({
    queryKey: ["subscription-plan"], // cache for subscription plans
    queryFn: fetchSubscriptionPlan,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
};