"use client"
import React, { useState, useRef, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/core'
import { useLanguage } from '@/hooks/useLanguage'
import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'
import toast from 'react-hot-toast'
import { useSubmitPhysicianReport } from '../../../api/insurance/physician/createPhysicianReport'
import { useFetchPhysicianReport } from '../../../api/insurance/physician/fetchPhysicianReport'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zod validation schema
const physicianReportSchema = z.object({
  physicianName: z.string().min(2, 'Physician name must be at least 2 characters').max(100, 'Physician name must be less than 100 characters'),
  physicianEmail: z.string().email('Invalid email address'),
  hospitalName: z.string().min(2, 'Hospital name must be at least 2 characters').max(100, 'Hospital name must be less than 100 characters'),
  physicianPhone: z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number format'),
  licenseNumber: z.string().min(2, 'License number must be at least 2 characters').max(50, 'License number must be less than 50 characters'),
  dateIssued: z.string().refine((date) => {
    const d = new Date(date)
    return !isNaN(d.getTime())
  }, 'Invalid date format'),
  dateExpires: z.string().refine((date) => {
    const d = new Date(date)
    return !isNaN(d.getTime())
  }, 'Invalid date format'),
  reportBase64: z.string().min(1, 'Physician report file is required')
}).refine((data) => {
  const issued = new Date(data.dateIssued)
  const expires = new Date(data.dateExpires)
  return expires > issued
}, {
  message: 'Expiration date must be after issue date',
  path: ['dateExpires']
})

type PhysicianReportFormData = z.infer<typeof physicianReportSchema>

const PhysicianReportUpload = () => {
  const { language } = useLanguage()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const physicianSigRef = useRef<SignatureCanvas>(null)
  const [physicianSignatureData, setPhysicianSignatureData] = useState<string | null>(null)
  const [canvasWidth, setCanvasWidth] = useState(600)
  const { mutate: submitReport, isLoading: isSubmitting } = useSubmitPhysicianReport()
  const { data: physicianReportData, isLoading: isFetching } = useFetchPhysicianReport()

  // React Hook Form setup with Zod validation
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

  const handleFileUpload = (file: File) => {
    if (file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file)

      // Convert to base64
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

  const clearPhysicianSignature = () => {
    physicianSigRef.current?.clear()
    setPhysicianSignatureData(null)
  }

  const onSubmit = (data: PhysicianReportFormData) => {
    // Validate signature
    if (!physicianSigRef.current || physicianSigRef.current.isEmpty()) {
      toast.error('Please provide physician signature')
      return
    }

    // Submit the physician report with all required fields
    submitReport({
      hospital_name: data.hospitalName,
      physician_name: data.physicianName,
      physician_email: data.physicianEmail,
      physician_report: data.reportBase64,
      physician_license_number: data.licenseNumber,
      physician_phone: data.physicianPhone,
      date_issued: data.dateIssued,
      date_expires: data.dateExpires
    }, {
      onSuccess: () => {
        toast.success('Physician report submitted successfully')
        // Reset form
        setUploadedFile(null)
        reset()
        clearPhysicianSignature()
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Failed to submit physician report')
      }
    })
  }

  // Prefill form with existing physician report data
  useEffect(() => {
    if (physicianReportData) {
      setValue('physicianName', physicianReportData.physician_name || "")
      setValue('physicianEmail', physicianReportData.physician_email || "")
      setValue('hospitalName', physicianReportData.hospital_name || "")
      setValue('licenseNumber', physicianReportData.physician_license_number || "")
      setValue('physicianPhone', physicianReportData.physician_phone || "")
      setValue('reportBase64', physicianReportData.physician_report || "")

      // Format dates from API response (issued_on and expires_on)
      if (physicianReportData.issued_on) {
        const issuedDate = new Date(physicianReportData.issued_on).toISOString().split('T')[0]
        setValue('dateIssued', issuedDate)
      }
      if (physicianReportData.expires_on) {
        const expiresDate = new Date(physicianReportData.expires_on).toISOString().split('T')[0]
        setValue('dateExpires', expiresDate)
      }
    }
  }, [physicianReportData, setValue])

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    let resizeTimeout: NodeJS.Timeout

    const updateCanvasWidth = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (physicianSigRef.current && !physicianSigRef.current.isEmpty()) {
          setPhysicianSignatureData(physicianSigRef.current.toDataURL())
        }
        const width = Math.min(window.innerWidth - 80, 800)
        setCanvasWidth(Math.max(width, 300))
      }, 300)
    }

    updateCanvasWidth()
    window.addEventListener('resize', updateCanvasWidth)

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', updateCanvasWidth)
    }
  }, [])

  React.useEffect(() => {
    if (physicianSignatureData && physicianSigRef.current) {
      physicianSigRef.current.fromDataURL(physicianSignatureData)
    }
  }, [canvasWidth])

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading physician report...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upload Physician Report
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Upload your physician's medical report or clearance
        </p>
      </div>

      {/* Physician Information */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        {/* File Upload Section */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
          {uploadedFile || reportBase64 ? (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {uploadedFile?.name || 'Physician Report'}
                  </p>
                  {uploadedFile && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUploadedFile(null)
                  setValue('reportBase64', '')
                }}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
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
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Drag and drop your file here</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">or click to select (PDF, JPG, PNG - Max 10MB)</p>
              </label>
            </div>
          )}
        </div>

        {errors.reportBase64 && <p className="text-red-500 text-sm mt-2">{errors.reportBase64.message}</p>}

      {/* Physician Signature Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Physician Signature *
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Please sign below to certify the medical report
        </p>
        <div className="border rounded-md p-2 bg-white w-full border-gray-300 dark:border-gray-600 overflow-hidden">
          <SignatureCanvas
            ref={physicianSigRef}
            onEnd={() => {
              const isEmpty = physicianSigRef.current?.isEmpty()
              if (!isEmpty && physicianSigRef.current) {
                setPhysicianSignatureData(physicianSigRef.current.toDataURL())
              }
            }}
            canvasProps={{
              width: canvasWidth,
              height: 100,
              className: 'signature-canvas',
              style: {
                border: '1px solid #ccc',
                touchAction: 'none',
                display: 'block',
                maxWidth: '100%',
                height: 'auto'
              }
            }}
            penColor="#000000"
          />
        </div>
        <Button
          type="button"
          onClick={clearPhysicianSignature}
          className="mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Clear Signature
        </Button>
      </div>

        <Button
          type="submit"
          disabled={!uploadedFile || !physicianSigRef.current || physicianSigRef.current?.isEmpty() || isSubmitting}
          className="w-full bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            'Submit Physician Report'
          )}
        </Button>
      </form>
    </div>
  )
}

export default PhysicianReportUpload

