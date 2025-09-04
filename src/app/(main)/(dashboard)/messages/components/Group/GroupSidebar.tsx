import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search, MoreVertical, Archive, Trash2, PenIcon } from "lucide-react";
import {
  groupChatListProp,
  groupChatResult,
  Othermember,
} from "../../../api/chats/group/fetchGroupChatList";
import { useExistGroup } from "../../../api/chats/group/existGroup";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { ErrorModal } from "@/components/core";
import { ConfirmSaveModal } from "@/app/(main)/components/shared/modal/ConfirmSave";
import { UnsavedChangesModal } from "@/app/(main)/components/shared/modal/UnsavedChangeModal";
import { useAuth } from "@/contexts/authentication";
import { FetchPreviousPageOptions, InfiniteData, InfiniteQueryObserverResult, useQueryClient } from "react-query";
import moment from "moment";
import CreateGroupChatForm from "../modals/group/CreateGroupChat";

// Enhanced Sidebar Component
const GroupSidebar = ({
  groupList,
  selectedGroup,
  onSelectGroup,
  setGroupMembers,
  isLoadingGroup,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}: {
  // groupList: groupChatListProp | undefined;
  groupList: InfiniteData<groupChatListProp> | undefined
  selectedGroup: groupChatResult | null;
  onSelectGroup: (group: groupChatResult) => void;
  onDelete: (groupId: number) => void;
  onArchive: (groupId: number) => void;
  isLoadingGroup: boolean;
  setGroupMembers: React.Dispatch<
    React.SetStateAction<Othermember[] | undefined>
  >;
   fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchPreviousPage: (options?: FetchPreviousPageOptions | undefined) => Promise<InfiniteQueryObserverResult<groupChatListProp, unknown>>
   hasPreviousPage: boolean | undefined
  
  }) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [userIdToExist, setUserIdToExist] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showCreateGroupChat, setShowCreateGroupChat] = useState(false);
  const [suggestedMembers, setSuggestedMembers] = useState<Othermember[] | undefined>();

const [group, setGroup] = useState<groupChatResult>()
const loaderRef = useRef<HTMLDivElement | null>(null);
  // Close dropdown menu if clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);


  const handleObserver = useCallback(
  // IntersectionObserver for infinite scroll
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
  // Filter by group name, description, or member names
 const filteredGroupChats = React.useMemo(() => {
  if (!groupList?.pages) return [];

  const searchLower = searchQuery.toLowerCase();

  // Flatten all pages
  const allGroups = groupList.pages.flatMap((page) => page.results);

  return allGroups.filter((group) => {
    // Search in group name and description
    if (group.group?.name?.toLowerCase().includes(searchLower)) return true;
    if (group.group?.description?.toLowerCase().includes(searchLower)) return true;

    // Search in other members' names
    if (
      group.other_members?.some(
        (member) =>
          member.first_name?.toLowerCase().includes(searchLower) ||
          member.last_name?.toLowerCase().includes(searchLower) ||
          member.email?.toLowerCase().includes(searchLower)
      )
    )
      return true;

    // Search in current user's details
    if (group.user?.first_name?.toLowerCase().includes(searchLower)) return true;
    if (group.user?.last_name?.toLowerCase().includes(searchLower)) return true;
    if (group.user?.username?.toLowerCase().includes(searchLower)) return true;

    return false;
  });
}, [groupList, searchQuery]);

  const handleMenuToggle = (groupId: number) => {
    setOpenMenuId(openMenuId === groupId ? null : groupId);
  };

  // Get group avatar - use group image or generate placeholder
  const getAvatarUrl = (group: groupChatResult): string => {
    if (group.group?.image) {
      return group.group.image;
    } else {
      const groupName = group.group?.name || "Group";
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(groupName)}&background=f97316&color=ffffff&size=40`;
    }
    // Generate placeholder avatar with group name
  };

  // Get member count including current user
  const getMemberCount = (group: groupChatResult): number => {
    return (group.other_members?.length || 0) + 1; // +1 for current user
  };

  // Get formatted member list for preview
  const getMemberPreview = (group: groupChatResult): string => {
    if (!group.other_members || group.other_members.length === 0) {
      return "Only you";
    }

    const memberNames = group.other_members
      .slice(0, 2) // Show only first 2 members
      .map((member) => member.first_name || member.email.split("@")[0])
      .join(", ");

    const remainingCount = group.other_members.length - 2;
    if (remainingCount > 0) {
      return `${memberNames} +${remainingCount} more`;
    }

    return memberNames;
  };

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // Less than a week
      return date.toLocaleDateString([], {
        weekday: "short",
      });
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };
  const queryClient = useQueryClient();

  const { mutate: handleExistGroup, isLoading } = useExistGroup();
  const handleExist = () => {
    handleExistGroup(
      {
        id: String(userIdToExist),
      },
      {
        onSuccess: () => {
          setShowConfirmSaveModal(false);
          queryClient.invalidateQueries({ queryKey: ["Group-chat-list"] });
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm px-8 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Group Chats
            </h2>
            <span className="bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xs font-medium px-2 py-1 rounded-full">
         {groupList?.pages?.reduce((acc, page) => acc + page.results.length, 0) ?? 0}

            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-2">
          <label htmlFor="group-search" className="sr-only">
            Search groups or members
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              id="group-search"
              type="text"
              placeholder="Search groups or members"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Group Chats List */}
    {/* Group Chats List */}
      <div className="flex-1 max-h-[66vh] md:max-h-[65vh] overflow-y-auto mt-4">
        {isLoadingGroup ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : !filteredGroupChats.length ? (
          <p className="text-center text-gray-400 dark:text-gray-500 mt-8">
            {searchQuery
              ? "No groups found matching your search."
              : "No group chats found."}
          </p>
        ) : (
          <>
            {filteredGroupChats.map((group, idx: number) => {
              const isSelected = selectedGroup?.id === group.id;

              return (
                <div
                  key={group.id}
                  className={`flex items-start py-4 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-orange-50 dark:bg-orange-900/30 border-orange-500 border-l-2"
                      : "border-b border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => {
                    onSelectGroup(group);
                    setGroupMembers(group?.other_members);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onSelectGroup(group);
                    }
                  }}
                >
                  {/* Admin indicator */}
                  <div className="flex flex-col items-center justify-center mt-1 mr-3 flex-shrink-0">
                    {group.is_admin && (
                      <div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        title="You are admin of this group"
                      ></div>
                    )}
                  </div>

                  {/* Group Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={getAvatarUrl(group)}
                      alt={group.group?.name || "Group"}
                      title={group.group?.name || "Group"}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(group.group?.name || "Group")}&background=f97316&color=ffffff&size=48`;
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {/* Group name */}
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {group.group?.name || "Unnamed Group"}
                        </p>

                        {/* Group description or member preview */}
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                          {group.group?.description ? (
                            <span title={group.group.description}>
                              {group.group.description}
                            </span>
                          ) : (
                            <span title={`Members: ${getMemberPreview(group)}`}>
                              {getMemberPreview(group)}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 ml-2">
                        {/* Joined date */}
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {moment(group.group?.created_on).format("ll")}
                        </span>

                        {/* Three-dot menu */}
                        <div
                          className="relative"
                          ref={openMenuId === group.id ? menuRef : null}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMenuToggle(group.id);
                            }}
                            aria-haspopup="true"
                            aria-expanded={openMenuId === group.id}
                            aria-controls={`menu-${group.id}`}
                            aria-label="Open options menu"
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>

                          {/* Dropdown menu */}
                          {openMenuId === group.id && (
                            <div
                              id={`menu-${group.id}`}
                              className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                              role="menu"
                              aria-orientation="vertical"
                            >
                              <div className="py-1">
                                {group?.is_admin && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSuggestedMembers(group?.other_members)
                                      setShowCreateGroupChat(true)
                                      setGroup(group)
                                      setOpenMenuId(null);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    role="menuitem"
                                  >
                                    <PenIcon className="h-4 w-4 mr-2 text-yellow-600" />
                                    Edit Group
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUserIdToExist(String(group?.group?.id));
                                    setShowConfirmSaveModal(true);
                                    setOpenMenuId(null);
                                  }}
                                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors"
                                  role="menuitem"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Exit Group
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Infinite scroll loader */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
              </div>
            )}

            {/* Intersection observer target for infinite scroll */}
            <div ref={loaderRef} className="h-4" />
          </>
        )}
      </div>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      />
      {showConfirmSaveModal && (
        <UnsavedChangesModal
          isOpen={showConfirmSaveModal}
          onClose={() => setShowConfirmSaveModal(false)}
          onDiscard={() => setShowConfirmSaveModal(false)}
          onSave={handleExist}
          hideSaveButton={false}
          title="Exist Group"
          description="Are you sure you want to exist this group"
          loading={isLoading}
        />
      )}
       {showCreateGroupChat && (
                <CreateGroupChatForm
                  isOpen={showCreateGroupChat}
                  // groupId={String(selectedGroup?.id)}
                  onClose={() => setShowCreateGroupChat(false)}
                  suggestedMembers={suggestedMembers}
                  setSuggestedMembers={setSuggestedMembers}
                  group={group}
                  type="update"
                />
              )}
    </div>
  );
};

export default GroupSidebar;
