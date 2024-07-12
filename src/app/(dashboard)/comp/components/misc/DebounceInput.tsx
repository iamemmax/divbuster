"use client";
import React, { useEffect, useState } from "react";
// import { Search } from "../../icons";
interface Prop {
  debounce?: number;
  onChange: (payload: string) => void;
  value: string;
}
const DebounceInput = ({
  value: initialValue,
  debounce = 500,
  onChange,
  ...props
}: Prop) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <div className="border-[.0313rem] gap-x-2 border-[#D6D6D6] flex items-center  text-xs  h-[2.3rem]  px-[1.3rem] rounded">
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
          stroke="#8C8CA1"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <input
        className="h-full border-none outline-none"
        onChange={(e) => setValue(e.target.value)}
        {...props}
        placeholder="Search "
        type="text"
        value={value}
      />
    </div>
  );
};

export default DebounceInput;
