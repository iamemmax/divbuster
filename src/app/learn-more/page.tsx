import React from 'react'
import { LandingHeader } from '../component/layout/landingheader'
import Image from 'next/image'

export default function page() {
    return (
        <main className='bg-[#080D27] text-white w-full h-full py-5 px-6 md:px-[120px]'>
            <LandingHeader />
            <div className='flex flex-col lg:flex-row justify-between'>
                <div>
                    <button className='capitalize flex justify-center items-center rounded-full pl-6 pr-11 py-[14px] bg-[#34307A] bg-opacity-[20%] text-[14px] font-semibold gap-2 mt-28'> <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9167 8.25016H10.0833V6.41683H11.9167M11.9167 15.5835H10.0833V10.0835H11.9167M11 1.8335C9.79623 1.8335 8.60423 2.0706 7.49208 2.53127C6.37993 2.99194 5.3694 3.66715 4.5182 4.51835C2.79911 6.23743 1.83334 8.56901 1.83334 11.0002C1.83334 13.4313 2.79911 15.7629 4.5182 17.482C5.3694 18.3332 6.37993 19.0084 7.49208 19.4691C8.60423 19.9297 9.79623 20.1668 11 20.1668C13.4312 20.1668 15.7627 19.2011 17.4818 17.482C19.2009 15.7629 20.1667 13.4313 20.1667 11.0002C20.1667 9.79638 19.9296 8.60438 19.4689 7.49223C19.0082 6.38008 18.333 5.36955 17.4818 4.51835C16.6306 3.66715 15.6201 2.99194 14.5079 2.53127C13.3958 2.0706 12.2038 1.8335 11 1.8335Z" fill="white" />
                    </svg>
                        about us
                    </button>
                    <div>
                        <span>
                            <p className='text-xl md:text-[42px] font-medium max-md:max-w-[642px] mt-1 leading-snug'>
                                Liberty life - Health and Wealth for you.</p>
                            <p className='text-xs md:text-[19px] font-normal text-[#CAC9D4] max-md:max-w-[499px] leading-6'>At Liberty life, we are committed at providing premium
                                health coverage for all our customers.</p>
                            <button className='capitalize flex justify-center items-center rounded-full py-3 px-12 mt-28 bg-[#34307A] bg-opacity-[20%] text-[14px] font-semibold gap-2'>benefits</button>
                        </span>
                    </div>
                </div>
                <div className=' md:basis-1/2 overflow-hidden max-md:mt-6 max-md:max-w-[400px]'>
                    <Image
                        src="/images/faqs/box-gradient.png"
                        className='scale-[1.5] max-md:hidden'
                        width={500}
                        height={500}
                        alt=''
                        objectFit='contain'
                    />
                    <Image
                        src="/images/faqs/mobile-box-gradient.png "
                        className='md:hidden'
                        width={500}
                        height={150}
                        alt=''
                    />
                </div>
            </div>
            <div className='flex flex-col md:grid md:grid-cols-2 mt-8 gap-3 border-[0.3px] md:border-[0px] p-4 md:p-0 rounded-lg border-[#407cff59]'>
                <span className='md:border-[0.3px] rounded-[10px] px-7 md:px-6 py-3 md:py-6 bg-[#FFFFFF0D] md:border-[#407cff59]'>
                    <p className='flex gap-4 text-3xl md:text-[48px] font-bold'>01<span className='text-sm md:text-[15px] font-medium py-2'>premium hospital</span></p>
                    <p className='text-[10px] md:text-[12px] font-normal max-md:max-w-[438px] pt-2'>Liberty life gives you premium hospitals with good healthcare facilities in your preferred state and local government.You can pick from the numerous hospitals around you.</p>
                </span>
                <span className='md:border-[0.3px] rounded-[10px] px-7 md:px-6 py-3 md:py-6 bg-[#FFFFFF0D] md:border-[#407cff59]'>
                    <p className='flex gap-4 text-3xl md:text-[48px] font-bold'>02<span className='text-sm md:text-[15px] font-medium py-2'>Lifestyle Reward</span></p>
                    <p className='text-[10px] md:text-[12px] font-normal max-md:max-w-[438px] pt-2'>Liberty life gives you premium hospitals with good healthcare facilities in your preferred state and local government.You can pick from the numerous hospitals around you.</p>
                </span>
                <span className='md:border-[0.3px] rounded-[10px] px-7 md:px-6 py-3 md:py-6 bg-[#FFFFFF0D] md:border-[#407cff59]'>
                    <p className='flex gap-4 text-3xl md:text-[48px] font-bold'>03<span className='text-xs md:text-[15px] font-medium py-2'>Premium Health Policy</span></p>
                    <p className='text-[10px] md:text-[12px] font-normal max-md:max-w-[438px] pt-2'>Liberty life gives you premium hospitals with good healthcare facilities in your preferred state and local government.You can pick from the numerous hospitals around you.</p>
                </span>
                <span className='md:border-[0.3px] rounded-[10px] px-7 md:px-6 py-3 md:py-6 bg-[#FFFFFF0D] md:border-[#407cff59]'>
                    <p className='flex gap-4 text-3xl md:text-[48px] font-bold'>04<span className='text-sm md:text-[15px] font-medium py-2'>Affordable Plan</span></p>

                    <p className='text-[10px] md:text-[12px] font-normal max-md:max-w-[438px] pt-2'>Liberty life gives you premium hospitals with good healthcare facilities in your preferred state and local government.You can pick from the numerous hospitals around you.</p>
                </span>
            </div>
            <div className='pt-[72px]'>
                <div className='md:flex flex-row bg-[#FFFFFF0D] gap-10 py-3 items-center justify-center pr-14 pl-8 rounded-lg'>
                    <p className='text-xs md:text-[14px] lg:text-[16px] text-[#FFFFFFCC] md:pb-0 pb-4'>
                        Welcome to Liberty life, where your health and wealth is paramount to us. Enjoy health and wealth!
                    </p>
                    <button className='flex justify-between items-center bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]'>
                        Get insurance
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#032282" />
                            <path d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z" fill="white" />
                            <path d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>


        </main>
    )
}
