import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const participantSchema = z.object({
  other_participants: z
    .array(
      z.object({
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email"),
        dob: z.string().min(1, "Date of Birth is required"),
      })
    )
    .min(1, "At least one participant is required"),
});

// Type inference from schema
type ParticipantFormValues = z.infer<typeof participantSchema>;

interface Props {
  next: () => void;
  back: () => void;
}

const SchoolParticipantForm = ({ back, next }: Props) => {
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

  const watchedParticipants = watch("other_participants");

  const onSubmit =async (data: ParticipantFormValues) => {
    await trigger()
    console.log("Submitted Data:", data);
    next();
  };

  const addParticipant = async () => {
    // Trigger validation for all current participants
    const isFormValid = await trigger();
    
    if (isFormValid) {
      append({ first_name: "", last_name:"", email: "", dob: "" });
    }
  };

  // Check if current participants are filled
  const canAddParticipant = () => {
    return watchedParticipants.every(participant => 
      participant.first_name.trim() !== "" && 
      participant.last_name.trim() !== "" && 
      participant.email.trim() !== "" && 
      participant.dob.trim() !== ""
    ) && Object.keys(errors).length === 0;
  };

  return (
    <div className=" bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className=" mx-auto">
        <div className="space-y-8">
         <div className="overflow-y-auto md:max-h-[calc(75vh-160px)]">
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
                  First and Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter First name"
                  {...register(`other_participants.${index}.first_name`)}
                  className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.first_name ? "border-red-500" : "border-gray-300"} outline-none dark:border-gray-600 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
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
                  last_name and Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Last name"
                  {...register(`other_participants.${index}.last_name`)}
                  className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.last_name ? "border-red-500" : "border-gray-300"} outline-none dark:border-gray-600 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
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
                                   className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.email ? "border-red-500" : "border-gray-300"} border outline-none dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
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
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register(`other_participants.${index}.dob`)}
                                    className={`w-full px-4 py-3 border ${errors.other_participants?.[index]?.dob ? "border-red-500" : "border-gray-300"} border outline-none dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-colors`}
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
              className={` py-2 font-archivo rounded-lg font-medium transition-colors ${
                canAddParticipant() 
                  ? "text-orange-500 dark:text-blue-400 border-orange-500 dark:border-blue-400 hover:bg-orange-50 dark:hover:bg-blue-900"
                  : "text-[#98A2B3] dark:text-gray-500 border-gray-300 dark:border-gray-600 cursor-not-allowed"
              }`}
            >
              + Add Another Participant
            </button>
          </div>
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
          className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 underline ml-1 inline-block"
        >
          https://www.divebusters.com/uploads/Diver_Medical_Form.pdf
        </a>
      </li>
    </ul>
  </div>
</div>


          {/* <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={back}
              className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isValid 
                  ? "bg-orange-500 dark:bg-blue-600 hover:bg-orange-600 dark:hover:bg-blue-700 text-white"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              Proceed
            </button>
          </div> */}

              <div className="flex justify-end gap-4   border-gray-200 dark:border-gray-700 px-6  bg-white dark:bg-gray-900">
        <button
          onClick={back}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
           onClick={handleSubmit(onSubmit)}
            //   disabled={!isValid}
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Proceed
        </button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolParticipantForm;