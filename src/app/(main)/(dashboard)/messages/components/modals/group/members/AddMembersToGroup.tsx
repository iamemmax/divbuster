"use client";
import { Button, Dialog, DialogContent, ErrorModal } from "@/components/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "@/app/icons/CloseIcon";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useAddGroupMembers } from "../../../../../api/chats/group/addGroupMember";
import { UnsavedChangesModal } from "@/app/(main)/components/shared/modal/UnsavedChangeModal";
import { ConfirmSaveModal } from "@/app/(main)/components/shared/modal/ConfirmSave";
import { Othermember } from "@/app/(main)/(dashboard)/api/chats/group/fetchGroupChatList";
import { useFetchBuddyList } from "@/app/(main)/(dashboard)/api/buddy/fetchBudies";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  setShowCreateGroupChat: React.Dispatch<React.SetStateAction<boolean>>;
  setSuggestedMembers: React.Dispatch<React.SetStateAction<Othermember[]|undefined>>;
  suggestedMembers: Othermember[]|undefined;
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

  const { mutate: handleAddMembersFunc,isLoading:isAdding } = useAddGroupMembers();
 const { 
    data: buddList, 
    isLoading, 
    error, 
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useFetchBuddyList();

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
   const loaderRef = useRef<HTMLDivElement | null>(null);

 const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const handleRemoveMember = (id: string) => {
    setSuggestedMembers((prev) =>
      prev?.filter((member) => member?.user_id?.toString() !== id?.toString())
    );
    setSelectedMemberIds((prev) => prev.filter((memberId) => memberId !== id));
  };

  const handleAddMembers = () => {
    handleAddMembersFunc(
      {
        group_id: groupId,
        members: selectedMemberIds,
      },
      {
        onSuccess: () => {
          setShowConfirmSaveModal(true);
          setShowUnsavedModal(false);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
          setShowCreateGroupChat(true);
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

          {suggestedMembers && suggestedMembers?.length > 0 && (
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
                      {buddy?.image ? (
                        <img
                          src={buddy.image}
                          alt={buddy.first_name}
                          className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/images/profile.png"
                          }}
                        />
                      ) : (
                        <div className="md:w-[4.375rem] md:h-[4.375rem] w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                          {`${buddy?.first_name?.[0] ?? ""}${buddy?.last_name?.[0] ?? ""}`}
                        </div>
                      )}

                      <Button
                        className="absolute bottom-5 right-0 h-[1.3625rem] w-[1.3625rem] flex justify-center items-center -mt-2 -mr-2 bg-[#EEEFF0] border rounded-full p-0.5 hover:bg-gray-100"
                        onClick={() =>
                          handleRemoveMember(String(buddy?.user_id))
                        }
                      >
                        <CloseIcon color="#A9B0C2" />
                      </Button>
                      <span className="text-xs text-gray-600 mt-1">
                        {`${buddy.first_name} ${buddy.last_name}`}
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

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <ul className="space-y-6 px-6 pb-9 max-h-[55vh] overflow-y-auto py-4">
              {buddList?.pages
                ?.flatMap(page => page.results)
                ?.filter(
                  (buddy) => !selectedMemberIds.includes(String(buddy?.id))
                )
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
                            email: buddy?.email,
                            first_name: buddy?.first_name,
                            last_name: buddy?.last_name,
                            invite_id: buddy?.profile_details?.invite_id,
                            user_id: buddy?.id,
                            image: buddy?.diver_profile?.dive_image,
                          },
                          ...(prev || []),
                        ]);
                      }
                    }}
                  >
                    {buddy?.diver_profile?.dive_image ? (
                      <img
                        src={buddy?.diver_profile?.dive_image}
                        alt={buddy.first_name}
                        className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/images/profile.png";
                        }}
                      />
                    ) : (
                      <div className="md:w-[4.375rem] md:h-[4.375rem] w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                        {`${buddy?.first_name?.[0] ?? ""}${buddy?.last_name?.[0] ?? ""}`}
                      </div>
                    )}

                    <div>
                      <p className="md:text-lg text-base font-archivo font-medium text-[#101828]">
                        {`${buddy.first_name} ${buddy.last_name}`}
                      </p>
                      <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] ">
                        {buddy.email ?? ""}
                      </p>
                    </div>
                  </li>
                ))}

              {/* Loading indicator for fetching more */}
              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                </div>
              )}

              {/* Intersection observer target */}
              <div ref={loaderRef} className="h-4" />
            </ul>
          )}
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
            loading={isAdding}
            
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
