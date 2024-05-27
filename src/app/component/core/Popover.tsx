import React from 'react'
import { Popover, PopoverTrigger } from './PopoverPrimitives'
import { CaretDown } from '../icons'

interface props {
    question: string
    content: string
}
const CustomPopover = ({ question, content }: props) => {
    return (
        <Popover>
            <PopoverTrigger className='flex items-center justify-between bg-[#FFFFFF1A] p-[27px] rounded-lg text-[15px] font-normal w-full font-sans'>
                {question}
                <CaretDown />
            </PopoverTrigger>
        </Popover>
    )
}

export default CustomPopover