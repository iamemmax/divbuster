import { z } from "zod";
export const signUpUserSchema = z.object({
    full_name: z
        .string()
        .trim()
        .min(1, { message: "Please enter the name." }).refine(value => !/\d/.test(value), { message: "Name must not contain numbers" }),
    referral: z
        .string()
        .trim()
        .optional(),

    phone_number: z
    .string()
    .min(11, { message: "Phone number should be at least 11 digits" }).regex(
        /^(080|070|090|081|091)\d{8}$/, // Matches numbers starting with 080, 070, 090, 081, or 091 followed by 8 more digits
        {
          message: "Invalid phone number. It should start with 080, 070, 090, 081, or 091 and be 11 digits long.",
        }
      ),
    email: z
    .string({ required_error: "Please enter your email." })
    .trim()
    .min(1, { message: "Invalid email." })
    .email(),
  });
export const signUpUserBvnSchema = z.object({

    bvn: z
    .string()
    .min(11, { message: "bvn should be at least 11 digits" }),
   
  });



  // step 3

export const signUpUserOtpSchema = z.object({

  otp: z
  .string()
  .length(6, "otp must be exactly 6 digits")
  .regex(/^\d+$/, "otp must be numeric"),
   
  });

export const createWidthrawalPin = z.object({

  pin: z
  .string()
  .length(4, "pin must be exactly 4 digits")
  .regex(/^\d+$/, "otp must be numeric"),
   
  });

export const createPasswordSchema = z.object({
 
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
  
   
  });




  