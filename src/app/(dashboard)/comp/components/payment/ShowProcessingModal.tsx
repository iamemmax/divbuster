import React from 'react'
import {
    Dialog,
    DialogBody,
    DialogContent,
  } from "@/components/core/DialogClone";
  import {
    Button,
  
  } from "@/components/core";
interface Prop{
    setShowProcessing: React.Dispatch<React.SetStateAction<boolean>>
    showProcessing: true
}
const ShowProcessingModal = ({setShowProcessing,showProcessing}:Prop) => {
  return (
    <Dialog
    open={showProcessing}
    // onOpenChange={setRemitaDetailsModal}
  >
    <DialogContent className="!overflow-hidden max-h-[94vh]  md:w-[28.75rem]">
      {/* <DialogHeader className="bg-[#1B1687] ">
        <DialogTitle className="text-[#fff]">Payment</DialogTitle> */}

        {/* <DialogClose
          className="rounded-full"
          onClick={() => setShowProcessing(false)}
        >
          <button>Close</button>
        </DialogClose> */}
      {/* </DialogHeader> */}

      <DialogBody className="bg-[#141B3f]  md:w-full px-8">
        <div className="py-1  ">
         

          <div className="mt-4  flex justify-center py-4 items-center flex-col text-[#fff]  rounded-lg">
            {/* <p className="text-sm text-white font-sans font-medium">
              {planType?.duration} Month {planType?.play_type} Health Cover
            </p> */}
            <h2 className="text-white text-2xl font-bold py-1">
              Processing
            </h2>
          </div>
          <div className="mt-3">
            <a  href={`/dashboard`}>
          <Button
                   
                    className="rounded-lg py-4   w-full text-xl font-normal transition-colors delay-150 ease-in-out focus:outline-none"
                  >
                    Okay
                  </Button>
            </a>
          </div>

          
        </div>
      </DialogBody>
    </DialogContent>
  </Dialog>
  )
}

export default ShowProcessingModal