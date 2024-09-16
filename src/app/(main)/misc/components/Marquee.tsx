"use client";

import React from "react";
import { cn } from "@/utils/classNames";
import Image from "next/image";

const Marquee = () => {
  // const images = [
  //   // "/images/logos/libertyAssured.png",
  //   "/images/logos/libertyPay.png",
  //   // "/images/logos/paybox360.png",
  //   // "/images/logos/seed&pennies.png",
  //   // "/images/logos/getlinked.png",
  //   // "/images/logos/whispersms.png",
  //   // "/images/logos/winwise.png",
  // ];
  return (
    <>
      <section
        className={cn(
          "z-50 marquee fixed bottom-0 w-full  bg-[#161D42] hover:!opacity-100 text-main py-4 !rounded-none text-lg",
          "font-display"
        )}
      >
        <div className="marquee-content">
          <div className="marquee-list font-clash gap-x-20 justify-center flex items-center  xl:text-xl">
            {/* {images?.map((img: string, idx: number) => (
              <Image key={idx} width={120} height={120} alt="logo" src={img} />
            ))} */}
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
        .marquee {
          overflow: hidden;
          position: fixed;
          bottom: 0;
          width: 100%;
          z-index: 50;
          background-color: #161d42;
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
          justify-content:;
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
