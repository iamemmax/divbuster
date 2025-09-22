import * as React from 'react';
import { cn } from '@/utils/classNames';
import Link from 'next/link';
import { Button } from './Button';

interface ActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  active?: boolean;
}

interface ActionDropdownProps {
  items: ActionItem[];
  buttonClassName?: string;
  dropdownClassName?: string;
  label?: string;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  items,
  buttonClassName,
  dropdownClassName,
  label = "Select an Action"
}) => {
  const [selected, setSelected] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={toggleDropdown}
        className={cn(
          `w-full md:w-auto font-archivo font-medium text-xs px-2 sm:text-sm md:text-base ${isOpen ? "bg-white text-[#101828] border border-[#F7931D]" : "bg-[#F7931D] text-white"} hover:bg-[#e88616] hover:text-white font-medium py-2.5 md:px-4 rounded-lg flex items-center justify-center`,
          buttonClassName
        )}
      >
        {label}
        <svg 
          className={cn("ml-2 w-5 h-5 transition-transform", isOpen ? "rotate-180" : "")} 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M5 7.5L10 12.5L15 7.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      
      {isOpen && (
        <div 
          className={cn(
            "absolute z-10 w-[250px] right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mt-2",
            dropdownClassName
          )}
        >
          {items?.map((item, index) => (
            <React.Fragment key={index}>
             
                <div
                 className={cn(
                    "flex items-center cursor-pointer text-sm px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700",
                    // item.active && "bg-[#FFF6EA] dark:bg-gray-700"
                  )}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    // setSelected(item?.)
                    setIsOpen(false);
                  }}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
                 
                </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

