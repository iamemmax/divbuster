import React, { useState } from "react";
import { X, Calendar, User, MapPin } from "lucide-react";
import { DiveData } from "../ActiveBooking";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogBody,
  DialogContent,
} from "@/components/core";
// import {  } from '@radix-ui/react-dialog';

interface prop {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookingDetails: DiveData | undefined;
}
const ViewBookingDetails = ({ isOpen, setIsOpen, bookingDetails }: prop) => {
  return (
    <div className="">
      {/* Trigger Button */}
      <Dialog modal={true} open={isOpen}>
        <DialogContent className="!max-w-[57.3125rem] max-h-[90vh] bg-[#F9FAFB] dark:bg-gray-900 p-0">
          <DialogBody className="w-full outline-none">
            <DialogTitle className="font-archivo text-lg border-b border-[#EAECF0]  py-3 pb-4 mb-5 font-semibold text-[#101828] dark:border-gray-600 dark:text-white">
              View Dive Plan
            </DialogTitle>

            {/* Header with Hero Image */}
            <div className="max-h-[75vh] overflow-y-auto">
              <div className="relative  overflow-hidden mb-4 h-44 w-full">
                {/* Image wrapper layer */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={`${bookingDetails?.image}`}
                    alt={bookingDetails?.location as string}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>

                {/* Overlay content - z index higher than image */}
                <div className="absolute inset-x-0 bottom-0 bg-[#4d799c]/70 dark:bg-black/60 p-4 z-10">
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-sm font-archivo mb-1">
                        {bookingDetails?.location}
                      </h3>
                      <p className="text-white font-semibold text-sm font-archivo right-0">
                        {bookingDetails?.date}
                      </p>
                    </div>
                    <p className="text-[#F7931D] font-archivo font-medium text-xs">
                      {bookingDetails?.hostedBy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="">
                {/* Dive with Bart Section */}
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-8">
                  <h3 className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                    Dive with Bart
                  </h3>
                  <div className="text-[#667085] dark:text-white space-y-2">
                    <p className="text-base font-archivo">
                      Wanna try diving? This is for you!
                    </p>
                    <p className="text-base font-archivo">
                      Always wanted to try out diving? Come and join us on a
                      Discover Scuba diving adventure.
                    </p>
                    <p className="text-base font-archivo">
                      This program is designed especially for people who want to
                      try diving for the first time. In about three hours we
                      will take you through a step-by-step program.{" "}
                      <span className="text-orange-500 hover:text-orange-600 cursor-pointer">
                        Read More.
                      </span>
                    </p>
                  </div>
                </div>

                {/* What's included and What to bring */}
                <div className="grid md:grid-cols-[1fr_1.5fr]  gap-8 mb-5">
                  <h4 className="text-base font-semibold text-[#344054] dark:text-white font-archivo mb-3">
                    What's included?
                  </h4>
                  <ul className="text-gray-600 dark:text-white">
                    <li className="flex items-center gap-2">
                      <div className="w-[6px] h-[6px] bg-[#667085] dark:text-white rounded-full"></div>
                      All the dive gear + tank
                    </li>
                  </ul>
                </div>
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                  <h4 className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                    What do I need to bring?
                  </h4>
                  <ul className="text-gray-600  dark:text-white space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-[6px] h-[6px] bg-[#667085] rounded-full "></div>
                      Towel
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-[6px] h-[6px] bg-[#667085] rounded-full "></div>
                      Swimwear
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-[6px] h-[6px] bg-[#667085] rounded-full "></div>
                      Good mood
                    </li>
                  </ul>
                </div>

                {/* Pricing */}
                <div className="space-y-4 ">
                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                    <span className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                      Price
                    </span>
                    <input
                      readOnly
                      className=" w-full px-4 py-2 border outline-none dark:border-gray-600 rounded-lg bg-white-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors"
                      value={"$70.00"}
                    />
                  </div>

                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                    <span className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                      Service & Transaction Fee
                    </span>
                    <input
                      readOnly
                      className=" w-full px-4 py-2 border outline-none dark:border-gray-600 rounded-lg bg-white-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors"
                      value={"$0.00"}
                    />
                  </div>

                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                    <span className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                      Total Fee
                    </span>
                    <input
                      readOnly
                      className=" w-full px-4 py-2 border outline-none dark:border-gray-600 rounded-lg bg-white-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors"
                      value={"$570.00"}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-5 max-h-[10vh]">
              <div className="">
                <Button
                  variant={"outlined"}
                  className="px-6 py-2 dark:text-white text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewBookingDetails;
