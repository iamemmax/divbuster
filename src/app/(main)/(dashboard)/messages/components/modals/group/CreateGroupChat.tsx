import { Button, Dialog, DialogContent, ErrorModal } from "@/components/core";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CloudIcon from "@/app/icons/(dashboard)/CloudIcon";
import { X } from "lucide-react"
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import toast from "react-hot-toast";
import { groupChatResult, Othermember } from "@/app/(main)/(dashboard)/api/chats/group/fetchGroupChatList";
import { useQueryClient } from "react-query";
import { useUpdateGroupChat } from "@/app/(main)/(dashboard)/api/chats/group/updateGroup";
import { useCreateNewGroup } from "@/app/(main)/(dashboard)/api/chats/group/createNewGroup";
import CloseIcon from "@/app/icons/CloseIcon";

// Zod validation schema
const createGroupSchema = z.object({
  name: z
    .string()
    .min(1, "Group name is required")
    .min(2, "Group name must be at least 2 characters")
    .max(50, "Group name must not exceed 50 characters"),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "File must be an image"
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024, // 5MB
      "Image size must be less than 5MB"
    ),
  description: z
    .string()
    .max(200, "Description must not exceed 200 characters")
    .optional(),
});

type CreateGroupFormData = z.infer<typeof createGroupSchema>;

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  suggestedMembers: Othermember[] | undefined;
  type?: "create" | "update"
  group?: groupChatResult | undefined
  onCreateGroup?: (data: CreateGroupFormData & { members: string[] }) => void;
  setSuggestedMembers: React.Dispatch<React.SetStateAction<Othermember[] | undefined>>
}

const CreateGroupChatForm = ({
  group,
  isOpen,
  onClose,
  suggestedMembers,
  setSuggestedMembers,
  type = "create"
}: Prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const { mutate: handleUpdateGroup, isLoading: isUpdating } = useUpdateGroupChat();
  const { mutate: handleCreateNewGroup, isLoading: isSubmitting } = useCreateNewGroup();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, },
  } = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: group?.group?.name || "",
      image: undefined,
      description: group?.group?.description || "",
    },
  });

  useEffect(() => {
    if (type === "update" && group?.group?.image) {
      setPreviewURL(group?.group?.image)
    }
  }, [group])

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        alert("Image size must be less than 3MB");
        return;
      }

      setValue("image", file, { shouldValidate: true });
      setPreviewURL(URL.createObjectURL(file));
      simulateUpload();
    },
    [setValue]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const simulateUpload = () => {
    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
      }
    }, 100);
  };

  const handleRemoveImage = () => {
    setValue("image", undefined, { shouldValidate: true });
    setPreviewURL(null);
    setUploadProgress(0);
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const queryClient = useQueryClient();

  const membersString = Array.isArray(suggestedMembers)
    ? suggestedMembers.map(member => member?.user_id).filter(Boolean).join(",")
    : suggestedMembers || "";
  const onSubmit = (data: CreateGroupFormData) => {
    // Extract user_id from member objects and join as string

    if (type === "create") {
      handleCreateNewGroup(
        {
          name: data?.name,
          image: data?.image,
          members: membersString, // Will be "12,18,5,2"
          description: data?.description,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Group-chat-list"] });
            toast.success("Group created successfully");
            reset();
            setPreviewURL(null);
            setUploadProgress(0);
            setUploading(false);
            setSuggestedMembers([])
            onClose();
          },
          onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );

    } else {
      handleUpdateGroup(
        {
          id: String(group?.group?.id),
          name: data?.name,
          image: data?.image,
          members: membersString, // Will be "12,18,5,2"
          description: data?.description,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Group-chat-list"] });
            toast.success("Group updated successfully");
            reset();
            setPreviewURL(null);
            setUploadProgress(0);
            setUploading(false);
            setSuggestedMembers([])
            onClose();
          },
          onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );
    }



  };

  const handleClose = () => {
    reset();
    setPreviewURL(null);
    setUploadProgress(0);
    setUploading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-4xl mx-auto bg-[#f9fafb] dark:bg-[#1A1D21] rounded-2xl shadow p-8 space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {type === "create" ? "Create a New Group" : `Update ${group?.group?.name}`}
            </h2>

            {/* Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-opacity-50 py-4 md:py-2 items-start gap-6 md:gap-5 mt-4">
              <div>
                <h4 className="text-xs font-archivo font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Group Picture
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[320px] md:max-w-full">
                  Share a picture for your group
                </p>
              </div>

              <div className="flex flex-col gap-y-5">
                {/* Upload Drop Area */}
                {!previewURL && (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                    className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <div className="h-10 w-10 mx-auto mb-2 border-4 border-[#F9FAFB] dark:border-gray-700 rounded-full flex justify-center items-center bg-[#F2F4F7] dark:bg-gray-700">
                      <CloudIcon className="w-6 h-6 text-gray-400 dark:text-gray-300" />
                    </div>
                    <p>
                      <span className="text-orange-500 font-archivo text-sm font-medium">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs font-archivo mt-1 text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG, or GIF (max. 5MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                  </div>
                )}

                {/* Image Preview with Remove */}
                {previewURL && (
                  <div className="relative w-40 h-40 rounded overflow-hidden">
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                    {/* Upload Progress */}
                    {uploading && (
                      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300 dark:bg-gray-600">
                        <div
                          className="h-full bg-orange-500 transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}

                {/* Image validation error */}
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>

            {/* Group Details */}
            <div>
              <h3 className="text-lg font-medium text-orange-500">
                Group Details
              </h3>

              {/* Group Name */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-600 border-opacity-50 py-4 md:py-2 items-start gap-6 md:gap-5 mt-4">
                <label className="block text-sm mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Group Name *
                </label>
                <div className="w-full">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`border ${errors.name
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-gray-800 outline-none h-11 rounded-10 px-3 py-2 w-full text-sm text-gray-900 dark:text-gray-100`}
                        placeholder="Enter Group Name"
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-600 border-opacity-50 py-4 md:py-2 items-start gap-6 md:gap-5">
                <label className="block text-sm mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <div className="w-full">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={3}
                        className={`border ${errors.description
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-gray-800 outline-none rounded-10 px-3 py-2 w-full text-sm text-gray-900 dark:text-gray-100 resize-none`}
                        placeholder="Enter group description (optional)"
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Members */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                {type === "create" ? `Selected Dive Buddies (${suggestedMembers?.length || 0})` : `${group?.group?.name} Group Members`}
              </h3>
              <div className="grid grid-cols-6 gap-2 md:gap-4">
                {suggestedMembers?.map((buddy) => (
                  <div key={buddy.user_id} className="text-center shrink-0">
                    <div className="flex items-start gap-1">
                      <div className="shrink-0">
                        {buddy?.image ? (
                          <img
                            src={buddy?.image}
                            alt={buddy.first_name}
                            className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/images/profile.png"; // optional backup image
                            }}
                          />
                        ) : (
                          <div className="md:w-[4.375rem] md:h-[4.375rem] w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                            {`${buddy?.first_name?.[0] ?? ""}${buddy?.last_name?.[0] ?? ""}`}
                          </div>
                        )}
                      </div>
                      <div className=""><Button className="p-0 bg-transparent"
                      onClick={()=>{
                        setSuggestedMembers((mem)=>mem?.filter((x)=>x?.user_id !== buddy?.user_id))
                      }}
                      ><CloseIcon /></Button></div>
                    </div>


                    <p className="text-xs font-archivo text-[#98A2B3] dark:text-gray-400 mt-2 truncate">
                      {`${buddy?.first_name ?? ""} ${buddy?.last_name ?? ""}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outlined"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleClose}
                disabled={isSubmitting || isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || isUpdating}
              >
                {type === "create"
                  ? (isSubmitting ? "Creating..." : "Create Group")
                  : (isUpdating ? "Updating..." : "Update Group")
                }
              </Button>
            </div>
          </div>
        </form>
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
};

export default CreateGroupChatForm;
