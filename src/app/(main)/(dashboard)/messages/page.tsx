"use client";
import React, { useState } from "react";
import Header from "../../components/shared/Header";
import { Calendar } from "lucide-react";
import RecentMessages, { messageProp } from "./components/RecentMessages";
import GroupMessages, { GroupChat } from "./components/GroupMessages";
import AchiveMessages from "./components/AchiveMessages";
import StartNewMessageModal from "./components/modals/StartNewMessageModal";
import { groupChats, messagesArray } from "./components/mocks";
import StartNewGroupMessageModal from "./components/modals/group/StartNewGroupMessageModal";
import AddNewGroupMembersModal, { members } from "./components/modals/group/AddGroupMembers";
import CreateGroupChatForm from "./components/modals/group/CreateGroupChat";

const Messages = () => {
  const [activeTab, setActiveTab] = useState("Recent");
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [messages, setMessages] = useState<messageProp[]>(messagesArray);
  const [selectedMessage, setSelectedMessage] = useState<messageProp>();
  const [groupList, setGroupList] = useState<GroupChat[]>(groupChats);
  const [selectedGroup, setSelectedGroup] = useState<GroupChat | null>(null);
  const [showAddNewGroupModal, setShowAddNewGroupModal] = useState(false)
    const [showAddGroupMemberModal, setShowAddGroupMemberModal] = useState(false)
    const [showCreateGroupChat, setShowCreateGroupChat] = useState(false)
     const [suggestedMembers, setSuggestedMembers] = useState<members[]>([]);
  const tabs = ["Recent", "Groups"];

  return (
    <div>
      <div className="">
        <Header title="Messages" subtitle="" />
      </div>
      <div className=""></div>
      <div className="w-full bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
            {/* Left side - Navigation tabs */}
            <div className="flex overflow-x-auto space-x-4 bg-[#F9FAFB] p-1 rounded-10 scrollbar-hide md:space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap text-sm md:text-base py-[0.625rem] px-6 transition-colors duration-200 ${
                    activeTab === tab
                      ? "bg-white text-[#F7931D] font-semibold rounded-lg shadow-sm font-archivo"
                      : "border-transparent font-medium text-[#667085] hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Right side - Date picker and Create button */}
            <div className="flex flex-wrap flex-row gap-4 md:space-x-4 md:space-y-0 items-start md:items-center">
              {/* Date Range Picker */}
              <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200 md:min-w-[220px]">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-xs md:text-sm text-gray-700 font-medium font-archivo whitespace-nowrap">
                  Jan 6, 2022 – Jan 13, 2022
                </span>
              </div>

              {/* Create New Message Button */}
              {activeTab === "Recent" && (
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-6 py-2 rounded-lg font-medium text-xs md:text-sm transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                  onClick={() => setShowNewMessageModal(true)}
                >
                  Create New Message
                </button>
              )}
              {activeTab === "Groups" && (
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-6 py-2 rounded-lg font-medium text-xs md:text-sm transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                onClick={()=>setShowAddNewGroupModal(true)}
                >
                  Create New Group
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Render active tab content */}
        {activeTab === "Recent" && (
          <RecentMessages
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
            messages={messages}
          />
        )}
        {activeTab === "Groups" && (
          <GroupMessages
            groupList={groupList}
            selectedGroup={selectedGroup}
            setGroupList={setGroupList}
            setSelectedGroup={setSelectedGroup}
          />
        )}
        {/* {activeTab === "Archive" && <AchiveMessages />} */}

        {showNewMessageModal && (
          <StartNewMessageModal
            isOpen={showNewMessageModal}
            onClose={() => setShowNewMessageModal(false)}
            onSelectMessage={(data) => setSelectedMessage(data)}
          />
        )}

          { showAddNewGroupModal && <StartNewGroupMessageModal
        isOpen={showAddNewGroupModal}
        onClose={()=>{
          setShowAddNewGroupModal(false)

        }}
        onSelectMessage={(data)=>{
          setSelectedGroup(data)
          setShowAddGroupMemberModal(true)
        }}
        
        />
      }
      {
        showAddGroupMemberModal && <AddNewGroupMembersModal
        isOpen={showAddGroupMemberModal}
        groupId={String(selectedGroup?.id)}
        onClose={()=>setShowAddGroupMemberModal(false)}
        setShowCreateGroupChat={setShowCreateGroupChat}
        setSuggestedMembers={setSuggestedMembers}
        suggestedMembers={suggestedMembers}
        
        />
      }
      {
        showCreateGroupChat && <CreateGroupChatForm
        isOpen={showCreateGroupChat}
        groupId={String(selectedGroup?.id)}
        onClose={()=>setShowCreateGroupChat(false)}
         suggestedMembers={suggestedMembers}
        
        />
      }
      </div>
    </div>
  );
};

export default Messages;
