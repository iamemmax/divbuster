
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
}

export const DiveLogUpdatedModal = ({
  isOpen,
  onClose,
}: DiveLogUpdatedModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="text-center flex justify-center items-center flex-col">
          <div className="mx-auto mb-2 flex border-[8px] border-[#ECFDF3] h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckIcon2/>
          </div>
          <DialogTitle className="md:text-xl text-sm font-archivo font-semibold text-[#101828]">
            Dive Log Updated
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center">
          <p className="text-[#667085] font-archivo text-sm mb-6">
            Congratulations, You have successfully updated your Dive log. Click on close to return back to your Dive log page.
          </p>
          
          <Button
            onClick={onClose}
            variant="outlined"
            className="w-full max-w-xs text-[#667085] font-archivo text-lg py-3 mx-auto"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};