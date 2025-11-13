

"use client"
import { User } from '@/app/(auth)/api/getAuthenticatedUser'
import { LinkButton } from '@/components/core'
import React, { useState } from 'react'
import { CERTIFICATE_TYPE_CHOICES_WITH_BG } from '../certifications'
import { cardContainerTranslations } from '../../translation/certificationTranslation'
import { useLanguage } from '@/hooks/useLanguage'
import { useRouter } from 'next/navigation'
import CertificateModal from '../certifications/CertificateModal'
import { certificates } from '../../(dashboard)/api/buddy/fetchBuddyProfile'

interface prop {
  user: User | null

}

export const selectedCardBg = (selectedCard: string) => {
  const myCard = CERTIFICATE_TYPE_CHOICES_WITH_BG.find(
    (card) => String(card?.value) === String(selectedCard)
  )
  return myCard
}

const CardContainer = ({ user }: prop) => {
  const {language} = useLanguage()
  const t = cardContainerTranslations[language]|| cardContainerTranslations.en
  const [selectedCertificate, setSelectedCertificate] = useState<certificates |null>(null)
  const [showCertificateModal, setShowCertificateModal] = useState(false)

  // Sort certificates by issue_date
  const sortedCertificates =
    user?.certificates?.slice().sort(
      (a, b) =>
        new Date(b.issue_date).getTime() -
        new Date(a.issue_date).getTime()
    ) || []

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        {sortedCertificates.map((card, index) => {
          const offsetY = index * 8
          const offsetX = index * 4
          const scale = 1 - index * 0.02
          const zIndex = sortedCertificates.length - index

          return (
            <div
              key={card?.id}
              className="absolute w-[220px] cursor-pointer rounded-[10px] top-0 left-0 right-0 transition-all duration-300 hover:scale-105"
              style={{
                transform: `translateY(${offsetY}px)  translateX(${offsetX}px) scale(${scale})`,
                zIndex: zIndex,
              }}
              onClick={() => {
                setSelectedCertificate(card)
                setShowCertificateModal(true)
              }}
            >
              <div
                className="flex w-full flex-col gap-4 bg-[url('/images/card-parttern3.svg')] bg-cover bg-center bg-no-repeat rounded-[10px] px-[1.125rem] py-4 shadow-lg"
                style={{
                  backgroundColor: selectedCardBg(card?.certificate_type)?.bg,
                  color: selectedCardBg(card?.certificate_type)?.text,
                }}
              >
                <div className='w-full'>
                  <p className="text-white flex flex-nowrap text-xs font-medium font-archivo">
                    {t.dateAdded}: {new Date(card?.issue_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-white text-xs font-medium font-archivo opacity-80">
                    {t.issuer}:
                  </p>
                  <p className="text-white text-xs font-semibold font-archivo">
                    {card?.issuer}
                  </p>
                </div>
                <div>
                  <p className="text-white text-xs font-medium font-archivo opacity-80">
                    {t.diverNo}: {card?.certification_no}
                  </p>
                  <p className="text-white text-base font-semibold font-archivo">
                    {card?.issuer_name}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Spacer to preserve layout */}
      <div
        style={{
          height: `${Math.max(
            160 + (sortedCertificates.length - 1) * 8,
            160
          )}px`,
        }}
      />

      {sortedCertificates?.length>0&&<div className="my-3 flex justify-center items-center">
        <LinkButton
          href={"/manage-certifications"}
          variant="outlined"
          className="bg-transparent text-[#344054] font-medium text-sm dark:text-white font-archivo border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          {t.manageCerts}
        </LinkButton>
      </div>}
      
      <CertificateModal 
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        certificate={selectedCertificate}
      />
    </div>
  )
}

export default CardContainer
