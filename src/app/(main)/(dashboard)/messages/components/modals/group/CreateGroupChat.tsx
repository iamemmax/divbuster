import { Button, Dialog, DialogContent } from "@/components/core";
import React, { useState, useRef, useCallback } from "react";
import { members } from "./AddGroupMembers";
import CloudIcon from "@/app/icons/(dashboard)/CloudIcon";
import { X } from "lucide-react"; // Remove icon

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  suggestedMembers: members[];
}

const CreateGroupChatForm = ({
  groupId,
  isOpen,
  onClose,
  suggestedMembers,
}: Prop) => {
  const [groupName, setGroupName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setSelectedImage(file);
    setPreviewURL(URL.createObjectURL(file));
    simulateUpload(); // simulate upload
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

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
    setSelectedImage(null);
    setPreviewURL(null);
    setUploadProgress(0);
    setUploading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] rounded-lg">
        <div className="max-w-4xl mx-auto bg-[#f9fafb] rounded-2xl shadow p-8 space-y-8">
          <h2 className="text-2xl font-semibold">Create a New Group</h2>

          {/* Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]  border-opacity-50 py-4 md:py-2 items-start gap-6 md:gap-5 mt-4">
            <div>
              <h4 className="text-xs font-archivo font-medium mb-1">Dive Picture</h4>
              <p className="text-xs text-gray-500 max-w-[320px] md:max-w-full">
                Share a snippet of your dive
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              {/* Upload Drop Area */}
              {!selectedImage && (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleUploadClick}
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white hover:bg-gray-100 transition"
                >
                  <div className="h-10 w-10 mx-auto mb-2 border-4 border-[#F9FAFB] rounded-full flex justify-center items-center bg-[#F2F4F7]">
                    <CloudIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <p>
                    <span className="text-orange-500 font-archivo text-sm font-medium">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs font-archivo mt-1">
                    SVG, PNG, JPG, or GIF (max. 800×400px)
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
                <div className="relative w-40 h-40 rounded overflow-hidden ">
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                  {/* Upload Progress */}
                  {uploading && (
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300">
                      <div
                        className="h-full bg-orange-500 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Group Name */}
          <div>
            <h3 className="text-lg font-medium text-orange-500">Group Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 md:py-2 items-start gap-6 md:gap-5 mt-4">

            <label className="block  text-sm mb-2 font-medium">Group Name</label>
            <input
              className="border  bg-white outline-none h-11 rounded-10 px-3 py-2 w-full text-sm"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            </div>
          </div>

          {/* Dive Buddies */}
          <div>
            <h3 className="text-lg font-medium mb-4">Selected Dive Buddies</h3>
            <div className="grid grid-cols-6 gap-2  md:gap-4">
              {suggestedMembers?.map((buddy) => (
                <div key={buddy.id} className="text-center shrink-0">
                  {buddy.avatar ? (
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="md:w-16 md:h-16 w-7 h-7 shrink-0 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <div className="md:w-16 md:h-16 rounded-full bg-gray-100 text-gray-800 font-medium flex items-center justify-center mx-auto">
                      {buddy?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                  <p className="text-xs font-archivo text-[#98A2B3] mt-2">{buddy?.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outlined" onClick={()=>onClose()}>Cancel</Button>
            <Button>Create Group</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupChatForm;
