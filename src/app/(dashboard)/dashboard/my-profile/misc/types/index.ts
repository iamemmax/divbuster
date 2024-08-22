export interface SuccessMsg {
    // message: string;
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    gender: string;
    hospitals: Hospitals;
    phone_verified: boolean;
    nin: null;
    bvn: string;
    email: string;
    address: string;
}


export interface Hospitals {
    lga: string;
    state: string;
    hospital: string;
    provider_id: string;
}
