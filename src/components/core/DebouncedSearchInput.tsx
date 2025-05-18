import * as React from 'react';
import { cn } from '@/utils/classNames';
import { useDebounce } from '@/hooks';

interface DebouncedSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  debounceTime?: number;
  icon?: React.ReactNode;
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

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full pl-4 px-[1.025rem] py-[.5125rem] rounded-[.2562rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-white focus:outline-none text-sm font-archivo text-[#99999966]/40 font-normal",
            inputClassName,
            className
          )}
          ref={ref}
          {...props}
        />
        {icon ? (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        ) : (
          <svg 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
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
        )}
      </div>
    );
  }
);

DebouncedSearchInput.displayName = 'DebouncedSearchInput';