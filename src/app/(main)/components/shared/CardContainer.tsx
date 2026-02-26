

"use client"
import { LinkButton } from '@/components/core'
import React, { useState, useMemo } from 'react'
import { ISSUER_COLORS } from '../certifications'
import { cardContainerTranslations } from '../../translation/certificationTranslation'
import { useLanguage } from '@/hooks/useLanguage'
import CertificateModal from '../certifications/CertificateModal'
import { useFetchCertifications, certificateResult } from '../../(dashboard)/api/certifications/fetchCertifications'

interface prop {
  user?: any
}

export const selectedCardBg = (issuer: string) => {
  const colors = ISSUER_COLORS[issuer as keyof typeof ISSUER_COLORS] || ISSUER_COLORS.others
  return colors
}

const CardContainer = ({}: prop) => {
  const {language} = useLanguage()
  const t = cardContainerTranslations[language]|| cardContainerTranslations.en
  const [selectedCertificate, setSelectedCertificate] = useState<certificateResult |null>(null)
  const [showCertificateModal, setShowCertificateModal] = useState(false)

  // Fetch certificates from the endpoint
  const { data: certificationsData } = useFetchCertifications()

  // Get all certificates from paginated data
  const allCertificates = useMemo(() => {
    return certificationsData?.pages?.flatMap(page => page.results) || []
  }, [certificationsData])

  // Sort certificates: default first, then by issue_date
  // Only show the first 2 certificates in sidebar to save space
  const sortedCertificates = useMemo(() => {
    const sorted = allCertificates.slice().sort((a, b) => {
      // Default certificate comes first
      if (a.default && !b.default) return -1
      if (!a.default && b.default) return 1
      // Then sort by issue_date (newest first)
      return (
        new Date(b.issue_date).getTime() -
        new Date(a.issue_date).getTime()
      )
    })
    // Limit to 2 certificates in sidebar
    return sorted.slice(0, 2)
  }, [allCertificates])

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
              className={`absolute w-[220px] cursor-pointer rounded-[10px] top-0 left-0 right-0 transition-all duration-300 hover:scale-105 ${
                card.default ? '' : ''
              }`}
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
                className="flex w-full flex-col gap-4 bg-[url('/images/card-parttern3.svg')] bg-cover bg-center bg-no-repeat rounded-[10px] px-[1.125rem] py-4 shadow-lg relative"
                style={{
                  backgroundColor: selectedCardBg(card?.issuer)?.bg,
                  color: selectedCardBg(card?.issuer)?.text,
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
          className="bg-transparent text-[#344054] font-medium text-sm dark:text-white font-archivo border border-gray-300 hover:bg-gray-50 hover:text-black transition-colors"
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
