import React, { Dispatch, SetStateAction } from "react";
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
  fetchStateList,
  useUserHospitalChoice,
} from "../../api/remital/remtalUserDetails";
import { SmallSpinner } from "@/icons/core";

interface Prop {
  setOpenRemitalUserDetail: Dispatch<SetStateAction<boolean>>;
  OpenRemitalUserDetail: true;
  verifiedPhoneNumber: string;
  setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
}

const formValues = z.object({
  hospitaldata: z.object({
    state: z
      .string({ required_error: "Please select a state." })
      .trim()
      .min(1, { message: "Please select a state." }),

    hospital: z
      .string({ required_error: "Please select a hospital." })
      .trim()
      .min(1, { message: "Please select a hosiptal." }),
  }),
});

type formValues = z.infer<typeof formValues>;
const RemitalUserDetails = ({
  setOpenRemitalUserDetail,
  OpenRemitalUserDetail,
  verifiedPhoneNumber,
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
  });

  // track selected state.............................
  const selectedState = useWatch({
    control,
    name: "hospitaldata.state",
  });

  // fetch hospital list.....................................................................
  const { data: stateList } = useQuery({
    queryFn: fetchStateList,
    queryKey: ["fetch-state-list"],
  });

  // fetching hostipal list
  const { data: hospitalList } = useQuery({
    queryFn: () => fetchHospitalListByState(selectedState),
    queryKey: ["fetch-hospital-list", selectedState],
  });
  // console.log(stateList);

  const { mutate: handleSubmitHospital, isLoading: loadingSubmit } =
    useUserHospitalChoice();

  const onSubmit = (data: formValues) => {
    handleSubmitHospital(
      {
        verifiedPhoneNumber,
        state: data?.hospitaldata?.state,
        hospital: data?.hospitaldata?.hospital,
      },
      {
        onSuccess(data) {
          // console.log(data);
        },
      }
    );
    setOpenShowRemitalPlan(true);
    setOpenRemitalUserDetail(false);
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
              {/* {statedroplist && ( */}
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
                        <SelectValue placeholder="Enter State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"loading"} disabled></SelectItem>

                        {stateList?.map((state_name, idx: number) => (
                          <SelectItem key={idx} value={state_name}>
                            {state_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* {errors?.hospitaldata?.state && (
                    <FormError
                      className="bg-red-900/40 text-white"
                      errorMessage={errors?.hospitaldata?.state.message}
                    />
                  )} */}
              {/* )} */}

              {/* Hospital dropdownList */}

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
                        <SelectValue placeholder="Select Hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitalList?.map(
                          (hospital: string, index: number) => (
                            <SelectItem key={index} value={hospital}>
                              {hospital}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="pb-[4rem]">
                <button
                  className="mt-[4.5rem] flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                  //disabled={!selectedState}
                  type="submit"
                >
                  Continue{" "}
                  {loadingSubmit && (
                    <SmallSpinner className="" color="#1B1687" />
                  )}
                </button>
              </div>
            </form>
            {/* <ErrorModal
              isErrorModalOpen={isErrorModalOpen}
              setErrorModalState={setErrorModalState}
              subheading={
                errorModalMessage || "Please check your inputs and try again."
              }
            >
              <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
                <button
                  className="grow bg-red-950 px-1.5 sm:text-sm md:px-6"
                  type="button"
                  onClick={closeErrorModal}
                >
                  Okay
                </button>
              </div>
            </ErrorModal> */}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RemitalUserDetails;
