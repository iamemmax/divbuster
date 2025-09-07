
import CheckIcon2 from "@/app/icons/(dashboard)/CheckIcon2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button
} from "@/components/core";

interface DiveLogUpdatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?:string;
  description?:string
}

export const DiveLogUpdatedModal = ({
  isOpen,
  onClose,
  description=" Congratulations, You have successfully updated your Dive log. Click on close to return back to your Dive log page.",
  title =" Dive Log Updated"
}: DiveLogUpdatedModalProps) => {
  return (
   <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-md p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
    <DialogHeader className="text-center flex justify-center items-center flex-col">
      <div className="mx-auto mb-2 flex border-[8px] border-[#ECFDF3] dark:border-green-900 h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
        <CheckIcon2 />
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
        onClick={onClose}
        variant="outlined"
        className="w-full max-w-xs font-archivo text-lg py-3 mx-auto 
                   text-[#667085] dark:text-gray-300 
                   border-gray-300 dark:border-gray-600"
      >
        Close
      </Button>
    </div>
  </DialogContent>
</Dialog>

  );
};