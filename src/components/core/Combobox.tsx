'use client';

import * as React from 'react';

import { cn } from '@/utils/classNames';

import { Button } from './Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './Command';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

interface ComboboxProps {
  id?: string;
  placeholder?: string;
}

export function Combobox({ id, placeholder }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'flex h-10 w-full items-center justify-between gap-2 rounded-md bg-input-bg px-5 py-2 text-left text-xs transition duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50',
              !value && 'text-muted-foreground'
            )}
            id={id}
            type="button"
            variant="unstyled"
          >
            {value ? (
              frameworks.find(framework => framework.value === value)?.label
            ) : (
              <span className="font-normal text-input-placeholder">
                {placeholder || 'Select an option'}
              </span>
            )}

            <span>
              <svg
                fill="none"
                height={7}
                viewBox="0 0 12 7"
                width={12}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-label-text"
                  clipRule="evenodd"
                  d="M8.357 5.522a3.333 3.333 0 0 1-4.581.126l-.133-.126L.41 2.089A.833.833 0 0 1 1.51.84l.078.07L4.82 4.342c.617.617 1.597.65 2.251.098l.106-.098L10.411.91a.833.833 0 0 1 1.248 1.1l-.07.079-3.232 3.433Z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="p-0">
          <Command>
            <CommandInput placeholder={placeholder || 'Select an option'} />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map(framework => (
                <CommandItem
                  className="text-xs"
                  key={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <svg
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                    fill="none"
                    height={16}
                    viewBox="0 0 16 16"
                    width={16}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m14.53 5.03-8 8a.751.751 0 0 1-1.062 0l-3.5-3.5a.751.751 0 1 1 1.063-1.062L6 11.438l7.47-7.469a.751.751 0 0 1 1.062 1.063l-.001-.002Z"
                      fill="#4E4E4E"
                    />
                  </svg>

                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
