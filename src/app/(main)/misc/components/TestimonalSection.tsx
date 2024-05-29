"use client"

import { cn } from '@/utils/classNames'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const TestimonialSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const testimonials = [
        {
            name: "Isah Abdullahi",
            message: "“Thank you to liberty assured I no longer have to worry when I have an emergency expense to make. I would recommend”"
        },
        {
            name: "Mariam Abdussalami",
            message: "“Liberty Assured has been a game changer for me. Their services are reliable and they always come through when I need them. Highly recommended!”"
        },
        {
            name: "Maureen Igwe",
            message: "“Thank you to liberty assured I no longer have to worry when I have an emergency expense to make. I would recommend”"
        },
        {
            name: "Oludele Ojo",
            message: "“Thank you to liberty assured I no longer have to worry when I have an emergency expense to make. I would recommend”"
        },

    ]

    const fillArray = Array.from({ length: testimonials.length }, (_, index) => index);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentTestimonial === testimonials.length - 1) {
                setCurrentTestimonial(0)
            } else {
                setCurrentTestimonial(currentTestimonial + 1)
            }
        }, 5000);

        return () => clearTimeout(timeout)
    }, [currentTestimonial, testimonials.length])




    return (

        <section className='relative flex flex-col justify-center items-center bg-gradient-to-b from-[#1B1F33] to-main md:rounded-t-2xl px-4 py-6 sm:p-8 md:py-16 lg:p-16 overflow-y-hidden'>
            <div className='flex flex-col md:flex-row md:gap-12 xl:gap-24 md:justify-between md:items-stretch w-full max-w-[900px] text-white z-[2]'>
                <div className='flex items-start justify-between gap-16 max-md:max-w-[350px] max-md:self-center'>
                    <div className='flex flex-col gap-8 py-8'>
                        <h4 className={cn("font-display" , "text-4xl font-semibold")}>
                            The mic in our customers’ hands
                        </h4>
                        <div className='flex flex-col min-h-[50px] max-md:h-[5lh]'>
                            <p className='text-helper-dark '>
                                {testimonials[currentTestimonial].message}
                            </p>
                            <span className='text-white mt-4 text-lg'>
                                {testimonials[currentTestimonial].name}
                            </span>
                        </div>

                    </div>

                    <div className='hidden md:block w-1.5 h-24 shrink-0 '>
                        {
                            fillArray.map((index) => (
                                <span
                                    className={cn(
                                        currentTestimonial === index ? "h-1/2 !bg-white" : "h-1/6 bg-white/30",
                                        "inline-block [transition:height_400ms_ease-in-out] rounded-full w-full hover:bg-white/60 min-h-[1/6] cursor-pointer"
                                    )}
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                ></span>
                            ))
                        }
                    </div>
                </div>



                <div className='grid [grid-template-areas:"a_b"_"a_b"_"c_b"_"c_d"_"c_d"] gap-2 min-h-[400px] w-full max-w-[350px] max-md:self-center shrink-0'>
                    <div className='relative [grid-area:a] rounded-lg overflow-hidden group/item'>
                        <Image
                            alt="Isah Abdullahi"
                            layout="fill"
                            objectFit='cover'
                            src="/images/landing-page/testimonial-card-1.png"
                        />
                        <div className='absolute left-0 bottom-0 opacity-1 px-4  text-sm max-w-full w-max rounded-t-md  bg-black/40 group-hover/card1:opacity-1'>
                            Isah Abdullahi
                        </div>
                    </div>
                    <div className='relative [grid-area:b] rounded-lg overflow-hidden group/card2'>
                        <Image
                            alt="Mariam Abdussalami"
                            layout="fill"
                            objectFit='cover'
                            src="/images/landing-page/testimonial-card-2.png"
                        />
                        <div className='absolute left-0 bottom-0 opacity-1 px-4  text-sm max-w-full w-max rounded-t-md  bg-black/40 group-hover/card2:opacity-1'>
                            Mariam Abdussalami
                        </div>
                    </div>
                    <div className='relative [grid-area:c] rounded-lg overflow-hidden group/card3'>
                        <Image
                            alt="Maureen Igwe"
                            layout="fill"
                            objectFit='cover'
                            src="/images/landing-page/testimonial-card-3.png"
                        />
                        <div className='absolute left-0 bottom-0 opacity-1 px-4  text-sm max-w-full w-max rounded-t-md  bg-black/40 group-hover/card3:opacity-1'>
                            Maureen Igwe
                        </div>
                    </div>
                    <div className='relative [grid-area:d] rounded-lg overflow-hidden group/card4'>
                        <Image
                            alt="Oludele Ojo"
                            layout="fill"
                            objectFit='cover'
                            src="/images/landing-page/testimonial-card-4.png"
                        />
                        <div className='absolute left-0 bottom-0 opacity-1 px-4  text-sm max-w-full w-max rounded-t-md  bg-black/40 group-hover/card4:opacity-1'>
                            Oludele Ojo
                        </div>
                    </div>

                </div>
            </div>

            <div className='absolute left-0 top-[80%] md:top-[20%] w-full h-max z-[1]'>
                <Image
                    alt="Testimonial Background"
                    className='w-full'
                    height={300}
                    objectFit='contain'
                    src="/images/landing-page/footer-gradient-ellipse.png"
                    // layout="fill"
                    width={1920}
                />
            </div>
        </section>

    )
}


export default TestimonialSection