// AuthenticationComponent.tsx
import { Eye, EyeOff } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangeUserPassword } from "../../../api/settings/changeUserPassword";
import { formatAxiosErrorMessage } from "@/utils";
import { useErrorModalState } from "@/hooks";
import { AxiosError } from "axios";
import { ErrorModal } from "@/components/core";
import toast from "react-hot-toast";



// Zod schema for password change form
const passwordChangeSchema = z.object({
    currentPassword: z.string()
        .min(1, 'Current password is required'),
    newPassword: z.string()
        .min(8, 'Password must contain at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: z.string()
        .min(1, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;


export function AuthenticationComponent() {
    const {
        isErrorModalOpen,
        setErrorModalState,
        openErrorModalWithMessage,
        errorModalMessage,
    } = useErrorModalState();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,

    } = useForm<PasswordChangeFormData>({
        resolver: zodResolver(passwordChangeSchema),
        mode: 'onChange',
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },

    })

    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const { mutate: handleUpdatePassword, isLoading: isSubmitting } = useChangeUserPassword();

    const onSubmit = (data: PasswordChangeFormData) => {
        handleUpdatePassword({
            confirm_password: data.confirmPassword,
            new_password: data.newPassword,
            old_password: data.currentPassword
        }, {
            onSuccess: () => {
                reset(); // Clear form on success
              toast.success("password change successfully")
            },
            onError: (error) => {
                const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                openErrorModalWithMessage(String(errorMessage));
            },
        });
    };
    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-semibold font-archivo text-[#09090B] dark:text-white mb-2">
                Change Password
            </h1>
            <p className="text-[#71717A] dark:text-[#A1A1AA] text-xs font-archivo mb-8">
                Passwords must contain at least 8 characters, including uppercase,
                lowercase, and a number
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Current Password */}
                <div>
                    <label className="block text-xs font-archivo font-medium text-[#36394A] dark:text-gray-300 mb-2">
                        Current password
                    </label>
                    <div className="relative">
                        <input
                            {...register('currentPassword')}
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            className={`w-full px-4 py-3 border ${errors.currentPassword
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-[#ECEFF3] dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500'
                                } bg-[#F6F8FA] dark:bg-gray-800 text-[#09090B] dark:text-gray-100 text-sm rounded-lg focus:ring-2 outline-none transition-colors pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            {showCurrentPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {errors.currentPassword && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                            {errors.currentPassword.message}
                        </p>
                    )}
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-xs font-archivo font-medium text-[#36394A] dark:text-gray-300 mb-2">
                        New password
                    </label>
                    <div className="relative">
                        <input
                            {...register('newPassword')}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className={`w-full px-4 py-3 border ${errors.newPassword
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-[#ECEFF3] dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500'
                                } bg-[#F6F8FA] dark:bg-gray-800 text-[#09090B] dark:text-gray-100 text-sm rounded-lg focus:ring-2 outline-none transition-colors pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            {showNewPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                            {errors.newPassword.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-xs font-archivo font-medium text-[#36394A] dark:text-gray-300 mb-2">
                        Confirm password
                    </label>
                    <div className="relative">
                        <input
                            {...register('confirmPassword')}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className={`w-full px-4 py-3 border ${errors.confirmPassword
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-[#ECEFF3] dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500'
                                } bg-[#F6F8FA] dark:bg-gray-800 text-[#09090B] dark:text-gray-100 text-sm rounded-lg focus:ring-2 outline-none transition-colors pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`px-8 py-3 font-medium rounded-lg transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none dark:focus:ring-offset-gray-900 ${!isValid || isSubmitting
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-orange-500 text-white hover:bg-orange-600'
                            }`}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>

            <ErrorModal
                isErrorModalOpen={isErrorModalOpen}
                setErrorModalState={() => {
                    setErrorModalState(false);
                }}
                subheading={
                    errorModalMessage || "Please check your inputs and try again."
                }
            />
        </div>
    );
}
