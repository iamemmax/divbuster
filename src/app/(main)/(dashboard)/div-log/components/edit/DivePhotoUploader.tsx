import { useRef, useState } from "react";
import { Upload, Trash2, CheckCircle } from "lucide-react";
import { Button, Dialog, DialogBody, DialogContent, ErrorModal, Switch } from "@/components/core";
import CloudIcon from "@/app/icons/(dashboard)/CloudIcon";
import TrashIcon from "@/app/icons/(dashboard)/Trashcon";
import VideoIcon from "@/app/icons/(dashboard)/VideoIcon";
import FileIcon from "@/app/icons/(dashboard)/FileIcon";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { DiveLogUpdatedModal } from "./DiveLogUpdatedModal";
import { z } from "zod";
import { useErrorModalState } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { singleDiveProp } from "../../../api/div-logs/fetchSingleDivLog";
import { useUpdatImageOrVideo } from "../../../api/div-logs/update/updateImageOrVideo";
import { useQueryClient } from "react-query";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import CheckColorIcon2 from "@/app/icons/(dashboard)/CheckColorIcon2";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { Language } from "@/app/(auth)/sign-up/translations";
import { divePhotoUploaderTranslations } from "@/app/(main)/translation/diveLogTranslation";
import { UnsavedChangesModal } from "@/app/(main)/components/shared/modal/UnsavedChangeModal";
import { SmallSpinner } from "@/icons/core";
import { useLanguage } from "@/hooks/useLanguage";

// Define FileItem with the file property
interface FileItem {
  name: string;
  size: string;
  progress: number;
  type: "image" | "video" | "other";
  originalFile: File; // Store the original File object
}

interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  data: singleDiveProp | undefined;
  user: User | null
}

const diveImageSchema = z.object({
  show_map_first: z.boolean(),
});

type DiveImageFormData = z.infer<typeof diveImageSchema>;

export default function DivePhotoUploader({
  isOpen,
  onClose,
  data,
  user
}: AdvancedDetailsModalProps) {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  
  const [files, setFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showUpdatedModal, setShowUpdatedModal] = useState(false);
  const { mutate: handleUpdate, isLoading } = useUpdatImageOrVideo();
const {language}= useLanguage()
  const t = divePhotoUploaderTranslations[language] || divePhotoUploaderTranslations?.en;
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DiveImageFormData>({
    resolver: zodResolver(diveImageSchema),
    defaultValues: {
      show_map_first: data?.data?.show_map_first || false,
    },
  });

  const simulateUpload = (file: File) => {
    const type = file.type.startsWith("image")
      ? "image"
      : file.type.startsWith("video")
        ? "video"
        : "other";

    const newFile: FileItem = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      progress: 0,
      type,
      originalFile: file, // Store the original File object
    };

    setFiles((prev) => [...prev, newFile]);

    const interval = setInterval(() => {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.name === file.name
            ? { ...f, progress: Math.min(f.progress + 10, 100) }
            : f
        )
      );
    }, 200);

    setTimeout(() => clearInterval(interval), 2000);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    Array.from(fileList).forEach(simulateUpload);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const queryclient = useQueryClient();

  const onSubmit = ({ show_map_first }: DiveImageFormData) => {
    // Extract only completed files (progress === 100) and get the actual File objects
    const completedFiles = files
      .filter(fileItem => fileItem.progress === 100)
      .map(fileItem => fileItem.originalFile); // Use originalFile property

    handleUpdate({
      id: String(data?.data?.id),
      show_map_first,
      dive_photos: completedFiles // Pass actual File objects
    }, {
      onSuccess: () => {
        setShowUpdatedModal(true);
        queryclient.invalidateQueries({ queryKey: ["single-div-log"] });
        queryclient.invalidateQueries({ queryKey: ["div-logs"] });
      }, 
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    });
  };

  // Create the submit handler function
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="w-full !max-w-[57.3125rem] bg-[#f9fafb] dark:bg-gray-800">
        <DialogBody className="p-0 px-2 md:px-8 pt-8 w-full !max-h-[95vh] md:!max-h-[90vh] flex flex-col">
          <form onSubmit={handleFormSubmit} className="p-6 rounded-xl shadow-sm space-y-6 text-gray-800 dark:text-gray-200 flex flex-col flex-grow">
            {/* Header */}
            <div className="border-gray-200 dark:border-gray-600 flex justify-between items-center border-b border-opacity-55 pb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t?.header}
              </h2>
            </div>

            {/* Scrollable middle content */}
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between border dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700">
                <span className="font-medium text-sm font-archivo text-gray-800 dark:text-gray-200">
                 {t?.showMapFirst}
                </span>
                <Controller
                  name="show_map_first"
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

              <div className="flex justify-between items-start border-gray-200 dark:border-gray-600 border-b border-opacity-55 py-6">
                <div>
                  <h4 className="text-xs font-medium mb-1 text-gray-800 dark:text-gray-200">
                   {t?.upload?.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[320px] md:max-w-full">
                   {t?.upload?.description}
                  </p>
                </div>
                {/* <Button className="p-0 bg-transparent dark:bg-transparent">
                  <ThreeDot />
                </Button> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-600 border-opacity-50 py-4 md:py-2 items-start gap-6 md:gap-5 mt-4">
                <div>
                  <h4 className="text-xs font-archivo font-medium mb-1 text-gray-800 dark:text-gray-200">
                    {t?.upload?.pictures?.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[320px] md:max-w-full">
                   {t?.upload?.pictures?.description}
                  </p>
                </div>

                <div className="flex flex-col gap-y-5">
                  {/* Upload Drop Area */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="rounded-[1.75rem] flex flex-col items-center bg-white dark:bg-gray-700 justify-center p-6 text-center text-sm text-gray-500 dark:text-gray-400 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-600"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="h-[2.5rem] w-[2.5rem] border-[0.375rem] border-[#F9FAFB] dark:border-gray-600 rounded-full flex justify-center items-center bg-[#F2F4F7] dark:bg-gray-600 mb-2">
                      <CloudIcon className="w-6 h-6 text-gray-400 dark:text-gray-300" />
                    </div>
                    <p>
                      <span className="text-orange-500 font-archivo text-sm font-medium">
                       {t?.upload?.dropzone?.click}
                      </span>{" "}
                      {t?.upload?.dropzone?.or}
                    </p>
                    <p className="text-xs font-archivo mt-1 text-gray-500 dark:text-gray-400">
                      {t?.upload?.dropzone?.formats}
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      ref={fileInputRef}
                      onChange={(e) => handleFiles(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {/* File List */}
                  <div className="space-y-3">
                    {files.map((file, index) => {
                      const isVideo =
                        file.type.startsWith("video/") ||
                        /\.(mp4|mov|avi|wmv|flv)$/i.test(file.name);

                      return (
                        <div
                          key={index}
                          className={`flex flex-col md:flex-row items-start md:items-center justify-between border rounded-lg p-3 bg-white dark:bg-gray-700 ${
                            file.progress === 100 
                              ? "border-orange-500 dark:border-orange-400" 
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          <div className="flex-1 grid grid-cols-[30px_1fr_auto] gap-4 items-start w-full">
                            {/* Left icon */}
                            <div className="flex items-center w-7 h-7 bg-[#FEF6F4] dark:bg-orange-900/20 justify-center rounded-full">
                              {file.progress < 100 ? (
                                <CloudIcon color="#F7931D" />
                              ) : isVideo ? (
                                <VideoIcon />
                              ) : (
                                <FileIcon />
                              )}
                            </div>

                            {/* File details + progress */}
                            <div className="flex flex-col min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-archivo font-medium truncate max-w-[calc(100vw-150px)] md:max-w-none text-gray-800 dark:text-gray-200">
                                  {file.name}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {file.size}
                              </p>

                              {/* Progress bar + percentage */}
                              <div className="flex items-center gap-2 mt-2 max-sm:max-w-[250px]">
                                <div className="w-full h-2 bg-gray-100 dark:bg-gray-600 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-orange-500 dark:bg-orange-400 transition-all duration-300"
                                    style={{ width: `${file.progress}%` }}
                                  />
                                </div>
                                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium w-8 text-right">
                                  {file.progress}%
                                </span>
                              </div>
                            </div>

                            {/* Delete or Check Icon */}
                            <div className="mt-3 md:mt-0">
                              {file?.name ? (
                                <button
                                disabled={!!isLoading}
                                  type="button"
                                  onClick={() => handleDelete(index)}
                                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                                  aria-label="Delete file"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              ) : (
                                <CheckColorIcon2 />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-600 pt-4">
              <button
                type="button"
                onClick={() => setShowDiscardModal(true)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 bg-white dark:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white flex items-center gap-x-3 text-xs md:text-sm hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
               {t?.actions?.save} {isLoading && <SmallSpinner color="#fff"/>}
              </button>
            </div>
          </form>

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
              errorModalMessage || t?.messages?.error
            }
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}