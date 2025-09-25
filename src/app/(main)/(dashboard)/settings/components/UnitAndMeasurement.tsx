


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
    <div className="flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
      
      {/* Mobile Sidebar Modal */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="bg-white dark:bg-gray-900 w-full p-6 space-y-4 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="font-archivo text-black dark:text-white font-medium text-lg">
                {t.greeting}, {user?.first_name}
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-red-500 mb-8 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t.setup}
            </p>
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  activeSection === item.id
                    ? "border-orange-300 bg-orange-50 dark:border-orange-600 dark:bg-orange-900/20"
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
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-full max-w-md mt-10 shadow-sm dark:shadow-gray-900/20 rounded-lg">
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
        {/* Toggle button for mobile */}
        <div className="md:hidden md:mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm"
          >
            Open Menu
          </button>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default UnitAndMeasurement;


