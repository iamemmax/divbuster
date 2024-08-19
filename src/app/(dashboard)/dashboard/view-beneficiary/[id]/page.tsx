'use client'

import ViewBeneficiaryHeader from '@/app/(dashboard)/comp/components/viewBeneficiaryHeader'
import React from 'react'
import { useQuery } from 'react-query'
import { getBeneficiaryPlan } from '../../api/getBeneficiaryDetails'

const BeneficiaryDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { data: beneficiary } = useQuery({
    queryFn: () => getBeneficiaryPlan(id),
    queryKey: ['get-beneficiary']
  })


  return (
    <div>
      {/* <ViewBeneficiaryHeader userData={undefined} loadinUser={false} />
      <section>
        {beneficiary?.date_activated}
      </section> */}
    </div>
  )
}

export default BeneficiaryDetailsPage
