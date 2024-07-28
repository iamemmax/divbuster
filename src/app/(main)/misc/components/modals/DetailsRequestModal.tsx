"use client";

import {

  ClientOnly,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorModal,
  FormError,
} from "@/components/core";
import { Input2 } from "@/components/core/Input2";
import { RightUpArrow, SmallSpinner } from "@/icons/core";
import { useRouter } from "next/navigation";
import { Label } from '@radix-ui/react-label';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useErrorModalState } from "@/hooks";
import { useState } from "react";
import { useRemitaDetailsData } from "@/app/(auth)/(onboarding)/misc/api/getRemitaDetailsRequest";

interface UseBooleanStateControlProps {
  isDetailsRequestModalOpen: boolean;
  setDetailsRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSecondModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNonRemita: React.Dispatch<React.SetStateAction<boolean>>
  setRemitaDetailsResponse: React.Dispatch<React.SetStateAction<{
    FullName: string;
    Ministry: string;
    State: string;
}>>
  
  heading: string;
  subheading: string;
  inputTitle: string;
  closeButtonReplacement?: React.ReactNode;
  children?: React.ReactNode;
}


const contactSchema = z.object({

  contact: z.object({

    phone_number: z
      .string({ required_error: 'Enter your phone number' })
      .trim()
      .min(7, { message: 'Phone number should be at least 7 digits' })

  })


})

type contactinfoProps = z.infer<typeof contactSchema>;


function DetailsRequestModal({
  isDetailsRequestModalOpen,
  setDetailsRequestModal,
  setSecondModal,
  setNonRemita,
  setRemitaDetailsResponse,
  heading,
  subheading,
  inputTitle,

}: UseBooleanStateControlProps) {
  const Router = useRouter();

  const handleClose = () => {
    setDetailsRequestModal(false);
    Router.back();
  };

  const { mutate: handleRemitaDetails } = useRemitaDetailsData()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactinfoProps>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contact: {
        phone_number: ""
      }
    },

    mode: "onChange",
  })




  const {
    isErrorModalOpen,
    setErrorModalState,
    closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();


  const onSubmit = (data: contactinfoProps) => {

    handleRemitaDetails(data?.contact.phone_number, {

      onSuccess: (data) => {

        if (data?.is_from_remita) {

          setSecondModal(true);
          setRemitaDetailsResponse({
            FullName:data.user_details.full_name,
             Ministry:data.user_details.ministry, 
             State:data.user_details.state
            })
          // setDetailsRequestModal(false);

        } else {

          setNonRemita(true)
          setRemitaDetailsResponse({
            FullName:data.user_details.full_name,
            Ministry:data.user_details.ministry, 
            State:data.user_details.state
            
          })
          // setDetailsRequestModal(false);
        }

      },

      onError: (error) => {


      }

    })

    setIsLoading(true);

  };


   const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="">
      <ClientOnly>
        <Dialog
          open={isDetailsRequestModalOpen}
          onOpenChange={setDetailsRequestModal}
        >
          <DialogTrigger className="bg-white text-black flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max font-display">
            Get insurance
            <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
              <RightUpArrow className="" width={12} height={12} />
            </span>
          </DialogTrigger>

          <DialogContent className="!overflow-hidden ">
            <DialogHeader className="bg-[#1B1687] ">
              <DialogTitle className="text-[#fff]">{heading}</DialogTitle>


              <DialogClose className="rounded-full">
                <button onClick={handleClose}>close</button>
              </DialogClose>
            </DialogHeader>

            <DialogBody className="bg-[#151D42] w-full ">
              <div className="py-1">
                <div className="text-[#fff] font-light">
                  <DialogDescription>{subheading}</DialogDescription>
                </div>

                <div className="my-5 ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1 ">
                      <p className="text-[#FFFFFF]">{inputTitle}</p>




                      <div className="w-full mt-[1rem] text-sm font-normal">

                        <Label
                          className="mb-1 block text-xs  text-[#fff]"
                          htmlFor="Phone number"
                        >
                          Phone Number
                        </Label>

                        {/* <Input2
                          className="text-[#fff]"
                          placeholder="Enter your phone number"
                        />

                    <div className="absolute  top-1/2 ">

                    <SmallSpinner className=" animate-spin" color="#fff" />

                    </div> */}

                        <div className="relative">
                          <Input2
                            className="text-[#fff]"
                            placeholder="Enter your phone number"
                            type="number"
                            id="phone"
                            {...register("contact.phone_number")}
                          />

                          {errors?.contact?.phone_number && (
                            <FormError
                              className="bg-red-900/40 text-white"
                              errorMessage={errors?.contact.phone_number?.message}
                            />
                          )}
                          {isLoading && 
                          <div className=" absolute top-[1.3rem] transform -translate-y-1/2 right-[1rem]">
                             <SmallSpinner className="" color="#fff" />

                          </div>
                          } 
                        </div>



                      </div>

                    </div>
                    <div className="mt-6 md:mt-12">



                      <button
                        className=" mt-[2rem] font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                        type="submit"

                      >
                        Continue
                      </button>
                    </div>
                  </form>

                  {/* <ErrorModal
                    isErrorModalOpen={isErrorModalOpen}
                    setErrorModalState={setErrorModalState}
                    subheading={
                      errorModalMessage || 'Please check your inputs and try again.'
                    }
                  >
                    <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
                      <button
                        className="grow bg-red-950 px-1.5 sm:text-sm md:px-6"
                        type="button"
                        onClick={closeErrorModal}
                      >
                        Okay
                      </button>
                    </div>
                  </ErrorModal> */}
                </div>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    </div>
  );
}

export default DetailsRequestModal;
