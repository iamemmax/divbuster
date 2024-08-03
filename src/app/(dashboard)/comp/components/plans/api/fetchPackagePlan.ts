import { adminAxios } from '@/lib/axios';
interface packagePlanType {
  percentage_data: Percentagedata;
  base_price: number;
}

interface Percentagedata {
  family: Family;
  individual: Individual;
  corporate: Individual;
}

interface Individual {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '8': number;
}

interface Family {
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '8': number;
}
export const getPackagePlans = async () => {
  const { data } = await adminAxios.get(`package_plan_percentage/`);
  return data as packagePlanType;
};