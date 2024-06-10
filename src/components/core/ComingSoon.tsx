'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/core/Button';

export function ComingSoon() {
    const overlayVariants = {
        hidden: { opacity: 0, y: '100%' },
        visible: { opacity: 1, y: '0%' },
    };

    const helmetVariants = {
        hidden: { opacity: 0, y: '-100%' },
        visible: { opacity: 1, y: '0%' },
    };


    return (
        <>
            <div className='absolute size-full bg-black/80 backdrop-blur-md z-50'>
                <AnimatePresence>
                    <div className='flex flex-col items-center h-full justify-center'>
                        <motion.div
                            animate="visible"
                            className="w-[136px] z-50 h-[96.41px] bg-[url('/images/coming-soon/coming_soon_helment.png')]"
                            exit="hidden"
                            initial="hidden"
                            variants={helmetVariants}
                        ></motion.div>
                        <motion.div
                            animate="visible"
                            className='w-[267px] h-[243px] bg-[#F4F9FF] rounded-10 -mt-8 flex items-center flex-col justify-center '
                            exit="hidden"
                            initial="hiddenw"
                            variants={overlayVariants}
                        >
                            <h1 className='text-[#073D9F] font-extrabold font-heading text-[32px] leading-[39.36px] max-w-[127px] text-center'>Coming
                                soon !!!</h1>
                            <p className='mt-[10px] text-center max-w-[218px] text-[#6C727F] text-xs font-[450] leading-[15.21px]'>We are working on giving you a suiting
                                feature to fit your need</p>
                            <Button
                                className='bg-[#EAF2FF] mt-4 w-[107px] h-[35px] rounded-[7px] font-medium leading-[17.75px] text-sm text-[#073D9F]'

                            >
                                Okay
                            </Button>
                        </motion.div>
                    </div>
                    {/* </motion.div> */}
                </AnimatePresence>
            </div>

        </>
    );
}
