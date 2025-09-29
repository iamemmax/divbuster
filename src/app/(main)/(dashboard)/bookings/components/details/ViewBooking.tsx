import React from "react";
import { Button, Dialog, DialogTitle, DialogBody, DialogContent } from "@/components/core";
import { bookingResult } from "../../../api/bookings/fetchSchoolBooking";
import Image from "next/image";
import moment from "moment";
import { viewBookingranslations } from "@/app/(main)/translation/bookingTranslation";
import { useLanguage } from "@/hooks/useLanguage";

interface prop {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookingDetails: bookingResult | undefined;
}



const ViewBookingDetails = ({ isOpen, setIsOpen, bookingDetails }: prop) => {
  const {language}= useLanguage()
  const t = viewBookingranslations[language] || viewBookingranslations.en;

  return (
    <div className="">
      <Dialog modal={true} open={isOpen}>
        <DialogContent className="!max-w-[57.3125rem] max-h-[90vh] bg-[#F9FAFB] dark:bg-gray-900 p-0">
          <DialogBody className="w-full outline-none">
            <DialogTitle className="font-archivo text-lg border-b border-[#EAECF0] py-3 pb-4 mb-5 font-semibold text-[#101828] dark:border-gray-600 dark:text-white">
              {t.viewDivePlan}
            </DialogTitle>

            {/* Header with Hero Image */}
            <div className="max-h-[75vh] overflow-y-auto">
              <div className="relative overflow-hidden mb-4 h-44 w-full">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/dashboard/map3.png"
                    alt={bookingDetails?.created_on as string}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-[#4d799c]/70 dark:bg-black/60 p-4 z-10">
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-sm font-archivo mb-1">
                        {bookingDetails?.contact_info?.location}
                      </h3>
                      <p className="text-white font-semibold text-sm font-archivo right-0">
                        {moment(bookingDetails?.date?.event_date).format("ll")}
                      </p>
                    </div>
                    <p className="text-[#F7931D] font-archivo font-medium text-xs">
                      {bookingDetails?.event?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                {/* Dive with Bart Section */}
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-8">
                  <h3 className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                    {t.diveWithBart}
                  </h3>
                  <div className="text-[#667085] dark:text-white space-y-2">
                    <p className="text-base font-archivo">
                      {bookingDetails?.event.description}
                    </p>
                  </div>
                </div>

                {/* What's included */}
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                  <h4 className="text-base font-semibold text-[#344054] dark:text-white font-archivo mb-3">
                    {t.included}
                  </h4>
                  <ul className="text-gray-600 dark:text-white">
                    <li className="flex items-center gap-2">
                      <div className="w-[6px] h-[6px] bg-[#667085] dark:text-white rounded-full"></div>
                     {t.gear}
                    </li>
                  </ul>
                </div>

                {/* What to bring */}
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                  <h4 className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                    {t.bring}
                  </h4>
                  <ul className="text-gray-600 dark:text-white space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-[6px] h-[6px] bg-[#667085] rounded-full "></div>
                      {t.towel}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-[6px] h-[6px] bg-[#667085] rounded-full "></div>
                      {t.swimwear}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-[6px] h-[6px] bg-[#667085] rounded-full "></div>
                      {t.goodMood}
                    </li>
                  </ul>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                    <span className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                      {t.price}
                    </span>
                    <input
                      readOnly
                      className="w-full px-4 py-2 border outline-none dark:border-gray-600 rounded-lg bg-white-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
                      value={bookingDetails?.event.amount}
                    />
                  </div>

                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                    <span className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                      {t.serviceFee}
                    </span>
                    <input
                      readOnly
                      className="w-full px-4 py-2 border outline-none dark:border-gray-600 rounded-lg bg-white-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
                      value={bookingDetails?.event?.service_charge}
                    />
                  </div>

                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-5">
                    <span className="text-base font-semibold text-[#344054] font-archivo mb-3 dark:text-white">
                      {t.totalFee}
                    </span>
                    <input
                      readOnly
                      className="w-full px-4 py-2 border outline-none dark:border-gray-600 rounded-lg bg-white-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
                      value={bookingDetails?.amount}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-5 max-h-[10vh]">
              <Button
                variant={"outlined"}
                className="px-6 py-2 dark:text-white text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                onClick={() => setIsOpen(false)}
              >
                {t.close}
              </Button>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewBookingDetails;
