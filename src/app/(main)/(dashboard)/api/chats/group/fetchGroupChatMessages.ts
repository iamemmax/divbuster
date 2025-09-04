import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

export interface groupChatMessagesProp {
  detail: string;
  data: Data;
}

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: groupChatMessagesResult[];
}

interface groupChatMessagesResult {
  id: string;
  attachment: null;
  message: string;
  created_on: string;
  sender: number;
  group: number;
}

const fetchGroupChatMessages = async (id: string, pageParam?: string) => {
  let url: string;
  
  if (pageParam) {
    // If pageParam is a full URL, extract just the path and query parameters
    try {
      const urlObj = new URL(pageParam);
      url = urlObj.pathname + urlObj.search;
    } catch {
      // If pageParam is not a full URL, use it as is
      url = pageParam;
    }
  } else {
    // Initial request
    url = `group-chat/message?group_id=${id}`;
  }
  
  const response = await adminAxios.get(url);
  return response.data as groupChatMessagesProp;
};

export const useFetchGroupChatMessages = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["group-chat-messages", id],
    queryFn: ({ pageParam }) => fetchGroupChatMessages(id, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.next;
    },
    enabled: !!id,
    keepPreviousData: true,
    getPreviousPageParam: (firstPage) => {
      return firstPage.data.previous;
    },
    refetchInterval: 1000,
  });
};