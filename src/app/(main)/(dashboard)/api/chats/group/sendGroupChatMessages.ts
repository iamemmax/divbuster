import { adminAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

interface MessageData {
  group_id: number;
  message: string;
  upload?: File[]; // Changed from any to File[] for better type safety
  lang?: string;
}


interface ChatMessageResponse {
  id: number;
  message: string;
  group_id: number;
  upload?: string;
  created_at: string;
  // extend with your API response fields
}

const sendGroupChatMessage = async ({
  message,
  group_id,
  upload,
}: {
  message: string;
  group_id: number;
  upload?: File[];
}) => {

  const formData = new FormData();
  formData.append("message", message);
  formData.append("group_id", String(group_id));

  
  if (upload && upload.length > 0) {
    upload.forEach((file) => {
      formData.append("upload", file); // real File object
    });
  }


  const response = await adminAxios.post(`/group-chat/message`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useSendGroupChatMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<ChatMessageResponse, unknown, MessageData>({
    mutationFn: sendGroupChatMessage,
    onSuccess: () => {
      // Invalidate both chat messages and chat list
      queryClient.invalidateQueries({ queryKey: ["group-chat-messages"] });
      queryClient.invalidateQueries({ queryKey: ["Group-chat-list"] });
    },
  });
};