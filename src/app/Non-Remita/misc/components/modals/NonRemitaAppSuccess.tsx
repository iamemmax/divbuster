
// "use client"
// import React, { ReactNode } from 'react'
// import { ClientOnly, Dialog, DialogContent } from "@/components/core";
// import { DialogBody } from '@/components/core/DialogClone';
// import Link from 'next/link';




// interface UseBooleanStateControlProps {
//     isNonRemitaAppSuccessModalOpen: boolean;
//     setAppSuccessfulModal: React.Dispatch<
//         React.SetStateAction<boolean>
//     >;

//     heading: string;
//     description: ReactNode;
//     subdescription: string;
//     children?: React.ReactNode;
    


// }


// function AppSuccessfulModal({

//     isAppSuccessfulModalOpen,
//     setAppSuccessfulModal,

//     heading,
//     description,
//     subdescription,
//     // children,
    

// }: UseBooleanStateControlProps) {


    


//     return (

//         <div className="rounded-xl">



//             <ClientOnly>

//                 <Dialog open={isAppSuccessfulModalOpen}
//                     onOpenChange={setAppSuccessfulModal}>

//                     <DialogContent className="!overflow-hidden border border-[#407BFF]">




//                         <DialogBody className="bg-[#141B3f] w-full  border-[0.01px] border-[#407BFF]">

//                             <div className="py-1">

//                                 <div className=''>

//                                     <div className="flex items-center justify-center w-full">
//                                         <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80.32" height="80.32" rx="40.16" fill="#fff" /><path d="M43.872 56.137c-1.782 0-4.305-1.254-6.299-7.251l-1.088-3.263-3.263-1.088c-5.982-1.994-7.236-4.516-7.236-6.3 0-1.767 1.254-4.304 7.236-6.314l12.826-4.275c3.202-1.072 5.876-.755 7.523.876s1.964 4.32.891 7.523l-4.275 12.826c-2.01 6.012-4.532 7.266-6.315 7.266m-9.94-22.055c-4.2 1.404-5.695 3.066-5.695 4.154s1.496 2.75 5.695 4.14l3.807 1.268c.333.106.605.378.71.71l1.27 3.807c1.389 4.2 3.066 5.695 4.153 5.695 1.088 0 2.75-1.495 4.155-5.695l4.275-12.825c.77-2.327.634-4.23-.348-5.212s-2.885-1.103-5.196-.333z" fill="#009A49" /><path d="M37.663 45.215a1.12 1.12 0 0 1-.8-.332 1.14 1.14 0 0 1 0-1.602l5.408-5.423a1.14 1.14 0 0 1 1.601 0 1.14 1.14 0 0 1 0 1.602l-5.408 5.423a1.1 1.1 0 0 1-.8.332" fill="#009A49" />
//                                         </svg>
//                                     </div>

//                                     <div className="flex justify-center items-center w-full mt-[1rem]">

//                                         <p className="text-xl  'font-DMSans' font-semibold text-[#fff]">{heading}</p>

//                                     </div>

//                                     <div className="text-center px-[3rem] mt-[0.65rem] ">

//                                         <p className="text-xs text-[#94a3b8] font-normal 'font-DMSans' ">{description}</p>

//                                     </div>


//                                     <div className='bg-[#272D4A] mt-[3.5rem] w-full flex items-center justify-center'>

//                                         <div className=''>

//                                             <p className="text-[#fff] py-[1rem] text-xs font-medium 'font-DMSans' ">{subdescription}</p>

//                                         </div>



//                                     </div>


//                                 </div>

                            

//                                 <div className='w-full flex justify-center items-center gap-[1rem] mt-[1rem] text-sm'>

//                                     <button
//                                         className="rounded-3xl font-normal border-[0.3px] text-[#fff]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
//                                         onClick={() => {
//                                             setAppSuccessfulModal(false)

//                                         }}
//                                     >
//                                         Done
//                                     </button>




//                                     <Link
                                    
//                                     href={`/create-password`}
                                    
//                                     >

//                                     <button
//                                         className="rounded-3xl bg-[#fff] text-[#1B1687]  py-[0.9rem] w-[10rem] shadow-lg font-normal transition-colors delay-150 ease-in-out focus:outline-none "
//                                         onClick={() => {
//                                         }}
//                                     >
//                                         create password
//                                     </button>
                                    
                                    
//                                     </Link>
                                    


//                                 </div>



//                             </div>

//                         </DialogBody>




//                     </DialogContent>


//                 </Dialog>
//             </ClientOnly>


//         </div>





//     )


// }

// export default AppSuccessfulModal;









