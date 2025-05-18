"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/animations/loading-animation.json";

const FullPageLoader: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-40 h-40">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
};

export default FullPageLoader;
