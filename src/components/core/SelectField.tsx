import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  field: {
    value: string | number;
    onChange: (value: string | number) => void;
  };
  placeholder?: string;
  options: Option[];
  label?: string;
}

const SelectField = ({ field, placeholder = "Select an option", options, label }: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === field.value);

  return (
    <div className="space-y-2 grid grid-cols-1 md:grid-cols-[1fr_2fr]">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className={selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-300" />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
