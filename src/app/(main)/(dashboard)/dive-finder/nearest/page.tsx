"use client";
import React from "react";
import DiveSiteLeafletMap from "../components/DiveSiteLeafletMap";
import { useAuth } from "@/contexts/authentication";
import { useSearchContext } from "../layout";
import { useFetchAllDiveSites } from "../../api/div-sites/fetchDiveSiteNearMe";

export default function NearestDiveSites() {
  const { authState } = useAuth();
  const search = useSearchContext();
  
  const apiParams = {
    lang: authState?.user?.profile_details?.language || "en",
    search
  };

  const { data, isLoading } = useFetchAllDiveSites(apiParams);
  const diveSites = data?.data || data?.data || [];

  return <DiveSiteLeafletMap diveSites={diveSites} isLoading={isLoading} />;
}