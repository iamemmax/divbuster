"use client";
import CardHeadIcon from "@/app/icons/(dashboard)/CardHeadIcon";
import { cn } from "@/utils/classNames";
import React, { useState } from "react";
import { Check } from "lucide-react"; // ✅ checkmark icon
import { Button } from "@/components/core";

interface prop{
    setStep: React.Dispatch<React.SetStateAction<number>>
     setSelectedCard: React.Dispatch<React.SetStateAction<string | null>>
     selectedCard:string | null
}
const SelectCertificationType = ({setStep,setSelectedCard, selectedCard}:prop) => {
 

  const CERTIFICATE_TYPE_CHOICES = [
    { value: "intro", label: "Intro", bg: "#1E3A8A", text: "#FFFFFF" },
    { value: "try", label: "Try", bg: "#7F1D1D", text: "#FFFFFF" },
    { value: "snorkel", label: "Snorkel", bg: "#065F46", text: "#FFFFFF" },
    { value: "free", label: "Free", bg: "#1F2937", text: "#FFFFFF" },
    { value: "adv_free", label: "Advanced Free", bg: "#4C1D95", text: "#FFFFFF" },
    { value: "master_free", label: "Master Free", bg: "#78350F", text: "#FFFFFF" },
    { value: "scuba", label: "Scuba", bg: "#0F172A", text: "#FFFFFF" },
    { value: "open", label: "Open Water", bg: "#1E40AF", text: "#FFFFFF" },
    { value: "adv_open", label: "Advanced Open", bg: "#4338CA", text: "#FFFFFF" },
    { value: "rescue", label: "Rescue", bg: "#9F1239", text: "#FFFFFF" },
    { value: "master", label: "Master", bg: "#312E81", text: "#FFFFFF" },
    { value: "fun", label: "Fun Dive", bg: "#064E3B", text: "#FFFFFF" },
    { value: "adv_adventurer", label: "Advanced Adventurer", bg: "#581C87", text: "#FFFFFF" },
    { value: "nitrox", label: "Nitrox", bg: "#064E3B", text: "#FFFFFF" },
    { value: "deep", label: "Deep", bg: "#0C4A6E", text: "#FFFFFF" },
    { value: "wreck", label: "Wreck", bg: "#374151", text: "#FFFFFF" },
    { value: "night", label: "Night", bg: "#000000", text: "#FFFFFF" },
    { value: "ppb", label: "Peak Performance Buoyancy", bg: "#4A044E", text: "#FFFFFF" },
    { value: "dry", label: "Dry Suit", bg: "#115E59", text: "#FFFFFF" },
    { value: "search_recover", label: "Search & Recovery", bg: "#7C2D12", text: "#FFFFFF" },
    { value: "nav", label: "Navigation", bg: "#713F12", text: "#FFFFFF" },
    { value: "photo", label: "Photography", bg: "#831843", text: "#FFFFFF" },
    { value: "cmas1", label: "CMAS 1", bg: "#1E3A8A", text: "#FFFFFF" },
    { value: "cmas2", label: "CMAS 2", bg: "#1D4ED8", text: "#FFFFFF" },
    { value: "cmas3", label: "CMAS 3", bg: "#2563EB", text: "#FFFFFF" },
    { value: "tech40", label: "Tech 40", bg: "#134E4A", text: "#FFFFFF" },
    { value: "tech45", label: "Tech 45", bg: "#0D9488", text: "#FFFFFF" },
    { value: "tech50", label: "Tech 50", bg: "#0F766E", text: "#FFFFFF" },
    { value: "sidemount", label: "Sidemount", bg: "#312E81", text: "#FFFFFF" },
    { value: "trimix", label: "Trimix", bg: "#7F1D1D", text: "#FFFFFF" },
    { value: "adv_trimix", label: "Advanced Trimix", bg: "#991B1B", text: "#FFFFFF" },
    { value: "cave", label: "Cave", bg: "#3F3F46", text: "#FFFFFF" },
    { value: "rebreather", label: "Rebreather", bg: "#334155", text: "#FFFFFF" },
    { value: "dive_master", label: "Dive Master", bg: "#14532D", text: "#FFFFFF" },
    { value: "assistant_instructor", label: "Assistant Instructor", bg: "#854D0E", text: "#FFFFFF" },
    { value: "instructor", label: "Instructor", bg: "#CA8A04", text: "#000000" },
    { value: "staff_instructor", label: "Staff Instructor", bg: "#B45309", text: "#FFFFFF" },
    { value: "course_director", label: "Course Director", bg: "#9A3412", text: "#FFFFFF" },
  ];

  return (
    <div className="p-3 md:p-8">
      <div className="grid lg:grid-cols-2 max-h-[75vh] overflow-y-auto gap-5">
        {CERTIFICATE_TYPE_CHOICES.map((card) => {
          const isSelected = selectedCard === card.value;
          return (
            <div
              key={card.value}
              className={cn(
                `flex flex-col z-50 relative gap-4 
                rounded-[1.1944rem] p-2 md:px-[1.125rem] py-4 cursor-pointer
                bg-[url('/images/card-parttern3.svg')] bg-no-repeat bg-cover
                transition duration-200`,
                isSelected ? "ring-4 ring-yellow-400 scale-90" : "hover:scale-90"
              )}
              style={{
                backgroundColor: card.bg,
                color: card.text,
              }}
              onClick={() => setSelectedCard(card.value)}
            >
              {/* ✅ Checkmark overlay */}
              {isSelected && (
                <div className="absolute top-3 right-3 bg-yellow-400 rounded-full p-1 shadow-lg">
                  <Check className="h-10 w-10 text-black" />
                </div>
              )}

              <div className="flex justify-between items-start">
                <p className="text-sm font-medium font-archivo">Certificate</p>
                <div className="h-[2.1437rem] mt-2 flex items-center justify-center w-[2.1437rem] border border-white rounded-full">
                  <CardHeadIcon />
                </div>
              </div>

              <div>
                <p className="text-xs font-medium font-archivo">Issuer:</p>
                <p className="text-lg font-semibold font-archivo">{card.label}</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[11.47px] font-medium font-archivo">
                    Diver No: 32648490494
                  </p>
                  <p className="text-xl font-semibold font-archivo">
                    {card.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proceed button */}
      <div className="mt-6 flex justify-end">
        <Button
          className={cn(
            "px-6  rounded-lg font-semibold transition-colors",
            selectedCard
              ? "bg-orange-500 text-white hover:bg-orange-700"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          )}
          disabled={!selectedCard}
          onClick={()=>setStep(2)}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default SelectCertificationType;
