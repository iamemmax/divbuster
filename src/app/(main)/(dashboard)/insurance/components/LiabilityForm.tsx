"use client"
import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/core'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFetchInsuranceQuestions } from '../../api/insurance/questions/getIsuranceQuestion'
import { useSubmitLiabilityReport } from '../../api/insurance/liability/submitLiabiltyForm'
import { useLanguage } from '@/hooks/useLanguage'
import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'
import { useAuth } from '@/contexts/authentication'
import { SmallSpinner } from '@/icons/core'
import { useFetchLiabilityReport } from '../../api/insurance/liability/retrieveUserLiailityReport'
import { useUpdateLiabilityReport } from '../../api/insurance/liability/updateLiabilityForm'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

const liabilitySchema = z.object({
  parent_or_guardian_signature: z.string().optional(),
  dive_instructor_id: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept all terms')
})

type LiabilityFormData = z.infer<typeof liabilitySchema>

const LiabilityForm = () => {
  const {
        isErrorModalOpen,
        setErrorModalState,
        openErrorModalWithMessage,
        errorModalMessage,
      } = useErrorModalState();
  const {language}= useLanguage()
  const t = insuranceTranslations[language] || insuranceTranslations.en
  const {authState}=useAuth()
  const {user}=authState
  const {data:questionData, isLoading}=useFetchInsuranceQuestions("liability", String(language))
  const {mutate:handleSubmitLiability, isLoading:isSubmitting}=useSubmitLiabilityReport()
    const {mutate:handleUpdateMedical, isLoading:isUpdating}=useUpdateLiabilityReport()
  
  const {data:liabilityReport}=useFetchLiabilityReport()
  const sigRef = useRef<SignatureCanvas>(null)
  const [canSign, setCanSign] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [isSigned, setIsSigned] = useState(false)
  const [canvasWidth, setCanvasWidth] = useState(600)
  const [signatureData, setSignatureData] = useState<string>('')
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<LiabilityFormData>({
    resolver: zodResolver(liabilitySchema),
    defaultValues: {
      parent_or_guardian_signature: liabilityReport?.data?.parent_or_guardian_signature || '',
      dive_instructor_id: undefined,
      acceptTerms: false
    }
  })
  
  const acceptTerms = watch('acceptTerms')

  const clearSignature = () => {
    sigRef.current?.clear()
    setIsSigned(false)
    setSignatureData('')
  }
  const queryClient = useQueryClient()
  const onSubmit = (data: LiabilityFormData) => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const signature = sigRef.current.toDataURL()
      
      // Include all questions with their answers (true/false)
      const allAnswers: Record<string, string> = {}
      questionData?.data?.forEach(question => {
        allAnswers[question.question_slug] = (answers[question.question_slug] || false).toString()
      })
      
      const payload = {
        question_ids: questionData?.data?.map(q => q.id) || [],
        answers: allAnswers,
        signature: signature,
        parent_or_guardian_signature: data.parent_or_guardian_signature || "",
        dive_instructor_id: data.dive_instructor_id ? parseInt(data.dive_instructor_id) : 0,
        lang: language
      }

      handleSubmitLiability({payload},{
        onSuccess:(responseData)=> {
         
          toast.success('Liability form submitted successfully')
          queryClient.invalidateQueries({queryKey:['user-details']})
        },
        onError:(error)=>{
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                  openErrorModalWithMessage(String(errorMessage));
        }
      })
    } else {
     
                   openErrorModalWithMessage(String("Please provide your signature"));
    }
  }

   const onUpdate = (data: LiabilityFormData) => {
   
      if (sigRef.current && !sigRef.current.isEmpty()) {
        const signature = sigRef.current.toDataURL()
       
        
        // Include all questions with their answers (true/false)
        const allAnswers: Record<string, string> = {}
        questionData?.data?.forEach(question => {
          allAnswers[question.question_slug] = (answers[question.question_slug] || false).toString()
        })
        
        const payload = {
          id:String(liabilityReport?.data?.id),
          question_ids: questionData?.data?.map(q => q.id) || [],
          answers: allAnswers,
          signature: signature,
         parent_or_guardian_signature: data.parent_or_guardian_signature || "",
        dive_instructor_id: data.dive_instructor_id ? parseInt(data.dive_instructor_id) : 0,
          lang: language
        }
  
        handleUpdateMedical({payload}, {
          onSuccess:(responseData)=> {
            toast.success('Liability form Updated successfully')
          queryClient.invalidateQueries({queryKey:['user-details']})
            
          },
          onError:(error: any)=>{
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          }
        })
        // Handle form submission
      } else {
     
        openErrorModalWithMessage(String("Please provide your signature"));
      }
    }
  
  React.useEffect(() => {
    setCanSign(acceptTerms)
  }, [acceptTerms])

  // Populate form with liability report data when it loads
  React.useEffect(() => {
    if (liabilityReport?.data) {
      setValue('parent_or_guardian_signature', liabilityReport.data.parent_or_guardian_signature || '')
      
      // Load signature if available
      if (liabilityReport.data.signature && sigRef.current) {
        sigRef.current.fromDataURL(liabilityReport.data.signature)
        setSignatureData(liabilityReport.data.signature)
        setIsSigned(true)
        setValue('acceptTerms', true)
      }
      
      // Load answers if available
      if (liabilityReport.data.answers && questionData?.data) {
        const answersObj: Record<string, boolean> = {}
        const selectedIds: number[] = []
        
        Object.entries(liabilityReport.data.answers).forEach(([key, value]) => {
          const isTrue = value === 'true'
          answersObj[key] = isTrue
          
          if (isTrue) {
            const question = questionData.data.find(q => q.question_slug === key)
            if (question) {
              selectedIds.push(question.id)
            }
          }
        })
        
        setAnswers(answersObj)
        setSelectedQuestions(selectedIds)
      }
    }
  }, [liabilityReport, questionData, setValue])

  React.useEffect(() => {
    let resizeTimeout: NodeJS.Timeout

    const updateCanvasWidth = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (sigRef.current && !sigRef.current.isEmpty()) {
          setSignatureData(sigRef.current.toDataURL())
        }

        // Set canvas width based on window size
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

  // Restore signature data after canvas width changes
  React.useEffect(() => {
    if (signatureData && sigRef.current) {
      sigRef.current.fromDataURL(signatureData)
    }
  }, [canvasWidth])


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.firstName} & {t.lastName} *
          </label>
          <input
          disabled
           value={`${user?.first_name} ${user?.last_name}`}
            type="text"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
             
              
            `}
          />
        </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
             {t.phoneNumber}
          </label>
          <input
          disabled
          value={`${user?.profile_details?.phone_number}`}
            type="tel"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white $border-gray-300 dark:border-gray-600
            `}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.parentGuardianSignature}
          </label>
          <input
            {...register('parent_or_guardian_signature')}
            type="text"
            placeholder="Enter parent/guardian name if applicable"
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
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

      <div>
        <div className={`border rounded-md p-2 bg-white w-full overflow-hidden ${
          canSign ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 opacity-50'
        }`}>
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
              height: 100,
              className: 'signature-canvas',
              style: {
                pointerEvents: canSign ? 'auto' : 'none',
                border: '1px solid #ccc',
                touchAction: 'none',
                display: 'block',
                maxWidth: '100%',
                height: 'auto'
              }
            }}
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

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> By signing this document, you are waiving certain legal rights. Please read carefully before proceeding.
        </p>
      </div>
<div className="grid grid-cols-2 gap-3">
     {!user?.has_filled_liability&& <Button 
        type="submit"
        disabled={!isSigned || !acceptTerms}
        className={`w-full flex items-center justify-center gap-x-3 py-3 rounded-md ${
          isSigned && acceptTerms 
            ? 'bg-orange-500 text-white hover:bg-orange-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {t.submit}  {isSubmitting && <SmallSpinner color='#fff'/>}
      </Button>}

      {user?.has_filled_liability&&<Button 
              type="button"
              onClick={() => handleSubmit(onUpdate)()}
              disabled={!isSigned || !acceptTerms}
              className={`w-full flex items-center gap-x-3 py-3 rounded-md ${
                isSigned && acceptTerms 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t.update}   { isUpdating && <SmallSpinner color='#fff'/>}
            </Button>}

</div>
    </form>
  )
}

export default LiabilityForm