import { z } from "zod";

export const CERTIFICATE_TYPE_CHOICES = [
  "intro", "try", "snorkel",
  "free", "adv_free", "master_free",

  "scuba", "open", "adv_open",
  "rescue", "master", "fun", "adv_adventurer",

  "nitrox", "deep", "wreck", "night",
  "ppb", "dry", "search_recover",
  "nav", "photo",

  "cmas1", "cmas2", "cmas3",

  "tech40", "tech45", "tech50", "sidemount",
  "trimix", "adv_trimix", "cave", "rebreather",

  "dive_master", "assistant_instructor", "instructor",
  "staff_instructor", "course_director",
] as const;

const certificateTypeEnum = z.enum(CERTIFICATE_TYPE_CHOICES);

export const CERTIFICATE_ISSUER_CHOICES = [
  "padi", "ssi", "naui",
  "sdi", "tdi",
  "cmas", "raid", "iantd", "bsac",
  "nase", "andi", "utd", "psai",
  "idda", "acuc", "others",
] as const;

const certificateIssuerEnum = z.enum(CERTIFICATE_ISSUER_CHOICES);

// ✅ Date string validation
const dateString = z
  .string()
  .refine(
    (val) => /^\d{4}-\d{2}-\d{2}$/.test(val),
    "Invalid date format (expected YYYY-MM-DD)"
  );

// ✅ Image schema (File | URL)
const imageSchema = z.union([
  z.instanceof(File),
  z.string().url().min(1),
]);

// ----------------------
// Certificate Schema
// ----------------------
export const certificateSchema = z.object({
  full_name: z.string().min(1, "full_name is required"),
  issuer: certificateIssuerEnum,
  issuer_name: z.string().optional(),
  certificate_type: certificateTypeEnum,
  image: z.any(),
  dob: dateString,
  issue_date: dateString,
  certificate_no: z.string().min(1, "certificate_no is required"),
  school_name: z.string().min(1, "school_name is required"),
  trainer_name: z.string().min(1, "trainer_name is required"),
  trainer_phone: z.string().min(1, "trainer_phone is required"),
});

export type Certificate = z.infer<typeof certificateSchema>;
