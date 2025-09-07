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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const diveNotesSchema = z.object({
  show_notes: z.boolean(),
  public_note: z.string().max(275, "Public notes cannot exceed 275 characters"),
  private_note: z
    .string()
    .max(275, "Private notes cannot exceed 275 characters"),
});

type DiveNotesFormData = z.infer<typeof diveNotesSchema>;

interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  data: singleDiveProp | undefined;
}

export default function AddDiveNotes({
  isOpen,
  onClose,
  data,
}: AdvancedDetailsModalProps) {
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

  const onSubmit = ({
    private_note,
    public_note,
    show_notes,
  }: DiveNotesFormData) => {
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

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full !max-w-[57.3125rem] flex flex-col max-h-[90vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Dive Notes
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Toggle Switch */}
          <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 border-opacity-55 px-5 py-[10px] rounded-lg">
            <h2 className="text-sm font-semibold font-archivo text-gray-900 dark:text-gray-100">
              Show Note on Dive Log
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
                    className={`w-16 h-8 rounded-full transition-colors duration-200 ${
                      field.value ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-200 mt-1 ${
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
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Add Public Notes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">
                Write a short note for your friends to see.
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
                  className={`${
                    publicCharactersLeft < 0
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400"
                  } text-xs font-archivo`}
                >
                  {publicCharactersLeft} characters left. Only visible if your
                  dive is set to public or share buddy
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
                Add Private Notes (Optional)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">
                Write a short note only for your dive buddy.
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
                  className={`${
                    privateCharactersLeft < 0
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400"
                  } text-xs font-archivo`}
                >
                  {privateCharactersLeft} characters left. Only visible if your
                  dive is set to public or share buddy
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

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outlined"
            onClick={() => setShowDiscardModal(true)}
            className="dark:text-gray-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="bg-orange-500 flex justify-center items-center gap-x-3 hover:bg-orange-600 text-white"
          >
            Save Changes {isLoading && <SmallSpinner color="#fff" />}
          </Button>
        </div>

        {/* Modals */}
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
      </DialogContent>
    </Dialog>
  );
}
