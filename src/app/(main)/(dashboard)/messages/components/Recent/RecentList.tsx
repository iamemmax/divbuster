import React, { useState } from 'react';
import { messageProp, resentChatProp } from '../RecentMessages';
import ChatMessagesSidebar from '../ChatSidebar';
import { chatListProp } from '../../../api/chats/single-chat/fetchChatList';

interface prop {
  // messages: resentChatProp;
  selectedMessage: resentChatProp | undefined;
  setSelectedMessage: React.Dispatch<React.SetStateAction<resentChatProp | undefined>>;
  recentChatList: chatListProp | undefined;
  isLoading: boolean
}

export default function MessagesSidebar({  selectedMessage, setSelectedMessage,recentChatList,isLoading }: prop) {
  const handleDelete = (messageId: string) => {
    console.log('Delete message:', messageId);
    // Add your delete logic here
  };

  const handleArchive = (messageId: string) => {
    console.log('Archive message:', messageId);
    // Add your archive logic here
  };

  return (
    <ChatMessagesSidebar
      // messages={messages}
      selectedMessage={selectedMessage}
      onSelectMessage={setSelectedMessage}
      onDelete={handleDelete}
      onArchive={handleArchive}
      recentChatList={recentChatList}
      isLoading={isLoading}
    //   title=''
    />
  );
}
