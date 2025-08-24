"use client";
import { Button, Dialog, DialogContent } from "@/components/core";
import React, { useState } from "react";
import CloseIcon from "@/app/icons/CloseIcon";
import { useAddGroupMembers } from "../../../api/addGroupMember";
import { useErrorModalState } from "@/hooks";

const buddies = [
  {
    id: 1,
    name: "Phoenix Baker",
    username: "@phoenix",
    description: "only god is enough",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: 3,
    name: "Mollie Hall",
    username: "@mollie",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    description: "User description goes here... Lorem ipsum",
  },
  {
    id: 7,
    name: "Eva Bond",
    description: "User description goes here... Lorem ipsum",
    username: "@eva",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
    isOnline: false,
  },
  {
    id: 4,
    name: "Rosalee Melvin",
    username: "@rosalee",
    description: "User description goes here... Lorem ipsum",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    isOnline: false,
  },
  {
    id: 5,
    name: "Anaiah Whitten",
    username: "@anaiah",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    description: "",
  },
];

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  setShowCreateGroupChat: React.Dispatch<React.SetStateAction<boolean>>;
  setSuggestedMembers: React.Dispatch<React.SetStateAction<members[]>>
  suggestedMembers: members[]
}

export interface members {
  id: string;
  name: string;
  avatar: string;
  description:string;
}

export default function AddNewGroupMembersModal({
  isOpen,
  onClose,
  groupId,
  setShowCreateGroupChat,
  setSuggestedMembers,
  suggestedMembers
}: Prop) {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { mutate: handleAddMembersFunc } = useAddGroupMembers();
  // const [suggestedMembers, setSuggestedMembers] = useState<members[]>([]);

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  const handleRemoveMember = (id: string) => {
    setSuggestedMembers((prev) => prev.filter((member) => member?.id !== id));
    setSelectedMemberIds((prev) => prev.filter((memberId) => memberId !== id));
  };

  const handleAddMembers = () => {
    
    setShowCreateGroupChat(true);
    onClose();
  };

  return (
 <Dialog open={isOpen}>
  <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-lg">
    <div className="w-full mx-auto bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-xl shadow">
      <div className="p-7 border-b border-gray-400 border-opacity-50 dark:border-gray-600">
        <h2 className="text-xl md:text-[1.875rem] font-archivo font-semibold text-[#101828] dark:text-gray-100">
          Create a New Group
        </h2>
      </div>

      {suggestedMembers?.length > 0 && (
        <>
          <div className="p-7">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Selected Dive Buddies
            </h3>
            <div className="flex items-center flex-wrap gap-6 overflow-x-auto pb-2">
              {suggestedMembers?.map((buddy, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center relative"
                >
                  <img
                    src={buddy?.avatar}
                    alt={buddy?.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <Button
                    className="absolute bottom-5 right-0 h-[1.3625rem] w-[1.3625rem] flex justify-center items-center -mt-2 -mr-2 bg-[#EEEFF0] dark:bg-gray-700 border rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleRemoveMember(buddy?.id)}
                  >
                    <CloseIcon color="#A9B0C2" />
                  </Button>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {buddy.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <hr className="m1-4 border-gray-300 dark:border-gray-600" />
        </>
      )}

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 px-7 mt-5">
        <span className="font-semibold text-base md:text-xl font-archivo text-[#1F2C37] dark:text-gray-200">
          Add member from your Buddy list
        </span>
      </p>

      <ul className="space-y-6 px-6 pb-9 max-h-[55vh] overflow-y-auto py-4">
        {buddies
          .filter((buddy) => !selectedMemberIds.includes(String(buddy.id)))
          .map((buddy, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition"
              onClick={() => {
                if (!selectedMemberIds.includes(String(buddy.id))) {
                  setSelectedMemberIds((prev) => [...prev, String(buddy.id)]);
                  setSuggestedMembers((prev) => [
                    {
                      avatar: buddy.avatar,
                      id: String(buddy.id),
                      name: buddy.name,
                      description: "",
                    },
                    ...prev,
                  ]);
                }
              }}
            >
              <img
                src={buddy.avatar}
                alt={buddy.name}
                className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="md:text-lg text-base font-archivo font-medium text-[#101828] dark:text-gray-100">
                  {buddy.name}
                </p>
                <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] dark:text-gray-400">
                  {buddy.description || "No description available"}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>

    <div className="flex justify-end items-center p-4 gap-4">
      <button
        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => onClose()}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
        onClick={handleAddMembers}
      >
        Proceed
      </button>
    </div>
  </DialogContent>
</Dialog>

  );
}
