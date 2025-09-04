import WarningIcon2 from "@/app/icons/(dashboard)/WarningIcon2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/core";
import { SmallSpinner } from "@/icons/core";
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
  loading?: boolean;
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
  loading = false
}: UnsavedChangesModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-[#1A1D21]">
        <DialogHeader className="text-center flex flex-col">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF0C7] dark:bg-orange-900/20 border-[#FFFAEB] dark:border-orange-800/30 border-[8px]">
            {icon}
          </div>
          <DialogTitle className="text-lg font-archivo font-medium mt-5 text-[#101828] dark:text-gray-100">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center mt-2 pb-6">
          <p className="text-[#667085] dark:text-gray-400 font-archivo text-sm">
            {description}
          </p>

          <div className="flex gap-3 px-6 justify-center mb-4 mt-[3.125rem]">
            <Button
              variant="outlined"
              onClick={onDiscard}
              className="w-full max-md:px-3 py-[10px] border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {discardLabel}
            </Button>

            {!hideSaveButton && (
              <Button
                onClick={onSave}
                className="w-full flex items-center justify-center gap-x-2 max-md:px-3 py-[10px] bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                {saveLabel} {loading && <SmallSpinner color="white" />}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};