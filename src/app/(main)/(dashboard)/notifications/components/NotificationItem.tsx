// import * as React from "react";
// import Image from "next/image";

// export interface NotificationItemProps {
//   avatar: string;
//   name: string;
//   time?: string;
//   action: string;
//   isOnline?: boolean;
//   isLast?: boolean; // To stop the line at the last item
// }

// export const NotificationItem: React.FC<NotificationItemProps> = ({
//   avatar,
//   name,
//   time,
//   action,
//   isOnline = false,
//   isLast = false,
// }) => {
//   return (
//     <div className="relative flex gap-3 pb-6">
//       {/* Timeline Line - positioned to connect avatars */}
//       {!isLast && (
//         <div 
//           className="absolute left-[20px] top-[40px] w-[2px] bg-gray-200 dark:bg-gray-700" 
//           style={{height: 'calc(100% - 40px)'}} 
//         />
//       )}

//       {/* Avatar Container */}
//       <div className="relative z-10 flex-shrink-0">
//         <Image
//           src={avatar}
//           alt={name}
//           width={40}
//           height={40}
//           className="rounded-full object-cover"
//         />
//         {/* Online Status Indicator */}
//         {isOnline && (
//           <div className="absolute bottom-2 -right-0.5 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
//         )}
//       </div>

//       {/* Content */}
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-1">
//           <span className="font-semibold text-gray-900 dark:text-white text-sm">{name}</span>
//           {time && (
//             <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
//           )}
//         </div>
//         <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{action}</p>
//       </div>
//     </div>
//   );
// };

import * as React from "react";
import Image from "next/image";
import moment from "moment";
import { useLanguage } from "@/hooks/useLanguage";
import { notificationTranslations } from "@/app/(main)/translation/notificationTranslation";

export interface NotificationItemProps {
  id?: string;
  avatar: string;
  name: string;
  time?: string;
  action: string;
  isOnline?: boolean;
  isLast?: boolean; // To stop the line at the last item
  // Button visibility controls
  showAcceptBtn?: boolean;
  showDeclineBtn?: boolean;
  showModifyBtn?: boolean;
  // Button functions
  onAccept?: (id?: string) => void;
  onDecline?: (id?: string) => void;
  onModify?: (id?: string) => void;
  // Loading states
  acceptLoading?: boolean;
  declineLoading?: boolean;
  modifyLoading?: boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  avatar,
  name,
  time,
  action,
  isOnline = false,
  isLast = false,
  showAcceptBtn = false,
  showDeclineBtn = false,
  showModifyBtn = false,
  onAccept,
  onDecline,
  onModify,
  acceptLoading = false,
  declineLoading = false,
  modifyLoading = false,
}) => {
  const { language } = useLanguage();
  const t = notificationTranslations[language] || notificationTranslations.en;
  const handleAccept = () => {
    if (onAccept) onAccept(id);
  };
  

  const handleDecline = () => {
    if (onDecline) onDecline(id);
  };

  const handleModify = () => {
    if (onModify) onModify(id);
  };

  const hasButtons = showAcceptBtn || showDeclineBtn || showModifyBtn;

  return (
    <div className="relative flex gap-3 pb-6">
      {/* Timeline Line - positioned to connect avatars */}
      {!isLast && (
        <div 
          className="absolute left-[20px] top-[40px] w-[2px] bg-gray-200 dark:bg-gray-700" 
          style={{height: 'calc(100% - 40px)'}} 
        />
      )}

      {/* Avatar Container */}
      <div className="relative z-10 flex-shrink-0">
        <Image
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className="rounded-full shrink-0 object-cover"
        />
        {/* Online Status Indicator */}
        {isOnline && (
          <div className={`absolute ${hasButtons?"top-6":"bottom-2"}  -right-0.5 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800`} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 dark:text-white text-sm">{name}</span>
          {time && (
            <span className="text-xs text-gray-500 dark:text-gray-400">{moment(time)?.fromNow()}</span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{action}</p>

        {/* Action Buttons */}
        {hasButtons && (
          <div className="flex items-center gap-2 mt-3">
            {showAcceptBtn && (
              <button
                onClick={handleAccept}
                disabled={acceptLoading}
                className="px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {acceptLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {t.addBuddy}
              </button>
            )}

            {showDeclineBtn && (
              <button
                onClick={handleDecline}
                disabled={declineLoading}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {declineLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {t.decline}
              </button>
            )}

            {showModifyBtn && (
              <button
                onClick={handleModify}
                disabled={modifyLoading}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {modifyLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {t.modify}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};