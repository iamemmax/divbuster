"use client"
import React, { useState } from 'react'
import DiveSchoolLiabilityForm from './DiveSchoolLiabilityForm'
import { useFetchSchoolLiabilityReport } from '../../api/insurance/school-liability/getAllDiveSchoolLiability'
import { Button } from '@/components/core'
import moment from 'moment'
import DiveSchoolLiabilityModal from './DiveSchoolLiabilityModal'

const DiveSchoolForms = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedLiability, setSelectedLiability] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const { data: liabilityReports, isLoading } = useFetchSchoolLiabilityReport()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Dive School Liability
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Manage your dive school liability forms
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md"
        >
          {showForm ? 'Hide Form' : 'Create New Liability'}
        </Button>
      </div>

      {/* Show form when button is clicked */}
      {showForm && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
          <DiveSchoolLiabilityForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {/* Display existing liability cards */}
      {!isLoading && liabilityReports && liabilityReports.length > 0 && (
        <div>
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            Your Dive School Liability Forms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liabilityReports.map((liability) => (
              <div
                key={liability.id}
                onClick={() => {
                  setSelectedLiability(liability)
                  setShowModal(true)
                }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg hover:border-orange-500 dark:hover:border-orange-500 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      {liability.dive_school.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {liability.dive_school.address}
                    </p>
                  </div>
                </div>

                {liability.dive_school.contact_info && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    📞 {liability.dive_school.contact_info}
                  </p>
                )}

                <div className="space-y-2 mb-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Signed:</span> {moment(liability.last_signed_on).format('ll')}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Created:</span> {moment(liability.created_on).format('ll')}
                  </p>
                </div>

                <button className="w-full py-2 px-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded text-sm font-medium hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && (!liabilityReports || liabilityReports.length === 0) && !showForm && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No dive school liability forms yet
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md"
          >
            Create Your First Liability Form
          </Button>
        </div>
      )}

      {/* Modal for viewing/editing details */}
      {selectedLiability && (
        <DiveSchoolLiabilityModal
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

export default DiveSchoolForms

