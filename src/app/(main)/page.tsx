"use client"

import { cn } from "@/utils/classNames";
import { RightUpArrow } from "@/icons/core";
import { LinkButton } from "@/components/core";


import { CheckStar } from "./misc/icons";
import { HospitalImage } from "./misc/components";
import Marquee from "./misc/components/Marquee";



export default function Home() {
  return (
    <main className="wax-w-screen md:pb-20  bg-main min-h-[100vh]">
      <section className="bg-main  !mb-0 text-white shadow-sm">

        <section className="flex  flex-col md:grid grid-cols-2 items-center justify-between sm:max-lg:px-6 md:pt-12 md:pb-6 ">

          <div className="flex flex-col gap-4  md:gap-6 justify-self-center max-md:px-6 max-md:py-10">
            <h6 className={cn("font-display", "flex items-center text-[0.825rem] w-max font-semibold gap-1.5 px-5 py-1.5 md:py-2 mb-2.5 rounded-full bg-[#34307A]/30")}>
              <span><CheckStar /></span>
              Welcome to Liberty Life
            </h6>
            <h1 className={cn("font-display", "flex flex-col font-bold text-3xl md:text-4xl xl:text-[54px] gap-2")}>
              <span className="flex items-center gap-2">
                Standard Health
                <span className="text-[#AFD85B]">Insurance</span>
              </span>
              <span className="mt-3">
                for you and your family.
              </span>
            </h1>
            <p className="xl:max-w-[593px] font-sans text-[0.825rem] md:text-lg text-helper">
              <span> Get a comprehensive health cover and stand a chance to benefit</span>
              <span className="flex">
                a lifestyle reward of
                <span className="flex flex-col ml-2 text-white">
                  ₦500,000
                  <svg className="-ml-[9px] -mt-[10px]" width="115" height="18" viewBox="0 0 115 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.00121 1C1.82471 8.91989 21.0079 15.563 57.181 15.9801C93.3541 16.3972 112.823 10.1998 113 2.27991" stroke="#F9AB21" stroke-width="3.49639" />
                  </svg>
                </span>
              </span>
            </p>

            <LinkButton href="/" target="_blank" variant="white" className={cn("flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max", "font-display")}>
              Get insurance
              <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
                <RightUpArrow className="" width={12} height={12} />
              </span>
            </LinkButton>
          </div>

          <div className={cn("relative  flex items-center justify-center w-full h-full overflow-hidden",)}>
            <HospitalImage />
          </div>

        </section>


        <section className="w-full xl:px-[120px] xl:my-12">

          <div className={cn("w-full xl:px-[113px] flex flex-col items-center lg:flex-row gap-8 rounded-[20px] xl:py-8 bg-[#FFFFFF08]",)}>

            <div className={cn("bg-[#1E2954] basis-2/5  h-full rounded-[20px] py-8 px-6 flex items-center flex-col md:flex-row gap-8",)}>

              <div className="basis-1/2  flex flex-col items-center justify-center">
                <svg className="z-40" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="21" cy="21" r="20.85" fill="#161D42" stroke="#4760FD" stroke-width="0.3" />
                  <path d="M20.25 25.5H21.75V21.75H25.5V20.25H21.75V16.5H20.25V20.25H16.5V21.75H20.25V25.5ZM14.615 29C14.155 29 13.771 28.846 13.463 28.538C13.155 28.23 13.0007 27.8457 13 27.385V14.615C13 14.155 13.1543 13.771 13.463 13.463C13.7717 13.155 14.1557 13.0007 14.615 13H27.385C27.845 13 28.229 13.1543 28.537 13.463C28.845 13.7717 28.9993 14.1557 29 14.615V27.385C29 27.845 28.846 28.229 28.538 28.537C28.23 28.845 27.8457 28.9993 27.385 29H14.615ZM14.615 28H27.385C27.5383 28 27.6793 27.936 27.808 27.808C27.9367 27.68 28.0007 27.539 28 27.385V14.615C28 14.4617 27.936 14.3207 27.808 14.192C27.68 14.0633 27.539 13.9993 27.385 14H14.615C14.4617 14 14.3207 14.064 14.192 14.192C14.0633 14.32 13.9993 14.461 14 14.615V27.385C14 27.5383 14.064 27.6793 14.192 27.808C14.32 27.9367 14.461 28.0007 14.615 28Z" fill="white" />
                </svg>

                <div className="border-[0.3px] h-[120px] rounded-lg pt-[33px] px-[17px] pb-5 border-[#475ffd54] bg-main -mt-5 w-full">
                  <p className="text-xs  text-center">Over 1000+ Hospitals
                    readily available based
                    on your proximity.</p>
                </div>
              </div>

              <div className="basis-1/2  flex flex-col items-center justify-center">
                <svg className="z-40" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="21" cy="21" r="20.85" fill="#161D42" stroke="#4760FD" stroke-width="0.3" />
                  <path d="M21 19.3334C20.116 19.3334 19.2681 18.9822 18.643 18.357C18.0179 17.7319 17.6667 16.8841 17.6667 16C17.6667 15.116 18.0179 14.2681 18.643 13.643C19.2681 13.0179 20.116 12.6667 21 12.6667C21.8841 12.6667 22.7319 13.0179 23.357 13.643C23.9822 14.2681 24.3334 15.116 24.3334 16C24.3334 16.8841 23.9822 17.7319 23.357 18.357C22.7319 18.9822 21.8841 19.3334 21 19.3334ZM21 14C19.8934 14 19 14.8934 19 16C19 17.1067 19.8934 18 21 18C22.1067 18 23 17.1067 23 16C23 14.8934 22.1067 14 21 14Z" fill="white" />
                  <path d="M29 24.6667C28.6267 24.6667 28.3333 24.3734 28.3333 24C28.3333 23.6267 28.6267 23.3334 29 23.3334C29.3733 23.3334 29.6667 23.04 29.6667 22.6667C29.6667 21.7826 29.3155 20.9348 28.6904 20.3097C28.0652 19.6845 27.2174 19.3334 26.3333 19.3334H25C24.6267 19.3334 24.3333 19.04 24.3333 18.6667C24.3333 18.2934 24.6267 18 25 18C26.1067 18 27 17.1067 27 16C27 14.8934 26.1067 14 25 14C24.6267 14 24.3333 13.7067 24.3333 13.3334C24.3333 12.96 24.6267 12.6667 25 12.6667C25.8841 12.6667 26.7319 13.0179 27.357 13.643C27.9821 14.2681 28.3333 15.116 28.3333 16C28.3333 16.8267 28.04 17.5734 27.5333 18.16C29.52 18.6934 31 20.5067 31 22.6667C31 23.7734 30.1067 24.6667 29 24.6667ZM13 24.6667C11.8933 24.6667 11 23.7734 11 22.6667C11 20.5067 12.4667 18.6934 14.4667 18.16C13.9733 17.5734 13.6667 16.8267 13.6667 16C13.6667 15.116 14.0179 14.2681 14.643 13.643C15.2681 13.0179 16.1159 12.6667 17 12.6667C17.3733 12.6667 17.6667 12.96 17.6667 13.3334C17.6667 13.7067 17.3733 14 17 14C15.8933 14 15 14.8934 15 16C15 17.1067 15.8933 18 17 18C17.3733 18 17.6667 18.2934 17.6667 18.6667C17.6667 19.04 17.3733 19.3334 17 19.3334H15.6667C14.7826 19.3334 13.9348 19.6845 13.3096 20.3097C12.6845 20.9348 12.3333 21.7826 12.3333 22.6667C12.3333 23.04 12.6267 23.3334 13 23.3334C13.3733 23.3334 13.6667 23.6267 13.6667 24C13.6667 24.3734 13.3733 24.6667 13 24.6667ZM25 28.6667H17C15.8933 28.6667 15 27.7734 15 26.6667V25.3334C15 22.76 17.0933 20.6667 19.6667 20.6667H22.3333C24.9067 20.6667 27 22.76 27 25.3334V26.6667C27 27.7734 26.1067 28.6667 25 28.6667ZM19.6667 22C18.7826 22 17.9348 22.3512 17.3096 22.9763C16.6845 23.6015 16.3333 24.4493 16.3333 25.3334V26.6667C16.3333 27.04 16.6267 27.3334 17 27.3334H25C25.3733 27.3334 25.6667 27.04 25.6667 26.6667V25.3334C25.6667 24.4493 25.3155 23.6015 24.6904 22.9763C24.0652 22.3512 23.2174 22 22.3333 22H19.6667Z" fill="white" />
                </svg>


                <div className="border-[0.3px]  h-[120px] rounded-lg pt-[33px] px-[17px] pb-5 border-[#475ffd54] bg-main -mt-5 w-full">
                  <p className="text-xs text-center">Premium health cover
                    for both corporate and
                    individuals users.</p>
                </div>
              </div>

            </div>


            <div className={cn("bg-[#1E2954] basis-full  h-full rounded-[20px] py-8 px-6 flex items-center flex-col md:flex-row gap-8",)}>

              <div className="basis-1/2  flex flex-col items-center justify-center">
                <div className="border-[0.3px] flex flex-col items-center rounded-lg py-4 px-[17px] border-[#475ffd54] bg-main  w-full">
                  <h3 className="font-sans font-semibold text-white">Lifetime  Rewards</h3>
                  <p className="text-xs  text-center mt-2 font-sans text-[#CAC9D4]">
                    For every insurance plan you buy, you
                    stand a chance to get a lifetime reward.
                  </p>

                  <div className="flex gap-3 mt-4">
                    <LinkButton
                      className="text bg-transparent px-3 py-2.5 text-white"
                      color="#ffffff"
                      href={`/`}
                    >
                      Learn more{' '}
                      <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8929 6.52743C14.9511 7.60212 14.9864 9.32226 13.9988 10.44L13.8929 10.5534L11.0063 13.3139C10.7326 13.5918 10.2889 13.5918 10.0152 13.3139C9.76264 13.0573 9.74321 12.6536 9.95695 12.3744L10.0152 12.3074L12.9019 9.54691C13.4205 9.0203 13.4477 8.18371 12.9838 7.62446L12.9019 7.53393L10.0152 4.77348C9.74159 4.49554 9.74159 4.04492 10.0152 3.76698C10.2679 3.51043 10.6653 3.49069 10.9402 3.70778L11.0063 3.76698L13.8929 6.52743Z" fill="white" />
                        <g opacity="0.3">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.68885 6.52743C10.747 7.60212 10.7823 9.32226 9.79466 10.44L9.68885 10.5534L6.80216 13.3139C6.5285 13.5918 6.08481 13.5918 5.81115 13.3139C5.55854 13.0573 5.53911 12.6536 5.75285 12.3744L5.81115 12.3074L8.69784 9.54691C9.21635 9.0203 9.24364 8.18371 8.77971 7.62446L8.69784 7.53393L5.81115 4.77348C5.53749 4.49554 5.53749 4.04492 5.81115 3.76698C6.06376 3.51043 6.46124 3.49069 6.73614 3.70778L6.80216 3.76698L9.68885 6.52743Z" fill="white" />
                        </g>
                      </svg>

                    </LinkButton>
                  </div>

                </div>
              </div>

              <div className="basis-1/2  flex flex-col items-center justify-center">
                <div className="border-[0.3px]  flex flex-col items-center rounded-lg py-4 px-[17px] border-[#475ffd54] bg-main  w-full">
                  <h3 className="font-sans font-semibold text-white">Standard Hospitals</h3>
                  <p className="text-xs  text-center mt-2 font-sans text-[#CAC9D4]">
                    For every insurance plan you buy, you
                    stand a chance to get a lifetime reward.
                  </p>


                  <div className="flex gap-3 mt-4">
                    <LinkButton
                      className="text bg-transparent px-3 py-2.5 text-white"
                      color="#ffffff"
                      href={`/`}
                    >
                      Learn more{' '}
                      <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8929 6.52743C14.9511 7.60212 14.9864 9.32226 13.9988 10.44L13.8929 10.5534L11.0063 13.3139C10.7326 13.5918 10.2889 13.5918 10.0152 13.3139C9.76264 13.0573 9.74321 12.6536 9.95695 12.3744L10.0152 12.3074L12.9019 9.54691C13.4205 9.0203 13.4477 8.18371 12.9838 7.62446L12.9019 7.53393L10.0152 4.77348C9.74159 4.49554 9.74159 4.04492 10.0152 3.76698C10.2679 3.51043 10.6653 3.49069 10.9402 3.70778L11.0063 3.76698L13.8929 6.52743Z" fill="white" />
                        <g opacity="0.3">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.68885 6.52743C10.747 7.60212 10.7823 9.32226 9.79466 10.44L9.68885 10.5534L6.80216 13.3139C6.5285 13.5918 6.08481 13.5918 5.81115 13.3139C5.55854 13.0573 5.53911 12.6536 5.75285 12.3744L5.81115 12.3074L8.69784 9.54691C9.21635 9.0203 9.24364 8.18371 8.77971 7.62446L8.69784 7.53393L5.81115 4.77348C5.53749 4.49554 5.53749 4.04492 5.81115 3.76698C6.06376 3.51043 6.46124 3.49069 6.73614 3.70778L6.80216 3.76698L9.68885 6.52743Z" fill="white" />
                        </g>
                      </svg>

                    </LinkButton>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      </section>



      {/* <section className={cn("fixed bottom-0 w-full z-20 bg-[#161D42] hover:!opacity-100 text-main py-4 !rounded-none text-lg", "font-display")}>
        <ul className="px-[120px] grid grid-cols-2 gap-x-8 gap-y-2 py-3.5 font-clash sm:flex sm:items-center sm:justify-between xl:py-5 xl:text-xl">
          <li className="w-max text-white opacity-50">Liberty Assured</li>
          <li className="w-max text-white opacity-50">Paybox360</li>
          <li className="w-max text-white opacity-50">VisualPlus</li>
          <li className="w-max text-white opacity-50">WhisperSMS</li>
          <li className="w-max text-white opacity-50">WinWise</li>
          <li className="w-max text-white opacity-50">Getlinked</li>
        </ul>
      </section> */}

      <Marquee />
    </main>


  );
}
