import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


export interface chatListProp {
  detail: string;
  data: Datum[];
}

interface Datum {
  user_id: string;
  name: string;
  image: null | string;
  last_message: string;
  date: null | string;
}

const fetchSingleChatList = async (lang:string) => {
 const response = await adminAxios.get(`chat-list?lang=${lang}`);
    return response.data as chatListProp;
}

export const useFetchSingleChatList = (lang:string) => {
  return useQuery({
    queryKey: ["single-chat-list",lang],
    queryFn: ()=>fetchSingleChatList(lang),
    enabled:!!lang,
  });
};