import { userDetails } from '@/app/(auth)/api/getAuthenticatedUser'
import { Button, LinkButton } from '@/components/core'
import React from 'react'
import { UseQueryResult } from 'react-query'
interface prop{
  user: UseQueryResult<userDetails, unknown>
}
const CardContainer = ({user}:prop) => {
     // Sort certificates by issue_date to get the latest first
const sortedCertificates = user?.data?.data?.certificates?.slice().sort((a, b) => 
  new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime()
) || [];
  return (
    <div className='relative'>
      <div className="relative">
        {sortedCertificates.map((card, index) => {
          // Calculate stacking offset - each card is slightly offset
          const offsetY = index * 8; // 8px offset for each subsequent card
          const offsetX = index * 4; // 4px horizontal offset for better visual
          const scale = 1 - (index * 0.02); // Slight scale reduction for depth effect
          const zIndex = sortedCertificates.length - index; // Higher z-index for newer cards
          
          return (
            <div 
              key={card?.id}
              className="absolute top-0 left-0 right-0 transition-all duration-300 hover:scale-105"
              style={{
                transform: `translateY(${offsetY}px) translateX(${offsetX}px) scale(${scale})`,
                zIndex: zIndex
              }}
            >
              <div 
                className="flex flex-col gap-4 bg-cover bg-center bg-no-repeat rounded-[10px] px-[1.125rem] py-4 shadow-lg"
                style={{
                  backgroundImage: card?.image ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${card.image})` : 'none',
                  backgroundColor: !card?.image ? "#F7931D" : "transparent"
                }}
              >
                <div className="">
                  <p className='text-white text-xs font-medium font-archivo'>
                    Date Added: {new Date(card?.issue_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="">
                  <p className='text-white text-xs font-medium font-archivo opacity-80'>Issuer:</p>
                  <p className='text-white text-xs font-semibold font-archivo'>{card?.issuer}</p>
                </div>
                <div className="">
                  <p className='text-white text-xs font-medium font-archivo opacity-80'>
                    Diver No: {card?.certification_no}
                  </p>
                  <p className='text-white text-base font-semibold font-archivo'>{card?.issuer_name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Spacer div to maintain layout height */}
      <div style={{ height: `${Math.max(160 + (sortedCertificates.length - 1) * 8, 160)}px` }} />
      
  
      
      <div className="my-3 flex justify-center items-center">
        <LinkButton href={"/manage-certifications"} 
          variant="outlined" 
          className='bg-transparent text-[#344054] font-medium text-sm dark:text-white font-archivo border border-gray-300 hover:bg-gray-50 transition-colors'
        >
          Manage your Certifications
        </LinkButton>
      </div>
    </div>
  )
}

export default CardContainer
