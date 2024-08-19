import { adminAxios } from "@/lib/axios"



interface BeneficiaryData {
    amount : number
    insurance_duration : number
    date_created:string
    date_activated : string
}

export const getBeneficiaryPlan = async (id:string) => {
    const {data} = await adminAxios.get(`/beneficiary_health_plan_details/${id}/`)
    return data as BeneficiaryData
}