"use client";
import React from "react";
import { useUser } from "@/app/(auth)/api/getAuthenticatedUser";
import { useFetchBuddyList } from "../../api/buddy/fetchBudies";
import CreateBuddyPlanMap from "../components/CreateBuddyPlanMap";
import { Language } from "@/app/(auth)/sign-up/translations";

export default function CreateDivePlan() {
  const { data: user } = useUser();
  const language: Language = (user?.data?.profile_details?.language as Language);

  const { 
    data: buddyList, 
    fetchNextPage: FetchBuddyNextPage,
    hasNextPage: hasNextBuddyPage,
    isFetchingNextPage: isFetchBuddyNextPage,
  } = useFetchBuddyList(language);

  const diveBuddirsData = buddyList?.pages?.flatMap((page) => page?.results) || [];

  return (
    <CreateBuddyPlanMap 
      buddyList={diveBuddirsData} 
      fetchNextPage={FetchBuddyNextPage} 
      isFetchingNextPage={isFetchBuddyNextPage} 
      hasNextPage={hasNextBuddyPage} 
    />
  );
}