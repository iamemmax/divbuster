"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Dialog, DialogContent, ErrorModal } from "@/components/core";
import CloseIcon from "@/app/icons/CloseIcon";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useAddGroupMembers } from "../../../../../api/chats/group/addGroupMember";
import { UnsavedChangesModal } from "@/app/(main)/components/shared/modal/UnsavedChangeModal";
import { ConfirmSaveModal } from "@/app/(main)/components/shared/modal/ConfirmSave";
import { Othermember } from "@/app/(main)/(dashboard)/api/chats/group/fetchGroupChatList";
import { useFetchBuddyList } from "@/app/(main)/(dashboard)/api/buddy/fetchBudies";
import { useAuth } from "@/contexts/authentication";
import { useLanguage } from "@/hooks/useLanguage";
import { addMnemberTranslations } from "@/app/(main)/translation/chatMessagesTranslation";


interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  setShowCreateGroupChat: React.Dispatch<React.SetStateAction<boolean>>;
  setSuggestedMembers: React.Dispatch<React.SetStateAction<Othermember[] | undefined>>;
  suggestedMembers: Othermember[] | undefined;
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

  const { mutate: handleAddMembersFunc, isLoading: isAdding } = useAddGroupMembers();
  const { authState } = useAuth();
  const { user } = authState;
  const { language } = useLanguage();
  const t = addMnemberTranslations[language] || addMnemberTranslations.en;

  const {
    data: buddyList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchBuddyList(String(user?.profile_details?.language));

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
    const option = { root: null, rootMargin: "20px", threshold: 0.5 };
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
      { group_id: groupId, members: selectedMemberIds },
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

  const hasBuddies =
    buddyList?.pages?.flatMap((p) => p.results)?.length &&
    buddyList.pages.flatMap((p) => p.results).length > 0;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[40.25rem] bg-[#F9FAFB] dark:bg-[#1E1E1E] rounded-lg transition-colors duration-200">
        <div className="w-full mx-auto rounded-xl shadow bg-[#F9FAFB] dark:bg-[#1E1E1E]">
          <div className="p-7 max-md:py-4 border-b border-gray-400 border-opacity-50 dark:border-gray-600">
            <h2 className="text-lg md:text-[1.575rem] font-archivo font-semibold text-[#101828] dark:text-gray-100">
              {t.createNewGroup}
            </h2>
          </div>

          {/* Selected members */}
          {suggestedMembers && suggestedMembers.length > 0 && (
            <>
              <div className="p-7">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.selectedBuddies}
                </h3>
                <div className="flex items-center flex-wrap gap-6 overflow-x-auto pb-2">
                  {suggestedMembers.map((buddy, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                      <div className="relative">
                        {buddy?.image ? (
                          <Image
                            src={buddy.image}
                            alt={buddy.first_name}
                            width={54}
                            height={54}
                            className="md:w-[3.375rem] md:h-[3.375rem] w-7 h-7 rounded-full object-cover"
                          />
                        ) : (
                          <div className="md:w-[3.375rem] md:h-[3.375rem] w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-semibold">
                            {`${buddy?.first_name?.[0] ?? ""}${buddy?.last_name?.[0] ?? ""}`}
                          </div>
                        )}

                        <Button
                          className="absolute bottom-0 -right-2 h-[1.3625rem] w-[1.3625rem] flex justify-center items-center bg-[#EEEFF0] dark:bg-gray-600 border rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-gray-500"
                          onClick={() => handleRemoveMember(String(buddy?.user_id))}
                        >
                          <CloseIcon color="#A9B0C2" />
                        </Button>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {`${buddy.first_name} ${buddy.last_name}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="m1-4 border-gray-300 dark:border-gray-700" />
            </>
          )}

          {/* Show only if there are buddies */}
          {hasBuddies && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 px-7 mt-5">
              <span className="font-semibold text-sm md:text-lg font-archivo text-[#1F2C37] dark:text-white">
                {t.addFromBuddyList}
              </span>
            </p>
          )}

          {/* Buddy list */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <ul className="space-y-4 px-6 pb-9 max-h-[55vh] overflow-y-auto py-2">
              {buddyList?.pages
                ?.flatMap((page) => page.results)
                ?.filter((buddy) => !selectedMemberIds.includes(String(buddy?.id)))
                .map((buddy, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
                    onClick={() => {
                      if (!selectedMemberIds.includes(String(buddy.id))) {
                        setSelectedMemberIds((prev) => [...prev, String(buddy.id)]);
                        setSuggestedMembers((prev) => {
                          const updated = [
                            {
                              email: buddy?.email,
                              first_name: buddy?.first_name,
                              last_name: buddy?.last_name,
                              invite_id: buddy?.profile_details?.invite_id,
                              user_id: buddy?.id,
                              image: buddy?.diver_profile?.dive_image,
                            },
                            ...(prev || []),
                          ];
                          // ✅ Remove duplicates by user_id
                          const unique = updated.filter(
                            (member, index, self) =>
                              index === self.findIndex((m) => m.user_id === member.user_id)
                          );
                          return unique;
                        });
                      }
                    }}

                  >
                    {buddy?.diver_profile?.dive_image ? (
                      <Image
                        src={buddy?.diver_profile?.dive_image}
                        alt={buddy.first_name}
                        width={54}
                        height={54}
                        className="md:w-[3.375rem] md:h-[3.375rem] w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="md:w-[3.375rem] md:h-[3.375rem] w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-semibold">
                        {`${buddy?.first_name?.[0] ?? ""}${buddy?.last_name?.[0] ?? ""}`}
                      </div>
                    )}

                    <div>
                      <p className="md:text-base text-sm font-archivo font-medium text-[#101828] dark:text-gray-100">
                        {`${buddy.first_name} ${buddy.last_name}`}
                      </p>
                      <p className="md:text-xs text-xxs font-archivo truncate text-[#4F4F4F] dark:text-gray-400">
                        {buddy.email ?? ""}
                      </p>
                    </div>
                  </li>
                ))}

              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                </div>
              )}
              <div ref={loaderRef} className="h-4" />
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center p-4 gap-4">
          <button
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => onClose()}
          >
            {t.cancel}
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
            onClick={() => setShowUnsavedModal(true)}
          >
            {t.proceed}
          </button>
        </div>

        {/* Error Modal */}
        <ErrorModal
          isErrorModalOpen={isErrorModalOpen}
          setErrorModalState={() => setErrorModalState(false)}
          subheading={errorModalMessage || t.pleaseCheckInputs}
        />

        {/* Unsaved Modal */}
        {showUnsavedModal && (
          <UnsavedChangesModal
            isOpen={showUnsavedModal}
            onClose={() => setShowUnsavedModal(false)}
            onDiscard={() => setShowUnsavedModal(false)}
            onSave={handleAddMembers}
            hideSaveButton={false}
            loading={isAdding}
          />
        )}

        {/* Confirm Modal */}
        {showConfirmSaveModal && (
          <ConfirmSaveModal
            isOpen={showConfirmSaveModal}
            onSave={() => {
              setShowConfirmSaveModal(false);
              setShowCreateGroupChat(true);
              onClose();
            }}
            title={t.newMemberAdded}
            description={t.newMemberDescription}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
