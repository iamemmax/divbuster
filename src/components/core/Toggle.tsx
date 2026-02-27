import {  KeyboardEvent } from 'react';

// Type definitions
type ToggleSize = 'small' | 'medium' | 'large';

interface SizeConfig {
  track: string;
  thumb: string;
  translateOn: string;
  translateOff: string;
}

interface ToggleSwitchProps {
  isOn?: boolean;
  onToggle?: (newState: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
  trackColor?: string;
  label?: string;
  id?: string;
}

// Reusable Toggle Switch Component
function ToggleSwitch({ 
  isOn = false, 
  onToggle, 
  disabled = false,
  size = 'medium',
  className = '',
  activeColor = 'bg-red-500',
  inactiveColor = 'bg-red-500',
  trackColor = 'bg-pink-200',
  label,
  id
}: ToggleSwitchProps) {
   const sizes: Record<ToggleSize, SizeConfig> = {
    small: {
      track: 'h-4 w-14',
      thumb: 'h-8 w-8',
      translateOn: 'translate-x-6',
      translateOff: 'translate-x-0'
    },
    medium: {
      track: 'h-6 w-18',
      thumb: 'h-10 w-10',
      translateOn: 'translate-x-8',
      translateOff: 'translate-x-0'
    },
    large: {
      track: 'h-8 w-22',
      thumb: 'h-12 w-12',
      translateOn: 'translate-x-10',
      translateOff: 'translate-x-0'
    }
  };

  const currentSize = sizes[size] || sizes.medium;

  const handleToggle = (): void => {
    if (!disabled && onToggle) {
      onToggle(!isOn);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`inline-flex items-center  ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'} cursor-pointer`}
        >
          {label}
        </label>
      )}
      
      <div 
        role="switch"
        aria-checked={isOn}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        id={id}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out
          ${currentSize.track} ${trackColor}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-0
        `}
      >
        <div
          className={`
            inline-block rounded-full shadow-md transition-all duration-300 ease-in-out
            ${currentSize.thumb}
            ${isOn ? activeColor : inactiveColor}
            ${isOn ? currentSize.translateOn : currentSize.translateOff}
            ${disabled ? '' : 'hover:shadow-lg'}
          `}
        />
      </div>
    </div>
  );
}


// Export the ToggleSwitch component for reuse
export { ToggleSwitch };
export type { ToggleSwitchProps, ToggleSize };