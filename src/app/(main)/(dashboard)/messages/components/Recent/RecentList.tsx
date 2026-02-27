import React from 'react';
import { resentChatProp } from '../RecentMessages';
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
  return (
    <ChatMessagesSidebar
      // messages={messages}
      selectedMessage={selectedMessage}
      onSelectMessage={setSelectedMessage}
      recentChatList={recentChatList}
      isLoading={isLoading}
    />
  );
}
