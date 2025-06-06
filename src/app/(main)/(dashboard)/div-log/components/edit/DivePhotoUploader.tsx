import { useRef, useState } from "react";
import { Upload, Trash2, CheckCircle } from "lucide-react";
import { Button, Dialog, DialogBody, DialogContent, Switch } from "@/components/core";
import CloudIcon from "@/app/icons/(dashboard)/CloudIcon";
import TrashIcon from "@/app/icons/(dashboard)/Trashcon";
import VideoIcon from "@/app/icons/(dashboard)/VideoIcon";
import FileIcon from "@/app/icons/(dashboard)/FileIcon";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { UnsavedChangesModal } from "./UnsavedChangeModal";
import { DiveLogUpdatedModal } from "./DiveLogUpdatedModal";

type FileItem = {
  name: string;
  size: string;
  progress: number;
  type: "image" | "video" | "other";
};

interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function DivePhotoUploader({
  isOpen,
  onClose,
}: AdvancedDetailsModalProps) {
  const [showMapFirst, setShowMapFirst] = useState(true);
  const [files, setFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false)
  const [showUpdatedModal, setShowUpdatedModal] = useState(false)

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


  return (
   <Dialog modal={true} open={isOpen}>
  <DialogContent className="w-full !max-w-[57.3125rem] bg-[#f9fafb] ">
    <DialogBody className="p-0 px-2 md:px-8 pt-8 w-full !max-h-[95vh] md:!max-h-[90vh] flex flex-col">
      <div className="p-6 rounded-xl shadow-sm space-y-6 text-gray-800 flex flex-col flex-grow">
        {/* Header */}

        <div className=" border-gray-200 flex justify-between items-center border-b  border-opacity-55 pb-4">
        <h2 className="text-lg md:text-xl font-semibold">Add Photos from the Dive</h2>
          
        </div>

        {/* Scrollable middle content */}
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between border rounded-lg px-4 py-2">
            <span className="font-medium text-sm font-archivo">Show Map First</span>
            <Switch
              checked={showMapFirst}
              onChange={() => setShowMapFirst(!showMapFirst)}
              className={`${showMapFirst ? "bg-orange-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="inline-block h-4 w-4 transform bg-white rounded-full transition" />
            </Switch>
          </div>
 

<div className="flex justify-between items-start border-gray-200   border-b  border-opacity-55 py-6">
     <div>
              <h4 className="text-xs font-medium mb-1">Upload Attached files</h4>
              <p className="text-xs text-gray-500 max-w-[320px] md:max-w-full">
                Files and assets that have been attached to this dive.
              </p>
            </div>

            <Button className="p-0 bg-transparent"><ThreeDot/></Button>
    </div> 
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 md:py-2 items-start gap-6 md:gap-5 mt-4">
            <div>
              <h4 className="text-xs  font-archivo font-medium mb-1">Dive Pictures</h4>
              <p className="text-xs text-gray-500 max-w-[320px] md:max-w-full">
               Share a few snippets of your dive.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              {/* Upload Drop Area */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="rounded-[1.75rem] flex flex-col items-center bg-white justify-center p-6 text-center text-sm text-gray-500 cursor-pointer transition-colors hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="h-[2.5rem] w-[2.5rem] border-[0.375rem] border-[#F9FAFB] rounded-full flex justify-center items-center bg-[#F2F4F7] mb-2">
                  <CloudIcon className="w-6 h-6 text-gray-400 " />
                </div>
                <p>
                  <span className="text-orange-500 font-archivo text-sm font-medium">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs font-archivo mt-1">
                  SVG, PNG, JPG or GIF or MP4 (max. 800×400px)
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
              <div className="space-y-3 bg-white">
                {files.map((file, index) => {
                  const isVideo =
                    file.type.startsWith("video/") ||
                    /\.(mp4|mov|avi|wmv|flv)$/i.test(file.name);

                  return (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row items-start md:items-center justify-between border rounded-lg p-3 ${
                        file.progress === 100 ? "border-orange-500" : "border-gray-200"
                      }`}
                    >
                      <div className="flex-1 grid grid-cols-[30px_1fr_auto] gap-4 items-start  w-full">
                        {/* Left icon */}
                        <div className="flex items-center w-7 h-7 bg-[#FEF6F4] justify-center rounded-full">
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
                            <span className="text-xs font-archivo font-medium truncate max-w-[calc(100vw-150px)] md:max-w-none">
                              {file.name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{file.size}</p>

                          {/* Progress bar + percentage */}
                          <div className="flex items-center gap-2 mt-2 max-sm:max-w-[250px] ">
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-orange-500 transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium w-8 text-right">
                              {file.progress}%
                            </span>
                          </div>
                        </div>

                        {/* Delete or Check Icon */}
                        <div className="mt-3 md:mt-0">
                          {file.progress < 100 ? (
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-gray-400 hover:text-red-500"
                              aria-label="Delete file"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.5"
                                y="0.5"
                                width="15"
                                height="15"
                                rx="7.5"
                                fill="#F7931D"
                              />
                              <rect
                                x="0.5"
                                y="0.5"
                                width="15"
                                height="15"
                                rx="7.5"
                                stroke="#F7931D"
                              />
                              <path
                                d="M11.3327 5.5L6.74935 10.0833L4.66602 8"
                                stroke="white"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
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
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            onClick={()=>setShowDiscardModal(true)}
            className="px-4 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600"
          onClick={()=>setShowUpdatedModal(true)}
          >
            Save Changes
          </button>
        </div>
      </div>

      {
        showDiscardModal && <UnsavedChangesModal
        isOpen={showDiscardModal}
        onClose={()=>setShowDiscardModal(false)}
        onDiscard={()=>onClose()}
        // onSave={()=>void}
        
        />
      }

      {
        showUpdatedModal && <DiveLogUpdatedModal
       isOpen={showUpdatedModal}
       onClose={()=>onClose()} 
        />
      }
    </DialogBody>
  </DialogContent>
</Dialog>

  );
}
