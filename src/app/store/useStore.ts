import { string } from 'zod';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UserType {
    phone_number: string;
    password: string;
}
interface forgetPasswordType {
  status: boolean;
  message: string;
  phone_number: string;
}

interface userState {
    user: UserType
    addUser: (payload: UserType) => void;
    forgetPasswordDetails: forgetPasswordType
    addForgetPasswordDetails:(payload:forgetPasswordType)=>void
    removeForgetPasswordDetails:()=>void
   
}

const useDataStore = create<userState>()(
    devtools(
        persist(
            (set) => ({
                user: {
                    password: "",
                    phone_number:""
                },
           addUser: payload => {
                    set(state => ({
                        ...state,
                        user: {
                            password: payload?.password,
                            phone_number:payload?.phone_number
                        }

                    }));
                },
                forgetPasswordDetails: {
                    status: false,
                    message: "",
                    phone_number:""
                },
                 addForgetPasswordDetails: payload => {
                    set(state => ({
                        ...state,
                        forgetPasswordDetails: {
                            status: payload?.status,
                            message:payload?.message,
                            phone_number:payload?.phone_number
                        }

                    }));
                },
                removeForgetPasswordDetails: () => set(() => ({ forgetPasswordDetails: {status:false,phone_number:"",message:""} })),
            }),

            {
                name: 'user', // name of the item in the storage (must be unique)
            }
        )
    )
);

export default useDataStore;
