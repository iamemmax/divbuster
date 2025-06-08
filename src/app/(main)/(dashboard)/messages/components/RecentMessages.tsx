
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
const messagesArray: messageProp[] = [
  {
    id: 1,
    name: 'Phoenix Baker',
    username: '@phoenix',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '5min ago',
    isOnline: true,
    hasUnreadMessages: true,
    isSelected: false,
    chats: [],
  },
  {
    id: 3,
    name: 'Mollie Hall',
    username: '@mollie',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '1hr ago',
    isOnline: true,
    hasUnreadMessages: false,
    isSelected: false,
    chats: [
      { sender: 'Mollie Hall', message: 'Did you review the proposal?', timestamp: '2025-06-07T08:00:00Z' },
      { sender: 'You', message: 'Yes, looks solid. Just a few tweaks.', timestamp: '2025-06-07T08:05:00Z' },
      { sender: 'Mollie Hall', message: 'Awesome. Send me the final later?', timestamp: '2025-06-07T08:07:00Z' },
      { sender: 'You', message: 'Will do.', timestamp: '2025-06-07T08:08:30Z' },
      { sender: 'Mollie Hall', message: 'Thanks!', timestamp: '2025-06-07T08:10:00Z' }
    ],
  },
  {
    id: 4,
    name: 'Rosalee Melvin',
    username: '@rosalee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '2hr ago',
    isOnline: false,
    hasUnreadMessages: true,
    isSelected: false,
    chats: [
      { sender: 'Rosalee Melvin', message: 'Good morning!', timestamp: '2025-06-07T07:00:00Z' },
      { sender: 'You', message: 'Morning Rosalee!', timestamp: '2025-06-07T07:02:00Z' },
      { sender: 'Rosalee Melvin', message: 'Let’s touch base on the report today.', timestamp: '2025-06-07T07:04:00Z' },
      { sender: 'You', message: 'Sure, I’ll call around noon.', timestamp: '2025-06-07T07:05:00Z' },
      { sender: 'Rosalee Melvin', message: 'Perfect.', timestamp: '2025-06-07T07:06:00Z' }
    ],
  },
  {
    id: 5,
    name: 'Anaiah Whitten',
    username: '@anaiah',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '2hr ago',
    isOnline: false,
    hasUnreadMessages: false,
    isSelected: false,
    chats: [
      { sender: 'Anaiah Whitten', message: 'Can you send over the client list?', timestamp: '2025-06-07T06:30:00Z' },
      { sender: 'You', message: 'Sure, give me 5 minutes.', timestamp: '2025-06-07T06:31:00Z' },
      { sender: 'Anaiah Whitten', message: 'Thanks!', timestamp: '2025-06-07T06:32:00Z' },
      { sender: 'You', message: 'Just sent it to your inbox.', timestamp: '2025-06-07T06:35:00Z' },
      { sender: 'Anaiah Whitten', message: 'Got it. Appreciate it.', timestamp: '2025-06-07T06:36:00Z' }
    ],
  },
  {
    id: 6,
    name: 'Koray Okumus',
    username: '@koray',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '4hr ago',
    isOnline: true,
    hasUnreadMessages: false,
    isSelected: false,
    chats: [
      { sender: 'Koray Okumus', message: 'What’s the update on the deployment?', timestamp: '2025-06-07T05:00:00Z' },
      { sender: 'You', message: 'It’s scheduled for 3 PM today.', timestamp: '2025-06-07T05:01:00Z' },
      { sender: 'Koray Okumus', message: 'Awesome. Let me know when it’s done.', timestamp: '2025-06-07T05:03:00Z' },
      { sender: 'You', message: 'Will ping you.', timestamp: '2025-06-07T05:04:00Z' },
      { sender: 'Koray Okumus', message: 'Cool.', timestamp: '2025-06-07T05:05:00Z' }
    ],
  },
  {
    id: 7,
    name: 'Eva Bond',
    username: '@eva',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '4hr ago',
    isOnline: true,
    hasUnreadMessages: false,
    isSelected: false,
    // hasArchiveIcon: true,
    chats: [
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2025-06-06T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2025-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2025-06-06T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2025-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2025-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2024-06-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2024-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2024-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2024-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2024-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2025-04-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2025-03-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2025-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2025-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2025-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2024-06-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2024-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2024-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2024-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2024-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2025-06-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2025-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2025-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2025-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2025-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2024-06-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2024-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2024-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2024-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2024-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2025-06-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2025-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'We often think success is all about talent or luck — that successful people have a special gift or the perfect opportunity. But the truth is, talent and luck can only take you so far.What truly sets successful people apart is relentless execution: Showing up: Success starts by being present and putting in the effort regularly, even when it’s difficult or you don’t feel motivated.', timestamp: '2025-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2025-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2025-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2024-06-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2024-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2024-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2024-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2024-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2025-06-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2025-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2025-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2025-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2025-06-07T04:04:00Z' },
      { sender: 'Eva Bond', message: 'Did the payment go through?', timestamp: '2024-06-07T04:00:00Z' },
      { sender: 'You', message: 'Yes, I confirmed it earlier today.', timestamp: '2024-06-07T04:01:00Z' },
      { sender: 'Eva Bond', message: 'Alright. Thanks for checking.', timestamp: '2024-06-07T04:02:00Z' },
      { sender: 'You', message: 'No problem.', timestamp: '2024-06-07T04:03:00Z' },
      { sender: 'Eva Bond', message: 'Talk later.', timestamp: '2024-06-07T04:04:00Z' },
    ],

  },
   {
    id: 8,
    name: 'Mollie Hall',
    username: '@mollie',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '1hr ago',
    isOnline: true,
    hasUnreadMessages: false,
    isSelected: false,
    chats: [
      { sender: 'Mollie Hall', message: 'Did you review the proposal?', timestamp: '2025-06-07T08:00:00Z' },
      { sender: 'You', message: 'Yes, looks solid. Just a few tweaks.', timestamp: '2025-06-07T08:05:00Z' },
      { sender: 'Mollie Hall', message: 'Awesome. Send me the final later?', timestamp: '2025-06-07T08:07:00Z' },
      { sender: 'You', message: 'Will do.', timestamp: '2025-06-07T08:08:30Z' },
      { sender: 'Mollie Hall', message: 'Thanks!', timestamp: '2025-06-07T08:10:00Z' }
    ],
  },
  {
    id: 9,
    name: 'Rosalee Melvin',
    username: '@rosalee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '2hr ago',
    isOnline: false,
    hasUnreadMessages: true,
    isSelected: false,
    chats: [
      { sender: 'Rosalee Melvin', message: 'Good morning!', timestamp: '2025-06-07T07:00:00Z' },
      { sender: 'You', message: 'Morning Rosalee!', timestamp: '2025-06-07T07:02:00Z' },
      { sender: 'Rosalee Melvin', message: 'Let’s touch base on the report today.', timestamp: '2025-06-07T07:04:00Z' },
      { sender: 'You', message: 'Sure, I’ll call around noon.', timestamp: '2025-06-07T07:05:00Z' },
      { sender: 'Rosalee Melvin', message: 'Perfect.', timestamp: '2025-06-07T07:06:00Z' }
    ],
  },
  {
    id: 10,
    name: 'Anaiah Whitten',
    username: '@anaiah',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    message: 'Lorem ipsum dolor sit amet...',
    time: '2hr ago',
    isOnline: false,
    hasUnreadMessages: false,
    isSelected: false,
    chats: [
      { sender: 'Anaiah Whitten', message: 'Can you send over the client list?', timestamp: '2025-06-07T06:30:00Z' },
      { sender: 'You', message: 'Sure, give me 5 minutes.', timestamp: '2025-06-07T06:31:00Z' },
      { sender: 'Anaiah Whitten', message: 'Thanks!', timestamp: '2025-06-07T06:32:00Z' },
      { sender: 'You', message: 'Just sent it to your inbox.', timestamp: '2025-06-07T06:35:00Z' },
      { sender: 'Anaiah Whitten', message: 'Got it. Appreciate it.', timestamp: '2025-06-07T06:36:00Z' }
    ],
  },
];





const RecentMessages = () => {
  const [messages, setMessages] = useState<messageProp[]>(messagesArray)
  const [selectedMessage, setSelectedMessage] = useState<messageProp>()

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
          <div className="h-full">
            <RecentList
              messages={messages}
              setSelectedMessage={setSelectedMessage}
              selectedMessage={selectedMessage}
            />
          </div>
        ) : (
          // Show Message Box on mobile when a message is selected
          <div className="h-full relative">
            {/* Back button for mobile */}
            <div className="absolute top-4 left-4 z-50">
              <button
                onClick={handleBackToRecent}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
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
        <div className="h-full">
          <RecentList
            messages={messages}
            setSelectedMessage={setSelectedMessage}
            selectedMessage={selectedMessage}
          />
        </div>

        {/* Messages area */}
        <div className="h-full">
          <MessageBox selectedMessage={selectedMessage} />
        </div>
      </div>
    </div>
  )
}

export default RecentMessages