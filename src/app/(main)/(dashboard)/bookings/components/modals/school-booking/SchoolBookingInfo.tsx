"use client";
import { schoolBookingInfoTranslations } from "@/app/(main)/translation/bookingTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import React, { useState } from "react";

import { CalendarSelectionState } from "@/app/(main)/(dashboard)/manage-certifications/components/DiveEventCalendar";

interface Props {
  next: () => void;
  back: () => void;
  lang?: "en" | "es" | "fr" | "nl";
  schoolBookingData?: {
    dive_level: string;
    instructor_id?: string;
    event_date_id: string;
    dive_event_id: string;
    div_school: string;
    location: string;
  };
  onUpdateBookingData?: (data: any) => void;
  calendarState?: CalendarSelectionState;
}

const SchoolBookingInfo = ({ back, next, schoolBookingData, onUpdateBookingData, calendarState }: Props) => {
  const {language}=useLanguage()
  const t = schoolBookingInfoTranslations[language] ||schoolBookingInfoTranslations.en;
  const [selectedPlan, setSelectedPlan] = useState<string>("1");
  const [bookingData, setBookingData] = useState<any>(schoolBookingData || {});

  const selected = t.divePlans.find((plan) => plan?.id === selectedPlan);

  const schoolName = calendarState?.selectedEvent?.dive_school_name || bookingData.div_school || "—";
  const instructorName = calendarState?.selectedEvent?.dive_instructors?.find(
    (i: any) => String(i.id) === calendarState?.selectedInstructor
  )?.name || "—";

  return (
    <div className="bg-transparent h-full p-6 rounded-lg shadow">
      <div className="overflow-y-auto max-h-[calc(84vh-160px)]">
        {/* Event Details Input Fields */}
        {schoolBookingData && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-4 uppercase tracking-widest">Event Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Dive School - Read Only */}
              <div>
                <label className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-2 block">Dive School</label>
                <div className="w-full px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-medium">
                  {schoolName}
                </div>
              </div>
              {/* Dive Site / Location - Read Only */}
              <div>
                <label className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-2 block">Dive Site</label>
                <div className="w-full px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-medium">
                  {bookingData.location || "—"}
                </div>
              </div>
              {/* Dive Level */}
              <div>
                <label className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-2 block">Dive Level</label>
                <select
                  value={bookingData.dive_level || ""}
                  onChange={(e) => {
                    const updated = { ...bookingData, dive_level: e.target.value };
                    setBookingData(updated);
                    onUpdateBookingData?.(updated);
                  }}
                  className="w-full px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-[#192c5b] text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath fill='%23666' d='M8.357 5.522a3.333 3.333 0 0 1-4.581.126l-.133-.126L.41 2.089A.833.833 0 0 1 1.51.84l.078.07L4.82 4.342c.617.617 1.597.65 2.251.098l.106-.098L10.411.91a.833.833 0 0 1 1.248 1.1l-.07.079-3.232 3.433Z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Select a dive level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              {/* Instructor ID - Read Only */}
              <div>
                <label className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-2 block">Instructor</label>
                <div className="w-full px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-medium">
                  {instructorName}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[10px] mb-6">
          {t.divePlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 relative ${
                selectedPlan === plan.id
                  ? "border-orange-500 shadow-lg shadow-orange-500/30"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="relative w-full h-40">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
                {selectedPlan === plan.id && (
                  <div className="absolute inset-0 bg-orange-500 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      ✓
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="grid w-full grid-cols-2">
              <h3 className="text-base font-medium ">{selected.title}</h3>
              <div className="text-base">
                {selected.subtitle}
                <p>{selected.description}</p>

                <p>
                  {selected.fullDescription}{" "}
                  <span className="text-orange-500 font-semibold cursor-pointer hover:text-orange-600">
                    {t.readMore}
                  </span>
                </p>
              </div>
            </div>

            <hr className="border-gray-300 dark:border-gray-700" />

            <div className="flex gap-4 flex-col text-base">
              <div className="grid grid-cols-2">
                <strong className="text-gray-900 dark:text-white block mb-1">
                  {t.whatsIncluded}
                </strong>
                <ul className="list-disc pl-5">
                  <li>{t.gear}</li>
                </ul>
              </div>
              <hr className="border-gray-300 dark:border-gray-700" />

              <div className="grid grid-cols-2">
                <strong className="text-gray-900 dark:text-white block mb-1">
                  {t.whatToBring}
                </strong>
                <ul className="list-disc pl-5">
                  {t.bringItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <hr className="border-gray-300 dark:border-gray-700" />

            <div className="grid grid-cols-2 text-base font-archivo">
              <strong className="text-gray-900 dark:text-white block mb-1">
                {t.pleaseNote}
              </strong>
              <p>
                {t.medicalStatementText.split(t.medicalStatementLink)[0]}
                <a
                  href="#"
                  className="text-orange-500 font-semibold underline hover:text-orange-600 transition-colors"
                >
                  {t.medicalStatementLink}
                </a>
                {t.medicalStatementText.split(t.medicalStatementLink)[1]}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 max-h-[10vh] border-gray-200 dark:border-gray-700 px-6 pt-4 bg-white dark:bg-gray-900">
        <button
          onClick={back}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {t.cancel}
        </button>
        <button
          onClick={() => next()}
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          {t.proceed}
        </button>
      </div>
    </div>
  );
};

export default SchoolBookingInfo;
