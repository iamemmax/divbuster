import Link from 'next/link'
import React from 'react'

import {BgContainer} from './component/hospitalImg'
export default function page() {
  return (
  <>
  
  <main className=' bg-[#080D27] text-white w-full h-full py-5 px-[120px]'>
      <header>
        <section className=''>
          <div className='  flex items-center justify-between'>
            <div>
              <Link href='/' className='flex justify-start font-semibold text-lg'>Liberty Life</Link>
              <p className=' font-light text-[10px]'>by LibertyAssured</p>
            </div>
            <ul className='flex items-center justify-center space-x-5 text-xs'>
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
                <Link href='/'>FAQs</Link>
              </li>
              <li>
                <Link href='/'>Contact us</Link>
              </li>
            </ul>
            <ul className='flex justify-end items-center space-x-5'>
              <li>
                <Link href='/'>login</Link>
              </li>
              <button className='flex justify-between items-center bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]'>
                  Get insurance
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="15" fill="#032282"/>
                  <path d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z" fill="white"/>
                  <path d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z" fill="white"/>
                  </svg>

                </button>
            </ul>
          </div>
            <div className='flex justify-between items-center gap-8'>
              <p>
              <button className='flex items-center rounded-full bg-[#34307A] bg-opacity-[20%] text-[10px] px-6
             py-3 gap-2 space mt-20'><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.93243 1.11687C8.32897 0.876876 8.78364 0.75 9.24716 0.75C9.71067 0.75 10.1653 0.876876 10.5619 1.11687L11.4955 1.68796C12.8054 2.48867 14.2973 2.66696 15.7961 2.84662C16.2805 2.90483 16.7654 2.96258 17.2453 3.04187C17.2453 3.04187 17.2558 3.88246 17.2448 4.26379L17.1491 7.54133C17.0666 10.3523 15.8167 13.0175 13.6726 14.9544C12.6611 15.8679 11.6147 16.6933 10.4125 17.379C10.0581 17.5793 9.6609 17.6915 9.25416 17.7065C8.84741 17.7214 8.44303 17.6385 8.07497 17.4647C6.68668 16.8047 5.45743 15.9678 4.33497 14.9544C2.19089 13.0175 0.941012 10.3523 0.858971 7.54133L0.763638 4.27433C0.752179 3.8875 0.763638 3.04187 0.763638 3.04187C1.15322 2.99604 1.55014 2.958 1.95026 2.91996C3.71622 2.75221 5.54085 2.57896 7.03776 1.66412L7.93243 1.11687ZM8.08322 8.08354V4.87521H9.91656V8.08354H13.1249V9.91687H9.91656V13.1252H8.08322V9.91687H4.87489V8.08354H8.08322Z" fill="white"/>
                </svg> Welcome to LibertyLife
                
              </button>
              <p className=' text-4xl capitalize font-medium py-3'>standard health <span className=' text-lime-600'>insurance</span></p>
              <p className='text-4xl font-medium'> for you and your family.</p>
              <p className='text-[16px] font-light mt-3'>Get a comprehensive health cover and stand a chance to benefit a lifestyle reward of <span className=' font-bold '>₦500,000</span>.</p>
              <p className='py-10'> 
                <button className='flex justify-between items-center bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]'>
                  Get insurance
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="15" fill="#032282"/>
                  <path d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z" fill="white"/>
                  <path d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z" fill="white"/>
                  </svg>
                </button>
              </p>
              </p>
              <div >
                <BgContainer/>
              </div>
            </div>
            <div className='flex py-10 space-x-8'>
              <div className='flex justify-start items-center  space-x-2 py-4 bg-[#1E2954] pt-4 pb-2 px-6 rounded-xl'>
                <span className=''>
                  <p className='flex justify-center items-center'><svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="21" r="20.85" fill="#161D42" stroke="#4760FD" stroke-width="0.3"/>
                    <path d="M20.25 25.5H21.75V21.75H25.5V20.25H21.75V16.5H20.25V20.25H16.5V21.75H20.25V25.5ZM14.615 29C14.155 29 13.771 28.846 13.463 28.538C13.155 28.23 13.0007 27.8457 13 27.385V14.615C13 14.155 13.1543 13.771 13.463 13.463C13.7717 13.155 14.1557 13.0007 14.615 13H27.385C27.845 13 28.229 13.1543 28.537 13.463C28.845 13.7717 28.9993 14.1557 29 14.615V27.385C29 27.845 28.846 28.229 28.538 28.537C28.23 28.845 27.8457 28.9993 27.385 29H14.615ZM14.615 28H27.385C27.5383 28 27.6793 27.936 27.808 27.808C27.9367 27.68 28.0007 27.539 28 27.385V14.615C28 14.4617 27.936 14.3207 27.808 14.192C27.68 14.0633 27.539 13.9993 27.385 14H14.615C14.4617 14 14.3207 14.064 14.192 14.192C14.0633 14.32 13.9993 14.461 14 14.615V27.385C14 27.5383 14.064 27.6793 14.192 27.808C14.32 27.9367 14.461 28.0007 14.615 28Z" fill="white"/>
                    </svg>
                  </p>
                <p className='text-[10px] font-light w-32 text-center bg-[#161D42] -mt-[15px] rounded-xl pt-4 pb-5 px-4 border-[#4760FD]'>
                  over 1000+ Hospitals readily available based on your proximity
                </p>
                </span>
                <span>
                  <p className='flex justify-center items-center'><svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="21" r="20.85" fill="#161D42" stroke="#4760FD" stroke-width="0.3"/>
                    <path d="M21 19.3334C20.116 19.3334 19.2681 18.9822 18.643 18.357C18.0179 17.7319 17.6667 16.8841 17.6667 16C17.6667 15.116 18.0179 14.2681 18.643 13.643C19.2681 13.0179 20.116 12.6667 21 12.6667C21.8841 12.6667 22.7319 13.0179 23.357 13.643C23.9822 14.2681 24.3334 15.116 24.3334 16C24.3334 16.8841 23.9822 17.7319 23.357 18.357C22.7319 18.9822 21.8841 19.3334 21 19.3334ZM21 14C19.8934 14 19 14.8934 19 16C19 17.1067 19.8934 18 21 18C22.1067 18 23 17.1067 23 16C23 14.8934 22.1067 14 21 14Z" fill="white"/>
                    <path d="M29 24.6667C28.6267 24.6667 28.3333 24.3734 28.3333 24C28.3333 23.6267 28.6267 23.3334 29 23.3334C29.3733 23.3334 29.6667 23.04 29.6667 22.6667C29.6667 21.7826 29.3155 20.9348 28.6904 20.3097C28.0652 19.6845 27.2174 19.3334 26.3333 19.3334H25C24.6267 19.3334 24.3333 19.04 24.3333 18.6667C24.3333 18.2934 24.6267 18 25 18C26.1067 18 27 17.1067 27 16C27 14.8934 26.1067 14 25 14C24.6267 14 24.3333 13.7067 24.3333 13.3334C24.3333 12.96 24.6267 12.6667 25 12.6667C25.8841 12.6667 26.7319 13.0179 27.357 13.643C27.9821 14.2681 28.3333 15.116 28.3333 16C28.3333 16.8267 28.04 17.5734 27.5333 18.16C29.52 18.6934 31 20.5067 31 22.6667C31 23.7734 30.1067 24.6667 29 24.6667ZM13 24.6667C11.8933 24.6667 11 23.7734 11 22.6667C11 20.5067 12.4667 18.6934 14.4667 18.16C13.9733 17.5734 13.6667 16.8267 13.6667 16C13.6667 15.116 14.0179 14.2681 14.643 13.643C15.2681 13.0179 16.1159 12.6667 17 12.6667C17.3733 12.6667 17.6667 12.96 17.6667 13.3334C17.6667 13.7067 17.3733 14 17 14C15.8933 14 15 14.8934 15 16C15 17.1067 15.8933 18 17 18C17.3733 18 17.6667 18.2934 17.6667 18.6667C17.6667 19.04 17.3733 19.3334 17 19.3334H15.6667C14.7826 19.3334 13.9348 19.6845 13.3096 20.3097C12.6845 20.9348 12.3333 21.7826 12.3333 22.6667C12.3333 23.04 12.6267 23.3334 13 23.3334C13.3733 23.3334 13.6667 23.6267 13.6667 24C13.6667 24.3734 13.3733 24.6667 13 24.6667ZM25 28.6667H17C15.8933 28.6667 15 27.7734 15 26.6667V25.3334C15 22.76 17.0933 20.6667 19.6667 20.6667H22.3333C24.9067 20.6667 27 22.76 27 25.3334V26.6667C27 27.7734 26.1067 28.6667 25 28.6667ZM19.6667 22C18.7826 22 17.9348 22.3512 17.3096 22.9763C16.6845 23.6015 16.3333 24.4493 16.3333 25.3334V26.6667C16.3333 27.04 16.6267 27.3334 17 27.3334H25C25.3733 27.3334 25.6667 27.04 25.6667 26.6667V25.3334C25.6667 24.4493 25.3155 23.6015 24.6904 22.9763C24.0652 22.3512 23.2174 22 22.3333 22H19.6667Z" fill="white"/>
                    </svg>
                  </p>
                  <p className='text-[10px] font-light w-32 text-center bg-[#161D42] -mt-[15px] rounded-xl pt-4 pb-5 px-4 border-[#4760FD] '>
                  Comprehensive Health cover for both corporate and individuals users.
                  </p>
                </span>
              </div>
              <div className=' bg-[#1E2954] pt-4 pb-2 px-6 rounded-xl'>
                <p className='flex justify-center items-center font-medium text-base capitalize pb-2'>why choose us</p>
              <div className='flex space-x-2'>
                <span className=' bg-[#161D42] rounded-xl py-2 border-[#4760FD] px-1'>
                  <p className='capitalize font-bold text-center'>lifetime rewards</p>
                  <p className=' text-[10px] font-light w-52 text-center text-[#CAC9D4]'>For every insurance plan you buy, you stand a chance to get a lifetime reward.</p>
                </span>
                <span className=' bg-[#161D42] rounded-xl py-2 border-[#4760FD] px-1'>
                  <p className='capitalize font-bold text-center'>standard Hospitals</p>
                  <p className=' text-[10px] font-light w-52 text-center text-[#CAC9D4]'>We give you a standard hospitals in your preferred local government.</p>
                </span>
                <span className=' bg-[#161D42] rounded-xl py-2 border-[#4760FD] px-1'>
                  <p className='capitalize font-bold text-center'>premium health policy</p>
                  <p className=' text-[10px] font-light w-52 text-center text-[#CAC9D4]'>Liberty life provides premium healthcare services to every insurred persons.</p>
                </span>
              </div>
            </div>
            </div>
        </section>
      </header>
        
    </main>
        <div>
        <ul className='capitalize flex justify-around bg-[#161D42] text-[#CAC9D4] py-2 text-[20px] font-light'>
          <li>
            <Link href='/'>liberty assured</Link>
          </li>
          <li>
            <Link href='/'>paybox360</Link>
          </li>
          <li>
            <Link href='/'>VisualPlus</Link>
          </li>
          <li>
            <Link href='/'>whisperSMS</Link>
          </li>
          <li>
            <Link href='/'>winwise</Link>
          </li>
          <li>
            <Link href='/'>Getlinked</Link>
          </li>
        </ul>
      </div>
      </>
  )
}
