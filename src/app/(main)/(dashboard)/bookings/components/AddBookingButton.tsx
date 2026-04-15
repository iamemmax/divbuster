"use client"
import React, { useState } from "react"
// import BookingActionModal from "./modals/BookingActionModal"
import { Button } from "@/components/core"
import CreateSchoolPlan from "./modals/school-booking/CreateSchoolPlan"
// import CreateBuddyBooking from "./modals/buddy-booking/CreateBuddyBooking"
// import { useAuth } from "@/contexts/authentication"
import { useLanguage } from "@/hooks/useLanguage"

// Translation object
const translations = {
  en: { createBooking: "Create Booking" },
  es: { createBooking: "Crear reserva" },
  fr: { createBooking: "Créer une réservation" },
  nl: { createBooking: "Boeking maken" },
}

const AddBookingButton = () => {
  const [showSchoolBookingModal, setShowSchoolBookingModal] = useState(false)
  const { language } = useLanguage()
  const t = translations[language] || translations.en

  return (
    <div>
      <Button
        className="px-4 py-3 bg-[#F7931D] font-archivo text-white rounded-lg hover:bg-orange-600 transition-colors"
        onClick={() => setShowSchoolBookingModal(true)}
      >
        {t.createBooking}
      </Button>

      <CreateSchoolPlan
        isOpen={showSchoolBookingModal}
        setIsOpenCardModal={setShowSchoolBookingModal}
      />
    </div>
  )
}


export default AddBookingButton
