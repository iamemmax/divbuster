"use client"
import Header from '@/app/(main)/components/shared/Header'
import { useParams } from 'next/navigation'
import React from 'react'
import slugify from 'react-slugify'
import { diveLogData } from '../components'
import Image from 'next/image'
import { Button } from '@/components/core'
import DiveTimeChart from '../components/TimeChart'
import ThreeDot from '@/app/icons/(dashboard)/ThreeDot'
import { CylinderIcon } from '@/app/icons/(dashboard)/CylinderIcon'
import DiveLogCharts from '../components/DiveLogCharts'
import SingleDIveLogSidebar from '../components/SingleDiveLogSidebar'
import { usefetchSingleDivLog } from '../../api/div-logs/fetchSingleDivLog'
import { useAuth } from '@/contexts/authentication'
import moment from 'moment'
import { useFetchCountry } from '../../api/fetchCountry'
import { LocationDisplay } from '@/utils/GetLocationFromCordinate'
import { SmallSpinner } from '@/icons/core'
import PenIcon from '@/app/icons/(dashboard)/PenIcon'
import ColorCheckIcon from '@/app/icons/(dashboard)/ColorCheckIcon'
import CupIcon from '@/app/icons/(dashboard)/CupIcon'
import InfoIcon from '@/app/icons/(dashboard)/InfoIcon'
import { Language } from '@/app/(auth)/sign-up/translations'
import { DiveLogDetailsTranslations } from '@/app/(main)/translation/diveLogTranslation'

const DiveLogId = () => {
  const params = useParams()
  const { authState } = useAuth();
  const { user } = authState;
  const { data: fetchCountry } = useFetchCountry();
  const { data, isLoading } = usefetchSingleDivLog(params?.id as string)

    const language: Language = (user?.profile_details?.language as Language)
    const t = DiveLogDetailsTranslations[language] || DiveLogDetailsTranslations?.en;
  const singleDivLog = diveLogData?.find((_item) => slugify(_item?.dive.title) === params?.id);
  const metrics = [
    { label: t?.metrics?.diveTime, value: `${data?.data?.bottom_time}` },
    { label: t?.metrics?.air, value:t?.labels?.gas },
    { label: t?.metrics?.avgDepth, value: `${data?.data?.dive_depth}` },
    { label: t?.metrics?.maxDepth, value: `${data?.data?.dive_plan?.dive_site?.max_depth}` },
    { label:t?.metrics?.water, value: data?.data?.dive_plan?.dive_site?.water_type ?? "" }
  ];

  const cylinderData = [
    {
      id: 1,
      volume: "12L",
      startPressure: {
        bar: 200,
        psi: 1600,
      },
      endPressure: {
        bar: 50,
        psi: 750,
      },
      pressureUsed: {
        bar: 150,
        psi: 1200,
      },
      cylinderType: "Aluminum",
      gas: "EAN32",
    },
  ];
  const getCountry = (id: number) => {
    const filterCountry = fetchCountry?.results?.find((con) => con?.id === id);
    return filterCountry;
  };

  return (
    <div className="text-black dark:text-white">

      <Header
        title={
         t?.title
        }
        subtitle=""
      />

     {
        isLoading ? <div className='flex justify-center items-center py-5'><SmallSpinner /></div> :
          <div className=" md:px-[1.875rem] h-[83vh] overflow-y-auto">
            <div className=" 2xl:mt-[1.125rem]  py-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 w-full">
              <div className="">
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 cursor-pointer p-[1.875rem] px-4 md:px-[2.2813rem]"
                >
                  <div className="flex items-center justify-between w-full  mb-6">
                    <div className="flex items-start space-x-4 w-full">
                      <div className="relative shrink-0 md:h-[60px]  md:w-[60px] h-[40px] w-[40px] rounded-full">
                        <Image
                          src={
                            (user?.profile_details?.profile_picture as string) ??
                            "/"
                          }
                          alt="img"
                          fill
                          className="object-cover rounded-full" // or object-contain, depending on your desired behavior
                        />
                      </div>
                      <div className=" flex items-start w-full  justify-between">
                        <div className="flex flex-col flex-1">
                          <h2 className="text-sm md:text-lg font-medium text-[#1F2C37] dark:text-white font-archivo">
                            {data?.data?.name}
                          </h2>
                          <p className="text-[#78828A] dark:text-gray-400 font-archivo font-medium text-xxs md:text-sm py-2">
                            {moment(data?.data?.dive_plan?.created_on).format(
                              "dddd, MMMM D, YYYY"
                            )}
                            <span className="px-2"> • </span>
                            {moment(data?.data?.dive_plan?.created_on).format(
                              "hh:mm A"
                            )}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <h2 className="text-sm md:text-xl font-archivo font-medium text-[#132346] dark:text-gray-200">
                              {data?.data?.dive_plan?.dive_site?.title}
                            </h2>
                           <PenIcon/>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div
                    className="relative rounded-lg overflow-hidden mt-6"
                    style={{ height: "15.6875rem" }}
                  >
                    {/* Satellite/Map Background */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        // backgroundImage: `url(${singleDivLog?.location.backgroundImage})`,
                      }}
                    ></div>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-black dark:bg-opacity-60"></div>

                    {/* Coordinates Overlay */}
                    <div className="absolute top-2 left-4 text-white py-4 px-6 md:px-[2.75rem] w-full">
                      {singleDivLog?.post.status&&<div className="flex justify-end max-md:pr-2 items-center w-full">
                        <Button className="bg-white dark:bg-gray-200 px-[1.0688rem] py-[.5206rem] rounded-2xl text-[#F7931D] dark:text-orange-600 text-xs md:text-sm font-medium flex items-center gap-[.3125rem]">
                        <ColorCheckIcon/>
                          {singleDivLog?.post.status}
                        </Button>
                      </div>}
                      <div className="">
                        <div className="flex items-center flex-wrap gap-[10px]">
                          <div className="relative h-[40px] rounded w-[52px]">
                            <Image
                              src={`https://flagcdn.com/${getCountry(Number(data?.data?.dive_plan?.dive_site?.country))?.alpha2code?.toLowerCase()}.svg`}
                              alt="img"
                              fill
                              className="object-cover rounded" // or object-contain, depending on your desired behavior
                            />

                            <img
                              src={`https://flagcdn.com/${getCountry(Number(data?.data?.dive_plan?.dive_site?.country))?.alpha2code?.toLowerCase()}.svg`}
                              alt={`${getCountry(data?.data?.id as number)?.name} flag`}
                              className="w-5 h-5 rounded-sm object-cover"
                            />
                          </div>

                          <div className="flex items-center gap-[10px]">
                            <p className="text-white font-archivo font-semibold text-xs md:text-lg">
                              <LocationDisplay
                                lat={data?.data?.dive_plan?.dive_site?.lag as string}
                                lon={data?.data?.dive_plan?.dive_site?.lon as string}
                                fallback={t?.labels?.locationUnavailable}
                                showTime={false}
                                timeFormat="relative"
                              />
                            </p>
                            <div className="flex items-center bg-[#C5EFFF] dark:bg-blue-200 min-w-[100px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-10 ">
                             <CupIcon/>
                              <p className="font-archivo text-xxs text-[#132346] dark:text-blue-900 font-semibold">
                                {t?.labels?.rank}:{data?.data?.dive_plan?.dive_site?.ranking}
                              </p>
                            </div>
                           <InfoIcon/>
                          </div>
                        </div>
                        <h2 className="font-semibold py-3 text-sm md:text-base lg:text-[1.875rem] font-archivo text-white">
                          {singleDivLog?.location.city}, {singleDivLog?.location.region}
                        </h2>
                        <div className="flex gap-x-2 py-3 items-center">
                          {singleDivLog?.location?.tags.map((tag, idx: number) => (
                            <div
                              key={idx}
                              className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-900 text-[#175CD3] dark:text-blue-200 cursor-pointer"
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                        <div className="py-2">
                          <p className="text-xs text-[#F7F7F7] dark:text-gray-200 md:text-base font-archivo ">
                            {t?.labels?.latitude}:{" "}
                            <span className="font-semibold">
                              {data?.data?.dive_plan?.dive_site?.lag}{" "}
                            </span>{" "}
                            <span className="px-2">•</span> {t?.labels?.longitude}:{" "}
                            <span className="font-semibold">
                              {data?.data?.dive_plan?.dive_site?.lon}
                            </span>
                          </p>
                          <p></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-center flex-wrap items-center border border-[#EAECF0] rounded-lg  "> */}
                  {/* Desktop Layout */}
                  <div className=" divide-x grid grid-cols-2 sm:grid-cols-3 gap-5 lg:grid-cols-5 py-4 px-4 md:px-8 divide-gray-200 dark:divide-gray-600 border border-[#EAECF0] dark:border-gray-700 rounded-lg mt-5">
                    {metrics.map((metric, index) => (
                      <div key={index} className="flex-1 px-4 first:pl-8 last:pr-8">
                        <div className="text-gray-400 dark:text-gray-500 text-base font-normal mb-4">
                          {metric.label}
                        </div>
                        <div className="text-[#101828] dark:text-white font-archivo text-base md:text-xl font-bold leading-none">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>


                  {/* </div> */}

                  <DiveTimeChart data={data}/>

                  <div className="border border-[#EAECF0] dark:border-gray-700 rounded-lg mt-[1.875rem] w-full p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-[#101828] dark:text-white font-archivo">
                      {t?.buttons?.airUsage}
                      </h3>
                      <Button className="bg-transparent p-0 rounded-2xl text-[#F7931D] dark:text-orange-400 text-sm font-medium ">
                        <ThreeDot />
                      </Button>
                    </div>

                    <div className=" w-full mt-2">
                      {cylinderData.map((cylinder) => (
                        <div
                          className="w-full grid grid-cols-[3fr_1fr]"
                          key={cylinder?.id}
                        >
                          <div className="bg-[#fef6f4] dark:bg-gray-700 rounded-s-[1.25rem] py-[1.1875rem] px-5 lg:px-[2.3125rem] grid grid-cols-[1fr_3fr_3fr] gap-3 lg:gap-9">
                            <div className="flex items-end">
                              <CylinderIcon
                                volume={cylinder?.volume}
                                className="w-8 h-16"
                                bgColor='#132346'
                                textColor='#fff'
                              />
                            </div>
                            <div className="flex flex-col gap-5 justify-between">
                              <div className="">
                                <p className="text-xs lg:text-sm font-archivo text-[#132346] dark:text-gray-300 font-medium py-1">
                                  {t?.labels?.startPressure}
                                </p>
                                <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346] dark:text-white">
                                  {" "}
                                  {cylinder.startPressure.bar} bar
                                </h3>
                                <p className="font-archivo font-medium text-[#132346] dark:text-gray-300 text-sm">
                                  {cylinder?.startPressure?.psi}
                                </p>
                              </div>
                              <div className="">
                                <p className="text-xs lg:text-sm font-archivo text-[#132346] dark:text-gray-300 font-medium py-1">
                                 {t?.labels?.cylinderType}
                                </p>
                                <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346] dark:text-white">
                                  {" "}
                                  {cylinder.cylinderType} bar
                                </h3>
                              </div>
                            </div>
                            <div className="flex flex-col gap-5 justify-between">
                              <div className="">
                                <p className="text-xs lg:text-sm font-archivo text-[#132346] dark:text-gray-300 font-medium py-1">
                                 {t?.labels?.endPressure}
                                </p>
                                <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346] dark:text-white">
                                  {" "}
                                  {cylinder.endPressure.bar} Bar
                                </h3>
                                <p className="font-archivo font-medium text-[#132346] dark:text-gray-300 text-sm">
                                  {cylinder?.endPressure?.psi}
                                </p>
                              </div>
                              <div className="">
                                <p className="text-xs lg:text-sm font-archivo text-[#132346] dark:text-gray-300 font-medium py-1">
                                  {t?.labels?.gas}
                                </p>
                                <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346] dark:text-white">
                                  {" "}
                                  {cylinder.gas}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="w-full rounded-e-[1.25rem] bg-[#E4881C] dark:bg-orange-600 flex flex-col gap-5 justify-center items-center py-[2.125rem] px-5 lg:px-[2.3125rem]">
                            <div className="">
                              <p className="text-xs lg:text-sm font-archivo text-white font-medium py-1">
                                {t?.labels?.pressureUsed}
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-white">
                                {" "}
                                {cylinder.pressureUsed.bar} Bar
                              </h3>
                              <p className="font-archivo font-medium text-white text-sm">
                                {cylinder?.pressureUsed?.psi}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  <DiveLogCharts user={user}/>
                </div>


              </div>
              <div className="">
                <SingleDIveLogSidebar data={data} user={user}/>
              </div>

            </div>
          </div>
      }

    

    </div>
  )
}

export default DiveLogId