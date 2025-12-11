"use client"
import React from 'react'
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@/components/core"
import { useRouter } from 'next/navigation'
import { AlertTriangle, FileText, Shield } from 'lucide-react'
import { useAuth } from '@/contexts/authentication'
import { useLanguage } from '@/hooks/useLanguage'
import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'

interface Props {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

const InsuranceModal = ({ isOpen, onClose, title, description }: Props) => {
  const router = useRouter()
  const {authState}=useAuth()
  const {user}=authState
  const { language } = useLanguage()
  const t = insuranceTranslations[language] || insuranceTranslations.en

  return (
    <Dialog open={isOpen}>
      <DialogContent className="!max-w-[480px] !z-[999999999999999999] bg-white dark:bg-gray-900 rounded-xl shadow-2xl">
        <DialogBody className="w-full p-0 outline-none">
          <div className="p-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            
            <DialogHeader className="text-center flex flex-col mb-6">
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {title || t.insuranceFormsRequired}
              </DialogTitle>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {description || t.completeFormsDescription}
              </p>
            </DialogHeader>

            <div className="space-y-3 mb-6">
              {!user?.has_filled_medical&&<div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm text-blue-800 dark:text-blue-200">{t.medicalForm}</span>
              </div>}
             {!user?.has_filled_liability&& <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm text-green-800 dark:text-green-200">{t.liabilityForm}</span>
              </div>}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onClose()
                  router.push('/insurance')
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t.completeForms}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default InsuranceModal