
"use client"
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import type { resentChatProp } from "../RecentMessages"
import EmptyMessage from "../EmptyMessage"
import { Smile,ImageIcon, Video, FileTextIcon, Send } from "lucide-react"
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot"
import { formatDateLabel } from "@/utils/formatDateLabel"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import { useFetchSingleChatMessages } from "../../../api/chats/single-chat/fetchSingleChatMessages"
import { useSendSingleChatMessage } from "../../../api/chats/single-chat/sendChatMessages"
import { LinkButton } from "@/components/core"
import { PdfLogo, WordLogo, ExcelLogo } from "@/icons/files/FIles"
import { useLanguage } from "@/hooks/useLanguage"
import { messageBoxTranslations } from "@/app/(main)/translation/chatMessagesTranslation"
import InfiniteScroll from 'react-infinite-scroll-component'
// import { FileTextIcon, FileSpreadsheet, FileWord, FilePdf, FileArchive } from "lucide-react";

interface MessageBoxProps {
  selectedMessage: resentChatProp | undefined
  onBackToRecent?: () => void
}

export interface FileUpload {
  file: File
  type: "image" | "video" | "document"
  preview?: string
}

interface OptimisticMessage {
  id: string
  message: string
  sender: string
  attachment?: string
  created_on: string
  isOptimistic?: boolean
  isSending?: boolean
}

const MessageBox = ({ selectedMessage }: MessageBoxProps) => {
  const {language}= useLanguage()
  const t = messageBoxTranslations[language] || messageBoxTranslations.en
  const [message, setMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [optimisticMessages, setOptimisticMessages] = useState<OptimisticMessage[]>([])

  // Refs
  // const containerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const attachmentMenuRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // API hooks
  const {
    data: chatMessages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    // isFetchingNextPage
  } = useFetchSingleChatMessages(selectedMessage?.user_id ? String(selectedMessage.user_id) : "")

  const { mutate: handleSendMessages, isLoading: isSending } = useSendSingleChatMessage()

  // Process and sort messages by date
  const allMessages = useMemo(() => {
    if (!chatMessages?.pages) return optimisticMessages;

    const apiMessages = Array.isArray(chatMessages.pages)
      ? chatMessages.pages
        .flatMap((page) => page?.data?.results || [])
        .filter(Boolean)
      : [];

    // Get the latest API message timestamp to filter out old optimistic messages
    const latestApiMessageTime = apiMessages.length > 0
      ? Math.max(...apiMessages.map(msg => new Date(msg.created_on).getTime()))
      : 0;

    // Only keep optimistic messages that are newer than the latest API message
    // This prevents showing both optimistic and real messages
    const recentOptimisticMessages = optimisticMessages.filter(optMsg => {
      const optMsgTime = new Date(optMsg.created_on).getTime();
      return optMsgTime > latestApiMessageTime;
    });

    const combined: any[] = [...apiMessages, ...recentOptimisticMessages];

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

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])
  const generateOptimisticId = () => `optimistic-${Date.now()}-${Math.random()}`;


  // Updated handleSendMessage function
  const handleSendMessage = useCallback(async () => {
    if (!message.trim() && selectedFiles.length === 0) return;
    if (!selectedMessage?.user_id) return;

    const messageToSend = message.trim();
    const filesToUpload = [...selectedFiles];
    const optimisticId = generateOptimisticId();

    try {
      let attachmentPreview = null;

      // Create attachment preview for optimistic message
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
        sender: "current-user",
        created_on: new Date().toISOString(),
        attachment: attachmentPreview as string,
        isOptimistic: true,
        isSending: true,
      };

      // Add optimistic message
      setOptimisticMessages((prev) => [...prev, optimisticMessage]);

      // Store references before clearing
      const currentMessage = message;
      const currentFiles = [...selectedFiles];

      // Clear inputs immediately for better UX
      setMessage("");
      setSelectedFiles([]);
      setShowEmojiPicker(false);
      setShowAttachmentMenu(false);

      // Reset textarea properly
      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
        textareaRef.current.value = ""; // Ensure textarea is cleared
      }
      // Extract actual File objects for upload
      const uploadFiles = filesToUpload?.map(fileUpload => fileUpload.file);

      // Send the message with files
      handleSendMessages(
        {
          message: messageToSend,
          receiver_id: Number(selectedMessage.user_id),
          upload: uploadFiles,
          lang:language
        },
        {
          onSuccess: () => {

            // Use setTimeout to ensure state updates are processed
            setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));
            setSelectedFiles([])

            // Clean up blob URLs
            // if (attachmentPreview && attachmentPreview.startsWith("blob:")) {
            //   URL.revokeObjectURL(attachmentPreview);
            // }
          },
          onError: () => {

            // Remove failed optimistic message
            setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));

            // Restore the inputs
            setMessage(currentMessage);
            setSelectedFiles(currentFiles);

            // Restore textarea content and height
            if (textareaRef.current) {
              const textarea = textareaRef.current;
              textarea.value = currentMessage;
              textarea.style.height = "44px";
              const newHeight = Math.min(textarea.scrollHeight, 120);
              textarea.style.height = newHeight + "px";
            }

            // Clean up blob URLs
            if (attachmentPreview && attachmentPreview.startsWith("blob:")) {
              URL.revokeObjectURL(attachmentPreview);
            }
          },

          onSettled: () => {
            setSelectedFiles([])
            if (textareaRef.current) {
              textareaRef.current.style.height = "44px";
              textareaRef.current.value = ""; // Ensure textarea is cleared
            }

          }
        }
      );
    } catch (error) {
      setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));

      // Restore inputs on catch
      setMessage(messageToSend);
      setSelectedFiles(filesToUpload);
    }
  }, [message, selectedFiles, selectedMessage?.user_id, handleSendMessages]);
  // Handle keyboard shortcuts
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          // Allow new line with Shift+Enter
          return
        } else {
          // Send message with Enter
          e.preventDefault()
          handleSendMessage()
        }
      }

      // Handle Escape to close menus
      if (e.key === "Escape") {
        setShowEmojiPicker(false)
        setShowAttachmentMenu(false)
      }
    },
    [handleSendMessage],
  )

  // Auto-resize textarea with proper cleanup
  // Updated handleInputChange to ensure proper clearing
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Auto-resize textarea
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "44px";
      const newHeight = Math.min(textarea.scrollHeight, 120);
      textarea.style.height = newHeight + "px";
    }

    // Show typing indicator (debounced)
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  }, []);
  // Emoji picker handlers
  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((prev) => !prev)
    setShowAttachmentMenu(false)
  }, [])

  const onEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // File upload handlers
  const openImageDialog = useCallback(() => {
    imageInputRef.current?.click()
    setShowAttachmentMenu(false)
  }, [])

  const openVideoDialog = useCallback(() => {
    videoInputRef.current?.click()
    setShowAttachmentMenu(false)
  }, [])

  const openDocumentDialog = useCallback(() => {
    documentInputRef.current?.click()
    setShowAttachmentMenu(false)
  }, [])

  const toggleAttachmentMenu = useCallback(() => {
    setShowAttachmentMenu((prev) => !prev)
    setShowEmojiPicker(false)
  }, [])

  // Handle file selection with better error handling
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video" | "document") => {
      const files = Array.from(e.target.files || [])

      if (files.length === 0) return

      const newFiles: FileUpload[] = files.map((file) => {
        const fileUpload: FileUpload = { file, type }

        // Create preview for images
        if (type === "image" && file.type.startsWith("image/")) {
          try {
            fileUpload.preview = URL.createObjectURL(file)
          } catch (error) {
          }
        }

        return fileUpload
      })

      setSelectedFiles((prev) => [...prev, ...newFiles])

      // Reset input value
      if (e.target) {
        e.target.value = ""
      }
    },
    [],
  )

  // Remove selected file with proper cleanup
  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev[index]
      const updated = prev.filter((_, i) => i !== index)

      // Clean up preview URLs
      if (fileToRemove?.preview) {
        try {
          URL.revokeObjectURL(fileToRemove.preview)
        } catch (error) {
        }
      }

      return updated
    })
  }, [])

  // Format time helper
  const formatTime = useCallback((timestamp: string) => {
    try {
      const date = new Date(timestamp)
      if (isNaN(date.getTime())) return ""

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    } catch (error) {
      return ""
    }
  }, [])

  // Check if should show date label
  const shouldShowDateLabel = useCallback((currentMsg: any, prevMsg: any) => {
    if (!prevMsg) return true

    try {
      const currentDate = new Date(currentMsg.created_on).toDateString()
      const prevDate = new Date(prevMsg.created_on).toDateString()
      return currentDate !== prevDate
    } catch (error) {
      console.error("Error comparing dates:", error)
      return false
    }
  }, [])

  // Click outside handlers with better event handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element

      if (!target) return

      // Close emoji picker if clicked outside
      if (showEmojiPicker && emojiPickerRef.current && !emojiPickerRef.current.contains(target)) {
        setShowEmojiPicker(false)
      }

      // Close attachment menu if clicked outside
      if (showAttachmentMenu && attachmentMenuRef.current && !attachmentMenuRef.current.contains(target)) {
        setShowAttachmentMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showEmojiPicker, showAttachmentMenu])

  // Auto-scroll when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)

    return () => clearTimeout(timer)
  }, [chatMessages?.pages, optimisticMessages, scrollToBottom])



  // Cleanup file previews and timeouts on unmount
  useEffect(() => {
    return () => {
      // Clean up typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Clean up file previews from selected files
      selectedFiles.forEach((file) => {
        if (file.preview) {
          try {
            URL.revokeObjectURL(file.preview)
          } catch (error) {
            // Error revoking object URL
          }
        }
      })

      // Clean up optimistic message attachment URLs
      optimisticMessages.forEach((msg) => {
        if (msg.attachment?.startsWith("blob:")) {
          try {
            URL.revokeObjectURL(msg.attachment)
          } catch (error) {
            // Error revoking optimistic attachment URL
          }
        }
      })
    }
  }, [selectedFiles, optimisticMessages])

  // Early return if no selected message
  if (!selectedMessage) return <EmptyMessage />

  const hasMessages = allMessages.length > 0
  const canSend = (message.trim() || selectedFiles.length > 0) && !isSending

  return (
    <div className="flex flex-col max-sm:max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-200px)] h-full border rounded-lg bg-[#F9FAFB] dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          
          <div className="relative">
            <Image
              src={selectedMessage?.image ? selectedMessage?.image : "/images/profile.png" as string}
              alt={selectedMessage?.name || "User"}
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {selectedMessage?.name || t.unknownUser}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {isTyping ? t.typing : t.activeNow}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <LinkButton
            href={`/div-buddies/profile/${selectedMessage?.user_id}`}
            className="px-3 sm:px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            <span className="hidden sm:inline">{t.viewProfile}</span>
            <span className="sm:hidden">{t.profile}</span>
          </LinkButton>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full size-8 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
          {t.failedToLoadMessages}
          </div>
        ) : !hasMessages ? (
          <EmptyMessage />
        ) : (
          <div
            id="messages-container"
            className="h-full overflow-y-auto p-4"
          >
            <InfiniteScroll
              dataLength={allMessages.length}
              next={fetchNextPage}
              hasMore={hasNextPage || false}
              loader={
                <div className="flex justify-center py-2">
                  <div className="animate-spin rounded-full size-6 border-b-2 border-orange-500"></div>
                </div>
              }
              scrollableTarget="messages-container"
              inverse={true}
            >
              <div className="space-y-4">
                {allMessages.map((msg, index) => {
              if (!msg) return null

              const isCurrentUser = msg.sender?.toString() !== selectedMessage?.user_id?.toString()
              const prevMsg = index > 0 ? allMessages[index - 1] : null
              const showDateLabel = shouldShowDateLabel(msg, prevMsg)
              const isOptimisticMessage = msg.id?.toString().startsWith('optimistic-')
              // const isSending = msg?. || false

              return (
                <React.Fragment key={msg.id || `${index}-${msg.created_on}`}>
                  {showDateLabel && (
                    <div className="flex justify-center my-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        {formatDateLabel(msg.created_on)}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${isCurrentUser ? "justify-end" : "items-start space-x-3"}`}>
                    {!isCurrentUser && (
                      <Image
                        src={selectedMessage?.image || "/placeholder.svg"}
                        alt="Sender"
                        width={32}
                        height={32}
                        className="size-8 rounded-full object-cover shrink-0"
                      />
                    )}
                    <div className={`flex-1 max-w-[80%] ${isCurrentUser ? "flex flex-col items-end" : ""}`}>
                      {/* Header: name + timestamp */}
                      <div className={`flex items-center space-x-2 mb-1 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}>
                        {!isCurrentUser && (
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {selectedMessage?.name || "Unknown User"}
                          </span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(msg?.created_on)}
                        </span>
                        {/* Loading indicator for optimistic messages */}
                        {/* {isSending && isOptimisticMessage && (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-500"></div>
                        )} */}
                      </div>

                      {/* Bubble */}
                      <div className={`relative rounded-2xl px-4 py-2 inline-block break-words group ${isCurrentUser
                          ? `bg-orange-500 text-white rounded-tr-md ${isSending ? 'opacity-70' : ''}`
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-md"
                        }`}>
                        {/* Message Text */}
                        {msg?.message && (
                          <p className="text-sm whitespace-pre-wrap font-archivo">{msg.message}</p>
                        )}

                        {/* Attachment Display - Works for both optimistic and real messages */}

                        {msg?.attachment && (
                          <div className="mt-2">
                            {/* Handle optimistic blob URLs for images */}
                            {msg.attachment.startsWith("blob:") ? (
                              <div className="relative max-w-xs rounded-lg overflow-hidden cursor-pointer">
                                <Image
                                  src={msg.attachment}
                                  alt="attachment"
                                  width={300}
                                  height={300}
                                  className="rounded-lg object-cover"
                                />
                              </div>
                            ) : /* Handle optimistic document placeholders */
                              msg.attachment.startsWith("document:") ? (
                                <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                  <FileTextIcon className="size-4 text-blue-500" />
                                  <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {msg.attachment.replace("document:", "")}
                                  </span>
                                </div>
                              ) : /* Handle regular image URLs from API */
                                msg.attachment.match(/\.(jpeg|jpg|png|gif|webp)$/i) ||
                                  msg.attachment.includes("/image/") ||
                                  msg.attachment.startsWith("data:image/") ? (
                                  <div className="relative max-w-xs rounded-lg overflow-hidden cursor-pointer">
                                    <Image
                                      src={msg.attachment}
                                      alt="attachment"
                                      width={300}
                                      height={300}
                                      className="rounded-lg object-cover"
                                      onError={() => {
                                        // Handle error by showing nothing
                                      }}
                                    />
                                  </div>
                                ) : /* Handle video files from API */
                                  msg.attachment.match(/\.(mp4|webm|ogg|avi|mov)$/i) ||
                                    msg.attachment.includes("/video/") ||
                                    msg.attachment.startsWith("data:video/") ? (
                                    <video
                                      src={msg.attachment}
                                      className="max-w-xs rounded-lg"
                                      onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                      }}
                                      controls
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
                                          <PdfLogo className="size-4 text-red-500" />
                                        )}
                                        {(msg.attachment.match(/\.docx?$/i) || msg.attachment.includes("application/msword") || msg.attachment.includes("application/vnd.openxmlformats-officedocument.wordprocessingml")) && (
                                          <WordLogo className="size-4 text-blue-600" />
                                        )}
                                        {(msg.attachment.match(/\.xlsx?$/i) || msg.attachment.includes("application/vnd.openxmlformats-officedocument.spreadsheetml") || msg.attachment.includes("application/vnd.ms-excel")) && (
                                          <ExcelLogo className="size-4 text-green-600" />
                                        )}
                                        {(msg.attachment.match(/\.pptx?$/i) || msg.attachment.includes("application/vnd.openxmlformats-officedocument.presentationml") || msg.attachment.includes("application/vnd.ms-powerpoint")) && (
                                          <ExcelLogo className="size-4 text-orange-500" />
                                        )}
                                        {!msg.attachment.match(/\.(pdf|docx?|xlsx?|pptx?)$/i) && (
                                          <FileTextIcon className="size-4 text-blue-500" />
                                        )}

                                        <a
                                          href={msg.attachment}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-gray-700 dark:text-gray-300 underline hover:text-blue-500"
                                        >
                                          {msg.attachment.split("/").pop() || t.downloadFile}
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
                                          <FileTextIcon className="size-4" />
                                          <span>📎 {t.downloadFile}</span>
                                        </a>
                                      ) : null}
                          </div>
                        )}


                        {/* Loading overlay for optimistic messages */}
                        {isSending && isOptimisticMessage && (
                          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl flex items-center justify-center">
                            <div className="animate-spin rounded-full size-4 border-b-2 border-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
                })}
              </div>
            </InfiniteScroll>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="border-t bg-gray-50 dark:bg-gray-800 p-3">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((fileUpload, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-700 rounded-lg p-2 border"
              >
                {fileUpload.preview ? (
                  <Image
                    src={fileUpload.preview}
                    alt={t.preview}
                    width={64}
                    height={64}
                    className="size-16 object-cover rounded"
                  />
                ) : (
                  <div className="size-16 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded">
                    <FileTextIcon className="size-8 text-gray-500" />
                  </div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  aria-label={t.removeFile}
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

      {/* Input */}
      <div className="border-t p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shrink-0">
        <div className="flex items-end space-x-2">
          <div className="flex-1 flex items-center relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder={t.sendMessagePlaceholder}
              className="w-full px-4 py-3 pr-20 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50"
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
              >
                <Smile className="size-4 text-gray-500 dark:text-gray-300" />
              </button>

              {/* Attachment menu */}
              <div className="relative" ref={attachmentMenuRef}>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  onClick={toggleAttachmentMenu}
                  disabled={isSending}
                  aria-label="Attach file"
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
                      <ImageIcon className="size-4 text-purple-500" />
                      <span>{t.image}</span>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
                      onClick={openVideoDialog}
                    >
                      <Video className="size-4 text-purple-500" />
                      <span>{t.video}</span>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
                      onClick={openDocumentDialog}
                    >
                      <FileTextIcon className="size-4 text-blue-500" />
                      <span>{t.document}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-2 z-50" ref={emojiPickerRef}>
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
            className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${canSend
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            type="button"
            aria-label="Send message"
          >
            {isSending ? (
              <div className="animate-spin rounded-full size-4 border-b-2 border-current"></div>
            ) : (
              <Send className="size-4" />
            )}
            <span className="hidden sm:inline">{t.send}</span>
          </button>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "image")}
          multiple
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "video")}
          multiple
        />
        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf"
          className="hidden"
          onChange={(e) => handleFileChange(e, "document")}
          multiple
        />
      </div>
    </div>
  )
}


export default MessageBox