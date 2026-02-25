"use client"
import React, { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, MapPin, School, User, CheckCircle2 } from "lucide-react"
import moment from "moment"
import { useFetchDiveEvent } from "../../api/bookings/fetchDiveEvent"

interface DiveEventCalendarProps {
  onEventSelect?: (payload: {
    dive_level: string;
    instructor_id: string;
    event_date_id: string;
    dive_event_id: string;
    div_school: string;
    location: string;
  }) => void;
}

export const DiveEventCalendar: React.FC<DiveEventCalendarProps> = ({ onEventSelect }) => {
  const [currentDate, setCurrentDate]         = useState(new Date())
  const [selectedDate, setSelectedDate]       = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent]     = useState<any>(null)
  const [selectedInstructor, setSelectedInstructor] = useState("")

  const { data: diveEventData, isLoading } = useFetchDiveEvent()

  const allEvents = useMemo(() => {
    if (!diveEventData?.data) return []
    return Array.isArray(diveEventData.data) ? diveEventData.data : []
  }, [diveEventData])

  const allEventDates = useMemo(() => {
    return allEvents.flatMap((event: any) =>
      event.event_dates.map((date: any) => ({
        ...date,
        eventId: event.id,
        eventName: event.name,
        diveSchool: event.dive_school,
        diveSchoolName: event.dive_school_name,
        diveInstructors: event.dive_instructors,
        eventDescription: event.description,
        amount: event.amount,
        serviceCharge: event.service_charge,
        diveSiteName: event.dive_site_name,
      }))
    )
  }, [allEvents])

  // Map<"YYYY-MM-DD", eventDate[]> for quick lookup
  const eventsByDate = useMemo(() => {
    const map = new Map<string, any[]>()
    allEventDates.forEach((e) => {
      const key = moment(e.event_date).format("YYYY-MM-DD")
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(e)
    })
    return map
  }, [allEventDates])

  // Days that have events in the currently viewed month
  const daysWithEvents = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const map = new Map<number, any[]>() // day → events[]
    allEventDates.forEach((e) => {
      const d = moment(e.event_date)
      if (d.year() === year && d.month() === month) {
        const day = d.date()
        if (!map.has(day)) map.set(day, [])
        map.get(day)!.push(e)
      }
    })
    return map
  }, [currentDate, allEventDates])

  // Events on the currently selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return []
    const key = moment(selectedDate).format("YYYY-MM-DD")
    return eventsByDate.get(key) || []
  }, [selectedDate, eventsByDate])

  const instructorOptions = useMemo(() => {
    return selectedEvent?.diveInstructors?.map((i: any) => ({
      value: String(i.id),
      label: i.name,
    })) || []
  }, [selectedEvent])

  const canProceed = !!selectedDate && !!selectedEvent &&
    (instructorOptions.length === 0 || !!selectedInstructor)

  // Calendar grid
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

  const handleDateClick = (day: number) => {
    if (!daysWithEvents.has(day)) return
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
    // Auto-select event if only one on that date
    const events = daysWithEvents.get(day) || []
    if (events.length === 1) {
      setSelectedEvent(events[0])
    } else {
      setSelectedEvent(null)
    }
    setSelectedInstructor("")
  }

  // Auto-trigger callback when instructor is selected
  React.useEffect(() => {
    if (canProceed && onEventSelect) {
      const payload = {
        dive_level: "beginner",
        instructor_id: selectedInstructor,
        event_date_id: selectedEvent?.id?.toString() || "",
        dive_event_id: selectedEvent?.eventId?.toString() || "",
        div_school: selectedEvent?.diveSchool?.toString() || "",
        location: selectedEvent?.diveSiteName?.toString() || "",
      }
      onEventSelect(payload)
    }
  }, [selectedInstructor, selectedEvent, canProceed, onEventSelect])

  const slotBadgeClass = (slots: number) =>
    slots > 5
      ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
      : slots > 0
        ? "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400"
        : "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400"

  return (
    <div className="w-full space-y-4">

      {/* ═══════════════════════════════════
          CALENDAR CARD
      ═══════════════════════════════════ */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-tight uppercase">
              {moment(currentDate).format("MMMM YYYY")}
            </h2>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
              {daysWithEvents.size > 0
                ? `${daysWithEvents.size} available day${daysWithEvents.size > 1 ? "s" : ""}`
                : "No events this month"}
            </p>
          </div>
          <div className="flex gap-0.5">
            <button
              onClick={() => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)); setSelectedDate(null); setSelectedEvent(null); setSelectedInstructor("") }}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)); setSelectedDate(null); setSelectedEvent(null); setSelectedInstructor("") }}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 px-2 pt-2 pb-1">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-center text-[9px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest pb-1.5">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid — compact cells */}
        <div className="grid grid-cols-7 gap-px bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-100 dark:border-zinc-800">
          {/* Empty leading cells */}
          {emptyDays.map((_, i) => (
            <div key={`e-${i}`} className="bg-white dark:bg-zinc-900 min-h-[56px]" />
          ))}

          {days.map((day) => {
            const dayEvents = daysWithEvents.get(day) || []
            const hasEvent  = dayEvents.length > 0
            const selected  = isSelectedDay(day)
            const todayFlag = isToday(day)

            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={[
                  "relative min-h-[56px] p-1 flex flex-col transition-all duration-150",
                  hasEvent ? "cursor-pointer" : "cursor-default",
                  selected
                    ? "bg-blue-600 dark:bg-blue-600"
                    : hasEvent
                      ? "bg-white dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                      : "bg-white dark:bg-zinc-900",
                ].join(" ")}
              >
                {/* Day number */}
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={[
                      "text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full",
                      selected
                        ? "text-white"
                        : todayFlag
                          ? "bg-blue-600 text-white"
                          : hasEvent
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-300 dark:text-zinc-700",
                    ].join(" ")}
                  >
                    {day}
                  </span>
                  {/* Slot count badge for days with events */}
                  {hasEvent && !selected && (
                    <span className="text-[8px] font-bold px-1 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                      {dayEvents.reduce((acc, e) => acc + e.remaining_slots, 0)}
                    </span>
                  )}
                </div>

                {/* Event name chips — shown directly on the calendar cell */}
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  {dayEvents.slice(0, 1).map((ev, i) => (
                    <div
                      key={i}
                      className={[
                        "text-[8px] font-medium px-1 py-0.5 rounded truncate leading-tight",
                        selected
                          ? "bg-white/20 text-white"
                          : "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300",
                      ].join(" ")}
                      title={ev.eventName}
                    >
                      {ev.eventName}
                    </div>
                  ))}
                  {dayEvents.length > 1 && (
                    <div className={`text-[7px] font-semibold px-1 ${selected ? "text-white/70" : "text-blue-400 dark:text-blue-500"}`}>
                      +{dayEvents.length - 1}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-blue-100 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-500/40" />
            <span className="text-[9px] text-zinc-500 dark:text-zinc-400">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-blue-600" />
            <span className="text-[9px] text-zinc-500 dark:text-zinc-400">Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-[9px] text-zinc-500 dark:text-zinc-400">Today</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════
          DETAIL PANEL — appears after date pick
      ═══════════════════════════════════ */}
      {isLoading && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-center">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 animate-pulse">Loading dive events…</p>
        </div>
      )}

      {!isLoading && allEvents.length === 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-center">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">No dive events available</p>
        </div>
      )}

      {selectedDate && selectedDateEvents.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

          {/* Panel header */}
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-blue-50 dark:bg-blue-500/10">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">
              {moment(selectedDate).format("dddd, MMMM D, YYYY")}
            </p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-0.5">
              {selectedDateEvents.length} event{selectedDateEvents.length > 1 ? "s" : ""} available
            </p>
          </div>

          <div className="p-4 space-y-4">

            {/* ── Event selector (if multiple) ── */}
            {selectedDateEvents.length > 1 && (
              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                  Select Event
                </label>
                <div className="space-y-2">
                  {selectedDateEvents.map((event, idx) => {
                    const isActive = selectedEvent?.eventId === event.eventId && selectedEvent?.id === event.id
                    return (
                      <button
                        key={idx}
                        onClick={() => { setSelectedEvent(event); setSelectedInstructor("") }}
                        className={[
                          "w-full text-left p-2.5 rounded-lg border transition-all duration-150",
                          isActive
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                            : "border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[12px] font-semibold ${isActive ? "text-blue-700 dark:text-blue-300" : "text-zinc-900 dark:text-zinc-100"}`}>
                            {event.eventName}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${slotBadgeClass(event.remaining_slots)}`}>
                              {event.remaining_slots}
                            </span>
                            {isActive && <CheckCircle2 size={13} className="text-blue-500" />}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── Fields revealed after event is selected ── */}
            {selectedEvent && (
              <div className="space-y-3">

                {/* Event summary row */}
                <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                    <School size={11} className="text-zinc-400 dark:text-zinc-500" />
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{selectedEvent.diveSchoolName}</span>
                  </div>
                  {selectedEvent.diveSiteName && (
                    <div className="flex items-center gap-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                      <MapPin size={11} className="text-zinc-400 dark:text-zinc-500" />
                      <span>{selectedEvent.diveSiteName}</span>
                    </div>
                  )}
                </div>

                {/* Instructor dropdown */}
                <div>
                  <label className="flex items-center gap-1 text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest mb-1">
                    <User size={9} />
                    Instructor
                    {instructorOptions.length > 0 && <span className="text-red-400">*</span>}
                  </label>
                  {instructorOptions.length > 0 ? (
                    <select
                      value={selectedInstructor}
                      onChange={(e) => setSelectedInstructor(e.target.value)}
                      className="w-full h-10 px-3 py-2 text-[12px] border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath fill='%23666' d='M8.357 5.522a3.333 3.333 0 0 1-4.581.126l-.133-.126L.41 2.089A.833.833 0 0 1 1.51.84l.078.07L4.82 4.342c.617.617 1.597.65 2.251.098l.106-.098L10.411.91a.833.833 0 0 1 1.248 1.1l-.07.079-3.232 3.433Z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '12px',
                        paddingRight: '2.5rem',
                      }}
                    >
                      <option value="">Select an instructor…</option>
                      {instructorOptions.map((i: any) => (
                        <option key={i.value} value={i.value}>{i.label}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-[12px] text-zinc-400 dark:text-zinc-500 italic">
                      No instructors listed
                    </div>
                  )}
                </div>


              </div>
            )}

            {/* Prompt to select event if multiple and none chosen yet */}
            {!selectedEvent && selectedDateEvents.length > 1 && (
              <p className="text-[10px] text-center text-zinc-400 dark:text-zinc-500 italic">
                Select an event above to see details
              </p>
            )}
          </div>
        </div>
      )}

      {/* No events on selected date */}
      {selectedDate && selectedDateEvents.length === 0 && !isLoading && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-center">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            No events on {moment(selectedDate).format("MMMM D")} — try another date
          </p>
        </div>
      )}
    </div>
  )
}