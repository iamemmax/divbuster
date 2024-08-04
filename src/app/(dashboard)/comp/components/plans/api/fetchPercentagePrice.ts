import { adminAxios } from "@/lib/axios";
interface Percentagedata {
  [planName: string]: {
    [beneficiaryNumber: string]: number;
  };
}

export interface PercentageType {
  percentage_data: Percentagedata;
  base_price: number;
}

export const getPecentage = async (): Promise<PercentageType> => {
  const { data } = await adminAxios.get(`package_plan_percentage/`);
  return data as PercentageType;
};
