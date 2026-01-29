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
  sender_name: string;
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
interface NotificationFilter {
  lang?: string;
}

const fetchUserNotification = async ({
  pageParam = "user-notification",
  queryKey,
}: QueryFunctionContext): Promise<UserNotificationProp> => {
  const [_key, url, filters] = queryKey as [string, string?, NotificationFilter?];
  
  let relativeUrl = (pageParam as string).replace(/^https?:\/\/[^/]+/, "");
  
  if (url) {
    relativeUrl = url;
  }

  const response = await adminAxios.get(relativeUrl, {
    params: {
      lang: filters?.lang || 'en',
    },
  });
  return response.data as UserNotificationProp;
};

export const useFetchUserNotification = (url?: string, filters?: NotificationFilter) => {
  return useInfiniteQuery<UserNotificationProp>(
    ["fetch-User-Notification", url, filters],
    fetchUserNotification,
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      getPreviousPageParam: (lastPage) => lastPage.previous ?? undefined,
    }
  );
};
