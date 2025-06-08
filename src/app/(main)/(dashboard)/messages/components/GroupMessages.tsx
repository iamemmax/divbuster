import React, { useState } from 'react'
import { ArrowLeft, Send, MoreVertical, Users, Clock, Search, Edit3, Trash2, Archive } from 'lucide-react'
import GroupSidebar from './Group/GroupSidebar';
import GroupMessageBox from './Group/GroupMessageBox';
type User = {
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
  lastUpdated: string; // ISO string
  groupAvatar: string; // <-- new property: array of avatar URLs for group avatar
};

// Your user info (example)
const me: User = {
  id: 99,
  name: "You",
  username: "@you",
  avatar:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop&crop=face",
  isOnline: true,
};

// Helper function to generate group avatar array from participants
function getGroupAvatars(participants: User[], max = 3): string[] {
  return participants.slice(0, max).map((user) => user.avatar);
}

const groupChats: GroupChat[] = [
  {
    id: 1,
    groupName: "Project Alpha Team",
    participants: [
      {
        id: 1,
        name: "Phoenix Baker",
        username: "@phoenix",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 3,
        name: "Mollie Hall",
        username: "@mollie",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 7,
        name: "Eva Bond",
        username: "@eva",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      me,
    ],
    messages: [
      {
        senderId: 1,
        message: "Hey team, did you review the specs?",
        timestamp: "2025-06-07T08:00:00Z",
      },
      {
        senderId: 3,
        message: "Yes, looks good! Just a couple of changes.",
        timestamp: "2025-06-07T08:05:00Z",
      },
      {
        senderId: 7,
        message: "I'll handle the UI updates this week.",
        timestamp: "2025-06-07T08:07:00Z",
      },
      {
        senderId: 1,
        message: "Great, thanks Eva!",
        timestamp: "2025-06-07T08:10:00Z",
      },
    ],
    hasUnreadMessages: true,
    lastUpdated: "2025-06-07T08:10:00Z",
    groupAvatar:
     
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
 
    
     
  },
  {
    id: 2,
    groupName: "Marketing Squad",
    participants: [
      {
        id: 4,
        name: "Rosalee Melvin",
        username: "@rosalee",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      {
        id: 5,
        name: "Anaiah Whitten",
        username: "@anaiah",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      me,
    ],
    messages: [
      {
        senderId: 4,
        message: "Campaign launch is next Monday.",
        timestamp: "2025-06-07T09:00:00Z",
      },
      {
        senderId: 5,
        message: "Perfect, I'll prepare the materials.",
        timestamp: "2025-06-07T09:05:00Z",
      },
      {
        senderId: 4,
        message: "Thanks! Let me know if you need help.",
        timestamp: "2025-06-07T09:07:00Z",
      },
    ],
    hasUnreadMessages: false,
    lastUpdated: "2025-06-07T09:07:00Z",
    groupAvatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 3,
    groupName: "Weekend Hikers",
    participants: [
      {
        id: 8,
        name: "Liam Grey",
        username: "@liam",
        avatar:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 9,
        name: "Sophia Lee",
        username: "@sophia",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      me,
    ],
    messages: [
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
    ],
    hasUnreadMessages: true,
    lastUpdated: "2025-06-06T16:25:00Z",
    groupAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 4,
    groupName: "Book Club",
    participants: [
      {
        id: 10,
        name: "Ethan Parker",
        username: "@ethan",
        avatar:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      {
        id: 11,
        name: "Grace Kim",
        username: "@grace",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      me,
    ],
    messages: [
      {
        senderId: 10,
        message: "Has everyone finished the book?",
        timestamp: "2025-06-05T19:00:00Z",
      },
      {
        senderId: 11,
        message: "Yes! Ready for the discussion tomorrow.",
        timestamp: "2025-06-05T19:10:00Z",
      },
    ],
    hasUnreadMessages: false,
    lastUpdated: "2025-06-05T19:10:00Z",
    groupAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 5,
    groupName: "Emmatech Team",
    participants: [
      {
        id: 1,
        name: "Phoenix Baker",
        username: "@phoenix",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 3,
        name: "Mollie Hall",
        username: "@mollie",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 7,
        name: "Eva Bond",
        username: "@eva",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      me,
    ],
    messages: [
      {
        senderId: 1,
        message: "Hey team, did you review the specs?",
        timestamp: "2025-06-07T08:00:00Z",
      },
      {
        senderId: 3,
        message: "Yes, looks good! Just a couple of changes.",
        timestamp: "2025-06-07T08:05:00Z",
      },
      {
        senderId: 7,
        message: "I'll handle the UI updates this week.",
        timestamp: "2025-06-07T08:07:00Z",
      },
      {
        senderId: 1,
        message: "Great, thanks Eva!",
        timestamp: "2025-06-07T08:10:00Z",
      },
    ],
    hasUnreadMessages: true,
    lastUpdated: "2025-06-07T08:10:00Z",
    groupAvatar:
     
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
 
    
     
  },
  {
    id: 6,
    groupName: "Liberty",
    participants: [
      {
        id: 4,
        name: "Rosalee Melvin",
        username: "@rosalee",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      {
        id: 5,
        name: "Anaiah Whitten",
        username: "@anaiah",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      me,
    ],
    messages: [
      {
        senderId: 4,
        message: "Campaign launch is next Monday.",
        timestamp: "2025-06-07T09:00:00Z",
      },
      {
        senderId: 5,
        message: "Perfect, I'll prepare the materials.",
        timestamp: "2025-06-07T09:05:00Z",
      },
      {
        senderId: 4,
        message: "Thanks! Let me know if you need help.",
        timestamp: "2025-06-07T09:07:00Z",
      },
    ],
    hasUnreadMessages: false,
    lastUpdated: "2025-06-07T09:07:00Z",
    groupAvatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 7,
    groupName: "Weekend Haland",
    participants: [
      {
        id: 8,
        name: "Liam Grey",
        username: "@liam",
        avatar:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 9,
        name: "Sophia Lee",
        username: "@sophia",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      me,
    ],
    messages: [
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
    ],
    hasUnreadMessages: true,
    lastUpdated: "2025-06-06T16:25:00Z",
    groupAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 8,
    groupName: "London Book Club",
    participants: [
      {
        id: 10,
        name: "Ethan Parker",
        username: "@ethan",
        avatar:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      {
        id: 11,
        name: "Grace Kim",
        username: "@grace",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      me,
    ],
    messages: [
      {
        senderId: 10,
        message: "Has everyone finished the book?",
        timestamp: "2025-06-05T19:00:00Z",
      },
      {
        senderId: 11,
        message: "Yes! Ready for the discussion tomorrow.",
        timestamp: "2025-06-05T19:10:00Z",
      },
    ],
    hasUnreadMessages: false,
    lastUpdated: "2025-06-05T19:10:00Z",
    groupAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 1,
    groupName: "Project Alpha Team",
    participants: [
      {
        id: 1,
        name: "Phoenix Baker",
        username: "@phoenix",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 3,
        name: "Mollie Hall",
        username: "@mollie",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 7,
        name: "Eva Bond",
        username: "@eva",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      me,
    ],
    messages: [
      {
        senderId: 1,
        message: "Hey team, did you review the specs?",
        timestamp: "2025-06-07T08:00:00Z",
      },
      {
        senderId: 3,
        message: "Yes, looks good! Just a couple of changes.",
        timestamp: "2025-06-07T08:05:00Z",
      },
      {
        senderId: 7,
        message: "I'll handle the UI updates this week.",
        timestamp: "2025-06-07T08:07:00Z",
      },
      {
        senderId: 1,
        message: "Great, thanks Eva!",
        timestamp: "2025-06-07T08:10:00Z",
      },
    ],
    hasUnreadMessages: true,
    lastUpdated: "2025-06-07T08:10:00Z",
    groupAvatar:
     
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
 
    
     
  },
  {
    id: 2,
    groupName: "Marketing Squad",
    participants: [
      {
        id: 4,
        name: "Rosalee Melvin",
        username: "@rosalee",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      {
        id: 5,
        name: "Anaiah Whitten",
        username: "@anaiah",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      me,
    ],
    messages: [
      {
        senderId: 4,
        message: "Campaign launch is next Monday.",
        timestamp: "2025-06-07T09:00:00Z",
      },
      {
        senderId: 5,
        message: "Perfect, I'll prepare the materials.",
        timestamp: "2025-06-07T09:05:00Z",
      },
      {
        senderId: 4,
        message: "Thanks! Let me know if you need help.",
        timestamp: "2025-06-07T09:07:00Z",
      },
    ],
    hasUnreadMessages: false,
    lastUpdated: "2025-06-07T09:07:00Z",
    groupAvatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 3,
    groupName: "Weekend Hikers",
    participants: [
      {
        id: 8,
        name: "Liam Grey",
        username: "@liam",
        avatar:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: 9,
        name: "Sophia Lee",
        username: "@sophia",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      me,
    ],
    messages: [
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
      {
        senderId: 8,
        message: "Ready for the hike this Saturday?",
        timestamp: "2025-06-06T16:00:00Z",
      },
      {
        senderId: 9,
        message: "I'm bringing snacks!",
        timestamp: "2025-06-06T16:15:00Z",
      },
      {
        senderId: 99,
        message: "Count me in! What time are we meeting?",
        timestamp: "2025-06-06T16:20:00Z",
      },
      {
        senderId: 8,
        message: "Let's meet at 8am at the trailhead.",
        timestamp: "2025-06-06T16:25:00Z",
      },
    ],
    hasUnreadMessages: true,
    lastUpdated: "2025-06-06T16:25:00Z",
    groupAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 4,
    groupName: "Book Club",
    participants: [
      {
        id: 10,
        name: "Ethan Parker",
        username: "@ethan",
        avatar:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
      },
      {
        id: 11,
        name: "Grace Kim",
        username: "@grace",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      me,
    ],
    messages: [
      {
        senderId: 10,
        message: "Has everyone finished the book?",
        timestamp: "2025-06-05T19:00:00Z",
      },
      {
        senderId: 11,
        message: "Yes! Ready for the discussion tomorrow.",
        timestamp: "2025-06-05T19:10:00Z",
      },
    ],
    hasUnreadMessages: false,
    lastUpdated: "2025-06-05T19:10:00Z",
    groupAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop&crop=face",
  },
];





// Main Component
const GroupMessages = () => {
  const [groupList, setGroupList] = useState<GroupChat[]>(groupChats);
  const [selectedGroup, setSelectedGroup] = useState<GroupChat | null>(null);

  const handleBackToRecent = () => {
    setSelectedGroup(null);
  };

  const handleSendMessage = (messageText: string) => {
    if (!selectedGroup) return;

    const newMessage: Message = {
      senderId: me.id,
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