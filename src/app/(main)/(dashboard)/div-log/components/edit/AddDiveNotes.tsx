"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/core";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const diveNotesSchema = z.object({
  showNoteOnDiveLog: z.boolean(),
  publicNotes: z.string().max(275, "Public notes cannot exceed 275 characters"),
  privateNotes: z
    .string()
    .max(275, "Private notes cannot exceed 275 characters"),
});

type DiveNotesFormData = z.infer<typeof diveNotesSchema>;

interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function AddDiveNotes({
  isOpen,
  onClose,
}: AdvancedDetailsModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DiveNotesFormData>({
    resolver: zodResolver(diveNotesSchema),
    defaultValues: {
      showNoteOnDiveLog: true,
      publicNotes:
        "I had a-lot of fun with my dive buddies, great dive, great weather.",
      privateNotes: "",
    },
  });

  const publicNotes = watch("publicNotes");
  const privateNotes = watch("privateNotes");

  const onSubmit = (data: DiveNotesFormData) => {
    console.log("Form submitted:", data);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const getPlainTextLength = (html: string): number => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent?.length || 0;
  };

  const publicCharactersLeft = 275 - getPlainTextLength(publicNotes || "");
  const privateCharactersLeft = 275 - getPlainTextLength(privateNotes || "");

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
      <DialogContent className="w-full !max-w-[57.3125rem] flex flex-col max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Dive Notes
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Toggle Switch */}
          <div className="flex items-center justify-between border border-opacity-55 px-5 py-[10px] rounded-lg">
            <h2 className="text-sm font-semibold font-archivo text-gray-900">
              Show Note on Dive Log
            </h2>
            <Controller
              name="showNoteOnDiveLog"
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
                      field.value ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-1 ${
                        field.value ? "translate-x-9" : "translate-x-1"
                      }`}
                    />
                  </div>
                </label>
              )}
            />
          </div>

          {/* Public Notes */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-start gap-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Add Public Notes
              </h3>
              <p className="text-gray-600 text-xs mb-4">
                Write a short note for your friends to see.
              </p>
            </div>
            <div>
              <Controller
                name="publicNotes"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    className="custom-quill"
                  />
                )}
              />
              <div className="text-sm mt-2">
                <span
                  className={`${
                    publicCharactersLeft < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  } text-xs font-archivo`}
                >
                  {publicCharactersLeft} characters left. Only visible if your
                  dive is set to public or share buddy
                </span>
                {errors.publicNotes && (
                  <p className="text-red-500 text-sm">
                    {errors.publicNotes.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Private Notes */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-start gap-5">
            <div>
              <h3 className="text-sm font-semibold font-archivo text-gray-900 mb-2">
                Add Private Notes (Optional)
              </h3>
              <p className="text-gray-600 text-xs mb-4">
                Write a short notes only for your dive buddy.
              </p>
            </div>
            <div>
              <Controller
                name="privateNotes"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    className="custom-quill"
                  />
                )}
              />
              <div className="text-sm mt-2">
                <span
                  className={`${
                    privateCharactersLeft < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  } text-xs font-archivo`}
                >
                  {privateCharactersLeft} characters left. Only visible if your
                  dive is set to public or share buddy
                </span>
                {errors.privateNotes && (
                  <p className="text-red-500 text-sm">
                    {errors.privateNotes.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="md:px-8 px-4 py-3 text-xs md:text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="md:px-8 py-2 px-4 bg-orange-500 text-white rounded-lg text-xs md:text-sm hover:bg-orange-600 font-medium"
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
