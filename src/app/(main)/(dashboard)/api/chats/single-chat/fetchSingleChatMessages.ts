import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";
import { useLanguage } from "@/hooks/useLanguage";

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
  attachment: string | null;
  message: string;
  read: boolean;
  created_on: string;
  sender: number;
  receiver: number;
}

const fetchSingleChatMessages = async (id: string, language: string, pageParam?: string) => {
  let url: string;

  if (pageParam) {
    // Handle both relative and full URLs
    try {
      const urlObj = new URL(pageParam);
      // ✅ Extract path and search params (includes lang if in URL)
      url = urlObj.pathname + urlObj.search;
    } catch {
      // ✅ If it's already a relative URL, check if it has lang param
      if (pageParam.includes('lang=')) {
        url = pageParam;
      } else {
        // ✅ Add lang param if missing
        const separator = pageParam.includes('?') ? '&' : '?';
        url = `${pageParam}${separator}lang=${language}`;
      }
    }
  } else {
    // ✅ Initial request with proper query syntax
    url = `/chat?receiver_id=${id}&lang=${language}`;
  }

  const response = await adminAxios.get(url);
  return response.data as chatMessageProp;
};

export const useFetchSingleChatMessages = (id: string) => {
  const { language } = useLanguage();

  return useInfiniteQuery({
    queryKey: ["single-chat-messages", id, language],
    queryFn: ({ pageParam }) => fetchSingleChatMessages(id, language, pageParam),
    getNextPageParam: (lastPage) => lastPage.data.next,
    getPreviousPageParam: (firstPage) => firstPage.data.previous,
    enabled: !!id,
    refetchInterval: 3000,
  });
};