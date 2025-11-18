"use client";
import React, { useState } from "react";
import { useUser } from "@/app/(auth)/api/getAuthenticatedUser";
import { useFetchDiveSites } from "../../api/div-sites/fetch-dive-sites";
import DiveSiteLeafletMap from "../components/DiveSiteLeafletMap";

export default function NearestDiveSites() {
  const { data: user } = useUser();
  const [search, setSearch] = useState("");
  
  const apiParams = {
    lang: user?.data?.profile_details?.language || "en",
    favorite: "",
    search,
    paginate: "no"
  };

  const { data } = useFetchDiveSites(apiParams);
  const diveSites = data?.pages?.flatMap((page) => page?.data?.results || page?.data) || [];

  return <DiveSiteLeafletMap diveSites={diveSites} />;
}