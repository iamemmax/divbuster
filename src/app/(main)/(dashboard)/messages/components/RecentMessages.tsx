
import React, { useState } from 'react'
import RecentList from './Recent/RecentList'
import MessageBox from './Recent/MessageBox'
import { ArrowLeft } from 'lucide-react'
import { chatListProp, useFetchSingleChatList } from '../../api/chats/single-chat/fetchChatList';

export interface messageProp{
    id: number;
    name: string;
    username: string;
    avatar: string;
    message: string;
    time: string;
    isOnline: boolean;
    hasUnreadMessages: boolean;
    isSelected: boolean;
    hasDeleteIcon?: undefined;
    hasArchiveIcon?: undefined;
    chats: {
    sender: string;
    message: string;
    timestamp: string;
}[]

}
export interface resentChatProp {
  user_id: string;
  name: string;
  image: null | string;
  last_message: string;
  date: null | string;
}

interface prop{
  // messages: resentChatProp[]
  selectedMessage: resentChatProp | undefined
  setSelectedMessage: React.Dispatch<React.SetStateAction<resentChatProp | undefined>>
   recentChatList: chatListProp | undefined;
   isLoading: boolean
}



const RecentMessages = ({ selectedMessage, setSelectedMessage, recentChatList,isLoading }: prop) => {
  // Function to handle going back to recent list on mobile
  const handleBackToRecent = () => {
    setSelectedMessage(undefined);
  };

  return (
   <div className="bg-gray-50  dark:bg-gray-900 h-[79vh] overflow-y-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden h-full">
        {!selectedMessage ? (
          // Show Recent List on mobile when no message is selected
          <div className="h-full bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
            <RecentList
              recentChatList={recentChatList}
              setSelectedMessage={setSelectedMessage}
              selectedMessage={selectedMessage}
              isLoading={isLoading}
            />
          </div>
        ) : (
          // Show Message Box on mobile when a message is selected
          <div className="h-full relative bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
            {/* Back button for mobile */}
          
            <MessageBox 
              selectedMessage={selectedMessage} 
              onBackToRecent={handleBackToRecent}
            />
          </div>
        )}
      </div>

      {/* Desktop Layout - Full height grid */}
      <div className="hidden lg:grid grid-cols-[1.5fr_3fr]  gap-4 h-full">
        {/* Recent list */}
        <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <RecentList
            setSelectedMessage={setSelectedMessage}
            selectedMessage={selectedMessage}
            recentChatList={recentChatList}
            isLoading={isLoading}
          />
        </div>

        {/* Messages area */}
        <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <MessageBox selectedMessage={selectedMessage} />
        </div>
      </div>
    </div>
  );
};


export default RecentMessages