import React from 'react'

export default function PolicyExclusions() {
    const policy:any[] =[
        {
            description:"Conditions caused by an Act of War, an Epidemic or Enrollee participating in a Riot, Civil disobedience , Domestic Violence."
        },
        {
            description:"Cosmetic Treatments and  Procedures"
        },
        {
            description:"Epidemic and Pandemic"
        },
        {
            description:"Alternative/ Un-orthodox Medicine "
        },
        {
            description:"Domiciliary/ Hospice Care"
        },
        {
            description:"Neonatal care not listed under neonatal services"
        },
        {
            description:"Self Inflicted Injuries"
        },
        {
            description:"Congenital Anomalies for Children not born on the plan"
        },
        {
            description:"Services Primarily for Weight Reduction or Treatment of Obesity"
        },
        {
            description:"Treatment of Substance Abuse"
        },
        {
            description:"Professional Sports and willful Exposure to Needless Danger"
        },
        {
            description:"School Admission Test"
        },
        {
            description:"All Procedure , Management and Investigations not written/stated and Covered by the Plan. "
        },
        {
            description:"All types of Dental or Orthodontic Cosmetic Procedure including Cost of Consultation, Examination, Medication, Procedures,Follow-Up Visits, and Teeth Whitening, Dental Prosthesis, Dental and Surgical Implants."
        },
        {
            description:"Donor Costs associated with Transplant Surgeries "
        },
        {
            description:"Autopsies"
        },
        {
            description:"Hormonal Therapy(Anabolic Steroids and Testoterone)"
        },
        {
            description:"Occupational Injuries and Hazards"
        },
    ]
  return (
    <div className='font-sans mt-10'>
        <h1 className='text-[#032282] font-bold bg-[#F6F9FF] py-3 pl-20'>Policy Exclusions</h1>
        <div className='mt-4 pl-14'>
            {
                policy.map((item, index) => (
                    <div key={index} className='list-item list-outside'>
                        <ol className='flex'>
                            <li className='pt-3 text-sm'>{item?.description}</li>
                        </ol>
                    </div>
                ))
            }
        </div>
    </div>
  )
}