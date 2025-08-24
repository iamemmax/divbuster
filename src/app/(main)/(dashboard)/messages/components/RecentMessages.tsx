
import React, { useState } from 'react'
import RecentList from './Recent/RecentList'
import MessageBox from './Recent/MessageBox'
import { ArrowLeft } from 'lucide-react'

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


interface prop{
  messages: messageProp[]
  selectedMessage: messageProp | undefined
  setSelectedMessage: React.Dispatch<React.SetStateAction<messageProp | undefined>>
  
}



const RecentMessages = ({messages,selectedMessage,setSelectedMessage}:prop) => {
  // const [messages, setMessages] = useState<messageProp[]>(messagesArray)


  // Function to handle going back to recent list on mobile
  const handleBackToRecent = () => {
    setSelectedMessage(undefined)
  }

  return (
   <div className="max-h-[80vh] md:max-h-[100vh] mt-5 px-4 sm:px-8 overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden h-full">
        {!selectedMessage ? (
          // Show Recent List on mobile when no message is selected
          <div className="h-full bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
            <RecentList
              messages={messages}
              setSelectedMessage={setSelectedMessage}
              selectedMessage={selectedMessage}
            />
          </div>
        ) : (
          // Show Message Box on mobile when a message is selected
          <div className="h-full relative bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
            {/* Back button for mobile */}
            <div className="absolute top-4 left-4 z-50">
              <button
                onClick={handleBackToRecent}
                className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Back</span>
              </button>
            </div>
            <MessageBox 
              selectedMessage={selectedMessage} 
              onBackToRecent={handleBackToRecent}
            />
          </div>
        )}
      </div>

      {/* Desktop Layout - Original grid layout */}
      <div className="hidden md:grid grid-cols-[1fr_3fr] gap-4 h-full">
        {/* Recent list */}
        <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <RecentList
            messages={messages}
            setSelectedMessage={setSelectedMessage}
            selectedMessage={selectedMessage}
          />
        </div>

        {/* Messages area */}
        <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <MessageBox selectedMessage={selectedMessage} />
        </div>
      </div>
    </div>
  )
}

export default RecentMessages