import Home from "@/app/(main)/page";
import { Button, ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Input } from "@/components/core";
import { RightUpArrow } from "@/icons/core";
import { useRouter } from "next/navigation";
import { useState } from "react";




interface UseBooleanStateControlProps {
    isDetailsRequestOpen: boolean;
    setDetailsRequest: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    heading: string;
    subheading: string;
    inputTitle: string;
    closeButtonReplacement?: React.ReactNode;
    children?: React.ReactNode;


}


export function DetailsRequest({

    isDetailsRequestOpen,
    setDetailsRequest,

    heading,
    subheading,
    closeButtonReplacement,
    inputTitle,
    children,



}: UseBooleanStateControlProps) {


    return (

        <div className="">

            <Home />

            <ClientOnly>

                <Dialog open={isDetailsRequestOpen}
                    onOpenChange={setDetailsRequest}>


                    <DialogTrigger className="bg-white text-black flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max font-display">

                        Get insurance
                        <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
                            <RightUpArrow className="" width={12} height={12} />
                        </span>
                    </DialogTrigger>

                    <DialogContent>

                        <DialogHeader className="bg-[#1B1687] ">

                            <DialogTitle className="text-[#fff]">
                                {heading}
                            </DialogTitle>


                            {closeButtonReplacement || (
                                <DialogClose className="">Close</DialogClose>
                            )}


                        </DialogHeader>

                        <DialogBody className="bg-[#34307A] w-full ">

                            <div className="py-1">

                                <div className="text-[#fff] font-light">
                                    <DialogDescription>{subheading}</DialogDescription>
                                </div>

                                <div className="my-5">
                                    <form action="">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#FFFFFF]">{inputTitle}</p>
                                            <Input className="text-[#FFFFFF]"
                                                placeholder="Enter your phone number"
                                            />

                                        </div>
                                        <div className="mt-6 md:mt-12">

                                            <Button
                                                type="submit"
                                                className="font-display focus:shadow-outline w-full rounded-lg bg-[#fff] p-4 py-3 font-semibold tracking-wide
    shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"

                                            >
                                                {children}
                                            </Button>

                                        </div>
                                    </form>
                                </div>




                            </div>

                        </DialogBody>


                    </DialogContent>


                </Dialog>
            </ClientOnly>


        </div>





    )


}











