"use client"
import React, { useState } from 'react'
import Header from '../../components/shared/Header'
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import PlusIcon from '@/app/icons/(dashboard)/PlusIcon';
import UserGroupIcon from '@/app/icons/(dashboard)/UserGroupIcon';
import AngleLeft from '@/app/icons/(dashboard)/AngleLeft';
import { Button,LinkButton } from '@/components/core';
import Link from 'next/link';

const DiverBuddies = () => {
  
  
  // Types
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
  
  // Mock data
  const diveBuddies: DiveBuddy[] = [
    {
      id: 1,
      name: "Bart Bright",
      email: "bart@divebusters.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      certificates: ["AOWD", "BSAC"],
      buddyCount: 5,
      buddyAvatars: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=30&h=30&fit=crop&crop=face",
      ],
      rating: 4.5,
      reviewCount: 22
    },
    {
      id: 2,
      name: "Phoenix Baker",
      email: "phoenix@divebusters.com",
         avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=50&h=50&fit=crop&crop=face",
      certificates: ["AOWD", "NADD"],
      buddyCount: 8,
      buddyAvatars: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=30&h=30&fit=crop&crop=face"
      ],
      rating: 5,
      reviewCount: 22,
      isOnline: true
    },
    {
      id: 3,
      name: "Lana Steiner",
      email: "lana@divebusters.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      certificates: ["AOWD", "BSAC"],
      buddyCount: 2,
      buddyAvatars: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=30&h=30&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=30&h=30&fit=crop&crop=face"
      ],
      rating: 4.8,
      reviewCount: 22,
      isOnline: true
    },
    {
      id: 4,
      name: "Demi Wilkinson",
      email: "demi@divebusters.com",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=50&h=50&fit=crop&crop=face",
      certificates: ["NADD", "AOWD", "BSAC"],
      buddyCount: 0,
      buddyAvatars: [],
      rating: 4.2,
      reviewCount: 22
    }
  ];
  
  const suggestedBuddies: DiveBuddy[] = [
    {
      id: 5,
      name: "Phoenix Baker",
      email: "phoenix@divebusters.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      certificates: [],
      buddyCount: 0,
      buddyAvatars: [],
      rating: 5,
      reviewCount: 22,
      isOnline: true
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
    }
  ];
      const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 6;
  
    const getCertificateColor = (cert: string) => {
      switch (cert) {
        case "AOWD": return "bg-blue-100 font-archivo text-xs text-blue-700";
        case "BSAC": return "bg-green-100 font-archivo text-xs text-green-700";
        case "NADD": return "bg-purple-100 font-archivo text-xs text-purple-700";
        default: return "bg-gray-100 font-archivo text-xs text-gray-700";
      }
    };
  
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
  <Header 
    title='My Dive Buddies' 
    subtitle='' 
  />
  
  <div className="w-full bg-white dark:bg-gray-900 min-h-screen px-4 sm:px-6 lg:px-[1.875rem] transition-colors duration-200">
    {/* Header */}
    <div className="bg-white dark:bg-gray-900 py-4 border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:flex-1 sm:max-w-md">
          <DebouncedSearchInput 
            placeholder="search for buddy name" 
            onSearch={(value) => setSearchTerm(value)}
            debounceTime={300}
            value={searchTerm}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200 font-medium text-sm">
            Favorite Buddy
          </button>
          <LinkButton href="/notifications?tab=notifications" className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-medium text-sm">
            Buddy Requests
          </LinkButton>
        </div>
      </div>
    </div>

    <div className="flex flex-col xl:flex-row gap-6 xl:gap-10">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 border border-[#EAECF0] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-colors duration-200">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Dive Buddies</h1>
            <div className="bg-[#FEF6F4] dark:bg-orange-900/30 rounded-[1rem] flex justify-center items-center px-2 py-[.1875rem] transition-colors duration-200">
              <span className="text-[#F7931D] dark:text-orange-400 text-xs font-archivo font-medium">48 users</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border text-[#344054] dark:text-gray-300 font-archivo font-medium text-xs sm:text-sm border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex-1 sm:flex-none justify-center">
              <UserGroupIcon />
              <span className="hidden sm:inline">Create Group</span>
              <span className="sm:hidden">Group</span>
            </button>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#F7931D] dark:bg-orange-600 text-white font-archivo font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200 flex-1 sm:flex-none justify-center">
              <PlusIcon />
              <span className="hidden sm:inline">Add new Buddy</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden xl:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
            <div>Name</div>
            <div>Dive Buddies</div>
            <div>Certificate</div>
            <div></div>
          </div>

          {/* Buddy List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {diveBuddies.map((buddy) => (
              <div key={buddy.id} className="grid grid-cols-4 gap-4 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                {/* Name Column */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {buddy.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-[#101828] dark:text-gray-100 text-sm font-archivo truncate transition-colors duration-200">{buddy.name}</div>
                    <div className="text-sm text-[#667085] dark:text-gray-400 font-archivo truncate transition-colors duration-200">{buddy.email}</div>
                  </div>
                </div>

                {/* Buddies Column */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {buddy.buddyAvatars.slice(0, 4).map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt=""
                        className="w-6 h-6 rounded-full border border-white dark:border-gray-700 object-cover"
                      />
                    ))}
                    {buddy.buddyCount > 4 && (
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border border-white dark:border-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 transition-colors duration-200">
                        +{buddy.buddyCount - 4}
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificates Column */}
                <div className="flex gap-1 flex-wrap">
                  {buddy.certificates.map((cert) => (
                    <span
                      key={cert}
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCertificateColor(cert)}`}
                    >
                      {cert}
                    </span>
                  ))}
                </div>

                {/* Action Column */}
                <div className="text-right">
                  <Link href={`/div-buddies/profile/${buddy.id}`} className="text-orange-500 dark:text-orange-400 font-archivo text-sm hover:text-orange-600 dark:hover:text-orange-300 font-medium whitespace-nowrap transition-colors duration-200">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/Mobile Card View */}
        <div className="xl:hidden space-y-4">
          {diveBuddies.map((buddy) => (
            <div key={buddy.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-700/20 transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {buddy.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#101828] dark:text-gray-100 text-base font-archivo transition-colors duration-200">{buddy.name}</div>
                    <div className="text-sm text-[#667085] dark:text-gray-400 font-archivo truncate transition-colors duration-200">{buddy.email}</div>
                  </div>
                </div>
                <button className="text-orange-500 dark:text-orange-400 font-archivo text-sm hover:text-orange-600 dark:hover:text-orange-300 font-medium flex-shrink-0 ml-2 transition-colors duration-200">
                  View Profile
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dive Buddies */}
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2 uppercase tracking-wide transition-colors duration-200">Dive Buddies</div>
                  <div className="flex items-center gap-2">
                    {buddy.buddyCount > 0 ? (
                      <div className="flex -space-x-1">
                        {buddy.buddyAvatars.slice(0, 3).map((avatar, index) => (
                          <img
                            key={index}
                            src={avatar}
                            alt=""
                            className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                          />
                        ))}
                        {buddy.buddyCount > 3 && (
                          <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 font-medium transition-colors duration-200">
                            +{buddy.buddyCount - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 dark:text-gray-500 transition-colors duration-200">No buddies yet</span>
                    )}
                  </div>
                </div>

                {/* Certificates */}
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2 uppercase tracking-wide transition-colors duration-200">Certificates</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {buddy.certificates.length > 0 ? buddy.certificates.map((cert) => (
                      <span
                        key={cert}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCertificateColor(cert)}`}
                      >
                        {cert}
                      </span>
                    )) : (
                      <span className="text-sm text-gray-400 dark:text-gray-500 transition-colors duration-200">No certificates</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 gap-4">               
          <button                  
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 justify-center text-gray-700 dark:text-gray-300"                 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}               
          >                 
           <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8327 6.99996H1.16602M1.16602 6.99996L6.99935 12.8333M1.16602 6.99996L6.99935 1.16663" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           Previous               
          </button>                              

          <div className="hidden sm:flex items-center gap-1 sm:gap-2 overflow-x-auto">                 
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (                   
              <button                     
                key={page}                     
                onClick={() => setCurrentPage(page)}                     
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-colors duration-200 text-sm ${                       
                  currentPage === page                         
                    ? "bg-orange-500 dark:bg-orange-600 text-white"                         
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"                     
                }`}                   
              >                     
                {page}                   
              </button>                 
            ))}               
          </div>                

          <button                  
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 justify-center text-gray-700 dark:text-gray-300"                 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}               
          >                 
            Next                 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.16602 6.99996H12.8327M12.8327 6.99996L6.99935 1.16663M12.8327 6.99996L6.99935 12.8333" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>             
        </div>
      </div>

      {/* Sidebar - Suggested Buddies */}
      <div className="w-full xl:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 transition-colors duration-200">Suggested Buddies</h2>
        
        <div className="relative">
          {suggestedBuddies.map((buddy, index) => (
            <div key={buddy.id} className="relative flex items-center justify-between py-3">
              {/* Connecting line */}
              {index < suggestedBuddies.length - 1 && (
                <div className="absolute left-5 top-12 w-px h-6 bg-gray-200 dark:bg-gray-600 transition-colors duration-200"></div>
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
                  <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate transition-colors duration-200">{buddy.name}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex">
                      {renderStars(buddy.rating)}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0 transition-colors duration-200">{buddy.reviewCount} Reviews</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors duration-200 p-1 flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7417 6.1 19.225C4.88333 18.6917 3.825 17.975 2.925 17.075C2.025 16.175 1.30833 15.1167 0.775 13.9C0.258333 12.6833 0 11.3833 0 10C0 8.61667 0.258333 7.31667 0.775 6.1C1.30833 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31667 6.1 0.799999C7.31667 0.266666 8.61667 0 10 0C11.3833 0 12.6833 0.266666 13.9 0.799999C15.1167 1.31667 16.175 2.025 17.075 2.925C17.975 3.825 18.6833 4.88333 19.2 6.1C19.7333 7.31667 20 8.61667 20 10C20 11.3833 19.7333 12.6833 19.2 13.9C18.6833 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6917 13.9 19.225C12.6833 19.7417 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#A9B0C2" className="dark:fill-gray-400"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button variant={"outlined"} className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            View more
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default DiverBuddies