// import { adminAxios } from "@/lib/axios";
// import { useQuery } from "react-query";



//  export interface groupChatListProp {
//   count: number;
//   next: null;
//   previous: null;
//   results: groupChatResult[];
// }

// export interface groupChatResult {
//   id: number;
//   other_members: Othermember[];
//   is_admin: boolean;
//   joined_at: string;
//   user: User;
//   group: Group;
// }

// interface Group {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   created_on: string;
//   created_by: number;
// }

// interface User {
//   id: number;
//   username: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   user_permissions: any[];
// }

// export interface Othermember {
//   user_id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   invite_id: string;
//   image: null | string | string;
// }
// const fetchGroupChatList = async () => {
//  const response = await adminAxios.get(`group-chat/list`);
//     return response.data as groupChatListProp;
// }

// export const useFetchGroupChatList = () => {
//   return useQuery({
//     queryKey: ["Group-chat-list"],
//     queryFn: fetchGroupChatList,
//   });
// };

import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

export interface groupChatListProp {
  count: number;
  next: string | null;
  previous: string | null;
  results: groupChatResult[];
}

export interface groupChatResult {
  id: number;
  other_members: Othermember[];
  is_admin: boolean;
  joined_at: string;
  user: User;
  group: Group;
}

interface Group {
  id: number;
  name: string;
  description: string;
  image: string;
  created_on: string;
  created_by: number;
}

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_permissions: any[];
}

export interface Othermember {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  invite_id: string;
  image: null | string | string;
}

// fetch function with pageParam support
const fetchGroupChatList = async ({ pageParam = "group-chat/list" }): Promise<groupChatListProp> => {
  const response = await adminAxios.get(pageParam);
  return response.data;
};

export const useFetchGroupChatList = () => {
  return useInfiniteQuery<groupChatListProp>({
    queryKey: ["Group-chat-list"],
    queryFn: fetchGroupChatList,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    getPreviousPageParam: (lastPage) => lastPage.previous ?? undefined,
  });
};
