import { adminAxios } from "@/lib/axios"


type UUID = string;
type ISODateString = string;

interface Enrolee {
    id: UUID;
    last_login: ISODateString | null;
    is_superuser: boolean;
    created_at: ISODateString;
    updated_at: ISODateString;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string | null;
    email_verified: boolean;
    phone_number: string;
    phone_verified: boolean;
    address: string | null;
    gender: string | null;
    organization: string | null;
    date_of_birth: ISODateString | null;
    state: string | null;
    due_date: ISODateString | null;
    wema_account_details: string | null;
    account_number: string | null;
    has_set_password: boolean;
    bvn: string | null;
    bvn_verified: boolean;
    nin: string | null;
    nin_verified: boolean;
    hospitals: string | null;
    exists_on_loandisk: boolean;
    loandisk_borrower_id: string | null;
    referral_code: string | null;
    is_a_liberty_staff: boolean;
    new_user_from_packages: boolean;
    new_user_from_packages_and_has_completed_the_flow: boolean;
    has_created_individual_health: boolean;
    is_a_company: boolean;
    is_remita: boolean;
    is_active: boolean;
    profile_image: string | null;
}

interface DataItem {
    id: UUID;
    enrolee: Enrolee;
    plan_type: string;
    insurance_duration: number;
    status: string;
    is_active: boolean;
    amount_paid: number;
    amount: number;
    is_deleted: boolean;
    date_created: ISODateString;
    date_updated: ISODateString;
    activated_date: ISODateString | null;
    due_date: ISODateString | null;
}

interface BeneficiaryData {
    full_name: string;
    phone_number: string;
    email: string | null;
    health_plan_status: string;
    enrollment_number: string | null;
    data: DataItem[];
}


export const getBeneficiaryPlan = async (id:string) => {
    const {data} = await adminAxios.get(`/beneficiary_health_plan_details/${id}/`)
    return data as BeneficiaryData
}