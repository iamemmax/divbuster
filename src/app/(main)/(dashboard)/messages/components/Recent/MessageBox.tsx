'use client'
import React, { useState, useEffect, useRef } from 'react'
import { messageProp } from '../RecentMessages'
import EmptyMessage from '../EmptyMessage'
import { Archive, Paperclip, Smile, ArrowLeft, Image, Video, FileTextIcon } from 'lucide-react'
import ThreeDot from '@/app/icons/(dashboard)/ThreeDot'
import { formatDateLabel } from '@/utils/formatDateLabel'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'

interface MessageBoxProps {
  selectedMessage: messageProp | undefined
  onBackToRecent?: () => void
}

const MessageBox = ({ selectedMessage, onBackToRecent }: MessageBoxProps) => {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (!message.trim()) return
    setMessage('')
    setShowEmojiPicker(false)

    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }

  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev)

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji)
    textareaRef.current?.focus()
  }

  const openImageDialog = () => {
    imageInputRef.current?.click()
    setShowAttachmentMenu(false)
  }

  const openVideoDialog = () => {
    videoInputRef.current?.click()
    setShowAttachmentMenu(false)
  }

  const openDocumentDialog = () => {
    documentInputRef.current?.click()
    setShowAttachmentMenu(false)
  }

  const toggleAttachmentMenu = () => setShowAttachmentMenu((prev) => !prev)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      alert(`Selected file: ${file.name} (${file.size} bytes)`)
      e.target.value = ''
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showEmojiPicker && !target.closest('.emoji-picker-container')) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmojiPicker])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedMessage?.chats])

  if (!selectedMessage) return <EmptyMessage />

  return (
    <div className="flex flex-col max-sm:max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-200px)] h-full border rounded-lg bg-[#F9FAFB] dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          {onBackToRecent && (
            <button
              onClick={onBackToRecent}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors mr-2"
              aria-label="Back to recent messages"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          <div className="relative">
            <img
              src={selectedMessage?.avatar}
              alt={selectedMessage?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">{selectedMessage?.name}</h2>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedMessage?.isOnline
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {selectedMessage?.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedMessage?.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="hidden sm:flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Archive className="h-4 w-4" />
            <span>Archive</span>
          </button>
          <button className="px-3 sm:px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600">
            <span className="hidden sm:inline">View Profile</span>
            <span className="sm:hidden">Profile</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900">
        {selectedMessage?.chats?.length === 0 ? (
          <EmptyMessage />
        ) : (
          <>
            {selectedMessage?.chats?.map((msg, index) => {
              const isCurrentUser = msg.sender !== selectedMessage?.name
              const currentMessageDate = new Date(msg.timestamp).toDateString()
              const prevMessageDate =
                index > 0 ? new Date(selectedMessage.chats[index - 1].timestamp).toDateString() : null

              const showDateLabel = index === 0 || currentMessageDate !== prevMessageDate

              return (
                <React.Fragment key={index}>
                  {showDateLabel && (
                    <div className="flex justify-center my-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        {formatDateLabel(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'items-start space-x-3'}`}>
                    {!isCurrentUser && (
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                        alt="Sender"
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div className={`flex-1 ${isCurrentUser ? 'flex flex-col items-end' : ''}`}>
                      <div className={`flex items-center space-x-6 mb-1 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {isCurrentUser ? '' : msg.sender}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(msg.timestamp)}</span>
                      </div>
                      <div
                        className={`relative rounded-2xl px-4 py-2 inline-block max-w-[90%] md:max-w-[70%] break-words group ${
                          isCurrentUser
                            ? 'bg-orange-500 text-white rounded-tr-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-md'
                        }`}
                      >
                        <p className="text-sm font-semibold font-archivo">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white dark:bg-gray-800 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-end space-x-2">
          <div className="flex-1 flex items-center relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Send a message"
              className="w-full px-4 py-3 pr-20 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              style={{ minHeight: '44px', maxHeight: '120px' }}
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-2">
              <button
                type="button"
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={toggleEmojiPicker}
              >
                <Smile className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>

              {/* Attachment menu */}
              <div className="relative attachment-menu-container">
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  onClick={toggleAttachmentMenu}
                >
                  <ThreeDot className="text-gray-600 dark:text-gray-300" />
                </button>

                {showAttachmentMenu && (
                  <div className="absolute bottom-10 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-30 min-w-[180px]">
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3"
                      onClick={openImageDialog}
                    >
                      <Image className="h-4 w-4 text-green-500" />
                      <span>Image</span>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3"
                      onClick={openVideoDialog}
                    >
                      <Video className="h-4 w-4 text-red-500" />
                      <span>Video</span>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3"
                      onClick={openDocumentDialog}
                    >
                      <FileTextIcon className="h-4 w-4 text-blue-500" />
                      <span>Document</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-2 z-20 emoji-picker-container">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width={280}
                  height={350}
                  
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
              message.trim()
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
