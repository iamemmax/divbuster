"use client"
import React, { useState } from 'react'
import { NotificationItem } from './NotificationItem';

export const buddyRequests = [
  {
    id: "1",
    name: "Demi Wikinson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    time: "2 mins ago",
    action: "Want to be your Dive buddy",
    isOnline: true,
    isRead: false
  },
  {
    id: "2",
    name: "Drew Cano",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    time: "3 hours ago",
    action: "Want to be your Dive buddy",
    isOnline: true,
    isRead: false
  },
  {
    id: "3",
    name: "Zahir Mays",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    time: "4 hours ago",
    action: "Want to be your Dive buddy",
    isOnline: true,
    isRead: false
  },
  {
    id: "4",
    name: "Rene Wells",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    time: "4 hours ago",
    action: "Wants to dive with you!",
    isOnline: true,
    isRead: false
  },
  {
    id: "5",
    name: "Loki Bright",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    time: "5 hours ago",
    action: "Want to be your Dive buddy",
    isOnline: true,
    isRead: false
  },
  {
    id: "6",
    name: "Anita Cruz",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    time: "6 hours ago",
    action: "Want to be your Dive buddy",
    isOnline: true,
    isRead: false
  }
];
// Main BuddyRequest Component
const BuddyRequest: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<{[key: string]: {accept: boolean, decline: boolean}}>({});

  // Mock JSON data based on the image

  
  // Split notifications into two columns
  const leftColumnNotifications = buddyRequests?.filter((_, index) => index % 2 === 0);
  const rightColumnNotifications = buddyRequests?.filter((_, index) => index % 2 === 1);

  const handleAccept = async (id: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [id]: { ...prev[id], accept: true }
    }));

    // Simulate API call
    setTimeout(() => {
      console.log(`Accepted buddy request from ${id}`);
      setLoadingStates(prev => ({
        ...prev,
        [id]: { ...prev[id], accept: false }
      }));
      // You can add logic here to remove the request or update its status
    }, 1500);
  };

  const handleDecline = async (id: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [id]: { ...prev[id], decline: true }
    }));

    // Simulate API call
    setTimeout(() => {
      console.log(`Declined buddy request from ${id}`);
      setLoadingStates(prev => ({
        ...prev,
        [id]: { ...prev[id], decline: false }
      }));
      // You can add logic here to remove the request or update its status
    }, 1500);
  };

  const handleMarkAsRead = (id: string) => {
    console.log(`Marked notification ${id} as read`);
    // Update read status logic here
  };

  return (
    <div className="w-full">
      {/* Header */}
      



      {/* Buddy Requests List */}
 <div className="bg-white dark:bg-transparent rounded-lg py-3">
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-8">
    {/* Left column with border-right on desktop */}
    <div className="md:border-r md:border-gray-200 dark:md:border-gray-700 md:pr-8">
      {leftColumnNotifications?.map((request, index: number) => (
        <NotificationItem
          key={request.id}
          id={request.id}
          avatar={request.avatar}
          name={request.name}
          time={request.time}
          action={request.action}
          isOnline={request.isOnline}
          isLast={index === Number(leftColumnNotifications?.length) - 1}
          showAcceptBtn={true}
          showDeclineBtn={true}
          onAccept={() => handleAccept(request?.id)}
          onDecline={() => handleDecline(request?.id)}
          acceptLoading={loadingStates[request.id]?.accept || false}
          declineLoading={loadingStates[request.id]?.decline || false}
        />
      ))}
    </div>

    {/* Right column */}
    <div className="3xl:pl-16 sm:pl-6">
      {rightColumnNotifications?.map((request, index) => (
        <NotificationItem
          key={request.id}
          id={request.id}
          avatar={request.avatar}
          name={request.name}
          time={request.time}
          action={request.action}
          isOnline={request.isOnline}
          isLast={index === rightColumnNotifications.length - 1}
          showAcceptBtn={true}
          showDeclineBtn={true}
          showModifyBtn={false}
          onAccept={() => handleAccept(request?.id)}
          onDecline={() => handleDecline(request?.id)}
          acceptLoading={loadingStates[request.id]?.accept || false}
          declineLoading={loadingStates[request.id]?.decline || false}
        />
      ))}
    </div>
  </div>
</div>






      {/* Empty State (when no requests) */}
      {buddyRequests.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Buddy Requests
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            You don't have any pending buddy requests at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default BuddyRequest;