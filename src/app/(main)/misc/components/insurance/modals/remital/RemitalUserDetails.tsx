import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { useQuery } from "react-query";
import {
  fetchHospitalListByState,
  fetchRegionByState,
  fetchStateList,
  regionTypes,
  useUserHospitalChoice,
} from "../../api/remital/remtalUserDetails";
import { SmallSpinner, Spinner } from "@/icons/core";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";

interface Prop {
  setOpenRemitalUserDetail: Dispatch<SetStateAction<boolean>>;
  OpenRemitalUserDetail: true;
  userId: string;
  setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
}

// interface regionProp{

// }

const formValues = z.object({
  hospitaldata: z.object({
    state: z.string().trim().min(1, { message: "Please select a state." }),
    region: z.string().trim().min(1, { message: "Please select a region." }),
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
        hospital: "",
        region: "",
        state: "",
      },
    },
  });

  const [errorMsg, setErrorMsg] = useState("");

  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  // track selected state and region
  const selectedState = useWatch({
    control,
    name: "hospitaldata.state",
  });
  const selectedRegion = useWatch({
    control,
    name: "hospitaldata.region",
  });

  // fetch state list
  const { data: stateList } = useQuery({
    queryFn: fetchStateList,
    queryKey: ["fetch-state-list"],
  });

  // fetch region list by state
  const { data: regionList, isLoading: loadingRegion } = useQuery({
    queryFn: () => fetchRegionByState(selectedState),
    queryKey: ["fetch-region-list", selectedState],
  });

  // Remove duplicate states
  const uniqueStates = Array.from(new Set(stateList));

  // fetch hospital list by state and region
  const { data: hospitalList, isLoading: loadingHospital } = useQuery({
    queryFn: () => fetchHospitalListByState(selectedState, selectedRegion),
    queryKey: ["fetch-hospital-list", selectedRegion],
  });

  const { mutate: handleSubmitHospital, isLoading: loadingSubmit } =
    useUserHospitalChoice();

  const onSubmit = (data: formValues) => {
    const selectedRegionData = regionList?.find(
      (region: regionTypes) => region.region === data.hospitaldata.region
    );

    handleSubmitHospital(
      {
        userId,
        state: data.hospitaldata.state,
        hospital: data.hospitaldata.hospital,
        provider_id: Number(selectedRegionData?.provider_id),
        region: String(selectedRegionData?.region),
      },
      {
        onSuccess(data) {
          // console.log(data);
          setOpenShowRemitalPlan(true);
          setOpenRemitalUserDetail(false);
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
              <div className="">
                <Label
                  className="mt-10 mb-1 block text-xs text-[#fff]"
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
                      <SelectContent>
                        <SelectItem value={"loading"} disabled></SelectItem>
                        {uniqueStates?.map((state_name, idx: number) => (
                          <SelectItem key={idx} value={state_name}>
                            {state_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="">
                <Label
                  className="mt-10 mb-1 block text-xs text-[#fff]"
                  htmlFor="Region"
                >
                  Region
                </Label>

                <Controller
                  control={control}
                  name="hospitaldata.region"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger
                        id="region"
                        ref={ref}
                        className="bg-[#2D3456] text-[#fff]"
                      >
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingRegion ? (
                          <SelectItem
                            value="loading"
                            disabled
                            className="w-full flex justify-center items-center"
                          >
                            <Spinner color="blue" className="w-4 h-4" />{" "}
                            {/* Show spinner while loading */}
                          </SelectItem>
                        ) : (
                          regionList?.map((region: any, idx: number) => (
                            <SelectItem key={idx} value={region.region}>
                              {region.region}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label
                  className=" block text-xs  text-[#fff]"
                  htmlFor="Hospital"
                >
                  Hospital
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
                          <SelectValue placeholder="Select Hospital" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {hospitalList?.map((clinic: any, index: number) => (
                          <SelectItem key={index} value={clinic.hospital}>
                            {clinic.hospital}
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
