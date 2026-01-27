"use client";
import React from "react";
import CreateBuddyPlanMap from "../components/CreateBuddyPlanMap";
import { Language } from "@/app/(auth)/sign-up/translations";
import { useAuth } from "@/contexts/authentication";
import { useLanguage } from "@/hooks/useLanguage";
import { useFetchAllBuddies } from "../../api/buddy/fetchBudies";

export default function CreateDivePlan() {
  const {language}=useLanguage()

  const { 
    data: buddyList,
    isLoading,
  } = useFetchAllBuddies(language);

  const diveBuddirsData = buddyList?.data || [];

  return (
    <CreateBuddyPlanMap 
      buddyList={diveBuddirsData} 
      isLoading={isLoading} 
    />
  );
}