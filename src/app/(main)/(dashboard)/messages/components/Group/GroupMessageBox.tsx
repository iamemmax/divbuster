"use client";

import React, { useState, useEffect, useRef } from "react";
import { messageProp } from "../RecentMessages";
import EmptyMessage from "../EmptyMessage";
import {
  Archive,
  Paperclip,
  Smile,
  ArrowLeft,
  Image,
  Video,
  FileTextIcon,
} from "lucide-react";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { formatDateLabel } from "@/utils/formatDateLabel";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { GroupChat } from "../GroupMessages";
import ViewGroupMembersModal from "../modals/group/members/ViewGroupMembers";
import AddNewGroupMembersModal, {
  members,
} from "../modals/group/AddGroupMembers";
import AddMembersToGroupModal from "../modals/group/members/AddMembersToGroup";

interface MessageBoxProps {
  onBackToRecent?: () => void;
  selectedGroup: GroupChat | null;
  onSendMessage: (message: string) => void;
  groupChats: GroupChat[];
}
type User = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
};

type Message = {
  senderId: number;
  message: string;
  timestamp: string; // ISO string
};

const GroupMessageBox = ({
  onSendMessage,
  groupChats,
  onBackToRecent,
  selectedGroup,
}: MessageBoxProps) => {
  const me: User = {
    id: 99,
    name: "You",
    username: "@you",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
  };
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [showGroupMember, setShowGroupMember] = useState(false);
  const [showAddGroupMemberModal, setShowAddNewGroupModal] = useState(false);
  const [suggestedMembers, setSuggestedMembers] = useState([
    {
      id: "1",
      name: "Phoenix Baker",
      description: "only god is enough",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: " 3",
      name: "Mollie Hall",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",

      description: "User description goes here... Lorem ipsum",
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    onSendMessage(message.trim());
    setMessage("");
    setShowEmojiPicker(false);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);

    // Focus back on textarea after emoji selection
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const openImageDialog = () => {
    imageInputRef.current?.click();
    setShowAttachmentMenu(false);
  };

  const openVideoDialog = () => {
    videoInputRef.current?.click();
    setShowAttachmentMenu(false);
  };

  const openDocumentDialog = () => {
    documentInputRef.current?.click();
    setShowAttachmentMenu(false);
  };

  const toggleAttachmentMenu = () => {
    setShowAttachmentMenu((prev) => !prev);
  };

  function getSenderName(senderId: number): string | undefined {
    for (const group of groupChats) {
      for (const participant of group.participants) {
        if (participant.id === senderId) {
          return participant.name;
        }
      }
    }
    return undefined; // or return 'Unknown Sender' if you prefer
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Selected file: ${file.name} (${file.size} bytes)`);
      // Handle file upload logic here
      e.target.value = ""; // Reset file input
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Selected image: ${file.name} (${file.size} bytes)`);
      // Handle image upload logic here
      e.target.value = ""; // Reset file input
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Selected video: ${file.name} (${file.size} bytes)`);
      // Handle video upload logic here
      e.target.value = ""; // Reset file input
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Selected document: ${file.name} (${file.size} bytes)`);
      // Handle document upload logic here
      e.target.value = ""; // Reset file input
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showEmojiPicker && !target.closest(".emoji-picker-container")) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedGroup?.messages]);

  if (!selectedGroup) return <EmptyMessage />;

  return (
  <div className="flex flex-col h-full border rounded-lg bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700 flex-shrink-0">
    <div className="flex items-center space-x-3">
      {/* Back button for mobile */}
      {onBackToRecent && (
        <button
          onClick={onBackToRecent}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors mr-2"
          aria-label="Back to recent messages"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      )}
      <div className="relative">
        <img
          src={selectedGroup?.groupAvatar}
          alt={selectedGroup?.groupName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
      </div>
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">
          {selectedGroup?.groupName}
        </h2>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          {selectedGroup?.participants?.slice(0, 7).map((x) => x.name).join(", ")}
          {selectedGroup?.participants?.length > 7 &&
            `, +${selectedGroup.participants.length - 7} more`}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button className="hidden sm:flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <Archive className="h-4 w-4" />
        <span>Archive</span>
      </button>
      <button
        className="px-3 sm:px-4 py-2 bg-orange-500 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-orange-600"
        onClick={() => setShowGroupMember(true)}
      >
        <span className="hidden sm:inline">View members</span>
        <span className="sm:hidden">Members</span>
      </button>
    </div>
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900 min-h-0">
    {selectedGroup?.messages?.length === 0 ? (
      <EmptyMessage />
    ) : (
      <div className="max-h-[52vh] md:max-h-[58vh] overflow-y-auto">
        {selectedGroup?.messages?.map((msg, index) => {
          const isCurrentUser = msg.senderId === me?.id;
          const currentMessageDate = new Date(msg.timestamp).toDateString();
          const prevMessageDate =
            index > 0
              ? new Date(selectedGroup.messages[index - 1].timestamp).toDateString()
              : null;

          const showDateLabel = index === 0 || currentMessageDate !== prevMessageDate;

          return (
            <div key={index} className="py-6">
              {showDateLabel && (
                <div className="flex justify-center my-5">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    {formatDateLabel(msg.timestamp)}
                  </span>
                </div>
              )}
              <div className={`flex ${isCurrentUser ? "justify-end" : "items-start space-x-3"}`}>
                {!isCurrentUser && (
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                    alt="Sender"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className={`flex-1 ${isCurrentUser ? "flex flex-col items-end" : ""}`}>
                  <div
                    className={`flex items-center gap-x-6 mb-1 ${isCurrentUser ? "flex-row-reverse" : ""}`}
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {isCurrentUser ? "You" : getSenderName(msg?.senderId)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <div
                    className={`relative rounded-2xl px-4 py-2 inline-block max-w-[90%] md:max-w-[70%] break-words group ${
                      isCurrentUser
                        ? "bg-orange-500 text-white rounded-tr-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-md"
                    }`}
                  >
                    <p className="text-sm font-medium font-archivo">{msg.message}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    )}
  </div>

  {/* Input */}
  <div className="border-t p-4 bg-white dark:bg-gray-800 dark:border-gray-700 flex-shrink-0">
    <div className="flex items-end space-x-2">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Send a message"
        className="w-full px-4 py-3 pr-20 border border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        rows={1}
      />
      <button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
          message.trim()
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        }`}
        type="button"
      >
        Send
      </button>
    </div>
  </div>
</div>

  );
};

export default GroupMessageBox;
