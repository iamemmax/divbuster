"use client"
import React, { useState } from 'react'
import Header from '@/app/(main)/components/shared/Header'
import MedicalForm from './components/MedicalForm'
import LiabilityForm from './components/LiabilityForm'

const InsurancePage = () => {
  const [activeTab, setActiveTab] = useState<'medical' | 'liability'>('medical')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="sticky top-0 z-20">
        <Header title="Insurance & Waivers" subtitle="Complete your medical and liability forms" />
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Fixed Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b  pt-5  max-w-7xl  mx-auto w-full border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab('medical')}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'medical'
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Medical Form
              </button>
              <button
                onClick={() => setActiveTab('liability')}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'liability'
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Liability Waiver
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto max-h-[80vh]">
          <div className="bg-white dark:bg-gray-800 p-6 max-w-7xl mx-auto">
            {activeTab === 'medical' ? <MedicalForm /> : <LiabilityForm />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsurancePage