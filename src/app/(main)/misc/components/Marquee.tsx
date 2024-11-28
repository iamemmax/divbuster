"use client";

import React from "react";
import Image from "next/image";

const Marquee = () => {
  return (
    <>
      <section className="!z-50 fixed bottom-0 w-full bg-[#161D42] z- py-[.375rem] text-lg font-display">
        <div className="marquee-content">
          <div className="marquee-list font-clash flex items-center gap-20 xl:text-xl">
            <Image
              width={50}
              height={40}
              alt="logo"
              src={"/images/logos/libertyAssured.png"}
            />
            <Image
              width={100}
              height={90}
              alt="logo"
              src={"/images/logos/libertyPay.png"}
            />
            <Image
              width={60}
              height={50}
              alt="logo"
              src={"/images/logos/seed&pennies.png"}
            />
            <Image
              width={60}
              height={40}
              alt="logo"
              src={"/images/logos/paybox360.png"}
            />
            <Image
              width={100}
              height={50}
              alt="logo"
              src={"/images/logos/whispersms.png"}
            />
            <Image
              width={110}
              height={60}
              alt="logo"
              src={"/images/logos/getlinked.png"}
            />
            <Image
              width={30}
              height={20}
              alt="logo"
              src={"/images/logos/winwise.png"}
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .marquee-content {
          overflow: hidden;
          position: relative;
          width: 100%;
          zIndex:50
        }

        .marquee-list {
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          animation: marquee 30s linear infinite; /* Slowed down to 40 seconds */
        }

        .marquee-content:hover .marquee-list {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @media (max-width: 640px) {
          .marquee-list img {
            width: 50px;
            height: auto;
          }

          .marquee-list {
            gap: 30px;
          }
        }
      `}</style>
    </>
  );
};

export default Marquee;
