"use client"
import Header from '@/app/(main)/components/shared/Header'
import React, { useState } from 'react'
import { certificateResult, useFetchCertifications } from '../certifications/fetchCertifications'
import { Button, LoaderModal } from '@/components/core'
import ThreeDot from '@/app/icons/(dashboard)/ThreeDot'
import moment from 'moment'
import { cn } from '@/utils/classNames'
import CardHeadIcon from '@/app/icons/(dashboard)/CardHeadIcon'
import EditIcon from '@/app/icons/(dashboard)/EditIcon'
import AddCertification from '../../components/certifications/AddCertification'
import AddCertificateTypeComp from '../../components/certifications/AddCertificateTypeComp'
// import cn and color + CardHeadIcon if they exist in your project

const ManageCertifications = () => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [certificateData, setCertificateData] = useState<certificateResult>()
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
  } = useFetchCertifications()

  // flatten all results across pages
  const certifications =
    data?.pages.flatMap((page) => page.results) ?? []
 
  return (
    <div>
      <Header title="Manage Certifications" subtitle="" />
      <div>
        <div className="bg-white dark:bg-gray-800 rounded-lg mt-[4rem] border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">

          {
            isLoading ? <div className='w-full '><LoaderModal /></div> :
              <>
                <div className="p-4">
                  <div className="flex items-center py-2 justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
                      Certifications
                    </h2>
                    {/* <Button className="p-0 bg-transparent">
                      <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                    </Button> */}
                  </div>
                </div>
                {certifications.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-6 px-8">
                    {certifications.map((card) => (
                      <div
  key={card.id}
  className={cn(
    "flex flex-col z-50 relative  gap-4 rounded-[1.1944rem] px-[1.125rem] py-4 bg-cover bg-no-repeat"
  )}
  style={{
    backgroundImage: `url(${card?.image ?? ""})`,
    backgroundColor:!card?.image?"#F7931D":""
  }}
>
                        <div className="flex justify-between items-start">
                          <p className="text-white text-base font-medium font-archivo">
                            Date Added: {moment(card.created_on).format("ll")}
                          </p>
                          <div className="h-[2.1437rem] mt-4 flex items-center justify-center w-[2.1437rem] border border-white rounded-full">
                            <CardHeadIcon />
                          </div>
                        </div>

                        <div>
                          <p className="text-white text-base font-medium font-archivo">
                            Issuer:
                          </p>
                          <p className="text-white text-base font-semibold font-archivo">
                            {card.issuer}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className='w-full'>
                            <p className="text-white text-[11.47px] font-medium font-archivo">
                              Diver No: {card.certification_no}
                            </p>
                            <div className="flex justify-between  w-full item-center">
                              <div className=""><p className="text-white text-xl font-semibold font-archivo">
                                {card.issuer_name}
                              </p></div>
                              <div className="flex justify-end" onClick={()=>{setCertificateData(card)
                                setShowEditModal(true)
                              }}>
                                <Button className="h-[2.1437rem] bg-transparent p-0 flex items-center justify-center w-[2.1437rem] border border-white rounded-full"><EditIcon color='#fff' /></Button>

                              </div>  

                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-3">
                    <p className="font-archivo text-sm font-semibold">
                      No Certification Found
                    </p>
                  </div>
                )}

              </>
          }


          {certifications.length > 0 && (
            <div className="border-t border-[#EAECF0] dark:border-gray-700 flex justify-between items-center py-4 px-8 transition-colors duration-200">
              <Button
                variant={"outlined"}
                className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] dark:text-gray-300 font-medium border border-[#D0D5DD] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                    ? "Load More"
                    : "No More Results"}
              </Button>

             
            </div>
          )}
        </div>
      </div>

       {
        showEditModal && <AddCertificateTypeComp type="edit" isOpen={showEditModal} setIsOpenCardModal={()=>setShowEditModal(false)} certificateData={certificateData}/>
      }
    </div>
  )
}

export default ManageCertifications
