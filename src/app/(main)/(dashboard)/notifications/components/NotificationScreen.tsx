import React from 'react';
import { NotificationItem } from './NotificationItem';

interface Notification {
  id: number;
  name: string;
  avatar: string;
  action: string;
  time: string;
  isOnline: boolean;
}

const NotificationList = () => {
  // Single array of all notifications
  const notifications: Notification[] = [
    {
      id: 1,
      name: "Demi Wilkinson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      action: "Uploaded a new picture.",
      time: "2 mins ago",
      isOnline: true
    },
    {
      id: 2,
      name: "Drew Cano",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face",
      action: "Just got a new certification",
      time: "3 hours ago",
      isOnline: true
    },
    {
      id: 3,
      name: "Aliah Lane",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      action: "You added Aliah to your buddy list",
      time: "10 mins ago",
      isOnline: true
    },
    {
      id: 4,
      name: "Zahir Mays",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      action: "Wants to dive with you!",
      time: "4 hours ago",
      isOnline: true
    },
    {
      id: 5,
      name: "Lana Steiner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      action: "Request a dive validation for Dive12 - Curacao",
      time: "24 mins ago",
      isOnline: true
    },
    {
      id: 6,
      name: "Rene Wells",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face",
      action: "You added Aliah to your buddy list",
      time: "4 hours ago",
      isOnline: true
    },
    {
      id: 7,
      name: "Candice Wu",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      action: "You added Lana 2 hours ago",
      time: "56 mins ago",
      isOnline: false
    },
    {
      id: 8,
      name: "Joshua Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      action: "You added Aliah to your buddy list",
      time: "4 hours ago",
      isOnline: true
    },
    {
      id: 9,
      name: "Ava Wright",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      action: "Just got a new certification",
      time: "1 hour ago",
      isOnline: true
    },
    {
      id: 10,
      name: "Lori Bryson",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face",
      action: "Request a dive validation for Dive12 - Curacao",
      time: "4 hours ago",
      isOnline: true
    },
    {
      id: 11,
      name: "Koray Okumus",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      action: "Want to be your buddy",
      time: "2 hours ago",
      isOnline: true
    },
    {
      id: 12,
      name: "Loki Bright",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      action: "Want to be your buddy",
      time: "5 hours ago",
      isOnline: false
    },
    {
      id: 13,
      name: "Andi Lane",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      action: "Wants to dive with you!",
      time: "3 hours ago",
      isOnline: true
    },
    {
      id: 14,
      name: "Anita Cruz",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      action: "Wants to dive with you!",
      time: "6 hours ago",
      isOnline: false
    }
  ];

  // Split notifications into two columns
  const leftColumnNotifications = notifications.filter((_, index) => index % 2 === 0);
  const rightColumnNotifications = notifications.filter((_, index) => index % 2 === 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8  py-3  bg-white dark:bg-transparent  ">
      {/* Left Column */}
      <div className="space-y-1">
        {leftColumnNotifications.map((notification, index) => (
          <NotificationItem
            id={String(notification?.id)}
            key={notification.id}
            avatar={notification.avatar}
            name={notification.name}
            time={notification.time}
            action={notification.action}
            isOnline={notification.isOnline}
            isLast={index === leftColumnNotifications.length - 1}
          />
        ))}
      </div>

      {/* Right Column */}
      <div className="space-y-1">
        {rightColumnNotifications.map((notification, index) => (
          <NotificationItem
            id={String(notification?.id)}
            key={notification.id}
            avatar={notification.avatar}
            name={notification.name}
            time={notification.time}
            action={notification.action}
            isOnline={notification.isOnline}
            isLast={index === rightColumnNotifications?.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;