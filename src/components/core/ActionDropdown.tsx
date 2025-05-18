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
          `w-full md:w-auto font-archivo font-medium text-base ${isOpen ? "bg-white text-[#101828] border border-[#F7931D]" : "bg-[#F7931D] text-white"} hover:bg-[#e88616] hover:text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center`,
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
              {item.href ? (
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700",
                    item.active && "bg-[#FFF6EA] dark:bg-gray-700"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  <span className="text-[#132346] font-archivo text-sm dark:text-white">{item.label}</span>
                  {item.active && (
                    <svg className="ml-auto text-orange-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>
              ) : (
                <Button
                  className={cn(
                    "flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700",
                    item.active && "bg-orange-50 dark:bg-gray-700"
                  )}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
                  {item.active && (
                    <svg className="ml-auto text-orange-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

