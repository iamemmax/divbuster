import { adminAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

interface MessageData {
  receiver_id: number;
  message: string;
  upload?: File[]; // Changed from any to File[] for better type safety
  lang: string;
}

interface ChatMessageResponse {
  id: number;
  message: string;
  receiver_id: number;
  upload?: string;
  created_at: string;
  // extend with your API response fields
}

const sendSingleChatMessage = async ({
  message,
  receiver_id,
  upload,
  lang
}: {
  message: string;
  receiver_id: number;
  upload?: File[];
  lang:string
}) => {

  const formData = new FormData();
  formData.append("message", message);
  formData.append("lang", lang);
  formData.append("receiver_id", String(receiver_id));

  
  if (upload && upload.length > 0) {
    upload.forEach((file) => {
      formData.append("upload", file); // real File object
    });
  }


  const response = await adminAxios.post(`/chat`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useSendSingleChatMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<ChatMessageResponse, unknown, MessageData>({
    mutationFn: sendSingleChatMessage,
    onSuccess: () => {
      // Invalidate both chat messages and chat list
      queryClient.invalidateQueries({ queryKey: ["single-chat-messages"] });
      queryClient.invalidateQueries({ queryKey: ["single-chat-list"] });
    },
  });
};