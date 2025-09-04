"use client";
import { Button, Dialog, DialogContent, ErrorModal } from "@/components/core";
import React, { useState } from "react";
import AddIcon from "@/app/icons/(dashboard)/AddIcon";
import PlusIcon from "@/app/icons/(dashboard)/PlusIcon";
import CloseIcon from "@/app/icons/CloseIcon";
import { Othermember } from "@/app/(main)/(dashboard)/api/chats/group/fetchGroupChatList";
import AddMembersToGroupModal from "./AddMembersToGroup";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  setShowAddNewGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  suggestedMembers: Othermember[] | undefined;
  setGroupMembers: React.Dispatch<React.SetStateAction<Othermember[] | undefined>>
}



export default function ViewGroupMembersModal({
  isOpen,
  onClose,
  groupId,
  suggestedMembers,
  setGroupMembers
  
}: Prop) {
  // const [suggestedMembers, setSuggestedMembers] = useState<members[]>([]);

  // const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [showAddNewMember, setShowAddNewMember] = useState(false)

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] rounded-lg">
        <div className="w-full mx-auto bg-[#F9FAFB] rounded-xl shadow">
          <div className="p-7 border-b border-gray-400 border-opacity-50 flex items-center justify-between">
            <h2 className="text-xl md:text-[1.875rem] font-archivo font-semibold text-[#101828]">
              Group Members
            </h2>
            <Button className="p-2 bg-transparent" onClick={() => onClose()}>
              <CloseIcon color="black" />
            </Button>
          </div>

          <div className="">
            <Button
              color="#A7A7A7"
              className="bg-transparent text-[#A7A7A7] p-6 flex gap-3  font-archivo font-medium text-sm"
              onClick={() => setShowAddNewMember(true)}
            >
              <PlusIcon color="#A7A7A7" /> Add New Member
            </Button>
          </div>

          <ul className="space-y-6 px-6 pb-9 max-h-[55vh] overflow-y-auto py-4">
            {suggestedMembers?.map((buddy, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 cursor-pointer"
                // onClick={() => {
                //   if (!selectedMemberIds.includes(String(buddy.id))) {
                //     setSelectedMemberIds((prev) => [
                //       ...prev,
                //       String(buddy.id),
                //     ]);
                //     setSuggestedMembers((prev) => [
                //       {
                //         avatar: buddy?.avatar,
                //         id: String(buddy?.id),
                //         name: buddy?.name,
                //         description:buddy?.description,

                //       },
                //       ...prev,
                //     ]);
                //   }

                // }}
              >
               {buddy?.image ? (
  <img
    src={buddy.image}
    alt={buddy.first_name}
    className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
    onError={(e) => {
      e.currentTarget.src = "/default-avatar.png" // optional backup image
    }}
  />
) : (
  <div className="md:w-[4.375rem] md:h-[4.375rem] w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
    {`${buddy?.first_name?.[0] ?? ""}${buddy?.last_name?.[0] ?? ""}`}
  </div>
)}

                <div>
                  <p className="md:text-lg text-base font-archivo font-medium text-[#101828]">
                    {`${buddy?.first_name} ${buddy?.last_name}`}
                  </p>
                  <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] ">
                    {buddy?.email ?? ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
       { <AddMembersToGroupModal
       groupId={groupId}
       isOpen={showAddNewMember}
       onClose={()=>setShowAddNewMember(false)}
       setShowCreateGroupChat={setShowAddNewMember}
       suggestedMembers={suggestedMembers}
       setSuggestedMembers={setGroupMembers}


       
       />}
      </DialogContent>
    </Dialog>
  );
}
