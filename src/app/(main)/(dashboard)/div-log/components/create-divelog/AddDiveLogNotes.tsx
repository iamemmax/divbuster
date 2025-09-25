import { Button, DialogHeader, DialogTitle, ErrorModal } from '@/components/core'
import { useErrorModalState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import "react-quill/dist/quill.snow.css";
import { diveLogTypes } from './CreateDiveLog';
import { diveLogDetailsTypes } from './CreateDiveLogDetails';
import { createGearLogDetailsFormValues } from './CreateDriveLogGear';
import { diveEnvironmentalFormValues } from './CreateDiveLogEnvironmental';
import { addBuddyMember } from './AddDiveLogBuddies';
import { useCreateDiveLog } from '../../../api/div-logs/addDiveLog';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { SmallSpinner } from '@/icons/core';
import toast from 'react-hot-toast';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { Language } from '@/app/(auth)/sign-up/translations';
import { diveNotesTranslations } from '@/app/(main)/translation/diveLogTranslation';
import { useLanguage } from '@/hooks/useLanguage';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface prop {
    setStep: React.Dispatch<React.SetStateAction<number>>
    diveLogData: diveLogTypes
    diveLogDetails: diveLogDetailsTypes;
    diveGearData: createGearLogDetailsFormValues;
    evironmentalData: diveEnvironmentalFormValues
    buddyMembers: addBuddyMember;
    onClose: () => void
    user: User | null
}



const AddDiveLogNotes = ({ setStep, buddyMembers, onClose,user, diveGearData, diveLogData, diveLogDetails, evironmentalData }: prop) => {
   const {language}= useLanguage()
    const t = diveNotesTranslations[language] || diveNotesTranslations?.en;
    const diveNotesSchema = z.object({
        show_notes: z.boolean(),
        public_note: z.string().max(275, t.publicNotes.error),
        private_note: z
        .string()
        .max(275, t.privateNotes.error),
    });
    type DiveNotesFormData = z.infer<typeof diveNotesSchema>;
    const {
        isErrorModalOpen,
        setErrorModalState,
        openErrorModalWithMessage,
        errorModalMessage,
    } = useErrorModalState();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<DiveNotesFormData>({
        resolver: zodResolver(diveNotesSchema),
        defaultValues: {
            show_notes: false,
            public_note: "",
            private_note: "",
        },
    });

    // Watch the form values to calculate character counts
    const publicNote = watch("public_note");
    const privateNote = watch("private_note");

    const getPlainTextLength = (html: string): number => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent?.length || 0;
    };
    
    const { mutate: handleCreate, isLoading } = useCreateDiveLog();

    const publicCharactersLeft = 275 - getPlainTextLength(publicNote || "");
    const privateCharactersLeft = 275 - getPlainTextLength(privateNote || "");

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "list",
        "bullet",
        "link",
    ];

    const onSubmit = ({ private_note, public_note, show_notes }: DiveNotesFormData) => {
        const payload = {
            data: {
                ...buddyMembers,
                ...diveGearData,
                ...diveLogData,
                ...diveLogDetails,
                ...evironmentalData,
                private_note,
                public_note, 
                show_notes
            }
        }
        handleCreate(payload, {
            onSuccess: () => {
                toast.success(t.modals.updated)
                onClose()
            },
            onError: (error) => {
                const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                openErrorModalWithMessage(String(errorMessage));
            },
        })
    }

    return (
        <div className='pb-4'>
            <DialogHeader className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700 pb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Add Notes
                </DialogTitle>
            </DialogHeader>

            {/* Wrap everything in a form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Toggle Switch */}
                        <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 border-opacity-55 px-5 py-[10px] rounded-lg">
                            <h2 className="text-sm font-semibold font-archivo text-gray-900 dark:text-gray-100">
                                {t.showNote}
                            </h2>
                            <Controller
                                name="show_notes"
                                control={control}
                                render={({ field }) => (
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={field.value}
                                            onChange={field.onChange}
                                        />
                                        <div
                                            className={`w-16 h-8 rounded-full transition-colors duration-200 ${field.value ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
                                                }`}
                                        >
                                            <div
                                                className={`w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-200 mt-1 ${field.value ? "translate-x-9" : "translate-x-1"
                                                    }`}
                                            />
                                        </div>
                                    </label>
                                )}
                            />
                        </div>

                        {/* Public Notes */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-gray-200 dark:border-gray-700 border-opacity-50 py-2 items-start gap-5">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    {t.publicNotes.heading}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">
                                   {t.publicNotes.description}
                                </p>
                            </div>
                            <div>
                                <Controller
                                    name="public_note"
                                    control={control}
                                    render={({ field }) => (
                                        <ReactQuill
                                            value={field.value}
                                            onChange={field.onChange}
                                            modules={modules}
                                            formats={formats}
                                            theme="snow"
                                            className="custom-quill text-black dark:text-gray-100"
                                        />
                                    )}
                                />
                                <div className="text-sm mt-2">
                                    <span
                                        className={`${publicCharactersLeft < 0
                                            ? "text-red-500"
                                            : "text-gray-500 dark:text-gray-400"
                                            } text-xs font-archivo`}
                                    >
                                        {publicCharactersLeft} {t.publicNotes.charactersLeft}
                                    </span>
                                    {errors.public_note && (
                                        <p className="text-red-500 text-sm">
                                            {errors.public_note.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Private Notes */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-gray-200 dark:border-gray-700 border-opacity-50 py-2 items-start gap-5">
                            <div>
                                <h3 className="text-sm font-semibold font-archivo text-gray-900 dark:text-gray-100 mb-2">
                                   {t.privateNotes.heading}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">
                                   {t.privateNotes.description}
                                </p>
                            </div>
                            <div>
                                <Controller
                                    name="private_note"
                                    control={control}
                                    render={({ field }) => (
                                        <ReactQuill
                                            value={field.value}
                                            onChange={field.onChange}
                                            modules={modules}
                                            formats={formats}
                                            theme="snow"
                                            className="custom-quill text-black dark:text-gray-100"
                                        />
                                    )}
                                />
                                <div className="text-sm mt-2">
                                    <span
                                        className={`${privateCharactersLeft < 0
                                            ? "text-red-500"
                                            : "text-gray-500 dark:text-gray-400"
                                            } text-xs font-archivo`}
                                    >
                                        {privateCharactersLeft} {t.privateNotes.charactersLeft}
                                    </span>
                                    {errors.private_note && (
                                        <p className="text-red-500 text-sm">
                                            {errors.private_note.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end px-6 gap-3">
                    <Button
                        type="button"
                        variant={"outlined"}
                        className="px-8 py-3 border-dark dark:border-white dark:text-white  text-black font-medium rounded-lg flex justify-center items-center gap-x-3  transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setStep(5)}
                    >
                     {t.actions.cancel}
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg flex justify-center items-center gap-x-3 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.actions.save} {isLoading && <SmallSpinner color='#fff' />}
                    </Button>
                </div>
            </form>

            <ErrorModal
                isErrorModalOpen={isErrorModalOpen}
                setErrorModalState={() => {
                    setErrorModalState(false);
                }}
                subheading={
                    errorModalMessage || t.modals.error
                }
            />
        </div>
    )
}

export default AddDiveLogNotes