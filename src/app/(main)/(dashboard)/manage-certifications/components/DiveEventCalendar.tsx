"use client"
import React, { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, MapPin, School, User } from "lucide-react"
import moment from "moment"
import { useFetchDiveEvent } from "../../api/bookings/fetchDiveEvent"
import { useFetchDiveEventCountry } from "../../api/bookings/fetchDiveEventByCountry"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/core/Select"

export interface CalendarSelectionState {
  currentDate: Date
  selectedDate: Date | null
  selectedCountry: string
  selectedEvent: any
  selectedInstructor: string
}

interface DiveEventCalendarProps {
  onEventSelect?: (payload: {
    dive_level: string;
    instructor_id: string;
    event_date_id: string;
    dive_event_id: string;
    div_school: string;
    location: string;
  }) => void;
  onChange?: (payload: {
    dive_level: string;
    instructor_id: string;
    event_date_id: string;
    dive_event_id: string;
    div_school: string;
    location: string;
  } | null) => void;
  savedState?: CalendarSelectionState
  onStateChange?: (state: CalendarSelectionState) => void
}

export const DiveEventCalendar: React.FC<DiveEventCalendarProps> = ({ onEventSelect, onChange, savedState, onStateChange }) => {
  const [currentDate, setCurrentDate]               = useState(savedState?.currentDate ?? new Date())
  const [selectedDate, setSelectedDate]             = useState<Date | null>(savedState?.selectedDate ?? null)
  const [selectedCountry, setSelectedCountry]       = useState(savedState?.selectedCountry ?? "")
  const [selectedEvent, setSelectedEvent]           = useState<any>(savedState?.selectedEvent ?? null)
  const [selectedInstructor, setSelectedInstructor] = useState(savedState?.selectedInstructor ?? "")

  // ── Step 1: fetch all events to highlight available dates ──
  const { data: allEventsData } = useFetchDiveEvent()

  const availableDates = useMemo(() => {
    const set = new Set<string>()
    allEventsData?.data?.forEach((event) =>
      event.event_dates.forEach((d) => set.add(moment(d.event_date).format("YYYY-MM-DD")))
    )
    return set
  }, [allEventsData])

  const daysWithEvents = useMemo(() => {
    const set = new Set<number>()
    availableDates.forEach((dateStr) => {
      const d = moment(dateStr)
      if (d.year() === currentDate.getFullYear() && d.month() === currentDate.getMonth())
        set.add(d.date())
    })
    return set
  }, [availableDates, currentDate])

  // ── Step 2: fetch by country when a date is selected ──
  const selectedDateStr = selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : undefined
  const { data: diveEventData, isLoading } = useFetchDiveEventCountry(selectedDateStr)

  const countryEntries = useMemo(() => {
    if (!diveEventData) return []
    return Array.isArray(diveEventData) ? diveEventData : [diveEventData]
  }, [diveEventData])

  const eventsForCountry = useMemo(() => {
    if (!selectedCountry) return []
    const entry = countryEntries.find((c) => c.country === selectedCountry)
    return entry?.dive_school_events || []
  }, [selectedCountry, countryEntries])

  // Instructors from the selected school's event
  const instructorOptions = useMemo(() => {
    return selectedEvent?.dive_instructors?.map((i: any) => ({
      value: String(i.id),
      label: i.name,
    })) || []
  }, [selectedEvent])

  const canProceed = !!selectedDate && !!selectedCountry && !!selectedEvent &&
    (instructorOptions.length === 0 || !!selectedInstructor)

  // ── Calendar helpers ──
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDay    = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const days        = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays   = Array.from({ length: firstDay })
  const today       = new Date()

  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear()

  const isSelectedDay = (day: number) =>
    !!selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === currentDate.getMonth() &&
    selectedDate.getFullYear() === currentDate.getFullYear()

  // Only change month — preserve all selections
  const prevMonth = () => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    setCurrentDate(d)
    onStateChange?.({ currentDate: d, selectedDate, selectedCountry, selectedEvent, selectedInstructor })
  }
  const nextMonth = () => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    setCurrentDate(d)
    onStateChange?.({ currentDate: d, selectedDate, selectedCountry, selectedEvent, selectedInstructor })
  }

  const handleDateClick = (day: number) => {
    if (!daysWithEvents.has(day)) return
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    if (!selectedDate || newDate.toDateString() !== selectedDate.toDateString()) {
      setSelectedDate(newDate)
      setSelectedCountry("")
      setSelectedEvent(null)
      setSelectedInstructor("")
      onStateChange?.({ currentDate, selectedDate: newDate, selectedCountry: "", selectedEvent: null, selectedInstructor: "" })
    }
  }

  // Notify parent of current selections whenever they change
  React.useEffect(() => {
    onStateChange?.({ currentDate, selectedDate, selectedCountry, selectedEvent, selectedInstructor })
    if (!onChange) return
    if (canProceed) {
      onChange({
        dive_level: "beginner",
        instructor_id: selectedInstructor,
        event_date_id: selectedEvent?.event_dates?.[0]?.id?.toString() || "",
        dive_event_id: selectedEvent?.id?.toString() || "",
        div_school: selectedEvent?.dive_school?.toString() || "",
        location: selectedEvent?.dive_site_name?.toString() || "",
      })
    } else {
      onChange(null)
    }
  }, [selectedInstructor, selectedEvent, selectedCountry, selectedDate, canProceed])

  const handleNext = () => {
    if (!canProceed || !onEventSelect) return
    onEventSelect({
      dive_level: "beginner",
      instructor_id: selectedInstructor,
      event_date_id: selectedEvent?.event_dates?.[0]?.id?.toString() || "",
      dive_event_id: selectedEvent?.id?.toString() || "",
      div_school: selectedEvent?.dive_school?.toString() || "",
      location: selectedEvent?.dive_site_name?.toString() || "",
    })
  }

  return (
    <div className="w-full space-y-4">

      {/* ── Calendar ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-tight uppercase">
              {moment(currentDate).format("MMMM YYYY")}
            </h2>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
              {daysWithEvents.size > 0
                ? `${daysWithEvents.size} available day${daysWithEvents.size !== 1 ? "s" : ""}`
                : "No events this month"}
            </p>
          </div>
          <div className="flex gap-0.5">
            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
              <ChevronLeft size={14} />
            </button>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 px-2 pt-2 pb-1">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-center text-[9px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest pb-1.5">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-100 dark:border-zinc-800">
          {emptyDays.map((_, i) => <div key={`e-${i}`} className="bg-white dark:bg-zinc-900 min-h-[64px]" />)}
          {days.map((day) => {
            const hasEvent  = daysWithEvents.has(day)
            const selected  = isSelectedDay(day)
            const todayFlag = isToday(day)
            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={[
                  "relative min-h-[64px] p-1.5 flex flex-col items-center justify-start transition-all duration-150",
                  hasEvent && !selected ? "cursor-pointer ring-inset ring-1 ring-orange-300 dark:ring-orange-500/50 bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 hover:ring-orange-400" : "",
                  selected ? "cursor-pointer bg-[#f97316] ring-inset ring-2 ring-orange-600" : "",
                  !hasEvent && !selected ? "cursor-default bg-white dark:bg-zinc-900" : "",
                ].join(" ")}
              >
                <span className={[
                  "text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full",
                  selected ? "text-white"
                    : todayFlag ? "bg-[#f97316] text-white"
                    : hasEvent ? "text-orange-700 dark:text-orange-300"
                    : "text-zinc-300 dark:text-zinc-700",
                ].join(" ")}>
                  {day}
                </span>
                {hasEvent && !selected && (
                  <span className="mt-1 px-1.5 py-0.5 rounded bg-orange-400 dark:bg-orange-500 text-white text-[8px] font-bold leading-none tracking-wide">
                    DIVE
                  </span>
                )}
                {selected && (
                  <span className="mt-1 px-1.5 py-0.5 rounded bg-white/30 text-white text-[8px] font-bold leading-none tracking-wide">
                    DIVE
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-orange-50 dark:bg-orange-500/10 ring-1 ring-orange-300 dark:ring-orange-500/50" />
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#f97316]" />
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#f97316]" />
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Today</span>
          </div>
        </div>
      </div>

      {/* ── Detail panel ── */}
      {selectedDate && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-orange-50 dark:bg-orange-500/10">
            <p className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-widest">
              {moment(selectedDate).format("dddd, MMMM D, YYYY")}
            </p>
          </div>

          <div className="p-4 space-y-4">
            {isLoading ? (
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 animate-pulse text-center">Loading events…</p>
            ) : countryEntries.length === 0 ? (
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center italic">
                No events on {moment(selectedDate).format("MMMM D")} — try another date
              </p>
            ) : (
              <>
                {/* Country */}
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                    <MapPin size={9} /> Country <span className="text-red-400">*</span>
                  </label>
                  <Select
                    value={selectedCountry}
                    onValueChange={(v) => {
                      setSelectedCountry(v)
                      setSelectedEvent(null)
                      setSelectedInstructor("")
                      onStateChange?.({ currentDate, selectedDate, selectedCountry: v, selectedEvent: null, selectedInstructor: "" })
                    }}
                  >
                    <SelectTrigger className="w-full text-[12px] dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100" iconClassName="text-zinc-500 dark:text-zinc-400">
                      <SelectValue placeholder="Select a country…" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryEntries.map((c) => (
                        <SelectItem key={c.country} value={c.country} className="text-[12px]">
                          {c.country} ({c.dive_school_event_count} event{c.dive_school_event_count !== 1 ? "s" : ""})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Event / Dive School */}
                {selectedCountry && (
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                      <School size={9} /> Dive School / Event <span className="text-red-400">*</span>
                    </label>
                    {eventsForCountry.length === 0 ? (
                      <p className="text-[11px] text-zinc-400 italic">No events for this country</p>
                    ) : (
                      <Select
                        value={selectedEvent?.id ? String(selectedEvent.id) : ""}
                        onValueChange={(v) => {
                          const ev = eventsForCountry.find((ev: any) => String(ev.id) === v)
                          setSelectedEvent(ev || null)
                          setSelectedInstructor("")
                          onStateChange?.({ currentDate, selectedDate, selectedCountry, selectedEvent: ev || null, selectedInstructor: "" })
                        }}
                      >
                        <SelectTrigger className="w-full text-[12px] dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100" iconClassName="text-zinc-500 dark:text-zinc-400">
                          <SelectValue placeholder="Select a dive school…" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventsForCountry.map((ev: any) => (
                            <SelectItem key={ev.id} value={String(ev.id)} className="text-[12px]">
                              {ev.dive_school_name} — {ev.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}

                {/* Instructors from selected school */}
                {selectedEvent && (
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                      <User size={9} /> Instructor {instructorOptions.length > 0 && <span className="text-red-400">*</span>}
                    </label>
                    {instructorOptions.length > 0 ? (
                      <Select value={selectedInstructor} onValueChange={(v) => {
                        setSelectedInstructor(v)
                        onStateChange?.({ currentDate, selectedDate, selectedCountry, selectedEvent, selectedInstructor: v })
                      }}>
                        <SelectTrigger className="w-full text-[12px] dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100" iconClassName="text-zinc-500 dark:text-zinc-400">
                          <SelectValue placeholder="Select an instructor…" />
                        </SelectTrigger>
                        <SelectContent>
                          {instructorOptions.map((i: any) => (
                            <SelectItem key={i.value} value={i.value} className="text-[12px]">
                              {i.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-[12px] text-zinc-400 italic">
                        No instructors listed for this school
                      </div>
                    )}
                  </div>
                )}

              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
