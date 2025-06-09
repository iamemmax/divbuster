import React, { useState } from 'react'
import { ArrowLeft, Send, MoreVertical, Users, Clock, Search, Edit3, Trash2, Archive } from 'lucide-react'
import GroupSidebar from './Group/GroupSidebar';
import GroupMessageBox from './Group/GroupMessageBox';
import { groupChats, me } from './mocks';
export type User = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
};

type Message = {
  senderId: number;
  message: string;
  timestamp: string; // ISO string
};

export type GroupChat = {
  id: number;
  groupName: string;
  participants: User[];
  messages: Message[];
  hasUnreadMessages: boolean;
  lastUpdated?: string; // ISO string
  groupAvatar: string; // <-- new property: array of avatar URLs for group avatar
};





interface prop{
  groupList: GroupChat[]
  setSelectedGroup: React.Dispatch<React.SetStateAction<GroupChat | null>>
   selectedGroup: GroupChat | null;
   setGroupList: React.Dispatch<React.SetStateAction<GroupChat[]>>
}



// Main Component
const GroupMessages = ({groupList,selectedGroup,setGroupList,setSelectedGroup}:prop) => {
  // const [groupList, setGroupList] = useState<GroupChat[]>(groupChats);
  // const [selectedGroup, setSelectedGroup] = useState<GroupChat | null>(null);

  const handleBackToRecent = () => {
    setSelectedGroup(null);
  };

  const handleSendMessage = (messageText: string) => {
    if (!selectedGroup) return;

    const newMessage: Message = {
      senderId: me?.id,
      message: messageText,
      timestamp: new Date().toISOString(),
    };

    setGroupList(prevGroups =>
      prevGroups.map(group =>
        group.id === selectedGroup.id
          ? {
              ...group,
              messages: [...group.messages, newMessage],
              lastUpdated: newMessage.timestamp,
              hasUnreadMessages: false, // Mark as read when we send a message
            }
          : group
      )
    );

    // Update selected group to reflect the new message
    setSelectedGroup(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage],
      lastUpdated: newMessage.timestamp,
      hasUnreadMessages: false,
    } : null);
  };

  const handleDeleteGroup = (groupId: number) => {
    setGroupList(prevGroups => prevGroups.filter(group => group.id !== groupId));
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null);
    }
  };

  const handleArchiveGroup = (groupId: number) => {
    // For demo purposes, we'll just remove it like delete
    // In a real app, you might move it to an archived section
    setGroupList(prevGroups => prevGroups.filter(group => group.id !== groupId));
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null);
    }
  };

  const handleSelectGroup = (group: GroupChat) => {
    setSelectedGroup(group);
    // Mark as read when selected
    setGroupList(prevGroups =>
      prevGroups.map(g =>
        g.id === group.id ? { ...g, hasUnreadMessages: false } : g
      )
    );
  };

  return (
    <div className=" bg-gray-50 h-[79vh] overflow-y-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden h-full">
        {!selectedGroup ? (
          <GroupSidebar
            groupChats={groupList}
            selectedGroup={selectedGroup}
            onSelectGroup={handleSelectGroup}
            onDelete={handleDeleteGroup}
            onArchive={handleArchiveGroup}
          />
        ) : (
          <div className="h-full relative">
            <div className="absolute top-4 left-4 z-50">
              <button
                onClick={handleBackToRecent}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </button>
            </div>
            <div className="pt-16 h-full">
              <GroupMessageBox selectedGroup={selectedGroup} onSendMessage={handleSendMessage}  groupChats={groupChats}/>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-[1fr_2fr] gap-0 h-full">
        <GroupSidebar
          groupChats={groupList}
          selectedGroup={selectedGroup}
          onSelectGroup={handleSelectGroup}
          onDelete={handleDeleteGroup}
          onArchive={handleArchiveGroup}
        />
        <GroupMessageBox selectedGroup={selectedGroup} onSendMessage={handleSendMessage}
        groupChats={groupChats}
        />
      </div>

      
    </div>
  );
};

export default GroupMessages;