'use client';

interface HRManagementProps {
  isSelected?: boolean;
}

export function HRManagement({ isSelected }: HRManagementProps) {
  return (
    <svg
      fill="none"
      height={20}
      viewBox="0 0 20 20"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m10.767 1.883 5.425 2.925c.633.342.633 1.317 0 1.659l-5.425 2.925a1.614 1.614 0 0 1-1.534 0L3.808 6.467c-.633-.342-.633-1.317 0-1.659l5.425-2.925a1.614 1.614 0 0 1 1.534 0ZM3.008 8.442l5.042 2.525a1.866 1.866 0 0 1 1.025 1.658v4.767a.924.924 0 0 1-1.342.825l-5.041-2.525a1.865 1.865 0 0 1-1.025-1.659V9.267a.924.924 0 0 1 1.341-.825Zm13.984 0-5.042 2.525a1.866 1.866 0 0 0-1.025 1.658v4.767a.924.924 0 0 0 1.342.825l5.041-2.525a1.865 1.865 0 0 0 1.025-1.659V9.267a.924.924 0 0 0-1.341-.825Z"
        stroke={isSelected ? '#5879FD' : '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}
