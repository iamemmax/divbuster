"use client";
import { Button, Dialog, DialogContent, ErrorModal } from "@/components/core";
import React, { useState } from "react";
import AddIcon from "@/app/icons/(dashboard)/AddIcon";
import PlusIcon from "@/app/icons/(dashboard)/PlusIcon";
import CloseIcon from "@/app/icons/CloseIcon";



interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
setShowAddNewGroupModal: React.Dispatch<React.SetStateAction<boolean>>
  suggestedMembers:members[]
  setSuggestedMembers: React.Dispatch<React.SetStateAction<members[]>>
}

export interface members {
  id: string;
  name: string;
  avatar: string;
  description:string
}

export default function ViewGroupMembersModal({
  isOpen,
  onClose,
  groupId,
  setSuggestedMembers,
  suggestedMembers,
  setShowAddNewGroupModal
}: Prop) {

  // const [suggestedMembers, setSuggestedMembers] = useState<members[]>([]);

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);



  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] rounded-lg">
        <div className="w-full mx-auto bg-[#F9FAFB] rounded-xl shadow">
          <div className="p-7 border-b border-gray-400 border-opacity-50 flex items-center justify-between">
            <h2 className="text-xl md:text-[1.875rem] font-archivo font-semibold text-[#101828]">
            Group Members
            </h2>
            <Button className="p-2 bg-transparent" onClick={()=> onClose()}><CloseIcon color="black"/></Button>
          </div>

          <div className="">
            <Button color="#A7A7A7"  className="bg-transparent text-[#A7A7A7] p-6 flex gap-3  font-archivo font-medium text-sm" onClick={()=>setShowAddNewGroupModal(true)}><PlusIcon color="#A7A7A7"/> Add New Member</Button>
          </div>
        

          <ul className="space-y-6 px-6 pb-9 max-h-[55vh] overflow-y-auto py-4">
            {suggestedMembers
              .filter((buddy) => !selectedMemberIds?.includes(String(buddy.id)))
              .map((buddy, index) => (
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
                  <img
                    src={buddy.avatar}
                    alt={buddy.name}
                    className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="md:text-lg text-base font-archivo font-medium text-[#101828]">
                      {buddy.name}
                    </p>
                    <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] ">
                      {buddy?.description || "No description available"}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>

      </DialogContent>
    </Dialog>
  );
}
