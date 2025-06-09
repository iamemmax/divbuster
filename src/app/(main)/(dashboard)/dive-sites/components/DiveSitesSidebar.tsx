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
const DiveSitesSidebar = () => {
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
       
      
       
      
       const renderStars = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      const totalStars = 5;
    
      for (let i = 0; i < fullStars; i++) {
        stars.push(
          <svg key={`star-full-${i}`} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.21 3.71a1 1 0 00.95.69h3.9c.969 0 1.371 1.24.588 1.81l-3.15 2.29a1 1 0 00-.364 1.118l1.21 3.71c.3.921-.755 1.688-1.54 1.118l-3.15-2.29a1 1 0 00-1.176 0l-3.15 2.29c-.785.57-1.84-.197-1.54-1.118l1.21-3.71a1 1 0 00-.364-1.118L2.302 9.137c-.783-.57-.38-1.81.588-1.81h3.9a1 1 0 00.95-.69l1.21-3.71z" />
          </svg>
        );
      }
    
      if (hasHalfStar) {
        stars.push(
          <svg key="star-half" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2v15.27z" />
            <path fill="#E5E7EB" d="M12 2v15.27L5.82 21l1.63-7.03L2 9.24l7.19-.61L12 2z" />
          </svg>
        );
      }
    
      const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          <svg key={`star-empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.21 3.71a1 1 0 00.95.69h3.9c.969 0 1.371 1.24.588 1.81l-3.15 2.29a1 1 0 00-.364 1.118l1.21 3.71c.3.921-.755 1.688-1.54 1.118l-3.15-2.29a1 1 0 00-1.176 0l-3.15 2.29c-.785.57-1.84-.197-1.54-1.118l1.21-3.71a1 1 0 00-.364-1.118L2.302 9.137c-.783-.57-.38-1.81.588-1.81h3.9a1 1 0 00.95-.69l1.21-3.71z" />
          </svg>
        );
      }
    
      return stars;
    };
  return (
    <div>
         <div className="w-full  bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Dive Sites around you</h2>
                    
                    <div className="relative">
                      {suggestedBuddies.map((buddy, index) => (
                        <div key={buddy.id} className="relative flex items-center justify-between py-3">
                          {/* Connecting line */}
                          {index < suggestedBuddies.length - 1 && (
                            <div className="absolute left-5 top-12 w-px h-6 bg-gray-200"></div>
                          )}
                          
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative z-10 flex-shrink-0">
                              <img
                                src={buddy.avatar}
                                alt={buddy.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              {buddy.isOnline && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{buddy.name}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <div className="flex">
                                  {renderStars(buddy.rating)}
                                </div>
                                <span className="text-xs text-gray-500 ml-1 flex-shrink-0">{buddy.reviewCount} Reviews</span>
                              </div>
                            </div>
                          </div>
                          <button className="flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-colors p-1 flex-shrink-0">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7417 6.1 19.225C4.88333 18.6917 3.825 17.975 2.925 17.075C2.025 16.175 1.30833 15.1167 0.775 13.9C0.258333 12.6833 0 11.3833 0 10C0 8.61667 0.258333 7.31667 0.775 6.1C1.30833 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31667 6.1 0.799999C7.31667 0.266666 8.61667 0 10 0C11.3833 0 12.6833 0.266666 13.9 0.799999C15.1167 1.31667 16.175 2.025 17.075 2.925C17.975 3.825 18.6833 4.88333 19.2 6.1C19.7333 7.31667 20 8.61667 20 10C20 11.3833 19.7333 12.6833 19.2 13.9C18.6833 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6917 13.9 19.225C12.6833 19.7417 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#A9B0C2"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Button variant={"outlined"} className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
                        View more
                      </Button>
                    </div>
                  </div>
    </div>
  )
}

export default DiveSitesSidebar