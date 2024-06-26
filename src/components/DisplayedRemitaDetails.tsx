"use client";

import { shortenNumber } from "@/utils/numbers";
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

    <div className="bg-red-800 w-full">

        <div className="w-full">
            <div className="flex gap-2">
                <p className="">Full Name:</p>
                <p className="">{name}</p>
            </div>

            <div className="flex gap-2">
                <p className="">Ministry:</p>
                <p className="">{Ministry}</p>
            </div>

            <div className="flex gap-2">
                <p className="">State:</p>
                <p className="">{State}</p>
            </div>


        </div>


    </div>
    
  );
};

export default DisplayedRemitaDetails;
