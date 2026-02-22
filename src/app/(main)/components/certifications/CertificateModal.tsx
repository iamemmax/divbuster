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
import Image from "next/image";

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

  const cardStyle = selectedCardBg(certificate.certificate_type || "");
  const bgColor = cardStyle?.bg || "#1B3A5C";
  const textColor = cardStyle?.text || "#E8F0F7";

  return (
    <Dialog open={isOpen}>
      <DialogContent className="!max-w-[480px] bg-white dark:bg-[#111318] border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl">
        <DialogBody className="w-full p-0 outline-none">

          {/* Header */}
          <DialogHeader className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
            <DialogTitle className="text-[15px] font-semibold tracking-wide uppercase text-gray-400 dark:text-gray-500 font-mono">
              Certificate Details
            </DialogTitle>
            <DialogClose
              className="bg-transparent p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <CloseIcon className="text-gray-400 dark:text-gray-500 w-4 h-4" />
            </DialogClose>
          </DialogHeader>

          <div className="p-6 flex flex-col gap-5">

            {/* Certificate Card */}
            <div
              className="relative flex flex-col gap-5 rounded-xl px-5 py-5 overflow-hidden"
              style={{ backgroundColor: bgColor }}
            >
              {/* Subtle noise/grain overlay for depth */}
              <div
                className="absolute inset-0 rounded-xl opacity-[0.04]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px",
                }}
              />

              {/* Decorative circle */}
              <div
                className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10"
                style={{ backgroundColor: textColor }}
              />
              <div
                className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full opacity-[0.06]"
                style={{ backgroundColor: textColor }}
              />

              {/* Top row */}
              <div className="relative flex justify-between items-start">
                <div>
                  <p
                    className="text-[11px] font-mono uppercase tracking-widest opacity-60"
                    style={{ color: textColor }}
                  >
                    Date Added
                  </p>
                  <p
                    className="text-sm font-semibold mt-0.5"
                    style={{ color: textColor }}
                  >
                    {moment(certificate.created_on).format("ll")}
                  </p>
                </div>
                <div
                  className="h-9 w-9 flex items-center justify-center rounded-full border opacity-60"
                  style={{ borderColor: textColor }}
                >
                  <CardHeadIcon />
                </div>
              </div>

              {/* Divider */}
              <div className="relative h-px w-full opacity-10" style={{ backgroundColor: textColor }} />

              {/* Issuer */}
              <div className="relative">
                <p
                  className="text-[11px] font-mono uppercase tracking-widest opacity-60"
                  style={{ color: textColor }}
                >
                  Issuer
                </p>
                <p
                  className="text-base font-semibold mt-0.5 tracking-tight"
                  style={{ color: textColor }}
                >
                  {certificate.issuer}
                </p>
              </div>

              {/* Diver info */}
              <div className="relative flex flex-col gap-0.5">
                <p
                  className="text-[11px] font-mono uppercase tracking-widest opacity-60"
                  style={{ color: textColor }}
                >
                  Diver No.
                </p>
                <p
                  className="text-[13px] font-mono opacity-80"
                  style={{ color: textColor }}
                >
                  {certificate.certification_no}
                </p>
                <p
                  className="text-xl font-bold tracking-tight mt-1"
                  style={{ color: textColor }}
                >
                  {certificate.issuer_name}
                </p>
              </div>
            </div>

            {/* Image section */}
            <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              {certificate.image ? (
                <Image
                  src={certificate.image}
                  alt="Certificate"
                  className="w-full h-auto"
                  width={480}
                  height={280}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 dark:text-gray-600 font-mono">No image available</p>
                </div>
              )}
            </div>

          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;