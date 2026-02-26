"use client";
import Header from '@/app/(main)/components/shared/Header'
import React, { useState } from 'react'
import { certificateResult, useFetchCertifications } from '../api/certifications/fetchCertifications'
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
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { useUpdateCertification } from '../api/certifications/editCertification';

// 🔹 Translations


// selectedCardBg
const ManageCertifications= () => {
  const {language}=useLanguage()
  const t = certificationTranslations[language] ||certificationTranslations.en;
  const [showEditModal, setShowEditModal] = useState(false)
  const [certificateData, setCertificateData] = useState<certificateResult>()
  const [selectedCertificate, setSelectedCertificate] = useState<certificateResult | null>(null)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [showAddCertificate, setshowAddCertificate] = useState(false)
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
      <div className='px-4 sm:px-6 lg:px-[1.875rem] '>
        <div className="bg-white dark:bg-gray-800 rounded-lg mt-[4rem] !z-10 border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">

          {isLoading ? (
            <div className="w-full">
              <LoaderModal />
            </div>
          ) : (
            <>
              <div className="p-4">
                <div className="flex items-center py-2 gap-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
                    {t.certifications}
                  </h2>
                  <Button className="bg-[#f7931d] text-white py-3" onClick={()=>setshowAddCertificate(true)}>{t.addCertificate}</Button>
                </div>
              </div>

              {certifications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 py-6 px-8">
                  {certifications.map((card) => (
                    <div
                      key={card.id}
                      className={cn(
                        "flex flex-col z-50 relative gap-4 rounded-[1.1944rem] px-[1.125rem] py-4 bg-cover bg-no-repeat cursor-pointer hover:opacity-90 transition-opacity"
                      )}
                      style={{
                        backgroundColor: selectedCardBg(card?.issuer)?.bg,
                        color: selectedCardBg(card?.issuer)?.text,
                      }}
                      onClick={() => {
                        setSelectedCertificate(card)
                        setShowCertificateModal(true)
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                          <p className="text-white text-base font-medium font-archivo">
                            {t.dateAdded}: {moment(card.created_on).format("ll")}
                          </p>
                          {card.default && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/30 text-white text-xs font-semibold w-fit">
                              ⭐ Default
                            </span>
                          )}
                        </div>
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
                              <p className="text-white text-base font-medium font-archivo">
                                {t.issuedDate}: {moment(card.issue_date).format("ll")}
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
                              <div className="flex items-center gap-2">
                                <Button className="h-[2.1437rem] bg-transparent p-0 flex items-center justify-center w-[2.1437rem] border border-white rounded-full">
                                  <EditIcon color="#fff" />
                                </Button>
                                {/* Set default button */}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex  items-center gap-4">

                                <SetDefaultButton card={card} isDefault={card.default} t={t}/>
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

   {showAddCertificate&&   <AddCertificateTypeComp certificateData={{} as certificateResult} type="add" isOpen={showAddCertificate} setIsOpenCardModal={setshowAddCertificate}/>}
    </div>
  );
};

export default ManageCertifications;

// Small inline component placed at bottom so page imports remain tidy
const SetDefaultButton = ({ card, isDefault, t }: { card: certificateResult; isDefault: boolean; t: any }) => {
  const { mutateAsync, isLoading } = useUpdateCertification();
  const queryClient = useQueryClient();
  const { language } = useLanguage();

  const handleSetDefault = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // Pass all certificate data with default: true
      await mutateAsync({
        id: String(card.id),
        full_name: card.full_name,
        issuer: card.issuer,
        issuer_name: card.issuer_name,
        certificate_type: card.certificate_type,
        image: card.image,
        dob: card.date_of_birth,
        issue_date: card.issue_date,
        certificate_no: card.certification_no,
        school_name: card.school_name,
        trainer_name: card.trainer_name,
        trainer_phone: card.trainer_no,
        lang: language,
        default: true,
      });
      toast.success('Certificate set as default successfully!');
      // Invalidate fetch-certifications to update both sidebar and manage certifications page
      await queryClient.invalidateQueries({ queryKey: ["fetch-certifications"] });
    } catch (error) {
      const errorMessage = formatAxiosErrorMessage(error as AxiosError);
      toast.error(String(errorMessage));
    }
  };

  return (
    <button
      onClick={handleSetDefault}
      disabled={isLoading || isDefault}
      className={cn(
        "text-xs px-3 py-2 rounded-md font-medium transition-colors",
        isDefault
          ? "bg-white/40 text-white cursor-not-allowed opacity-70"
          : "bg-white/20 text-white hover:bg-white/30"
      )}
    >
      {isLoading ? `${t.setting}...` : isDefault ? `✓ ${t.setDefault}` : `⭐ ${t.setDefault}`}
    </button>
  );
};

