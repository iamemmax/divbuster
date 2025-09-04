import CheckIcon2 from "@/app/icons/(dashboard)/CheckIcon2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/core";
import { SmallSpinner } from "@/icons/core";
import { ReactNode } from "react";

interface DiveLogUpdatedModalProps {
  isOpen: boolean;
  onSave: () => void;
  title?: string;
  description?: string;
  buttonLabel?: string;
   loading?: boolean;
  icon?: ReactNode;
  buttonVariant?: "default" | "outlined" | "light" | "white" | "red" | "unstyled" | null | undefined;
}

export const ConfirmSaveModal = ({
  isOpen,
  onSave,
  title = "Dive Log Updated",
  description = "Congratulations, You have successfully updated your Dive log. Click on close to return back to your Dive log page.",
  buttonLabel = "Close",
  icon = <CheckIcon2 />,
  buttonVariant = "outlined",
   loading = false
}: DiveLogUpdatedModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md p-6 bg-white dark:bg-[#1A1D21]">
        <DialogHeader className="text-center flex justify-center items-center flex-col">
          <div className="mx-auto mb-2 flex border-[8px] border-[#ECFDF3] dark:border-green-900/30 h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            {icon}
          </div>
          <DialogTitle className="md:text-xl text-sm font-archivo font-semibold text-[#101828] dark:text-gray-100">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center">
          <p className="text-[#667085] dark:text-gray-400 font-archivo text-sm mb-6">
            {description}
          </p>

          <Button
            type="button"
            onClick={onSave}
            variant={buttonVariant}
            className="w-full max-w-xs flex items-center justify-center text-[#667085] dark:text-gray-300 font-archivo text-lg py-3 mx-auto border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
       {loading ? <SmallSpinner color="white" /> :buttonLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};