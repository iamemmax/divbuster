import React, { Dispatch, SetStateAction, useState } from "react";
import {
  ClientOnly,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormError,
  ErrorModal,
} from "@/components/core";

import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "react-query";
import {
  fetchHospitalListByLga,
  fetchRegionByState,
  fetchStateList,
  regionTypes,
  useUserHospitalChoice,
} from "../../api/remital/remtalUserDetails";
import { SmallSpinner, Spinner } from "@/icons/core";
import { capitalizeFirstLetter, formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { Input2 } from "@/components/core/Input2";
import DebounceInput from "@/app/(dashboard)/comp/components/misc/DebounceInput";
import { useRouter } from "next/navigation";

interface Prop {
  setOpenRemitalUserDetail: Dispatch<SetStateAction<boolean>>;
  OpenRemitalUserDetail: true;
  userId: string;
  setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
  verifyResponse: {
    nin: string;
    bvn: string;
    address: string;
    email: string;
    id: string;
  };
}
interface SuccessMsg {
  // message: string;
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  organization: null;
  gender: string;
  has_set_password: boolean;
  hospitals: Hospitals;
  phone_verified: boolean;
  nin: null;
  bvn: string;
  email: string;
  address: string;
}

interface Hospitals {
  state: string;
  lga: string;
  provider_id: string;
  hospital: string;
}

interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
}

const formValues = z.object({
  hospitaldata: z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Email is required" }),
    state: z.string().trim().min(1, { message: "Please select a state." }),
    lga: z.string().trim().min(1, { message: "Please select a lga." }),
    hospital: z
      .string()
      .trim()
      .min(1, { message: "Please select a hospital." }),
  }),
});

type formValues = z.infer<typeof formValues>;

const RemitalUserDetails = ({
  setOpenRemitalUserDetail,
  OpenRemitalUserDetail,
  userId,
  setOpenShowRemitalPlan,
  verifyResponse,
}: Prop) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<formValues>({
    resolver: zodResolver(formValues),
    defaultValues: {
      hospitaldata: {
        email: verifyResponse?.email || "",
        hospital: "",
        lga: "",
        state: "",
      },
    },
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const selectedEmail = useWatch({
    control,
    name: "hospitaldata.email",
  });
  const selectedState = useWatch({
    control,
    name: "hospitaldata.state",
  });

  const selectedlga = useWatch({
    control,
    name: "hospitaldata.lga",
  });
  const seletedHospital = useWatch({
    control,
    name: "hospitaldata.hospital",
  });

  const { data: stateList } = useQuery({
    queryFn: fetchStateList,
    queryKey: ["fetch-state-list"],
  });

  const { data: lgaList, isLoading: loadinglga } = useQuery({
    queryFn: () => fetchRegionByState(selectedState),
    queryKey: ["fetch-lga-list", selectedState],
  });

  const uniqueStates = Array.from(new Set(stateList));

  const { data: hospitalList, isLoading: loadingHospital } = useQuery({
    queryFn: () => fetchHospitalListByLga(selectedlga),
    queryKey: ["fetch-hospital-list", selectedlga],
  });

  const { mutate: handleSubmitHospital, isLoading: loadingSubmit } =
    useUserHospitalChoice();
  const router = useRouter();
  const onSubmit = (data: formValues) => {
    const selectedlgaData = hospitalList?.data?.find(
      (hos) =>
        hos?.lga?.toLowerCase() === data?.hospitaldata?.lga?.toLowerCase()
    );

    handleSubmitHospital(
      {
        userId,
        email: data?.hospitaldata?.email,
        state: data.hospitaldata.state,
        hospital: data.hospitaldata.hospital,
        provider_id: String(selectedlgaData?.provider_id),
        lga: String(selectedlgaData?.lga),
      },
      {
        onSuccess(data: SuccessMsg) {
          if (data?.has_set_password) {
            setOpenShowRemitalPlan(true);
            setOpenRemitalUserDetail(false);
          } else {
            router.push(`/create-password?email=${selectedEmail}`);
            // setOpenRemitalUserDetail(false);
          }
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          setErrorMsg(error?.response?.data?.error);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  const filteredStates = uniqueStates.filter((state) =>
    state?.toLowerCase().includes(globalFilter.toLowerCase())
  );

  return (
    <div className="rounded-xl">
      <Dialog open={OpenRemitalUserDetail}>
        <DialogContent className="!overflow-hidden">
          <DialogHeader className="bg-[#1B1687] 'font-DMSans' font-medium text-[#fff] text-base">
            <DialogTitle className="'font-DMSans' font-medium text-[#fff]">
              User Details
            </DialogTitle>
            <DialogClose className="rounded-full">
              <button onClick={() => setOpenRemitalUserDetail(false)}>
                close
              </button>
            </DialogClose>
          </DialogHeader>

          <DialogBody className="bg-[#141B3f] w-full">
            <div className="py-1">
              <div className="text-[#fff] font-light  'font-DMSans' text-sm">
                Kindly enter the details below and select the <br /> hospitals
                around you.
              </div>
            </div>
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full mt-[1rem] text-sm font-normal">
                <Label
                  className="mb-1 block text-xs text-[#fff]"
                  htmlFor="email"
                >
                  Email
                </Label>
                <div className="relative mt-[.25rem]">
                  <Input2
                    className={`${errors?.hospitaldata?.email?.message ? "border border-red-700" : ""} text-[#fff]`}
                    placeholder="Enter email"
                    type="text"
                    id="email"
                    {...register("hospitaldata.email")}
                  />
                </div>
              </div>
              <div className="">
                <Label
                  className="mt-5 mb-1 block text-xs text-[#fff]"
                  htmlFor="State"
                >
                  State
                </Label>

                <Controller
                  control={control}
                  name="hospitaldata.state"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger
                        id="state"
                        ref={ref}
                        className="bg-[#2D3456] text-[#fff]"
                      >
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="relative">
                        <div className="w-full h-[4rem] absolute pr-10">
                          <DebounceInput
                            className="w-full p-2 bg-white text-black"
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e)}
                          />
                        </div>
                        <div className="mt-12">
                          {filteredStates?.map((state_name, idx: number) => (
                            <SelectItem
                              className="border-t-[0.1px] border-[#E2E8F0] border-opacity-50 py-3 text-[#1B1687] text-xs"
                              key={idx}
                              value={state_name}
                            >
                              {state_name}
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="">
                <Label
                  className="mt-5 mb-1 block text-xs text-[#fff]"
                  htmlFor="lga"
                >
                  Lga
                </Label>

                <Controller
                  control={control}
                  name="hospitaldata.lga"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger
                        id="lga"
                        ref={ref}
                        className="bg-[#2D3456] text-[#fff]"
                      >
                        {loadinglga ? (
                          <div className="border rounded-full w-4 h-4 flex justify-center items-center animate-spin">
                            <Spinner color="red" className="w-4 h-4" />
                          </div>
                        ) : (
                          <SelectValue>{selectedlga}</SelectValue>
                        )}
                        <SelectValue placeholder="Select lga" />
                      </SelectTrigger>
                      <SelectContent>
                        {lgaList?.map((lga: any, idx: number) => (
                          <SelectItem
                            className="border-t-[0.1px] border-[#E2E8F0] border-opacity-50 py-3 text-[#1B1687] text-xs"
                            key={idx}
                            value={lga}
                          >
                            {lga}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label className="block text-xs text-[#fff]" htmlFor="Hospital">
                  Hospital Available ({hospitalList?.data?.length ?? 0})
                </Label>

                <Controller
                  control={control}
                  name="hospitaldata.hospital"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      value={value}
                      onValueChange={onChange}
                      disabled={!selectedState}
                    >
                      <SelectTrigger
                        id="hospital"
                        ref={ref}
                        className="bg-[#2D3456] text-[#fff]"
                      >
                        {loadingHospital ? (
                          <div className="border rounded-full w-4 h-4 flex justify-center items-center animate-spin">
                            <Spinner color="red" className="w-4 h-4" />
                          </div>
                        ) : (
                          <SelectValue>{seletedHospital}</SelectValue>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {hospitalList?.data?.map((clinic, index: number) => (
                          <SelectItem
                            className="border-t-[0.1px] border-[#E2E8F0] border-opacity-50 py-3 "
                            key={index}
                            value={clinic?.name}
                          >
                            <div className="w-[20rem]">
                              <h2 className="text-[#1B1687] text-xs">
                                {clinic?.name}
                              </h2>
                              <p className="text-[.625rem] text-[#080D27]">
                                {clinic?.address?.toLowerCase()}
                              </p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="pb-[4rem]">
                <button
                  className="mt-[4.5rem] flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                  type="submit"
                >
                  Continue{" "}
                  {loadingSubmit && (
                    <SmallSpinner className="" color="#1B1687" />
                  )}
                </button>
              </div>
            </form>
          </DialogBody>
        </DialogContent>
      </Dialog>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage ||
          errorMsg ||
          "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default RemitalUserDetails;
