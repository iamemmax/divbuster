    import React from 'react'
    import Link from 'next/link'
    import Image from 'next/image'

    import { Button } from '@/components/core'
    import { DoubleArrow } from '@/icons/core'
    import { cn } from '@/utils/classNames'



    const FooterSection = () => {
        return (
            <footer className='bg-main'>
                <div className='flex flex-col justify-center items-center  px-4 py-6 sm:p-8 md:py-12 lg:px-16'>
                    <section className='flex flex-col md:flex-row md:items-center gap-6 w-full max-w-[1000px] text-white bg-white/10 p-4 md:px-8 rounded-lg'>
                        <div className='max-md:hidden'>
                            <Image
                                alt='footer-icon'
                                height={50}
                                src='/images/landing-page/footer-icon.png'
                                width={50}

                            />
                        </div>
                        <div>
                            <h6 className='flex items-center gap-2 md:text-lg'>
                                <Image
                                    alt='footer-icon'
                                    className='md:hidden'
                                    height={30}
                                    src='/images/landing-page/footer-icon.png'
                                    width={30}
                                />
                                Need to get in contact with us ?
                            </h6>
                            <p className='text-helper-dark text-xs md:text-sm'>For direct assistance and support, contact us via phone call on <Link className='text-white' href="tel:02013300170">02013300170.</Link> or send an email</p>
                        </div>
                        <Button className='w-max md:ml-auto !outline-[1.5px] outline-white outline-offset-4 ' variant='white'>
                            Send an email
                            <DoubleArrow />
                        </Button>
                    </section>


                    <section className='flex flex-col gap-8 lg:grid grid-cols-2 lg:gap-16 xl:gap-24 text-helper-dark max-md:px-6 pt-12 max-md:pb-8 text-[0.875rem] md:text-[0.925rem] max-w-[1000px]'>
                        <div className='lg:w-[82%]'>
                            <h4 className={cn(" font-bold text-xl lg:text-2xl text-white")}>Liberty assured</h4>
                            <p>
                                We seek to bring Financial Liberty and Freedom by filling the void within the business sector ranging from Nano-Micro businesses to SME and personal finances
                            </p>
                        </div>

                        <div className='flex flex-col lg:grid grid-cols-3 gap-6 '>
                            <div>
                                <h6 className='text-lg text-white'>Products</h6>
                                <ul className='flex flex-col gap-3 md:gap-2.5 md:mt-3'>
                                    <li className='hover:text-white/80'>
                                        <Link href="/" >Civil servant loan</Link>
                                    </li>
                                    <li className='hover:text-white/80'>
                                        <Link href="/" >Agent cluster loan</Link>
                                    </li>
                                    <li className='hover:text-white/80'>
                                        <Link href="/" >Micro savings loan</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h6 className='text-lg text-white'>Other links</h6>
                                <ul className='flex flex-col gap-3 md:gap-2.5 md:mt-3'>
                                    <li className='hover:text-white/80'>
                                        <Link href="/" >About us</Link>
                                    </li>
                                    <li className='hover:text-white/80'>
                                        <Link href="/" >Contact us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h6 className='text-lg text-white'>Location</h6>
                                <Link href="https://maps.app.goo.gl/ce4bRCJ5ijtjxELQ6" target='_blank' >No 27, Alara street
                                    sabo yaba, lagos</Link>
                            </div>
                        </div>
                    </section>


                    <section className='flex items-center justify-start gap-4 w-full max-w-[1000px] max-md:px-6 md:mt-6'>
                        <Link className='p-1 rounded-md bg-white/20' href="https://www.twitter.com/">
                            <Image
                                alt='twitter'
                                height={22}
                                src='/images/landing-page/socials-twitter.png'
                                width={22}
                            />
                        </Link>
                        <Link className='p-1 rounded-md bg-white/20' href="https://linkedin.com/">
                            <Image
                                alt='linkedin'
                                height={22}
                                src='/images/landing-page/socials-linkedin.png'
                                width={22}
                            />
                        </Link>
                        <Link className='p-1 rounded-md bg-white/20' href="https://youtube.com/">
                            <Image
                                alt='linkedin'
                                height={22}
                                src='/images/landing-page/socials-youtube.png'
                                width={22}
                            />
                        </Link>
                        <Link className='p-1 rounded-md bg-white/20' href="https://facebook.com/">
                            <Image
                                alt='facebook'
                                height={22}
                                src='/images/landing-page/socials-facebook.png'
                                width={22}
                            />
                        </Link>
                        <Link className='p-1 rounded-md bg-white/20' href="https://instagram.com/">
                            <Image
                                alt='instagram'
                                height={22}
                                src='/images/landing-page/socials-instagram.png'
                                width={22}
                            />
                        </Link>



                    </section>


                    <section className='flex items-center justify-between gap-2.5 sm:gap-5 flex-wrap w-full max-w-[1000px] border-t-[0.15px] border-t-white/30 mt-8 pt-5 text-white'>
                        <small className='text-white/80 text-sm'>
                            Copyright &copy; 2024 Liberty assured. All rights reserved
                        </small>
                        <div className='flex items-center gap-4 lg:gap-12 text-white/80 text-sm'>
                            <Link className='underline' href="#">
                                Privacy Policy
                            </Link>
                            <Link className='underline' href="#">
                                Terms &amp; Conditions
                            </Link>

                        </div>
                    </section>
                </div>


                <div className="relative h-[12.5vh] max-h-[205px] w-screen mt-4 md:mt-8 md:border-t-[0.15px] border-t-white/30 ">
                    <div className="absolute w-full inset-0">
                        <Image
                            alt='footer-pattern'
                            className='py-2 md:py-3'
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            src='/images/landing-page/footer-pattern.svg'
                        />
                    </div>
                </div>

            </footer>
        )
    }

    export default FooterSection