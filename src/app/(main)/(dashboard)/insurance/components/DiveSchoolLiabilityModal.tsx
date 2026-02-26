"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/core'
import SignatureCanvas from 'react-signature-canvas'
import { SchoolliabilityForm } from '../../api/insurance/school-liability/getAllDiveSchoolLiability'
import { useFetchInsuranceQuestions } from '../../api/insurance/questions/getIsuranceQuestion'
import { useLanguage } from '@/hooks/useLanguage'
import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'
import { useAuth } from '@/contexts/authentication'
import { SmallSpinner } from '@/icons/core'
import { useUpdateDiveSchoolLiability } from '../../api/insurance/school-liability/updateDiveSchoolLiability'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { useFetchDiveSchools } from '../../api/bookings/fetchDivingSchools'
import { Search, ChevronDown } from 'lucide-react'
import { useUpdateLiabilityReport } from '../../api/insurance/liability/updateLiabilityForm'

interface DiveSchoolLiabilityModalProps {
  isOpen: boolean
  onClose: () => void
  liability: SchoolliabilityForm
}

const DiveSchoolLiabilityModal = ({ isOpen, onClose, liability }: DiveSchoolLiabilityModalProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [canSign, setCanSign] = useState(false)
  const [canSignParent, setCanSignParent] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [isParentSigned, setIsParentSigned] = useState(false)
  const [signatureData, setSignatureData] = useState<string>('')
  const [parentSignatureData, setParentSignatureData] = useState<string>('')
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const sigRef = useRef<SignatureCanvas>(null)
  const parentSigRef = useRef<SignatureCanvas>(null)
  const sigContainerRef = useRef<HTMLDivElement>(null)
  const parentSigContainerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { language } = useLanguage()
  const t = insuranceTranslations[language] || insuranceTranslations.en
  const { authState } = useAuth()
  const { user } = authState
  const { data: questionData, isLoading } = useFetchInsuranceQuestions("liability", String(language))
  const { mutate: handleUpdateDiveSchoolLiability, isLoading: isUpdating } = useUpdateLiabilityReport()
  const { openErrorModalWithMessage } = useErrorModalState()
  const queryClient = useQueryClient()
  const { data: diveSchoolsData, isLoading: isLoadingSchools, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchDiveSchools(undefined, searchQuery)

  const allSchools = diveSchoolsData?.pages?.flatMap(page => page.results) || []

  /**
   * Core fix: resize the canvas pixel dimensions to exactly match the container's
   * rendered width, then restore the saved signature image.
   * Using the container's actual offsetWidth instead of a state-derived value
   * eliminates the CSS-scale distortion that caused inaccurate strokes.
   */
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

    // Only resize if dimensions actually changed
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

  const resizeBothCanvases = useCallback(() => {
    resizeAndRestoreCanvas(sigRef, sigContainerRef, signatureData, setIsSigned)
    resizeAndRestoreCanvas(parentSigRef, parentSigContainerRef, parentSignatureData, setIsParentSigned)
  }, [signatureData, parentSignatureData, resizeAndRestoreCanvas])

  // Initialize form state from liability data
  useEffect(() => {
    if (liability.answers) {
      const parsedAnswers: Record<string, boolean> = {}
      Object.entries(liability.answers).forEach(([key, value]) => {
        parsedAnswers[key] = value === 'true'
      })
      setAnswers(parsedAnswers)
    }
    setCanSign(true)
    setCanSignParent(true)
    setSelectedSchool(liability.dive_school)
    setFirstName(user?.first_name || '')
    setLastName(user?.last_name || '')
    setPhoneNumber(user?.profile_details?.phone_number || '')

    // Capture signature data from liability — canvas restore happens after layout
    if (liability.signature) {
      setSignatureData(liability.signature)
      setIsSigned(true)
    }
    if (liability.parent_or_guardian_signature) {
      setParentSignatureData(liability.parent_or_guardian_signature)
      setIsParentSigned(true)
    }
  }, [liability, user])

  /**
   * After signatureData / parentSignatureData are set (or cleared), restore them
   * onto the correctly-sized canvas. We use requestAnimationFrame to ensure the
   * DOM has finished painting before we read offsetWidth.
   */
  useEffect(() => {
    if (!isOpen) return
    const raf = requestAnimationFrame(() => {
      resizeAndRestoreCanvas(sigRef, sigContainerRef, signatureData, setIsSigned)
    })
    return () => cancelAnimationFrame(raf)
  }, [signatureData, isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) return
    const raf = requestAnimationFrame(() => {
      resizeAndRestoreCanvas(parentSigRef, parentSigContainerRef, parentSignatureData, setIsParentSigned)
    })
    return () => cancelAnimationFrame(raf)
  }, [parentSignatureData, isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle window resize — debounced, restores both signatures at new dimensions
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeBothCanvases()
      }, 300)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [resizeBothCanvases])

  // Handle infinite scroll for dive schools
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    if (scrollHeight - scrollTop - clientHeight < 100 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const clearSignature = () => {
    sigRef.current?.clear()
    setIsSigned(false)
    setSignatureData('')
  }

  const clearParentSignature = () => {
    parentSigRef.current?.clear()
    setIsParentSigned(false)
    setParentSignatureData('')
  }

  const handleSaveChanges = () => {
    if (sigRef.current && !sigRef.current.isEmpty() && parentSigRef.current && !parentSigRef.current.isEmpty()) {
      const signature = sigRef.current.toDataURL()
      const parentSignature = parentSigRef.current.toDataURL()

      const allAnswers: Record<string, string> = {}
      questionData?.data?.forEach(question => {
        allAnswers[question.question_slug] = (answers[question.question_slug] || false).toString()
      })

      const payload = {
        id: String(liability?.id),
        question_ids: questionData?.data?.map(q => q.id) || [],
        answers: allAnswers,
        signature,
        parent_or_guardian_signature: parentSignature,
        dive_instructor_id: 0,
        dive_school_id: selectedSchool?.id || liability.dive_school.id,
        lang: language,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber
      }

      handleUpdateDiveSchoolLiability({ payload }, {
        onSuccess: () => {
          toast.success('Dive School Liability form updated successfully')
          queryClient.invalidateQueries({ queryKey: ['user-School-liability-report'] })
          setIsEditing(false)
          onClose()
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError)
          openErrorModalWithMessage(String(errorMessage))
        }
      })
    } else {
      openErrorModalWithMessage("Please provide both your signature and parent/guardian signature")
    }
  }

  if (!isOpen) return null

  // Shared canvas props factory — no fixed width, canvas pixel size is set imperatively
  const makeCanvasProps = (canSignFlag: boolean) => ({
    width: 600, // initial placeholder; overwritten imperatively by resizeAndRestoreCanvas
    height: 200,
    className: 'signature-canvas',
    style: {
      pointerEvents: (canSignFlag ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
      border: '1px solid #ccc',
      touchAction: 'none' as React.CSSProperties['touchAction'],
      display: 'block',
      width: '100%',   // CSS display width matches container
      height: '200px',
      cursor: canSignFlag ? 'crosshair' : 'not-allowed'
    }
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[999999999999999999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-[999999999999999999] flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {liability.dive_school.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Dive School Liability Form
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 z-50">
          {/* Dive School Dropdown / Display */}
          {isEditing ? (
            <div ref={dropdownRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dive School *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search dive schools..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true) }}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="w-full pl-10 pr-10 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ChevronDown size={18} />
                </div>
              </div>

              {selectedSchool && (
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedSchool.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{selectedSchool.address}</p>
                  {selectedSchool.contact_info && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">{selectedSchool.contact_info}</p>
                  )}
                </div>
              )}

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
                  {isLoadingSchools && allSchools.length === 0 ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 inline-block" />
                    </div>
                  ) : allSchools.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">No dive schools found</div>
                  ) : (
                    <div ref={scrollContainerRef} onScroll={handleScroll} className="max-h-64 overflow-y-auto">
                      {allSchools.map((school: any) => (
                        <div
                          key={school.id}
                          onClick={() => { setSelectedSchool(school); setIsDropdownOpen(false); setSearchQuery('') }}
                          className={`p-3 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            selectedSchool?.id === school.id ? 'bg-orange-100 dark:bg-orange-900/30' : ''
                          }`}
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{school.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{school.address}</p>
                          {school.contact_info && (
                            <p className="text-xs text-gray-600 dark:text-gray-400">{school.contact_info}</p>
                          )}
                        </div>
                      ))}
                      {isFetchingNextPage && (
                        <div className="p-4 text-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 inline-block" />
                        </div>
                      )}
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
              <input
                disabled={!isEditing}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className={`w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${
                  isEditing ? 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent' : 'bg-white dark:bg-gray-700'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.lastName} *</label>
              <input
                disabled={!isEditing}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className={`w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${
                  isEditing ? 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent' : 'bg-white dark:bg-gray-700'
                }`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.phoneNumber}</label>
              <input
                disabled={!isEditing}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                className={`w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${
                  isEditing ? 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent' : 'bg-white dark:bg-gray-700'
                }`}
              />
            </div>
          </div>

          {/* Insurance Questions */}
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto" />
            </div>
          ) : (
            questionData?.data?.map((question) => (
              <div key={question.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{question.text}</span>
                <div className="flex gap-6 ml-4">
                  {isEditing ? (
                    <>
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
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${answers[question?.question_slug] === true ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'}`}>
                            {answers[question?.question_slug] === true && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">{t.yes}</span>
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
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${answers[question?.question_slug] === false ? 'border-red-500 bg-red-500' : 'border-gray-300 bg-white'}`}>
                            {answers[question?.question_slug] === false && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">{t.no}</span>
                      </label>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${answers[question?.question_slug] === true ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'}`}>
                          {answers[question?.question_slug] === true && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">{t.yes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${answers[question?.question_slug] === false ? 'border-red-500 bg-red-500' : 'border-gray-300 bg-white'}`}>
                          {answers[question?.question_slug] === false && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">{t.no}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Your Signature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Signature *
            </label>
            {/* ↓ ref on the wrapper so we can read its actual rendered pixel width */}
            <div
              ref={sigContainerRef}
              className={`border rounded-md p-4 bg-white w-full overflow-hidden ${
                canSign ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 opacity-50'
              }`}
            >
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
            <Button
              type="button"
              onClick={clearSignature}
              disabled={!canSign}
              className="mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              {t.clearSignature}
            </Button>
          </div>

          {/* Parent/Guardian Signature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.parentGuardianSignature} *
            </label>
            <div
              ref={parentSigContainerRef}
              className={`border rounded-md p-4 bg-white w-full overflow-hidden ${
                canSignParent ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 opacity-50'
              }`}
            >
              <SignatureCanvas
                ref={parentSigRef}
                onEnd={() => {
                  const empty = parentSigRef.current?.isEmpty()
                  setIsParentSigned(!empty)
                  if (!empty && parentSigRef.current) setParentSignatureData(parentSigRef.current.toDataURL())
                }}
                canvasProps={makeCanvasProps(canSignParent)}
                penColor={canSignParent ? '#000000' : '#cccccc'}
              />
            </div>
            <Button
              type="button"
              onClick={clearParentSignature}
              disabled={!canSignParent}
              className="mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
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
              <Button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                disabled={!isSigned || !isParentSigned || isUpdating}
                className={`flex-1 flex items-center justify-center gap-x-3 py-2 rounded-md ${
                  isSigned && isParentSigned && !isUpdating
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {t.update} {isUpdating && <SmallSpinner color='#fff' />}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md"
            >
              Edit Form
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiveSchoolLiabilityModal