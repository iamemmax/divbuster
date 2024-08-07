import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/core";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/icons/core";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import CloseIcon from "@/app/(main)/misc/icons/CLoseIcon";
import BeneficiariesModal from "../BeneficariesModal";
import { useQuery } from "react-query";
import { getPlan } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";

interface Prop {
  setBuyPlanModal: React.Dispatch<React.SetStateAction<boolean>>;
  isBuyPlanModalOpen: boolean;
  heading: string;
  subsection: string;
}

const formSchema = z.object({
  beneficiaries: z.array(
    z.object({
      name_of_beneficiary: z
        .string()
        .trim()
        .min(1, { message: "Please enter the name." }),
      phone_number_of_beneficiary: z
        .string()
        .trim()
        .min(10, { message: "Please enter a valid phone number." }),
      type_of_beneficary: z.enum(["ADULT", "MINOR"]).optional(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

const BuyPlanModal = ({ setBuyPlanModal, isBuyPlanModalOpen }: Prop) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beneficiaries: [
        {
          name_of_beneficiary: "",
          phone_number_of_beneficiary: "",
          type_of_beneficary: "ADULT", // Default to ADULT
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficiaries",
  });

  const [beneficiariesList, setBeneficiariesList] = useState<FormValues>();
  const [showBeneficaries, setShowBeneficaries] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { data: userData } = useUser();
  const onSubmit = (data: FormValues) => {
    setBeneficiariesList(data);
    setShowBeneficaries(true);
  };
  const { data: plansData } = useQuery({
    queryFn: getPlan,
    queryKey: ["get-plans"],
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="rounded-xl">
          <Dialog open={isBuyPlanModalOpen}>
            <DialogContent className="!overflow-hidden max-h-[93vh]">
              <DialogHeader className="bg-[#1B1687] font-medium text-[#fff] text-base">
                <DialogTitle className="font-medium text-[#fff]">
                  Beneficiary Details
                </DialogTitle>
                <DialogClose
                  className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
                  onClick={() => setBuyPlanModal(false)}
                >
                  <button>Close</button>
                </DialogClose>
              </DialogHeader>

              <DialogBody className="bg-[#141B3f] w-full !max-h-[86vh]">
                <div className="text-[#fff] font-light text-sm pb-4">
                  <p className="w-4/5 pb-2">
                    Kindly enter the details below to activate beneficiary.
                  </p>
                  {fields?.length > 0 && (
                    <Button className="bg-white mt-2 flex justify-center items-center gap-2 rounded-lg text-[#032282]">
                      People Added
                      <div className="bg-[#E5ECFA] h-[1.375rem] w-[1.375rem] shrink-0 flex justify-center items-center rounded-full">
                        {fields?.length}
                      </div>
                    </Button>
                  )}
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="max-h-[50vh] overflow-y-auto">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="w-full mt-[1rem] text-sm font-normal max-h-[60vh] overflow-y-auto"
                      >
                        <div className="flex items-center justify-between">
                          <Label
                            className="mb-1 block text-xs text-[#fff]"
                            htmlFor={`beneficiaries.${index}.name_of_beneficiary`}
                          >
                            {field?.type_of_beneficary === "MINOR"
                              ? "Minor  Name"
                              : "Adult Name"}
                          </Label>
                          {fields?.length > 1 && (
                            <Button
                              type="button"
                              className="bg-[#E5ECFA] h-[1.875rem] p-0 w-[1.875rem] shrink-0 flex justify-center items-center rounded-full"
                              onClick={() => remove(index)}
                            >
                              <CloseIcon
                                color="#032282"
                                width={18}
                                height={18}
                              />
                            </Button>
                          )}
                        </div>
                        <div className="relative mt-[.25rem]">
                          <input
                            className={`${errors?.beneficiaries?.[index]?.name_of_beneficiary ? "border border-red-700" : ""} text-[#fff] text-xs outline-none h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                            placeholder="Enter name"
                            type="text"
                            id={`beneficiaries.${index}.name`}
                            {...register(
                              `beneficiaries.${index}.name_of_beneficiary`
                            )}
                          />
                        </div>
                        <div className="mt-3">
                          <Label
                            className="mb-1 block text-xs text-[#fff]"
                            htmlFor={`beneficiaries.${index}.phone_number_of_beneficiary`}
                          >
                            Phone number
                          </Label>
                          <div className="relative mt-[.25rem]">
                            <input
                              className={`${errors?.beneficiaries?.[index]?.phone_number_of_beneficiary ? "border border-red-700" : ""} text-[#fff] text-xs outline-none rounded-lg px-6 w-full h-[2.875rem] bg-[#2a3150]`}
                              placeholder="Enter phone number"
                              type="text"
                              id={`beneficiaries.${index}.phone_number_of_beneficiary`}
                              {...register(
                                `beneficiaries.${index}.phone_number_of_beneficiary`
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="py-6 mt-[1rem]">
                    <div className="w-full flex items-center gap-3 justify-between text-sm font-normal">
                      <Button
                        className="text-white w-full rounded-[1.25rem] border-[0.3px] border-white border-opacity-70 py-4"
                        variant={"outlined"}
                        type="button"
                        disabled={!isValid}
                        onClick={() =>
                          append({
                            name_of_beneficiary: "",
                            phone_number_of_beneficiary: "",
                            type_of_beneficary: "ADULT",
                          })
                        }
                      >
                        Add Adult
                      </Button>
                      <Button
                        className="text-white w-full rounded-[1.25rem] border-[0.3px] border-white border-opacity-70 py-4"
                        disabled={!isValid}
                        variant={"outlined"}
                        type="button"
                        onClick={() =>
                          append({
                            name_of_beneficiary: "",
                            phone_number_of_beneficiary:
                              userData?.phone_number ?? "",
                            type_of_beneficary: "MINOR",
                          })
                        }
                      >
                        Add Minor
                      </Button>
                    </div>
                    <div className="mt-6">
                      <Button
                        className="flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                        type="submit"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogBody>
            </DialogContent>
          </Dialog>

          {showBeneficaries && (
            <BeneficiariesModal
              showBeneficaries={showBeneficaries}
              setBeneficiariesList={setBeneficiariesList}
              setShowBeneficaries={setShowBeneficaries}
              beneficiariesList={beneficiariesList}
              remove={remove}
              planType="FAMILY"
              selectedPlan={plansData && plansData[1]?.data}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BuyPlanModal;
