import { Button, Modal } from '@/components/core'
import { useBooleanStateControl } from '@/hooks'
import React from 'react'

interface data {
    trans: {
        item: string;
        value: string
    }[];
    wallet:{
        item:string;
        value:string
    }[];
    other:{
        item:string
        value:string
    }[]
}


const TransactionsReceipts = () => {
    const data: data[] = [{
        trans:[
           { 
            item:"10,000",
            value:"successful"
        }
        ],
        wallet: [
            {
                item: "Wallet type",
                value: "Main Wallet"
            },
            {
                item: "Transaction type",
                value: "Credit"
            },
            {
                item: "Paid by",
                value: "Olamide Keulere"
            },
            {
                item: "Narration",
                value: "Your Health Cover"
            },],

        other:[
            {
                item: "Transaction ref",
                value: "NF20394029DG"
            },
            {
                item: "Transaction status",
                value: "Successful"
            },
            {
                item: "Date",
                value: "Jul 16 2024"
            },
            {
                item: "Time",
                value: "8:01am"
            },
        ]
    }
    ]

    const {
        state: isModalOpen,
        setTrue: openModal,
        setFalse: closeModal
    } = useBooleanStateControl()
    return (
        <div>
            <Button className="rounded-10 bg-[#F6F9FF] py-1 px-3 text-[#242424] text-xs" onClick={openModal}>
                Details</Button>

            <Modal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                label='Transaction Details'
                width='400px'
                allowDismiss
                className='bg-[#080D27] border-[0.3px] border-[#407BFF] rounded-b-2xl text-white pb-6 px-6'
            >
                <article>
                    <div>
                        {
                            data.map((item, index) => 
                                <div key={index}>
                                    <div>
                                        <p className='text-[#FFFFFF99] text-sm'>Amount:</p>
                                        <div>{item?.trans?.map((items, index) => 
                                            <div key={index} className='flex justify-between items-center'>
                                                <p className='text-xl font-bold text-[#FFFFFFCC]'>{items?.item}</p>
                                                <p className='rounded-full bg-[#FFFFFF1A] text-white px-6 py-2'>{items?.value}</p>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                    <div>
                                        {item?.wallet?.map((items, index) =>
                                            <div key={index} className='flex justify-between items-center py-2'>
                                                <p className='text-[#FFFFFF99] text-sm'>{items?.item}</p>
                                                <p className='text-[#FFFFFFCC] text-sm'>{items?.value}</p>
                                            </div>
                                        )}
                                    </div>
                                    <p>Other details</p>
                                    <div>
                                        {item?.other?.map((items, index) =>
                                            <div key={index} className='flex justify-between items-center py-2'>
                                                <p className='text-[#FFFFFF99] text-sm'>{items?.item}</p>
                                                <p className='text-[#FFFFFFCC] text-sm'>{items?.value}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </article>
            </Modal>
        </div>
    )
}

export default TransactionsReceipts