import React from 'react'
import { FaSquareXTwitter, FaLinkedin, FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { AboutIcon } from '@/components/icons';
import Link from 'next/link';
import GetInsuranceButton from '../misc/components/GetIsuranceButton';

export default function page() {
    return (
        <main className='bg-main text-white size-full py-5 px-6 md:px-[120px]'>
            <div className='mt-20'>
                <button className='capitalize flex justify-center items-center rounded-full pl-6 pr-11 py-[14px] bg-[#34307A] bg-opacity-[20%] text-[14px] font-semibold gap-2'>
                    <AboutIcon />
                    contact us
                </button>
                <div className='md:grid '>
                    <div className='mt-5 lg:grid grid-cols-2 [grid-template-areas:"a_c"_"b_c"_"b_c"] lg:gap-x-20'>
                        <div className='[grid-area:a]'>
                            <h1 className='text-2xl md:text-[42px] max-w-[553px] leading-tight font-medium'>
                                Have questions or want to get in touch with us?
                            </h1>
                            <h2 className='text-[#CAC9D4] text-sm mt-2 md:text-lg'>
                                We&apos;d love to hear from you! Feel free to reach out to us.
                            </h2>
                        </div>
                        <form className='flex flex-col font-sans border-[0.3px] border-[#407cff59] mt-5 lg:mt-0 py-6 pl-8 pr-12 rounded-xl [grid-area:c]'>
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
                        <div className='border-[0.3px] border-[#407cff59] py-2 md:py-6 px-3 md:pl-8 md:pr-16 rounded-xl mt-5 font-sans text-xs md:text-sm [grid-area:b]'>
                            <div className='bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3'>
                                <p className='text-[#CAC9D4]'>Give us a call on</p>
                                <p className='font-medium'>+234 8077284810</p>
                            </div>
                            <div className='bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3'>
                                <p className='text-[#CAC9D4]'>You can email us here</p>
                                <p className='font-medium'>support@liberty.com</p>
                            </div>
                            <div className='bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3'>
                                <p className='text-[#CAC9D4]'>You can visit our office</p>
                                <p className='font-medium'>27 Alara street, off commercial avenue, Sabo Yaba, Lagos.</p>
                                <p className='text-[#CAC9D4]'>9:00am - 5pm (Mon-Fri)</p>
                            </div>
                            <div className='bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3 !z-[9999999999999999]'>
                                <p className='text-[#CAC9D4] pb-1'>Follow us on social media</p>
                                <ul className='flex text-white gap-2 '>
                                <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg z-[999999999999] text-xs md:text-xl'>
                                    <Link href='https://x.com/libertylifeplus?s=21&t=hiO-PpveLL2MH-_-IPymTg' target='_blank' title='Twitter'>
                                            <FaSquareXTwitter />
                                    </Link>
                                        </li>
                                        <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg z-[999999999999] text-xs md:text-xl'>
                                    <Link href='https://www.linkedin.com/showcase/liberty-life/' target='_blank' title='Linkedin'>
                                            <FaLinkedin />
                                    </Link>
                                        </li>
                                        <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] z-[999999999999]  rounded-lg text-xs md:text-xl'>
                                    <Link href='https://www.tiktok.com/@libertylife_ng?_t=ZM-8ue6rP2eqcp&_r=1' target='_blank' title='Tiktok'>
                                            <FaTiktok />
                                    </Link>
                                        </li>
                                        <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] z-[999999999999]  rounded-lg text-xs md:text-xl'>
                                    <Link href='https://bit.ly/CHATLIBERTYLIFE' target='_blank' title='Whatsapp'>
                                            <FaWhatsapp />
                                    </Link>
                                        </li>
                                        <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] z-[999999999999]   rounded-lg text-xs md:text-xl'>
                                    <Link href='https://www.facebook.com/share/1BKi1NFXdj/' target='_blank' title='Facebook'>
                                            <FaFacebookF /> 
                                    </Link>
                                        </li>
                                        <li className='p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg z-[999999999999] text-xs md:text-xl'>
                                    <Link href='https://www.instagram.com/libertylifeng?igsh=MTN5anBuanRmYnNneQ%3D%3D&utm_source=qr' target='_blank' title='Instagram'>
                                            <FaInstagram />
                                    </Link>
                                        </li>
                                </ul>
                            </div>
                        </div>
                    </div>
  <div className='py-[3rem]'>
                    <div className='md:flex flex-row bg-[#FFFFFF0D] gap-36 pt-4 pb-6 sm:py-3 items-center justify-center pr-16 pl-6 rounded-lg'>
                        <p className='text-xs md:text-[14px] lg:text[16px] text-[#FFFFFFCC] md:pb-0 pb-4'>
                            Welcome to Liberty life, where your health and wealth is paramount to us. Enjoy health and wealth!
                        </p>
                        {/* <button className='flex justify-between items-center bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]'>
                            Get insurance
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="15" fill="#032282" />
                                <path d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z" fill="white" />
                                <path d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z" fill="white" />
                            </svg>
                        </button> */}

                        <GetInsuranceButton/>
                    </div>
                </div>
                </div>
            </div>
        </main>
    )
}
