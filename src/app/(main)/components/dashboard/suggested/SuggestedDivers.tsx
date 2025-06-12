import React from 'react'
import { SuggestedDiverCard } from './SuggestedDiversCard'
import { Diver } from './types'
import { useAuth } from '@/contexts/authentication'
import { UserDataProp } from '@/contexts/types'
import { LocationDisplay } from '@/utils/GetLocationFromCordinate'

  


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