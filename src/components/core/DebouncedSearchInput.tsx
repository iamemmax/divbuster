import * as React from 'react';
import { cn } from '@/utils/classNames';
import { useDebounce } from '@/hooks';

interface DebouncedSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  debounceTime?: number;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right'; // 👈 NEW
  containerClassName?: string;
  inputClassName?: string;
}

export const DebouncedSearchInput = React.forwardRef<HTMLInputElement, DebouncedSearchInputProps>(
  ({
    className,
    onSearch,
    debounceTime = 500,
    placeholder = "Search...",
    icon,
    iconPosition = 'right', // 👈 default to 'right'
    containerClassName,
    inputClassName,
    ...props
  }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, debounceTime);

    React.useEffect(() => {
      onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const iconElement = icon || (
      <svg
        className="text-gray-400 dark:text-gray-500"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const iconClasses = "absolute top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500";
    const leftIcon = iconPosition === 'left';
    
    return (
      <div className={cn("relative w-full", containerClassName)}>
        {leftIcon && (
          <div className={cn(iconClasses, "left-3")}>
            {iconElement}
          </div>
        )}
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full px-[1.025rem] py-[.5125rem] rounded-[.2562rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm font-archivo text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-normal",
            leftIcon ? 'pl-10' : 'pr-10',
            inputClassName,
            className
          )}
          ref={ref}
          {...props}
        />
        {!leftIcon && (
          <div className={cn(iconClasses, "right-3")}>
            {iconElement}
          </div>
        )}
      </div>
    );
  }
);

DebouncedSearchInput.displayName = 'DebouncedSearchInput';