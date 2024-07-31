import { adminAxios } from "@/lib/axios";
interface bankListTypes {
  bank_code: string;
  cbn_code: string;
  name: string;
  bank_short_name: string;
  disabled_for_vnuban: string;
  logo: string;
}
export const fetchBankList = async () => {
  const { data } = await adminAxios.get(`wallet/fetch_banks/`);
  return data as bankListTypes[] ;
};