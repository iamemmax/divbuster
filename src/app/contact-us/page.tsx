import React from 'react'
import { LandingHeader } from '../component/layout/landingheader'
import { FaSquareXTwitter, FaLinkedin, FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { AboutIcon } from '../component/icons';

export default function page() {
    return (
        <main className='bg-[#080D27] text-white w-full h-full py-5 px-6 md:px-[120px]'>
            <LandingHeader />
            <div className='mt-20'>
                <button className='capitalize flex justify-center items-center rounded-full pl-6 pr-11 py-[14px] bg-[#34307A] bg-opacity-[20%] text-[14px] font-semibold gap-2'>
                    <AboutIcon />
                    about us
                </button>
                <div className='md:grid '>
                    <div className='mt-5 lg:grid grid-cols-2 [grid-template-areas:"a_c"_"b_c"_"b_c"] lg:gap-x-20'>
                        <div className='[grid-area:a]'>
                            <h1 className='text-2xl md:text-[42px] max-w-[553px] leading-tight font-medium'>
                                Have questions or want to get in touch with us?
                            </h1>
                            <h2 className='text-[#CAC9D4] text-sm mt-2 md:text-lg'>
                                We'd love to hear from you! Feel free to reach out to us.
                            </h2>
                        </div>
                        <form className='flex flex-col font-sans border-[0.3px] border-[#407cff59] mt-5 md:mt-0 py-6 pl-8 pr-12 rounded-xl [grid-area:c]'>
                            <p className='text-[#CAC9D4]'>Get in touch</p>

                            <input type="text" placeholder='Full name' className='bg-[#FFFFFF1A] required: py-4 px-7 text-sm rounded-lg mt-4' />
                            <input type="email" placeholder='Email' className='bg-[#FFFFFF1A] required: py-4 px-7  text-sm rounded-lg mt-4' />
                            <input type="tel" placeholder='Phone no' className='bg-[#FFFFFF1A] required: py-4 px-7 text-sm rounded-lg mt-4' />
                            <input type="text" placeholder='Subject' className='bg-[#FFFFFF1A] required: py-4 pl-7 text-sm rounded-lg mt-4' />
                            <input type="text" placeholder='Message' className='bg-[#FFFFFF1A] required: pt-4 pb-20 px-7 text-sm rounded-lg mt-4' />
                            <button className='rounded-full bg-white text-[#1B1687] py-3 px-5 md:px-9 mt-4 max-w-max'>
                                Send Message
                            </button>
                        </form>
                        <div className='border-[0.3px] border-[#407cff59] py-2 md:py-6 px-3 md:pl-8 md:pr-16 rounded-xl mt-5 font-sans text-xs md:text-base [grid-area:b]'>
                            <div className='bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3'>
                                <p className='text-[#CAC9D4]'>Give us a call on</p>
                                <p className='font-medium'>014567893</p>
                            </div>
                            <div className='bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3'>
                                <p className='text-[#CAC9D4]'>You can email us here</p>
                                <p className='font-medium'>support@liberty.com</p>
                            </div>
                            <div className='bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3'>
                                <p className='text-[#CAC9D4]'>You can visit our office</p>
                                <p className='text-[#CAC9D4]'>9:00am - 5pm(Mon-Fri)</p>
                                <p className='font-medium'>27 Alara street, off commercial avenue, Sabo Yaba, Lagos.</p>
                            </div>
                            <div className='bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3'>
                                <p className='text-[#CAC9D4] pb-1'>Follow us on social media</p>
                                <ul className='flex text-white gap-2 md:gap-5'>
                                    <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg text-xs md:text-xl'>
                                        <FaSquareXTwitter />
                                    </li>
                                    <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg text-xs md:text-xl'>
                                        <FaLinkedin />
                                    </li>
                                    <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg text-xs md:text-xl'>
                                        <FaYoutube />
                                    </li>
                                    <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg text-xs md:text-xl'>
                                        <FaFacebookF />
                                    </li>
                                    <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg text-xs md:text-xl'>
                                        <FaInstagram />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
