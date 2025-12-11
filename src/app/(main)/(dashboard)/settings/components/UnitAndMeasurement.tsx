


"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import DistantantMeasurement from "./measurement/DistantantMeasurement";
import WeightMeasurement from "./measurement/WeightMeasurement";
import TemperatureMeasurement from "./measurement/TemperatureMeasurement";
import HeightAndBodyMeasurement from "./measurement/HeightANdBodyMeasurement";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { X } from "lucide-react";
import { UniteMesurementSidebartranslations } from "@/app/(main)/translation/profileTranslation";
import { Language } from "@/app/(auth)/sign-up/translations";

// Props
interface Prop {
  user: User | null;
  language:Language
}

// Translations


const UnitAndMeasurement = ({ user ,language}: Prop) => {
  const [activeSection, setActiveSection] = useState("temperature-measurement");
   const t = UniteMesurementSidebartranslations[language] || UniteMesurementSidebartranslations?.en;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const sidebarItems = [
    {
      id: "temperature-measurement",
      title: t.temperature,
      subtitle: t.temperatureSub,
    },
    // Uncomment if needed
    // {
    //   id: "distance-measurement",
    //   title: t.distance,
    //   subtitle: t.distanceSub,
    // },
    // {
    //   id: "weight-measurement",
    //   title: t.weight,
    //   subtitle: t.weightSub,
    // },
    {
      id: "height-measurement",
      title: t.height,
      subtitle: t.heightSub,
    },
  ];

  const renderComponent = () => {
    switch (activeSection) {
      case "temperature-measurement":
        return <TemperatureMeasurement user={user} language={language} />;
      // case "distance-measurement":
      //   return <DistantantMeasurement />;
      // case "weight-measurement":
      //   return <WeightMeasurement />;
      case "height-measurement":
        return <HeightAndBodyMeasurement user={user} language={language} />;
      default:
        return <DistantantMeasurement />;
    }
  };

  return (
    <div className="flex flex-col xl:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
      
      {/* Mobile Menu Toggle - Floating Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="xl:hidden fixed bottom-4 right-4 z-50 bg-[#F7931D] text-white p-3 rounded-full shadow-lg hover:bg-[#E8841A] transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Mobile Modal Sidebar */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-lg max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-archivo">Measurement Menu</h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(70vh-80px)] p-4 md:pl-[18.5rem] space-y-3">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    activeSection === item.id
                      ? "border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:text-white"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.subtitle}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden xl:block w-full max-w-md mt-10 shadow-sm dark:shadow-gray-900/20 rounded-lg">
        <div className="pb-3 max-w-xs">
          <h2 className="font-archivo text-black dark:text-white font-medium text-xl">
            <span className="text-[#71717A] dark:text-gray-400">
              {t.greeting}, {user?.first_name}
            </span>
            , {t.setup}
          </h2>
        </div>
        <div className="space-y-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeSection === item.id
                  ? "border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`font-medium text-sm ${
                      activeSection === item.id
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.subtitle}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(70vh-0rem)] md:p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-900/20">

        {renderComponent()}
      </div>
    </div>
  );
};

export default UnitAndMeasurement;


