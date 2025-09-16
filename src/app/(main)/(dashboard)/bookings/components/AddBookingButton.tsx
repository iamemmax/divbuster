"use client"
import React, { useState } from 'react'
import BookingActionModal from './modals/BookingActionModal'
import { Button } from '@/components/core'
import CreateSchoolPlan from './modals/school-booking/CreateSchoolPlan'
import CreateBuddyBooking from './modals/buddy-booking/CreateBuddyBooking'

const AddBookingButton = () => {
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [showScholBookingModal, setShowSchoolBookingModal] = useState(false)
    const [showBookWithBuddy, setShowBookWithBuddy] = useState(false)
  return (
    <div>
 <Button 
                className="px-4 py-3 bg-[#F7931D] font-archivo text-white rounded-lg hover:bg-orange-600 transition-colors"
                onClick={()=>setShowBookingModal(true)}
              >
                Create New Dive Plan
              </Button>


       {showBookingModal&& <BookingActionModal isOpen={showBookingModal} setIsOpenCardModal={setShowBookingModal} setShowBookWithBuddy={setShowBookWithBuddy} setShowSchoolBookingModal={setShowSchoolBookingModal}/>}
       {showScholBookingModal&& <CreateSchoolPlan isOpen={showScholBookingModal} setIsOpenCardModal={setShowSchoolBookingModal}/>}
    {showBookWithBuddy && <CreateBuddyBooking isOpen={showBookWithBuddy} setIsOpenCardModal={setShowBookWithBuddy}/>}
    
    </div>
  )
}

export default AddBookingButton