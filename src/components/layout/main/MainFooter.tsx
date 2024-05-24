'use client';

import { Button } from '@/components/core/Button';

import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import { FooterInput } from './FooterInput';

export function MarketingFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
  };

  return (
    <footer className="w-full bg-[#001760] p-5 md:p-16">
      {/* <main className="flex w-full flex-col justify-between gap-[20px] md:flex-row md:gap-[10px] lg:gap-[10px]"> */}
      <div className="grid  justify-between gap-16 [@media(min-width:550px)]:grid-cols-2">
        <div className="mt-10 basis-1/3 md:mt-0">
          <div className="">
            <Image
              alt="Paybox 360 logo"
              height={46}
              src={'/images/footer/Paybox-Logo-white.png'}
              width={200}
            />
          </div>

          <div className="gap-6">
           
              <p className="mb-10 mt-4   font-sans  text-sm  text-white md:w-80 [@media(min-width:550px)]:w-72">
                Take control of your personal and organizational management and
                payments with ease. Explore Paybox360!
              </p>
         
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-4 gap-y-6 ">
          <div className="flex">
            <ul className=" whitespace-normal text-white">
              <li className="font-bold uppercase">Company</li>
              <li className="pt-6">Home</li>
              <li className="pt-4">Products</li>
              <li className="pt-4">FAQ</li>
              <li className="pt-4">Pricing</li>
            </ul>
          </div>

          <div className="flex">
            <ul className="whitespace-nowrap text-white">
              <li className="font-bold uppercase">Information</li>
              <li className="pt-6">About</li>
              <li className="pt-4">Contact</li>
              <li className="pt-4">Terms $ Conditions</li>
              <li className="pt-4">Privacy Policy</li>
            </ul>
          </div>

          <div className="md:flex-row  md:gap-[20px]">
            <ul className=" whitespace-nowrap text-white">
              <li className="font-bold uppercase ">SOCIAL MEDIA</li>
              <li className="flex gap-2 pt-6">
                <svg
                  className="mt-1"
                  fill="none"
                  height={16}
                  viewBox="0 0 16 16"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3332 8.75268V11.2173H9.9045V8.91735C9.9045 8.34001 9.69784 7.94601 9.1805 7.94601C8.78584 7.94601 8.5505 8.21135 8.44717 8.46868C8.40984 8.56068 8.39984 8.68868 8.39984 8.81668V11.2173H6.9705C6.9705 11.2173 6.98984 7.32268 6.9705 6.91935H8.39984V7.52801L8.3905 7.54201H8.39984V7.52801C8.58984 7.23468 8.9285 6.81801 9.68784 6.81801C10.6278 6.81801 11.3332 7.43268 11.3332 8.75268ZM5.47517 4.84668C4.9865 4.84668 4.6665 5.16801 4.6665 5.58935C4.6665 6.00268 4.97717 6.33268 5.4565 6.33268H5.46584C5.9645 6.33268 6.2745 6.00201 6.2745 5.58935C6.26517 5.16801 5.9645 4.84668 5.47517 4.84668ZM4.75117 11.2173H6.1805V6.91935H4.75117V11.2173Z"
                    fill="white"
                  />
                  <path
                    d="M3.99992 2.66634C3.6463 2.66634 3.30716 2.80682 3.05711 3.05687C2.80706 3.30691 2.66659 3.64605 2.66659 3.99967V11.9997C2.66659 12.3533 2.80706 12.6924 3.05711 12.9425C3.30716 13.1925 3.6463 13.333 3.99992 13.333H11.9999C12.3535 13.333 12.6927 13.1925 12.9427 12.9425C13.1928 12.6924 13.3333 12.3533 13.3333 11.9997V3.99967C13.3333 3.64605 13.1928 3.30691 12.9427 3.05687C12.6927 2.80682 12.3535 2.66634 11.9999 2.66634H3.99992ZM3.99992 1.33301H11.9999C12.7072 1.33301 13.3854 1.61396 13.8855 2.11406C14.3856 2.61415 14.6666 3.29243 14.6666 3.99967V11.9997C14.6666 12.7069 14.3856 13.3852 13.8855 13.8853C13.3854 14.3854 12.7072 14.6663 11.9999 14.6663H3.99992C3.29267 14.6663 2.6144 14.3854 2.1143 13.8853C1.6142 13.3852 1.33325 12.7069 1.33325 11.9997V3.99967C1.33325 3.29243 1.6142 2.61415 2.1143 2.11406C2.6144 1.61396 3.29267 1.33301 3.99992 1.33301Z"
                    fill="white"
                  />
                </svg>
                <p className="text-base">Linkedln</p>
              </li>
              <li className="flex gap-2 pt-4">
                <svg
                  className="mt-1"
                  fill="none"
                  height={16}
                  viewBox="0 0 16 16"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.31375 8.68666L2.16675 13.8337M13.8334 2.16699L8.68641 7.31399M13.8334 13.8337H11.3774L2.16675 2.16699H4.62275L13.8334 13.8337Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Twitter
              </li>

              <li className="flex gap-2 pt-4">
                <svg
                  className="mt-1"
                  fill="none"
                  height={16}
                  viewBox="0 0 16 16"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1.43464C10.136 1.43464 10.389 1.4426 11.2328 1.48089C11.7401 1.48707 12.2426 1.57979 12.7185 1.75501C13.0636 1.88745 13.3769 2.09035 13.6385 2.35062C13.9 2.6109 14.1039 2.9228 14.237 3.26623C14.413 3.73981 14.5062 4.23993 14.5124 4.74485C14.5505 5.58463 14.5589 5.83637 14.5589 7.96217C14.5589 10.088 14.5509 10.3397 14.5124 11.1795C14.5062 11.6844 14.413 12.1845 14.237 12.6581C14.1039 13.0015 13.9 13.3134 13.6385 13.5737C13.3769 13.834 13.0636 14.0369 12.7185 14.1693C12.2426 14.3446 11.7401 14.4373 11.2328 14.4434C10.3893 14.4814 10.1364 14.4897 8 14.4897C5.86362 14.4897 5.61067 14.4817 4.76724 14.4434C4.2599 14.4373 3.75738 14.3446 3.28152 14.1693C2.93644 14.0369 2.62305 13.834 2.36152 13.5737C2.1 13.3134 1.89613 13.0015 1.76305 12.6581C1.58699 12.1845 1.49383 11.6844 1.48762 11.1795C1.44952 10.3397 1.44114 10.088 1.44114 7.96217C1.44114 5.83637 1.44914 5.58463 1.48762 4.74485C1.49383 4.23993 1.58699 3.73981 1.76305 3.26623C1.89613 2.9228 2.1 2.6109 2.36152 2.35062C2.62305 2.09035 2.93644 1.88745 3.28152 1.75501C3.75738 1.57979 4.2599 1.48707 4.76724 1.48089C5.61105 1.44298 5.864 1.43464 8 1.43464ZM8 0C5.82857 0 5.55505 0.00909916 4.70171 0.0477707C4.03773 0.0609145 3.3808 0.186033 2.75886 0.417805C2.22533 0.61786 1.74209 0.931364 1.34286 1.33644C0.935467 1.73392 0.620188 2.21512 0.419048 2.74644C0.186164 3.36541 0.060445 4.01921 0.0472381 4.68002C0.00914288 5.52852 0 5.80073 0 7.96179C0 10.1228 0.00914283 10.3951 0.048 11.2443C0.0612068 11.9051 0.186926 12.5589 0.41981 13.1779C0.620727 13.7092 0.935742 14.1903 1.34286 14.5879C1.74231 14.9931 2.22582 15.3066 2.75962 15.5065C3.38156 15.7383 4.03849 15.8634 4.70248 15.8766C5.55581 15.9145 5.82819 15.9243 8.00076 15.9243C10.1733 15.9243 10.4457 15.9152 11.299 15.8766C11.963 15.8634 12.62 15.7383 13.2419 15.5065C13.7732 15.3016 14.2556 14.9886 14.6584 14.5875C15.0611 14.1863 15.3754 13.706 15.581 13.1771C15.8138 12.5582 15.9396 11.9044 15.9528 11.2436C15.9909 10.3951 16 10.1228 16 7.96179C16 5.80073 15.9909 5.52852 15.952 4.67926C15.9388 4.01845 15.8131 3.36465 15.5802 2.74568C15.3793 2.21443 15.0643 1.73323 14.6571 1.33569C14.2577 0.930514 13.7742 0.617004 13.2404 0.417046C12.6184 0.185275 11.9615 0.0601563 11.2975 0.0470125C10.445 0.00909922 10.1714 0 8 0Z"
                    fill="white"
                  />
                  <path
                    d="M7.99857 3.87305C7.18605 3.87305 6.39177 4.11284 5.71618 4.5621C5.0406 5.01135 4.51404 5.6499 4.2031 6.39699C3.89216 7.14408 3.8108 7.96615 3.96932 8.75926C4.12784 9.55236 4.5191 10.2809 5.09364 10.8527C5.66818 11.4245 6.40019 11.8139 7.1971 11.9716C7.99402 12.1294 8.82003 12.0484 9.57071 11.739C10.3214 11.4295 10.963 10.9055 11.4144 10.2331C11.8658 9.56074 12.1068 8.77026 12.1068 7.96162C12.1068 6.87726 11.6739 5.83732 10.9035 5.07056C10.1331 4.30381 9.08813 3.87305 7.99857 3.87305ZM7.99857 10.6155C7.47116 10.6155 6.95558 10.4599 6.51705 10.1683C6.07852 9.87666 5.73673 9.46218 5.53489 8.97723C5.33306 8.49229 5.28025 7.95867 5.38315 7.44386C5.48604 6.92905 5.74001 6.45616 6.11295 6.08501C6.48589 5.71385 6.96105 5.46108 7.47833 5.35868C7.99561 5.25628 8.53179 5.30883 9.01906 5.5097C9.50633 5.71057 9.92281 6.05074 10.2158 6.48717C10.5088 6.92361 10.6652 7.43672 10.6652 7.96162C10.6652 8.66548 10.3843 9.34052 9.88419 9.83823C9.38409 10.3359 8.70582 10.6155 7.99857 10.6155Z"
                    fill="white"
                  />
                  <path
                    d="M12.2705 4.66669C12.8007 4.66669 13.2305 4.23894 13.2305 3.71127C13.2305 3.18361 12.8007 2.75586 12.2705 2.75586C11.7404 2.75586 11.3105 3.18361 11.3105 3.71127C11.3105 4.23894 11.7404 4.66669 12.2705 4.66669Z"
                    fill="white"
                  />
                </svg>
                <p className="text-base">Instagram</p>
              </li>

              <li className="flex gap-2 pt-4">
                <svg
                  className="mt-1"
                  fill="none"
                  height={16}
                  viewBox="0 0 16 16"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.14291 4.57138C9.14291 3.42853 9.71434 3.42853 10.2858 3.42853H10.9715C11.086 3.43006 11.1996 3.40865 11.3057 3.36554C11.4117 3.32243 11.5081 3.25851 11.5891 3.17755C11.67 3.09659 11.734 3.00023 11.7771 2.89415C11.8202 2.78808 11.8416 2.67444 11.84 2.55995V1.48567C11.8401 1.37064 11.8172 1.25675 11.7729 1.15062C11.7285 1.04449 11.6635 0.948224 11.5816 0.867419C11.4998 0.786613 11.4027 0.722875 11.2959 0.679903C11.1892 0.636932 11.0751 0.615583 10.96 0.617096L9.33719 0.594239C8.86466 0.575962 8.39378 0.660438 7.95706 0.841835C7.52035 1.02323 7.12819 1.29723 6.80767 1.64492C6.48714 1.99261 6.24587 2.40571 6.10052 2.85571C5.95517 3.30571 5.90919 3.78189 5.96576 4.25138V5.90853H5.06291C4.83255 5.90853 4.61162 6.00004 4.44873 6.16292C4.28585 6.32581 4.19434 6.54674 4.19434 6.7771V7.85138C4.19434 8.08174 4.28585 8.30267 4.44873 8.46556C4.61162 8.62844 4.83255 8.71995 5.06291 8.71995H5.96576V14.8571C5.96576 15.0086 6.02597 15.154 6.13313 15.2612C6.2403 15.3683 6.38564 15.4285 6.53719 15.4285H8.60576C8.7513 15.4198 8.88798 15.3557 8.98784 15.2495C9.08769 15.1433 9.14317 15.0029 9.14291 14.8571V8.71995H10.1486C10.379 8.71995 10.5999 8.62844 10.7628 8.46556C10.9257 8.30267 11.0172 8.08174 11.0172 7.85138V6.7771C11.0172 6.54674 10.9257 6.32581 10.7628 6.16292C10.5999 6.00004 10.379 5.90853 10.1486 5.90853H9.14291V4.57138Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Facebook
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-32 flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <div>
          {' '}
         
            <p className="flex font-sans font-medium text-white">ADDRESS:</p>
        
          <div className="flex">
            <p className="mt-4 flex w-full max-w-[400px] font-sans text-sm  text-white">
              
                27, Alara street, off Commercial Avenue, off Herbert Macaulay
                Road, Yaba, Lagos, Nigeria.
              
            </p>
          </div>
        </div>
        <div className="flex basis-1/2 items-start justify-start">
          {' '}
          <FooterInput />
        </div>
      </div>

      <div className="mt-16 h-[0.3px] w-full bg-white"></div>

      <div className="flex-col sm:flex-row flex w-full items-center justify-between pt-4">
        <p className="whitespace-nowrap pt-6 font-wix-display  text-sm text-white">
          {' '}
          &copy; Paybox360, All Rights Reserved
        </p>

        <div className="">
          <Button
            className="border-t-px ml-12 mt-5 flex h-9 w-28 shrink-0 rounded-lg border-gray-300 bg-[#D8E7FF] py-4 font-medium ring-0 focus-visible:outline-none"
            id="myBtn"
            type="button"
            onClick={scrollToTop}
          >
            
              <p className=" flex gap-[6px] whitespace-nowrap pl-0 font-sans text-xs font-normal text-[#032282]">
                Back to Top
                <Image
                  alt="arrow up"
                  height={14}
                  src={'/images/footer/doublearrowup.png'}
                  width={14}
                />
              </p>
            
          </Button>
        </div>
      </div>
    </footer>
  );
}
