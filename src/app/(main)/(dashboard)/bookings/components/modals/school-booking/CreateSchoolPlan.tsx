"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Anchor, Waves } from "lucide-react"
import { Dialog, DialogBody, DialogContent } from "@/components/core"
import SchoolBookingInfo from "./SchoolBookingInfo"
import SchoolDriverContact, { BookingDriverFormValues } from "./SchoolDriverContact"
import SchoolParticipantForm from "./SchoolParticipant"
import { DiveEventCalendar, CalendarSelectionState } from "@/app/(main)/(dashboard)/manage-certifications/components/DiveEventCalendar"
import { CreateDivePlantranslations } from "@/app/(main)/translation/bookingTranslation"
import { useLanguage } from "@/hooks/useLanguage"

const createDivePlanSchema = z.object({
  dive_level:     z.string().min(1, "Please select a dive level"),
  instructor_id:  z.string().optional(),
  event_date_id:  z.string().min(1, "Please select a dive event date"),
  dive_event_id:  z.string().min(1, "Please select a dive event"),
  div_school:     z.string().min(1, "Please select a dive school"),
  location:       z.string().min(1, "Location is required"),
  event_type:     z.enum(["booking", "event"]).optional(),
})

export type CreateDivePlanFormData = z.infer<typeof createDivePlanSchema>

interface Props {
  isOpen: boolean
  setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>
}

const STEPS = [
  { id: "create", num: "01", label: "Session Type" },
  { id: "book",   num: "02", label: "Details"      },
  { id: "stage1", num: "03", label: "Divers"       },
  { id: "stage2", num: "04", label: "Confirm"      },
]

const stepIndex = (id: string) => STEPS.findIndex((s) => s.id === id)

const CreateSchoolPlan = ({ isOpen, setIsOpenCardModal }: Props) => {
  const { language } = useLanguage()
  const t = CreateDivePlantranslations[language] || CreateDivePlantranslations.en

  const [eventType,     setEventType]     = useState<"booking" | "event">("booking")
  const [typeSelected,  setTypeSelected]  = useState(false)
  const [activeStep,    setActiveStep]    = useState<"create" | "book" | "stage1" | "stage2">("create")

  const [schoolBookingDataInfo, setSchoolBookingDataInfo] = useState<CreateDivePlanFormData>({
    div_school:    "",
    dive_event_id: "",
    dive_level:    "",
    event_date_id: "",
    instructor_id: "",
    location:      "",
    event_type:    eventType,
  })

  const [diverInfo, setDiverInfo] = useState<BookingDriverFormValues>({
    email:      "",
    first_name: "",
    last_name:  "",
  })

  const createForm = useForm<CreateDivePlanFormData>({
    resolver: zodResolver(createDivePlanSchema),
    defaultValues: schoolBookingDataInfo,
  })

  const [calendarState, setCalendarState] = useState<CalendarSelectionState>({
    currentDate:         new Date(),
    selectedDate:        null,
    selectedCountry:     "",
    selectedEvent:       null,
    selectedInstructor:  "",
  })

  useEffect(() => {
    if (isOpen) {
      setTypeSelected(false)
      setEventType("booking")
      setActiveStep("create")
    }
  }, [isOpen])

  useEffect(() => {
    setSchoolBookingDataInfo((prev) => ({ ...prev, event_type: eventType }))
    createForm.reset({ ...createForm.getValues(), event_type: eventType })
    // Reset calendar state when event type changes
    setCalendarState({
      currentDate: new Date(),
      selectedDate: null,
      selectedCountry: "",
      selectedEvent: null,
      selectedInstructor: "",
    })
  }, [eventType])

  const handleEventChange = (formData: CreateDivePlanFormData | null) => {
    if (formData) {
      const formDataWithType = { ...formData, event_type: eventType }
      createForm.reset(formDataWithType)
      setSchoolBookingDataInfo(formDataWithType)
    }
  }

  const onCreateSubmit = (data: CreateDivePlanFormData) => {
    setSchoolBookingDataInfo({ ...data, event_type: eventType })
    setActiveStep("book")
  }

  const headerTitle = () => {
    if (activeStep === "create") {
      if (!typeSelected) return "New Dive Session"
      return eventType === "event" ? "Create Dive Event" : "Create Dive Booking"
    }
    if (activeStep === "book")   return eventType === "event" ? "Book a Dive Event" : t.bookPlan
    if (activeStep === "stage1") return "Diver Information"
    if (activeStep === "stage2") return t.completeBooking
    return "New Dive Session"
  }

  const currentIndex = stepIndex(activeStep)

  if (!isOpen) return null

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="!p-0 !border-0 !rounded-none !bg-transparent !shadow-none !max-w-[817px]">
        <DialogBody className="outline-none w-full max-md:px-2">

          {/* ── Shell ── */}
          <div
            className="relative flex flex-col max-h-[95vh] border border-[rgba(99,179,237,0.1)] shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            style={{ background: "#0d1424", fontFamily: "'DM Sans', sans-serif" }}
          >
            {/* Gold corner brackets */}
            <span className="absolute top-[-1px] left-[-1px]  w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[#c9a84c] z-10 pointer-events-none" />
            <span className="absolute top-[-1px] right-[-1px] w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#c9a84c] z-10 pointer-events-none" />
            <span className="absolute bottom-[-1px] left-[-1px]  w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#c9a84c] z-10 pointer-events-none" />
            <span className="absolute bottom-[-1px] right-[-1px] w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[#c9a84c] z-10 pointer-events-none" />

            {/* ── Header ── */}
            <div className="flex items-start justify-between px-9 pt-7 pb-6 border-b border-[rgba(99,179,237,0.12)] flex-shrink-0"
              style={{ background: "linear-gradient(180deg, rgba(13,30,60,0.4) 0%, transparent 100%)" }}>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-px bg-[#4fd1c5]" />
                  <span className="text-[10px] font-medium tracking-[3px] uppercase text-[#4fd1c5]">
                    Dive Operations
                  </span>
                </div>
                <h1
                  className="text-[28px] font-normal tracking-wide text-[#e8edf5] leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {headerTitle()}
                </h1>
              </div>
              <button
                onClick={() => setIsOpenCardModal(false)}
                className="w-8 h-8 flex items-center justify-center border border-[rgba(99,179,237,0.12)] bg-white/[0.04] text-[#6b7a99] hover:bg-white/[0.08] hover:text-[#e8edf5] transition-all mt-1 flex-shrink-0"
              >
                <X size={13} />
              </button>
            </div>

            {/* ── Step bar ── */}
<div className="flex px-4 md:px-9 border-b border-[rgba(99,179,237,0.06)] bg-black/20 flex-shrink-0">
  {STEPS.map((step, i) => {
    const isDone   = i < currentIndex
    const isActive = i === currentIndex
    return (
      <div
        key={step.id}
        className={`
          relative flex-1 flex items-center justify-center md:justify-start gap-2 md:gap-2.5
          py-3 md:py-3.5 border-b-2 transition-all
          ${isActive ? "border-[#c9a84c]" : "border-transparent"}
          ${i > 0 ? "ml-0 md:ml-6" : ""}
        `}
      >
        {/* separator — desktop only */}
        {i > 0 && (
          <span className="hidden md:block absolute left-[-12px] top-1/2 -translate-y-1/2 w-px h-4 bg-[#2a3450]" />
        )}

        {/* number / check circle */}
        <span className={`
          w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[10px] font-medium flex-shrink-0 transition-all
          ${isDone   ? "border-[#4fd1c5] bg-[rgba(79,209,197,0.1)] text-[#4fd1c5]"  : ""}
          ${isActive ? "border-[#c9a84c] bg-[rgba(201,168,76,0.15)] text-[#c9a84c]" : ""}
          ${!isDone && !isActive ? "border-[#2a3450] text-[#6b7a99]" : ""}
        `}>
          {isDone ? <Check size={9} /> : step.num}
        </span>

        {/* label — hidden on mobile */}
        <span className={`
          hidden md:block text-[11px] font-medium tracking-widest uppercase transition-all
          ${isActive ? "text-[#e8edf5]" : "text-[#6b7a99]"}
        `}>
          {step.label}
        </span>

        {/* mobile: active step label only */}
        {isActive && (
          <span className="md:hidden text-[10px] font-medium tracking-widest uppercase text-[#e8edf5]">
            {step.label}
          </span>
        )}
      </div>
    )
  })}
</div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto">

              {/* create — type selection */}
              {activeStep === "create" && !typeSelected && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="type-select"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-9"
                  >
                    <p className="text-[10px] font-medium tracking-[2.5px] uppercase text-[#6b7a99] mb-5">
                      Select session format
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

                      <button
                        type="button"
                        onClick={() => { setEventType("booking"); setTypeSelected(true) }}
                        className="group relative p-6 bg-[#151d2e] border border-[rgba(99,179,237,0.06)] text-left transition-all hover:border-white/[0.12] hover:-translate-y-px overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,168,76,0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-10 h-10 flex items-center justify-center bg-[rgba(201,168,76,0.1)] mb-3.5">
                          <Anchor size={18} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-xl font-medium text-[#e8edf5] mb-1.5 tracking-wide"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          Dive Booking
                        </p>
                        <p className="text-xs text-[#6b7a99] leading-relaxed">
                          Private or group booking with instructor assignment and equipment reservation.
                        </p>
                        <span className="absolute bottom-5 right-5 text-[#2a3450] group-hover:text-[#6b7a99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-base">↗</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setEventType("event"); setTypeSelected(true) }}
                        className="group relative p-6 bg-[#151d2e] border border-[rgba(99,179,237,0.06)] text-left transition-all hover:border-white/[0.12] hover:-translate-y-px overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(79,209,197,0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-10 h-10 flex items-center justify-center bg-[rgba(79,209,197,0.1)] mb-3.5">
                          <Waves size={18} className="text-[#4fd1c5]" />
                        </div>
                        <p className="text-xl font-medium text-[#e8edf5] mb-1.5 tracking-wide"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          Dive Event
                        </p>
                        <p className="text-xs text-[#6b7a99] leading-relaxed">
                          Organised dive events open to registered members with capacity management.
                        </p>
                        <span className="absolute bottom-5 right-5 text-[#2a3450] group-hover:text-[#6b7a99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-base">↗</span>
                      </button>

                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* create — calendar */}
              {activeStep === "create" && typeSelected && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="px-9 pt-6 pb-2"
                  >
                    <div className="flex items-center gap-2.5 px-4 py-3 bg-[rgba(79,209,197,0.05)] border border-[rgba(79,209,197,0.12)] mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4fd1c5] animate-pulse flex-shrink-0" />
                      <span className="text-[11px] text-[#4fd1c5] tracking-wide">
                        {eventType === "event" ? "Dive Event" : "Dive Booking"} — fill in session details below
                      </span>
                    </div>
                    <div className="overflow-y-auto max-h-[calc(88vh-280px)]">
                      <DiveEventCalendar
                        onChange={handleEventChange}
                        savedState={calendarState}
                        onStateChange={setCalendarState}
                        eventType={eventType}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {activeStep === "book" && (
                <div className="px-9 pt-6">
                  <SchoolBookingInfo
                    back={() => setActiveStep("create")}
                    next={() => setActiveStep("stage1")}
                    schoolBookingData={schoolBookingDataInfo}
                    onUpdateBookingData={(data) => setSchoolBookingDataInfo(data)}
                    calendarState={calendarState}
                  />
                </div>
              )}

              {activeStep === "stage1" && (
                <div className="px-9 pt-6">
                  <SchoolDriverContact
                    back={() => setActiveStep("book")}
                    next={() => setActiveStep("stage2")}
                    setDiverInfo={setDiverInfo}
                    diverInfo={diverInfo}
                  />
                </div>
              )}

              {activeStep === "stage2" && (
                <div className="px-9 pt-6">
                  <SchoolParticipantForm
                    back={() => setActiveStep("stage1")}
                    next={() => setActiveStep("stage2")}
                    schoolBookingDataInfo={schoolBookingDataInfo}
                    diverInfo={diverInfo}
                    onClose={() => setIsOpenCardModal(false)}
                  />
                </div>
              )}
            </div>

            {/* ── Footer — only shown on create+typeSelected step ── */}
            {activeStep === "create" && typeSelected && (
              <div className="flex items-center justify-between px-9 py-5 border-t border-[rgba(99,179,237,0.06)] bg-[#0d1424] flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setTypeSelected(false)}
                  className="px-5 py-2.5 border border-[rgba(99,179,237,0.12)] text-[#6b7a99] hover:border-white/[0.15] hover:text-[#e8edf5] transition-all text-[11px] font-medium tracking-[1.5px] uppercase"
                >
                  ← Back
                </button>
                <span className="text-[11px] text-[#2a3450] tracking-wide">Step 1 of 4</span>
                <button
                  type="button"
                  onClick={createForm.handleSubmit(onCreateSubmit)}
                  className="relative px-7 py-2.5 border border-[#c9a84c] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-all text-[11px] font-medium tracking-[2px] uppercase"
                >
                  {t.proceed} →
                </button>
              </div>
            )}

          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSchoolPlan