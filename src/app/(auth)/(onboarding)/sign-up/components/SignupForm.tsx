import { Button, ErrorModal, LinkButton } from '@/components/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {motion} from "framer-motion"
import EyeIcon from '@/app/(main)/misc/icons/EyeIcon';
import { useErrorModalState } from '@/hooks';
import { useOnboardUser } from '../../api/signup/onboardUser';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { SmallSpinner } from '@/icons/core';

const formSchema = z
  .object({
    full_name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters" }),
      phone_number: z
    .string()
    .min(11, { message: "Phone number should be at least 11 digits" })
    .regex(/^0\d{10}$/, { message: "Phone number must start with 0 and be 11 digits long" }),
    email: z.string().email({ message: "Invalid email address" }),
    bvn: z
      .string().optional(),
    //   .optional(), // BVN is optional until step 2
    password: z
      .string({ required_error: "Please enter your password." })
      .trim()
      .min(5, { message: "Password must be at least 5 characters." })
      .refine(
        (value) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/.test(
            value
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      )
     ,
      dob: z.string().min(1, {message:'please enter your date of birth'}),
    confirm_password: z
      .string({ required_error: "Please enter your password." })
      .trim()
      .min(1, { message: "Password must be at least 1 characters." }),
    //   .optional(),
  })
  .refine((data) => data?.password === data?.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type FormValues = z.infer<typeof formSchema>;
const SignupForm = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
      } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          phone_number: "",
          bvn: "",
          confirm_password: "",
          email: "",
          full_name: "",
          password: "",
        },
        mode: "onChange",
      });
      const [step, setStep] = useState(1); // Track the current step
      const [passwordShown, setPasswordShown] = React.useState(false);
    
      const handleNextStep = async () => {
        // Trigger validation only for the fields relevant to the current step
        let isValid = false;
    
        if (step === 1) {
          // Only validate fields for Step 1 (full_name, phone_number, and email)
          isValid = await trigger(["full_name", "phone_number", "email","dob"]);
        } else if (step === 2) {
          // Validate all fields for Step 2 (full_name, phone_number, email, bvn, password, confirm_password)
          isValid = await trigger();
        }
    
        if (isValid) {
          setStep((prev) => prev + 1); // Proceed to the next step if validation passes
        }
      };
    
      const handlePrevStep = () => {
        setStep((prev) => prev - 1); // Go back to the previous step
      };
    
      const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };
      const {
        isErrorModalOpen,
        setErrorModalState,
        // closeErrorModal,
        openErrorModalWithMessage,
        errorModalMessage,
      } = useErrorModalState();
    
      const router = useRouter();
      const {mutate:handleOnboardUser,isLoading}= useOnboardUser()
      const onSubmit = (data: FormValues) => {
        handleOnboardUser(
            {
              data
            },
            {
              onSuccess: () => {
                if(data){
                  toast.success("Registration Successfull")
                  router.replace("/login")
                }
              },
              onError: (error) => {
                const errorMessage = formatAxiosErrorMessage(error as AxiosError);
           
                openErrorModalWithMessage(String(errorMessage));
              },
            }
          );
      };

      console.log(errors);
      
  return (
    <div className='relative'>
    <form  onSubmit={handleSubmit(onSubmit)}>


    {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            

  <div className="mb-3">
              <Label className="text-white text-sm mb-2" htmlFor="full_name">
                Full Name
              </Label>
              <input
                className={`${
                  errors?.full_name ? "border border-red-700" : ""
                } text-[#fff] text-xs outline-none h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                placeholder="Full Name"
                type="text"
                id="full_name"
                {...register("full_name")}
              />
              {errors?.full_name && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label className="text-white text-sm mb-2" htmlFor="phone_number">
                Phone Number
              </Label>
              <Controller
                control={control}
                name="phone_number"
                render={({ field }) => (
                  <input
                    {...field}
                    className={`${
                      errors?.phone_number ? "border border-red-700" : ""
                    } text-[#fff] text-xs outline-none h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                    id="phone_no"
                    maxLength={11}
                    placeholder="Enter Phone number"
                    type="text"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      const validPhoneNumber = target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      field.onChange(validPhoneNumber);
                    }}
                    onPaste={(e) => {
                      const target = e.target as HTMLInputElement;
                      const pastedValue = e.clipboardData.getData("text");
                      const sanitizedValue = pastedValue.replace(/[^0-9]/g, "");
                      e.preventDefault();
                      field.onChange(sanitizedValue);
                    }}
                  />
                )}
              />
              {errors?.phone_number && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label className="text-white text-sm mb-2" htmlFor="email">
                Email Address
              </Label>
              <input
                className={`${
                  errors?.email ? "border border-red-700" : ""
                } text-[#fff] text-xs outline-none h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                placeholder="Email Address"
                type="email"
                id="email"
                {...register("email")}
              />
              {errors?.email && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-3">
                        <Label
                          className="mb-1 block text-xs text-[#fff]"
                          htmlFor={`dob`}
                        >
                          Date of Birth
                        </Label>
                        <div className="relative mt-[.25rem]">
                          <input
                            className={`${
                              errors?.dob
                                ? "border border-red-700"
                                : ""
                            } text-[#fff] text-xs outline-none rounded-lg px-6 w-full h-[2.875rem] bg-[#2a3150]`}
                            placeholder="Enter Date of Birth"
                            type="date"
                            id={`dob`}
                            {...register(`dob`)}
                          />
                        </div>
                      </div>

            <div className="grid grid-cols-1items-center w-full gap-[1.3125rem] mt-7">
              
              <Button
                className="bg-white block text-primary py-4  rounded-[1.25rem] mt-4"
                type="button"
                onClick={handleNextStep}
              >
                Continue
              </Button>

              
              <LinkButton
                        href={"/login"}
                        className=" block w-full rounded-[20px] bg-[#080D27]  border-[0.5px] border-white border-opacity-40 text-[#fff] font-sans py-[.9375rem] text-base leading-[normal]"
                        type="submit"
                        variant="white"
                      >
                      <p className="text-xs text-[#f4f4f4] text-opacity-60">  Already have an account ? <span className="text-white text-sm text-opacity-100"> Login</span></p>
                      </LinkButton>
            </div>
          </motion.div>
        )}







{step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <Label className="text-white text-sm mb-2" htmlFor="bvn">
                BVN{" "}
                <span className="text-xxs">
                  (This is a requirement from the CBN to create an account for
                  you)
                </span>
              </Label>
              <Controller
                control={control}
                name="bvn"
                render={({ field }) => (
                  <input
                    {...field}
                    className={`${
                      errors?.bvn ? "border border-red-700" : ""
                    } text-[#fff] text-xs outline-none login-no-chrome-autofill-bg h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                    id="bvn"
                    maxLength={11}
                    placeholder="Enter BVN number"
                    type="text"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      const validBvn = target.value.replace(/[^0-9]/g, "");
                      field.onChange(validBvn);
                    }}
                    onPaste={(e) => {
                      const target = e.target as HTMLInputElement;
                      const pastedValue = e.clipboardData.getData("text");
                      const sanitizedValue = pastedValue.replace(/[^0-9]/g, "");
                      e.preventDefault();
                      field.onChange(sanitizedValue);
                    }}
                  />
                )}
              />
              <p className="text-xxs text-[#eee] py-1 text-opacity-90">
                Don’t know your BVN?, Dial *565*0# to get your BVN
              </p>
              {errors?.bvn && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.bvn.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <div>
                <Label
                  className="text-white font-sans text-sm mb-2"
                  htmlFor="password"
                >
                  Password
                </Label>

                <div
                  className={`${
                    errors?.password ? "border border-red-700" : ""
                  } flex items-center w-full pr-10 md:pr-16 !bg-[#2a3150] rounded-lg h-[3rem]`}
                >
                  <input
                    className="focus-visible:outline-none pr-7 login-no-chrome-autofill-bg h-full outline-none border-none rounded-lg bg-transparent px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
                    id="password"
                    placeholder="Enter password"
                    type={passwordShown ? "text" : "password"}
                    {...register("password")}
                    autoComplete="off"
                  />

                  <button
                    type="button"
                    className="absolute right-5"
                    onClick={togglePassword}
                  >
                    <EyeIcon />
                  </button>
                </div>
                <p className="text-xxs text-[#eee] py-1 text-opacity-90">
                  Must be at least 8 characters long - uppercase, lowercase,
                  number, special characters (@*-!_)
                </p>

                {errors?.password && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <Label
                className="text-white font-sans text-sm mb-2"
                htmlFor="confirm_password"
              >
                Confirm Password
              </Label>

              <div
                className={`${
                  errors?.confirm_password ? "border border-red-700" : ""
                } flex items-center w-full pr-10 md:pr-16 !bg-[#2a3150] rounded-lg h-[3rem]`}
              >
                <input
                  className="login-autofill-text !outline-none !border-none login-no-chrome-autofill-bg h-full rounded-lg bg-transparent px-6 py-3.5 text-sm font-sans font-medium text-white placeholder"
                  id="confirm_password"
                  placeholder="Confirm password"
                  type={passwordShown ? "text" : "password"}
                  {...register("confirm_password")}
                  style={{ outline: "none", border: "none" }}
                />

                <button
                  type="button"
                  className="absolute right-5"
                  onClick={togglePassword}
                >
                  <EyeIcon />
                </button>
              </div>

              {errors?.confirm_password && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 items-center w-full gap-[1.3125rem] mt-7">
              <Button
                className=" text-white py-4 block  border-[0.3px] border-opacity-65 border-white  rounded-[1.25rem] mt-4"
                type="button"
                variant={"outlined"}
                onClick={handlePrevStep}
              >
                Back
              </Button>
              <Button
                className="bg-white  flex justify-center items-center gap-x-3 text-primary py-4  rounded-[1.25rem] mt-4"
                type="submit"
              >
                Sign up {isLoading&&<SmallSpinner  color="#1B1687" />}
              </Button>
            </div>
          </motion.div>
        )}



    
    
    </form>
    <ErrorModal
                    isErrorModalOpen={isErrorModalOpen}
                    setErrorModalState={setErrorModalState}
                    subheading={
                      errorModalMessage || "Please check your inputs and try again."
                    }
                  ></ErrorModal>
    </div>
  )
}

export default SignupForm