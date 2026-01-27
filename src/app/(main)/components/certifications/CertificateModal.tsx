"use client";
import React from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/core";
import CloseIcon from "@/app/icons/CloseIcon";
import moment from "moment";
import { selectedCardBg } from "../shared/CardContainer";
import CardHeadIcon from "@/app/icons/(dashboard)/CardHeadIcon";

interface Certificate {
  id: number;
  image?: string;
  created_on: string;
  issuer: string;
  certification_no: string;
  issuer_name: string;
  certificate_type?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
}

const CertificateModal = ({ isOpen, onClose, certificate }: Props) => {
  if (!certificate) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="!max-w-[500px] bg-white dark:bg-gray-900">
        <DialogBody className="w-full p-0 outline-none">
          <DialogHeader className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700 pb-4">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Certificate Details
            </DialogTitle>
            <DialogClose
              className="bg-transparent p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              <CloseIcon className="dark:text-white text-black" />
            </DialogClose>
          </DialogHeader>
          
          <div className="p-6">
            <div
              className="flex flex-col gap-4 rounded-[1.1944rem] px-[1.125rem] py-4 bg-cover bg-no-repeat"
              style={{
                backgroundImage: certificate.image ? `url(${certificate.image})` : undefined,
                backgroundColor: !certificate.image ? selectedCardBg(certificate.certificate_type || "")?.bg || "#F7931D" : undefined,
              }}
            >
              <div className="flex justify-between items-start">
                <p className="text-white text-base font-medium font-archivo">
                  Date Added: {moment(certificate.created_on).format("ll")}
                </p>
                <div className="h-[2.1437rem] mt-4 flex items-center justify-center w-[2.1437rem] border border-white rounded-full">
                  <CardHeadIcon />
                </div>
              </div>

              <div>
                <p className="text-white text-base font-medium font-archivo">
                  Issuer:
                </p>
                <p className="text-white text-base font-semibold font-archivo">
                  {certificate.issuer}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-[11.47px] font-medium font-archivo">
                    Diver No: {certificate.certification_no}
                  </p>
                  <p className="text-white text-xl font-semibold font-archivo">
                    {certificate.issuer_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;