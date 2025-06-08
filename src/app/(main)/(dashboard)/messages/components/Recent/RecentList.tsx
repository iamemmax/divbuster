import React, { useState } from 'react';
import { messageProp } from '../RecentMessages';
import ChatMessagesSidebar from '../ChatSidebar';

interface prop {
  messages: messageProp[];
  selectedMessage: messageProp | undefined;
  setSelectedMessage: React.Dispatch<React.SetStateAction<messageProp | undefined>>;
}

export default function MessagesSidebar({ messages, selectedMessage, setSelectedMessage }: prop) {
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
      messages={messages}
      selectedMessage={selectedMessage}
      onSelectMessage={setSelectedMessage}
      onDelete={handleDelete}
      onArchive={handleArchive}
    //   title=''
    />
  );
}
