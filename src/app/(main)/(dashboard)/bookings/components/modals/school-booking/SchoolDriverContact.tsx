"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// const durationOptions = ["1 Hour", "2 Hours", "4 Hours", "8 Hours"];

const bookingSchema = z.object({
  first_name: z.string().min(1, "Diver name is required"),
  last_name: z.string().min(1, "Diver name is required"),
  email: z.string().email("Enter a valid email"),
  // duration: z.enum(["1 Hour", "2 Hours", "4 Hours", "8 Hours"]),
});

export type BookingDriverFormValues = z.infer<typeof bookingSchema>;
interface Props {
  next: () => void;
  back: () => void;
  setDiverInfo: React.Dispatch<React.SetStateAction<BookingDriverFormValues>>
  diverInfo:BookingDriverFormValues
}
const SchoolDriverContact = ({ back, next,diverInfo,setDiverInfo }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingDriverFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      first_name: diverInfo?.first_name || "",
      last_name:diverInfo?.last_name || "",
      email:diverInfo?.email|| "",
      // duration: "2 Hours",
    },
    mode: "onChange",
  });

  // const selectedDuration = watch("duration");

  const onSubmit = (data: BookingDriverFormValues) => {
    console.log("Form submitted:", data);
    setDiverInfo({email:data?.email, first_name:data?.first_name,last_name:data?.last_name})
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 md:px-4 bg-transparent   text-sm text-gray-900 dark:text-white"
    >
      <div className="max-h-[70vh] w-full overflow-y-auto">
        {/* Diver Name */}
        <div className="border-b  border-[#EAECF0] dark:border-gray-700 py-4">
          <div className="grid  grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#344054] dark:text-white font-archivo text-sm">
            First Name
            </label>
            <div className="flex flex-col gap-y-3">
              <input
                {...register("first_name")}
                placeholder="Enter Main Diver Name"
                className={`w-full p-3 outline-none rounded-md border ${errors.first_name ? "border-red-900" : "border-gray-300 dark:border-gray-600"}   bg-white dark:bg-gray-800 text-sm text-black dark:text-white`}
              />
            </div>
            {errors.first_name && (
              <p className="text-red-500 text-xs ">
                {errors.first_name.message}
              </p>
            )}
          </div>
        </div>
        {/* Diver Name */}
        <div className="border-b  border-[#EAECF0] dark:border-gray-700 py-4">
          <div className="grid  grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#344054] dark:text-white font-archivo text-sm">
               Last Name
            </label>
            <div className="flex flex-col gap-y-3">
              <input
                {...register("last_name")}
                placeholder="Enter Main Diver Name"
                className={`w-full p-3 outline-none rounded-md border ${errors.last_name ? "border-red-900" : "border-gray-300 dark:border-gray-600"}   bg-white dark:bg-gray-800 text-sm text-black dark:text-white`}
              />
            </div>
            {errors.last_name && (
              <p className="text-red-500 text-xs ">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        {/* Diver Email */}
        <div className="border-b  border-[#EAECF0] dark:border-gray-700 py-4">
          <div className="grid  grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#344054] dark:text-white font-archivo text-sm">
               Email Address
            </label>
            <div className="flex flex-col gap-y-3">
              <input
                {...register("email")}
                placeholder="Enter Main Diver Email Address"
                className={`w-full p-3 rounded-md  outline-none border ${errors.email ? "border-red-900" : "border-gray-300 dark:border-gray-600"}   bg-white dark:bg-gray-800 text-sm text-black dark:text-white`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs ">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Select Duration */}
        {/* <div className="grid bord-b  border-[#EAECF0] dark:border-gray-700 py-7 grid-cols-1 md:grid-cols-[200px_1fr] items-start gap-4 relative">
          <label className="text-[#344054] dark:text-white font-archivo text-sm">
            Select Duration
          </label>
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-3 text-left bg-white dark:bg-gray-800 border border-gray- dark:border-gray-600300  rounded-lg flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none"
            >
              <span
                className={
                  selectedDuration
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500"
                }
              >
                {selectedDuration || "Select Duration"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-300" />
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray- dark:border-gray-600300  rounded-lg shadow-lg">
                {durationOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setValue(
                        "duration",
                        option as BookingFormValues["duration"]
                      );
                      setIsOpen(false);
                    }}
                    className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {errors.duration && (
          <p className="text-red-500 text-xs ml-[200px]">
            {errors.duration.message}
          </p>
        )} */}

        {/* Cancellation Policy */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] max-w-3xl items-start gap-4">
          <label className="text-[#344054] dark:text-white font-archivo text-sm">
            Cancellation policy
          </label>
          <ul className="space-y-4 list-disc pl-4  text-gray-900  block mb-1 dark:text-gray-300 text-sm md:text-base">
            <li>
              We will charge a cancellation fee of 100% if booking is cancelled
              7 days or less before the event
            </li>
            <li>
              We will charge a cancellation fee of 50% if booking is cancelled
              14 days or less before the event
            </li>
            <li>
              We will charge a cancellation fee of 25% if booking is cancelled
              30 days or less before the event
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-4 max-h-[10vh]   border-gray-200 dark:border-gray-700 px-6  bg-white dark:bg-gray-900">
        <button
          onClick={back}
          className="px-4 py-2 border border-gray- dark:border-gray-600300  rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Proceed
        </button>
      </div>
    </form>
  );
};

export default SchoolDriverContact;
