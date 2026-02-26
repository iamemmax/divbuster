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

// ✅ Number validation (digits only, max 11)
const numberField = z
  .string()
  .regex(/^\d+$/, "Must contain only numbers")
  .max(11, "Maximum 11 digits allowed")
  .min(1, "This field is required");

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
  certificate_no: numberField,
  school_name: z.string().min(1, "school_name is required"),
  trainer_name: z.string().min(1, "trainer_name is required"),
  trainer_phone: numberField,
  default: z.boolean().optional(),
});

export type Certificate = z.infer<typeof certificateSchema>;


// ✅ Issuer colors mapping
export const ISSUER_COLORS = {
  padi: { bg: "#1B3A8A", text: "#E8EEFF" },      // Blue
  ssi: { bg: "#7A1030", text: "#F7E8EC" },       // Red
  naui: { bg: "#0D3D2E", text: "#E8F7F2" },      // Green
  sdi: { bg: "#5C3A0A", text: "#F7F0E8" },       // Brown
  tdi: { bg: "#252070", text: "#E8E8F7" },       // Purple
  cmas: { bg: "#0A3352", text: "#E8F2F7" },      // Dark Blue
  raid: { bg: "#45106A", text: "#F0E8F7" },      // Dark Purple
  iantd: { bg: "#2E3540", text: "#DDE3EB" },     // Gray
  bsac: { bg: "#0C4840", text: "#E8F5F4" },      // Teal
  nase: { bg: "#5C2010", text: "#F7EEE8" },      // Dark Brown
  andi: { bg: "#600F30", text: "#F5E8EE" },      // Maroon
  utd: { bg: "#0B5C55", text: "#E8F6F5" },       // Cyan
  psai: { bg: "#3D1B6E", text: "#EEE8F7" },      // Indigo
  idda: { bg: "#1B4A3A", text: "#E8F5F0" },      // Dark Green
  acuc: { bg: "#2C3E50", text: "#ECF0F1" },      // Slate
  others: { bg: "#4A5568", text: "#E2E8F0" },    // Gray
} as const;

export const CERTIFICATE_TYPE_CHOICES_WITH_BG = [
  { value: "intro",               label: "Intro",                   bg: "#1B3A5C", text: "#E8F0F7" },
  { value: "try",                 label: "Try",                     bg: "#5C1B1B", text: "#F7E8E8" },
  { value: "snorkel",             label: "Snorkel",                 bg: "#1B4A3A", text: "#E8F5F0" },
  { value: "free",                label: "Free",                    bg: "#2C3E50", text: "#ECF0F1" },
  { value: "adv_free",            label: "Advanced Free",           bg: "#3D1B6E", text: "#EEE8F7" },
  { value: "master_free",         label: "Master Free",             bg: "#5C3A0A", text: "#F7F0E8" },
  { value: "scuba",               label: "Scuba",                   bg: "#1A2535", text: "#D6E4F0" },
  { value: "open",                label: "Open Water",              bg: "#1B3A8A", text: "#E8EEFF" },
  { value: "adv_open",            label: "Advanced Open",           bg: "#2E2A85", text: "#ECEEFF" },
  { value: "rescue",              label: "Rescue",                  bg: "#7A1030", text: "#F7E8EC" },
  { value: "master",              label: "Master",                  bg: "#252070", text: "#E8E8F7" },
  { value: "fun",                 label: "Fun Dive",                bg: "#0D3D2E", text: "#E8F7F2" },
  { value: "adv_adventurer",      label: "Advanced Adventurer",     bg: "#45106A", text: "#F0E8F7" },
  { value: "nitrox",              label: "Nitrox",                  bg: "#0E3D30", text: "#E8F7F3" },
  { value: "deep",                label: "Deep",                    bg: "#0A3352", text: "#E8F2F7" },
  { value: "wreck",               label: "Wreck",                   bg: "#2E3540", text: "#DDE3EB" },
  { value: "night",               label: "Night",                   bg: "#0D0D0D", text: "#C8D0DC" },
  { value: "ppb",                 label: "Peak Performance Buoyancy", bg: "#380A42", text: "#F0E8F5" },
  { value: "dry",                 label: "Dry Suit",                bg: "#0C4840", text: "#E8F5F4" },
  { value: "search_recover",      label: "Search & Recovery",       bg: "#5C2010", text: "#F7EEE8" },
  { value: "nav",                 label: "Navigation",              bg: "#52300A", text: "#F7F2E8" },
  { value: "photo",               label: "Photography",             bg: "#600F30", text: "#F5E8EE" },
  { value: "cmas1",               label: "CMAS 1",                  bg: "#1B3A8A", text: "#E8EEFF" },
  { value: "cmas2",               label: "CMAS 2",                  bg: "#173DA8", text: "#E8EDFF" },
  { value: "cmas3",               label: "CMAS 3",                  bg: "#1A4BC8", text: "#E8EEFF" },
  { value: "tech40",              label: "Tech 40",                 bg: "#0D3E38", text: "#E8F5F4" },
  { value: "tech45",              label: "Tech 45",                 bg: "#0A6B62", text: "#E8F7F6" },
  { value: "tech50",              label: "Tech 50",                 bg: "#0B5C55", text: "#E8F6F5" },
  { value: "sidemount",           label: "Sidemount",               bg: "#252070", text: "#E8E8F7" },
  { value: "trimix",              label: "Trimix",                  bg: "#5C1B1B", text: "#F7E8E8" },
  { value: "adv_trimix",         label: "Advanced Trimix",         bg: "#6E1515", text: "#F7E8E8" },
  { value: "cave",                label: "Cave",                    bg: "#2A2A2E", text: "#D8D8DC" },
  { value: "rebreather",          label: "Rebreather",              bg: "#252E3A", text: "#D6DDE6" },
  { value: "dive_master",         label: "Dive Master",             bg: "#0E3D20", text: "#E8F7ED" },
  { value: "assistant_instructor",label: "Assistant Instructor",    bg: "#5C3A08", text: "#F7F0E8" },
  { value: "instructor",          label: "Instructor",              bg: "#926B04", text: "#FFF8E0" },
  { value: "staff_instructor",    label: "Staff Instructor",        bg: "#7A3D08", text: "#F7EFE8" },
  { value: "course_director",     label: "Course Director",         bg: "#6E2510", text: "#F7EEE8" },
];