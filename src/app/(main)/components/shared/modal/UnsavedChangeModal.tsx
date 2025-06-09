import WarningIcon2 from "@/app/icons/(dashboard)/WarningIcon2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/core";
import { ReactNode } from "react";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSave?: () => void;
  title?: string;
  description?: string;
  discardLabel?: string;
  saveLabel?: string;
  icon?: ReactNode;
  hideSaveButton?: boolean;
}

export const UnsavedChangesModal = ({
  isOpen,
  onClose,
  onDiscard,
  onSave,
  title = "Unsaved changes",
  description = "Do you want to save or discard changes?",
  discardLabel = "Discard",
  saveLabel = "Save changes",
  icon = <WarningIcon2 />,
  hideSaveButton = false,
}: UnsavedChangesModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center flex flex-col">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF0C7] border-[#FFFAEB] border-[8px]">
            {icon}
          </div>
          <DialogTitle className="text-lg font-archivo font-medium mt-5 text-[#101828]">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center mt-2 pb-6">
          <p className="text-[#667085] font-archivo text-sm">{description}</p>

          <div className="flex gap-3 px-6 justify-center mb-4 mt-[3.125rem]">
            <Button
              variant="outlined"
              onClick={onDiscard}
              className="w-full max-md:px-3 py-[10px]"
            >
              {discardLabel}
            </Button>

            {!hideSaveButton && (
              <Button
                onClick={onSave}
                className="w-full max-md:px-3 py-[10px] bg-orange-500 hover:bg-orange-600 text-white"
              >
                {saveLabel}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
