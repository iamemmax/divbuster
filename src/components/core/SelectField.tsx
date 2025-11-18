import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { SmallSpinner } from "@/icons/core";
import { FieldError } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  field: {
    value: string | number;
    onChange: (value: string | number) => void;
  };
  className?: string | undefined
  placeholder?: string;
  options: Option[];
  label?: string;
  onReachEnd?: () => void; // 👈 callback when scrolled to bottom
  loading?: boolean;       // 👈 loading prop
  error?: FieldError ;         // 👈 new error prop
}

const SelectField = ({
  field,
  placeholder = "Select an option",
  options,
  label,
  onReachEnd,
  loading = false,
  error,
  className
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === field.value);

  // 👇 Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 👇 Handle scroll in dropdown
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const bottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 20; // 20px threshold
    if (bottom && onReachEnd) {
      onReachEnd();
    }
  };

  return (
    <div className={`space-y-2  w-full grid items-center ${label ? "grid-cols-1":"grid-cols-1 md:grid-cols-[1fr_2fr]"} `}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative !w-full" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-3 text-left bg-white dark:bg-gray-800 border rounded-lg flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error 
              ? 'border-red-500 dark:border-red-500 hover:border-red-600 dark:hover:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
          } ${className}`}
        >
          <span
            className={
              selectedOption
                ? "text-gray-900 dark:text-white"
                : "text-gray-500"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-300" />
        </button>

        {isOpen && (
          <div
            className="absolute z-[9999999999999999999] w-full mt-1 bg-white dark:bg-gray-800 border max-h-[300px] overflow-y-auto border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
            onScroll={handleScroll}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  field.onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg text-gray-900 dark:text-white"
              >
                {option.label}
              </button>
            ))}

            {/* 👇 Loader row */}
            {loading && (
              <div className="flex justify-center gap-3 items-center p-3 text-sm text-gray-500 dark:text-gray-400">
                <SmallSpinner color="#E79B0C"/> Loading
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;