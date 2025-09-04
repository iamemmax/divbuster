import { adminAxios } from "@/lib/axios";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";

export interface UserNotificationProp {
  count: number;
  next: string | null;
  previous: string | null;
  results: userNotificationResult[];
}

export interface userNotificationResult {
  id: number;
  title: string;
  body: string;
  notification_type: string;
  read: boolean;
  created_on: string;
  sender: user;
  group_chat: null;
  user: number;
}
interface user {
    profile_picture:string
name:string
}
const fetchUserNotification = async ({
  pageParam = "user-notification",
}: QueryFunctionContext): Promise<UserNotificationProp> => {
  const relativeUrl = (pageParam as string).replace(/^https?:\/\/[^/]+/, "");

  const response = await adminAxios.get(relativeUrl);
  return response.data as UserNotificationProp;
};

export const useFetchUserNotification = (url?: string) => {
  return useInfiniteQuery<UserNotificationProp>(
    ["fetch-User-Notification", url],
    fetchUserNotification,
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      getPreviousPageParam: (lastPage) => lastPage.previous ?? undefined,
    }
  );
};
