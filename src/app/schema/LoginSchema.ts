import { z } from "zod";

export const loginUserSchema = z.object({
    

    phone_number: z
    .string()
    .min(11, { message: "Phone number should be at least 11 digits" }).regex(
        /^(080|070|090|081|091)\d{8}$/, // Matches numbers starting with 080, 070, 090, 081, or 091 followed by 8 more digits
        {
          message: "Invalid phone number. It should start with 080, 070, 090, 081, or 091 and be 11 digits long.",
        }
      ),

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
      )
    
  });
export const forgetPasswordUserSchema = z.object({
    
    email: z
    .string({ required_error: "Please enter your email." })
    .trim()
    .min(1, { message: "Enter your email." })
    .email("Invalid email"),
  
    
  });