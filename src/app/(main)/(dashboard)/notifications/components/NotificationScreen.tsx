"use client"
import React, { useEffect, useMemo } from "react";
import { NotificationItem } from "./NotificationItem";
import { useFetchUserNotification } from "../../api/notification/userNotification";
import { SmallSpinner } from "@/icons/core";

const NotificationList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useFetchUserNotification();

  // Flatten all pages' results into one array
  const allNotifications = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 && // near bottom
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Split notifications into two columns
  const leftColumnNotifications = allNotifications.filter(
    (_, index) => index % 2 === 0
  );
  const rightColumnNotifications = allNotifications.filter(
    (_, index) => index % 2 === 1
  );


  return (
    <>
   {isLoading?<div className="flex justify-center items-center py-6"><SmallSpinner/></div>: <div className="grid grid-cols-1 gap-8 py-3 bg-white dark:bg-transparent">
      {/* Left Column */}
      <div className="space-y-1">
        {leftColumnNotifications.map((notification, index) => (
          <NotificationItem
            id={String(notification.id)}
            key={notification.id}
           avatar={notification.sender?.profile_picture?notification.sender?.profile_picture : "/images/profile.png"}
            notification_type={notification?.notification_type}
            name={notification.sender_name ?? "Unknown"}
            time={notification.created_on}
            action={notification.body}
            isOnline={true} // adjust if your API provides online status
            isLast={index === leftColumnNotifications.length - 1}
          />
        ))}
      </div>

      {/* Right Column
      <div className="space-y-1">
        {rightColumnNotifications.map((notification, index) => (
          <NotificationItem
            id={String(notification.id)}
            key={notification.id}
            avatar={notification.sender?.profile_picture?notification.sender?.profile_picture : "/images/profile.png"}
            name={notification.sender?.name ?? "Unknown"}
            time={notification.created_on}
            action={notification.body}
            isOnline={true}
            isLast={index === rightColumnNotifications.length - 1}
          />
        ))} */}
      {/* </div> */}
    </div>}
    </>
  );
};

export default NotificationList;
