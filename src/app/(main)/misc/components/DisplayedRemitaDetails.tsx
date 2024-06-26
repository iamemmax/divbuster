"use client";
import * as React from "react";

interface DisplayedRemitaDetailsProps {
  name: string | any;
  Ministry: string | any
  State: string | any
  
  
}

const DisplayedRemitaDetails: React.FunctionComponent<DisplayedRemitaDetailsProps> = ({
   name,
   Ministry,
   State,
  
}) => {
  return (

    <div className="bg-[#2D3455] w-full p-5 rounded-xl">

        <div className="w-full text-[#fff]">
            <div className="flex gap-[0.3rem]">
                <p className="">Full Name: </p>
                <p className="">{name}</p>
            </div>

            <div className="flex w-full gap-[0.8rem] text-[#fff] mt-5 flex-nowrap">
                <p className="">Ministry: </p>
                <p className="">{Ministry}</p>
            </div>

            <div className="flex gap-[3rem] mt-5">
                <p className="">State : </p>
                <p className="">{State}</p>
            </div>


        </div>


    </div>
    
  );
};

export default DisplayedRemitaDetails;
