import React, { useState } from 'react';
import { Search, Edit3, Trash2, Archive, MoreVertical } from 'lucide-react';
import { messageProp } from './RecentMessages';
import StartNewMessageModal from './modals/StartNewMessageModal';

interface ChatMessagesSidebarProps {
  messages: messageProp[];
  selectedMessage: messageProp | undefined;
  onSelectMessage: (message: messageProp) => void;
  onDelete: (messageId: string) => void;
  onArchive: (messageId: string) => void;
  title?:string
}

export default function ChatMessagesSidebar({
  messages,
  selectedMessage,
  onSelectMessage,
  onDelete,
  onArchive,
  title="Messages"
}: ChatMessagesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuToggle = (messageId: string) => {
    setOpenMenuId(openMenuId === messageId ? null : messageId);
  };


  return (
    <div className="bg-white shadow-sm p-2 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <span className="bg-orange-100 font-archivo text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
              {messages?.length ?? 0}
            </span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={()=>setShowNewMessageModal(true)}>
            <Edit3 className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 max-h-[66vh] md:max-h-[65vh] overflow-y-auto mt-4">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start py-4 px-3 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedMessage?.id === message?.id
                ? 'bg-orange-50 border-orange-500 border-l-2'
                : 'border-b'
            }`}
            onClick={() => onSelectMessage(message)}
          >
            {/* Status indicator dots */}
            <div className="flex flex-col items-center justify-center mt-6 mr-3 flex-shrink-0 space-y-1">
              {/* Unread message indicator - orange dot */}
              {message.hasUnreadMessages && (
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </div>

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={message.avatar}
                alt={message.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div
                className={`absolute bottom-0 -right-1 w-3 h-3 ${
                  message?.isOnline ? 'bg-green-500' : 'bg-gray-500'
                } border-2 border-white rounded-full`}
              ></div>
            </div>

            {/* Message content */}
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{message.name}</p>
                  <p className="text-xs text-gray-500">{message.username}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{message.time}</span>
                  {/* Three-dot menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuToggle(String((message.id)));
                      }}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>

                    {/* Dropdown menu */}
                    {openMenuId === String((message.id)) && (
                      <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onArchive(String((message.id)));
                              setOpenMenuId(null);
                            }}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Archive className="h-4 w-4 mr-2 text-yellow-600" />
                            Archive
                          </button>
                          <button
                            onClick={() => {
                              onDelete(String((message.id)));
                              setOpenMenuId(null);
                            }}
                            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
              <p className="text-sm text-gray-600 mt-1 truncate">{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      {
        showNewMessageModal && <StartNewMessageModal isOpen={showNewMessageModal} onClose={()=>setShowNewMessageModal(false)} onSelectMessage={onSelectMessage}/>
      }
    </div>
  );
}
