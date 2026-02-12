"use client"
import React, { useState } from "react"
import BookingActionModal from "./modals/BookingActionModal"
import { Button } from "@/components/core"
import CreateSchoolPlan from "./modals/school-booking/CreateSchoolPlan"
import CreateBuddyBooking from "./modals/buddy-booking/CreateBuddyBooking"
import { useAuth } from "@/contexts/authentication"
import { useLanguage } from "@/hooks/useLanguage"

// Translation object
const translations = {
  en: { createNewDivePlan: "Create New Dive Plan" },
  es: { createNewDivePlan: "Crear nuevo plan de buceo" },
  fr: { createNewDivePlan: "Créer un nouveau plan de plongée" },
  nl: { createNewDivePlan: "Nieuw duikplan maken" },
}

type Lang = keyof typeof translations

const AddBookingButton = () => {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSchoolBookingModal, setShowSchoolBookingModal] = useState(false)
  const [showBookWithBuddy, setShowBookWithBuddy] = useState(false)
  const { authState } = useAuth()
  const { user } = authState
const {language}=useLanguage()
  const t = translations[language] || translations.en

  return (
    <div>
      <Button
        className="px-4 py-3 bg-[#F7931D] font-archivo text-white rounded-lg hover:bg-orange-600 transition-colors"
        onClick={() => setShowSchoolBookingModal(true)}
      >
        {t.createNewDivePlan}
      </Button>

 {/* {showSchoolBookingModal && ( */}
        <CreateSchoolPlan
          isOpen={showSchoolBookingModal}
          setIsOpenCardModal={setShowSchoolBookingModal}
        />
      {/* )} */}
      {/* {showBookingModal && (
        <BookingActionModal
          isOpen={showBookingModal}
          setIsOpenCardModal={setShowBookingModal}
          setShowBookWithBuddy={setShowBookWithBuddy}
          setShowSchoolBookingModal={setShowSchoolBookingModal}
        />
      )}
     
      {showBookWithBuddy && (
        <CreateBuddyBooking
          isOpen={showBookWithBuddy}
          user={user}
          setIsOpenCardModal={setShowBookWithBuddy}
          selectedBuddies=""
        />
      )} */}
    </div>
  )
}

export default AddBookingButton
