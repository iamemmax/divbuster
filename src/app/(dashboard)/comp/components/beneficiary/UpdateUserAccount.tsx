"use client";
import React, { SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorModal,
  FormError,
} from "@/components/core";
import { RightUpArrow, SmallSpinner } from "@/icons/core";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input2 } from "@/components/core/Input2";
import { formatAxiosErrorMessage, formatCurrency } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useUpdateUserData } from "@/app/(auth)/(onboarding)/api/updateUserAccount";
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";

interface Prop {
  setOpenUpdateDetails: React.Dispatch<SetStateAction<boolean>>;
  openUpdateDetails: boolean;
//  planType:string;
 setOpenPlanModal: React.Dispatch<React.SetStateAction<boolean>>
 userData: UserDataTypes | undefined
}

const contactSchema = z.object({
  first_name: z
    .string({ required_error: "Enter your first number" })
    .trim()
    .min(3, {
      message: "Enter your first name",
    })
    ,
  last_name: z
    .string({ required_error: "Enter your Last Name" })
    .trim()
    .min(3, {
      message: "Enter your Last Name",
    }),
  phone_number: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .min(11, {
      message: "Phone number ssetShowPaymentModalhould be at least 11 digits",
    })
    ,
  

   
});

export type detailRequestType = z.infer<typeof contactSchema>;

const UpdateUserAccount = ({
  openUpdateDetails,
  setOpenUpdateDetails,
  // planType,
  setOpenPlanModal,
  userData
}: Prop) => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<detailRequestType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      first_name:userData?.first_name|| "",
      last_name: userData?.last_name || "",
      phone_number:userData?.phone_number
      
    },

    mode: "onChange",
  });

  // const [errorMsg, setErrorMsg] = useState("");
  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
 
  const {mutate:handleUpdateUserAcct,isLoading}=useUpdateUserData()

  const onsubmit = ({first_name,last_name,phone_number}: detailRequestType) => {
    handleUpdateUserAcct({first_name,last_name,phone_number},{
      onSuccess:()=>{
        setOpenPlanModal(true)
        setOpenUpdateDetails(false)
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    })

  
  };

  return (
    <div className="!z-[99999999999999999999999999999999999]">
      {/* <ClientOnly> */}
      <Dialog
        open={openUpdateDetails}
        //   onOpenChange={()=>setopenUpdateDetails(true)}
      >
        <DialogTrigger className="bg-white text-black flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max font-display">
          Get insurance
          <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
            <RightUpArrow className="" width={12} height={12} />
          </span>
        </DialogTrigger>

        <DialogContent className="!overflow-hidden ">
          <DialogHeader className="bg-[#1B1687] ">
            <DialogTitle className="text-[#fff]">Update Details</DialogTitle>

            <DialogClose
              className="rounded-full"
              onClick={() => setOpenUpdateDetails(false)}
            >
              <button>Close</button>
            </DialogClose>
          </DialogHeader>

          <DialogBody className="bg-[#151D42] w-full ">
            <div className="">
              <p className="text-sm font-medium text-white font-sans">
                {/* Enter your enrollment number. */}
              </p>
              <form className="mt-8" onSubmit={handleSubmit(onsubmit)}>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="phone"
                  >
                    First Name
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.first_name?.message ? "border border-red-700" : ""} h-12 rounded-lg text-[#fff]`}
                      placeholder="Enter your first name"
                      type="text"
                      id="phone"
                      {...register("first_name")}
                    />

                    {/* {isLoading && (
                        <div className=" absolute top-[1.3rem] transform -translate-y-1/2 right-[1rem]">
                          <SmallSpinner className="" color="#fff" />
                        </div>
                      )} */}
                  </div>
                </div>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="phone"
                  >
                      Last Name
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.last_name?.message ? "border border-red-700" : ""} h-12 rounded-lg text-[#fff]`}
                      placeholder="Enter your last name"
                      type="text"
                      id="phone"
                      {...register("last_name")}
                    />

                    {/* {isLoading && (
                        <div className=" absolute top-[1.3rem] transform -translate-y-1/2 right-[1rem]">
                          <SmallSpinner className="" color="#fff" />
                        </div>
                      )} */}
                  </div>
                </div>
            

                <div className="pb-[2rem]">
                  <Button
                    className=" mt-[3rem] flex items-center justify-center gap-x-2 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                                      shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                    type="submit"
                  >
                    Continue  {isLoading  && (
                      <SmallSpinner className="" color="blue" />
                    )}
                        
                  </Button>
                </div>
              </form>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
      {/* </ClientOnly> */}

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage ||
          // errorMsg ||
          "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default UpdateUserAccount;

