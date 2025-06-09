import { GroupChat, User } from "../GroupMessages";
import { messageProp } from "../RecentMessages";

export const messagesArray: messageProp[] = [
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



// Your user info (example)
export const me: User = {
  id: 99,
  name: "You",
  username: "@you",
  avatar:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop&crop=face",
  isOnline: true,
};
export const groupChats: GroupChat[] = [
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
