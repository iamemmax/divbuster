"use client";
import Header from '@/app/(main)/components/shared/Header'
import React, { useState } from 'react'
import { certificateResult, useFetchCertifications } from '../certifications/fetchCertifications'
import { Button, LoaderModal } from '@/components/core'
import moment from 'moment'
import { cn } from '@/utils/classNames'
import CardHeadIcon from '@/app/icons/(dashboard)/CardHeadIcon'
import EditIcon from '@/app/icons/(dashboard)/EditIcon'
import AddCertificateTypeComp from '../../components/certifications/AddCertificateTypeComp'
import { certificationTranslations } from '../../translation/certificationTranslation';
import { useLanguage } from '@/hooks/useLanguage';
import CertificateModal from '../../components/certifications/CertificateModal';
import { selectedCardBg } from '../../components/shared/CardContainer';

// 🔹 Translations


// selectedCardBg
const ManageCertifications= () => {
  const {language}=useLanguage()
  const t = certificationTranslations[language] ||certificationTranslations.en;
  const [showEditModal, setShowEditModal] = useState(false)
  const [certificateData, setCertificateData] = useState<certificateResult>()
  const [selectedCertificate, setSelectedCertificate] = useState<certificateResult | null>(null)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
  } = useFetchCertifications()

  const certifications = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div>
      <Header title={t.pageTitle} subtitle="" />
      <div>
        <div className="bg-white dark:bg-gray-800 rounded-lg mt-[4rem] !z-10 border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">

          {isLoading ? (
            <div className="w-full">
              <LoaderModal />
            </div>
          ) : (
            <>
              <div className="p-4">
                <div className="flex items-center py-2 justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
                    {t.certifications}
                  </h2>
                </div>
              </div>

              {certifications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-6 px-8">
                  {certifications.map((card) => (
                    <div
                      key={card.id}
                      className={cn(
                        "flex flex-col z-50 relative gap-4 rounded-[1.1944rem] px-[1.125rem] py-4 bg-cover bg-no-repeat cursor-pointer hover:opacity-90 transition-opacity"
                      )}
                      style={{
                        backgroundColor: selectedCardBg(card?.certificate_type)?.bg,
                        color: selectedCardBg(card?.certificate_type)?.text,
                      }}
                      onClick={() => {
                        setSelectedCertificate(card)
                        setShowCertificateModal(true)
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-white text-base font-medium font-archivo">
                          {t.dateAdded}: {moment(card.created_on).format("ll")}
                        </p>
                        <div className="h-[2.1437rem] mt-4 flex items-center justify-center w-[2.1437rem] border border-white rounded-full">
                          <CardHeadIcon />
                        </div>
                      </div>

                      <div>
                        <p className="text-white text-base font-medium font-archivo">
                          {t.issuer}:
                        </p>
                        <p className="text-white text-base font-semibold font-archivo">
                          {card.issuer}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="w-full">
                          <p className="text-white text-[11.47px] font-medium font-archivo">
                            {t.diverNo}: {card.certification_no}
                          </p>
                          <div className="flex justify-between  w-full item-center">
                            <div>
                              <p className="text-white text-xl font-semibold font-archivo">
                                {card.issuer_name}
                              </p>
                            </div>
                            <div
                              className="flex justify-end"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCertificateData(card);
                                setShowEditModal(true);
                              }}
                            >
                              <Button className="h-[2.1437rem] bg-transparent p-0 flex items-center justify-center w-[2.1437rem] border border-white rounded-full">
                                <EditIcon color="#fff" />
                              </Button>
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
                    {t.noCertifications}
                  </p>
                </div>
              )}
            </>
          )}

          {certifications.length > 0 && (
            <div className="border-t border-[#EAECF0] dark:border-gray-700 flex justify-between items-center py-4 px-8 transition-colors duration-200">
              <Button
                variant={"outlined"}
                className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] dark:text-gray-300 font-medium border border-[#D0D5DD] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? t.loadingMore
                  : hasNextPage
                  ? t.loadMore
                  : t.noMoreResults}
              </Button>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <AddCertificateTypeComp
          type="edit"
          isOpen={showEditModal}
          setIsOpenCardModal={() => setShowEditModal(false)}
          certificateData={certificateData}
        />
      )}
      
      <CertificateModal 
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        certificate={selectedCertificate}
      />
    </div>
  );
};

export default ManageCertifications;
