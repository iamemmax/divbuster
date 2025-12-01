"use client";
import React from "react";
import { useFetchAllBuddies } from "../../api/buddy/fetchBudies";
import CreateBuddyPlanMap from "../components/CreateBuddyPlanMap";
import { Language } from "@/app/(auth)/sign-up/translations";
import { useAuth } from "@/contexts/authentication";

export default function CreateDivePlan() {
  const { authState } = useAuth();
  const language: Language = (authState?.user?.profile_details?.language as Language);

  const { 
    data: buddyList,
    isLoading,
  } = useFetchAllBuddies(language);

  const diveBuddirsData = buddyList?.results || [];

  return (
    <CreateBuddyPlanMap 
      buddyList={diveBuddirsData} 
      isLoading={isLoading} 
    />
  );
}