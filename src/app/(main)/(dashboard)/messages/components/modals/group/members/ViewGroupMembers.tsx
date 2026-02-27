"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent } from "@/components/core";
import AddMembersToGroupModal from "./AddMembersToGroup";
import PlusIcon from "@/app/icons/(dashboard)/PlusIcon";
import CloseIcon from "@/app/icons/CloseIcon";
import { Othermember } from "@/app/(main)/(dashboard)/api/chats/group/fetchGroupChatList";
import { viewGroupMemberTranslation } from "@/app/(main)/translation/chatMessagesTranslation";
import { useLanguage } from "@/hooks/useLanguage";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  setShowAddNewGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  suggestedMembers: Othermember[] | undefined;
  setGroupMembers: React.Dispatch<React.SetStateAction<Othermember[] | undefined>>;
}

export default function ViewGroupMembersModal({
  isOpen,
  onClose,
  groupId,
  suggestedMembers,
  setGroupMembers,
}: Prop) {
  const [showAddNewMember, setShowAddNewMember] = useState(false);

  const { language } = useLanguage();
  const t = viewGroupMemberTranslation[language];
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const getMode = localStorage.getItem("darkMode")
    setDarkMode(Boolean(getMode))
  }, [darkMode])
  

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[40.25rem] bg-[#F9FAFB] dark:bg-[#1E1E1E] rounded-lg transition-colors duration-200">
        <div className="w-full mx-auto rounded-xl shadow bg-[#F9FAFB] dark:bg-[#1E1E1E]">
          {/* Header */}
          <div className="p-5 border-b border-gray-400 border-opacity-50 flex items-center justify-between dark:border-gray-600">
            <h2 className="text-base md:text-[1.675rem] font-archivo font-semibold text-[#101828] dark:text-gray-100">
              {t.groupMembers}
            </h2>
            <Button className="p-2 dark:bg-transparent" onClick={onClose}>
              <CloseIcon color={darkMode  ? "white" : "black"} />
            </Button>
          </div>

          {/* Add new member button */}
          <div>
            <Button
              className="bg-transparent text-[#A7A7A7] dark:text-gray-300 p-6 flex gap-3 font-archivo font-medium text-sm hover:text-gray-600 dark:hover:text-white transition-colors"
              onClick={() => setShowAddNewMember(true)}
            >
              <PlusIcon color="#A7A7A7" />
              {t.addNewMember}
            </Button>
          </div>

          {/* Members List */}
          <ul className="space-y-6 px-6 pb-9 max-h-[55vh] overflow-y-auto py-3">
            {suggestedMembers?.map((buddy, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
              >
                {buddy?.image ? (
                  <Image
                    src={buddy.image}
                    alt={buddy.first_name}
                    width={54}
                    height={54}
                    className="md:w-[3.375rem] md:h-[3.375rem] w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="md:w-[4.375rem] md:h-[4.375rem] w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold dark:bg-gray-700">
                    <p className="md:text-lg text-base font-archivo font-medium text-[#101828] dark:text-white">
                      {`${buddy?.first_name?.[0] ?? ""}${buddy?.last_name?.[0] ?? ""}`}
                    </p>
                  </div>
                )}

                <div>
                  <p className="md:text-lg text-base font-archivo font-medium text-[#101828] dark:text-gray-100">
                    {`${buddy?.first_name} ${buddy?.last_name}`}
                  </p>
                  <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] dark:text-gray-400">
                    {buddy?.email ?? ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add new member modal */}
        <AddMembersToGroupModal
          groupId={groupId}
          isOpen={showAddNewMember}
          onClose={() => setShowAddNewMember(false)}
          setShowCreateGroupChat={setShowAddNewMember}
          suggestedMembers={suggestedMembers}
          setSuggestedMembers={setGroupMembers}
        />
      </DialogContent>
    </Dialog>
  );
}
