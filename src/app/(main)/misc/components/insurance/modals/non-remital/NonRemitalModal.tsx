import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorModal,
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/core";
import { RightUpArrow, SmallSpinner } from "@/icons/core";
import { z } from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input2 } from "@/components/core/Input2";
import { useCheckNinUser } from "../../api/non-remital/check-nin";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";

interface Prop {
  openNonRemitalDetailModal: boolean;
  setPhoneNumberCheckResponse: Dispatch<
    SetStateAction<{
      id: string;
      address: string;
      full_name: string;
      ministry: string;
      state: string;
    }>
  >;
  setOpenNonRemitalDetailModal: Dispatch<SetStateAction<boolean>>;
  setOpenRemitalUserDetail: Dispatch<SetStateAction<boolean>>;
  setOpenRemitalDetailModal: Dispatch<SetStateAction<boolean>>;
  setUserEmail: Dispatch<SetStateAction<string>>;
  verifiedPhoneNumber: string;
  userId: string;
  verifyResponse: {
    nin: string;
    bvn: string;
    address: string;
    email: string;
    id: string;
  };
}

const baseSchema = z.object({
  address: z
    .string({ required_error: "Enter your address" })
    .min(2, { message: "Address should be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  selectedOption: z.union([z.literal("nin"), z.literal("bvn")]),
  bvn: z.string().optional(),
  nin: z.string().optional(),
});

// Extend the base schema for NIN
const ninSchema = baseSchema.extend({
  nin: z
    .string()
    .trim()
    .min(10, { message: "NIN should be at least 10 digits" }),
});

// Extend the base schema for BVN
const bvnSchema = baseSchema.extend({
  bvn: z
    .string()
    .trim()
    .min(11, { message: "BVN should be at least 11 digits" }),
});

const NonRemitalModal = ({
  verifiedPhoneNumber,
  openNonRemitalDetailModal,
  setOpenNonRemitalDetailModal,
  setPhoneNumberCheckResponse,
  setOpenRemitalUserDetail,
  setOpenRemitalDetailModal,
  setUserEmail,
  verifyResponse,
  userId,
}: Prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      address: verifyResponse?.address || "",
      email: verifyResponse?.email || "",
      selectedOption: verifyResponse?.nin
        ? "nin"
        : verifyResponse?.bvn
          ? "bvn"
          : "nin", // Default selected option
      nin: verifyResponse?.nin || "",
      bvn: verifyResponse?.bvn || "",
    },
    mode: "onChange",
  });

  const watchSelectedOption = useWatch({
    control,
    name: "selectedOption",
  });

  const schema = watchSelectedOption === "nin" ? ninSchema : bvnSchema;
  const { mutate: handleCheckNin, isLoading } = useCheckNinUser();

  const onSubmit = (data: any) => {
    handleCheckNin(
      {
        selectedOption: data.selectedOption,
        userId,
        email: data.email,
        address: data.address,
        nin: watchSelectedOption === "nin" ? data.nin : "",
        bvn: watchSelectedOption === "bvn" ? data.bvn : "",
      },
      {
        onSuccess: (responseData: any) => {
          setUserEmail(data?.email);
          setPhoneNumberCheckResponse({
            full_name: `${responseData?.["user:"]?.first_name} ${responseData?.["user:"]?.last_name}`,
            ministry: "",
            state: responseData?.["user:"]?.organization ?? "",
            id: responseData?.["user:"]?.id,
            address: responseData?.["user:"]?.address,
          });

          if (responseData?.["user:"]?.phone_verified) {
            setOpenRemitalUserDetail(true);
            setOpenNonRemitalDetailModal(false);
          } else {
            setOpenRemitalDetailModal(true);
            setOpenNonRemitalDetailModal(false);
          }
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        onError: (error: AxiosError) => {
          const errorMessage = formatAxiosErrorMessage(error);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  return (
    <div>
      <Dialog open={openNonRemitalDetailModal}>
        <DialogTrigger className="bg-white text-black flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max font-display">
          Get Insurance
          <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
            <RightUpArrow className="" width={12} height={12} />
          </span>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="bg-[#1B1687]">
            <DialogTitle className="text-[#fff]">Details Request</DialogTitle>

            <DialogClose>
              <button onClick={() => setOpenNonRemitalDetailModal(false)}>
                Close
              </button>
            </DialogClose>
          </DialogHeader>

          <DialogBody className="bg-[#151D42]">
            <p className="text-sm font-medium text-white font-sans">
              Kindly enter your details below to process your application.
            </p>
            <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mt-[.25rem]">
                <Label
                  className="mb-1 block text-xs text-[#fff]"
                  htmlFor="address"
                >
                  Full Address(Number, Street, City, State)
                </Label>
                <Input2
                  className={`${errors?.address?.message ? "border border-red-700" : ""} text-[#fff]`}
                  placeholder="Enter your address"
                  type="text"
                  id="address"
                  {...register("address")}
                />
              </div>

              <div className="w-full mt-[1rem] text-sm font-normal">
                <Label
                  className="mb-1 block text-xs text-[#fff]"
                  htmlFor="email"
                >
                  Email
                </Label>
                <div className="relative mt-[.25rem]">
                  <input
                     className={`${
                      errors?.email ? "border border-red-700" : ""
                    } text-[#fff] text-xs outline-none h-[2.4rem] md:h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
placeholder="Enter email"
                    type="text"
                    id="email"
                    {...register("email")}
                  />
                </div>
              </div>

              <div className="w-full mt-[1rem] text-sm font-normal">
                <Label
                  className="mb-1 block text-xs text-[#fff]"
                  htmlFor="selectedOption"
                >
                  Select the one to enter, BVN or NIN?
                </Label>
                <Controller
                  control={control}
                  name="selectedOption"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger
                        id="selectedOption"
                        ref={ref}
                        className="bg-[#2D3456] text-[#fff] w-full py-2 px-3 rounded-md focus:outline-none"
                      >
                        <span>
                          {value === "bvn"
                            ? "BVN"
                            : value === "nin"
                              ? "NIN"
                              : "Select BVN or NIN"}
                        </span>
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 mt-1 rounded-md shadow-lg w-full absolute z-50 top-full">
                        <SelectItem value="bvn">BVN</SelectItem>
                        <SelectItem value="nin">NIN</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {watchSelectedOption === "bvn" && (
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs text-[#fff]"
                    htmlFor="bvn"
                  >
                    BVN
                  </Label>
                  <div className="relative mt-[.25rem]">
                    {/* <Input2
                      className={`${errors?.bvn?.message ? "border border-red-700" : ""} text-[#fff]`}
                      placeholder="Enter BVN"
                      type="text"
                      id="bvn"
                      // required
                      
                      {...register("bvn")}
                    /> */}



                    <Controller
                                          control={control}
                                          name={`bvn`}
                                          render={({ field }) => (
                                            <input
                                              {...field}
                                              {...field}
                                        className={`${
                                          errors?.bvn ? "border border-red-700" : ""
                                        } text-[#fff] text-xs outline-none h-[2.4rem] md:h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                                              id="bvn"
                                              placeholder="Enter BVN"
                                              type="text"
                                              maxLength={11}
                                              onChange={(e) => {
                                                const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                // Handle input sanitization on change (typing)
                                                const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                field.onChange(validPhoneNumber);
                                              }}
                                              onPaste={(e) => {
                                                const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                // Intercept paste event to sanitize pasted content
                                                const pastedValue = e.clipboardData.getData('text');
                                                const sanitizedValue = pastedValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                e.preventDefault(); // Prevent the default paste behavior
                                                field.onChange(sanitizedValue); // Apply sanitized value
                                              }}
                                              
                                              onInput={(e) => {
                                                const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                // Handle input sanitization on input changes
                                                const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                field.onChange(validPhoneNumber);
                                              }}
                                              // onChange={(e) => field.onChange(e.target.value)}
                                            />
                                          )}
                                        />
                  </div>
                </div>
              )}
              {watchSelectedOption === "nin" && (
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs text-[#fff]"
                    htmlFor="nin"
                  >
                    NIN
                  </Label>
                  <div className="relative mt-[.25rem]">
                    {/* <Input2
                      className={`${errors?.nin?.message ? "border border-red-700" : ""} text-[#fff]`}
                      placeholder="Enter NIN"
                      type="text"
                      id="nin"
                      required
                      {...register("nin")}
                    /> */}

<Controller
                                          control={control}
                                          name={`nin`}
                                          render={({ field }) => (
                                            <input
                                              {...field}
                                              {...field}
                                        className={`${
                                          errors?.nin ? "border border-red-700" : ""
                                        } text-[#fff] text-xs outline-none h-[2.4rem] md:h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                                              id="nin"
                                              placeholder="Enter nin"
                                              type="text"
                                              maxLength={11}
                                              onChange={(e) => {
                                                const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                // Handle input sanitization on change (typing)
                                                const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                field.onChange(validPhoneNumber);
                                              }}
                                              onPaste={(e) => {
                                                const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                // Intercept paste event to sanitize pasted content
                                                const pastedValue = e.clipboardData.getData('text');
                                                const sanitizedValue = pastedValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                e.preventDefault(); // Prevent the default paste behavior
                                                field.onChange(sanitizedValue); // Apply sanitized value
                                              }}
                                              
                                              onInput={(e) => {
                                                const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                // Handle input sanitization on input changes
                                                const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                field.onChange(validPhoneNumber);
                                              }}
                                              // onChange={(e) => field.onChange(e.target.value)}
                                            />
                                          )}
                                        />
                  </div>
                </div>
              )}

              <div className="pb-[2rem]">
                <button
                  className="mt-[3rem] flex justify-center gap-x-3 items-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                  type="submit"
                >
                  Continue
                  {isLoading && <SmallSpinner className="" color="blue" />}
                </button>
              </div>
            </form>
          </DialogBody>
        </DialogContent>
      </Dialog>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      />
    </div>
  );
};

export default NonRemitalModal;
