import Link from 'next/link'
import React from 'react'
import { DrawerMenu, Button } from '../core'
import { DrawerClose } from '../core/Drawer'
import { BgContainer } from '../hospitalImg'
import { cn } from '../utils/classNames'

export const LandingHeader = () => {
    return (
        <>
            <header>
                <section className=''>
                    <div className='  flex items-center justify-between'>
                        <div>
                            <Link href='/' className='flex justify-start font-semibold text-lg'>Liberty Life</Link>
                            <p className=' font-light text-[10px]'>by LibertyAssured</p>
                        </div>
                        <ul className='hidden md:flex items-center justify-center space-x-5 text-xs'>
                            <li>
                                <Link href='/'>Home</Link>
                            </li>
                            <li>
                                <Link href='/'>Plan</Link>
                            </li>
                            <li>
                                <Link href='/'>About us</Link>
                            </li>
                            <li>
                                <Link href='/faqs'>FAQs</Link>
                            </li>
                            <li>
                                <Link href='/contact-us'>Contact us</Link>
                            </li>
                        </ul>
                        <ul className='hidden md:flex justify-end items-center space-x-5'>
                            <li>
                                <Link href='/'>login</Link>
                            </li>
                            <button className='flex justify-between items-center bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]'>
                                Get insurance
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15" r="15" fill="#032282" />
                                    <path d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z" fill="white" />
                                    <path d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z" fill="white" />
                                </svg>

                            </button>
                        </ul>
                        <DrawerMenu
                            trigger={
                                <Button className={cn("md:hidden bg-white/10 px-5 py-2.5 rounded-full", "font-display")}>
                                    Menu
                                </Button>
                            }
                            contentClass="bg-main border-main"
                        >
                            <div className="text-white p-5 pb-0 gap-5">
                                <header className="flex items-center justify-between">
                                    <h6 className="font-semibold text-lg">Menu Content</h6>
                                    <DrawerClose className={cn("bg-white/10 h-8 w-8 rounded-full text-white/50 rotate-12 text-lg hover:text-white", "font-display")}>x</DrawerClose>
                                </header>


                                <ul className={cn("font-display", "flex flex-col gap-8 font-normal mt-10")}>
                                    <li className="border-b-[0.15px] border-b-white/30 p-2">
                                        <Link href='/'>Home</Link>
                                    </li>
                                    <li className="border-b-[0.15px] border-b-white/30 p-2">
                                        <Link href='/'>Products</Link>
                                    </li>
                                    <li className="border-b-[0.15px] border-b-white/30 p-2">
                                        <Link href='/'>Company</Link>
                                    </li>
                                    <li className="border-b-[0.15px] border-b-white/30 p-2">
                                        <Link href='/'>About us</Link>
                                    </li>
                                    <li className="border-b-[0.15px] border-b-white/30 p-2">
                                        <Link href='/'>Contact us</Link>
                                    </li>
                                </ul>
                            </div>
                        </DrawerMenu>
                    </div>

                </section>
            </header>
        </>
    )
}
