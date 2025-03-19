import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  ComingSoon,
} from "@/components/core";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/icons/core";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import CloseIcon from "@/app/(main)/misc/icons/CLoseIcon";
import BeneficiariesModal from "../BeneficariesModal";
import { useQuery } from "react-query";
import { getPlan } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
import ComingSoonIcon from "@/app/(main)/misc/components/insurance/icons/ComingSoonIcon";

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
        .min(1, { message: "Please enter the name." }).refine(value => !/\d/.test(value), { message: "Name must not contain numbers" }),
      phone_number_of_beneficiary: z
        .string()
        .trim()
        .min(11, { message: "Phone number should be at least 11 digits" })
        .regex(/^0\d{10}$/, { message: "Phone number must start with 0 and be 11 digits long" }),
             type_of_beneficary: z.enum(["ADULT", "MINOR"]).optional(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

const BuyPlanModalForCoperate = ({
  setBuyPlanModal,
  isBuyPlanModalOpen,
}: Prop) => {
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
          type_of_beneficary: "ADULT",
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
                {/* <ComingSoonIcon /> */}
                <div className="text-[#fff] font-light text-sm pb-4">
                  <p className="w-4/5 pb-2">
                    Kindly enter the details below to activate beneficiary.
                  </p>
                  {fields?.length > 1 && (
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
                            Name
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

{errors?.beneficiaries?.[index]?.name_of_beneficiary && (
                <p className="text-red-700 text-xs mt-1">
                  {errors?.beneficiaries?.[index]?.name_of_beneficiary?.message}
                </p>
              )}
                        </div>
                        <div className="mt-3">
                          <Label
                            className="mb-1 block text-xs text-[#fff]"
                            htmlFor={`beneficiaries.${index}.phone_number_of_beneficiary`}
                          >
                            Phone number
                          </Label>
                          <div className="relative mt-[.25rem]">
                          <Controller
                                                  control={control}
                                                  name={`beneficiaries.${index}.phone_number_of_beneficiary`}
                                                  render={({ field }) => (
                                                    <input
                                                      {...field}
                                                      {...field}
                                                className={`${
                                                  errors?.beneficiaries?.[index]?.phone_number_of_beneficiary ? "border border-red-700" : ""
                                                } text-[#fff] text-xs outline-none h-[2.4rem] md:h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                                                      id="account_no"
                                                      placeholder="Phone number"
                                                      type="text"
                                                      maxLength={11}
                                                      onChange={(e) => {
                                                        const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                        // Handle input sanitization on change (typing)
                                                        const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                        field.onChange(validPhoneNumber);
                                                      }}
                                                     
                            
                            
                                                     
                                                      onPaste={(e) => {
                                                        e.target as HTMLInputElement;
                                                        // Intercept paste event to sanitize pasted content
                                                        const pastedValue = e.clipboardData.getData('text');
                                                        // Remove non-numeric characters and limit to 11 digits
                                                        const sanitizedValue = pastedValue.replace(/[^0-9]/g, '').slice(0, 11); // Only allow first 11 digits
                                                        e.preventDefault(); // Prevent the default paste behavior
                                                        field.onChange(sanitizedValue); // Apply sanitized value
                                                      }}
                                                      
                                                      onInput={(e) => {
                                                        const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                        // Handle input sanitization on input changes
                                                        const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                        field.onChange(validPhoneNumber);
                                                      }}
                                                      // onChange={(e) => field.onChange(e.target.value)}
                                                    />
                                                  )}
                                                />
                         
                         {errors?.beneficiaries?.[index]?.phone_number_of_beneficiary && (
                <p className="text-red-700 text-xs mt-1">
                  {errors?.beneficiaries?.[index]?.phone_number_of_beneficiary?.message}
                </p>
              )}
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
                        Add More
                      </Button>
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
              append={append}
              planType="CORPORATE"
              selectedPlan={plansData && plansData[2]?.data}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BuyPlanModalForCoperate;
