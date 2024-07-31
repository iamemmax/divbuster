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
} from "@/components/core";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useRouter } from "next/navigation";
import useDataStore from "@/app/store/useStore";
import { useChangePassword } from "@/app/(auth)/(onboarding)/api/createPassword";
import RemitalPlanModal from "./RemitalPlanModal";
import { SmallSpinner } from "@/icons/core";
import EyeIcon from "@/app/(main)/misc/icons/EyeIcon";
import { Label } from "@radix-ui/react-label";

interface Prop {
  setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
  setOpenShowRemitalPlan: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
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
const CreatepasswordModal = ({
  setShowPasswordModal,
  showPasswordModal,
  setOpenShowRemitalPlan,
  userEmail,
}: Prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordformProps>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      passwordData: {
        email: userEmail || "",
        password: "",
        confirm_password: "",
      },
    },

    mode: "onChange",
  });

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
          if (data) {
            setOpenShowRemitalPlan(true);
            if (userEmail !== undefined) {
              setOpenShowRemitalPlan(true);
              setShowPasswordModal(false);
            } else {
              router.push("/login");
            }
          }
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
                Sign up
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
                <div className={`${userEmail ? "hidden" : ""} `}>
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

export default CreatepasswordModal;
