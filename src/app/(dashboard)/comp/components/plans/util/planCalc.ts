import { useQuery } from "react-query";
import { getPecentage } from "../api/fetchPercentagePrice";

  export function getAmountDeduction(
    basePrice: number,
    duration: number,
    numberOfBeneficiary: number,
    percentage: number
  ) {
    if (isNaN(numberOfBeneficiary)) {
      throw new Error("numberOfBeneficiary must be a valid number");
    }
// console.log({"basePrice":basePrice, "duration":duration,"numberOfBeneficiary":numberOfBeneficiary});

    const actualAmount = basePrice * duration * numberOfBeneficiary;
    return actualAmount * (1 - percentage / 100);
  }

  export function calculateActualAmount(
    basePrice: number,
    duration: number,
    numberOfBeneficiaries: number
  ) {
    return basePrice * duration * numberOfBeneficiaries;
}
  

export function getPercentage(type: string, number: number): number {
      
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const percentageData = percentageCalc?.percentage_data[type];

    // Convert number to string for indexing
    const key = number > 8 ? "8" : number.toString();

    if (percentageData && percentageData.hasOwnProperty(key)) {
      return percentageData[key];
    } else {
      return 0; // or some default value if the key doesn't exist
    }
}
  


