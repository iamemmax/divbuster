import RightArrowIcon from '@/app/icons/RightArrow';
import React from 'react'

interface Step {
  number: string;
  title: string;
  description: string;
  isActive?: boolean;
  isCompleted?: boolean;
  showDot?:boolean
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
      isActive: true, // Blue dot
      isCompleted: false,
      showDot:true
    },
    { 
      number: "02", 
      title: "Security Setup", 
      description: "It'll take you 2 minutes max.",
      isActive: false,
      isCompleted: true, // White dot,
      showDot:true
    },
    { 
      number: "03", 
      title: "Deposit", 
      description: "Fund your wallet via your deposit options",
      isActive: false,
      isCompleted: false,
      showDot:false

    },
    { 
      number: "04", 
      title: "Start Investing", 
      description: "Start investing at your preferred rate and wait for your return on investment.",
      isActive: false,
      isCompleted: false,
      showDot:false    },
    { 
      number: "05", 
      title: "Withdraw", 
      description: "Withdraw your funds from your wallet.",
      isActive: false,
      isCompleted: false,
      showDot:false    },
    { 
      number: "06", 
      title: "Success", 
      description: "Enjoy your Return on Investment",
      isActive: false,
      isCompleted: false,
      showDot:false    }
  ];
  

  return (
    <>
      <div className='w-full'>
        <div className="bg-[#080628] w-full rounded-t-[150px] h-full px-4 md:px-[2rem] pt-[4.5rem] pb-5 xl:pb-[50px] xl:px-[4.5rem]">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="font-verdana font-bold text-[6rem] sm:text-[4rem] md:text-[7.5rem] text-white text-opacity-10 leading-none">
              GET STARTED
            </h2>
            <p className="font-outfit font-bold text-xl sm:text-[1.5rem] lg:text-[3rem] max-w-[53.125rem] text-white -mt-5 leading-[3rem] sm:leading-[3.5rem]">
              Simple Steps to Get Started
            </p>
          </div>
          
          <div className="bg-[url('/imagess/homepage/map.svg')] px-6 bg-no-repeat bg-cover">
            <div className="relative flex justify-center items-center flex-col w-full">
              {/* Steps container with the vertical line */}
              <div className="relative grid gap-10 items-start mt-9  w-full lg:max-w-[700px] 3xl:max-w-[900px] ">
                {/* Vertical line - Fixed positioning to align with first and last dots */}
                <div
  className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#1E40AF] via-white to-[#1E40AF] z-10"
  style={{
    top: '30px',  // 👈 Push this down as needed (try 40px–60px)
    bottom: '0'
  }}
/>
                
                {stepsData?.map((step, index) => (
                  <div 
                    key={index} 
                    className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  >
                    {/* Timeline dot - Centered precisely */}
                   {step?.showDot&& <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">

                      <div className={`w-5 h-5 rounded-full border-2 ${step.isActive ? 'bg-[#1E40AF]  border-[#1E40AF]' : step.isCompleted ? 'bg-white border-white' : 'bg-transparent border-gray-600'}`}></div>
                    </div>}
                    
                    {/* Content - alternating sides on larger screens */}
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-right' : 'md:pl-16 text-left'} flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                      <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-x-4 mb-0`}>
                        <h3 className="font-verdana max-xxscren:text-sm text-base sm:text-[1.5rem] 2xl:text-[2rem] font-bold text-white order-1">{step.title}</h3>
                        <span className={`font-verdana text-[2rem] text-white text-opacity-30 font-bold ${index % 2 === 0 ? 'order-0' : 'order-1'}`}>{step.number}</span>
                      </div>
                      <p className="text-white text-opacity-30 max-xxscren:text-xs font-outfit text-sm md:text-base max-w-[250px] 2xl:max-w-[330px]">{step?.description}</p>
                    </div>
                    
                    {/* Empty div for spacing on the other side */}
                    <div className="hidden md:block w-1/2"></div>
                  </div>
                ))}
              </div>
              
              {/* Get Started button */}
              <div className="flex justify-center mt-6">
                <button 
                  // onClick={onGetStarted} 
                  className="flex items-center gap-2 bg-white text-[#0A0B20] hover:bg-gray-200 transition-colors px-6 py-3 rounded-full font-bold"
                >
                  Get Started
                  <span className="bg-[#1E40AF] rounded-full p-1">
                    <RightArrowIcon className="text-white" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StepSection