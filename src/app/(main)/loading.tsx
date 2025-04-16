"use client";

import React from "react";
import LoadingAnimation from "./components/animation/LoadingAnimation";

const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999999999999999999] flex items-center justify-center bg-white">
      <LoadingAnimation size={150} />
    </div>
  );
};

export default FullPageLoader;
