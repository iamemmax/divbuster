import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ErrorModal,
  FormError,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/core";

import { z } from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useRouter } from "next/navigation";
import useDataStore from "@/app/store/useStore";
import { useChangePassword } from "@/app/(auth)/(onboarding)/api/createPassword";
import { SmallSpinner } from "@/icons/core";
import EyeIcon from "@/app/(main)/misc/icons/EyeIcon";
import { Label } from "@radix-ui/react-label";
import { Input2 } from "@/components/core/Input2";

interface Prop {
  setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
  // setOpenShowRemitalPlan: React.Dispatch<React.SetStateAction<boolean>>;
  //   userEmail: string;
  showPasswordModal: boolean;
}

// Define Zod schema using TypeScript types
const PasswordFormSchema = z.object({
  passwordData: z
    .object({
      email: z
        .string({ required_error: "Please enter your email." })
        .trim()
        .min(1, { message: "Invalid email." })
        .email(),
      selectedOption: z.union([z.literal("nin"), z.literal("bvn")]),
      bvn: z.string().trim(),
      nin: z.string().trim(),
      password: z
        .string({ required_error: "Please enter your password." })
        .trim()
        .min(5, { message: "Password must be at least 5 characters." })
        .refine(
          (value) =>
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/.test(
              value
            ),
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
          }
        ),
      confirm_password: z
        .string({ required_error: "Please enter your password." })
        .trim()
        .min(1, { message: "Password must be at least 1 characters." }),
    })
    .refine((data) => data?.password === data?.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    }),
});

// Extend the base schema for NIN
const ninSchema = PasswordFormSchema.extend({
  nin: z
    .string()
    .trim()
    .min(10, { message: "NIN should be at least 10 digits" }),
});

// Extend the base schema for BVN
const bvnSchema = PasswordFormSchema.extend({
  bvn: z
    .string()
    .trim()
    .min(11, { message: "BVN should be at least 11 digits" }),
});

type passwordformProps = z.infer<typeof PasswordFormSchema>;
interface successMsg {
  message: string;
  user: User;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  organization: null;
  gender: string;
  has_set_password: boolean;
  hospitals: Hospitals;
  phone_verified: boolean;
  nin: string;
  bvn: string;
  email: string;
  address: string;
}

interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
}
const CreateReferralPasswordModal = ({
  setShowPasswordModal,
  showPasswordModal,
  //   setOpenShowRemitalPlan,
  //   userEmail,
}: Prop) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<passwordformProps>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      passwordData: {
        email: "",
        password: "",
        confirm_password: "",
        selectedOption: "" ? "nin" : "bvn" ? "bvn" : "nin", // Default selected option
        nin: "",
        bvn: "",
      },
    },

    mode: "onChange",
  });
  const watchSelectedOption = useWatch({
    control,
    name: "passwordData.selectedOption",
  });

  const schema = watchSelectedOption === "nin" ? ninSchema : bvnSchema;
  const [errorMsg, setErrorMsg] = React.useState("");

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const router = useRouter();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const { mutate: handleChangePassword, isLoading } = useChangePassword();
  const addUser = useDataStore((state) => state?.addUser);
  const onsubmit = ({
    passwordData: { confirm_password, email, password },
  }: passwordformProps) => {
    handleChangePassword(
      {
        confirm_password,
        email,
        password,
        // phone: "",
      },
      {
        onSuccess: (data: successMsg) => {
          addUser({
            password: password,
            phone_number: data?.user?.phone_number,
          });
          setUserId(data?.user?.id);
          //   if (data) {
          //     setOpenShowRemitalPlan(true);
          //     if (userEmail !== undefined) {
          //       setOpenShowRemitalPlan(true);
          //       setShowPasswordModal(false);
          //     } else {
          //       router.push("/login");
          //     }
          //   }
          // router?.push("/");
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
    <>
      (
      <div className="rounded-xl">
        <Dialog open={showPasswordModal}>
          <DialogContent className="!overflow-hidden">
            <DialogHeader className="bg-[#1B1687] 'font-DMSans' font-medium text-[#fff] text-base">
              <DialogTitle className="'font-DMSans' font-medium text-[#fff]">
                Create Password
              </DialogTitle>
              <DialogClose
                className="rounded-full"
                onClick={() => setShowPasswordModal(false)}
              >
                <button>close</button>
              </DialogClose>
            </DialogHeader>

            <DialogBody className="bg-[#141B3f] w-full">
              <form className="relative z-10" onSubmit={handleSubmit(onsubmit)}>
                <div className={` `}>
                  <Label
                    className="text-white font-sans text-sm mb-1"
                    htmlFor="phone"
                  >
                    Email
                  </Label>
                  <Input
                    className={`login-autofill-text mt-2 login-no-chrome-autofill-bg h-auto rounded-lg  !bg-white/10 px-6 py-3.5 outline-none text-sm font-sans font-medium text-white placeholder:text-white focus:!bg-white/30 `}
                    id="email"
                    placeholder="Enter email"
                    type="email"
                    {...register("passwordData.email")}
                  />

                  {errors?.passwordData?.email && (
                    <FormError
                      className="bg-red-900/40 text-white"
                      errorMessage={errors.passwordData.email.message}
                    />
                  )}
                </div>

                <div className="mt-4">
                  <div>
                    <Label
                      className="text-white font-sans text-sm mb-2"
                      htmlFor="password"
                    >
                      Password
                    </Label>

                    <div className="flex items-center w-full  pr-10 md:pr-16 !bg-white/10 rounded-lg h-[3rem] ">
                      <Input
                        className="login-autofill-text  pr-7 login-no-chrome-autofill-bg h-full  outline-none border-none  rounded-lg bg-transparent  px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white  focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
                        id="password"
                        placeholder="Enter password"
                        type={passwordShown ? "text" : "password"}
                        {...register("passwordData.password")}
                      />
                      <button
                        type="button"
                        className="absolute right-5"
                        onClick={togglePassword}
                      >
                        <EyeIcon />
                      </button>
                    </div>
                    <p className="text-white leading-[15px] opacity-80 text-[.625rem] my-2">
                      Must be at least 6 characters long - uppercase, lowercase,
                      number, special characters (@*-!_)
                    </p>

                    {errors?.passwordData?.password && (
                      <FormError
                        className="mt-3 bg-red-900/40 text-white"
                        errorMessage={errors.passwordData.password.message}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Label
                    className="text-white font-sans text-sm mb-2"
                    htmlFor="password"
                  >
                    Confirm Pasword
                  </Label>

                  <div className="flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3rem] ">
                    <Input
                      className="login-autofill-text !outline-none !border-none login-no-chrome-autofill-bg h-full rounded-lg bg-transparent px-6 py-3.5 text-sm font-sans font-medium text-white placeholder"
                      id="password"
                      placeholder="Enter password"
                      type={passwordShown ? "text" : "password"}
                      {...register("passwordData.confirm_password")}
                      style={{ outline: "none", border: "none" }}
                    />

                    {/* <div> */}
                    <button
                      type="button"
                      className="absolute right-5"
                      onClick={togglePassword}
                    >
                      <EyeIcon />
                    </button>
                    {/* </div> */}
                  </div>

                  {errors?.passwordData?.confirm_password && (
                    <FormError
                      className="mt-3 bg-red-900/40 text-white"
                      errorMessage={
                        errors?.passwordData?.confirm_password?.message
                      }
                    />
                  )}
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
                    name="passwordData.selectedOption"
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
                          <SelectItem value="bvn" className="w-full">
                            BVN
                          </SelectItem>
                          <SelectItem value="nin" className="w-full">
                            NIN
                          </SelectItem>
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
                      <Input2
                        className={`${errors?.passwordData?.bvn?.message ? "border border-red-700" : ""} text-[#fff] h-12`}
                        placeholder="Enter BVN"
                        type="text"
                        id="bvn"
                        required
                        {...register("passwordData.bvn")}
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
                      <Input2
                        className={`${errors?.passwordData?.nin?.message ? "border border-red-700" : ""} text-[#fff] h-12`}
                        placeholder="Enter NIN"
                        type="text"
                        id="nin"
                        required
                        {...register("passwordData.nin")}
                      />
                    </div>
                  </div>
                )}

                <Button
                  className="my-6 mt-16 flex justify-center items-center gap-x-3 w-full rounded-[20px] text-[#1B1687] font-sans py-[.9375rem] text-base leading-[normal]"
                  type="submit"
                  variant="white"
                >
                  Continue
                  {isLoading && <SmallSpinner className="" color="#1B1687" />}
                </Button>
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
      )
    </>
  );
};

export default CreateReferralPasswordModal;
