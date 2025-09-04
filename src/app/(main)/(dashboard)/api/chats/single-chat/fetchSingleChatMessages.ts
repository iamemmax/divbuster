import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

export interface chatMessageProp {
  detail: string;
  data: Data;
}

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: singleChatMessageResult[];
}

export interface singleChatMessageResult {
  id: string;
  attachment: string;
  message: string;
  read: boolean;
  created_on: string;
  sender: number;
  receiver: number;
}

const fetchSingleChatMessages = async (id: string, pageParam?: string) => {
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
    url = `chat?receiver_id=${id}`;
  }
  
  const response = await adminAxios.get(url);
  return response.data as chatMessageProp;
};

export const useFetchSingleChatMessages = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["single-chat-messages", id],
    queryFn: ({ pageParam }) => fetchSingleChatMessages(id, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.next;
    },
    enabled: !!id,
    getPreviousPageParam: (firstPage) => {
      return firstPage.data.previous;
    },
    refetchInterval: 1000,
  });
};