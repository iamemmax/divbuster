"use client";
import React, { useState } from "react";
import DashboardPlanHeader from "../../comp/components/DashboardPlanHeader";
import Image from "next/image";
import CameraIcon from "../../comp/icons/CameraIcon";
import { Button } from "@/components/core";
import UploadIcon from "../../comp/icons/UploadIcon";
import RemoveIcon from "../../comp/icons/RemoveIcon";
import CopyIcon3 from "../../comp/icons/CopyIcon3";
import { SmallSpinner } from "@/icons/core";
import { useClipboard } from "@/hooks";
import { useQuery, useQueryClient } from "react-query";
import { fetchReferralCode } from "../api/referral/fetchReferralCode";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import CopyIcon from "../../comp/icons/CopyIcon";

const Page = () => {
  const { copy } = useClipboard();
  const { data: userData } = useUser();
  const queryClient = useQueryClient();
  const {
    data,
    refetch,

    isLoading: loadinGenerate,
  } = useQuery({
    queryFn: () => fetchReferralCode(userData?.id as string),
    queryKey: ["generate-referral-code", userData?.id],
    enabled: false,
    onSuccess: () => {
      // Invalidate user details query to refetch data
      queryClient.invalidateQueries(["user-details", data?.referral_code]);
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file);
      // You can handle the file upload here
    }
  };
  return (
    <div className="relative bg-[#f5f9fe] w-full h-screen">
      <div className="bg-main px-6  md:px-[4.5rem] lg:px-[7.5rem]"></div>

      <div className="w-full h-32 bg-main py-10"></div>
      <div className="relative ">
        <div className=" inset-x-0 top-[-4rem] absolute px-6  md:px-[4.5rem] lg:px-[7.5rem]">
          <div className="bg-white h-full grid grid-cols-1 rounded-10  px-5 py-[2.8125rem] xl:px-[4.5rem]">
            <div className="border-b-[0.3px] pb-3 border-opacity-40 border-[#333333]">
              <div className="">
                <h2 className="font-bold text-2xl text-[#032282]">
                  Personal Information
                </h2>
              </div>
              <div className="mt-6 flex justify-between items-center relative">
                <div className="relative flex items-center gap-10">
                  <div className="relative">
                    <div className="relative">
                      <Image
                        src={"/images/userIcon.png"}
                        width={100}
                        height={100}
                        alt="User Profile"
                        className="rounded-full"
                      />
                    </div>
                    <input
                      type="file"
                      id="BtnBrowseHidden"
                      name="files"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div className="absolute -right-9 bottom-3 z-[10]">
                      <label htmlFor="BtnBrowseHidden">
                        <Button className="bg-transparent z-[10]">
                          <CameraIcon />
                        </Button>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant={"outlined"}
                      className="border-[#032282] bg-[#F5F9FE] py-3 border-[.0187rem] flex items-center gap-x-2 rounded-10"
                    >
                      <UploadIcon /> Upload
                    </Button>
                    <Button
                      className="bg-[#F5F9FE] text-[#032282] flex items-center gap-x-2 py-3"
                      onClick={() => setSelectedFile(null)}
                    >
                      <RemoveIcon /> Remove
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {userData?.referral_code ? (
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center border-[0.3px] border-[#032282] justify-center flex-col gap-x-2 bg-transparent px-4 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                        onClick={() =>
                          copy(
                            ` https://liberty-life.vercel.app/?get-started=true&referral_code=${userData?.referral_code}` ??
                              ""
                          )
                        }
                      >
                        <p className=" text-[#032282] text-xxs text-opacity-60">
                          Referral link
                        </p>
                        <div className="flex">
                          <p className="text-[#032282]  max-w-[6.25rem] text-xxs truncate">
                            {` https://liberty-life.vercel.app/?referral_code=${userData?.referral_code}`}
                          </p>
                          <Button className="  px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                            <CopyIcon height={18} width={18} />
                          </Button>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-center flex-col gap-x-3  border-[#032282] border-[0.3px] bg-transparent px-6 rounded-lg cursor-pointer border-opacity-80 py-[.5625rem] "
                        onClick={() => copy(userData?.referral_code ?? "")}
                      >
                        <p className="text-[#032282] text-xxs text-opacity-60">
                          Referral Code
                        </p>
                        <div className="flex items-center gap-x-2">
                          <p className="text-[#032282] max-w-[3.25rem] text-xxs truncate">
                            {userData?.referral_code ?? ""}
                          </p>
                          <Button className=" text-[#032282] px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                            <CopyIcon height={15} width={15} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => refetch()}>
                      {loadinGenerate ? (
                        <SmallSpinner color="white" />
                      ) : (
                        "Generate Referral"
                      )}
                    </Button>
                  )}
                  <div className="">
                    <Button className="bg-[#099976] py-[0.95rem] rounded-10  text-sm font-medium">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <form>
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-7">
                <div className="">1</div>
                <div className="">2 </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
