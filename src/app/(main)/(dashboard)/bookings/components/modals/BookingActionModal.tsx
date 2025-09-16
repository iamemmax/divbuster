import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, HelpCircle, ChevronDown } from "lucide-react";
import MastercardIcon from "@/app/icons/(dashboard)/card/MatercardIcon";
import { Button, Dialog, DialogBody, DialogContent } from "@/components/core";
import CloseIcon from "@/app/icons/CloseIcon";
import FileIcon from "@/app/icons/(dashboard)/FileIcon";
import AngleRight from "@/app/icons/(dashboard)/AngleRight";

// Zod validation schema

interface Props {
  isOpen: boolean;
  setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSchoolBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
   setShowBookWithBuddy: React.Dispatch<React.SetStateAction<boolean>>
}

const BookingActionModal: React.FC<Props> = ({
  isOpen,
  setIsOpenCardModal,
  setShowSchoolBookingModal,
  setShowBookWithBuddy
}) => {
  const handleCancel = () => {
    setIsOpenCardModal(false);
  };

  const actionsType = [
    {
      id: 1,
      title: "Book with Buddy",
      action: () => setShowBookWithBuddy(true),
    },
    {
      id: 2,
      title: "Book with School/Community",
      action: () => setShowSchoolBookingModal(true),
    },
    {
      id: 3,
      title: "Book with Dive Spot",
      action: () => {},
    },
  ];
  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="!max-w-[517px] max-h-[80vh] bg-[#F9FAFB] dark:bg-gray-900">
        <DialogBody className="w-full outline-none">
          <div className="flex justify-between items-center w-full outline-none">
            <h3 className="font-archivo text-lg font-medium text-gray-900 dark:text-white">
              Choose a booking Action
            </h3>
            <Button
              className="bg-transparent p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleCancel}
            >
              <CloseIcon className="dark:text-white text-black" />
            </Button>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            {actionsType.map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between gap-3 p-4 border-[1px] border-[#EAECF0] dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={action?.action}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-archivo text-sm text-gray-900 dark:text-white">
                      {action?.title}
                    </p>
                  </div>
                </div>
                <div className="">
                  <AngleRight className="text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default BookingActionModal;
