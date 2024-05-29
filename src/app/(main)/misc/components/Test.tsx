export const projects = [
    {
        title: "Federal civil servant loan",
        content: "Swift loans to federal government employees who receive their salaries through Remita, catering specifically to the unique financial requirements of civil servants in Nigeria.",
        link: "https://fedwk.libertyng.com/",
        image: "/images/landing-page/stacking-card-1.png",
        color: "#040320",
        i: 0,
    },
    {
        title: "Micro business swift loan",
        content: "This swift loan option provides micro-loans to small and medium enterprises, facilitating convenient access to funds to streamline business operations effortlessly.",
        link: "https://fedwk.libertyng.com/",
        image: "/images/landing-page/stacking-card-2.png",
        color: "#00A37D",
        i: 1,
    },
    {
        title: "Agent cluster daily loans",
        content: "This loan option ensures POS agents have seamless access to daily funds, enabling them to sustain their businesses with increased capital for smoother transactions.",
        link: "https://fedwk.libertyng.com/",
        image: "/images/landing-page/stacking-card-3.png",
        color: "#5F5FA7",
        i: 2,
    },
]


import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis'
import TestCard from './StackingCard';

export default function TestHome() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    //   useEffect( () => {
    //     const lenis = new Lenis()

    //     function raf(time) {
    //       lenis.raf(time)
    //       requestAnimationFrame(raf)
    //     }

    //     requestAnimationFrame(raf)
    //   })

    return (
        <main className="mt-[50vh] relative" ref={container}>
            {
                projects.map((project, i) => {
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return <TestCard key={`p_${i}`} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
                })
            }
        </main>
    )
}