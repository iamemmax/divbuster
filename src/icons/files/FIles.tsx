// Word (blue)
export const WordLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} key={"word"}>
    <rect width="24" height="24" fill="#2B579A" rx="4"/>
    <text x="12" y="16" font-size="12" font-weight="bold" fill="#fff" text-anchor="middle">W</text>
  </svg>
);

// Excel (green)
export const ExcelLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} kernelMatrix={"Excell"}>
    <rect width="24" height="24" fill="#217346" rx="4"/>
    <text x="12" y="16" font-size="12" font-weight="bold" fill="#fff" text-anchor="middle">X</text>
  </svg>
);

// PowerPoint (orange)
export const PptLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} key={"Ppt"}>
    <rect width="24" height="24" fill="#D24726" rx="4"/>
    <text x="12" y="16" font-size="12" font-weight="bold" fill="#fff" text-anchor="middle">P</text>
  </svg>
);

// PDF (red)
export const PdfLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} key={"Pdf"}>
    <rect width="24" height="24" fill="#E9535F" rx="4"/>
    <text x="12" y="16" font-size="12" font-weight="bold" fill="#fff" text-anchor="middle">PDF</text>
  </svg>
);
