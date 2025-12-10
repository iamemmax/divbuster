"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/shared/Header";
import RecentMessages, { resentChatProp } from "./components/RecentMessages";
import StartNewMessageModal from "./components/modals/StartNewMessageModal";
import AddNewGroupMembersModal from "./components/modals/group/AddGroupMembers";
import CreateGroupChatForm from "./components/modals/group/CreateGroupChat";
import { useFetchSingleChatList } from "../api/chats/single-chat/fetchChatList";
import { groupChatResult, Othermember } from "../api/chats/group/fetchGroupChatList";
import GroupMessages from "./components/GroupMessages";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/core";
import { chatMessagestranslations } from "../../translation/chatMessagesTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import { usefetchBuddyProfile } from "../api/buddy/fetchBuddyProfile";



const Messages = () => {
  const {language}=useLanguage()
  const t = chatMessagestranslations[language] || chatMessagestranslations.en;
  const [activeTab, setActiveTab] = useState<string>(t.recent);
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');


useEffect(() => {
  setActiveTab(t.recent);
}, [t.recent]); // re-run whenever translation changes

  
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<resentChatProp>();
  const [groupList, setGroupList] = useState<groupChatResult[]>();
  const [selectedGroup, setSelectedGroup] = useState<groupChatResult | null>(null);
  const [showAddGroupMemberModal, setShowAddGroupMemberModal] = useState(false);
  const [showCreateGroupChat, setShowCreateGroupChat] = useState(false);
  const [suggestedMembers, setSuggestedMembers] = useState<Othermember[] | undefined>();

  const tabs = [t.recent, t.groups];

  const { data: recentChatList, isLoading } = useFetchSingleChatList(String(language));
  const { data: userProfile } = usefetchBuddyProfile(userId);

  // Handle userId parameter to start conversation
  useEffect(() => {
    if (userId && userProfile) {
      const chatData: resentChatProp = {
        user_id: userId,
        name: `${userProfile?.data?.first_name} ${userProfile?.data?.last_name}`,
        image: userProfile?.data?.profile_details?.profile_picture || null,
        last_message: "",
        date: null
      };
      setSelectedMessage(chatData);
      setActiveTab(t.recent);
    }
  }, [userId, userProfile, t.recent]);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div>
        <Header title={t.messages} subtitle="" />
      </div>

      <div className="w-full bg-white max-h-[80vh] dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
            {/* Tabs */}
            <div className="flex overflow-x-auto space-x-4 bg-[#F9FAFB] dark:bg-gray-800 p-1 rounded-10 scrollbar-hide md:space-x-8 transition-colors duration-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap text-sm md:text-base py-[0.625rem] px-6 transition-colors duration-200 ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-700 text-[#F7931D] dark:text-orange-400 font-semibold rounded-lg shadow-sm font-archivo"
                      : "border-transparent font-medium text-[#667085] dark:text-gray-400 hover:border-gray-300 dark:hover:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap flex-row gap-4 md:space-x-4 md:space-y-0 items-start md:items-center">
              {activeTab === t.recent && (
                <div className="flex justify-between w-full items-center gap-1">
                  {selectedMessage !== null && (
                    <Button
                      variant={"outlined"}
                      onClick={() => setSelectedMessage(undefined)}
                      className="flex lg:hidden items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      aria-label={t.back}
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {t.back}
                      </span>
                    </Button>
                  )}
                  <button
                    className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-3 md:px-6 py-2 rounded-lg font-medium text-xs md:text-sm transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                    onClick={() => setShowNewMessageModal(true)}
                  >
                    {t.createNewMessage}
                  </button>
                </div>
              )}

              {activeTab === t.groups && (
                <div className="flex justify-between w-full items-center gap-1">
                  {selectedGroup !== null && (
                    <Button
                      variant={"outlined"}
                      onClick={() => setSelectedGroup(null)}
                      className="flex lg:hidden items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      aria-label={t.back}
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {t.back}
                      </span>
                    </Button>
                  )}
                  <button
                    className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-3 md:px-6 py-2 rounded-lg font-medium text-xs md:text-sm transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                    onClick={() => setShowAddGroupMemberModal(true)}
                  >
                    {t.createNewGroup}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === t.recent && (
          <RecentMessages
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
            recentChatList={recentChatList}
            isLoading={isLoading}
          />
        )}

        {activeTab === t.groups && (
          <GroupMessages
            selectedGroup={selectedGroup}
            setGroupList={setGroupList}
            setSelectedGroup={setSelectedGroup}
          />
        )}

        {/* Modals */}
        {showNewMessageModal && (
          <StartNewMessageModal
            isOpen={showNewMessageModal}
            onClose={() => setShowNewMessageModal(false)}
            onSelectMessage={(data) => setSelectedMessage(data)}
          />
        )}

        {showAddGroupMemberModal && (
          <AddNewGroupMembersModal
            isOpen={showAddGroupMemberModal}
            groupId={String(selectedGroup?.id)}
            onClose={() => setShowAddGroupMemberModal(false)}
            setShowCreateGroupChat={setShowCreateGroupChat}
            setSuggestedMembers={setSuggestedMembers}
            suggestedMembers={suggestedMembers}
          />
        )}

        {showCreateGroupChat && (
          <CreateGroupChatForm
            isOpen={showCreateGroupChat}
            setSuggestedMembers={setSuggestedMembers}
            onClose={() => setShowCreateGroupChat(false)}
            suggestedMembers={suggestedMembers}
            type="create"
            group={{} as groupChatResult}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
