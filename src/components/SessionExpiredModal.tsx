"use client";

import React from "react";
import { Dialog, DialogContent, DialogBody } from "@/components/core";
import { Button } from "@/components/core";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authentication";
import { tokenStorage } from "@/app/(auth)/utils";
import { deleteAxiosDefaultToken } from "@/lib/axios";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SessionExpiredModal({ isOpen, onClose }: SessionExpiredModalProps) {
  const router = useRouter();
  const { authDispatch } = useAuth();

  const handleLoginRedirect = () => {
    // Close the modal
    onClose();

    // Clear token from localStorage
    tokenStorage.clearToken();
    tokenStorage.clearAll();

    // Explicitly clear DIVBUSTER tokens
    localStorage.removeItem("DIVBUSTERTOKEN");
    localStorage.removeItem("DIVBUSTERTOKENS");
    localStorage.removeItem("DIVBUSTERSAVED_LOGIN_CREDENTIALS");

    // Remove token from axios headers
    deleteAxiosDefaultToken();

    // Logout the user
    if (authDispatch) {
      authDispatch({ type: "LOGOUT" });
    }

    // Redirect to login page
    router.push("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-lg">
        <DialogBody className="p-0 text-center">
          <div className="flex flex-col px-8 pb-6 pt-10 items-center justify-center rounded-xl bg-white dark:bg-gray-800 p-4">
            <div className="caution">
              <svg
                fill="none"
                height="80"
                viewBox="0 0 119 119"
                width="80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="58.8978"
                  cy="60.1009"
                  fill="#EF5448"
                  fillOpacity="0.2"
                  r="51.6869"
                />
                <circle
                  cx="59.5"
                  cy="59.5"
                  fill="#EF5448"
                  fillOpacity="0.1"
                  r="59.5"
                />
                <path
                  clipRule="evenodd"
                  d="M58.5 36C59.3284 36 60 36.6716 60 37.5V65.5C60 66.3284 59.3284 67 58.5 67C57.6716 67 57 66.3284 57 65.5V37.5C57 36.6716 57.6716 36 58.5 36Z"
                  fill="#FF3B3B"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M58.5 73C59.3284 73 60 73.6716 60 74.5V75.5C60 76.3284 59.3284 77 58.5 77C57.6716 77 57 76.3284 57 75.5V74.5C57 73.6716 57.6716 73 58.5 73Z"
                  fill="#FF3B3B"
                  fillRule="evenodd"
                />
              </svg>
            </div>

            <div className="mt-5 flex w-full flex-col items-center justify-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Session Expired
              </h1>
              <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300 max-w-[300px]">
                Your session has expired. Please click the button below to log in again.
              </p>
            </div>
            
            <Button 
              onClick={handleLoginRedirect}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white"
            >
              Log In Again
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}




