import React from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
} from "@/components/core/DialogClone";
import Link from "next/link";
import { ReferralsuccessProp } from "./GenerateReferralModal";
import { Button, LinkButton } from "@/components/core";
import CopyIcon3 from "@/app/(dashboard)/comp/icons/CopyIcon3";
import { useClipboard } from "@/hooks";
interface prop {
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  showSuccessModal: boolean;
  referralResponse: ReferralsuccessProp | undefined;
}
const ReferralSuccessModal = ({
  setShowSuccessModal,
  showSuccessModal,
  referralResponse,
}: prop) => {
  const { copy } = useClipboard();

  return (
    <Dialog open={showSuccessModal}>
      <DialogContent className="!overflow-hidden md:w-[26rem] border-[0.01px] border-opacity-90 border-[#407BFF] ">
        <DialogBody className="bg-[#141B3f] w-full  ">
          <div className="py-1 pb-4">
            <div className="">
              <div className="flex items-center justify-center w-full">
                <svg
                  width="81"
                  height="81"
                  viewBox="0 0 81 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="80.32" height="80.32" rx="40.16" fill="#fff" />
                  <path
                    d="M43.872 56.137c-1.782 0-4.305-1.254-6.299-7.251l-1.088-3.263-3.263-1.088c-5.982-1.994-7.236-4.516-7.236-6.3 0-1.767 1.254-4.304 7.236-6.314l12.826-4.275c3.202-1.072 5.876-.755 7.523.876s1.964 4.32.891 7.523l-4.275 12.826c-2.01 6.012-4.532 7.266-6.315 7.266m-9.94-22.055c-4.2 1.404-5.695 3.066-5.695 4.154s1.496 2.75 5.695 4.14l3.807 1.268c.333.106.605.378.71.71l1.27 3.807c1.389 4.2 3.066 5.695 4.153 5.695 1.088 0 2.75-1.495 4.155-5.695l4.275-12.825c.77-2.327.634-4.23-.348-5.212s-2.885-1.103-5.196-.333z"
                    fill="#009A49"
                  />
                  <path
                    d="M37.663 45.215a1.12 1.12 0 0 1-.8-.332 1.14 1.14 0 0 1 0-1.602l5.408-5.423a1.14 1.14 0 0 1 1.601 0 1.14 1.14 0 0 1 0 1.602l-5.408 5.423a1.1 1.1 0 0 1-.8.332"
                    fill="#009A49"
                  />
                </svg>
              </div>

              <div className="flex justify-center items-center w-full mt-[1rem]">
                <p className="text-xl  'font-DMSans' font-semibold text-[#fff]">
                  Link Generated Successfully
                </p>
              </div>

              <div className="text-center px-[2rem] mt-[0.65rem] ">
                <p className="text-xs text-[#94a3b8] font-normal font-sans ">
                  You can now copy your referral link or code below and proceed
                  to share and earn.
                </p>
              </div>

              {/* <div className="bg-[#272D4A] mt-[2.1875rem] w-full flex items-center justify-center">
                <div className="">
                  <p className="text-[#fff] py-[1rem] text-xs font-medium font-sans ">
                    Thank you for choosing Liberty Life.
                  </p>
                </div>
              </div> */}
            </div>

            <div className="w-full flex justify-center items-center gap-[1rem] mt-[1rem] text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center flex-col gap-x-2 bg-[#21253d] px-4 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                  onClick={() =>
                    copy(
                      `https://www.libertylifeplus.com/?referral_code=${referralResponse?.referral_code}` ??
                        ""
                    )
                  }
                >
                  <p className="text-white text-xxs text-opacity-60">
                    Referral link
                  </p>
                  <div className="flex">
                    <p className="text-white max-w-[6.25rem] text-xxs truncate">
                      {`https://www.libertylifeplus.com/?referral_code=${referralResponse?.referral_code}`}
                    </p>
                    <Button className=" text-white px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                      <CopyIcon3 height={15} width={15} />
                    </Button>
                  </div>
                </div>

                <div
                  className="flex items-center justify-center flex-col gap-x-2 bg-[#21253d] px-6 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                  onClick={() => copy(referralResponse?.referral_code ?? "")}
                >
                  <p className="text-white text-xxs text-opacity-60">
                    Referral Code
                  </p>
                  <div className="flex">
                    <p className="text-white max-w-[3.25rem] text-xxs truncate">
                      {referralResponse?.referral_code ?? ""}
                    </p>
                    <Button className=" text-white px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                      <CopyIcon3 height={15} width={15} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-6 flex justify-center py-3 items-center gap-[1rem] mt-[1rem] text-base">
              <Link className="w-full" href={"/"}>
                <Button className="rounded-3xl w-full bg-white  border-[0.3px] font-bold text-[#000] py-[0.9rem]  shadow-lg transition-colors delay-150 ease-in-out focus:outline-none" onClick={()=>setShowSuccessModal(false)}>
                  Done
                </Button>
              </Link>
            </div>
          </div>
        </DialogBody>

      </DialogContent>
    </Dialog>
  );
};

export default ReferralSuccessModal;
