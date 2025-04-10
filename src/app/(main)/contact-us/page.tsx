"use client";
import React from "react";
import {
  FaSquareXTwitter,
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { AboutIcon } from "@/components/icons";
import Link from "next/link";
import GetInsuranceButton from "../misc/components/GetIsuranceButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, ErrorModal, Textarea } from "@/components/core";
import { useSendMessages } from "./api/sendMessage";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { SmallSpinner } from "@/icons/core";

const contactSchema = z.object({
  fullname: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email address" ),
  phone_number: z
    .string()
    .min(11, { message: "Phone number should be at least 11 digits" })
    .regex(
      /^(080|070|090|081|091)\d{8}$/, // Matches numbers starting with 080, 070, 090, 081, or 091 followed by 8 more digits
      {
        message:
          "Invalid phone number. It should start with 080, 070, 090, 081, or 091 and be 11 digits long.",
      }
    ),
  message: z.string().min(1, { message: "Message is required" }),
});
type ContactTypeProp = z.infer<typeof contactSchema>;
export default function ContactUS() {
     const {
        isErrorModalOpen,
        setErrorModalState,
        openErrorModalWithMessage,
        errorModalMessage,
      } = useErrorModalState();
    
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactTypeProp>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
        fullname: "",
      email: "",
      phone_number: "",
      message: "",
    },
    mode: "onChange",
  });
  const { mutate: sendMessage,isLoading } = useSendMessages();
  const onSubmit = (data: ContactTypeProp) => {
    sendMessage(data, {
      onSuccess: (res) => { 
        reset({ fullname: "", email: "", phone_number: "", message: "" });
        toast.success(res,{id:"success"}) },
      onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                      openErrorModalWithMessage(String(errorMessage));
      }
      })
   
  };
  return (
    <main className="bg-main text-white size-full py-5 px-6 2xl:px-[120px]">
      <div className="mt-20">
        <button className="capitalize flex justify-center items-center rounded-full pl-6 pr-11 py-[14px] bg-[#34307A] bg-opacity-[20%] text-[14px] font-semibold gap-2">
          <AboutIcon />
          contact us
        </button>
        <div className="md:grid ">
          <div className='mt-5 lg:grid grid-cols-2 [grid-template-areas:"a_c"_"b_c"_"b_c"] lg:gap-x-20'>
            <div className="[grid-area:a]">
              <h1 className="text-2xl md:text-[42px] max-w-[553px] leading-tight font-medium">
                Have questions or want to get in touch with us?
              </h1>
              <h2 className="text-[#CAC9D4] text-sm mt-2 md:text-lg">
                We&apos;d love to hear from you! Feel free to reach out to us.
              </h2>
            </div>
            <form
              className="flex flex-col font-sans border-[0.3px] border-[#407cff59] mt-5 lg:mt-0 py-6 pl-8 pr-12 rounded-xl [grid-area:c]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="text-[#CAC9D4]">Get in touch</p>

              <div className="relative mt-[.25rem]">
                <input
                  className={`${errors?.fullname ? "border border-red-700" : ""} bg-[#FFFFFF1A] w-full py-4 px-7 text-sm rounded-lg mt-4`}
                  placeholder="Full name"
                  type="text"
                  id={`name`}
                  {...register(`fullname`)}
                />
                {errors?.fullname && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.fullname?.message}
                  </p>
                )}
              </div>
              <div className="relative mt-[.25rem]">
                <input
                  className={`${errors?.email ? "border border-red-700" : ""} bg-[#FFFFFF1A] w-full py-4 px-7 text-sm rounded-lg mt-4`}
                  placeholder="Email"
                  type="text"
                  id={`email`}
                  {...register(`email`)}
                />
                {errors?.email && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="relative mt-[.25rem]">
                <Controller
                  control={control}
                  name={`phone_number`}
                  render={({ field }) => (
                    <input
                      {...field}
                      {...field}
                      className={`${
                        errors?.phone_number ? "border border-red-700" : ""
                      } bg-[#FFFFFF1A] w-full py-4 px-7 text-sm rounded-lg mt-4`}
                      id="account_no"
                      placeholder="Phone number"
                      type="text"
                      maxLength={11}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
                        // Handle input sanitization on change (typing)
                        const validPhoneNumber = target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        field.onChange(validPhoneNumber);
                      }}
                      onPaste={(e) => {
                        e.target as HTMLInputElement;
                        // Intercept paste event to sanitize pasted content
                        const pastedValue = e.clipboardData.getData("text");
                        // Remove non-numeric characters and limit to 11 digits
                        const sanitizedValue = pastedValue
                          .replace(/[^0-9]/g, "")
                          .slice(0, 11); // Only allow first 11 digits
                        e.preventDefault(); // Prevent the default paste behavior
                        field.onChange(sanitizedValue); // Apply sanitized value
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
                        // Handle input sanitization on input changes
                        const validPhoneNumber = target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        field.onChange(validPhoneNumber);
                      }}
                      // onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />

                {errors?.phone_number && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors?.phone_number?.message}
                  </p>
                )}
              </div>
              {/* <input type="text" placeholder='Subject' className='bg-[#FFFFFF1A] required: py-4 pl-7 text-sm rounded-lg mt-4' /> */}
              <div className="">
                <Textarea
                  className={`${
                    errors?.message ? "border border-red-700" : ""
                  } bg-[#FFFFFF1A] w-full py-4 px-7 text-sm rounded-lg mt-4`}
                  {...register("message")}
                  rows={4}
                />
                {errors?.message && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors?.message?.message}
                  </p>
                )}
              </div>
              <Button  className="rounded-full flex items-center selection md:mt-6 xl:mt-10 gap-x-2 bg-white text-[#1B1687] py-3 px-5 md:px-9 mt-4 max-w-max" disabled={isLoading} type="submit">
                Submit {isLoading && <SmallSpinner color="blue"/>}
              </Button>
            </form>
            <div className="border-[0.3px] border-[#407cff59] py-2 md:py-6 px-3 md:pl-8 md:pr-16 rounded-xl mt-5 font-sans text-xs md:text-sm [grid-area:b]">
              <div className="bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3">
                <p className="text-[#CAC9D4]">Give us a call on</p>
                <p className="font-medium">+234 8077284810</p>
              </div>
              <div className="bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3">
                <p className="text-[#CAC9D4]">You can email us here</p>
                <p className="font-medium">support@liberty.com</p>
              </div>
              <div className="bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3">
                <p className="text-[#CAC9D4]">You can visit our office</p>
                <p className="font-medium">
                  27 Alara street, off commercial avenue, Sabo Yaba, Lagos.
                </p>
                <p className="text-[#CAC9D4]">9:00am - 5pm (Mon-Fri)</p>
              </div>
              <div className="bg-[#FFFFFF0D] py-4 pl-4 md:pl-8 rounded-lg mt-3 !z-[999999999999]">
                <p className="text-[#CAC9D4] pb-1">Follow us on social media</p>
                <ul className="flex text-white gap-2 ">
                  <li className="p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg  text-xs md:text-xl">
                    <Link
                      href="https://x.com/libertylifeplus?s=21&t=hiO-PpveLL2MH-_-IPymTg"
                      target="_blank"
                      title="Twitter"
                    >
                      <FaSquareXTwitter />
                    </Link>
                  </li>
                  <li className="p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg text-xs md:text-xl">
                    <Link
                      href="https://www.linkedin.com/showcase/liberty-life/"
                      target="_blank"
                      title="Linkedin"
                    >
                      <FaLinkedin />
                    </Link>
                  </li>
                  <li className="p-1 md:p-1.5 bg-[#FFFFFF1A]  rounded-lg text-xs md:text-xl">
                    <Link
                      href="https://www.tiktok.com/@libertylife_ng?_t=ZM-8ue6rP2eqcp&_r=1"
                      target="_blank"
                      title="Tiktok"
                    >
                      <FaTiktok />
                    </Link>
                  </li>
                  <li className="p-1 md:p-1.5 bg-[#FFFFFF1A]  rounded-lg text-xs md:text-xl">
                    <Link
                      href="https://bit.ly/CHATLIBERTYLIFE"
                      target="_blank"
                      title="Whatsapp"
                    >
                      <FaWhatsapp />
                    </Link>
                  </li>
                  <li className="p-1 md:p-1.5 bg-[#FFFFFF1A]   rounded-lg text-xs md:text-xl">
                    <Link
                      href="https://www.facebook.com/share/1BKi1NFXdj/"
                      target="_blank"
                      title="Facebook"
                    >
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li className="p-1 md:p-1.5 bg-[#FFFFFF1A] rounded-lg text-xs md:text-xl">
                    <Link
                      href="https://www.instagram.com/libertylifeng?igsh=MTN5anBuanRmYnNneQ%3D%3D&utm_source=qr"
                      target="_blank"
                      title="Instagram"
                    >
                      <FaInstagram />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-[3rem]">
            <div className="md:flex flex-row bg-[#FFFFFF0D] gap-36 pt-4 pb-6 sm:py-3 items-center justify-center pr-16 pl-6 rounded-lg">
              <p className="text-xs md:text-[14px] lg:text[16px] text-[#FFFFFFCC] md:pb-0 pb-4">
                Welcome to Liberty life, where your health and wealth is
                paramount to us. Enjoy health and wealth!
              </p>
              {/* <button className='flex justify-between items-center bg-white text-blue-950 bg rounded-full text-xs py-1 pl-5 pr-2 gap-[18px]'>
                            Get insurance
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="15" fill="#032282" />
                                <path d="M10.9168 19.6171C11.0334 19.6171 11.1501 19.5587 11.2084 19.5004L19.3751 11.3337C19.5501 11.1587 19.5501 10.9254 19.3751 10.7504C19.2001 10.5754 18.9084 10.5754 18.7334 10.7504L10.5668 18.9171C10.3918 19.0921 10.3918 19.3837 10.5668 19.5587C10.6834 19.6171 10.8001 19.6171 10.9168 19.6171Z" fill="white" />
                                <path d="M19.0834 17.4585C19.3167 17.4585 19.55 17.2835 19.55 16.9919V11.0419C19.55 10.8085 19.375 10.5752 19.0834 10.5752H13.075C12.8417 10.5752 12.6084 10.7502 12.6084 11.0419C12.6084 11.3335 12.7834 11.5085 13.075 11.5085H18.6167V17.0502C18.6167 17.2835 18.85 17.4585 19.0834 17.4585Z" fill="white" />
                            </svg>
                        </button> */}

              <GetInsuranceButton />
            </div>
          </div>
        </div>
      </div>

       <ErrorModal
                isErrorModalOpen={isErrorModalOpen}
                setErrorModalState={() => {
                  setErrorModalState(false);
                }}
                subheading={
                  errorModalMessage ||
                  "Please check your inputs and try again."
                }
              />
    </main>
  );
}
