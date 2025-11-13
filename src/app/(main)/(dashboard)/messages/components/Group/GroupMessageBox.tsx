"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import EmptyMessage from "../EmptyMessage";
import {
  Archive,
  Paperclip,
  Smile,
  ArrowLeft,
  Image,
  Video,
  FileTextIcon,
  ImageIcon,
  Send,
} from "lucide-react";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { formatDateLabel } from "@/utils/formatDateLabel";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { groupChatResult, Othermember } from "../../../api/chats/group/fetchGroupChatList";
import { useFetchGroupChatMessages } from "../../../api/chats/group/fetchGroupChatMessages";
import { PdfLogo, WordLogo, ExcelLogo } from "@/icons/files/FIles";
import { FileUpload } from "../Recent/MessageBox";
import { useSendGroupChatMessage } from "../../../api/chats/group/sendGroupChatMessages";
import { useAuth } from "@/contexts/authentication";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import ViewGroupMembersModal from "../modals/group/members/ViewGroupMembers";
import { useLanguage } from "@/hooks/useLanguage";
import { messageBoxTranslations } from "@/app/(main)/translation/chatMessagesTranslation";
import InfiniteScroll from 'react-infinite-scroll-component';

interface MessageBoxProps {
  onBackToRecent?: () => void;
  selectedGroup: groupChatResult | null;
  groupMembers: Othermember[] | undefined;
  setGroupMembers: React.Dispatch<React.SetStateAction<Othermember[] | undefined>>
}

interface OptimisticMessage {
  id: string;
  message: string;
  sender: string;
  attachment?: string;
  created_on: string;
  group: number;
  isOptimistic?: boolean;
  isSending?: boolean;
}

const GroupMessageBox = ({ selectedGroup, groupMembers, setGroupMembers }: MessageBoxProps) => {
  const { authState } = useAuth();
  const { user } = authState;
  const userData = user as User;
  const {language}=useLanguage()
  const t = messageBoxTranslations[language] || messageBoxTranslations.en

  // State hooks
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showViewGroupMemberModal, setShowViewNewGroupModal] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<OptimisticMessage[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom hooks
  const groupId = selectedGroup?.group?.id ? String(selectedGroup.group.id) : "";
  const {
    data: chatMessages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchGroupChatMessages(groupId);

  const { mutate: handleSendMessages, isLoading: isSending } = useSendGroupChatMessage();

  // Memoized values
  const allMessages = useMemo(() => {
    if (!chatMessages?.pages) return optimisticMessages;

    const apiMessages = Array.isArray(chatMessages.pages)
      ? chatMessages.pages
          .flatMap((page) => page?.data?.results || [])
          .filter(Boolean)
      : [];

    const combined: any[] = [...apiMessages];
    
    const apiMessageContents = new Set(
      apiMessages.map(msg => `${msg.message}-${msg.sender}-${Math.floor(new Date(msg.created_on).getTime() / 1000)}`)
    );
    
    optimisticMessages.forEach(optMsg => {
      const optMsgKey = `${optMsg.message}-${optMsg.sender}-${Math.floor(new Date(optMsg.created_on).getTime() / 1000)}`;
      
      if (!apiMessageContents.has(optMsgKey)) {
        const adaptedOptMsg = {
          ...optMsg,
          attachment: optMsg.attachment || null,
        };
        combined.push(adaptedOptMsg);
      }
    });

    return combined.sort((a, b) => {
      try {
        const dateA = new Date(a.created_on || 0).getTime();
        const dateB = new Date(b.created_on || 0).getTime();

        if (isNaN(dateA) && isNaN(dateB)) return 0;
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;

        return dateA - dateB;
      } catch (error) {
        console.error("Error sorting messages by date:", error);
        return 0;
      }
    });
  }, [chatMessages?.pages, optimisticMessages]);

  const hasMessages = allMessages.length > 0;
  const canSend = (message.trim() || selectedFiles.length > 0) && !isSending;

  // Fixed optimistic ID generation
  const generateOptimisticId = () => `optimistic-${Date.now()}-${Math.random()}`;

  const handleSendMessage = useCallback(async () => {
    if (!message.trim() && selectedFiles.length === 0) return;
    if (!selectedGroup?.group?.id) return;

    const messageToSend = message.trim();
    const filesToUpload = [...selectedFiles];
    const optimisticId = generateOptimisticId();

    try {
      let attachmentPreview = null;

      if (filesToUpload.length > 0) {
        const firstFile = filesToUpload[0];
        if (firstFile.type === "image" && firstFile.preview) {
          attachmentPreview = firstFile.preview;
        } else if (firstFile.type === "video") {
          attachmentPreview = URL.createObjectURL(firstFile.file);
        } else {
          attachmentPreview = `document:${firstFile.file.name}`;
        }
      }

      const optimisticMessage: OptimisticMessage = {
        id: optimisticId,
        message: messageToSend,
        sender: String(userData?.id),
        group: selectedGroup.group.id,
        created_on: new Date().toISOString(),
        attachment: attachmentPreview as string,
        isOptimistic: true,
        isSending: true,
      };

      setOptimisticMessages((prev) => [...prev, optimisticMessage]);

      // Clear inputs immediately
      setMessage("");
      setSelectedFiles([]);
      setShowEmojiPicker(false);
      setShowAttachmentMenu(false);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
        textareaRef.current.value = ""; // Ensure textarea is cleared
      }

      const uploadFiles = filesToUpload?.map((fileUpload) => fileUpload.file);

      handleSendMessages(
        {
          message: messageToSend,
          group_id: Number(selectedGroup.group.id),
          upload: uploadFiles,
        },
        {
          onSuccess: (response) => {
            setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));
            setSelectedFiles([])
          },
          onError: (error) => {
            setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));
            setMessage(messageToSend);
            setSelectedFiles(filesToUpload);
          },
          
        }
      );

    } catch (error) {
      setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));
    }
  }, [message, selectedFiles, selectedGroup?.group?.id, handleSendMessages, userData?.id]);

  // Handle keyboard shortcuts
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          return;
        } else {
          e.preventDefault();
          handleSendMessage();
        }
      }

      if (e.key === "Escape") {
        setShowEmojiPicker(false);
        setShowAttachmentMenu(false);
      }
    },
    [handleSendMessage]
  );

  // Auto-resize textarea
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setMessage(value);

      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
        const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
        textareaRef.current.style.height = newHeight + "px";
      }

      setIsTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    },
    []
  );

  // Fixed emoji picker handlers
  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((prev) => !prev);
    setShowAttachmentMenu(false);
  }, []);

  const onEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
    // Keep emoji picker open for multiple selections
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Update textarea height after adding emoji
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "44px";
          const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
          textareaRef.current.style.height = newHeight + "px";
        }
      }, 0);
    }
  }, []);

  // File upload handlers
  const openImageDialog = useCallback(() => {
    imageInputRef.current?.click();
    setShowAttachmentMenu(false);
  }, []);

  const openVideoDialog = useCallback(() => {
    videoInputRef.current?.click();
    setShowAttachmentMenu(false);
  }, []);

  const openDocumentDialog = useCallback(() => {
    documentInputRef.current?.click();
    setShowAttachmentMenu(false);
  }, []);

  const toggleAttachmentMenu = useCallback(() => {
    setShowAttachmentMenu((prev) => !prev);
    setShowEmojiPicker(false);
  }, []);

  // Fixed file handling to prevent duplicates
  const handleFileChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      type: "image" | "video" | "document"
    ) => {
      const files = Array.from(e.target.files || []);
      
      if (files.length === 0) return;

      const newFiles: FileUpload[] = files.map((file) => {
        const fileUpload: FileUpload = { file, type };

        if (type === "image" && file.type.startsWith("image/")) {
          try {
            fileUpload.preview = URL.createObjectURL(file);
          } catch (error) {
            console.error("Error creating object URL:", error);
          }
        }

        return fileUpload;
      });

      // Replace instead of append to prevent duplicates
      setSelectedFiles(newFiles);

      // Reset input value to allow selecting the same file again
      if (e.target) {
        e.target.value = "";
      }
    },
    []
  );

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev[index];
      const updated = prev.filter((_, i) => i !== index);

      if (fileToRemove?.preview) {
        try {
          URL.revokeObjectURL(fileToRemove.preview);
        } catch (error) {
          console.error("Error revoking object URL:", error);
        }
      }

      return updated;
    });
  }, []);

  // Format time helper
  const formatTime = useCallback((timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "";

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const shouldShowDateLabel = useCallback((currentMsg: any, prevMsg: any) => {
    if (!prevMsg) return true;

    try {
      const currentDate = new Date(currentMsg.created_on).toDateString();
      const prevDate = new Date(prevMsg.created_on).toDateString();
      return currentDate !== prevDate;
    } catch (error) {
      console.error("Error comparing dates:", error);
      return false;
    }
  }, []);

  
  //  click outside handler for emoji picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if click is outside emoji picker and its container
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(target) &&
        !target.closest('[data-emoji-picker-trigger]')
      ) {
        setShowEmojiPicker(false);
      }

      // Check if click is outside attachment menu
      if (
        showAttachmentMenu &&
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(target) &&
        !target.closest('[data-attachment-trigger]')
      ) {
        setShowAttachmentMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker, showAttachmentMenu]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedGroup?.group]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [chatMessages?.pages, optimisticMessages, scrollToBottom]);



  // Cleanup
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      selectedFiles.forEach((file) => {
        if (file.preview) {
          try {
            URL.revokeObjectURL(file.preview);
          } catch (error) {
            console.error("Error revoking object URL:", error);
          }
        }
      });

      optimisticMessages.forEach((msg) => {
        if (msg.attachment?.startsWith("blob:")) {
          try {
            URL.revokeObjectURL(msg.attachment);
          } catch (error) {
            console.error("Error revoking optimistic attachment URL:", error);
          }
        }
      });
    };
  }, [selectedFiles, optimisticMessages]);

  if (!selectedGroup) return <EmptyMessage />;

  return (
    <div className="flex flex-col h-full border rounded-lg bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={selectedGroup?.group?.image}
              alt={selectedGroup?.group?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              {selectedGroup?.group?.name ?? ""}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {selectedGroup?.other_members
                ?.slice(0, 7)
                .map((x) => x?.first_name)
                ?.join(", ")}
              {selectedGroup?.other_members?.length > 7 &&
                `, +${selectedGroup?.other_members.length - 7} more`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 sm:px-4 py-2 bg-orange-500 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-orange-600"
            onClick={() => setShowViewNewGroupModal(true)}
          >
            <span className="hidden sm:inline">View members</span>
            <span className="sm:hidden">Members</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
           {t.failedToLoadMessages}
          </div>
        ) : !hasMessages ? (
          <EmptyMessage />
        ) : (
          <div
            id="group-messages-container"
            className="h-full overflow-y-auto p-4"
          >
            <InfiniteScroll
              dataLength={allMessages.length}
              next={fetchNextPage}
              hasMore={hasNextPage || false}
              loader={
                <div className="flex justify-center py-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                </div>
              }
              scrollableTarget="group-messages-container"
              inverse={true}
            >
              <div className="space-y-4">
                {allMessages.map((msg, index) => {
              if (!msg) return null;

              const isCurrentUser = msg.sender?.toString() === userData?.id?.toString();
              const prevMsg = index > 0 ? allMessages[index - 1] : null;
              const showDateLabel = shouldShowDateLabel(msg, prevMsg);
              
              // Check if this specific message is being sent (only for optimistic messages)
              const isMessageSending = msg.isOptimistic && msg.isSending;

              return (
                <React.Fragment key={msg.id || `${index}-${msg.created_on}`}>
                  {showDateLabel && (
                    <div className="flex justify-center my-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        {formatDateLabel(msg.created_on)}
                      </span>
                    </div>
                  )}
                  
                  <div
                    className={`flex ${isCurrentUser ? "justify-end" : "items-start space-x-3"}`}
                  >
                    {!isCurrentUser && (
                      <div className="w-10 h-10 uppercase rounded-full bg-gray-300 flex items-center justify-center text-black font-semibold">
                        {`${selectedGroup?.user?.first_name?.[0] || ""}${selectedGroup?.user?.last_name?.[0] || ""}`}
                      </div>
                    )}

                    <div
                      className={`flex-1 max-w-[80%] ${isCurrentUser ? "flex flex-col items-end" : ""}`}
                    >
                      <div
                        className={`flex items-center space-x-2 mb-1 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        {!isCurrentUser && (
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {`${selectedGroup?.user?.first_name} ${selectedGroup?.user?.last_name}` ||
                             t.unknownUser}
                          </span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(msg?.created_on)}
                        </span>
                      </div>

                      <div
                        className={`relative rounded-2xl p-2 inline-block break-words group ${
                          isCurrentUser
                            ? `bg-orange-500 text-white rounded-tr-md ${isMessageSending ? "opacity-70" : ""}`
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-md"
                        }`}
                      >
                        {msg?.message && (
                          <p className="text-sm whitespace-pre-wrap font-archivo">
                            {msg.message}
                          </p>
                        )}

                        {msg?.attachment && (
                          <div className="mt-2">
                            {/* Handle optimistic blob URLs for images */}
                            {msg.attachment.startsWith("blob:") ? (
                              <img
                                src={msg.attachment}
                                alt="attachment"
                                className="max-w-xs rounded-lg cursor-pointer"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : /* Handle optimistic document placeholders */
                            msg.attachment.startsWith("document:") ? (
                              <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                <FileTextIcon className="h-4 w-4 text-blue-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {msg.attachment.replace("document:", "")}
                                </span>
                              </div>
                            ) : /* Handle regular image URLs from API */
                            msg.attachment.match(/\.(jpeg|jpg|png|gif|webp)$/i) ||
                              msg.attachment.includes("/image/") ||
                              msg.attachment.startsWith("data:image/") ? (
                              <img
                                src={msg.attachment}
                                alt="attachment"
                                className="max-w-xs rounded-lg cursor-pointer"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : /* Handle video files from API */
                            msg.attachment.match(/\.(mp4|webm|ogg|avi|mov)$/i) ||
                              msg.attachment.includes("/video/") ||
                              msg.attachment.startsWith("data:video/") ? (
                              <video
                                src={msg.attachment}
                                controls
                                className="max-w-xs rounded-lg"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : /* Handle document files from API */
                            msg.attachment.match(/\.(pdf|docx?|xlsx?|pptx?|txt|zip|rtf)$/i) ||
                              msg.attachment.includes("/document/") ||
                              msg.attachment.includes("application/pdf") ||
                              msg.attachment.includes("application/msword") ||
                              msg.attachment.includes("application/vnd.openxmlformats") ? (
                              <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                {/* File type icons */}
                                {(msg.attachment.match(/\.pdf$/i) || msg.attachment.includes("application/pdf")) && (
                                  <PdfLogo className="h-4 w-4 text-red-500" />
                                )}
                                {(msg.attachment.match(/\.docx?$/i) || msg.attachment.includes("application/msword") || msg.attachment.includes("application/vnd.openxmlformats-officedocument.wordprocessingml")) && (
                                  <WordLogo className="h-4 w-4 text-blue-600" />
                                )}
                                {(msg.attachment.match(/\.xlsx?$/i) || msg.attachment.includes("application/vnd.openxmlformats-officedocument.spreadsheetml") || msg.attachment.includes("application/vnd.ms-excel")) && (
                                  <ExcelLogo className="h-4 w-4 text-green-600" />
                                )}
                                {(msg.attachment.match(/\.pptx?$/i) || msg.attachment.includes("application/vnd.openxmlformats-officedocument.presentationml") || msg.attachment.includes("application/vnd.ms-powerpoint")) && (
                                  <ExcelLogo className="h-4 w-4 text-orange-500" />
                                )}
                                {!msg.attachment.match(/\.(pdf|docx?|xlsx?|pptx?)$/i) && (
                                  <FileTextIcon className="h-4 w-4 text-blue-500" />
                                )}

                                <a
                                  href={msg.attachment}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-gray-700 dark:text-gray-300 underline hover:text-blue-500"
                                >
                                  {msg.attachment.split("/").pop() || "Download File"}
                                </a>
                              </div>
                            ) : /* Only show download link for actual files, not empty strings */
                            msg.attachment.trim() && msg.attachment !== "null" && msg.attachment !== "undefined" ? (
                              <a
                                href={msg.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm underline text-blue-500 hover:text-blue-600 flex items-center space-x-2"
                              >
                                <FileTextIcon className="h-4 w-4" />
                                <span>📎 {t.downloadFile}</span>
                              </a>
                            ) : null}
                          </div>
                        )}

                        {/* Loading overlay only for pending optimistic messages */}
                        {isMessageSending && (
                          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
                })}
              </div>
            </InfiniteScroll>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* File Preview Section */}
      {selectedFiles.length > 0 && (
        <div className="border-t bg-gray-50 dark:bg-gray-800 p-3">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((fileUpload, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-700 rounded-lg p-2 border"
              >
                {fileUpload.preview ? (
                  <img
                    src={fileUpload.preview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded">
                    <FileTextIcon className="h-8 w-8 text-gray-500" />
                  </div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  aria-label="Remove file"
                >
                  ×
                </button>
                <p
                  className="text-xs text-center mt-1 truncate w-16"
                  title={fileUpload?.file.name}
                >
                  {fileUpload.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input Section */}
      <div className="border-t p-4 bg-white dark:bg-gray-800 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-end space-x-2">
          <div className="flex-1 flex items-center relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Send a message"
              className="w-full px-4 py-3 pr-20 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50"
              style={{ minHeight: "44px", maxHeight: "120px" }}
              rows={1}
              disabled={isSending}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <button
                type="button"
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={toggleEmojiPicker}
                disabled={isSending}
                aria-label="Add emoji"
                data-emoji-picker-trigger
              >
                <Smile className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>

              <div className="relative" ref={attachmentMenuRef}>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  onClick={toggleAttachmentMenu}
                  disabled={isSending}
                  aria-label="Attach file"
                  data-attachment-trigger
                >
                  <ThreeDot className="text-gray-600 dark:text-gray-300" />
                </button>

                {showAttachmentMenu && (
                  <div className="absolute bottom-10 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-30 min-w-[180px]">
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
                      onClick={openImageDialog}
                    >
                      <ImageIcon className="h-4 w-4 text-purple-500" />
                      <span>{t.image}</span>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
                      onClick={openVideoDialog}
                    >
                      <Video className="h-4 w-4 text-purple-500" />
                      <span>{t.video}</span>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
                      onClick={openDocumentDialog}
                    >
                      <FileTextIcon className="h-4 w-4 text-blue-500" />
                      <span>{t.document}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div
                className="absolute bottom-12 right-2 z-50 emoji-picker-container"
                ref={emojiPickerRef}
              >
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width={280}
                  height={350}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!canSend}
            className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${
              canSend
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
            type="button"
            aria-label="Send message"
          >
            {isSending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{t.send}</span>
          </button>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileChange(e, "image")}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileChange(e, "video")}
        />
        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf"
          multiple
          className="hidden"
          onChange={(e) => handleFileChange(e, "document")}
        />
      </div>

      {showViewGroupMemberModal && (
        <ViewGroupMembersModal 
          isOpen={showViewGroupMemberModal}
          setShowAddNewGroupModal={setShowViewNewGroupModal}
          onClose={() => setShowViewNewGroupModal(false)}
          groupId={groupId}
          suggestedMembers={groupMembers}
          setGroupMembers={setGroupMembers}
        />
      )}
    </div>
  );
};

export default GroupMessageBox;