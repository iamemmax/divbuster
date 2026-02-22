"use client";
import React from "react";
import BuddiesAroundMe from "../components/BuddiesAroundMe";
import { useSearchContext } from "../layout";

export default function FindBuddy() {
  const search = useSearchContext();

  return <BuddiesAroundMe search={search} />;
}