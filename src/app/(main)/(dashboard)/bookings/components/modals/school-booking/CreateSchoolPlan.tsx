


"use client"
import React, {  useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogBody, DialogContent } from "@/components/core"
import SchoolBookingInfo from "./SchoolBookingInfo"
import SchoolDriverContact, { BookingDriverFormValues } from "./SchoolDriverContact"
import SchoolParticipantForm from "./SchoolParticipant"
import { DiveEventCalendar, CalendarSelectionState } from "@/app/(main)/(dashboard)/manage-certifications/components/DiveEventCalendar"
import { CreateDivePlantranslations } from "@/app/(main)/translation/bookingTranslation"
import { useLanguage } from "@/hooks/useLanguage"

// ---------------------- TRANSLATIONS --------------------------------------------------------------------------

// Validation schema for booking steps
const createDivePlanSchema = z.object({
  dive_level: z.string().min(1, "Please select a dive level"),
  instructor_id: z.string().min(1, "Please select a dive instructor"),
  event_date_id: z.string().min(1, "Please select a dive event date"),
  dive_event_id: z.string().min(1, "Please select a dive event"),
  div_school: z.string().min(1, "Please select a dive school"),
  location: z.string().min(1, "Location is required"),
})

export type CreateDivePlanFormData = z.infer<typeof createDivePlanSchema>

interface Props {
  isOpen: boolean
  setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>
 
}

const CreateSchoolPlan = ({ isOpen, setIsOpenCardModal }: Props) => {
const {language} = useLanguage()
  const t = CreateDivePlantranslations[language] || CreateDivePlantranslations.en

  const [activeStep, setActiveStep] = useState<"create" | "book" | "stage1" | "stage2">("create")

  const [schoolBookingDataInfo, setSchoolBookingDataInfo] = useState<CreateDivePlanFormData>({
    div_school: "",
    dive_event_id: "",
    dive_level: "",
    event_date_id: "",
    instructor_id: "",
    location: "",
  })

  const [diverInfo, setDiverInfo] = useState<BookingDriverFormValues>({
    email: "",
    first_name: "",
    last_name: "",
  })

  const createForm = useForm<CreateDivePlanFormData>({
    resolver: zodResolver(createDivePlanSchema),
    defaultValues: schoolBookingDataInfo,
  })

  const [calendarState, setCalendarState] = useState<CalendarSelectionState>({
    currentDate: new Date(),
    selectedDate: null,
    selectedCountry: "",
    selectedEvent: null,
    selectedInstructor: "",
  })

  const handleEventChange = (formData: CreateDivePlanFormData | null) => {
    if (formData) {
      createForm.reset(formData)
      setSchoolBookingDataInfo(formData)
    }
  }

  const onCreateSubmit = (data: CreateDivePlanFormData) => {
    setSchoolBookingDataInfo(data)
    setActiveStep("book")
  }



  if (!isOpen) return null

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="!max-w-[817px] !max-h-[95vh] bg-white dark:bg-gray-900">
        <DialogBody className="w-full max-md:px-2 outline-none text-gray-900 dark:text-white">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold">
              {activeStep === "create"
                ? t.createPlan
                : activeStep === "book"
                ? t.bookPlan
                : t.completeBooking}
            </h1>
          </div>

          <div className="p-3">
            {activeStep === "create" && (
              <div className="">
                <div className="px-3 overflow-y-auto max-h-[calc(88vh-160px)]">
                  {/* Dive Event Calendar */}
                  <DiveEventCalendar
                    onChange={handleEventChange}
                    savedState={calendarState}
                    onStateChange={setCalendarState}
                  />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 border-gray-200 dark:border-gray-700 px-6 pt-4 bg-white dark:bg-gray-900">
                  <button
                    type="button"
                    onClick={() => setIsOpenCardModal(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="button"
                    onClick={createForm.handleSubmit(onCreateSubmit)}
                    className="px-6 py-2 bg-orange-500 text-white flex justify-center items-center gap-x-3 rounded-lg hover:bg-orange-600"
                  >
                    {t.proceed}
                  </button>
                </div>
              </div>
            )}

            {activeStep === "book" && (
              <SchoolBookingInfo
                back={() => setActiveStep("create")}
                next={() => setActiveStep("stage1")}
                schoolBookingData={schoolBookingDataInfo}
                onUpdateBookingData={(data) => setSchoolBookingDataInfo(data)}
              />
            )}
            {activeStep === "stage1" && (
              <SchoolDriverContact
                back={() => setActiveStep("book")}
                next={() => setActiveStep("stage2")}
                setDiverInfo={setDiverInfo}
                diverInfo={diverInfo}
              />
            )}
            {activeStep === "stage2" && (
              <SchoolParticipantForm
                back={() => setActiveStep("stage1")}
                next={() => setActiveStep("stage2")}
                schoolBookingDataInfo={schoolBookingDataInfo}
                diverInfo={diverInfo}
                onClose={() => setIsOpenCardModal(false)}
              />
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSchoolPlan
