"use client"

import React from 'react';
import { cn } from '@/utils/classNames';

const Marquee = () => {

    return (
        <>
            <section className={cn("z-50 marquee fixed bottom-0 w-full  bg-[#161D42] hover:!opacity-100 text-main py-4 !rounded-none text-lg", "font-display")}>
                <div className="marquee-content">
                    <ul className="marquee-list font-clash flex items-center justify-between xl:py-5 xl:text-xl">
                        <li className="marquee-item text-white opacity-50">Liberty Assured</li>
                        <li className="marquee-item text-white opacity-50">Paybox360</li>
                        <li className="marquee-item text-white opacity-50">VisualPlus</li>
                        <li className="marquee-item text-white opacity-50">WhisperSMS</li>
                        <li className="marquee-item text-white opacity-50">WinWise</li>
                        <li className="marquee-item text-white opacity-50">Getlinked</li>
                        <li className="marquee-item text-white opacity-50">Liberty Assured</li> {/* Duplicate items */}
                        <li className="marquee-item text-white opacity-50">Paybox360</li>
                        <li className="marquee-item text-white opacity-50">VisualPlus</li>
                        <li className="marquee-item text-white opacity-50">WhisperSMS</li>
                        <li className="marquee-item text-white opacity-50">WinWise</li>
                        <li className="marquee-item text-white opacity-50">Getlinked</li>
                    </ul>
                </div>
            </section>

            <style jsx>{`
.marquee {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 50;
  background-color: #161D42;
  padding: 16px 0;
  text-align: center;
}

.marquee-content {
  display: flex;
  width: 100%;
  animation: marquee 15s linear infinite;
}
.marquee-content:hover {
  animation: marquee 40s linear infinite;
}
.marquee-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  white-space: nowrap;
}

.marquee-item {
  flex: 1 0 auto;
  margin: 0 20px;
  color: white;
  opacity: 0.5;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 640px) {
  .marquee-list {
    padding: 0 20px;
  }

  .marquee-item {
    margin: 0 10px;
  }
}
`}</style>
        </>
    );
};

export default Marquee;
