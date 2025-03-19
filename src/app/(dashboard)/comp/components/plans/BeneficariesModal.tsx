import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ErrorModal,
  Button,
} from "@/components/core";
import { useErrorModalState } from "@/hooks";
import SelectPlanModal from "../Funds/Selectplan";
import { capitalizeFirstLetter } from "@/utils";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import SelectDurationModal from "./SelectDurationModal";
import {
  PlanData,
  plantypes,
} from "@/app/(main)/misc/components/insurance/api/plan/getPlan";


interface Beneficiary {
  name_of_beneficiary: string;
  phone_number_of_beneficiary: string;
  type_of_beneficary: "ADULT" | "CHILD"; // Adjust type as needed
}

interface Prop {
  setShowBeneficaries: React.Dispatch<React.SetStateAction<boolean>>;
  showBeneficaries: boolean;
  remove: UseFieldArrayRemove;
  beneficiariesList:
    | {
        beneficiaries: {
          name_of_beneficiary: string;
          phone_number_of_beneficiary: string;
          type_of_beneficary?: "ADULT" | "MINOR";
        }[];
      }
    | undefined;
  planType: string;
  setBeneficiariesList: React.Dispatch<
    React.SetStateAction<
      | {
          beneficiaries: {
            name_of_beneficiary: string;
            phone_number_of_beneficiary: string;
            type_of_beneficary?: "ADULT" | "MINOR";
          }[];
        }
      | undefined
    >
  >;
  append: UseFieldArrayAppend<{
    beneficiaries: {
        name_of_beneficiary: string;
        phone_number_of_beneficiary: string;
        type_of_beneficary?: "ADULT" | "MINOR" | undefined;
    }[];
}, "beneficiaries">
  selectedPlan: PlanData[] | undefined;
}

const BeneficiariesModal = ({
  setShowBeneficaries,
  showBeneficaries,
  beneficiariesList,
  setBeneficiariesList,
  remove,
  planType,
  selectedPlan,
  append
}: Prop) => {
  // const [errorMsg, setErrorMsg] = useState("");
const [processing, setProcessing] = useState(false)
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const [showDurationModal, setShowDurationModal] = useState(false);

  const submitBeneficaries = () => {
    setShowDurationModal(true);
  };



  // This effect will run when the beneficiaries list becomes empty
  useEffect(() => {
    if (beneficiariesList?.beneficiaries.length === 0) {
      append({
        name_of_beneficiary: "",
        phone_number_of_beneficiary: "",
        type_of_beneficary: "ADULT",
      });
      setShowBeneficaries(false); // Close the modal after appending
    }
  }, [beneficiariesList?.beneficiaries, append]);

  const handleRemove = (idx:number) => {
    // Remove from react-hook-form array
    remove(idx);

    
    setBeneficiariesList((prev) => {
      const updatedBeneficiaries = (prev?.beneficiaries || []).filter(
        (_, index) => index !== idx
      );
      return { beneficiaries: updatedBeneficiaries };
    });
  };

  return (
    <>
      <div className="rounded-xl">
        <Dialog open={showBeneficaries}>
          <DialogContent className="!overflow-hidden max-h-[93vh]">
            <DialogHeader className="bg-[#1B1687] font-medium text-[#fff] text-base">
              <DialogTitle className="font-medium text-[#fff]">
                Summary Page
              </DialogTitle>
              <DialogClose
                className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
                onClick={() => setShowBeneficaries(false)}
              >
                <button>Close</button>
              </DialogClose>
            </DialogHeader>

            <DialogBody className="bg-[#141B3f] w-full !max-h-[86vh]">
              {planType !== "INDIVIDUAL" && (
                <div className="text-[#fff] font-light text-sm pb-4">
                  {beneficiariesList &&
                    beneficiariesList?.beneficiaries?.length > 1 && (
                      <Button className="bg-white mb-1 flex justify-center items-center gap-2 rounded-lg text-[#032282]">
                        {" "}
                        People Added{" "}
                        <div className="bg-[#E5ECFA] h-[1.375rem] w-[1.375rem] shrink-0 flex justify-center items-center rounded-full">
                          {beneficiariesList?.beneficiaries?.length}
                        </div>
                      </Button>
                    )}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto">
                {beneficiariesList?.beneficiaries?.map(
                  (beneficiary, idx: number) => (
                    <div className="" key={idx}>
                      <div className=" bg-[#080d27] px-4 py-4 rounded-2xl">
                        <div className="grid grid-cols-2">
                          <div className="">
                            <p className="text-white text-sm capitalize font-semibold">
                              {capitalizeFirstLetter(
                                beneficiary?.name_of_beneficiary
                              )}
                            </p>
                            <p className="text-white text-xxs text-opacity-50">
                              Name
                            </p>
                          </div>
                          <div className="">
                            <p className="text-white text-[.6875rem] font-semibold">
                              {beneficiary?.phone_number_of_beneficiary}
                            </p>
                            <p className="text-white text-xxs text-opacity-50">
                              Phone number
                            </p>
                          </div>
                        </div>
                        <div className="w-full mt-4  flex items-center gap-3  text-sm font-normal">
                          <Button
                            className="text-white  rounded-[1.25rem] border-[0.3px] border-white border-opacity-70 py-1"
                            variant={"outlined"}
                            type="button"
                            onClick={() => setShowBeneficaries(false)}
                          >
                            Edit
                          </Button>
                        <Button
  className="text-white rounded-[1.25rem] border-[0.3px] border-white border-opacity-70 py-1"
  variant="outlined"
  type="button"
 onClick={() => handleRemove(idx)}
>
  Remove
</Button>



                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="w-full mt-6  flex items-center gap-3 py-5 text-sm font-normal">
                {planType !== "LOVE_ONES" && (
                  <Button
                    className="text-white w-full p-4 py-3 rounded-[1.25rem] border-[0.3px] border-white border-opacity-70 "
                    variant={"outlined"}
                    type="button"
                    onClick={() => setShowBeneficaries(false)}
                  >
                    Add more
                  </Button>
                )}
                <Button
                  className=" flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                                            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                  type="submit"
                  //   disabled={!isValid}
                  onClick={submitBeneficaries}
                >
                  Continue{" "}
                  {/* {loadingSubmit && (
                        <SmallSpinner className="" color="#1B1687" />
                      )} */}
                </Button>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>

        <ErrorModal
          isErrorModalOpen={isErrorModalOpen}
          setErrorModalState={() => {
            setErrorModalState(false);
          }}
          subheading={
            errorModalMessage ||
            "Please check your inputs and try again."
          }
        />
      </div>

      {showDurationModal && (
        <SelectDurationModal
          isSelectPlanModalOpen={showDurationModal}
          setSelectPlanModal={setShowDurationModal}
          beneficiariesList={beneficiariesList}
          selectedPlan={selectedPlan}
          planType={planType}
          actionType="makePayment"
          setShowProcessingModal={setProcessing}
        />
      )}
    </>
  );
};

export default BeneficiariesModal;
