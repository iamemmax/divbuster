"use client"
import React, { useRef, useState, useCallback } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/core'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFetchInsuranceQuestions } from '../../api/insurance/questions/getIsuranceQuestion'
import { useSubmitDiveSchoolLiabilityReport } from '../../api/insurance/liability/submitDiveSchoolLiabilityForm'
import { useLanguage } from '@/hooks/useLanguage'
import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'
import { useAuth } from '@/contexts/authentication'
import { SmallSpinner } from '@/icons/core'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { useFetchDiveSchools } from '../../api/bookings/fetchDivingSchools'
import { Search, ChevronDown } from 'lucide-react'

const diveSchoolLiabilitySchema = z.object({
  dive_instructor_id: z.string().optional(),
  dive_school_id: z.string().min(1, 'Dive school is required'),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept all terms')
})

type DiveSchoolLiabilityFormData = z.infer<typeof diveSchoolLiabilitySchema>

interface DiveSchoolLiabilityFormProps {
  onSuccess?: () => void
}

const DiveSchoolLiabilityForm = ({ onSuccess }: DiveSchoolLiabilityFormProps) => {
  const {
    openErrorModalWithMessage,
  } = useErrorModalState();
  const { language } = useLanguage()
  const t = insuranceTranslations[language] || insuranceTranslations.en
  const { authState } = useAuth()
  const { user } = authState
  const { data: questionData, isLoading } = useFetchInsuranceQuestions("liability", String(language))
  const { mutate: handleSubmitDiveSchoolLiability, isLoading: isSubmitting } = useSubmitDiveSchoolLiabilityReport()

  // Dive school search and dropdown state
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { data: diveSchoolsData, isLoading: isLoadingSchools, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchDiveSchools(undefined, searchQuery)

  const sigRef = useRef<SignatureCanvas>(null)
  const parentSigRef = useRef<SignatureCanvas>(null)
  const [canSign, setCanSign] = useState(false)
  const [canSignParent, setCanSignParent] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [isSigned, setIsSigned] = useState(false)
  const [isParentSigned, setIsParentSigned] = useState(false)
  const [canvasWidth, setCanvasWidth] = useState(600)
  const [signatureData, setSignatureData] = useState<string>('')
  const [_parentSignatureData, setParentSignatureData] = useState<string>('')

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DiveSchoolLiabilityFormData>({
    resolver: zodResolver(diveSchoolLiabilitySchema),
    defaultValues: {
      dive_instructor_id: undefined,
      dive_school_id: '',
      acceptTerms: false
    }
  })

  const acceptTerms = watch('acceptTerms')
  const diveSchoolId = watch('dive_school_id')

  // Handle infinite scroll for dive schools
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get all schools from all pages
  const allSchools = React.useMemo(() => {
    return diveSchoolsData?.pages?.flatMap(page => page.results) || []
  }, [diveSchoolsData])

  const clearSignature = () => {
    sigRef.current?.clear()
    setIsSigned(false)
    setSignatureData('')
  }

  const queryClient = useQueryClient()

  const onSubmit = (data: DiveSchoolLiabilityFormData) => {
    if (sigRef.current && !sigRef.current.isEmpty() && parentSigRef.current && !parentSigRef.current.isEmpty()) {
      const signature = sigRef.current.toDataURL()
      const parentSignature = parentSigRef.current.toDataURL()

      const allAnswers: Record<string, string> = {}
      questionData?.data?.forEach(question => {
        allAnswers[question.question_slug] = (answers[question.question_slug] || false).toString()
      })

      const payload = {
        question_ids: questionData?.data?.map(q => q.id) || [],
        answers: allAnswers,
        signature: signature,
        parent_or_guardian_signature: parentSignature,
        dive_instructor_id: data.dive_instructor_id ? parseInt(data.dive_instructor_id) : 0,
        dive_school_id: parseInt(data.dive_school_id),
        lang: language
      }

      handleSubmitDiveSchoolLiability({ payload }, {
        onSuccess: () => {
          toast.success('Dive School Liability form submitted successfully')
          queryClient.invalidateQueries({ queryKey: ['user-School-liability-report'] })
          onSuccess?.()
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        }
      })
    } else {
      openErrorModalWithMessage(String("Please provide both your signature and parent/guardian signature"));
    }
  }

  React.useEffect(() => {
    setCanSign(acceptTerms)
    setCanSignParent(acceptTerms)
  }, [acceptTerms])

  React.useEffect(() => {
    let resizeTimeout: NodeJS.Timeout

    const updateCanvasWidth = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (sigRef.current && !sigRef.current.isEmpty()) {
          setSignatureData(sigRef.current.toDataURL())
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
    if (signatureData && sigRef.current) {
      sigRef.current.fromDataURL(signatureData)
    }
  }, [canvasWidth])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Dive School Searchable Dropdown */}
      <div ref={dropdownRef} className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Dive School *
        </label>

        {/* Hidden input for form submission */}
        <input
          type="hidden"
          {...register('dive_school_id')}
          value={selectedSchool?.id || ''}
        />

        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search dive schools..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsDropdownOpen(true)
            }}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full pl-10 pr-10 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <ChevronDown size={18} />
          </div>
        </div>

        {/* Selected School Display */}
        {selectedSchool && (
          <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedSchool.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{selectedSchool.address}</p>
            {selectedSchool.contact_info && (
              <p className="text-xs text-gray-600 dark:text-gray-400">{selectedSchool.contact_info}</p>
            )}
          </div>
        )}

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
            {/* Loading State */}
            {isLoadingSchools && allSchools.length === 0 ? (
              <div className="p-4 text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                </div>
              </div>
            ) : allSchools.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No dive schools found
              </div>
            ) : (
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="max-h-64 overflow-y-auto"
              >
                {allSchools.map((school: any) => (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => {
                      setSelectedSchool(school)
                      setValue('dive_school_id', school.id.toString())
                      setIsDropdownOpen(false)
                      setSearchQuery('')
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${
                      selectedSchool?.id === school.id
                        ? 'bg-orange-50 dark:bg-orange-900/20 border-l-4 border-l-orange-500'
                        : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {school.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {school.address}
                    </p>
                    {school.contact_info && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {school.contact_info}
                      </p>
                    )}
                  </button>
                ))}

                {/* Load More Indicator */}
                {isFetchingNextPage && (
                  <div className="p-3 text-center border-t border-gray-100 dark:border-gray-600">
                    <div className="inline-block">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {errors.dive_school_id && (
          <p className="text-red-500 text-sm mt-1">{errors.dive_school_id.message}</p>
        )}
      </div>

      {/* Rest of the form fields from LiabilityForm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.firstName} & {t.lastName} *
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            type="text"
            value={`${user?.first_name} ${user?.last_name}`}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.phoneNumber}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            type="tel"
            value={`${user?.profile_details?.phone_number}`}
            disabled
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Dive Instructor ID
        </label>
        <input
          {...register('dive_instructor_id')}
          type="number"
          placeholder="Enter instructor ID if applicable"
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Insurance Questions */}
      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
        </div>
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
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    answers[question?.question_slug] === true
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {answers[question?.question_slug] === true && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
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
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    answers[question?.question_slug] === false
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {answers[question?.question_slug] === false && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
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

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md p-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            {...register('acceptTerms')}
            type="checkbox"
            className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t.readAndAccept} *
          </span>
        </label>
        {errors.acceptTerms && <p className="text-red-500 text-sm mt-2">{errors.acceptTerms.message}</p>}
      </div>

      {/* Your Signature */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Signature *
        </label>
        <div className={`border rounded-md p-4 bg-white w-full overflow-hidden flex justify-center ${
          canSign ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 opacity-50'
        }`}>
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <SignatureCanvas
              ref={sigRef}
              onEnd={() => {
                const isEmpty = sigRef.current?.isEmpty()
                setIsSigned(!isEmpty)
                if (!isEmpty && sigRef.current) {
                  setSignatureData(sigRef.current.toDataURL())
                }
              }}
              canvasProps={{
                width: canvasWidth,
                height: 200,
                className: 'signature-canvas',
                style: {
                  pointerEvents: canSign ? 'auto' : 'none',
                  border: '1px solid #ccc',
                  touchAction: 'none',
                  display: 'block',
                  width: '100%',
                  height: '200px',
                  cursor: canSign ? 'crosshair' : 'not-allowed'
                }
              }}
              penColor={canSign ? '#000000' : '#cccccc'}
            />
          </div>
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
        <div className={`border rounded-md p-4 bg-white w-full overflow-hidden flex justify-center ${
          canSignParent ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 opacity-50'
        }`}>
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <SignatureCanvas
              ref={parentSigRef}
              onEnd={() => {
                const isEmpty = parentSigRef.current?.isEmpty()
                setIsParentSigned(!isEmpty)
                if (!isEmpty && parentSigRef.current) {
                  setParentSignatureData(parentSigRef.current.toDataURL())
                }
              }}
              canvasProps={{
                width: canvasWidth,
                height: 200,
                className: 'signature-canvas',
                style: {
                  pointerEvents: canSignParent ? 'auto' : 'none',
                  border: '1px solid #ccc',
                  touchAction: 'none',
                  display: 'block',
                  width: '100%',
                  height: '200px',
                  cursor: canSignParent ? 'crosshair' : 'not-allowed'
                }
              }}
              penColor={canSignParent ? '#000000' : '#cccccc'}
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={() => {
            parentSigRef.current?.clear()
            setIsParentSigned(false)
            setParentSignatureData('')
          }}
          disabled={!canSignParent}
          className="mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          {t.clearSignature}
        </Button>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> By signing this document, you are waiving certain legal rights. Please read carefully before proceeding.
        </p>
      </div>

      <Button
        type="submit"
        disabled={!isSigned || !isParentSigned || !acceptTerms || !diveSchoolId}
        className={`w-full flex items-center justify-center gap-x-3 py-3 rounded-md ${
          isSigned && isParentSigned && acceptTerms && diveSchoolId
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {t.submit} {isSubmitting && <SmallSpinner color='#fff' />}
      </Button>
    </form>
  )
}

export default DiveSchoolLiabilityForm

