'use client';

import { Label } from '@radix-ui/react-label';

import * as React from 'react';

import { Button } from '@/components/core/Button';
import { ErrorModal } from '@/components/core/ErrorModal';
import { Input } from '@/components/core/Input';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderModal } from '@/components/core/LoaderModal';
import { useBooleanStateControl, useErrorModalState } from '@/hooks';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FormError } from '@/components/core';


interface GetStartedProps {
    referral_code?: string | null
}

export function PasswordForm({ }: GetStartedProps) {

    const { state: isLoaderModalOpen, setTrue: _openLoaderModal } =
        useBooleanStateControl();

    const PasswordFormSchema = z.object({

        passwordData: z.object({
            email: z
                .string({ required_error: 'Please enter your email.' })
                .trim()
                .min(5, { message: 'invalid email.' })
                .regex(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, { message: 'Invalid email format.' }),

            password: z
                .string({ required_error: 'Please enter your password.' })
                .trim()
                .min(8, { message: 'password must be at least 8 characters.' }),

            confirmpassword: z
                .string({ required_error: 'Please enter your password.' })
                .trim()
                .min(8, { message: 'Password must be at least 8 characters.' }),
        }).refine(data => data.password === data.confirmpassword, {
            message: "Passwords don't match",
            path: ["confirmpassword"],
        })


    });


    type passwordformProps = z.infer<typeof PasswordFormSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<passwordformProps>({
        resolver: zodResolver(PasswordFormSchema),
        defaultValues: {
            passwordData: {
                email: "",
                password: "",
                confirmpassword: ""

            }
        },

        mode: "onChange",
    })

    const {
        isErrorModalOpen,
        setErrorModalState,
        closeErrorModal,
        errorModalMessage,
    } = useErrorModalState();



    async function handleCreatePassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

    }


    const [passwordShown, setPasswordShown] = React.useState(false);


    const togglePassword = () => {

        setPasswordShown(!passwordShown);
    };


    



    return (
        <>
            <LoaderModal isOpen={isLoaderModalOpen} />

            <form className="relative z-10" onSubmit={handleCreatePassword}>
                <Label className="text-white font-sans text-sm mb-2" htmlFor="phone">
                    Email
                </Label>
                <Input
                    className="login-autofill-text mt-2 login-no-chrome-autofill-bg h-auto rounded-lg  !bg-white/10 px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white focus:!bg-white/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
                    id="email"
                    placeholder="Enter email"
                    type="email"
                    {...register("passwordData.email")}
                />

                {errors?.passwordData?.email && (
                    <FormError
                        className="bg-red-900/40 text-white"
                        errorMessage={errors.passwordData.email.message}
                    />
                )}

                <div className='mt-[2rem]'>

                    <div>

                        <Label className="text-white font-sans text-sm mb-2" htmlFor="password">
                            Password
                        </Label>

                        <div className='flex items-center w-full'>

                            <Input
                                className="login-autofill-text mt-2 login-no-chrome-autofill-bg h-auto rounded-lg  !bg-white/10 px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white focus:!bg-white/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
                                id="password"
                                placeholder="Enter password"
                                type={passwordShown ? "text" : "password"}
                                {...register("passwordData.password")}
                            />




                            <div>
                                <button type="button" className="absolute right-3" onClick={togglePassword}>

                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"

                                    >
                                        <path
                                            d="M.833 9.63S4.166 3.21 10 3.21s9.166 6.42 9.166 6.42-3.333 6.42-9.166 6.42S.833 9.63.833 9.63"
                                            stroke="#fff"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10 12.037c1.38 0 2.5-1.078 2.5-2.407 0-1.33-1.12-2.408-2.5-2.408S7.5 8.3 7.5 9.63s1.12 2.407 2.5 2.407"
                                            stroke="#fff"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                        </div>

                        {errors?.passwordData?.password && (
                            <FormError
                                className=" bg-red-900/40 text-white"
                                errorMessage={errors.passwordData.password.message}
                            />
                        )}



                    </div>

                </div>




                <div className='mt-[2rem]'>

                    <div>

                        <Label className="text-white font-sans text-sm mb-2" htmlFor="password">
                            Confirm Pasword
                        </Label>

                        <div className='flex items-center w-full'>

                            <Input
                                className="login-autofill-text mt-2 login-no-chrome-autofill-bg h-auto rounded-lg  !bg-white/10 px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white focus:!bg-white/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
                                id="password"
                                placeholder="Enter password"
                                type={passwordShown ? "text" : "password"}
                                {...register("passwordData.confirmpassword")}
                            />



                            <div>
                                <button
                                    type="button"
                                    className="absolute right-3"
                                    onClick={togglePassword}>

                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"

                                    >
                                        <path
                                            d="M.833 9.63S4.166 3.21 10 3.21s9.166 6.42 9.166 6.42-3.333 6.42-9.166 6.42S.833 9.63.833 9.63"
                                            stroke="#fff"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10 12.037c1.38 0 2.5-1.078 2.5-2.407 0-1.33-1.12-2.408-2.5-2.408S7.5 8.3 7.5 9.63s1.12 2.407 2.5 2.407"
                                            stroke="#fff"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                        </div>
                        {errors?.passwordData?.confirmpassword && (
                            <FormError
                                className=" bg-red-900/40 text-white"
                                errorMessage={errors?.passwordData?.confirmpassword?.message}
                            />
                        )}





                    </div>

                </div>




                <Link

                    href={`/dashboard`}

                >
                    <Button
                        className="my-6 mt-16 block w-full rounded-[20px] text-[#1B1687] font-sans py-[.9375rem] text-base leading-[normal]"

                        type="submit"
                        variant="white"

                    >

                        Go To Dashboard
                    </Button>
                </Link>
            </form>

            <ErrorModal
                isErrorModalOpen={isErrorModalOpen}
                setErrorModalState={setErrorModalState}
                subheading={
                    errorModalMessage || 'Please check your inputs and try again.'
                }
            >
                <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
                    <Button
                        className="grow bg-red-950 px-1.5 sm:text-sm md:px-6"
                        size="lg"
                        type="button"
                        onClick={closeErrorModal}
                    >
                        Okay
                    </Button>
                </div>
            </ErrorModal>
        </>
    );
}
