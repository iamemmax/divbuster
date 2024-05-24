"use client"

import { cn } from '@/utils/classNames'
import React from 'react'
import WhyMoveCard from './WhyMoveCard'


const cardsArray = [
    {
        title: "Instant loan disbursement",
        content: "Experience swift access to funds without the hassle of endless paperwork.",
        link: "#",
        image: "/images/landing-page/why-card-1.png",
        color: "bg-[#00A37D]",
        i: 0,
    },
    {
        title: "No collateral loans",
        content: "Apply and access collateral free loans, with no guarantor and get the money you need within 5 minutes of requesting.",
        link: "#",
        image: "/images/landing-page/why-card-2.png",
        color: "bg-[#0184D6]",
        i: 1,
    },

    {
        title: "Low interest loans",
        content: "Secure the financial support you need with our low-interest and no hidden charges",
        link: "#",
        image: "/images/landing-page/why-card-3.png",
        color: "bg-[#024873]",
        i: 2,
    },
    {
        title: "Flexible loan repayment options",
        content: "Determine your loan repayment tenure and repay with utmost flexibility.",
        link: "#",
        image: "/images/landing-page/why-card-4.png",
        color: "bg-[#0F9858]",
        i: 3,
    },
    {
        title: "Multiple application channels",
        content: "We provide you with several loan application channels (USSD, web and mobile app platforms) ensuring a smooth and effortless application process for you.",
        link: "#",
        image: "/images/landing-page/why-card-5.png",
        color: "bg-[#C99F34]",
        i: 4,
    },
    {
        title: "24/7 Customer support",
        content: "Contact us anytime you need to as our team are readily available to assist you.",
        link: "#",
        image: "/images/landing-page/why-card-6.png",
        color: "bg-[#080D27]",
        i: 5,
    }
]
const WhyMoveSection = () => {


    return (
        <section className=" flex flex-col items-center bg-[#ECF1FD] md:m-2 !mb-0 px-6 py-8 lg:py-24 rounded-3xl max-md:rounded-t-none md:rounded-2xl md:rounded-bl-none text-main">
            <div className='flex flex-col gap-4 md:gap-6 w-full max-w-[1150px] '>
                <div className="flex flex-col gap-4 md:gap-6 lg:grid grid-cols-4">

                    <div className='flex flex-col justify-center lg:col-span-2 md:px-8'>
                        <h1 className={cn("font-display" , "flex flex-col font-semibold text-3xl md:text-4xl xl:text-5xl gap-2")}>
                            <span>
                                Why move with
                            </span>
                            <span className="flex items-center gap-2 text-main-light">
                                liberty assured?
                            </span>
                        </h1>
                        <p className="text-sm max-w-md mt-4 text-helper-dark">
                            We offer easy access to funds through technology-driven processes, bypassing traditional hurdles and granting customers the freedom to use  money whenever and wherever they need.
                        </p>
                    </div>

                    <div className='flex flex-col items-center md:grid grid-cols-2 lg:items-stretch gap-4 md:gap-6 lg:col-span-2'>
                        {
                            cardsArray.slice(0, 2).map((card, index) => (
                                <WhyMoveCard
                                    key={index}
                                    card={card}
                                    titleclass={cn(card.i == 2 && "max-w-[200px]")}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className='flex flex-col items-center md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    {
                        cardsArray.slice(2, 6).map((card, index) => (
                            <WhyMoveCard
                                key={index}
                                card={card}
                                titleclass={cn(card.i == 2 && "max-w-[200px]")}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default WhyMoveSection