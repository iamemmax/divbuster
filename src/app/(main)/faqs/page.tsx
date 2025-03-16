"use client"
import React, { useState } from 'react'
// import { LandingHeader } from '@/components/layout/landingheader'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/core'

import Image from 'next/image'
import { cn } from '@/utils/classNames'
import { CaretDown, Icon } from '@/components/icons'
import CreatepasswordModal from '../misc/components/insurance/modals/remital/CreatePassWordModal'
import CheckPhoneNumber from '../misc/components/insurance/modals/CheckPhoneNumber'
import NonRemitalModal from '../misc/components/insurance/modals/non-remital/NonRemitalModal'
import RemitalModalDetails from '../misc/components/insurance/modals/remital/RemitalModalDetails'
import RemitalPlanModal from '../misc/components/insurance/modals/remital/RemitalPlanModal'
import RemitalUserDetails from '../misc/components/insurance/modals/remital/RemitalUserDetails'
import GetInsuranceButton from '../misc/components/GetIsuranceButton'



export default function page() {

  const FAQs = [
    {
      question: "What is Liberty Life?",
      answer: "Liberty life is a subsidiary of Liberty Assured and we are committed at providing comprehensive health coverage for all our customers."
    },
    {
      question: "What does Liberty Life cover?",
      answer: "Our plans cover a wide range of healthcare services, from basic needs like doctor consultations, medications, and hospitalization to fitness programs and mental healthservices, ensuring all your essential health needs are met."
    },
    {
      question: "Can i register or connect to an agent if i have no data or smartphone?",
      answer: "Yes, you can! With Liberty Life, you don't need data or a smartphone to register or connect with an agent. Simply dial *347*180*9# on any mobile phone and you are good to go!"
    },
    {
      question: "How does Liberty Life support corporations and businesses?",
      answer: "Corporations and businesses can offer Liberty Life as a benefit to their employees or staff, providing them with affordable health coverage and peace of mind."
    },
    {
      question: "Who is eligible to subscribe to Liberty Life's plan? ",
      answer: "All Nigerians with a BVN are eligible to subscribe to our plans. It's especially designed for low-income earners and those who may not have access to traditional health insurance."
    },
    {
      question: "How affordable are your health plans?",
      answer: "The premiums are tailored to be budget friendly for the average Nigerian, starting as low 3,000 Naira. With flexible payment options, you can easily access comprehensive healthcare coverage."
    },
    {
      question: "What makes Liberty Life x NEM Health different from other health insurance plans?",
      answer: "It is specifically designed for affordability and accessibility.It's tailored for low-income earners and those without access to traditional health insurance, and it's easy to register using the USSD code *347*180*9#."
    },
    {
      question: "Would I have 24/7 access to customer support?",
      answer: "Liberty Life offers dedicated service managers to assist with onboarding, customer support, and retention, ensuring a smooth and positive experience for all potential, new and existing customers. "
    },
  ]




  return (
    <main className='bg-main text-white h-full size-full py-5 px-6 md:max-lg:px-16 lg:px-12 xl:px-[120px]'>
      <div className='flex flex-col lg:flex-row justify-between mt-16'>
        <div className='md:basis-1/2'>
          <button className='capitalize flex justify-center items-center rounded-full pl-6 pr-[78px] py-4 bg-[#34307A] bg-opacity-[20%] text-[14px] font-semibold gap-2'>
            <Icon />
            FAQs
          </button>
          <div className='gap-3 sm:mt-5 mt-10'>
            <p className='text-2xl sm:text-[40px] font-medium w-full max-w-[625px] sm:leading-snug'>
              Get quick help and answers to frequently asked questions.
            </p>
            <p className='max-w-[572px] sm:leading-7 text-xs pt-5 md:text-[19px] text-[#CAC9D4] font-sans'>
              Get answers to everything you need to know about Liberty life.
              Can&apos;t find the answer you are looking for? Please contact us.
            </p>
          </div>
        </div>
        <div className=' md:basis-1/2 overflow-hidden max-md:mt-6 max-md:max-w-[400px]'>
          <Image
            src="/images/faqs/box-gradient.png"
            width={289}
            height={259}
            className='scale-150 md:w-[500px] md:h-[500px]'
            alt=''
            objectFit='contain'
          />
         
        </div>
      </div>
      <div className='mt-10 md:-mt-10 flex flex-col md:flex-row gap-4'>
        <ul className='flex flex-col gap-3 basis-1/2'>
          {
            FAQs.slice(0, 4).map((faq, index) => {
              const [isOpen, setIsOpen] = useState(false)

              return (
                <Collapsible key={index}>
                  <CollapsibleTrigger className='flex items-center text-left justify-between bg-[#ffffff11] p-4 md:p-7 rounded-lg text-xs md:text-[14px] lg:text-[15px] font-normal w-full font-sans'onClick={() => setIsOpen(!isOpen)} >
                    {faq.question}
                    <CaretDown className={cn(isOpen && "rotate-180")} />
                  </CollapsibleTrigger>

                  <CollapsibleContent className='bg-white  md:pt-5 py-2 md:pb-6 pl-4 md:pl-8 pr-5 md:pr-11 rounded-lg text-sm text-[#242424CC] font-sans'>
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              )
            })
          }

        </ul>
        <ul className='flex flex-col gap-3 basis-1/2'>
          {
            FAQs.slice(4, 8).map((faq, index) => {
              const [isOpen, setIsOpen] = useState(false)

              return (
                <Collapsible key={index} open={isOpen}>
                  <CollapsibleTrigger
                    className='flex items-center text-left justify-between bg-[#ffffff11] p-4 md:p-7 rounded-lg text-xs md:text-[13px] lg:text-[15px] font-normal w-full font-sans '
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {faq.question}
                    <CaretDown className={cn(isOpen && "rotate-180")} />
                  </CollapsibleTrigger>

                  <CollapsibleContent className='bg-white  md:pt-5 py-2 md:pb-6 pl-4 md:pl-8 pr-5 md:pr-11 rounded-lg text-sm text-[#242424CC] font-sans'>
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              )
            })
          }

        </ul>
      </div>

      <div className='mb-[12rem] mt-6 md:my-14 md:mt-[5rem]'>
        <div className='md:flex flex-row bg-[#FFFFFF0D] gap-36 pt-4 pb-6 sm:py-3 items-center justify-center pr-16 pl-6 rounded-lg'>
          <p className='text-xs md:text-[14px] lg:text[16px] text-[#FFFFFFCC] md:pb-0 pb-4'>
            Can&apos;t find answers you are looking for?, Please kindly get in touch with our support team.
          </p>
          {/* <button className='flex justify-between  items-center  bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]' 
           onClick={() => setOpenCheckPhoneNumberModal(true)}>
            Get insurance
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#032282" />
              <path d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z" fill="white" />
              <path d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z" fill="white" />
            </svg>
          </button> */}

            <GetInsuranceButton/>
        </div>
      </div>


    
    </main>
  )
}
