import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core";
import { fourthStepProps } from ".";
import { CaretDown } from "@/components/icons";
import { useLanguage } from "../contexts/LanguageContext";
import { useFetchCountry } from "@/app/(main)/(dashboard)/api/fetchCountry";
import DiveBusterBlackLogo from "@/components/icons/DiveBusterBlackLogo";

// Helper function to convert Unicode code points to emoji
export const unicodeToEmoji = (unicodeString: string) => {
  if (!unicodeString || typeof unicodeString !== 'string') return '';
  
  // Split the string by spaces to get individual code points
  return unicodeString.split(' ')
    .map(code => {
      // Remove the "U+" prefix and convert to a number
      const hex = code.replace('U+', '');
      // Convert hex to decimal and then to the corresponding character
      return String.fromCodePoint(parseInt(hex, 16));
    })
    .join('');
};

// Account type validation schema
const createAccountTypeSchema = (t: any) => z.object({
  unit_of_measure: z.string().min(1, { message: t.accountType.errors.unitRequired }),
  temperature: z.string().min(1, { message: t.accountType.errors.temperatureRequired }),
  body_size: z.string().min(1, { message: t.accountType.errors.bodySizeRequired }),
  shoe_size: z.string().min(1, { message: t.accountType.errors.shoeSizeRequired }),
  country: z.string().min(1, { message: t.accountType.errors.countryRequired }),
});

type AccountTypeFormProps = {
  stepFourData: fourthStepProps;
  setStepFourData: React.Dispatch<React.SetStateAction<fourthStepProps>>;
  onNext: () => void;
  onBack: () => void;
};

const AccountTypeForm = ({
  stepFourData,
  setStepFourData,
  onNext,
  onBack,
}: AccountTypeFormProps) => {
  const { t } = useLanguage();
  
  // Create schema with translated error messages
  const accountTypeSchema = createAccountTypeSchema(t);
  
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: {
      unit_of_measure: stepFourData.unit_of_measure || "",
      temperature: stepFourData.temperature || "",
      body_size: stepFourData.body_size || "",
      shoe_size: stepFourData.shoe_size || "",
      country: stepFourData.country || "",
    },
    mode: "onChange",
  });

  const unitOfMeasure = watch("unit_of_measure");
  const temperature = watch("temperature");
  const bodySize = watch("body_size");
  const shoeSize = watch("shoe_size");
  const country = watch("country");

  const [openDropdowns, setOpenDropdowns] = useState({
    unitOfMeasure: false,
    temperature: false,
    bodySize: false,
    shoeSize: false,
    country: false,
  });

  const handleOpenChange = (field: string, isOpen: boolean) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [field]: isOpen,
    }));
  };

  const handleValueChange = (field: "unit_of_measure" | "temperature" | "body_size" | "shoe_size" | "country", value: string) => {
    setValue(field, value, { shouldValidate: true });
  };

  const onSubmit = (data: any) => {
    setStepFourData({
      unit_of_measure: data.unit_of_measure,
      temperature: data.temperature,
      body_size: data.body_size,
      shoe_size: data.shoe_size,
      country: data.country,
    });
    onNext();
  };

  // Sample data for dropdowns
  const unitOptions = [
    { value: "metric", label: t.accountType.metricOption },
    { value: "imperial", label: t.accountType.imperialOption },
  ];

  const temperatureOptions = [
    { value: "C", label: t.accountType.celsiusOption },
    { value: "F", label: t.accountType.fahrenheitOption },
    { value: "K", label: t.accountType.kelvinOption },
  ];

  const bodySizeOptions = [
    t.accountType.xsmallOption,
    t.accountType.smallOption,
    t.accountType.mediumOption,
    t.accountType.largeOption,
    t.accountType.xlargeOption,
  ];

  const shoeSizeOptions = [
    t.accountType.euOption,
    t.accountType.usOption,
    t.accountType.ukOption,
  ];

  const { data: fetchCountry } = useFetchCountry();

  return (
    <div className="xl:px-[9.125rem] w-full md:px-[30px] px-6 py-[30px] xl:py-[7rem]">
      <div className="flex justify-center mb-7 items-center md:hidden">
        <DiveBusterBlackLogo />
      </div>
    
      <div className="flex justify-center items-center flex-col">
        <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
          {t.accountType.title}
        </h2>
        <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base">
          {t.accountType.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="unit_of_measure" className="block text-gray-700 font-medium mb-2">
            {t.accountType.unitOfMeasure}
          </label>
          <Select
            value={unitOfMeasure}
            onValueChange={(value) => handleValueChange('unit_of_measure', value)}
            onOpenChange={(open) => handleOpenChange('unitOfMeasure', open)}
          >
            <div className="relative">
              <SelectTrigger
                id="unit_of_measure"
                className={`border ${errors.unit_of_measure ? 'border-red-500' : 'border-[#E2E8F0]'} w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem] pr-10`}
              >
                <SelectValue 
                  placeholder={t.accountType.selectUnit}
                  className="text-[#8D9196] text-sm font-archivo font-medium"
                />
              </SelectTrigger>
              <CaretDown 
                color="#8D9196"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                  openDropdowns.unitOfMeasure ? 'rotate-180' : ''
                }`}
              />
            </div>
            <SelectContent>
              <SelectItem
                className="hidden"
                disabled
                value=""
                style={{
                  color: "red",
                  fontWeight: 500,
                  fontFamily: "Archivo",
                  fontSize: "12px",
                }}
              >
                {t.accountType.selectUnit}
              </SelectItem>
              {unitOptions?.map((option) => (
                <SelectItem
                  key={option?.value}
                  value={option?.value}
                  className="px-2"
                >
                  {option?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.unit_of_measure && (
            <p className="text-red-500 text-xs mt-1">{errors.unit_of_measure.message as string}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="temperature" className="block text-gray-700 font-medium mb-2">
            {t.accountType.temperature}
          </label>
          <Select
            value={temperature}
            onValueChange={(value) => handleValueChange('temperature', value)}
            onOpenChange={(open) => handleOpenChange('temperature', open)}
          >
            <div className="relative">
              <SelectTrigger
                id="temperature"
                className={`border ${errors.temperature ? 'border-red-500' : 'border-[#E2E8F0]'} w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem] pr-10`}
              >
                <SelectValue 
                  placeholder={t.accountType.selectTemperature}
                  className="text-[#8D9196] text-sm font-archivo font-medium"
                />
              </SelectTrigger>
              <CaretDown 
                color="#8D9196"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                  openDropdowns.temperature ? 'rotate-180' : ''
                }`}
              />
            </div>
            <SelectContent>
              <SelectItem
                className="hidden text-[#8D9196]"
                disabled
                value=""
                style={{
                  color: "#8D9196",
                  fontWeight: 500,
                  fontFamily: "Archivo",
                  fontSize: "12px",
                }}
              >
                {t.accountType.selectTemperature}
              </SelectItem>
              {temperatureOptions.map((option) => (
                <SelectItem
                  key={option?.value}
                  value={option?.value as string}
                  className="px-2"
                >
                  {option?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.temperature && (
            <p className="text-red-500 text-xs mt-1">{errors.temperature.message as string}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="body_size" className="block text-gray-700 font-medium mb-2">
            {t.accountType.bodySize}
          </label>
          <Select
            value={bodySize}
            onValueChange={(value) => handleValueChange('body_size', value)}
            onOpenChange={(open) => handleOpenChange('bodySize', open)}
          >
            <div className="relative">
              <SelectTrigger
                id="body_size"
                className={`border ${errors.body_size ? 'border-red-500' : 'border-[#E2E8F0]'} w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem] pr-10`}
              >
                <SelectValue 
                  placeholder={t.accountType.selectBodySize}
                  className="text-[#8D9196] text-sm font-archivo font-medium"
                />
              </SelectTrigger>
              <CaretDown 
                color="#8D9196"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                  openDropdowns.bodySize ? 'rotate-180' : ''
                }`}
              />
            </div>
            <SelectContent>
              <SelectItem
                className="hidden"
                disabled
                value=""
                style={{
                  color: "#8D9196",
                  fontWeight: 500,
                  fontFamily: "Archivo",
                  fontSize: "12px",
                }}
              >
                {t.accountType.selectBodySize}
              </SelectItem>
              {bodySizeOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="px-2"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.body_size && (
            <p className="text-red-500 text-xs mt-1">{errors.body_size.message as string}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="shoe_size" className="block text-gray-700 font-medium mb-2">
            {t.accountType.shoeSize}
          </label>
          <Select
            value={shoeSize}
            onValueChange={(value) => handleValueChange('shoe_size', value)}
            onOpenChange={(open) => handleOpenChange('shoeSize', open)}
          >
            <div className="relative">
              <SelectTrigger
                id="shoe_size"
                className={`border ${errors.shoe_size ? 'border-red-500' : 'border-[#E2E8F0]'} w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem] pr-10`}
              >
                <SelectValue 
                  placeholder={t.accountType.selectShoeSize}
                  className="text-[#8D9196] text-sm font-archivo font-medium"
                />
              </SelectTrigger>
              <CaretDown 
                color="#8D9196"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                  openDropdowns.shoeSize ? 'rotate-180' : ''
                }`}
              />
            </div>
            <SelectContent>
              <SelectItem
                className="hidden"
                disabled
                value=""
                style={{
                  color: "#8D9196",
                  fontWeight: 500,
                  fontFamily: "Archivo",
                  fontSize: "12px",
                }}
              >
                {t.accountType.selectShoeSize}
              </SelectItem>
              {shoeSizeOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="px-2"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.shoe_size && (
            <p className="text-red-500 text-xs mt-1">{errors.shoe_size.message as string}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
            {t.accountType.country}
          </label>
          <Select
            value={country}
            onValueChange={(value) => handleValueChange('country', value)}
            onOpenChange={(open) => handleOpenChange('country', open)}
          >
            <div className="relative">
              <SelectTrigger
                id="country"
                className={`border ${errors.country ? 'border-red-500' : 'border-[#E2E8F0]'} w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem] pr-10`}
              >
                <SelectValue 
                  placeholder={t.accountType.selectCountry}
                  className="text-[#8D9196] text-sm font-archivo font-medium"
                />
              </SelectTrigger>
              <CaretDown 
                color="#8D9196"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                  openDropdowns.country ? 'rotate-180' : ''
                }`}
              />
            </div>
            <SelectContent>
              <SelectItem
                className="hidden"
                disabled
                value=""
                style={{
                  color: "#8D9196",
                  fontWeight: 500,
                  fontFamily: "Archivo",
                  fontSize: "12px",
                }}
              >
                {t.accountType.selectCountry}
              </SelectItem>
              {fetchCountry?.results.map((option) => (
                <SelectItem
                  key={option.id}
                  value={option?.id.toString()}
                  className="px-2"
                >
                  <div className="flex items-center gap-2">
                    {option.alpha2code ? (
                      <img
                        src={`https://flagcdn.com/${option.alpha2code.toLowerCase()}.svg`}
                        alt={`${option.name} flag`}
                        className="w-5 h-5 rounded-sm object-cover"
                      />
                    ) : option.flag_link.includes('U+') ? (
                      <span className="text-xl">{unicodeToEmoji(option.flag_link)}</span>
                    ) : (
                      <img
                        src={option.flag_link}
                        alt={`${option.name} flag`}
                        className="w-5 h-5 rounded-sm object-cover"
                      />
                    )}
                    {option.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country.message as string}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={onBack}
            className="flex-1 bg-white border border-[#F7931D] text-[#F7931D] py-3 rounded-lg font-medium"
          >
            {t.accountType.backButton}
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#F7931D] text-white py-3 rounded-lg font-medium"
          >
            {t.accountType.nextButton}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountTypeForm;

