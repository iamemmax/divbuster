import { z } from "zod";

export const loginUserSchema = z.object({
    
    email: z
    .string({ required_error: "Please enter your email." })
    .trim()
    .min(1, { message: "Enter your email." })
    .email("Invalid email"),
  
    password: z
    .string({ required_error: "Please enter your password." })
    .trim()
    .min(3, { message: "Password must be at least 5 characters." }),
    // .refine(
    //   (value) =>
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/.test(
    //       value
    //     ),
    //   {
    //     message:
    //       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    //   }
    // ),
   

  
  });