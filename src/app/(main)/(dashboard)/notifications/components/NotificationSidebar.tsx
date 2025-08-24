import React from 'react'
import { NotificationItem } from './NotificationItem';

const NotificationSidebar = () => {
      const recentActivities = [
    {
      id: 1,
      name: "Demi Wilkinson",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face",
      action: "Created a new dive log tagging you",
      isOnline: true
    },
    {
      id: 2,
      name: "Aliah Lane",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
      action: "Created a new dive log tagging you",
      isOnline: false
    },
    {
      id: 3,
      name: "Lana Steiner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      action: "Created a new dive log tagging you",
      isOnline: false
    },
    {
      id: 4,
      name: "Candice Wu",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      action: "Created a new dive log tagging you",
      isOnline: false
    },
    {
      id: 5,
      name: "Ava Wright",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face",
      action: "Created a new dive log tagging you",
      isOnline: false
    }
  ];
  return (
    <div className='space-y-1'>
        {recentActivities.map((notification, index) => (
                  <NotificationItem
                    id={String(notification?.id)}
                    key={notification.id}
                    avatar={notification.avatar}
                    name={notification.name}
                    // time={notification.time}
                    action={notification.action}
                    isOnline={notification.isOnline}
                    isLast={index === recentActivities?.length - 1}
                    
                  />
                ))}
         
    </div>
  )
}

export default NotificationSidebar