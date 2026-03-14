"use client"
import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/app/(main)/components/shared/Header'
import MedicalForm from './components/MedicalForm'
import LiabilityForm from './components/LiabilityForm'
import InsuranceDocumentList from './components/insurance-document/InsuranceDocumentList'
import PhysicianReportList from './components/physician-report/PhysicianReportList'
import DiveSchoolForms from './components/DiveSchoolForms'
import DiveSchoolMedicalForms from './components/schoolMedical/DiveSchoolMedical'
import { useLanguage } from '@/hooks/useLanguage'
import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'



const InsurancePage = () => {
  const { language } = useLanguage()
  const t = insuranceTranslations[language] || insuranceTranslations.en

  const [activeTab, setActiveTab] = useState<'medical' | 'liability' | 'insurance-doc' | 'physician-report' | 'dive-school' | 'dive-school-medical-form'>('medical')
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = React.useCallback(() => {
    if (tabsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  React.useEffect(() => {
    checkScroll()
    const container = tabsScrollRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [checkScroll])

  const scroll = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      tabsScrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      })
    }
  }

  const TABS = [
    { key: 'medical',                   label: t.medicalForm           },
    { key: 'liability',                  label: t.liabilityForm          },
    { key: 'insurance-doc',              label: t.insuranceForms         },
    { key: 'physician-report',           label: t.physicianInformation   },
    { key: 'dive-school',                label: t.diveSchoolLiability    },
    { key: 'dive-school-medical-form',   label: t.diveSchoolMedical      },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="sticky top-0 z-20">
        <Header title={t.insuranceForms} subtitle={t.completeFormsDescription} />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b pt-5 max-w-7xl mx-auto w-full border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-3 md:px-6">
            <div className="flex items-center gap-2">
              <div ref={tabsScrollRef} className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-hidden scrollbar-hide flex-1">
                {TABS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-3 sm:px-4 md:px-6 py-3 font-medium text-xs sm:text-sm md:text-base border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === key
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {(canScrollLeft || canScrollRight) && (
                <div className="flex gap-2 flex-shrink-0">
                  {canScrollLeft && (
                    <button
                      onClick={() => scroll('left')}
                      className="p-1 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                      aria-label="Scroll tabs left"
                    >
                      <ChevronLeft size={18} className="text-gray-600 dark:text-gray-300" />
                    </button>
                  )}
                  {canScrollRight && (
                    <button
                      onClick={() => scroll('right')}
                      className="p-1 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                      aria-label="Scroll tabs right"
                    >
                      <ChevronRight size={18} className="text-gray-600 dark:text-gray-300" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[80vh]">
          <div className="bg-white dark:bg-gray-800 p-6 max-w-7xl mx-auto">
            {activeTab === 'medical'                 && <MedicalForm />}
            {activeTab === 'liability'               && <LiabilityForm />}
            {activeTab === 'insurance-doc'           && <InsuranceDocumentList />}
            {activeTab === 'physician-report'        && <PhysicianReportList />}
            {activeTab === 'dive-school'             && <DiveSchoolForms />}
            {activeTab === 'dive-school-medical-form'&& <DiveSchoolMedicalForms />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsurancePage