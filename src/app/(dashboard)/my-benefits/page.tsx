"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/core'
import { ArrowDown, CaretDown } from '@/components/icons'
import { cn } from '@/utils/classNames'
import { useState } from 'react'
import PolicyExclusions from '../comp/components/cards/policy/PolicyExclusions'
import TermsAndConditions from '../comp/components/cards/policy/TermsAndConditions'
import { Value } from '@radix-ui/react-select'


interface props{
    question: string;
    nested: {
        name:string;
        value:string;   
    }[];
}

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

    const data2: props[]= [
        {
            question: "Out Patent Care",
            nested:[
                {
                    name:"GP Consultation",
                    value:"Covered"
                },
                {
                    name:"Specialist Consultation",
                    value:"Covered"
                },
                {
                    name:"Rare Specialist Consultation",
                    value:"Covered up ₦15,000.00"
                },
                {
                    name:"Telemedicine Consultation",
                    value:"Covered"
                },
                {
                    name:"Prescribed Medication",
                    value:"Covered"
                },
                {
                    name:"Basic Laboratory Investigations/X-ray/Ultrasounds",
                    value:"Covered"
                },
            ]
        },
        {
            question: "Intensive Care Services",
            nested: [
                {
                    name:"ICU",
                    value:"24 hours"
                }
            ]
        },
        {
            question: "Obstetrics and Gynecologic",
            nested: [
                {
                    name:"Antenatal Care",
                    value:"Covered Under the Surgery Limit",
                },
                {
                    name:"Induction of Labor and Normal Care",
                    value:"Covered Under the Surgery Limit",
                },
                {
                    name:"Assisted Delivery",
                    value:"Covered Under the Surgery Limit",
                },
                {
                    name:"Emergency or Elective Caesarean Section ",
                    value:"Covered Under the Surgery Limit",
                },
                {
                    name:"Post Natal Care - 6 weeks",
                    value:"Covered",
                },
                {
                    name:"Family Planning Services - All Methods",
                    value:"₦20,000.00",
                }
            ]
        },
        {
            question: "Primary Immunizations",
            nested: [
                {
                    name:"BCG",
                    value:"Covered"
                },
                {
                    name:"OPV",
                    value:"Covered"
                },
                {
                    name:"Pentavalent and IPV",
                    value:"Covered"
                },
                {
                    name:"HBV",
                    value:"Covered"
                },
                {
                    name:"Vitamin A",
                    value:"Covered"
                },
                {
                    name:"Measles",
                    value:"Covered"
                },
                {
                    name:"Pneumoccoccal",
                    value:"Covered"
                },
                {
                    name:"Yellow Fever",
                    value:"Covered"
                },
            ]
        },
        {
            question: "Surgical Services",
            nested: [
                {
                    name:"Minor Surgery",
                    value:"₦150,000.00"
                },
                {
                    name:"Intermediate Surgery",
                    value:"₦150,000.00"
                },
                {
                    name:"Major Surgery",
                    value:"₦150,000.00"
                },
                {
                    name:"Tertiary Surgery/Minimal Invasive Surgeries",
                    value:"₦150,000.00"
                },
            ]
        },
        {
            question: "Dental Care Services",
            nested: [
                {
                    name:"Primary Dental Care -Basic dental treatment, Simple Amalgamor composite, filling, Scaling and Polishing, Non-Surgical Extraction and Pain Therapy/Relief. ",
                    value:"₦10,000.00"
                },
                {
                    name:"Lenses and Frames covered up to limit per plan (Once every 18 months)",
                    value:"₦10,000.00"
                },
            ]
        },
        {
            question: "Major Disease Care",
            nested: [
                {
                    name:"Cancer Treatment (Chemotherapy, Radiotherapy, Surgery), Major Organ Diseases - Kidney Dialysis, Organ transplant, Other major organ diseases Stroke, Rehabilitation Care. All drawn from major disease limits.",
                    value:"₦50,000.00"
                },
            ]
        },
        {
            question: "Diagnostic Services",
            nested: [
                {
                    name:"Basic Radiological Studies e.g Plain X-ray, Contrast X-ray, and Ultrasonography(Abdominal and Pelvic)",
                    value:"Covered"
                },
                {
                    name:"Laboratory Services - Histopathology, Hematological Investigations Microbiological Investigations, Serology and Clinical Chemistry",
                    value:"Covered"
                },
                {
                    name:"Spirometry, Electrocardiogram(ECG) - Rest and EGG - Electroencephalogram ",
                    value:"Covered"
                },
                {
                    name:"Advanced and Complex Laboratory and Radiological Investigations e.g Echocardiogram, CT scan, MRI etc..",
                    value:"Not Covered"
                },
            ]
        },
        {
            question: "Pharmacy Benefits and Chronic Disease Management ",
            nested: [
                {
                    name:"Chronic Medical Conditions (Drug Refill)",
                    value:"₦1,000,000.00"
                },
                {
                    name:"Drug Delivery and Pickup at Partner Pharmacies ",
                    value:"Covered"
                },
                {
                    name:"Chronic Disease  Management Prrogram",
                    value:"Covered"
                },
            ]
        },
        {
            question: "Telemedicine and E-Health Services",
            nested: [
                {
                    name: "Teleconsultation",
                    value: "Covered"
                }
            ]
        },
        {
            question: "In Patent Care",
            nested: [
                {
                    name:"Admission and Feeding",
                    value:"Covered"
                },
                {
                    name:"Room Type",
                    value:"Standard"
                },
                {
                    name:"Nursing Care and Consumables",
                    value:"Covered"
                },
                {
                    name:"Basic Laboratory Investigations/X-ray/Ultrasounds",
                    value:"Covered"
                },
            ]
        },
        {
            question: "Accident and Emergency",
            nested: [
                {
                    name:"Emergency Room Care",
                    value:"Covered"
                },
                {
                    name:"Emergency Medical Transportation from Roadside to Hospital and hospital to hospital",
                    value:"Covered"
                },
                {
                    name:"Emergency Services - Resuscitation and Stabilization",
                    value:"Covered"
                },
            ]
        },
        {
            question: "Neonatal Care Services",
            nested: [
                {
                    name:"Special Baby Care Unit(Intensive care unit- including life support, phototherapy and incubator care). Limit per plan",
                    value:"₦20,000.00"
                },
                {
                    name:"Male circumcision and Ear piercing - Within first 6 weeks of life",
                    value:"Covered"
                }
            ]
        },
        {
            question: "Secondary Immunizations",
            nested: [
                {
                    name:"Rotavirus",
                    value:"₦7,500.00"
                },
                {
                    name:"Meningitis",
                    value:"₦7,500.00"
                },
                {
                    name:"MMR",
                    value:"₦7,500.00"
                },
                {
                    name:"Hexaxim",
                    value:"₦7,500.00"
                },
                {
                    name:"Typhoid",
                    value:"₦7,500.00"
                },
                {
                    name:"Chicken Pox",
                    value:"₦7,500.00"
                },
                {
                    name:"HPV",
                    value:"₦7,500.00"
                },
            ]
        },
        {
            question: "Secondary Immunizations",
            nested: [
                {
                    name:"Treatment for ENT Diseases",
                    value:"Covered"
                },
                {
                    name:"ENT Surgery (Subject to overall surgical limit)",
                    value:"Covered"
                },
            ]
        },
        {
            question: "Eye Care Services",
            nested:[
                {
                    name:"Primary Eye Care - Consultation Examination, Primary Infections, and Medications",
                    value:"Covered"
                },
                {
                    name:"Eye Surgeries covered as part of over all surgical limit",
                    value:"Covered"
                },
                {
                    name:"Tertiary Surgery/Minimal Invasive Surgeries",
                    value:"₦10,000.00"
                },
            ]
        },
        {
            question: "Physiotherapy Care Services",
            nested: [
                {
                    name:"Specialist Consultation and Treatment",
                    value:"Covered"
                },
                {
                    name:"Physiotherapy Session",
                    value:"3 sessions"
                },
                {
                    name:"External Medical Devices and Appliances such as Crutches, Wheelchair, Neck Collars etc. Limit per annum",
                    value:"₦15,000.00"
                },
            ]
        },
        {
            question: "Annual Wellness Screening (Principal)",
            nested: [
                {
                    name:"Physical Examination",
                    value:"Covered"
                },
                {
                    name:"Visual Acuity",
                    value:"Covered"
                },
                {
                    name:"Blood Pressure",
                    value:"Covered"
                },
                {
                    name:"Fasting Blood Sugar",
                    value:"Covered"
                },
                {
                    name:"Urinalysis",
                    value:"Not Covered"
                },
                {
                    name:"Full Blood Count",
                    value:"Not Covered"
                },
                {
                    name:"Serum Cholesterol",
                    value:"Not Covered"
                },
                {
                    name:"Liver Function Test",
                    value:"Not Covered"
                },
                {
                    name:"ECG",
                    value:"Not Covered"
                },
                {
                    name:"Kidney Function Test(E/U/Cr)",
                    value:"Not Covered"
                },
                {
                    name:"Breast Scan every 2years for females under 40years, ammogram for every 2 years females above 40years, Pap smear every 2years females' above 35years",
                    value:"Not Covered"
                },
                {
                    name:"PSA for men above 40years every 2 years",
                    value:"Not Covered"
                },
            ]
        },
        {
            question: "Mental Health Management ",
            nested:[
                {
                    name:"Specialist Consultation on Outpatient Cases Only",
                    value:"5 weeks"
                },
                {
                    name:"Psychiatric Impatient Cases ",
                    value:"Not Covered"
                },
                {
                    name:"Employee Assistant Program/ Stress Management ",
                    value:"Covered"
                }
            ]
        },
        {
            question: "Expert Second Opinion Service",
            nested: [
                {
                    name:"Second Opinion Service by Experts",
                    value:"Covered"
                }
            ]
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
                                data.map((item, index:number) => (
                                        <div key={index} className='grid grid-cols-2 capitalize border-b-[0.4px] border-[#E2E8F0] pb-3 pl-6 pt-1 text-[#475569] text-sm'>
                                            <p>{item.title}</p>
                                            <p>{item.description}</p>
                                        </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='mt-2 flex flex-col md:flex-row gap-4'>

                        <ul className='grid grid-cols-1 w-full gap-5 bg-white lg:grid-cols-2'>
                            {
                                data2?.map((items, index) => {
                                    const [isOpen, setIsOpen] = useState(false)
                                    return (
                                        <Collapsible key={index}>
                                            <CollapsibleTrigger className='flex justify-between items-center text-start w-full rounded bg-[#F6F9FF] text-[#032282] py-2.5 pl-6 pr-8 text-sm' onClick={() => setIsOpen(!isOpen)}>
                                                {items.question}
                                                <ArrowDown className={cn(isOpen && "rotate-180")} />
                                            </CollapsibleTrigger>

                                            <CollapsibleContent className='bg-[#F6F9FF] mt-1 rounded'>
                                                {items?.nested?.map((item,idex:number)=>(
                                                    <li key={idex} className={`flex justify-between  py-3 text-[#475569] gap-10 border-[#E2E8F0] text-xs w-full px-6 ${items?.nested?.length -1 !== idex ?"border-b-[0.4px]":""} `}>
                                                        <p className='basis-1/2 text-left'>{item?.name}</p>
                                                        <p className='basis-1/2 text-left'>{item?.value}</p>
                                                    </li>
                                                ))}
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
