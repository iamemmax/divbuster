"use client";
import { ErrorModal, LinkButton } from "@/components/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getTransactionStatus } from "./api/checkTransactionStatus";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { Spinner } from "@/icons/core";

//liberty-life.vercel.app/success?trxref=llf8db2425-3845-4d05-80e7-6339c6e7afd31723316951.9175694&reference=llf8db2425-3845-4d05-80e7-6339c6e7afd31723316951.9175694
const Page = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [errorMsg, setErrorMsg] = useState("");
  const reference = searchParams.get("reference");
  // getTransactionStatus;
  useEffect(() => {
    if (!reference) {
      openErrorModalWithMessage(String("invalid transaction reference"));
    }
  }, []);

  const queryClient = useQueryClient();
  const { data, isLoading: loadinGenerate } = useQuery({
    queryFn: () => getTransactionStatus(reference as string),
    queryKey: ["check-transaction-status", reference],
    enabled: !!reference,
    onSuccess: () => {
      // Invalidate user details query to refetch data
      queryClient.invalidateQueries(["transctions", reference]);
    },
    onError: (error) => {
      const errorMessage = formatAxiosErrorMessage(error as AxiosError);
      openErrorModalWithMessage(String(errorMessage));
    },
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#080D27] backdrop-blur-0">
      {loadinGenerate ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner color="#fff" />
        </div>
      ) : (
        <div className="overflow-hidden md:w-[26rem] rounded-[1.125rem] border-[0.01px] border-opacity-40 border-[#407BFF] ">
          <div className="bg-[#141B3f] w-full py-5 rounded-[1.125rem] ">
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
                  <p className="text-xl font-DMSans font-semibold text-[#fff]">
                    Application Successful
                  </p>
                </div>

                <div className="text-center px-[2rem] mt-[0.65rem]">
                  <p className="text-xs text-[#94a3b8] font-normal font-sans">
                    Your insurance application has been received and is being
                    processed. You will soon receive an insurance code for use
                    at clinics, pharmacies, or hospitals.
                  </p>
                </div>

                <div className="bg-[#272D4A] mt-[2.1875rem] w-full flex items-center justify-center">
                  <div className="">
                    <p className="text-[#fff] py-[1rem] text-xs font-medium font-sans">
                      Thank you for choosing Liberty Life.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center py-3 items-center gap-[1rem] mt-[1rem] text-sm">
                <LinkButton
                  href={"/"}
                  className="rounded-3xl font-normal border-[0.3px] text-[#fff] py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                >
                  Done
                </LinkButton>

                <LinkButton
                  href={`/login`}
                  className="rounded-3xl bg-[#fff] text-[#1B1687] py-[0.9rem] w-[10rem] shadow-lg font-normal transition-colors delay-150 ease-in-out focus:outline-none"
                >
                  Login
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          if (errorModalMessage) {
            router.push("/");
          } else {
            setErrorModalState(false);
          }
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default Page;
