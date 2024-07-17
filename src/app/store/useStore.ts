import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UserType {
    phone_number: string;
    password: string;
}

interface CartState {
    user: UserType
    addUser: (payload:UserType) => void;
   
}

const useDataStore = create<CartState>()(
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
                // removeCart: () => set(() => ({ user: {password:""} })),
            }),

            {
                name: 'user', // name of the item in the storage (must be unique)
            }
        )
    )
);

export default useDataStore;
