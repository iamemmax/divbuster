'use client'

import Image from 'next/image';

import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';

import { useRef } from 'react';
import { LinkButton } from '@/components/core';
import { cn } from '@/utils/classNames';
import { RightUpArrow } from '@/icons/core';

interface TestCardProps {

    i: number;

    title: string;
    content: string;
    link: string;
    image: string;

    color: string;

    progress: MotionValue<number>;

    range: [number, number];

    targetScale: number;

}

const StackingCard: React.FC<TestCardProps> = ({ i, title, content, image, link, color, progress, range, targetScale }) => {

    const container = useRef(null);

    const { scrollYProgress } = useScroll({

        target: container,

        offset: ['start end', 'start start']

    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])

    const scale = useTransform(progress, range, [1, targetScale]);



    return (

        <div className="h-screen flex items-center justify-center sticky top-0" ref={container}>
            <motion.div
                className="flex max-md:flex-col max-md:mx-2.5 relative -top-1/4 h-[500px] md:h-[480px] w-[1000px] xl:w-[1100px] rounded-[3rem] px-2.5 md:px-10 origin-top"
                style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 25}px)` }}
            >
                <div className='flex flex-col gap-6 text-white py-8 lg:py-16 px-10 md:pl-20 xl:pl-24 h-full max-h-[30rem]'>
                    <h3 className={cn("font-display", "text-3xl lg:text-[2.35rem] font-semibold max-w-[12ch]")}>{title}</h3>
                    <p className={cn('text-[#BACAFC] text-xs md:text-sm xl:text-base', i == 1 && "text-white",)}>{content}</p>
                    <LinkButton className={cn("flex items-center justify-between mt-auto text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 rounded-full max-w-max", "font-display")} href={link}
                        target="_blank"
                        variant={i == 1 ? "default" : "white"}
                    >
                        Get loan
                        <span className={cn("flex items-center justify-center p-2 rounded-full bg-main-light ml-10", i == 1 && "bg-white")}>
                            <RightUpArrow fill={i == 1 ? "dark-blue" : "white"} height={12} width={12} />
                        </span>
                    </LinkButton>
                </div>

                <div className={cn('shrink-0 p-6 pb-0 max-md:py-0 md:w-[51%] xl:w-[53.5%] w-full h-full',
                    i == 0 && "md:translate-y-[15%] xl:translate-y-[20%] scale-[1.15] ",
                    i == 1 && "md:translate-y-0 scale-[0.85] overflow-y-hidden",
                    i == 2 && "md:translate-y-[5%] md:scale-[0.86] ",
                )}>
                    <Image
                        alt={title}
                        height={600}
                        src={image}
                        width={200}
                        layout="responsive"
                    // className='object-cover'
                    />
                </div>

            </motion.div>

        </div>

    )

}

export default StackingCard
