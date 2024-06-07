"use client"

import React, { useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

import { cn } from '@/utils/classNames'

interface WhyMoveCardProps {
    card: {
        title: string;
        content: string;
        link: string;
        image: string;
        color: string;
        i: number;
    }
    className?: string;
    titleclass?: string;

}

const WhyMoveCard: React.FC<WhyMoveCardProps> = ({ card, className, titleclass }) => {
    const [cardHovered, setcardHovered] = React.useState<boolean>(card.i == 0 ? true : false)
    const ref = React.useRef<HTMLDivElement | null>(null)
    const inView = useInView(ref)

    return (
        <motion.article
            ref={ref}
            className={cn('relative flex flex-col gap-4 md:gap-2 rounded-xl p-5 md:h-[250px] overflow-hidden max-md:w-full max-md:max-w-[380px] h-[200px]',
                card.color,
                "transition-colors duration-200 ease-in-out",
                cardHovered ? `!${card.color} text-white` : `md:bg-white text-white md:text-main max-md:!${card.color}`,
                className
            )}
            onHoverStart={() => setcardHovered(true)}
            onHoverEnd={() => card.i == 0 ? setcardHovered(true) : setcardHovered(false)}
        >
            <h6 className={cn("font-display" , "flex items-center text-[1.3rem] text-left w-full font-semibold pr-5", titleclass)}>
                {card.title}
            </h6>
            <p className={cn("max-w-sm text-sm", cardHovered ? `text-white` : "text-white md:text-helper-dark")}>
                {card.content}
            </p>

            <motion.div
                className={cn("max-md:hidden absolute bottom-0 right-0 w-[40%] h-[40%] rounded-xl opacity-0 translate-x-[50px] translate-y-[50px]",)}
                transition={{ type: "spring", stiffness: 120 }}
                animate={{ opacity: cardHovered ? 1 : 0, translateX: cardHovered ? 20 : 50, translateY: cardHovered ? 20 : 50 }}
            >
                <Image src={card.image} alt={card.title} priority layout="fill" objectFit="contain" className="rounded-xl p-1" />
            </motion.div>
            <motion.div
                className={cn("md:hidden absolute bottom-0 right-0 w-[40%] h-[40%] rounded-xl linear opacity-0 translate-x-[60px] translate-y-[60px]",)}
                animate={{ opacity: inView ? 1 : 0, translateX: inView ? 38 : 70, translateY: inView ? 25 : 70 }}
                transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
            >
                <Image src={card.image} alt={card.title} priority layout="fill" objectFit="contain" className="rounded-xl p-1" />
            </motion.div>
        </motion.article>
    )
}

export default WhyMoveCard




