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
  title?: string;
}

export default function ChatMessagesSidebar({
  messages,
  selectedMessage,
  onSelectMessage,
  onDelete,
  onArchive,
  title = "Messages"
}: ChatMessagesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuToggle = (messageId: string) => {
    setOpenMenuId(openMenuId === messageId ? null : messageId);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm p-2 flex flex-col transition-colors duration-200">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <span className="bg-orange-100 dark:bg-orange-900/30 font-archivo text-orange-600 dark:text-orange-400 text-xs font-medium px-2 py-1 rounded-full">
              {messages?.length ?? 0}
            </span>
          </div>
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200" 
            onClick={() => setShowNewMessageModal(true)}
          >
            <Edit3 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 max-h-[66vh] md:max-h-[65vh] overflow-y-auto mt-4">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start py-4 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 ${
              selectedMessage?.id === message?.id
                ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 dark:border-orange-400 border-l-2'
                : 'border-b border-gray-100 dark:border-gray-800'
            }`}
            onClick={() => onSelectMessage(message)}
          >
            {/* Status indicator dots */}
            <div className="flex flex-col items-center justify-center mt-6 mr-3 flex-shrink-0 space-y-1">
              {/* Unread message indicator - orange dot */}
              {message.hasUnreadMessages && (
                <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full"></div>
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
                  message?.isOnline ? 'bg-green-500 dark:bg-green-400' : 'bg-gray-500 dark:bg-gray-600'
                } border-2 border-white dark:border-gray-900 rounded-full`}
              ></div>
            </div>

            {/* Message content */}
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{message.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{message.username}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{message.time}</span>
                  {/* Three-dot menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuToggle(String(message.id));
                      }}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>

                    {/* Dropdown menu */}
                    {openMenuId === String(message.id) && (
                      <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onArchive(String(message.id));
                              setOpenMenuId(null);
                            }}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                          >
                            <Archive className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-500" />
                            Archive
                          </button>
                          <button
                            onClick={() => {
                              onDelete(String(message.id));
                              setOpenMenuId(null);
                            }}
                            className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
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
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      {showNewMessageModal && (
        <StartNewMessageModal 
          isOpen={showNewMessageModal} 
          onClose={() => setShowNewMessageModal(false)} 
          onSelectMessage={onSelectMessage}
        />
      )}
    </div>
  );
}