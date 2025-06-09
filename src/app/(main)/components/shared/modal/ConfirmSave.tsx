import CheckIcon2 from "@/app/icons/(dashboard)/CheckIcon2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/core";
import { ReactNode } from "react";

interface DiveLogUpdatedModalProps {
  isOpen: boolean;
  onSave: () => void;
  title?: string;
  description?: string;
  buttonLabel?: string;
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
}: DiveLogUpdatedModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="text-center flex justify-center items-center flex-col">
          <div className="mx-auto mb-2 flex border-[8px] border-[#ECFDF3] h-16 w-16 items-center justify-center rounded-full bg-green-100">
            {icon}
          </div>
          <DialogTitle className="md:text-xl text-sm font-archivo font-semibold text-[#101828]">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center">
          <p className="text-[#667085] font-archivo text-sm mb-6">{description}</p>

          <Button
          type="button"
            onClick={onSave}
            variant={buttonVariant}
            className="w-full max-w-xs text-[#667085] font-archivo text-lg py-3 mx-auto"
          >
            {buttonLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
