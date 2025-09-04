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

const fetchSingleChatList = async () => {
 const response = await adminAxios.get(`chat-list`);
    return response.data as chatListProp;
}

export const useFetchSingleChatList = () => {
  return useQuery({
    queryKey: ["single-chat-list"],
    queryFn: fetchSingleChatList,
  });
};