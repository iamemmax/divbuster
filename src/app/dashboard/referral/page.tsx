"use client"
import { UserData } from '@/app/(auth)/(onboarding)/misc/types';
import CopyIcon from '@/app/icons/(dashboard)/CopyIcon';
import ReferralIcon1 from '@/app/icons/(dashboard)/ReferralIcon1';
import ReferralIcon2 from '@/app/icons/(dashboard)/ReferralIcon2';
import WalletIcon from '@/app/icons/(dashboard)/WalletIcon';
import { Button } from '@/components/core';
import useClipboard from '@/hooks/useClipboard copy';
import React, { useState } from 'react'
import Select, { StylesConfig } from "react-select";
import ReferalTable from '../(dashboard)/components/referral/ReferalTable';

type OptionType = {
  label: string;
  value: string;
}

const Page = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [selectedReferralOption, setSelectedReferralOption] = useState<OptionType | null>(null);
    
    const filterStatus: OptionType[] = [
        { label: "today", value: "today" },
        { label: "this Week", value: "this_week" },
        { label: "this month", value: "this_month" },
        { label: "this year", value: "this_year" },
    ];
    const cardsArray = [
        {
            icon:<WalletIcon height={15} width={15}/>,
            title:"Referral Wallet",
            count:"₦300,000,000",
            rate:"Increase from Last Month",
            percentage:"+10%"
        },
        {
            icon:<ReferralIcon1 height={20} width={20}/>,
            title:"Total Referrals",
            count:"22",
            rate:"Increase from Last Month",
            percentage:"+10%"
        },
        {
            icon:<ReferralIcon2 height={20} width={20}/>,
            title:"Verified Signups",
            count:"18",
            rate:"Increase from Last Month",
            percentage:"+10%"
        },
        {
            icon:<ReferralIcon2 height={20} width={20}/>,
            title:"First-time Deposit",
            count:"12",
            rate:"Increase from Last Month",
            percentage:"+10%"
        },
    ]
    
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

    const style: StylesConfig<OptionType, false> = {
        control: (base) => ({
            ...base,
            borderColor: " #eee",
            background: "#090E29",
            height: "2.875rem",
            boxShadow: "none",
            paddingInline: "10px",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "10px",
            borderWidth: "0.3px",
          }),
          option: (provided) => ({
            ...provided,
            color: "#333",
            background: "#fff",
            fontSize: "12px",
            zIndex: "9999999",
            "&:hover": {
              background: "#fff",
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "8px",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "8px",
          }),
    };


    // WalletIcon

  const { copy } = useClipboard();
    
    const handleOption = (selection: OptionType | null) => {
        setSelectedOption(selection);
    };

    const handleSelectChange = (selection: OptionType | null) => {
        if (selection) {
            copy(selection.value);
            setSelectedReferralOption(selection);
        }
    };

    const referralOption = [
        {
          label: "Referral code",
          value: userData?.referral_code || "2436473",
          type: "copy",
        },
        {
          label: "Referral Links",
          value: `https://www.libertylifeplus.com/plan?referral_code=${userData?.referral_code || "2436473"}`,
          type: "copy",
        },
    ];

  
    return (
        <div className=' '>
            <div className="bg-[#090E29] w-full border-[0.3px] border-[#4453DD] rounded-10 p-6">
                <div className="flex justify-between w-full flex-wrap items-center">
                    <div className="flex items-center gap-3">
                        <h2 className='text-white font-verdana font-bold text-2xl'>Overview</h2>
                        <div className="max-w-[8.75rem]">
                        <Select
                            className="w-full rounded-lg capitalize"
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            defaultValue={filterStatus.find(option => option.value === selectedOption?.value)}
                            options={filterStatus}
                            styles={style}
                            isSearchable={false}
                            onChange={handleOption}
                        />
                        </div>
                    </div>
                    <div className="flex  gap-4 justify-between items-center max-sm:mt-3 lg:mt-0">
                        <div className="flex items-center  gap-4">
                            <div className="hidden lg:flex items-start justify-center flex-col gap-x-2 border-[0.3px] border-white bg-[#090E29] px-4 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
                                onClick={() => copy(`https://opticraft/?referral_code=${userData?.referral_code || "2436473"}`)}
                            >
                                <p className="text-white text-[.5rem]">Your unique referral link</p>
                                <div className="flex gap-2">
                                    <p className="text-white max-w-[7rem] text-xxs truncate">
                                        {`https://opticraft/?referral_code=${userData?.referral_code || "2436473"}`}
                                    </p>
                                    <Button className="text-white px-0 py-[.0625rem] flex items-start bg-[#090E29] text-xs font-medium">
                                        <CopyIcon height={15} width={15} fillColor="#fff" />
                                    </Button>
                                </div>
                            </div>
                            <div className="hidden lg:flex items-start justify-center flex-col gap-x-2 bg-[#090E29] border-[0.3px] border-white px-6 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
                                onClick={() => copy(userData?.referral_code || "2436473")}
                            >
                                <p className="text-white text-[.5rem]">Referral Code</p>
                                <div className="flex gap-3">
                                    <p className="text-white max-w-[4rem] text-xxs truncate">
                                        {userData?.referral_code || "2436473"}
                                    </p>
                                    <Button className="text-white px-0 py-[.0625rem] flex items-start bg-transparent text-xs font-medium">
                                        <CopyIcon height={15} width={15} fillColor="#fff" />
                                    </Button>
                                </div>
                            </div>
                            <div className="lg:hidden w-full max-w-[170px]">
                                <Select
                                    options={referralOption}
                                    value={selectedReferralOption}
                                    onChange={handleSelectChange}
                                    placeholder="Select Referral"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    styles={style}
                                    isSearchable={false}
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                />
                            </div>
                            <div className="">
                                <Button className="bg-white text-[#2B3AA6] font-outfit text-sm h-[46px]">
                                    Withdrawal
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4">
{
    cardsArray?.map((card,idx:number)=>(
        <div className="border-[0.5px] border-[#4453DD] p-4 2xl:p-6 rounded-10 flex flex-col gap-4" key={idx}>
           <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-full border-[0.5px] border-[#4453DD]"> {card?.icon}</div>
            <p className='font-outfit text-white text-xs'>{card?.title}</p>
           </div>
           <h2 className='font-outfit text-white text-xl font-bold'>{card?.count}</h2>
           <div className="">
            <p className='font-outfit text-[#00FF31] text-xs'>{card?.percentage} <span className='text-white/70 pl-1'>{ card?.rate}</span></p>
           </div>
        </div>
    ))
}
                </div>

            </div>
                <ReferalTable/>
        </div>
    )
}

export default Page
