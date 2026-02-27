"use client"
import React, { useState } from 'react'
import { Button } from '@/components/core'
// import { useLanguage } from '@/hooks/useLanguage'
// import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'
import toast from 'react-hot-toast'

const InsuranceDocumentUpload = () => {
  // const { language } = useLanguage()
  // const t = insuranceTranslations[language] || insuranceTranslations.en
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [documentBase64, setDocumentBase64] = useState<string>("")

  const handleFileUpload = (file: File) => {
    if (file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file)
      
      // Convert to base64
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        setDocumentBase64(base64)
      }
      reader.readAsDataURL(file)
    } else {
      toast.error('File size must be less than 10MB')
    }
  }

  const handleSubmit = () => {
    if (!uploadedFile) {
      toast.error('Please select a file to upload')
      return
    }
    // TODO: Implement API call to upload insurance document
    toast.success('Insurance document uploaded successfully')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upload Insurance Document
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Upload your insurance policy document or certificate
        </p>
      </div>

      {/* File Upload Section */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
        {uploadedFile || documentBase64 ? (
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedFile?.name || 'Insurance Document'}
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
                setDocumentBase64("")
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
              id="insurance-doc-upload"
            />
            <label htmlFor="insurance-doc-upload" className="cursor-pointer">
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

      <Button
        onClick={handleSubmit}
        disabled={!uploadedFile}
        className="w-full bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Upload Document
      </Button>
    </div>
  )
}

export default InsuranceDocumentUpload

