import { Dialog, DialogContent } from "@/components/core";
import React from "react";
import { messageProp } from "../RecentMessages";

const buddies = [
  {
     id: 1,
    name: "Kinslee Boone",
    description: "User description goes here... Lorem ipsum",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
 chats:[],
 username: '@phoenix',
     isOnline: true,
    hasUnreadMessages: true,
    isSelected: false,
     message: 'Lorem ipsum dolor sit amet...',
    time: '1hr ago',
},
  {
      id: 2,
    name: "Malayah Sanchez",
    description: "User description goes here... Lorem ipsum",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
 chats:[],
 username: '@phoenix',
     isOnline: true,
    hasUnreadMessages: true,
    isSelected: false,
     message: 'Lorem ipsum dolor sit amet...',
    time: '1hr ago',
},
  {
      id: 3,
    name: "Jensen Rowland",
    description: "User description goes here... Lorem ipsum",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
 chats:[],
 username: '@phoenix',
     isOnline: true,
    hasUnreadMessages: true,
    isSelected: false,
     message: 'Lorem ipsum dolor sit amet...',
    time: '1hr ago',
},
  {
      id: 4,
    name: "Vivienne Church",
    description: "User description goes here... Lorem ipsum",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
 chats:[],
 username: '@phoenix',
     isOnline: true,
    hasUnreadMessages: true,
    isSelected: false,
     message: 'Lorem ipsum dolor sit amet...',
    time: '1hr ago',
},
  {
      id: 5,
    name: "Averie Benitez",
    description: "User description goes here... Lorem ipsum",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
 chats:[],
 username: '@phoenix',
     isOnline: true,
    hasUnreadMessages: true,
    isSelected: false,
     message: 'Lorem ipsum dolor sit amet...',
    time: '1hr ago',
},
  {
      id: 6,
    name: "Kinslee Boone",
    description: "User description goes here... Lorem ipsum",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
 chats:[],
 username: '@phoenix',
     isOnline: true,
    hasUnreadMessages: true,
    isSelected: false,
     message: 'Lorem ipsum dolor sit amet...',
    time: '1hr ago',
},
 
];


interface prop{
  isOpen:boolean;
    onClose:()=>void;
    onSelectMessage: (message: messageProp) => void
}
export default function StartNewMessageModal({isOpen,onClose,onSelectMessage}:prop) {
  return (
     <Dialog open={isOpen} >
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] rounded-lg">
    <div className="w-full mx-auto  bg-[#F9FAFB] rounded-xl shadow">
      <div className="p-7 border-b border-gray-400 border-opacity-50 ">
        <h2 className=" text-xl md:text-[1.875rem] font-archivo font-semibold text-[#101828]">Start a New Message</h2>

    
      </div>
      <p className="text-sm text-gray-600 mb-4 px-7 mt-5">
        <span className="font-semibold text-base md:text-xl font-archivo text-[#1F2C37] ">Buddies on DiveBusters {`(${buddies?.length})`}</span>   
      </p>

      <ul className="space-y-6 px-6 pb-9 max-h-[65vh] overflow-y-auto py-4">
        {buddies.map((buddy, index) => (
          <li key={index} className="flex items-center space-x-4 cursor-pointer" onClick={()=>{
            onSelectMessage(buddy)
            onClose()
          }}>
            <img
              src={buddy.avatar}
              alt={buddy.name}
              className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="md:text-lg text-base font-archivo font-medium text-[#101828]">{buddy.name}</p>
              <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] ">{buddy.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </DialogContent>
    </Dialog>
  );
}
