"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useSubmiInsuranceDocument } from '../../../api/insurance/insurance-document/createInsuranceDocument'
import { useUpdateInsuranceDocument } from '../../../api/insurance/insurance-document/updateInsuranceDocument'
import { useQueryClient } from 'react-query'

const insuranceDocumentSchema = z.object({
  issuerName: z.string().min(2, 'Issuer name must be at least 2 characters').max(100, 'Issuer name must be less than 100 characters'),
  policyNumber: z.string().min(2, 'Policy number must be at least 2 characters').max(50, 'Policy number must be less than 50 characters'),
  dateIssued: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  documentBase64: z.string().min(1, 'Document is required')
})

type InsuranceDocumentFormData = z.infer<typeof insuranceDocumentSchema>

interface InsuranceDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  editingDocument?: any
  onSuccess?: () => void
}

const InsuranceDocumentModal: React.FC<InsuranceDocumentModalProps> = ({
  isOpen,
  onClose,
  editingDocument,
  onSuccess
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { mutate: submitDocument, isLoading: isSubmitting } = useSubmiInsuranceDocument()
  const { mutate: updateDocument, isLoading: isUpdating } = useUpdateInsuranceDocument()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<InsuranceDocumentFormData>({
    resolver: zodResolver(insuranceDocumentSchema),
    defaultValues: {
      issuerName: '',
      policyNumber: '',
      dateIssued: '',
      startDate: '',
      endDate: '',
      documentBase64: ''
    }
  })

  useEffect(() => {
    if (editingDocument) {
      setValue('issuerName', editingDocument.issuer_name)
      setValue('policyNumber', editingDocument.policy_number)
      setValue('dateIssued', editingDocument.issued_on?.split('T')[0])
      setValue('startDate', editingDocument.start_date?.split('T')[0])
      setValue('endDate', editingDocument.expires_on?.split('T')[0])
      setValue('documentBase64', editingDocument.insurance_report)

      // Set uploaded file info for display
      if (editingDocument.insurance_report) {
        setUploadedFile({
          name: `insurance-document-${editingDocument.id}`,
          size: editingDocument.insurance_report.length
        } as File)
      }
    }
  }, [editingDocument, setValue])

  const handleFileUpload = (file: File) => {
    if (file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        setValue('documentBase64', base64)
      }
      reader.readAsDataURL(file)
    } else {
      toast.error('File size must be less than 10MB')
    }
  }

  const onSubmit = (data: InsuranceDocumentFormData) => {
    const payload = {
      insurance_report: data.documentBase64,
      issuer_name: data.issuerName,
      date_issued: data.dateIssued,
      start_date: data.startDate,
      end_date: data.endDate,
      policy_number: data.policyNumber
    }

    if (editingDocument) {
      updateDocument({ ...payload, id: editingDocument.id } as any, {
        onSuccess: () => {
          toast.success('Insurance document updated successfully')
          queryClient.invalidateQueries(['insurance-document'])
          onClose()
          onSuccess?.()
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to update document')
        }
      })
    } else {
      submitDocument(payload as any, {
        onSuccess: () => {
          toast.success('Insurance document created successfully')
          queryClient.invalidateQueries(['insurance-document'])
          reset()
          setUploadedFile(null)
          onClose()
          onSuccess?.()
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to create document')
        }
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[999999999999999999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full shadow-lg my-8">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingDocument ? 'Edit Insurance Document' : 'Create Insurance Document'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Issuer Name *
              </label>
              <input
                {...register('issuerName')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.issuerName && <p className="text-red-500 text-xs mt-1">{errors.issuerName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Policy Number *
              </label>
              <input
                {...register('policyNumber')}
                type="text"
                inputMode="numeric"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault()
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.policyNumber && <p className="text-red-500 text-xs mt-1">{errors.policyNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Issued *
              </label>
              <input
                {...register('dateIssued')}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.dateIssued && <p className="text-red-500 text-xs mt-1">{errors.dateIssued.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date *
              </label>
              <input
                {...register('startDate')}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date *
              </label>
              <input
                {...register('endDate')}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Insurance Document *
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              {uploadedFile ? (
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{uploadedFile.name}</span>
                  <button type="button" onClick={() => { setUploadedFile(null); setValue('documentBase64', '') }} className="text-red-500 hover:text-red-700">Remove</button>
                </div>
              ) : (
                <div>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(file) }} className="hidden" id="insurance-doc-file" />
                  <label htmlFor="insurance-doc-file" className="cursor-pointer">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Drag and drop or click to select</p>
                  </label>
                </div>
              )}
            </div>
            {errors.documentBase64 && <p className="text-red-500 text-xs mt-1">{errors.documentBase64.message}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUpdating} className="flex-1 px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-300">
              {isSubmitting || isUpdating ? 'Saving...' : editingDocument ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InsuranceDocumentModal

