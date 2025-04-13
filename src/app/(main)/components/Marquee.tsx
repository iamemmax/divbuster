import React from 'react'
import EthereumeIcon from '@/app/icons/EthereumeIcon'
import BitcoinIcon from '@/app/icons/BitcoinIcon'
import RippleIcon from '@/app/icons/RippleIcon'

const Marquee = () => {
    const array =[
        {
            icon:<RippleIcon/>,
            name:"Ripple",
            value:"₦10,000"
        },
        {
            icon:<EthereumeIcon/>,
            name:"Ethereume",
            value:"₦10,000"
        },
        {
            icon:<BitcoinIcon/>,
            name:"Bitcoin",
            value:"₦10,000"
        },
        {
            icon:<RippleIcon/>,
            name:"Ripple",
            value:"₦10,000"
        },
        {
            icon:<EthereumeIcon/>,
            name:"Ethereume",
            value:"₦10,000"
        },
        {
            icon:<BitcoinIcon/>,
            name:"Bitcoin",
            value:"₦10,000"
        },
       
    ]
  return (
    <div className='w-full bg-white py-[2.25rem]'>
{
    array.map((item,idx:number)=>(
        <div className="" key={idx}>
            
        </div>
    ))
}
    </div>
  )
}

export default Marquee
