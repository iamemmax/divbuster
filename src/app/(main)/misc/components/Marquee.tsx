"use client";

import React from "react";
import Image from "next/image";

const Marquee = () => {
  return (
    <>
      <section className="z-50 fixed bottom-0 w-full bg-[#161D42] py-4 text-lg font-display">
        <div className="marquee-content">
          <div className="marquee-list font-clash flex items-center gap-10 md:gap-20 xl:text-xl">
            <Image
              width={90}
              height={80}
              alt="logo"
              src={"/images/logos/libertyAssured.png"}
            />
            <Image
              width={130}
              height={130}
              alt="logo"
              src={"/images/logos/libertyPay.png"}
            />
            <Image
              width={100}
              height={80}
              alt="logo"
              src={"/images/logos/seed&pennies.png"}
            />
            <Image
              width={90}
              height={70}
              alt="logo"
              src={"/images/logos/paybox360.png"}
            />
            <Image
              width={140}
              height={80}
              alt="logo"
              src={"/images/logos/whispersms.png"}
            />
            <Image
              width={160}
              height={100}
              alt="logo"
              src={"/images/logos/getlinked.png"}
            />
            <Image
              width={60}
              height={60}
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
        }

        .marquee-list {
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          animation: marquee 40s linear infinite; /* Slowed down to 40 seconds */
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
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Marquee;
