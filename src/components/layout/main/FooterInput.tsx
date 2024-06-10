'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
// import Balancer from 'react-wrap-balancer';

import { Button } from '@/components/core/Button';
import { Input } from '@/components/core/Input';

export const FooterInput: React.FunctionComponent = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/subscribe/?email=${email}`);
  };

  return (
<<<<<<< HEAD
    <div className="mt-1 flex flex-col md:basis-1/2 md:pl-5  lg:ml-[0px]">
=======
    <div className="mt-1 flex flex-col md:basis-1/2 md:pl-5  lg:ml-0">
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
     
        
          <p className=" mt-12 font-sans text-xl font-normal text-white ">
            Subscribe to our{' '}
            <span className="ml-[2px] font-wix-display text-xl font-bold leading-normal">
              Newsletter
            </span>
            :
          </p>
       
    
      <form
<<<<<<< HEAD
        className="mb-8 flex max-w-[100px] items-stretch rounded-lg transition duration-300 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 md:max-w-[27.4375rem] md:flex-row md:gap-[0px] lg:gap-[0px]"
=======
        className="mb-8 flex max-w-[100px] items-stretch rounded-lg transition duration-300 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 md:max-w-[27.4375rem] md:flex-row md:gap-0 lg:gap-0"
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
        onSubmit={handleSubmit}
      >
        <Input
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          className=" h-11 w-80 shrink grow  rounded-none rounded-l-lg bg-white py-4  focus-visible:ring-0 "
          id="email"
          placeholder="Enter your email"
          type="text"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />

        <Button
          className="h-11 w-28 shrink rounded-none rounded-r-lg bg-[#D8E7FF] py-4 font-medium ring-0 focus-visible:outline-none"
          id="join-waitlist"
          type="submit"
        >
          <p className="font-wix-display text-sm font-medium text-[#032282] ">
            Subscribe
          </p>
        </Button>
      </form>
    </div>
  );
};
