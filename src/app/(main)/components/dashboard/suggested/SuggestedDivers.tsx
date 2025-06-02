import React from 'react'
import { SuggestedDiverCard } from './SuggestedDiversCard'
import { Diver } from './types'
import { useAuth } from '@/contexts/authentication'
import { UserDataProp } from '@/contexts/types'
import { getLocationFromCoordinates } from '@/utils/getLocationfromCordinates'
import { LocationDisplay } from '@/utils/GetLocationFromCordinate'

// export const divers: Diver[] = [
//   {
//     id: "1",
//     name: "Christian Fletcher",
//     location: "Washington County, United States",
//     date: "May 17, 2024",
//     profileImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=300&fit=crop",
//     backgroundImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=300&fit=crop",
//     stats: {
//       description: "Dives with more than 5 new buddies in the past 4 days",
//       timeIn: "6:04PM",
//       timeOut: "8:03PM",
//       maxDepth: "4 ft",
//       bottomTime: "1h 14m",
//     },
//   },
//   {
//     id: "2",
//     name: "William Burton",
//     location: "Honolulu County, Hawaii",
//     date: "April 7, 2024",
//     profileImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=300&fit=crop",
//     backgroundImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=300&fit=crop",
//     stats: {
//       description: "Dives with more than 7 new buddies in the past 3 days",
//       timeIn: "1:32PM",
//       timeOut: "4:44PM",
//       maxDepth: "7 ft",
//       bottomTime: "0h 53m",
//     },
//   },
//   {
//     id: "3",
//     name: "Nick Starr",
//     location: "Speigel Grove Wreck, Florida",
//     date: "May 26, 2024",
//     profileImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=300&fit=crop",
//     backgroundImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=300&fit=crop",
//     stats: {
//       description: "Hangout with 7 new buddies in the past 7 days",
//       timeIn: "12:04PM",
//       timeOut: "2:33PM",
//       maxDepth: "12 ft",
//       bottomTime: "1h 29m",
//     },
//   },
// ]

  


const SuggestedDivers = () => {
      const { authState } = useAuth();
      const { user} = authState;
       const userData = user as UserDataProp;
      
       
  return (
    <div>
<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userData?.suggested_divers?.map((diver) => (
              <SuggestedDiverCard
                key={diver.id}
                id={String(diver.id)}
                name={diver?.full_name}
                // location={getLocationFromCoordinates(diver?.coordinate?.lat, diver?.coordinate?.lon)}
             location={
            <LocationDisplay 
              lat={diver?.coordinate?.lat} 
              lon={diver?.coordinate?.lon}
              fallback="Location unavailable"
              showTime={true}
              timeFormat="relative"
            />
          }
                date={diver?.recent_dive_info?.other_divers ??""}
                profileImage={diver?.profile_picture??""}
                backgroundImage={diver?.recent_dive_info?.dive_image??""}
                stats={{
                    bottomTime:diver?.recent_dive_info?.bottom_time ??"",
                    description:"",
                    maxDepth:diver?.recent_dive_info?.depth ?? "",
                    timeIn:diver?.recent_dive_info?.start_date ?? "",
                    timeOut:diver?.recent_dive_info?.end_date ?? "",

                }}
              />
            ))}
          </div>




    </div>
  )
}

export default SuggestedDivers