import { Button, Dialog, DialogContent } from "@/components/core";
import React from "react";
import { messageProp } from "../../RecentMessages";
import { GroupChat } from "../../GroupMessages";
import CloseIcon from "@/app/icons/CloseIcon";

const buddies = [
  {
     id: 1,
    groupName: "Kinslee Boone",
    description: "User description goes here... Lorem ipsum",
    groupAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
 messages:[],
 participants:[],
 username: '@phoenix',
   
    hasUnreadMessages: true,
    isSelected: false,
 
},
  {
      id: 2,
    groupName: "Malayah Sanchez",
    description: "User description goes here... Lorem ipsum",
    groupAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
 messages:[],
 participants:[],
 username: '@phoenix',
   
    hasUnreadMessages: true,
    isSelected: false,
 
},
  {
      id: 3,
    groupName: "Jensen Rowland",
    description: "User description goes here... Lorem ipsum",
    groupAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
 messages:[],
 participants:[],
 username: '@phoenix',
   
    hasUnreadMessages: true,
    isSelected: false,
 
},
  {
      id: 4,
    groupName: "Vivienne Church",
    description: "User description goes here... Lorem ipsum",
    groupAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
 messages:[],
 participants:[],
 username: '@phoenix',
   
    hasUnreadMessages: true,
  
    time: '1hr ago',
},
  {
      id: 5,
    groupName: "Averie Benitez",
    description: "User description goes here... Lorem ipsum",
    groupAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
 messages:[],
 participants:[],
 username: '@phoenix',
   
    hasUnreadMessages: true,
  
    time: '1hr ago',
},
  {
      id: 6,
    groupName: "Kinslee Boone",
    description: "User description goes here... Lorem ipsum",
    groupAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
 messages:[],
 participants:[],
 username: '@phoenix',
   
    hasUnreadMessages: true,
  
    time: '1hr ago',
},
 
];


interface prop{
  isOpen:boolean;
    onClose:()=>void;
    onSelectMessage: (message: GroupChat) => void;
}
export default function StartNewGroupMessageModal({isOpen,onClose,onSelectMessage}:prop) {
  return (
     <Dialog open={isOpen}>
  <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-lg">
    <div className="w-full mx-auto bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-xl shadow">
      {/* Header */}
      <div className="p-7 border-b border-gray-400 dark:border-gray-600 border-opacity-50 flex items-center justify-between">
        <h2 className="text-sm sm:text-base md:text-[1.875rem] font-archivo font-semibold text-[#101828] dark:text-gray-100">
          Create a New Group
        </h2>
        <Button
          className="bg-transparent p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          onClick={() => onClose()}
        >
          <CloseIcon className="text-black dark:text-gray-300" />
        </Button>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 px-7 mt-5">
        <span className="font-semibold text-base md:text-xl font-archivo text-[#1F2C37] dark:text-gray-200">
          Add member from your Buddy list
        </span>
      </p>

      {/* Buddy list */}
      <ul className="space-y-6 px-6 pb-9 max-h-[65vh] overflow-y-auto py-4">
        {buddies.map((buddy, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition"
            onClick={() => {
              onSelectMessage(buddy);
              onClose();
            }}
          >
            <img
              src={buddy.groupAvatar}
              alt={buddy.groupName}
              className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="md:text-lg text-base font-archivo font-medium text-[#101828] dark:text-gray-100">
                {buddy.groupName}
              </p>
              <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] dark:text-gray-400">
                {buddy.description}
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
