import React from 'react';
// import { Search, Share2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Type definitions
interface DiveCardProps {
  image: string;
  location: string;
  date: string;
  hostedBy: string;
  title: string;
  description: string;
  readMoreText?: string;
  viewPlanText?: string;
  onReadMore?: () => void;
  onViewPlan?: () => void;
}

// interface DiveData {
//   image: string;
//   location: string;
//   date: string;
//   hostedBy: string;
//   title: string;
//   description: string;
// }

// Reusable Dive Card Component
export const BookingCard: React.FC<DiveCardProps> = ({ 
  image, 
  location, 
  date, 
  hostedBy, 
  title, 
  description, 
  readMoreText = "Read More",
  viewPlanText = "View Dive Plan",
  onReadMore,
  onViewPlan
}) => {
 

  return (
    <div className="w-full">
      {/* Image Container */}
   <div className="relative  overflow-hidden mb-4 h-64 w-full">
      {/* Image wrapper layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={location}
          className="object-cover"
          sizes="100vw"
          fill
          priority
        />
      </div>

      {/* Overlay content - z index higher than image */}
      <div className="absolute inset-x-0 bottom-0 bg-[#4d799c]/70 dark:bg-black/60 p-4 z-10">
        <div className="relative">
            <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm font-archivo mb-1">{location}</h3>
          <p className="text-white font-semibold text-sm font-archivo right-0">{date}</p>

            </div>
          <p className="text-[#F7931D] font-archivo font-medium text-xs">{hostedBy}</p>
        </div>
      </div>
    </div>
      
      {/* Content */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold font-archivo text-[#101828] dark:text-white">{title}</h2>
      <p
  className="text-gray-600 dark:text-gray-300 font-archivo text-base leading-relaxed "
>
  <span className='line-clamp-2'>

  {description}{' '}
  </span>
  <span
    className="text-orange-500 dark:text-orange-400 text-sm font-medium cursor-pointer hover:underline"
    onClick={onReadMore}
  >
    {readMoreText}
  </span>
</p>


        
        {/* View Dive Plan Button */}
        <button 
          className="flex items-center gap-2 text-sm text-orange-500 dark:text-orange-400 font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
          onClick={onViewPlan}
        >
          <span>{viewPlanText}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.832031 9.16671L9.16536 0.833374M9.16536 0.833374H0.832031M9.16536 0.833374V9.16671" stroke="#F7931D" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        </button>
      </div>
    </div>
  );
};