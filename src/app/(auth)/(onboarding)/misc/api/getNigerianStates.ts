import { adminAxios } from '@/lib/axios';
import { useQuery } from 'react-query';


export interface StateLists {
    state: string[];
  }

  export interface StateEntity {
    state_name: string;
    
  }

export const getNigerianStateList = async ():Promise<string[]> => {

    const {data} = await adminAxios.get(
        `life-insurance/states/`
    );
    return data;
};


export const useStateListData = () =>
// useQuery([`state_List`, state],() => getNigerianStateList (state));
useQuery({
    queryKey: ['state_List'],
    queryFn:  getNigerianStateList,
  })






