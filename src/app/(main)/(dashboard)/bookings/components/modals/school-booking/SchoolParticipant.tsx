import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDivePlanFormData } from "./CreateSchoolPlan";
import { BookingDriverFormValues } from "./SchoolDriverContact";
import { useAddBooking } from "@/app/(main)/(dashboard)/api/bookings/addBooking";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { UnsavedChangesModal } from "@/app/(main)/components/shared/modal/UnsavedChangeModal";
import { ErrorModal } from "@/components/core";
import { DiveLogUpdatedModal } from "@/app/(main)/(dashboard)/div-log/components/edit/DiveLogUpdatedModal";
import { SmallSpinner } from "@/icons/core";
import { useUser } from "@/app/(auth)/api/getAuthenticatedUser";
import { useQueryClient } from "react-query";

// Zod schema
const participantSchema = z.object({
  other_participants: z
    .array(
      z.object({
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email"),
        dob: z.string().min(1, "Date of Birth is required"),
        contact_info:z.object({
          phone_number:z.string().min(1,{message:"phone number is required"})
        })
      })
    )
    .min(1, "At least one participant is required"),
});

// Type inference from schema
type ParticipantFormValues = z.infer<typeof participantSchema>;

interface Props {
  next: () => void;
  back: () => void;
  onClose: () => void;
  schoolBookingDataInfo: CreateDivePlanFormData
    diverInfo:BookingDriverFormValues
}

const SchoolParticipantForm = ({ back, onClose ,diverInfo,schoolBookingDataInfo}: Props) => {
 const{  isErrorModalOpen,
      setErrorModalState,
      openErrorModalWithMessage,
      errorModalMessage,
    } = useErrorModalState();
    const [showDiscardModal, setShowDiscardModal] = useState(false)
    const [showUpdatedModal, setShowUpdatedModal] = useState(false)
    const {mutate:handleAddbooking,isLoading}=useAddBooking()
  const {
    control,
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantSchema),
    mode: "onChange",
    defaultValues: {
      other_participants: [
        { first_name: "", email: "", dob: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "other_participants",
  });

  const user = useUser()
  const watchedParticipants = watch("other_participants");
const queryclient = useQueryClient()
  const onSubmit = async ({other_participants}: ParticipantFormValues) => {
    await trigger()
    const payload = {
      ...diverInfo,
      ...schoolBookingDataInfo,
      other_participants,
      book_now:true,
      lang:user?.data?.data?.profile_details?.language

    }

    handleAddbooking({ 
      data:payload
    },{
       onSuccess: () => {
              setShowUpdatedModal(true);
              queryclient.invalidateQueries({ queryKey: ["booking-schools"] });
            }, 
            onError: (error) => {
              const errorMessage = formatAxiosErrorMessage(error as AxiosError);
              openErrorModalWithMessage(String(errorMessage));
            },
         
    })
  };

  const addParticipant = async () => {
    // Trigger validation for all current participants
    const isFormValid = await trigger();

    if (isFormValid) {
      append({ first_name: "", last_name: "", email: "", dob: "",contact_info:{phone_number:""} });
    }
  };

  // Check if current participants are filled
  const canAddParticipant = () => {
    return watchedParticipants.every(participant =>
      participant.first_name.trim() !== "" &&
      participant.last_name.trim() !== "" &&
      participant.email.trim() !== "" &&
      participant.dob.trim() !== "" && participant.contact_info?.phone_number?.trim() !==""
    ) && Object.keys(errors).length === 0;
  };

  return (
    <div className=" bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className=" mx-auto">
        <div className="space-y-8">
          <div className="overflow-y-auto !max-h-[70vh] md:max-h-[calc(75vh-160px)]">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-6 mb-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Participant {index + 1}
                  </h2>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="border-b  border-[#EAECF0] dark:border-gray-700 py-2">
                  <div className="grid  grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter First name"
                      {...register(`other_participants.${index}.first_name`)}
                      className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.first_name ? "border-red-500" : "border-gray-300 dark:border-gray-600"} outline-none  rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
                    />
                    {errors.other_participants?.[index]?.first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.other_participants[index]?.first_name?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="border-b  border-[#EAECF0] dark:border-gray-700 py-2">
                  <div className="grid  grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last name"
                      {...register(`other_participants.${index}.last_name`)}
                      className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.last_name ? "border-red-500" : "border-gray-300 dark:border-gray-600"} outline-none  rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
                    />
                    {errors.other_participants?.[index]?.last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.other_participants[index]?.last_name?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-b  border-[#EAECF0] dark:border-gray-700 py-2">
                  <div className="grid  grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="example@example.com"
                      {...register(`other_participants.${index}.email`)}
                      className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} border outline-none  rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
                    />
                    {errors.other_participants?.[index]?.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.other_participants[index]?.email?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="border-b  border-[#EAECF0] dark:border-gray-700 py-2">
                  <div className="grid  grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="phone number"
                      {...register(`other_participants.${index}.contact_info.phone_number`)}
                      className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.contact_info?.phone_number ? "border-red-500" : "border-gray-300 dark:border-gray-600"}  outline-none  rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
                    />
                    {errors.other_participants?.[index]?.contact_info?.phone_number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.other_participants[index]?.contact_info?.phone_number?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-b  border-[#EAECF0] dark:border-gray-700 py-2">

                  <div className="grid  grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      {...register(`other_participants.${index}.dob`)}
                      className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.dob ? "border-red-500" : "border-gray-300 dark:border-gray-600"} border outline-none  rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
                    />
                    {errors.other_participants?.[index]?.dob && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.other_participants[index]?.dob?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex ">
              <button
                type="button"
                onClick={addParticipant}
                disabled={!canAddParticipant()}
                className={` py-2 font-archivo rounded-lg font-medium transition-colors ${canAddParticipant()
                    ? "text-orange-500 dark:text-blue-400 border-orange-500 dark:border-blue-400 hover:bg-orange-50 dark:hover:bg-blue-900"
                    : "text-[#98A2B3] dark:text-gray-500 border-gray-300 dark:border-gray-600  cursor-not-allowed"
                  }`}
              >
                + Add Another Participant
              </button>
            </div>
          <div className="border-b border-[#EAECF0] dark:border-gray-700 pb-2 ">

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-start gap-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cancellation policy
              </h3>

              <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc pl-4">
                <li>
                  For safety reasons, you will need to fill in a Medical Statement upon arrival to ensure that you are fit to dive. Please read the form here:
                  <a
                    href="https://www.divebusters.com/uploads/Diver_Medical_Form.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 truncate  text-xs md:text-sm dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 underline ml-1 inline-block"
                 style={{wordBreak:"break-word"}}
                 >
                    https://www.divebusters.com/uploads/Diver_Medical_Form.pdf
                  </a>
                </li>
              </ul>
            </div>
          </div>
          </div>




          <div className="flex justify-end gap-4 h-[10vh]   border-gray-200 dark:border-gray-700 px-6  bg-white dark:bg-gray-900">
            <div className="">
              <button
              onClick={back}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600  rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            </div>
            <div className="">
              <button
              onClick={handleSubmit(onSubmit)}
              //   disabled={!isValid}
              className="px-6 py-2 bg-orange-500 text-white flex justify-center items-center gap-x-3 rounded hover:bg-orange-600 transition-colors"
            >
              Proceed  {isLoading && <SmallSpinner color='#fff' />}
            </button>
            </div>
          </div>
        </div>
      </div>

       {showDiscardModal && (
                  <UnsavedChangesModal
                    isOpen={showDiscardModal}
                    onClose={() => setShowDiscardModal(false)}
                    onDiscard={() => onClose()}
                  />
                )}
      
                {showUpdatedModal && (
                  <DiveLogUpdatedModal
                    isOpen={showUpdatedModal}
                    onClose={() => onClose()}
                    title="Booking Sucessful"
                    description="Congratulations, You have successfully book a dive. Click on close to return back to your booking page"
                    
                  />
                )}
      
                <ErrorModal
                  isErrorModalOpen={isErrorModalOpen}
                  setErrorModalState={() => {
                    setErrorModalState(false);
                  }}
                  subheading={
                    errorModalMessage || "Please check your inputs and try again."
                  }
                />
    </div>
  );
};

export default SchoolParticipantForm;