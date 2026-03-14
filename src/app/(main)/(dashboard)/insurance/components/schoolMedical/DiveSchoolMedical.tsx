"use client"
import React, { useState } from 'react'
import { Button } from '@/components/core'
import moment from 'moment'
import { useLanguage } from '@/hooks/useLanguage'
import { diveSchoolMedicalTranslations } from '@/app/(main)/translation/diveSchoolInsuranceTranlation'
import { useFetchSchoolMediacalReport } from '../../../api/insurance/school-medical/getAllDiveSchoolMedical'
import DiveSchoolMedicalModal from './DiveSchoolMedicalModall'
import DiveSchoolMedicalForm from './DiveSchoolMedicalForm'
import { SmallSpinner } from '@/icons/core'

const DiveSchoolMedicalForms = () => {
  const { language } = useLanguage()
  const t = diveSchoolMedicalTranslations[language] || diveSchoolMedicalTranslations.en

  const [showForm, setShowForm] = useState(false)
  const [selectedLiability, setSelectedLiability] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const { data: liabilityReports, isLoading } = useFetchSchoolMediacalReport()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.pageTitle}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {t.pageSubtitle}
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md"
        >
          {showForm ? t.hideForm : t.createNew}
        </Button>
      </div>

      {showForm && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
          <DiveSchoolMedicalForm onSuccess={() => setShowForm(false)} />
        </div>
      )}
      {
        isLoading && <div className='flex justify-center items-center w-full h-full'> <SmallSpinner className='text-2xl'/></div>
      }

      {!isLoading && liabilityReports && liabilityReports.length > 0 && (
        <div>
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            {t.yourForms}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liabilityReports.map((liability: any) => {
              const isExpired = liability.expires_on
                ? moment(liability.expires_on).isBefore(moment())
                : false

              return (
                <div
                  key={liability.id}
                  onClick={() => {
                    setSelectedLiability(liability)
                    setShowModal(true)
                  }}
                  className={`p-4 border rounded-lg transition-all cursor-pointer ${
                    isExpired
                      ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-60 hover:opacity-80'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-orange-500 dark:hover:border-orange-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-base font-semibold ${isExpired ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                          {liability.dive_school.name}
                        </h4>
                        {isExpired && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Expired
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-black dark:text-gray-500 mt-1">
                        {liability.dive_school.address}
                      </p>
                    </div>
                  </div>

                  {liability.dive_school.contact_info && (
                    <p className="text-xs text-black dark:text-gray-500 mb-3">
                      📞 {liability.dive_school.contact_info}
                    </p>
                  )}

                  <div className="space-y-2 mb-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-black dark:text-gray-500">
                      <span className="font-medium">{t.validUntil}:</span>{" "}
                      <span className={isExpired ? 'text-red-400' : ''}>
                        {moment(liability.expires_on).format('ll')}
                      </span>
                    </p>
                    <p className="text-xs text-black dark:text-gray-500">
                      <span className="font-medium">{t.signed}:</span> {moment(liability.last_signed_on).format('ll')}
                    </p>
                    <p className="text-xs text-black dark:text-gray-500">
                      <span className="font-medium">{t.created}:</span> {moment(liability.created_on).format('ll')}
                    </p>
                  </div>

                  <button
                    className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
                      isExpired
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-default'
                        : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40'
                    }`}
                  >
                    {isExpired ? 'Expired' : t.viewDetails}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {!isLoading && (!liabilityReports || liabilityReports.length === 0) && !showForm && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t.noForms}</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md"
          >
            {t.createFirst}
          </Button>
        </div>
      )}

      {selectedLiability && (
        <DiveSchoolMedicalModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            setSelectedLiability(null)
          }}
          liability={selectedLiability}
        />
      )}
    </div>
  )
}

export default DiveSchoolMedicalForms