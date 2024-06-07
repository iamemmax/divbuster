'use client';

interface ShopProps {
  isSelected?: boolean;
}

export function Shop({ isSelected }: ShopProps) {
  return (
    <svg
      fill="none"
      height={20}
      viewBox="0 0 20 20"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.508 9.35v3.741c0 3.742 1.5 5.242 5.242 5.242h4.492c3.741 0 5.241-1.5 5.241-5.242V9.35"
        stroke={isSelected ? '#5879FD' : '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M10 10c1.525 0 2.65-1.242 2.5-2.767l-.55-5.567H8.058L7.5 7.233c-.15 1.525.975 2.766 2.5 2.766Z"
        stroke={isSelected ? '#5879FD' : '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.258 10c1.684 0 2.917-1.367 2.75-3.042l-.233-2.292c-.3-2.167-1.133-3-3.317-3h-2.541l.583 5.842c.142 1.375 1.383 2.491 2.758 2.491ZM4.7 10c1.375 0 2.617-1.117 2.75-2.492l.183-1.842.4-4H5.492c-2.184 0-3.017.833-3.317 3L1.95 6.958C1.783 8.633 3.017 9.999 4.7 9.999Zm5.3 4.166c-1.392 0-2.083.692-2.083 2.083v2.084h4.166v-2.084c0-1.391-.691-2.083-2.083-2.083Z"
        stroke={isSelected ? '#5879FD' : '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}
