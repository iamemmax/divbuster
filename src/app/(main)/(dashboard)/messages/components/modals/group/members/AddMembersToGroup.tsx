"use client";
import { Button, Dialog, DialogContent, ErrorModal } from "@/components/core";
import React, { useState } from "react";
import CloseIcon from "@/app/icons/CloseIcon";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useAddGroupMembers } from "../../../../api/addGroupMember";
import { UnsavedChangesModal } from "@/app/(main)/components/shared/modal/UnsavedChangeModal";
import { ConfirmSaveModal } from "@/app/(main)/components/shared/modal/ConfirmSave";

const buddies = [
  {
    id: 1,
    name: "Phoenix Baker",
    username: "@phoenix",
    description: "only god is enough",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: 3,
    name: "Mollie Hall",
    username: "@mollie",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    description: "User description goes here... Lorem ipsum",
  },
  {
    id: 7,
    name: "Eva Bond",
    description: "User description goes here... Lorem ipsum",
    username: "@eva",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
    isOnline: false,
  },
  {
    id: 4,
    name: "Rosalee Melvin",
    username: "@rosalee",
    description: "User description goes here... Lorem ipsum",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    isOnline: false,
  },
  {
    id: 5,
    name: "Anaiah Whitten",
    username: "@anaiah",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    description: "",
  },
];

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  setShowCreateGroupChat: React.Dispatch<React.SetStateAction<boolean>>;
  setSuggestedMembers: React.Dispatch<React.SetStateAction<members[]>>;
  suggestedMembers: members[];
}

export interface members {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

export default function AddMembersToGroupModal({
  isOpen,
  onClose,
  groupId,
  setShowCreateGroupChat,
  setSuggestedMembers,
  suggestedMembers,
}: Prop) {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const { mutate: handleAddMembersFunc } = useAddGroupMembers();

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);

  const handleRemoveMember = (id: string) => {
    setSuggestedMembers((prev) => prev.filter((member) => member?.id !== id));
    setSelectedMemberIds((prev) => prev.filter((memberId) => memberId !== id));
  };

  const handleAddMembers = () => {
    handleAddMembersFunc(
      {
        group_id: groupId,
        members: selectedMemberIds,
      },
      {
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
          setShowCreateGroupChat(true);
        },
        onSuccess: () => {
          setShowConfirmSaveModal(true);
          setShowUnsavedModal(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] rounded-lg">
        <div className="w-full mx-auto bg-[#F9FAFB] rounded-xl shadow">
          <div className="p-7 border-b border-gray-400 border-opacity-50">
            <h2 className="text-xl md:text-[1.875rem] font-archivo font-semibold text-[#101828]">
              Create a New Group
            </h2>
          </div>

          {suggestedMembers?.length > 0 && (
            <>
              <div className="p-7">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Selected Dive Buddies
                </h3>
                <div className="flex items-center flex-wrap gap-6 overflow-x-auto pb-2">
                  {suggestedMembers?.map((buddy, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center relative"
                    >
                      <img
                        src={buddy?.avatar}
                        alt={buddy?.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <Button
                        className="absolute bottom-5 right-0 h-[1.3625rem] w-[1.3625rem] flex justify-center items-center -mt-2 -mr-2 bg-[#EEEFF0] border rounded-full p-0.5 hover:bg-gray-100"
                        onClick={() => handleRemoveMember(buddy?.id)}
                      >
                        <CloseIcon color="#A9B0C2" />
                      </Button>
                      <span className="text-xs text-gray-600 mt-1">
                        {buddy.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="m1-4 border-gray-300" />
            </>
          )}

          <p className="text-sm text-gray-600 mb-4 px-7 mt-5">
            <span className="font-semibold text-base md:text-xl font-archivo text-[#1F2C37]">
              Add member from your Buddy list
            </span>
          </p>

          <ul className="space-y-6 px-6 pb-9 max-h-[55vh] overflow-y-auto py-4">
            {buddies
              .filter((buddy) => !selectedMemberIds.includes(String(buddy.id)))
              .map((buddy, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => {
                    if (!selectedMemberIds.includes(String(buddy.id))) {
                      setSelectedMemberIds((prev) => [
                        ...prev,
                        String(buddy.id),
                      ]);
                      setSuggestedMembers((prev) => [
                        {
                          avatar: buddy.avatar,
                          id: String(buddy.id),
                          name: buddy.name,
                          description: "",
                        },
                        ...prev,
                      ]);
                    }
                  }}
                >
                  <img
                    src={buddy.avatar}
                    alt={buddy.name}
                    className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="md:text-lg text-base font-archivo font-medium text-[#101828]">
                      {buddy.name}
                    </p>
                    <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] ">
                      {buddy.description || "No description available"}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex justify-end items-center p-4 gap-4">
          <button
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
            onClick={() => setShowUnsavedModal(true)}
          >
            Proceed
          </button>
        </div>

        {/* Error Modal */}
        <ErrorModal
          isErrorModalOpen={isErrorModalOpen}
          setErrorModalState={() => {
            setErrorModalState(false);
          }}
          subheading={
            errorModalMessage || "Please check your inputs and try again."
          }
        />

        {/* Unsaved Changes Modal */}
        {showUnsavedModal && (
          <UnsavedChangesModal
            isOpen={showUnsavedModal}
            onClose={() => setShowUnsavedModal(false)}
            onDiscard={() => setShowUnsavedModal(false)}
            onSave={handleAddMembers} // ✅ FIXED: correctly call the handler
            hideSaveButton={false}
          />
        )}

        {/* Confirm Save Modal */}
        {showConfirmSaveModal && (
          <ConfirmSaveModal
            isOpen={showConfirmSaveModal}
            onSave={() => {
              setShowConfirmSaveModal(false);
              setShowCreateGroupChat(true);
              onClose();
            }}
            title="New Member Added"
            description="There are now new members in your group. Please feel free to add more participants as soon as possible."
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
