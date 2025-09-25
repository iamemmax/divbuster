import React, { useState } from 'react'
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle, ErrorModal, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core";
import { certificateResult } from '../../(dashboard)/certifications/fetchCertifications';
import CloseIcon from '@/app/icons/CloseIcon';
import AddCertification from './AddCertification';
import SelectCertificationType from './SelectCertificationType';

interface Props {
    isOpen: boolean;
    setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
    certificateData: certificateResult | undefined
    type:string
}
const AddCertificateTypeComp = ({ isOpen, setIsOpenCardModal,certificateData,type }: Props) => {
    const [showFormModal, setShowFormModal] = useState(false)
     const [selectedCard, setSelectedCard] = useState<string |null >(certificateData?.certificate_type || null);
    const [step, setStep] = useState<number>(1)
    const renderForm = (step:number)=>{
switch (step) {
    case 1:
        return <SelectCertificationType setStep={setStep} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
       case 2:
        return <AddCertification setStep={setStep} certificateData={certificateData} selectedCard={selectedCard} type="add" setIsOpenCardModal={()=>setShowFormModal(false)} />

    default:
        break;
}
    }
  return (
    <Dialog open={isOpen}>
            <DialogContent className="!max-w-[917px] !max-h-[95vh] bg-white dark:bg-gray-900">
                <DialogBody className="w-full max-md:px-2 p-0 outline-none text-gray-900 dark:text-white">
                    <DialogHeader className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700 pb-4">
                        <DialogTitle className="md:text-2xl text-base font-bold text-gray-900 dark:text-gray-100">
                            {type==="add"?"Add":"Update"} Dive Certification
                        </DialogTitle>
                        <DialogClose className="bg-transparent p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setIsOpenCardModal(false)}>
                            <CloseIcon className="dark:text-white text-black" />
                        </DialogClose>
                    </DialogHeader>
                    <div className="">
                        {renderForm(step)}
                    </div>
                   </DialogBody>
            </DialogContent>
        </Dialog>
  )
}

export default AddCertificateTypeComp