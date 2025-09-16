"use client"
import React, { useState } from 'react';
import { Button, Dialog, DialogContent } from "@/components/core";
import CreateDiveLog, { diveLogTypes } from './create-divelog/CreateDiveLog';
import CreateDiveLogDetails, { diveLogDetailsTypes } from './create-divelog/CreateDiveLogDetails';
import CreateDriveLogGear, { createGearLogDetailsFormValues } from './create-divelog/CreateDriveLogGear';
import CreateDiveLogEnvironmental, { diveEnvironmentalFormValues } from './create-divelog/CreateDiveLogEnvironmental';
import AddDiveLogBuddies, { addBuddyMember } from './create-divelog/AddDiveLogBuddies';
import AddDiveLogNotes from './create-divelog/AddDiveLogNotes';


// Replace these with actual content components, NOT modals

interface EditDiveStatisticsModalProps {
    isOpen: boolean;
    onClose: () => void;
    
}

const AddNewDiveLog: React.FC<EditDiveStatisticsModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [step, setStep] = useState(1)
    const [diveLogData, setDiveLogData] = useState<diveLogTypes>({ dive_site_id: "", end_date: "", name: "", start_date: "" })
    const [diveLogDetails, setDiveLogDetails] = useState<diveLogDetailsTypes>({ bottom_time: "", dive_depth: "" })
    const [diveGearData, setDiveGearData] = useState<createGearLogDetailsFormValues>({ bcd: "", fin: "", gas_mixture: "", mask: "", regulator: "", weight: "", wetsuit: "" })
    const [evironmentalData, setEvironmentalData] = useState<diveEnvironmentalFormValues>({ avg_water_temperature: "", max_water_temperature: "", min_water_temperature: '' })
    const [buddyMembers, setBuddyMembers] = useState<addBuddyMember>({ buddies: "", email: [] })

    if (!isOpen) return null;
    const renderSteps = (step: number) => {
        switch (step) {
            case 1:
                return <CreateDiveLog setStep={setStep} onClose={onClose} diveLogData={diveLogData} setDiveLogData={setDiveLogData} />
            case 2:

                return <CreateDiveLogDetails setStep={setStep} diveLogDetails={diveLogDetails} setDiveLogDetails={setDiveLogDetails} />
            case 3:
                return <CreateDriveLogGear setStep={setStep} diveGearData={diveGearData}
                    setDiveGearData={setDiveGearData} />
            case 4:
                return <CreateDiveLogEnvironmental evironmentalData={evironmentalData} setStep={setStep} setEvironmentalData={setEvironmentalData} />
            case 5:
                return <AddDiveLogBuddies setStep={setStep} buddyMembers={buddyMembers}
                    setBuddyMembers={setBuddyMembers}
                />
            case 6:
                return <AddDiveLogNotes diveLogData={diveLogData} setStep={setStep}
                    onClose={onClose}
                    diveGearData={diveGearData} evironmentalData={evironmentalData} buddyMembers={buddyMembers}
                    diveLogDetails={diveLogDetails} />
            default:
                return <CreateDiveLog setStep={setStep} onClose={onClose} diveLogData={diveLogData} setDiveLogData={setDiveLogData} />
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-lg">

                <div className="">
                    {renderSteps(step)}
                </div>


            </DialogContent>
        </Dialog>
    );
};

export default AddNewDiveLog;
