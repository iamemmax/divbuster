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
import { useLanguage } from "@/hooks/useLanguage";
import { divPlanParticipantranslations } from "@/app/(main)/translation/bookingTranslation";
// 🔥 import translations

// Validation schema
const participantSchema = z.object({
  other_participants: z
    .array(
      z.object({
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email"),
        dob: z.string().min(1, "Date of Birth is required"),
        contact_info: z.object({
          phone_number: z.string()
            .min(1, { message: "Phone number is required" })
            .max(11, { message: "Phone number must be at most 11 digits" })
            .regex(/^[0-9]+$/, { message: "Phone number must contain only numbers" }),
        }),
      })
    )
    .min(1, "At least one participant is required"),
});

type ParticipantFormValues = z.infer<typeof participantSchema>;

interface Props {
  next: () => void;
  back: () => void;
  onClose: () => void;
  schoolBookingDataInfo: CreateDivePlanFormData;
  diverInfo: BookingDriverFormValues;
}

const SchoolParticipantForm = ({
  back,
  onClose,
  diverInfo,
  schoolBookingDataInfo,
}: Props) => {
  const { isErrorModalOpen, setErrorModalState, openErrorModalWithMessage, errorModalMessage } =
    useErrorModalState();
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showUpdatedModal, setShowUpdatedModal] = useState(false);
  const { mutate: handleAddBooking, isLoading } = useAddBooking();
  const queryClient = useQueryClient();
  const user = useUser();

  // get lang from user profile (default to "en")
const {language}=useLanguage()
const t = divPlanParticipantranslations[language] || divPlanParticipantranslations.en
  const {
    control,
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantSchema),
    mode: "onChange",
    defaultValues: {
      other_participants: [{ first_name: "", email: "", dob: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "other_participants",
  });

  const watchedParticipants = watch("other_participants");

  const onSubmit = async ({ other_participants }: ParticipantFormValues) => {
    await trigger();
    const payload = {
      ...diverInfo,
      ...schoolBookingDataInfo,
      instructor_id: schoolBookingDataInfo.instructor_id ?? "",
      event_type: schoolBookingDataInfo.event_type ?? "booking",
      other_participants,
      book_now: true,
      lang:user?.data?.data?.profile_details?.language,
    };

    handleAddBooking(
      { data: payload },
      {
        onSuccess: () => {
          setShowUpdatedModal(true);
          queryClient.invalidateQueries({ queryKey: ["dive-school-booking"] });
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  const addParticipant = async () => {
    const isFormValid = await trigger();
    if (isFormValid) {
      append({
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        contact_info: { phone_number: "" },
      });
    }
  };

  const canAddParticipant = () =>
    watchedParticipants.every(
      (p) =>
        p.first_name.trim() &&
        p.last_name.trim() &&
        p.email.trim() &&
        p.dob.trim() &&
        p.contact_info?.phone_number.trim()
    ) && Object.keys(errors).length === 0;

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto">
        <div className="space-y-8">
          <div className="overflow-y-auto !max-h-[70vh] md:max-h-[calc(75vh-160px)]">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-6 mb-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t.participant} {index + 1}
                  </h2>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                    >
                      {t.remove}
                    </button>
                  )}
                </div>
                {/* First Name */}
                <div className="border-b border-[#EAECF0] dark:border-gray-700 py-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.firstName}
                  </label>
                  <input
                    type="text"
                    placeholder={t.enterFirstName}
                    {...register(`other_participants.${index}.first_name`)}
                                     className={`w-full px-4 py-3 border-[0.5px] outline-none rounded-lg ${errors.other_participants&&errors.other_participants[index]?.first_name?.message ?"border-red-900":""} bg-gray-50 dark:bg-gray-800`}

                  />
                </div>
                {/* Last Name */}
                <div className="border-b border-[#EAECF0] dark:border-gray-700 py-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.lastName}
                  </label>
                  <input
                    type="text"
                    placeholder={t.enterLastName}
                    {...register(`other_participants.${index}.last_name`)}
                                      className={`w-full px-4 py-3 border-[0.5px] outline-none rounded-lg ${errors.other_participants&&errors.other_participants[index]?.last_name?.message ?"border-red-900":""} bg-gray-50 dark:bg-gray-800`}

                  />
                </div>
                {/* Email */}
                <div className="border-b border-[#EAECF0] dark:border-gray-700 py-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    placeholder={t.enterEmail}
                    {...register(`other_participants.${index}.email`)}
                    className={`w-full px-4 py-3 border-[0.5px] outline-none rounded-lg ${errors.other_participants&&errors.other_participants[index]?.email?.message ?"border-red-900":""} bg-gray-50 dark:bg-gray-800`}
                  />
                </div>
                {/* Phone */}
                <div className="border-b border-[#EAECF0] dark:border-gray-700 py-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.phone}
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder={t.enterPhone}
                    maxLength={11}
                    {...register(`other_participants.${index}.contact_info.phone_number`)}
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                        e.preventDefault()
                      }
                    }}
                    className={`w-full px-4 py-3 border-[0.5px] outline-none rounded-lg ${errors.other_participants&&errors.other_participants[index]?.contact_info?.phone_number?.message ?"border-red-900":""} bg-gray-50 dark:bg-gray-800`}
                  />
                </div>
                {/* DOB */}
                <div className="border-b border-[#EAECF0] dark:border-gray-700 py-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.dob}
                  </label>
                  <input
                    type="date"
                    {...register(`other_participants.${index}.dob`)}
                                     className={`w-full px-4 py-3 border-[0.5px] outline-none rounded-lg ${errors.other_participants&&errors.other_participants[index]?.dob?.message ?"border-red-900":""} bg-gray-50 dark:bg-gray-800`}

                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addParticipant}
              disabled={!canAddParticipant()}
              className="py-2 font-archivo rounded-lg font-medium transition-colors"
            >
              {t.addParticipant}
            </button>
            {/* Cancellation Policy */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
              {t.cancelPolicy}
            </h3>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 max-h-[5vh] border-gray-200 dark:border-gray-700  bg-white dark:bg-gray-900">
            <div className="">
              <button onClick={back} className="px-4 py-2 border rounded">
              {t.cancel}
            </button>
            </div>
           <div className="">
             <button
              onClick={handleSubmit(onSubmit)}
              className="px-6 py-2 bg-orange-500 flex items-center gap-x-3 justify-center text-white rounded"
            >
              {t.proceed} {isLoading && <SmallSpinner color="#fff" />}
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
          title={t.bookingSuccessTitle}
          description={t.bookingSuccessDesc}
        />
      )}

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={errorModalMessage || t.errorDefault}
      />
    </div>
  );
};

export default SchoolParticipantForm;
