// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import * as React from "react";

// import { cn } from "@/utils/classNames";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/core";
// // import IndividualModal from '@/app/(main)/misc/components/modals/IndividualPlanModal';
// import { useBooleanStateControl } from "@/hooks";
// import RemitalPlanModal from "@/app/(main)/misc/components/insurance/modals/remital/RemitalPlanModal";

// interface DesktopMenuLinkProps {
//   link: string;
//   text: string;
//   disabled: boolean;
//   isExternal: boolean;
//   className?: string;
//   isDropdown?: boolean;
//   dropdownMenu?: {
//     text: string;
//     link?: string;

//     action?: () => void;
//   }[];
// }

// export function DesktopMenuLink({
//   text,
//   link,
//   disabled,
//   isExternal,
//   className,
//   isDropdown,
//   dropdownMenu,
// }: DesktopMenuLinkProps) {
//   const pathname = usePathname();
//   const isSelected = pathname === link;

//   if (isExternal) {
//     return (
//       <a
//         className={cn(
//           "inline-block px-3 py-2.5 text-sm min-w-max text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base, className"
//         )}
//         href={link}
//         rel="noopener noreferrer"
//         target="_blank"
//       >
//         {text}
//       </a>
//     );
//   }

//   return disabled ? (
//     <>
//       {text === "Plan" && (
//         <button
//           className={cn(
//             "inline-block cursor-not-allowed px-3 py-2.5 text-sm min-w-max text-white opacity-50 xl:px-6 xl:py-[1.375rem] xl:text-base",
//             isSelected && "font-bold",
//             className
//           )}
//           disabled
//         >
//           {text}
//         </button>
//       )}
//     </>
//   ) : isDropdown ? (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         className={cn(
//           "flex gap-2  px-3 py-2.5 text-sm text-white transition-all min-w-max duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base",
//           isSelected && "font-bold",
//           className
//         )}
//       >
//         {text}
//         <div className="mt-1">
//           <svg
//             width="10"
//             height="7"
//             viewBox="0 0 10 7"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M8.825.158 5 3.975 1.175.158 0 1.333l5 5 5-5z"
//               fill="#fff"
//             />
//           </svg>
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         {dropdownMenu?.map((menu) => (
//           <DropdownMenuItem className="text-[#1B1687]">
//             <p onClick={menu.action}>{menu.text}</p>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   ) : (
//     <Link
//       className={cn(
//         "inline-block px-3 py-2.5 text-sm text-white transition-all min-w-max duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base",
//         isSelected && "font-bold",
//         className
//       )}
//       href={link}
//     >
//       {text}
//     </Link>
//   );
// }

// export const linkGroups = [
//   {
//     link: "/",
//     text: "Home",
//     icon: undefined,
//     disabled: false,
//     isExternal: false,
//   },
//   {
//     link: "/plan",
//     text: "Plan",
//     icon: undefined,
//     disabled: false,
//     isExternal: false,
//     isDropdown: false,

//     // dropdownMenu: [
//     //   {
//     //     text: "Individual Plan",
//     //     link: "/IndividualPlanModal",
//     //     action: () => {},
//     //   },
//     //   {
//     //     text: "Family Plan",
//     //     link: "/IndividualPlanModal",
//     //   },
//     // ],
//   },
//   {
//     link: "/hospital-around",
//     text: "Hospitals around",
//     icon: undefined,
//     disabled: false,
//     isExternal: false,
//   },
//   {
//     link: "/about-us",
//     text: "About us",
//     icon: undefined,
//     disabled: false,
//     isExternal: false,
//   },
//   {
//     link: "/faqs",
//     text: "FAQs",
//     icon: undefined,
//     disabled: false,
//     isExternal: false,
//   },

//   {
//     link: "/contact-us",
//     text: "Contact us",
//     icon: undefined,
//     disabled: false,
//     isExternal: false,
//   },
// ];

// interface DesktopMenuBarProps {
//   isColored: boolean;
// }

// export function DesktopMenuBar({ isColored }: DesktopMenuBarProps) {
//   const { state: isIndividualModalOpen, setTrue: openIndividualModal } =
//     useBooleanStateControl();
//   const linkGroups = [
//     {
//       link: "/",
//       text: "Home",
//       icon: undefined,
//       disabled: false,
//       isExternal: false,
//     },
//     {
//       link: "/plan",
//       text: "Plan",
//       icon: undefined,
//       disabled: false,
//       isExternal: false,
//       isDropdown: false,
//       // dropdownMenu: [
//       //   {
//       //     text: "Individual Plan",
//       //     link: "/IndividualPlanModal",
//       //     action: openIndividualModal,
//       //   },
//       //   {
//       //     text: "Family Plan",
//       //     link: "/IndividualPlanModal",
//       //     // action: () => void,
//       //   },
//       // ],
//     },
//     {
//       link: "/hospital-around",
//       text: "Hospitals around",
//       icon: undefined,
//       disabled: false,
//       isExternal: false,
//     },
//     {
//       link: "/about-us",
//       text: "About us",
//       icon: undefined,
//       disabled: false,
//       isExternal: false,
//     },
//     {
//       link: "/faqs",
//       text: "FAQs",
//       icon: undefined,
//       disabled: false,
//       isExternal: false,
//     },

//     {
//       link: "/contact-us",
//       text: "Contact us",
//       icon: undefined,
//       disabled: false,
//       isExternal: false,
//     },
//   ];

//   return (
//     <nav className="hidden md:block">
//       <ul
//         className={cn(
//           "flex  font-display items-center text-sm gap-x-px transition-all duration-300 ease-in-out",
//           isColored && "bg-transparent"
//         )}
//       >
//         {linkGroups.map(({ link, text, disabled, isExternal, isDropdown }) => {
//           return (
//             <li key={link}>
//               <DesktopMenuLink
//                 disabled={disabled}
//                 isExternal={isExternal}
//                 link={link}
//                 text={text}
//                 className="!text-xs"
//                 isDropdown={isDropdown}
//                 // dropdownMenu={dropdownMenu}
//               />
//             </li>
//           );
//         })}
//       </ul>

//       {openIndividualModal && (
//         <RemitalPlanModal
//           userId=""
//           openRemitalPlan={isIndividualModalOpen}
//           setOpenShowRemitalPlan={openIndividualModal}
//         />
//       )}
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

import { cn } from "@/utils/classNames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/core";
import { useBooleanStateControl } from "@/hooks";
import RemitalPlanModal from "@/app/(main)/misc/components/insurance/modals/remital/RemitalPlanModal";
import ReferralModalPlan from "@/app/(main)/misc/components/insurance/modals/referral/ReferralPlan";
import AddRemitalPhoneNumer from "@/app/(main)/misc/components/insurance/modals/referral/AddReferralPhoneNumber";
import ReferralPlanPayment from "@/app/(main)/misc/components/insurance/modals/referral/RefeerralPayment";
import CreateReferralPasswordModal from "@/app/(main)/misc/components/insurance/modals/referral/CreateReferralPassword";

interface DesktopMenuLinkProps {
  link: string;
  text: string;
  disabled: boolean;
  isExternal: boolean;
  className?: string;
  isDropdown?: boolean;
  dropdownMenu?: {
    text: string;
    link?: string;
    action?: () => void;
  }[];
}

export function DesktopMenuLink({
  text,
  link,
  disabled,
  isExternal,
  className,
  isDropdown,
  dropdownMenu,
}: DesktopMenuLinkProps) {
  const pathname = usePathname();
  const isSelected = pathname === link;
  // const { state: isIndividualModalOpen, setTrue: openIndividualModal } =
  //   useBooleanStateControl();
  const [openReferralModal, setOpenReferralModal] = React.useState(false);
  const [openReferralPhonNumber, setOpenReferralPhonNumber] =
    React.useState(false);
  const [showReferralPayment, setShowReferralPayment] = React.useState(false);
  const [showReferralPasswordModal, setShowReferralPasswordModal] =
    React.useState(false);

  const search = useSearchParams();
  const getStarted = search.get("referral_code");
  React.useEffect(() => {
    if (getStarted) {
      document.getElementById("get-referral-button")?.click();
    }
  }, [getStarted]);
  if (isExternal) {
    return (
      <a
        className={cn(
          "inline-block px-3 py-2.5 text-sm min-w-max text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base",
          className
        )}
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {text}
      </a>
    );
  }

  if (text === "Plan") {
    return (
      <>
        <button
          className={cn(
            "inline-block px-3 py-2.5 text-sm text-white transition-all min-w-max duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base",
            isSelected && "font-bold",
            className
          )}
          onClick={() => setOpenReferralModal(true)}
          id="get-referral-button"
        >
          {text}
        </button>
        {openReferralModal && (
          <ReferralModalPlan
            userId=""
            openRemitalPlan={openReferralModal}
            setOpenShowRemitalPlan={setOpenReferralModal}
            setOpenCheckPhoneNumberModal={setOpenReferralPhonNumber}
          />
        )}
        {openReferralPhonNumber && (
          <AddRemitalPhoneNumer
            openCheckPhoneNumberModal={openReferralPhonNumber}
            setOpenCheckPhoneNumberModal={setOpenReferralPhonNumber}
            setShowReferralPayment={setShowReferralPayment}
          />
        )}

        {showReferralPayment && (
          <ReferralPlanPayment
            showReferralPayment={showReferralPayment}
            setShowReferralPayment={setShowReferralPayment}
            setShowReferralPasswordModal={setShowReferralPasswordModal}
            // setShowPaymentModal={}
            // planType={"Family"}
            PaymentInfo={{
              account_name: "Emmanue Ayodeji",
              account_no: "0094145219",
              amount: 5000,
              bank_name: "Access",
              paystack_link: "kink",
              // "user:": { address: "", email: "", first_name: "" },
            }}
          />
        )}
        {showReferralPasswordModal && (
          <CreateReferralPasswordModal
            showPasswordModal={showReferralPasswordModal}
            setShowPasswordModal={setShowReferralPasswordModal}
            // setOpenShowRemitalPlan={}
          />
        )}
      </>
    );
  }

  return disabled ? (
    <>
      <button
        className={cn(
          "inline-block cursor-not-allowed px-3 py-2.5 text-sm min-w-max text-white opacity-50 xl:px-6 xl:py-[1.375rem] xl:text-base",
          isSelected && "font-bold",
          className
        )}
        disabled
      >
        {text}
      </button>
    </>
  ) : isDropdown ? (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex gap-2 px-3 py-2.5 text-sm text-white transition-all min-w-max duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base",
          isSelected && "font-bold",
          className
        )}
      >
        {text}
        <div className="mt-1">
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.825.158 5 3.975 1.175.158 0 1.333l5 5 5-5z"
              fill="#fff"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownMenu?.map((menu) => (
          <DropdownMenuItem className="text-[#1B1687]">
            <p onClick={menu.action}>{menu.text}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      className={cn(
        "inline-block px-3 py-2.5 text-sm text-white transition-all min-w-max duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base",
        isSelected && "font-bold",
        className
      )}
      href={link}
    >
      {text}
    </Link>
  );
}

export const linkGroups = [
  {
    link: "/",
    text: "Home",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: "/plan",
    text: "Plan",
    icon: undefined,
    disabled: false,
    isExternal: false,
    isDropdown: false,
  },
  {
    link: "/hospital-around",
    text: "Hospitals around",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: "/about-us",
    text: "About us",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: "/faqs",
    text: "FAQs",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: "/contact-us",
    text: "Contact us",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
];

interface DesktopMenuBarProps {
  isColored: boolean;
}

export function DesktopMenuBar({ isColored }: DesktopMenuBarProps) {
  const linkGroups = [
    {
      link: "/",
      text: "Home",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: "/plan",
      text: "Plan",
      icon: undefined,
      disabled: false,
      isExternal: false,
      isDropdown: false,
    },
    {
      link: "/hospital-around",
      text: "Hospitals around",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: "/about-us",
      text: "About us",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: "/faqs",
      text: "FAQs",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: "/contact-us",
      text: "Contact us",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
  ];

  return (
    <nav className="hidden md:block">
      <ul
        className={cn(
          "flex font-display items-center text-sm gap-x-px transition-all duration-300 ease-in-out",
          isColored && "bg-transparent"
        )}
      >
        {linkGroups.map(({ link, text, disabled, isExternal, isDropdown }) => (
          <li key={link}>
            <DesktopMenuLink
              disabled={disabled}
              isExternal={isExternal}
              link={link}
              text={text}
              className="!text-xs"
              isDropdown={isDropdown}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
