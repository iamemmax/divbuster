"use client";
import { schoolBookingInfoTranslations } from "@/app/(main)/translation/bookingTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import React, { useState } from "react";

interface Props {
  next: () => void;
  back: () => void;
  lang?: "en" | "es" | "fr" | "nl";
}

const SchoolBookingInfo = ({ back, next, lang = "en" }: Props) => {
  const {language}=useLanguage()
  const t = schoolBookingInfoTranslations[language] ||schoolBookingInfoTranslations.en;
  const [selectedPlan, setSelectedPlan] = useState<string>("1");

  const selected = t.divePlans.find((plan) => plan?.id === selectedPlan);

  return (
    <div className="bg-transparent h-full p-6 rounded-lg shadow">
      <div className="overflow-y-auto max-h-[calc(84vh-160px)]">
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
