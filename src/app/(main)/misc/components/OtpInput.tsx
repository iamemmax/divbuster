
import React from 'react'
import PinInput from 'react-pin-input';
import { useForm } from 'react-hook-form';
import Image from 'next/image'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const OTPInput = () => {


  const EnterPinOTPFormSchema = z.object({

    OTPdata: z.object({

      otp: z
        .string({ required_error: 'Please enter a correct OTP' })
        .trim()
        .min(1, { message: 'Please enter a correct OTP' }),

    })

  });


  type ResendOTPFormValues = z.infer<
    typeof EnterPinOTPFormSchema
  >;


  // const { handleSubmit, formState: { errors }, } = useForm<VerifyOTPFormValues>({
  //   resolver: zodResolver(EnterPinOTPFormSchema),
  //   defaultValues: {},
  // });

  const {
handleSubmit,
formState: {errors},
  } = useForm<ResendOTPFormValues>({

    resolver: zodResolver(EnterPinOTPFormSchema),
    defaultValues: {}
  })

  
  const onResendOTPSubmit = (submittedData: ResendOTPFormValues) => {
    // eslint-disable-next-line no-console
    console.log(submittedData);
  };


  // const handlePinSubmit = () => {
  //   // eslint-disable-next-line no-console
  //   onResendOTPSubmit();
  // };


  // const {
  //   handleSubmit,
  // } = useForm();

  // const onSubmit = (data: any) => {
  //   //console.log(data);
  //   if (data) {
  //     //
  //   }
  // };

  return (


    <div>



      <form className="" onSubmit={handleSubmit(onResendOTPSubmit)}>

        <div className="w-full pr-[2rem]">


          <PinInput
            autoSelect={false}
            initialValue="o"
            inputFocusStyle={{ border: 'none', background: 'rgba(3, 34, 130, 0.1)', boxShadow: "0 0 0 4.5px #fff, 0 0 0 5.8px #032282" }}
            inputMode="number"
            inputStyle={{
              background: '#ffffff',
              borderRadius: '10px',
              border: 'transparent',
              fontSize: '0.26rem',
              transition: 'all 0.45s ease-in-out',
            }}
            length={6}
            style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', paddingInline: '10px', paddingBlock: '12px', margin: 'auto' }}
            type="numeric"
          // onChange={handleChange}
          // onComplete={handlePinSubmit}

          />

          <div className='flex w-full items-center justify-between'>
            <p className='text-[#fff] text-xs'>0.59</p>


            <div className='flex gap-[0.3rem] '>

              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"

              >
                <circle cx={8} cy={8} r={8} fill="#fff" />
                <path
                  opacity={0.6}
                  d="M4.667 8.323V6.33c0-.92.746-1.663 1.666-1.663h3.334c.92 0 1.666.743 1.666 1.663v2.327c0 .916-.746 1.66-1.666 1.66h-.5a.34.34 0 0 0-.267.133l-.5.663c-.22.294-.58.294-.8 0l-.5-.663a.37.37 0 0 0-.267-.133h-.5c-.92 0-1.666-.744-1.666-1.66z"
                  fill="#1B1687"
                />
                <path
                  d="M8 8a.33.33 0 0 1-.333-.333c0-.184.15-.334.333-.334s.333.15.333.334A.33.33 0 0 1 8 8m1.333 0A.33.33 0 0 1 9 7.667c0-.184.15-.334.333-.334s.334.15.334.334A.33.33 0 0 1 9.333 8M6.667 8a.33.33 0 0 1-.334-.333.334.334 0 0 1 .667 0A.33.33 0 0 1 6.667 8"
                  fill="#fff"
                />
              </svg>


              <button className='text-[#fff] text-xs'>Resend OTP</button>

            </div>




          </div>









        </div>



      </form>


    </div>


  )




}


export default OTPInput