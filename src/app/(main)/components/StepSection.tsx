import RightArrowIcon from "@/app/icons/RightArrow";
import { Button } from "@/components/core";
import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  isActive?: boolean;
  isCompleted?: boolean;
  showDot?: boolean;
}

interface StepsGuideProps {
  steps: Step[];
  onGetStarted?: () => void;
}

const StepSection = () => {
  const stepsData = [
    {
      number: "01",
      title: "Quick Sign-up",
      description: "It'll take you 2 minutes max.",
      isActive: true,
      isCompleted: false,
      showDot: true,
    },
    {
      number: "02",
      title: "Security Setup",
      description: "It'll take you 2 minutes max.",
      isActive: false,
      isCompleted: true,
      showDot: true,
    },
    {
      number: "03",
      title: "Deposit",
      description: "Fund your wallet via your deposit options",
      isActive: false,
      isCompleted: false,
      showDot: false,
    },
    {
      number: "04",
      title: "Start Investing",
      description:
        "Start investing at your preferred rate and wait for your return on investment.",
      isActive: false,
      isCompleted: false,
      showDot: false,
    },
    {
      number: "05",
      title: "Withdraw",
      description: "Withdraw your funds from your wallet.",
      isActive: false,
      isCompleted: false,
      showDot: false,
    },
    {
      number: "06",
      title: "Success",
      description: "Enjoy your Return on Investment",
      isActive: false,
      isCompleted: false,
      showDot: false,
    },
  ];

  return (
    <div className=" rounded-[3.25rem] md:rounded-t-[9.375rem] bg-[position:center] bg-[#02010d] w-full  bg-[url('/images/homepage/map.svg')] rounded-md bg-no-repeat bg-opacity-50">
      <div className=" px-6 bg-no-repeat bg-cover h-full md:px-[2rem] pt-[2rem] sm:pt-[4.5rem] pb-5 xl:pb-[50px] xl:px-[4.5rem]">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-verdana font-bold max-xxscren:text-[3rem] text-[2rem] sm:text-[3rem] lg:text-[7.5rem] text-white text-opacity-10 leading-none">
            GET STARTED
          </h2>
          <p className="font-outfit font-bold text-xl sm:text-[1.5rem] lg:text-[3rem] max-w-[53.125rem] text-white -mt-5 leading-[3rem] sm:leading-[3.5rem]">
            Simple Steps to Get Started
          </p>
        </div>

        <div className="relative flex justify-center items-center flex-col w-full mt-3">
          <div className="relative grid gap-5 sm:gap-14 items-start mt-9 w-full lg:max-w-[700px] 2xl:max-w-[900px]">
            {/* Vertical line */}
            <div
              className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#1E40AF] via-white to-[#1E40AF] z-10"
              style={{
                top: "30px",
                bottom: "0",
              }}
            />

            {stepsData?.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row ${
                  index % 2 !== 0 ? "sm:flex-row-reverse" : ""
                } w-full items-center`}
              >
                {/* Dot */}
                {step?.showDot && (
                  <div className="hidden sm:block absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        step.isActive
                          ? "bg-[#1E40AF] border-[#1E40AF]"
                          : step.isCompleted
                          ? "bg-white border-white"
                          : "bg-transparent border-gray-600"
                      }`}
                    ></div>
                  </div>
                )}

                {/* Step Content */}
                <div
                  className={`w-full sm:w-1/2 ${
                    index % 2 === 0 ? "sm:pr-16" : "sm:pl-16"
                  } flex flex-col items-center sm:items-${
                    index % 2 === 0 ? "end" : "start"
                  } mt-6 sm:mt-0`}
                >
                  <div
                    className={`flex flex-col items-center sm:items-${
                      index % 2 === 0 ? "end" : "start"
                    } w-full`}
                  >
                    <div className="grid grid-cols-[1fr_4fr] items-start gap-x-4 w-full">
                      <span className="font-verdana text-[1.5rem] sm:text-[2rem] text-white text-opacity-30 font-bold shrink-0 leading-none">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="font-verdana text-white text-base sm:text-[1.2rem] 2xl:text-[2rem] font-bold">
                          {step.title}
                        </h3>
                        <p className="text-white mt-1 text-opacity-30 font-outfit text-sm md:text-base 2xl:mt-2">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opposite side spacing */}
                <div className="hidden sm:block sm:w-1/2"></div>
              </div>
            ))}
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center mt-6 py-6">
            <Button className="flex items-center gap-2 bg-white text-[#0A0B20] hover:bg-gray-200 transition-colors px-6 py-2 rounded-10 font-bold">
              Get Started
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#2B3AA6" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.735 8.73516C12.8053 8.66493 12.9006 8.62549 13 8.62549C13.0994 8.62549 13.1947 8.66493 13.265 8.73516L16.265 11.7352C16.3352 11.8055 16.3747 11.9008 16.3747 12.0002C16.3747 12.0995 16.3352 12.1948 16.265 12.2652L13.265 15.2652C13.2307 15.302 13.1893 15.3316 13.1433 15.352C13.0973 15.3725 13.0476 15.3836 12.9973 15.3845C12.9469 15.3853 12.8969 15.3761 12.8502 15.3572C12.8035 15.3384 12.7611 15.3103 12.7255 15.2747C12.6899 15.2391 12.6618 15.1967 12.6429 15.15C12.6241 15.1033 12.6148 15.0532 12.6157 15.0029C12.6166 14.9525 12.6276 14.9029 12.6481 14.8569C12.6686 14.8109 12.6982 14.7695 12.735 14.7352L15.095 12.3752H8C7.90054 12.3752 7.80516 12.3356 7.73483 12.2653C7.66451 12.195 7.625 12.0996 7.625 12.0002C7.625 11.9007 7.66451 11.8053 7.73483 11.735C7.80516 11.6647 7.90054 11.6252 8 11.6252H15.095L12.735 9.26516C12.6648 9.19485 12.6253 9.09953 12.6253 9.00016C12.6253 8.90078 12.6648 8.80547 12.735 8.73516Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSection;
