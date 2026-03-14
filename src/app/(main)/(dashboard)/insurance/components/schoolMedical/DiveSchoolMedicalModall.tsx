"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/core'
import SignatureCanvas from 'react-signature-canvas'
import { SchoolliabilityForm } from '../../../api/insurance/school-liability/getAllDiveSchoolLiability'
import { useFetchInsuranceQuestions } from '../../../api/insurance/questions/getIsuranceQuestion'
import { useLanguage } from '@/hooks/useLanguage'
import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'
import { useAuth } from '@/contexts/authentication'
import { SmallSpinner } from '@/icons/core'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { useFetchDiveSchools } from '../../../api/bookings/fetchDivingSchools'
import { Search, ChevronDown } from 'lucide-react'
import { useUpdateDiveSchoolMedical } from '../../../api/insurance/school-medical/updateDiveSchoolLiability'

interface DiveSchoolLiabilityModalProps {
  isOpen: boolean
  onClose: () => void
  liability: SchoolliabilityForm
}

// Use undefined for unanswered to distinguish from false
type AnswerMap = Record<string, boolean | undefined>

const DiveSchoolMedicalModal = ({ isOpen, onClose, liability }: DiveSchoolLiabilityModalProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [canSign, setCanSign] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [signatureData, setSignatureData] = useState<string>('')
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const sigRef = useRef<SignatureCanvas>(null)
  const sigContainerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { language } = useLanguage()
  const t = insuranceTranslations[language] || insuranceTranslations.en
  const { authState } = useAuth()
  const { user } = authState
  const { data: questionData, isLoading } = useFetchInsuranceQuestions("medical", String(language))
  const { mutate: handleUpdateDiveSchoolLiability, isLoading: isUpdating } = useUpdateDiveSchoolMedical()
  const { openErrorModalWithMessage } = useErrorModalState()
  const queryClient = useQueryClient()
  const { data: diveSchoolsData, isLoading: isLoadingSchools, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchDiveSchools(undefined, searchQuery)

  const allSchools = diveSchoolsData?.pages?.flatMap(page => page.results) || []

  const resizeAndRestoreCanvas = useCallback((
    canvasRef: React.RefObject<SignatureCanvas>,
    containerRef: React.RefObject<HTMLDivElement>,
    dataUrl: string,
    setSignedState: (v: boolean) => void
  ) => {
    const container = containerRef.current
    const sigCanvas = canvasRef.current
    if (!container || !sigCanvas) return
    const canvas = sigCanvas.getCanvas()
    const width = container.offsetWidth
    const height = 200
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    if (dataUrl) {
      sigCanvas.fromDataURL(dataUrl, { width, height })
      setSignedState(true)
    } else {
      sigCanvas.clear()
      setSignedState(false)
    }
  }, [])

  useEffect(() => {
    if (liability.answers) {
      const parsedAnswers: AnswerMap = {}
      Object.entries(liability.answers).forEach(([key, value]) => {
        // only set if explicitly true or false string
        if (value === 'true') parsedAnswers[key] = true
        else if (value === 'false') parsedAnswers[key] = false
        // leave undefined for anything else
      })
      setAnswers(parsedAnswers)
    }
    setCanSign(true)
    setSelectedSchool(liability.dive_school)
    setFirstName(user?.first_name || '')
    setLastName(user?.last_name || '')
    setPhoneNumber(user?.profile_details?.phone_number || '')
    if (liability.signature) { setSignatureData(liability.signature); setIsSigned(true) }
  }, [liability, user])

  useEffect(() => {
    if (!isOpen) return
    const raf = requestAnimationFrame(() => {
      resizeAndRestoreCanvas(sigRef, sigContainerRef, signatureData, setIsSigned)
    })
    return () => cancelAnimationFrame(raf)
  }, [signatureData, isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeAndRestoreCanvas(sigRef, sigContainerRef, signatureData, setIsSigned)
      }, 300)
    }
    window.addEventListener('resize', handleResize)
    return () => { clearTimeout(resizeTimeout); window.removeEventListener('resize', handleResize) }
  }, [signatureData, resizeAndRestoreCanvas])

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    if (scrollHeight - scrollTop - clientHeight < 100 && hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const clearSignature = () => {
    sigRef.current?.clear()
    setIsSigned(false)
    setSignatureData('')
  }

  // ── answer helpers ──────────────────────────────────────────────────────────
  function setAnswer(slug: string, questionId: number, value: boolean) {
    setAnswers(prev => ({ ...prev, [slug]: value }))
    if (value) {
      setSelectedQuestions(prev => prev.includes(questionId) ? prev : [...prev, questionId])
    } else {
      setSelectedQuestions(prev => prev.filter(id => id !== questionId))
    }
  }

  const handleSaveChanges = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const signature = sigRef.current.toDataURL()
      const allAnswers: Record<string, string> = {}
      questionData?.data?.forEach(question => {
        allAnswers[question.question_slug] = (answers[question.question_slug] ?? false).toString()
      })
      const payload = {
        id: Number(liability?.id),
        question_ids: questionData?.data?.map(q => q.id) || [],
        answers: allAnswers,
        signature,
        parent_or_guardian_signature: "",
        dive_instructor_id: 0,
        dive_school_id: selectedSchool?.id || liability.dive_school.id,
        lang: language as string,
      }
      handleUpdateDiveSchoolLiability({ payload }, {
        onSuccess: () => {
          toast.success('Dive School Medical form updated successfully')
          queryClient.invalidateQueries({ queryKey: ['user-School-Medical-report'] })
          setIsEditing(false)
          onClose()
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError)
          openErrorModalWithMessage(String(errorMessage))
        }
      })
    } else {
      openErrorModalWithMessage("Please provide your signature")
    }
  }

  if (!isOpen) return null

  const makeCanvasProps = (canSignFlag: boolean) => ({
    width: 600,
    height: 200,
    className: 'signature-canvas',
    style: {
      pointerEvents: (canSignFlag ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
      border: '1px solid #ccc',
      touchAction: 'none' as React.CSSProperties['touchAction'],
      display: 'block',
      width: '100%',
      height: '200px',
      cursor: canSignFlag ? 'crosshair' : 'not-allowed'
    }
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{liability.dive_school.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dive School Medical Form</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Dive School */}
          {isEditing ? (
            <div ref={dropdownRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dive School *</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search size={18} /></div>
                <input
                  type="text"
                  placeholder="Search dive schools..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true) }}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="w-full pl-10 pr-10 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><ChevronDown size={18} /></div>
              </div>
              {selectedSchool && (
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedSchool.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{selectedSchool.address}</p>
                </div>
              )}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
                  {isLoadingSchools && allSchools.length === 0 ? (
                    <div className="p-4 text-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 inline-block" /></div>
                  ) : allSchools.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">No dive schools found</div>
                  ) : (
                    <div ref={scrollContainerRef} onScroll={handleScroll} className="max-h-64 overflow-y-auto">
                      {allSchools.map((school: any) => (
                        <div key={school.id} onClick={() => { setSelectedSchool(school); setIsDropdownOpen(false); setSearchQuery('') }}
                          className={`p-3 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedSchool?.id === school.id ? 'bg-orange-100 dark:bg-orange-900/30' : ''}`}>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{school.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{school.address}</p>
                        </div>
                      ))}
                      {isFetchingNextPage && <div className="p-4 text-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 inline-block" /></div>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedSchool?.name || liability.dive_school.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{selectedSchool?.address || liability.dive_school.address}</p>
              {(selectedSchool?.contact_info || liability.dive_school.contact_info) && (
                <p className="text-xs text-gray-600 dark:text-gray-400">{selectedSchool?.contact_info || liability.dive_school.contact_info}</p>
              )}
            </div>
          )}

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.firstName} *</label>
              <input disabled={!isEditing} value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"
                className={`w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${isEditing ? 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500' : 'bg-gray-50 dark:bg-gray-700'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.lastName} *</label>
              <input disabled={!isEditing} value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"
                className={`w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${isEditing ? 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500' : 'bg-gray-50 dark:bg-gray-700'}`} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.phoneNumber}</label>
              <input disabled={!isEditing} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel"
                className={`w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${isEditing ? 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500' : 'bg-gray-50 dark:bg-gray-700'}`} />
            </div>
          </div>

          {/* Questions */}
          {isLoading ? (
            <div className="text-center py-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto" /></div>
          ) : (
           questionData?.data?.map((question) => (
          <div key={question.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
              {question.text}
            </span>
            <div className="flex gap-6 ml-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value="true"
                    checked={answers[question?.question_slug] === true}
                    onChange={() => {
                      setAnswers(prev => ({ ...prev, [question?.question_slug]: true }))
                      if (!selectedQuestions.includes(question.id)) {
                        setSelectedQuestions(prev => [...prev, question.id])
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`size-4 rounded-full border-2 flex items-center justify-center ${
                    answers[question?.question_slug] === true 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    {answers[question?.question_slug] === true && (
                      <div className="size-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {t.yes}
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value="false"
                    checked={answers[question?.question_slug] === false}
                    onChange={() => {
                      setAnswers(prev => ({ ...prev, [question?.question_slug]: false }))
                      setSelectedQuestions(prev => prev.filter(id => id !== question.id))
                    }}
                    className="sr-only"
                  />
                  <div className={`size-4 rounded-full border-2 flex items-center justify-center ${
                    answers[question?.question_slug] === false 
                      ? 'border-red-500 bg-red-500' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    {answers[question?.question_slug] === false && (
                      <div className="size-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {t.no}
                </span>
              </label>
            </div>
          </div>
        ))
          )}

          {/* Signature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Signature *</label>
            <div ref={sigContainerRef} className={`border rounded-md p-4 bg-white w-full overflow-hidden ${canSign ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 opacity-50'}`}>
              <SignatureCanvas
                ref={sigRef}
                onEnd={() => {
                  const empty = sigRef.current?.isEmpty()
                  setIsSigned(!empty)
                  if (!empty && sigRef.current) setSignatureData(sigRef.current.toDataURL())
                }}
                canvasProps={makeCanvasProps(canSign)}
                penColor={canSign ? '#000000' : '#cccccc'}
              />
            </div>
            <Button type="button" onClick={clearSignature} disabled={!canSign}
              className="mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50">
              {t.clearSignature}
            </Button>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> By signing this document, you are waiving certain legal rights. Please read carefully before proceeding.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-md">
                Cancel
              </Button>
              <Button onClick={handleSaveChanges} disabled={!isSigned || isUpdating}
                className={`flex-1 flex items-center justify-center gap-x-3 py-2 rounded-md ${isSigned && !isUpdating ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                {t.update} {isUpdating && <SmallSpinner color='#fff' />}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex-1 bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md">
              Edit Form
            </Button>
          )}
        </div>

      </div>
    </div>
  )
}

export default DiveSchoolMedicalModal