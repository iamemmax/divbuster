import React, { useState } from "react";
import { GroupChat } from "../GroupMessages";
import { Edit3, Search, MoreVertical, Archive, Trash2 } from "lucide-react";
import StartNewGroupMessageModal from "../modals/group/StartNewGroupMessageModal";
import AddNewGroupMembersModal, { members } from "../modals/group/AddGroupMembers";
import CreateGroupChatForm from "../modals/group/CreateGroupChat";


type Message = {
  senderId: number;
  message: string;
  timestamp: string; // ISO string
};
// Enhanced Sidebar Component
const GroupSidebar = ({ groupChats, selectedGroup, onSelectGroup, onDelete, onArchive }: {
  groupChats: GroupChat[];
  selectedGroup: GroupChat | null;
  onSelectGroup: (group: GroupChat) => void;
  onDelete: (groupId: number) => void;
  onArchive: (groupId: number) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  

  // Close dropdown menu if clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  // Helper: Get last message of a group chat
  const getLastMessage = (group: GroupChat): Message | null => {
    if (group.messages.length === 0) return null;
    return group.messages.reduce((latest, msg) =>
      new Date(msg.timestamp) > new Date(latest.timestamp) ? msg : latest
    );
  };

  // Filter by group name or any participant name or username
  const filteredGroupChats = React.useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return groupChats.filter((group) => {
      if (group.groupName.toLowerCase().includes(searchLower)) return true;
      return group.participants.some(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.username.toLowerCase().includes(searchLower)
      );
    });
  }, [groupChats, searchQuery]);

  const handleMenuToggle = (groupId: number) => {
    setOpenMenuId(openMenuId === groupId ? null : groupId);
  };

  // Get sender name by id helper
  const getSenderName = (group: GroupChat, senderId: number): string => {
    const sender = group.participants.find((p) => p.id === senderId);
    return sender ? sender.name : "Unknown";
  };

  return (
    <div className="bg-white shadow-sm px-8 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Group Chats</h2>
            <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
              {groupChats?.length ?? 0}
            </span>
          </div>
          
        </div>

        {/* Search */}
        <div className="mt-2">
          <label htmlFor="group-search" className="sr-only">
            Search groups or participants
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="group-search"
              type="text"
              placeholder="Search groups or participants"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Group Chats List */}
      <div className="flex-1 max-h-[66vh] md:max-h-[65vh] overflow-y-auto mt-4">
        {filteredGroupChats.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No group chats found.</p>
        )}

        {filteredGroupChats.map((group,idx:number) => {
          const lastMessage = getLastMessage(group);
          const isSelected = selectedGroup?.id === group.id;

          return (
            <div
              key={group.id+idx}
              className={`flex items-start py-4 px-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                isSelected ? 'bg-orange-50 border-orange-500 border-l-2' : 'border-b'
              }`}
              onClick={() => onSelectGroup(group)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectGroup(group);
                }
              }}
            >
              {/* Status indicator dots */}
              <div className="flex flex-col items-center justify-center mt-6 mr-3 flex-shrink-0 space-y-1">
                {group.hasUnreadMessages && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </div>

              {/* Avatars - show up to 3 participants */}
              <div className="flex -space-x-2 overflow-hidden">
                
                  <img
                    // key={p.id}
                    src={group?.groupAvatar}
                    alt={group?.groupName}
                    title={group?.groupName}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  />
                
                
              </div>

              {/* Content */}
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{group.groupName}</p>
                    {lastMessage && (
                      <p className="text-xs text-gray-500 truncate max-w-xs">
                        <span className="font-semibold">
                          {getSenderName(group, lastMessage.senderId)}:{' '}
                        </span>
                        {lastMessage.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {lastMessage && (
                      <span className="text-xs text-gray-500">
                        {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                    {/* Three-dot menu */}
                    <div className="relative" ref={menuRef}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuToggle(group.id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        aria-haspopup="true"
                        aria-expanded={openMenuId === group.id}
                        aria-controls={`menu-${group.id}`}
                        aria-label="Open options menu"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>

                      {/* Dropdown menu */}
                      {openMenuId === group.id && (
                        <div
                          id={`menu-${group.id}`}
                          className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => {
                                onArchive(group.id);
                                setOpenMenuId(null);
                              }}
                              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              role="menuitem"
                            >
                              <Archive className="h-4 w-4 mr-2 text-yellow-600" />
                              Archive
                            </button>
                            <button
                              onClick={() => {
                                onDelete(group.id);
                                setOpenMenuId(null);
                              }}
                              className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              role="menuitem"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};
export default GroupSidebar