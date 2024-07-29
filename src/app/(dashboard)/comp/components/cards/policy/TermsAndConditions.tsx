import React from 'react'

export default function TermsAndConditions() {
  const data:any[] =[
    {
      description: "The quote is valid for 30 days which is effective from the date proposal is sent to the customer"
    },
    {
      description: "Pricing is based on the assumption of 20 principal lives and above for each plan"
    },
    {
      description: "No moratorium period"
    },
    {
      description: "The age limit on the plan is 65 years"
    },
    {
      description: "Maximum family size of 6 (Principal, spouse and maximum of 4 children)"
    },
    {
      description: "The premium computed is paid annually and additional charges may apply for periodic premiums"
    },
    {
      description: "Open networks of hospital"
    },
    {
      description: "Final contact/negotiations is subject to NEM Health’s terms and condition"
    },
    {
      description: "Age for a dependent is 25 years and below"
    },
  ]
  return (
    <div>
        <h1 className='text-[#032282] font-bold bg-[#F6F9FF] py-3 pl-20'>Terms and Conditions</h1>
        <div className='mt-8 pl-14'>
          {
            data.map((item, index) => (
              <div key={index} className='list-item list-outside'>
                <ul>
                  <li className='pt-3 text-sm'>{item.description}</li>
                </ul>
              </div>
            ))
          }
        </div>
    </div>
  )
}
