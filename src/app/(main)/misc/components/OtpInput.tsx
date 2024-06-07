
import React from 'react'
import PinInput from 'react-pin-input';
import { useForm } from 'react-hook-form';
import Image from 'next/image'


const OTPInput= () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
      const onSubmit = (data: any) => {
        console.log(data);
      };

return(


<div>



<form className="" onSubmit={handleSubmit(onSubmit)}>
              
              <div className="w-full pr-[4.5rem]">
                

                <PinInput
                  autoSelect={false}
                  initialValue="o"
                  inputFocusStyle={{ border: 'none', background: 'rgba(3, 34, 130, 0.1)', boxShadow: "0 0 0 4.5px #fff, 0 0 0 5.8px #032282"}}
                  inputMode="number"
                  inputStyle={{
                    background: '#ffffff',
                    borderRadius: '10px',
                    border: 'transparent',
                    fontSize: '0.2rem',
                    transition: 'all 0.45s ease-in-out',
                  }}
                  length={6}
                  style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', paddingInline: '10px', paddingBlock: '12px', margin: 'auto' }}
                  type="numeric"
                  // onChange={handleChange}
               
                />

              <div className='flex gap-[10.34rem]'>
                <p className='text-[#fff] text-xs'>0.59</p>


                <div className='flex gap-2 ml-1 '>

                <div className='mt-1'>
                        <Image
                            width={16}
                            height={16}
                            src='/images/landing-page/chat-image.png'
                            alt='chat-image'

                        />
                    </div>

                    <button className='text-[#fff] text-xs'>Resend OTP</button>

                    </div>




              </div>



                  
                  

                

               
              </div>

             
            
            </form>


</div>


)



}

export default OTPInput