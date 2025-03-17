"use client";

import React from "react";
import Image from "next/image";

const Marquee = () => {
  return (
    <>
      <section className="!z-40 fixed bottom-0 w-full bg-[#161D42] py-1 md:py-[.375rem] text-sm font-display">
        <div className="marquee-content">
          <div className="marquee-list font-clash flex items-center gap-20 xl:text-xl">
            <Image
              width={40}
              height={30}
              alt="logo"
              src={"/images/logos/libertyAssured.png"}
              className="md:w-[3rem] "
            />
            <Image
              width={70}
              height={70}
              alt="logo"
              src={"/images/logos/libertyPay.png"}
               className="md:w-[4rem] "
            />
            <Image
              width={50}
              height={40}
              alt="logo"
              src={"/images/logos/seed&pennies.png"}
               className="md:w-[3rem] "
            />
            <Image
              width={50}
              height={30}
              alt="logo"
              src={"/images/logos/paybox360.png"}
               className="md:w-[3rem] "
            />
            <Image
              width={70}
              height={40}
              alt="logo"
              src={"/images/logos/whispersms.png"}
                className="md:w-[5rem] "
            />
            <Image
              width={90}
              height={50}
              alt="logo"
              src={"/images/logos/getlinked.png"}
                className="md:w-[5rem] "
            />
            <Image
              width={25}
              height={20}
              alt="logo"
              src={"/images/logos/winwise.png"}
                className="md:w-[1.6rem] "
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
