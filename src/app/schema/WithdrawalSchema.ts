import { z } from "zod";

export const withdrawalSchema = z.object({
  bank: z
    .string()
    .min(1, { message: "Please select a bank" }),
  
  accountNumber: z
    .string()
    .min(10, { message: "Account number should be at least 10 digits" })
    .regex(/^\d+$/, { message: "Account number must contain only digits" }),
  
  accountName: z
    .string()
    .min(3, { message: "Please enter a valid account name" }),
  
  amount: z
    .string()
    .min(1, { message: "Please enter an amount" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid amount" })
    .refine(
      (val) => {
        const numVal = parseFloat(val);
        return numVal > 0;
      },
      { message: "Amount must be greater than 0" }
    ),
  
  narration: z
    .string()
    .optional(),
});

export type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;