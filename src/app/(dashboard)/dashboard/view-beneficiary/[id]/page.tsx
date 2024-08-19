'use client'

import ViewBeneficiaryHeader from '@/app/(dashboard)/comp/components/viewBeneficiaryHeader'
import React from 'react'
import { useQuery } from 'react-query'
import { getBeneficiaryPlan } from '../../api/getBeneficiaryDetails'
import { format } from 'date-fns'

const BeneficiaryDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { data: beneficiary } = useQuery({
    queryFn: () => getBeneficiaryPlan(id),
    queryKey: ['get-beneficiary']
  })

  console.log(beneficiary)
  return (
    <div>
      <ViewBeneficiaryHeader userData={undefined} loadinUser={false} />
      <div className='px-[120px] bg-[#F0F5FF] flex grow'>
        <section className='grid grid-cols-4'>
          {beneficiary?.map((beneficiaries, index) => {
            return (
              <div key={index}>
                <article className='bg-white p-2 rounded-10 mt-10'>
                  <div className=' bg-[#F0F5FF] rounded-10 px-6 p-4 pb-6'>
                      <p className='text-[#EF4444] bg-[#EF444426] rounded-md px-2 py-1 text-xxs max-w-[74px]'>Expired plan</p>
                    <div className='grid grid-cols-2 mt-2.5'>
                      <div className='text-[#032282] font-medium text-xs'>
                        {beneficiaries.amount}
                        <p className='text-[#8490A8] text-xxs'>Price</p>
                      </div>
                      <div className='text-[#032282] font-medium text-xs'>{beneficiaries.insurance_duration} month
                        <p  className='text-[#8490A8] text-xxs'>Duration</p>
                      </div>
                      <div className='text-[#032282] font-medium text-xs'>{format(beneficiaries.date_created!, 'eee, qo MMM yyyy')}
                        <p  className='text-[#8490A8] text-xxs'>Date Created</p>
                      </div>
                      <div className='text-[#032282] font-medium text-xs'>{beneficiaries.due_date}
                        <p  className='text-[#8490A8] text-xxs'>Expires on</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}

export default BeneficiaryDetailsPage
