import AddIcon from '@/app/icons/(dashboard)/AddIcon';
import { Button } from '@/components/core';
import React, { useState } from 'react'
  interface DiveBuddy {
    id: number;
    name: string;
    email: string;
    avatar: string;
    certificates: string[];
    buddyCount: number;
    buddyAvatars: string[];
    rating: number;
    reviewCount: number;
    isOnline?: boolean;
  }
const BookingSideBar = () => {
      const suggestedBuddies: DiveBuddy[] = [
        
        {
          id: 36,
          name: "Lana Steiner",
          email: "lana@divebusters.com",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          certificates: [],
          buddyCount: 0,
          buddyAvatars: [],
          rating: 4.8,
          reviewCount: 22,
          isOnline: true
        },
        {
          id: 27,
          name: "Demi Wilkinson",
          email: "demi@divebusters.com",
          avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
          certificates: [],
          buddyCount: 0,
          buddyAvatars: [],
          rating: 3.2,
          reviewCount: 22
        },
        
        {
          id: 6,
          name: "Lana Steiner",
          email: "lana@divebusters.com",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          certificates: [],
          buddyCount: 0,
          buddyAvatars: [],
          rating: 4.8,
          reviewCount: 22,
          isOnline: true
        },
        {
          id: 7,
          name: "Demi Wilkinson",
          email: "demi@divebusters.com",
          avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
          certificates: [],
          buddyCount: 0,
          buddyAvatars: [],
          rating: 3.2,
          reviewCount: 22
        },
        
        {
          id: 8,
          name: "Lana Steiner",
          email: "lana@divebusters.com",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          certificates: [],
          buddyCount: 0,
          buddyAvatars: [],
          rating: 4.8,
          reviewCount: 22,
          isOnline: true
        },
        {
          id: 17,
          name: "Demi Wilkinson",
          email: "demi@divebusters.com",
          avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
          certificates: [],
          buddyCount: 0,
          buddyAvatars: [],
          rating: 3.2,
          reviewCount: 22
        },
      ];
       
      
       
      
       
  return (
    <div>
  <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Dive Buddy around you.</h2>
    
    <div className="relative">
      {suggestedBuddies.map((buddy, index) => (
        <div key={buddy.id} className="relative flex items-center justify-between py-3">
          {/* Connecting line */}
          {index < suggestedBuddies.length - 1 && (
            <div className="absolute left-5 top-12 w-px h-6 bg-gray-200 dark:bg-gray-600"></div>
          )}
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative z-10 flex-shrink-0">
              <img
                src={buddy.avatar}
                alt={buddy.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {buddy.isOnline && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{buddy.name}</div>
            </div>
          </div>
          <button className="flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors p-1 flex-shrink-0">
            <AddIcon/>
          </button>
        </div>
      ))}
    </div>
    
    <div className="mt-6">
      <Button 
        variant={"outlined"} 
        className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        View more
      </Button>
    </div>
  </div>
</div>
  )
}

export default BookingSideBar