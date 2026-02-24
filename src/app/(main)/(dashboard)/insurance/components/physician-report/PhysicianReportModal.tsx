"use client"
import React, { useState, useRef, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/core'
import toast from 'react-hot-toast'
import { useSubmitPhysicianReport } from '../../../api/insurance/physician/createPhysicianReport'
import { useUpdatePhysicianReport } from '../../../api/insurance/physician/updatePhysicianReport'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from 'react-query'

const physicianReportSchema = z.object({
  physicianName: z.string().min(2, 'Physician name must be at least 2 characters').max(100, 'Physician name must be less than 100 characters'),
  physicianEmail: z.string().email('Invalid email address'),
  hospitalName: z.string().min(2, 'Hospital name must be at least 2 characters').max(100, 'Hospital name must be less than 100 characters'),
  physicianPhone: z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number format'),
  licenseNumber: z.string().min(2, 'License number must be at least 2 characters').max(50, 'License number must be less than 50 characters'),
  dateIssued: z.string().refine((date) => !isNaN(new Date(date).getTime()), 'Invalid date format'),
  dateExpires: z.string().refine((date) => !isNaN(new Date(date).getTime()), 'Invalid date format'),
  reportBase64: z.string().min(1, 'Physician report file is required')
}).refine((data) => new Date(data.dateExpires) > new Date(data.dateIssued), {
  message: 'Expiration date must be after issue date',
  path: ['dateExpires']
})

type PhysicianReportFormData = z.infer<typeof physicianReportSchema>

interface PhysicianReportModalProps {
  isOpen: boolean
  onClose: () => void
  editingReport?: any
  onSuccess?: () => void
}

const PhysicianReportModal: React.FC<PhysicianReportModalProps> = ({
  isOpen,
  onClose,
  editingReport,
  onSuccess
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const physicianSigRef = useRef<SignatureCanvas>(null)
  const [canvasWidth, setCanvasWidth] = useState(600)
  const { mutate: submitReport, isLoading: isSubmitting } = useSubmitPhysicianReport()
  const { mutate: updateReport, isLoading: isUpdating } = useUpdatePhysicianReport()
    const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<PhysicianReportFormData>({
    resolver: zodResolver(physicianReportSchema),
    defaultValues: {
      physicianName: '',
      physicianEmail: '',
      hospitalName: '',
      physicianPhone: '',
      licenseNumber: '',
      dateIssued: '',
      dateExpires: '',
      reportBase64: ''
    }
  })

  const reportBase64 = watch('reportBase64')

  useEffect(() => {
    if (editingReport) {
      setValue('physicianName', editingReport.physician_name || '')
      setValue('physicianEmail', editingReport.physician_email || '')
      setValue('hospitalName', editingReport.hospital_name || '')
      setValue('licenseNumber', editingReport.physician_license_number || '')
      setValue('physicianPhone', editingReport.physician_phone || '')
      setValue('reportBase64', editingReport.physician_report || '')

      if (editingReport.issued_on) {
        const issuedDate = new Date(editingReport.issued_on).toISOString().split('T')[0]
        setValue('dateIssued', issuedDate)
      }
      if (editingReport.expires_on) {
        const expiresDate = new Date(editingReport.expires_on).toISOString().split('T')[0]
        setValue('dateExpires', expiresDate)
      }

      // Set uploaded file info for display
      if (editingReport.physician_report) {
        setUploadedFile({
          name: `physician-report-${editingReport.id}`,
          size: editingReport.physician_report.length
        } as File)
      }
    } else {
      reset()
      setUploadedFile(null)
    }
  }, [editingReport, isOpen, setValue, reset])

  const handleFileUpload = (file: File) => {
    if (file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        setValue('reportBase64', base64)
      }
      reader.readAsDataURL(file)
    } else {
      toast.error('File size must be less than 10MB')
    }
  }

  const onSubmit = (data: PhysicianReportFormData) => {
    // if (!physicianSigRef.current || physicianSigRef.current.isEmpty()) {
    //   toast.error('Please provide physician signature')
    //   return
    // }

    const payload = {
      hospital_name: data.hospitalName,
      physician_name: data.physicianName,
      physician_email: data.physicianEmail,
      physician_report: data.reportBase64,
      physician_license_number: data.licenseNumber,
      physician_phone: data.physicianPhone,
      date_issued: data.dateIssued,
      date_expires: data.dateExpires
    }

    if (editingReport) {
      updateReport(
        { ...payload, id: editingReport.id },
        {
          onSuccess: () => {
            toast.success('Physician report updated successfully')
            queryClient.invalidateQueries(['user-physician-report'])
            onClose()
            onSuccess?.()
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to update physician report')
          }
        }
      )
    } else {
      submitReport(payload, {
        onSuccess: () => {
          toast.success('Physician report created successfully')
          queryClient.invalidateQueries(['user-physician-report'])
          onClose()
          onSuccess?.()
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to create physician report')
        }
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[999999999999999999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingReport ? 'Edit Physician Report' : 'Create Physician Report'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Physician Name *
              </label>
              <input
                type="text"
                {...register('physicianName')}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.physicianName ? 'border-red-500' : ''}`}
                placeholder="Enter physician name"
              />
              {errors.physicianName && <p className="text-red-500 text-sm mt-1">{errors.physicianName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Physician Email *
              </label>
              <input
                type="email"
                {...register('physicianEmail')}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.physicianEmail ? 'border-red-500' : ''}`}
                placeholder="Enter physician email"
              />
              {errors.physicianEmail && <p className="text-red-500 text-sm mt-1">{errors.physicianEmail.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hospital Name *
              </label>
              <input
                type="text"
                {...register('hospitalName')}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.hospitalName ? 'border-red-500' : ''}`}
                placeholder="Enter hospital name"
              />
              {errors.hospitalName && <p className="text-red-500 text-sm mt-1">{errors.hospitalName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Physician Phone *
              </label>
              <input
                type="tel"
                {...register('physicianPhone')}
                inputMode="numeric"
                onKeyPress={(e) => {
                  if (!/[0-9+\-() ]/.test(e.key)) {
                    e.preventDefault()
                  }
                }}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.physicianPhone ? 'border-red-500' : ''}`}
                placeholder="Enter physician phone"
              />
              {errors.physicianPhone && <p className="text-red-500 text-sm mt-1">{errors.physicianPhone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                License Number *
              </label>
              <input
                type="text"
                {...register('licenseNumber')}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.licenseNumber ? 'border-red-500' : ''}`}
                placeholder="Enter license number"
              />
              {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Issued *
              </label>
              <input
                type="date"
                {...register('dateIssued')}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.dateIssued ? 'border-red-500' : ''}`}
              />
              {errors.dateIssued && <p className="text-red-500 text-sm mt-1">{errors.dateIssued.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Expires *
              </label>
              <input
                type="date"
                {...register('dateExpires')}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.dateExpires ? 'border-red-500' : ''}`}
              />
              {errors.dateExpires && <p className="text-red-500 text-sm mt-1">{errors.dateExpires.message}</p>}
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            {uploadedFile || reportBase64 ? (
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {uploadedFile?.name || 'Physician Report'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFile(null)
                    setValue('reportBase64', '')
                  }}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                  className="hidden"
                  id="physician-report-upload"
                />
                <label htmlFor="physician-report-upload" className="cursor-pointer">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Drag and drop your file here</p>
                  <p className="text-xs text-gray-500">or click to select (PDF, JPG, PNG - Max 10MB)</p>
                </label>
              </div>
            )}
          </div>
          {errors.reportBase64 && <p className="text-red-500 text-sm">{errors.reportBase64.message}</p>}

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-900 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isUpdating}
              className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300"
            >
              {isSubmitting || isUpdating ? 'Saving...' : editingReport ? 'Update Report' : 'Create Report'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PhysicianReportModal

