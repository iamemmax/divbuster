import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { cn } from '@/utils/classNames'





const HowToWebTimeline = () => {
    const [currentStep, setcurrentStep] = useState(1)
    const steps = [
        {
            title: <span>Click on <span className='font-medium'>“Get loan”</span> button</span>,
            description: "Tap on the “Get loan” button anywhere on the web page to start your loan process.",
            image: "/images/landing-page/how-to-web-1.png",
        },
        {
            title: "Enter your salary phone number",
            description: "Fill form provided by entering your salary phone number and email address and tick shown boxes shown to consent.",
            image: "/images/landing-page/how-to-web-2.png",
        },
        {
            title: "Select preferred option and enter loan amount.",
            description: "Select your preferred loan tenure and enter your desired loan amount to continue.",
            image: "/images/landing-page/how-to-web-3.png",
        },
        {
            title: "Loan disbursed with ease.",
            description: "Your approved loan will be instantly disbursed to your salary account for you access.",
            image: "/images/landing-page/how-to-web-3.png",
        },

    ]

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentStep === steps.length + 1) {
                setcurrentStep(1)
            } else {
                setcurrentStep(currentStep + 1)
            }
        }, 3000);

        return () => clearTimeout(timeout)
    }, [currentStep, steps.length])


    return (
        <section className="grid grid-cols-[max-content_1fr] sm:grid-cols-[1fr_max-content_1fr] gap-x-6 w-full">
            {
                steps.map((step, i) => {

                    return (
                        <div className='grid grid-cols-[subgrid] col-span-2 sm:col-span-3' key={i} >
                            <div
                                className={cn(
                                    'sm:order-1 hidden sm:flex justify-end sm:px-[20%]',
                                    i % 2 === 0 && 'sm:order-3 justify-start '
                                )}
                            >
                                <Image
                                    src={step.image}
                                    alt={step.description}
                                    width={500}
                                    height={500}
                                    className="rounded-lg max-w-[200px]"
                                />
                            </div>

                            <div className="flex flex-col items-center sm:order-2 max-sm:pl-6">
                                <div className={cn('h-6 w-6 rounded-full bg-main-light transition-colors', i + 1 >= currentStep  ? "opacity-20" : "opacity-100")}></div>
                                <div className={'relative grow w-1.5 bg-[#03228233] '}>
                                    <motion.div className='absolute w-full bg-main-light     top-0 left-0 right-0'
                                        animate={{ height: i + 1 >= currentStep ? "0%" : "100%", bottom: i + 1 >= currentStep ? "0%" : "100%"}}
                                        initial={{height: '0%', bottom: "100%"}}
                                    >
                                    </motion.div>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    'flex flex-col items-start justify-center text-left',
                                    'sm:order-3 max-sm:pb-4',
                                    i % 2 === 0 && 'sm:order-1 sm:text-right sm:items-end'
                                )}
                            >
                                <h6 className="font-bold text-4xl text-main-light opacity-20">
                                    0{i + 1}
                                </h6>
                                <p className="text-lg text-main">{step.title}</p>
                                <p className="text-sm text-helper-dark">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default HowToWebTimeline