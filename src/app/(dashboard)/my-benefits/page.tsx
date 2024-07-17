"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/core'
import { ArrowDown, CaretDown } from '@/components/icons'
import { cn } from '@/utils/classNames'
import { useState } from 'react'
import PolicyExclusions from '../comp/components/cards/policy/PolicyExclusions'
import TermsAndConditions from '../comp/components/cards/policy/TermsAndConditions'

export default function page() {

    const data: any[] = [
        {
            title: "region of cover",
            description: "nigeria",
        },
        {
            title: "provider category",
            description: "All Plans",
        },
        {
            title: "Annual Benefit Limit",
            description: "Unlimited",
        }
    ]

    const data2= [
        {
            question: "Out Patent Care",
            answer: ""
        },
        {
            question: "Intensive Care Services",
            answer: ""
        },
        {
            question: "Obstetrics and Gynecologic",
            answer: ""
        },
        {
            question: "Primary Immunizations",
            answer: ""
        },
        {
            question: "Surgical Services",
            answer: ""
        },
        {
            question: "Dental Care Services",
            answer: ""
        },
        {
            question: "Major Disease Care",
            answer: ""
        },
        {
            question: "Diagnostic Services",
            answer: ""
        },
        {
            question: "Pharmacy Benefits and Chronic Disease Management ",
            answer: ""
        },
        {
            question: "Telemedicine and E-Health Services",
            answer: ""
        },
        {
            question: "In Patent Care",
            answer: ""
        },
        {
            question: "Accident and Emergency",
            answer: ""
        },
        {
            question: "Neonatal Care Services",
            answer: ""
        },
        {
            question: "Secondary Immunizations",
            answer: ""
        },
        {
            question: "Secondary Immunizations",
            answer: ""
        },
        {
            question: "Eye Care Services",
            answer: ""
        },
        {
            question: "Physiotherapy Care Services",
            answer: ""
        },
        {
            question: "Annual Wellness Screening (Principal)",
            answer: ""
        },
        {
            question: "Mental Health Management ",
            answer: ""
        },
        {
            question: "Expert Second Opinion Service",
            answer: ""
        },
    ]


    return (
        <main className=' bg-[#f5f9fe] w-full h-full font-sans pb-[4.5rem]'>
            <div className="relative">
                <article className='bg-main w-full flex justify-between py-6 px-6 md:px-[7.5rem]'>
                    <h1 className='text-white font-sans font-medium text-3xl max-w-[618px]'>Below are the comprehensive benefits of Liberty life health cover.</h1>
                </article>
                <div className='bg-white rounded-10 py-6 px-6 md:mx-[7.5rem] -mt-4  pb-[4.5rem]'>
                    <div >
                        <div className='grid grid-cols-2 rounded bg-[#F6F9FF] py-3 pl-6 capitalize text-[#032282] font-bold mb-3'>
                            <p>Plan benefits</p>
                            <p>Plan type</p>
                        </div>
                        <div className='grid grid-cols-2 border-[0.4px] border-[#032282]  py-3 pl-6 mb-1 rounded text-[#032282]'>
                            <p>Benefits Categories</p>
                            <p>All Plans</p>
                        </div>
                        <div className=''>
                            {
                                data.map((item, index) => (
                                    <>
                                        <div className='grid grid-cols-2 capitalize border-b-[0.4px] pb-3 pl-6 pt-1 text-[#475569] text-sm'>
                                            <p>{item.title}</p>
                                            <p>{item.description}</p>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    <div className='mt-2 flex flex-col md:flex-row gap-4'>
                        <ul className='flex flex-col gap-3 basis-1/2'>
                            {
                                data2.slice(0, 10).map((items, index) => {
                                    const [isOpen, setIsOpen] = useState(false)
                                    return (
                                        <Collapsible key={index}>
                                            <CollapsibleTrigger className='flex justify-between items-center text-start w-full rounded bg-[#F6F9FF] text-[#032282] py-3 pl-6 pr-8 text-sm' onClick={() => setIsOpen(!isOpen)}>
                                                {items.question}
                                                <ArrowDown className={cn(isOpen && "rotate-180")} />
                                            </CollapsibleTrigger>
                                        </Collapsible>
                                    )
                                })
                            }
                        </ul>
                        <ul className='flex flex-col gap-3 basis-1/2'>
                            {
                                data2.slice(10, 20).map((items, index) => {
                                    const [isOpen, setIsOpen] = useState(false)
                                    return (
                                        <Collapsible key={index}>
                                            <CollapsibleTrigger className='flex justify-between items-center text-start w-full rounded bg-[#F6F9FF] text-[#032282] py-3 pl-6 pr-8 text-sm' onClick={() => setIsOpen(!isOpen)}>
                                                {items.question}
                                                <ArrowDown className={cn(isOpen && "rotate-180")} />
                                            </CollapsibleTrigger>

                                            <CollapsibleContent>

                                            </CollapsibleContent>
                                        </Collapsible>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div>
                        <PolicyExclusions />
                    </div>
                    <div className='mt-6'>
                        <TermsAndConditions />
                    </div>
                </div>
            </div>
        </main>
    )
}
