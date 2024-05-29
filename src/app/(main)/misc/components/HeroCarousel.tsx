"use client"

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';
import { cn } from '@/utils/classNames';
import useMeasure from 'react-use-measure';
import Image from 'next/image';


const images = [
    "/images/landing-page/carousel-card-2.png",
    "/images/landing-page/carousel-card-1.png",
    "/images/landing-page/carousel-card-1.png",
]

const HeroCarousel = () => {
    const [ref, { width }] = useMeasure();
    const xMovePosition = useMotionValue(0);
    const x = useTransform(xMovePosition, (value) => `${value}px`);
    const OG_SPEED = 15
    const SLOW_SPEED = 40
    const [speed, setSpeed] = useState(OG_SPEED)
    const [wait, setWait] = useState(false)
    const [restart, setRestart] = useState(false)


    useEffect(() => {
        const end = (-width / 2 - 16) * images.length;
        let controls

        if (wait) {
            controls = animate(xMovePosition, [xMovePosition.get(), end], {
                ease: "linear",
                duration: speed * (1 - xMovePosition.get() / end),
                onComplete: () => {
                    setWait(false)
                    setRestart(!true)
                }
            })

        }
        else {
            controls = animate(xMovePosition, [0, end], {
                duration: speed,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
            });
        }

        return () => {
            controls?.stop();
        };
    }, [width, xMovePosition, speed, wait, restart]);

    return (
        <div className={cn("relative flex items-center justify-center w-full h-full overflow-hidden",)}
            ref={ref}
        >
            <Image
                src="/images/landing-page/hero-phone-mockup.png"
                alt="hero"
                className="max-w-[200px] lg:max-w-[300px] xl:max-w-[350px]"
                width={200}
                height={200}
                layout="responsive"
            />
            <div
                className="absolute left-[-8%] h-full w-28 max-md:hidden bg-gradient-to-r from-main via-[rgba(4,3,32,0.9)] to-[rgba(4,3,32,0.7)] z-20  blur-md"
            ></div>
            <motion.div className={cn("flex absolute left-0 top-0 min-w-max w-full h-full gap-4",)}
                style={{ x }}
                onHoverStart={() => {
                    setWait(true)
                    setSpeed(SLOW_SPEED)
                }}
                onHoverEnd={() => {
                    setWait(true)
                    setSpeed(OG_SPEED)
                }}
            >
                {[...images, ...images].map((image, index) => (
                    <div key={index} className='relative min-w-[50%]'>
                        <Image
                            src={image}
                            alt={`image-${index}`}
                            className='w-full h-[200px]'
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default HeroCarousel;
