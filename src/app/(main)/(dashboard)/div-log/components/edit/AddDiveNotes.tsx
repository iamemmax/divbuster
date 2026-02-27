"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ErrorModal,
} from "@/components/core";
import { singleDiveProp } from "../../../api/div-logs/fetchSingleDivLog";
import { useUpdateLogNote } from "../../../api/div-logs/update/updateLogNote";
import { useErrorModalState } from "@/hooks";
import { useQueryClient } from "react-query";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { SmallSpinner } from "@/icons/core";
import { useState } from "react";
import { DiveLogUpdatedModal } from "./DiveLogUpdatedModal";
import { UnsavedChangesModal } from "@/app/(main)/components/shared/modal/UnsavedChangeModal";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { diveNotesTranslations } from "@/app/(main)/translation/diveLogTranslation";
import { useLanguage } from "@/hooks/useLanguage";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  data: singleDiveProp | undefined;
  user: User | null
}

export default function AddDiveNotes({
  isOpen,
  onClose,
  data,
  
}: AdvancedDetailsModalProps) {
  const {language}= useLanguage()
  const t = diveNotesTranslations[language] || diveNotesTranslations?.en;
  
  const diveNotesSchema = z.object({
    show_notes: z.boolean(),
    public_note: z.string().max(275, t?.publicNotes?.error),
    private_note: z
      .string()
      .max(275, t?.privateNotes?.error),
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
      show_notes: data?.data?.show_notes,
      public_note: data?.data?.public_note || "",
      private_note: data?.data?.private_note || "",
    },
  });

  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showUpdatedModal, setShowUpdatedModal] = useState(false);

  const { mutate: handleUpdate, isLoading } = useUpdateLogNote();
  const public_note = watch("public_note");
  const private_note = watch("private_note");
  const queryClient = useQueryClient();

  const onSubmit = ({ private_note, public_note, show_notes }: DiveNotesFormData) => {
    handleUpdate(
      {
        id: String(data?.data?.id),
        private_note,
        public_note,
        show_notes,
      },
      {
        onSuccess: () => {
          setShowUpdatedModal(true);
          queryClient.invalidateQueries({ queryKey: ["single-div-log"] });
          queryClient.invalidateQueries({ queryKey: ["div-logs"] });
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  const getPlainTextLength = (html: string): number => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent?.length || 0;
  };

  const publicCharactersLeft = 275 - getPlainTextLength(public_note || "");
  const privateCharactersLeft = 275 - getPlainTextLength(private_note || "");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = ["header", "bold", "italic", "underline", "list", "bullet", "link"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full !max-w-[57.3125rem] flex flex-col max-h-[90vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <DialogTitle className="text-2xl font-bold">{t.title}</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Toggle Switch */}
          <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 border-opacity-55 px-5 py-[10px] rounded-lg">
            <h2 className="text-sm font-semibold">{t.showNote}</h2>
            <Controller
              name="show_notes"
              control={control}
              render={({ field }) => (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only" checked={field.value} onChange={field.onChange} />
                  <div
                    className={`w-16 h-8 rounded-full transition-colors duration-200 ${
                      field.value ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`size-6 bg-white dark:bg-gray-200 rounded-full shadow-md transition-transform duration-200 mt-1${
                        field.value ? "translate-x-9" : "translate-x-1"
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
              <h3 className="text-sm font-semibold mb-2">{t.publicNotes?.heading}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">{t.publicNotes?.description}</p>
            </div>
            <div>
              <Controller
                name="public_note"
                control={control}
                render={({ field }) => (
                  <ReactQuill value={field.value} onChange={field.onChange} modules={modules} formats={formats} theme="snow" />
                )}
              />
              <div className="text-sm mt-2">
                <span
                  className={`${
                    publicCharactersLeft < 0 ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                  } text-xs`}
                >
                  {t?.publicNotes?.charactersLeft}.
                </span>
                {errors.public_note && <p className="text-red-500 text-sm">{errors.public_note.message}</p>}
              </div>
            </div>
          </div>

          {/* Private Notes */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] py-2 items-start gap-5">
            <div>
              <h3 className="text-sm font-semibold mb-2">{t.privateNotes.heading}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">{t.privateNotes.description}</p>
            </div>
            <div>
              <Controller
                name="private_note"
                control={control}
                render={({ field }) => (
                  <ReactQuill value={field.value} onChange={field.onChange} modules={modules} formats={formats} theme="snow" />
                )}
              />
              <div className="text-sm mt-2">
                <span
                  className={`${
                    privateCharactersLeft < 0 ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                  } text-xs`}
                >
                  {t?.privateNotes?.charactersLeft}.
                </span>
                {errors.private_note && <p className="text-red-500 text-sm">{errors.private_note.message}</p>}
              </div>
            </div>
          </div>


     
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="outlined" onClick={() => setShowDiscardModal(true)}>
            {t.actions.cancel}
          </Button>
          <Button onClick={handleSubmit(onSubmit)} type="submit" className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-x-3">
            {t.actions.save} {isLoading && <SmallSpinner color="#fff" />}
          </Button>
        </div>

        {/* Modals */}
        {showDiscardModal && <UnsavedChangesModal isOpen={showDiscardModal} onClose={() => setShowDiscardModal(false)} onDiscard={() => onClose()} />}
        {showUpdatedModal && <DiveLogUpdatedModal isOpen={showUpdatedModal} onClose={() => onClose()} />}
        <ErrorModal isErrorModalOpen={isErrorModalOpen} setErrorModalState={() => setErrorModalState(false)} subheading={errorModalMessage || "Please check your inputs and try again."} />
      </DialogContent>
    </Dialog>
  );
}
