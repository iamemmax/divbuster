"use client"

import React, { useState } from 'react'

import { cn } from '@/utils/classNames'
import { LinkButton, Tabs, TabsList, TabsTrigger } from '@/components/core'
import { TabsContent } from '@radix-ui/react-tabs'

import HowToWebTimeline from './HowToWebTimeline'
import { RightUpArrow } from '@/icons/core'






const HowToSection = () => {


    return (
        <section className="py-8 lg:py-12 flex flex-col justify-center items-center">
            <div className='w-full max-w-[850px]'>


                <div className='flex flex-col items-center justify-center px-8 text-center'>
                    <h1 className={cn("font-display", "font-semibold text-center text-3xl md:text-4xl xl:text-5xl gap-2")}>
                        How to access easy the
                        <span className="text-main-light ml-2">
                            loans
                        </span>
                    </h1>
                    <p className="text-sm mt-2.5 text-helper-dark">
                        Follow the few steps shown below to access our easy loans with no stress.
                    </p>
                </div>

                <Tabs className='flex flex-col items-center w-full mt-6 ' defaultValue='web'>
                    <TabsList className={cn('flex items-center justify-start md:justify-center md:gap-2 p-2 py-1.5 mb-8 sm:rounded-full w-full sm:w-max !h-max !max-w-screen max-sm:overflow-x-scroll',)}>
                        <TabsTrigger className='!px-6 !py-2.5 rounded-full hover:bg-[#03228246] transition-colors duration-300' value="web">Web option</TabsTrigger>
                        <TabsTrigger className='!px-6 !py-2.5 rounded-full hover:bg-[#03238246] transition-colors duration-300' value="ussd">USSD option</TabsTrigger>
                        <TabsTrigger className='!px-6 !py-2.5 rounded-full hover:bg-[#03228246] transition-colors duration-300' value="agent">Agent option</TabsTrigger>
                    </TabsList>

                    <TabsContent value='web' className='w-full'>
                        <HowToWebTimeline />
                    </TabsContent>
                    <TabsContent value='ussd' className='w-full'>
                        <HowToWebTimeline />
                    </TabsContent>
                    <TabsContent value='agent' className='w-full'>
                        <HowToWebTimeline />
                    </TabsContent>
                </Tabs>
            </div>

            <LinkButton href="/" target="_blank" variant="default" className={cn("flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-16 rounded-full max-w-max bg-main-light", "font-display")}>
              Get loan
              <span className="flex items-center justify-center p-2 rounded-full bg-white text-main-light ml-10">
                <RightUpArrow fill="#000" width={12} height={12} />
              </span>
            </LinkButton>
        </section>
    )
}

export default HowToSection