'use client';

interface PersonalProps {
  isSelected?: boolean;
}

export function Personal({ isSelected }: PersonalProps) {
  return (
    <svg
      fill="none"
      height={20}
      viewBox="0 0 20 20"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 18.333h5c4.167 0 5.833-1.667 5.833-5.834v-5c0-4.166-1.666-5.833-5.833-5.833h-5c-4.167 0-5.833 1.667-5.833 5.833v5c0 4.167 1.666 5.834 5.833 5.834Z"
        stroke={isSelected ? '#5879FD' : '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M11.96 9.091a1.965 1.965 0 0 1-.917 1.392v1.65a1.042 1.042 0 0 1-2.084 0v-1.65c-.483-.3-.833-.8-.916-1.392a1.652 1.652 0 0 1-.025-.291 1.98 1.98 0 0 1 2.516-1.9 1.965 1.965 0 0 1 1.384 1.383c.075.275.083.55.041.808Zm6.375.001H11.96m-3.918 0H1.667"
        stroke={isSelected ? '#5879FD' : '#fff'}
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
}
