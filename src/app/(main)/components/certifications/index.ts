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


export const CERTIFICATE_TYPE_CHOICES_WITH_BG = [
    { value: "intro", label: "Intro", bg: "#1E3A8A", text: "#FFFFFF" },
    { value: "try", label: "Try", bg: "#7F1D1D", text: "#FFFFFF" },
    { value: "snorkel", label: "Snorkel", bg: "#065F46", text: "#FFFFFF" },
    { value: "free", label: "Free", bg: "#1F2937", text: "#FFFFFF" },
    { value: "adv_free", label: "Advanced Free", bg: "#4C1D95", text: "#FFFFFF" },
    { value: "master_free", label: "Master Free", bg: "#78350F", text: "#FFFFFF" },
    { value: "scuba", label: "Scuba", bg: "#0F172A", text: "#FFFFFF" },
    { value: "open", label: "Open Water", bg: "#1E40AF", text: "#FFFFFF" },
    { value: "adv_open", label: "Advanced Open", bg: "#4338CA", text: "#FFFFFF" },
    { value: "rescue", label: "Rescue", bg: "#9F1239", text: "#FFFFFF" },
    { value: "master", label: "Master", bg: "#312E81", text: "#FFFFFF" },
    { value: "fun", label: "Fun Dive", bg: "#064E3B", text: "#FFFFFF" },
    { value: "adv_adventurer", label: "Advanced Adventurer", bg: "#581C87", text: "#FFFFFF" },
    { value: "nitrox", label: "Nitrox", bg: "#064E3B", text: "#FFFFFF" },
    { value: "deep", label: "Deep", bg: "#0C4A6E", text: "#FFFFFF" },
    { value: "wreck", label: "Wreck", bg: "#374151", text: "#FFFFFF" },
    { value: "night", label: "Night", bg: "#000000", text: "#FFFFFF" },
    { value: "ppb", label: "Peak Performance Buoyancy", bg: "#4A044E", text: "#FFFFFF" },
    { value: "dry", label: "Dry Suit", bg: "#115E59", text: "#FFFFFF" },
    { value: "search_recover", label: "Search & Recovery", bg: "#7C2D12", text: "#FFFFFF" },
    { value: "nav", label: "Navigation", bg: "#713F12", text: "#FFFFFF" },
    { value: "photo", label: "Photography", bg: "#831843", text: "#FFFFFF" },
    { value: "cmas1", label: "CMAS 1", bg: "#1E3A8A", text: "#FFFFFF" },
    { value: "cmas2", label: "CMAS 2", bg: "#1D4ED8", text: "#FFFFFF" },
    { value: "cmas3", label: "CMAS 3", bg: "#2563EB", text: "#FFFFFF" },
    { value: "tech40", label: "Tech 40", bg: "#134E4A", text: "#FFFFFF" },
    { value: "tech45", label: "Tech 45", bg: "#0D9488", text: "#FFFFFF" },
    { value: "tech50", label: "Tech 50", bg: "#0F766E", text: "#FFFFFF" },
    { value: "sidemount", label: "Sidemount", bg: "#312E81", text: "#FFFFFF" },
    { value: "trimix", label: "Trimix", bg: "#7F1D1D", text: "#FFFFFF" },
    { value: "adv_trimix", label: "Advanced Trimix", bg: "#991B1B", text: "#FFFFFF" },
    { value: "cave", label: "Cave", bg: "#3F3F46", text: "#FFFFFF" },
    { value: "rebreather", label: "Rebreather", bg: "#334155", text: "#FFFFFF" },
    { value: "dive_master", label: "Dive Master", bg: "#14532D", text: "#FFFFFF" },
    { value: "assistant_instructor", label: "Assistant Instructor", bg: "#854D0E", text: "#FFFFFF" },
    { value: "instructor", label: "Instructor", bg: "#CA8A04", text: "#000000" },
    { value: "staff_instructor", label: "Staff Instructor", bg: "#B45309", text: "#FFFFFF" },
    { value: "course_director", label: "Course Director", bg: "#9A3412", text: "#FFFFFF" },
  ];