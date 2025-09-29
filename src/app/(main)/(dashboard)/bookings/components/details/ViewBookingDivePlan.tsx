import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogBody, DialogContent } from '@/components/core';
import { bookingResult } from '../../../api/bookings/fetchSchoolBooking';
import moment from 'moment';
import { bookingDetailstranslations } from '@/app/(main)/translation/bookingTranslation';
import { useLanguage } from '@/hooks/useLanguage';

interface prop {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "dive" | "event";
  title: string;
  bookingDetails: bookingResult | undefined;
}



const ViewBookingDivePlan = ({ isOpen, setIsOpen, type, title, bookingDetails }: prop) => {
const {language}= useLanguage()
  const t = bookingDetailstranslations[language] || bookingDetailstranslations.en;

  const orderDetails = [
    { label: t.labels.diveSpot, value: '' },
    { label: t.labels.date, value: moment(bookingDetails?.date?.event_date).format("ll") },
    { label: t.labels.meetUp, value: '' },
    { label: t.labels.hostedBy, value: '' },
    { label: t.labels.pricePerPerson, value: bookingDetails?.event?.amount },
    { label: t.labels.serviceFee, value: bookingDetails?.event?.service_charge },
    { label: t.labels.totalFee, value: bookingDetails?.amount, isTotal: true },
  ];

  return (
    <div className="p-8">
      <Dialog modal={true} open={isOpen}>
        <DialogContent className="!max-w-[57.3125rem] max-h-[90vh] bg-[#F9FAFB] dark:bg-gray-900 p-0">
          <DialogBody className="w-full outline-none">
            <DialogTitle className="font-archivo text-lg border-b border-[#EAECF0] py-3 pb-5 font-semibold text-[#101828] dark:border-gray-600 dark:text-white">
              {title}
            </DialogTitle>

            <div className="max-h-[75vh] overflow-y-auto">
              {/* Participants Section */}
              <div className="my-8">
                <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4 flex items-center gap-2">
                  {t.participants} {bookingDetails?.participant_count ?? 0}
                </h3>

                <div className="grid grid-cols-6 gap-2 md:gap-4">
                  {bookingDetails?.participants?.map((buddy) => (
                    <div key={buddy.id} className="text-center shrink-0">
                      <div className="md:w-16 md:h-16 rounded-full bg-gray-100 text-gray-800 font-medium flex items-center justify-center mx-auto">
                        {`${buddy?.first_name ?? ""} ${buddy?.last_name ?? ""}`
                          .trim()
                          .split(" ")
                          .map((n) => n[0] || "")
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>
                      <p className="text-xs font-archivo text-[#98A2B3] mt-2">
                        {buddy?.first_name} {buddy?.last_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Section */}
              <div>
                <h3 className="text-xl font-semibold text-orange-500 mb-6">{t.orderSummary}</h3>
                <div className="space-y-4">
                  {orderDetails.map((detail, index) => (
                    <div
                      key={index}
                      className={`grid md:grid-cols-[1fr_1.5fr] gap-8 py-3 ${
                        detail.isTotal
                          ? 'bg-gray-50 dark:bg-gray-800 dark:border-transparent rounded-lg px-4 border-t-2 border-gray-200'
                          : 'border-b border-gray-100 dark:border-gray-600 last:border-b-0'
                      }`}
                    >
                      <span
                        className={`font-medium dark:text-white ${
                          detail.isTotal ? 'text-lg text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {detail.label}
                      </span>
                      <input
                        readOnly
                        className="w-full px-4 py-2 border outline-none dark:border-gray-600 rounded-lg bg-white-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-colors"
                        value={detail?.value ?? ""}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-3 justify-between items-center pt-5 max-h-[10vh]">
              {/* Language Selector */}
             
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

export default ViewBookingDivePlan;
