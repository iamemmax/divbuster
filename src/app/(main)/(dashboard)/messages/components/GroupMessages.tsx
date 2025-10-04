import React, { useState } from "react";

import GroupSidebar from "./Group/GroupSidebar";
import GroupMessageBox from "./Group/GroupMessageBox";
import {
  groupChatListProp,
  groupChatResult,
  Othermember,
  useFetchGroupChatList,
} from "../../api/chats/group/fetchGroupChatList";

interface prop {
  // groupList: groupChatListProp | undefined;
  setSelectedGroup: React.Dispatch<
    React.SetStateAction<groupChatResult | null>
  >;
  selectedGroup: groupChatResult | null;
  setGroupList: React.Dispatch<
    React.SetStateAction<groupChatResult[] | undefined>
  >;
  // isLoadingGroup: boolean;
}

// Main Component
const GroupMessages = ({
  // groupList,
  selectedGroup,
  setGroupList,
  setSelectedGroup,
  // isLoadingGroup,
}: prop) => {
  const {
    data: groupChatList,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isLoading: isLoadingGroup,
  } = useFetchGroupChatList();
  const [groupMembers, setGroupMembers] = useState<Othermember[]>();

  const handleDeleteGroup = (groupId: number) => {
    setGroupList((prevGroups) =>
      prevGroups?.filter((group) => group.id !== groupId)
    );
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null);
    }
  };

  const handleArchiveGroup = (groupId: number) => {
    setGroupList((prevGroups) =>
      prevGroups?.filter((group) => group.id !== groupId)
    );
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null);
    }
  };

  const handleSelectGroup = (group: groupChatResult) => {
    setSelectedGroup(group);
    // Mark as read when selected
    setGroupList((prevGroups) =>
      prevGroups?.map((g) =>
        g.id === group.id ? { ...g, hasUnreadMessages: false } : g
      )
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-[79vh] overflow-y-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden h-full">
        {!selectedGroup ? (
          <div className="h-full bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">

          <GroupSidebar
            isLoadingGroup={isLoadingGroup}
            groupList={groupChatList}
            selectedGroup={selectedGroup}
            onSelectGroup={handleSelectGroup}
            onDelete={handleDeleteGroup}
            onArchive={handleArchiveGroup}
            setGroupMembers={setGroupMembers}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchPreviousPage={fetchPreviousPage}
            hasPreviousPage={hasPreviousPage}
          />
          </div>
        ) : (
          <div className="h-full relative  bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
            <div className="h-[75vh]">
              <GroupMessageBox
                selectedGroup={selectedGroup}
                // onSendMessage={handleSendMessage}
                groupMembers={groupMembers}
                setGroupMembers={setGroupMembers}
              />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-[1fr_1.8fr] gap-4 h-full">
         <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">

        <GroupSidebar
          groupList={groupChatList}
          selectedGroup={selectedGroup}
          onSelectGroup={handleSelectGroup}
          onDelete={handleDeleteGroup}
          onArchive={handleArchiveGroup}
          isLoadingGroup={isLoadingGroup}
          setGroupMembers={setGroupMembers}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchPreviousPage={fetchPreviousPage}
          hasPreviousPage={hasPreviousPage}
        />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <GroupMessageBox
          selectedGroup={selectedGroup}
          // onSendMessage={handleSendMessage}

          groupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
        />
      </div>

        </div>
    </div>
  );
};

export default GroupMessages;
