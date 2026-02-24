"use client"
import React, { useState } from 'react'
import { Button } from '@/components/core'

interface DiveSchool {
  id: number
  name: string
  address: string
}

interface SchoolFormData {
  schoolId: number
  schoolName: string
  medicalCompleted: boolean
  liabilityCompleted: boolean
}

const DiveSchoolForms = () => {
  const [schoolForms, setSchoolForms] = useState<SchoolFormData[]>([])

  const diveSchools: DiveSchool[] = [
    { id: 1, name: 'Ocean Divers Academy', address: '123 Beach St, Miami, FL' },
    { id: 2, name: 'Deep Blue Diving', address: '456 Ocean Ave, San Diego, CA' },
    { id: 3, name: 'Coral Reef Divers', address: '789 Reef Rd, Hawaii, HI' },
  ]

  const handleMedicalComplete = (schoolId: number) => {
    const existing = schoolForms.find(f => f.schoolId === schoolId)
    if (existing) {
      setSchoolForms(schoolForms.map(f =>
        f.schoolId === schoolId ? { ...f, medicalCompleted: true } : f
      ))
    } else {
      const school = diveSchools.find(s => s.id === schoolId)
      if (school) {
        setSchoolForms([...schoolForms, {
          schoolId,
          schoolName: school.name,
          medicalCompleted: true,
          liabilityCompleted: false
        }])
      }
    }
  }

  const handleLiabilityComplete = (schoolId: number) => {
    const existing = schoolForms.find(f => f.schoolId === schoolId)
    if (existing) {
      setSchoolForms(schoolForms.map(f =>
        f.schoolId === schoolId ? { ...f, liabilityCompleted: true } : f
      ))
    } else {
      const school = diveSchools.find(s => s.id === schoolId)
      if (school) {
        setSchoolForms([...schoolForms, {
          schoolId,
          schoolName: school.name,
          medicalCompleted: false,
          liabilityCompleted: true
        }])
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Dive School Forms
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Complete medical and liability forms for each dive school
        </p>
      </div>

      <div className="space-y-3">
        {diveSchools.map((school) => {
          const formData = schoolForms.find(f => f.schoolId === school.id)
          return (
            <div
              key={school.id}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">{school.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{school.address}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Medical Form</span>
                  {formData?.medicalCompleted ? (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">✓ Completed</span>
                  ) : (
                    <Button
                      onClick={() => handleMedicalComplete(school.id)}
                      className="text-xs px-3 py-1 bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Complete
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Liability Form</span>
                  {formData?.liabilityCompleted ? (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">✓ Completed</span>
                  ) : (
                    <Button
                      onClick={() => handleLiabilityComplete(school.id)}
                      className="text-xs px-3 py-1 bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {schoolForms.length > 0 && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            {schoolForms.filter(f => f.medicalCompleted && f.liabilityCompleted).length} of {diveSchools.length} schools completed
          </p>
        </div>
      )}
    </div>
  )
}

export default DiveSchoolForms

