"use client"
import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button, ErrorModal } from '@/components/core'
import { useForm } from 'react-hook-form'
import { useFetchInsuranceQuestions } from '../../api/insurance/questions/getIsuranceQuestion'
import { useAuth } from '@/contexts/authentication'
import { useLanguage } from '@/hooks/useLanguage'
import { insuranceTranslations } from '@/app/(main)/translation/insuranceTranslation'
import { useSubmitMedalReport } from '../../api/insurance/medical/submitMedicalFOrm'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import { SmallSpinner } from '@/icons/core'
import { useFetchMedicalReport } from '../../api/insurance/medical/retrieveUserMedicalReport'
import { useUpdateMedalReport } from '../../api/insurance/medical/updateMedicalForm'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

type MedicalFormData = {

  emergencyContact: string
  emergencyPhone: string
  medicalConditions?: boolean
  medications?: string
  allergies?: string
  lastPhysical?: string
  physicianName?: string
  physicianPhone?: string
  hospitalName?: string
  physicianEmail?: string
  diveInstructorId?: number
  medicalCertification: boolean
}

const MedicalForm = () => {
  const {
      isErrorModalOpen,
      setErrorModalState,
      openErrorModalWithMessage,
      errorModalMessage,
    } = useErrorModalState();
  const {authState}=useAuth()
  const {language}= useLanguage()
  const t = insuranceTranslations[language] || insuranceTranslations.en
  const {user}=authState
  const {data:questionData, isLoading}=useFetchInsuranceQuestions("medical",String(language))
  const sigRef = useRef<SignatureCanvas>(null)
  const physicianSigRef = useRef<SignatureCanvas>(null)
  const [canSign, setCanSign] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [isPhysicianSigned, setIsPhysicianSigned] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [canvasWidth, setCanvasWidth] = useState(typeof window !== 'undefined' ? Math.min(window.innerWidth - 100, 800) : 800)
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const [physicianSignatureData, setPhysicianSignatureData] = useState<string | null>(null)
  
  const {data:medicalReport}=useFetchMedicalReport()
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<MedicalFormData>({
    defaultValues: {
      physicianName: medicalReport?.data?.physician_name || '',
      hospitalName: medicalReport?.data?.hospital_name || '',
      physicianEmail: medicalReport?.data?.physician_email || '',
      diveInstructorId:  undefined,
      medicalConditions: false,
      medicalCertification: false
    }
  })

  // Populate form with medical report data when it loads
  React.useEffect(() => {
    if (medicalReport?.data) {
      setValue('physicianName', medicalReport.data.physician_name || '')
      setValue('hospitalName', medicalReport.data.hospital_name || '')
      setValue('physicianEmail', medicalReport.data.physician_email || '')
      // setValue('diveInstructorId', medicalReport.data.dive_instructor_id || undefined)
      
      // Load signatures if available
      if (medicalReport.data.signature && sigRef.current) {
        sigRef.current.fromDataURL(medicalReport.data.signature)
        setSignatureData(medicalReport.data.signature)
        setIsSigned(true)
        setValue('medicalCertification', true)
      }
      if (medicalReport.data.physician_signature && physicianSigRef.current) {
        physicianSigRef.current.fromDataURL(medicalReport.data.physician_signature)
        setPhysicianSignatureData(medicalReport.data.physician_signature)
        setIsPhysicianSigned(true)
      }
      
      // Load answers if available
      if (medicalReport.data.answers && questionData?.data) {
        const answersObj: Record<string, boolean> = {}
        const selectedIds: number[] = []
        
        Object.entries(medicalReport.data.answers).forEach(([key, value]) => {
          const isTrue = value === 'true'
          answersObj[key] = isTrue
          
          // Find question ID by slug and add to selectedQuestions if answer is true
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
  }, [medicalReport, questionData, setValue])


  
  const watchedValues = watch()
  const isCertified = watchedValues.medicalCertification

 



  const clearSignature = () => {
    sigRef.current?.clear()
    setIsSigned(false)
    setSignatureData(null)
  }

  const clearPhysicianSignature = () => {
    physicianSigRef.current?.clear()
    setIsPhysicianSigned(false)
    setPhysicianSignatureData(null)
  }
  const queryClient = useQueryClient()
  const {mutate:handleSubmitMedical, isLoading:isSubmitting}=useSubmitMedalReport()
  const {mutate:handleUpdateMedical, isLoading:isUpdating}=useUpdateMedalReport()
  const onSubmit = (data: MedicalFormData) => {
    if (!data.medicalCertification) {
      openErrorModalWithMessage(String("You must certify your medical fitness"));

      return
    }
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const signature = sigRef.current.toDataURL()
      const physicianSignature = physicianSigRef.current && !physicianSigRef.current.isEmpty() 
        ? physicianSigRef.current.toDataURL() 
        : ""
      
      // Include all questions with their answers (true/false)
      const allAnswers: Record<string, string> = {}
      questionData?.data?.forEach(question => {
        allAnswers[question.question_slug] = (answers[question.question_slug] || false).toString()
      })
      
      const payload = {
        question_ids: questionData?.data?.map(q => q.id) || [],
        answers: allAnswers,
        signature: signature,
        parent_or_guardian_signature: "",
        physician_name: data.physicianName || "",
        hospital_name: data.hospitalName || "",
        physician_email: data.physicianEmail || "",
        physician_signature: physicianSignature,
        dive_instructor_id: data.diveInstructorId || 0,
        lang: language
      }

      handleSubmitMedical({payload},{
        onSuccess:(data)=> {
          toast.success('Medical form submitted successfully')
          queryClient.invalidateQueries({queryKey:['user-details']})  
        },
        onError:(error)=>{
const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        }
      })
      // Handle form submission
    } else {
   
      openErrorModalWithMessage(String("Please provide your signature"));
    }
  }
  const onUpdate = (data: MedicalFormData) => {
    if (!data.medicalCertification) {
      openErrorModalWithMessage(String("You must certify your medical fitness"));

      return
    }
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const signature = sigRef.current.toDataURL()
      const physicianSignature = physicianSigRef.current && !physicianSigRef.current.isEmpty() 
        ? physicianSigRef.current.toDataURL() 
        : ""
      
      // Include all questions with their answers (true/false)
      const allAnswers: Record<string, string> = {}
      questionData?.data?.forEach(question => {
        allAnswers[question.question_slug] = (answers[question.question_slug] || false).toString()
      })
      
      const payload = {
        id:String(medicalReport?.data?.id),
        question_ids: questionData?.data?.map(q => q.id) || [],
        answers: allAnswers,
        signature: signature,
        parent_or_guardian_signature: "",
        physician_name: data.physicianName || "",
        hospital_name: data.hospitalName || "",
        physician_email: data.physicianEmail || "",
        physician_signature: physicianSignature,
        dive_instructor_id: data.diveInstructorId || 0,
        lang: language
      }

      handleUpdateMedical({payload}, {
        onSuccess:()=> {
         toast.success('Medical form Updated successfully')
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
    setCanSign(isCertified)
  }, [isCertified])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    let resizeTimeout: NodeJS.Timeout
    
    const updateCanvasWidth = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        // Save current signature data before resize
        if (sigRef.current && !sigRef.current.isEmpty()) {
          setSignatureData(sigRef.current.toDataURL())
        }
        if (physicianSigRef.current && !physicianSigRef.current.isEmpty()) {
          setPhysicianSignatureData(physicianSigRef.current.toDataURL())
        }
        
        const width = Math.min(window.innerWidth - 100, 800)
        setCanvasWidth(width)
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
    if (physicianSignatureData && physicianSigRef.current) {
      physicianSigRef.current.fromDataURL(physicianSignatureData)
    }
  }, [canvasWidth])

  return (

    <>
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
          {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone.message}</p>}
        </div>
      </div>

   

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.physicianName}
          </label>
          <input
            {...register('physicianName')}
            type="text"
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.hospitalName}
          </label>
          <input
            {...register('hospitalName')}
            type="text"
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.physicianEmail}
          </label>
          <input
            {...register('physicianEmail')}
            type="email"
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dive Instructor ID
          </label>
          <input
            {...register('diveInstructorId', { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>
            <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.physicianSignature}
        </label>
        <div className="border rounded-md p-2 bg-white max-w-full overflow-hidden border-gray-300 dark:border-gray-600">
           <SignatureCanvas
    ref={physicianSigRef}
    onEnd={() => {
      const isEmpty = physicianSigRef.current?.isEmpty()
      setIsSigned(!isEmpty)
      if (!isEmpty && physicianSigRef.current) {
        setSignatureData(physicianSigRef.current.toDataURL())
      }
    }}
    canvasProps={{
      width: canvasWidth,
      height: 100,
      className: 'signature-canvas',
      style: { 
        pointerEvents: canSign ? 'auto' : 'none',
        border: '1px solid #ccc',
        touchAction: 'none' // Important for mobile
      }
    }}
    // penColor={canSign ? '#000000' : '#cccccc'}
  />
        </div>
        <Button
          type="button"
          onClick={clearPhysicianSignature}
          className="mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {t.clearSignature}
        </Button>
      </div>

      {/* Insurance Questions */}
      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      ) : (
        questionData?.data?.map((question) => (
          <div key={question.id} className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedQuestions.includes(question.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedQuestions(prev => [...prev, question.id])
                    setAnswers(prev => ({ ...prev, [question?.question_slug]: true }))
                  } else {
                    setSelectedQuestions(prev => prev.filter(id => id !== question.id))
                    setAnswers(prev => {
                      const newAnswers = { ...prev }
                      delete newAnswers[question?.question_slug]
                      return newAnswers
                    })
                  }
                }}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {question.text}
              </span>
            </label>
          </div>
        ))
      )}



     

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.participantSignature} *
        </label>
        
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-2">
             <div>
        <label className="flex items-start space-x-3">
          <input
            {...register('medicalCertification')}
            type="checkbox"
            className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t.certifyMedicalFitness} *
          </span>
        </label>
        {errors.medicalCertification && <p className="text-red-500 text-sm mt-1">{errors.medicalCertification.message}</p>}
      </div>
           
          </div>
        
        <div className={`border rounded-md p-2 bg-white max-w-full overflow-hidden ${
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
        touchAction: 'none' // Important for mobile
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


<div className="grid grid-cols-2 gap-3">
     {!user?.has_filled_medical&& <Button 
        type="submit"
        disabled={!isSigned || !isCertified}
        className={`w-full flex items-center gap-x-3 py-3 rounded-md ${
          isSigned && isCertified 
            ? 'bg-orange-500 text-white hover:bg-orange-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {t.submit}  { isSubmitting && <SmallSpinner color='#fff'/>}
      </Button>}
      {user?.has_filled_medical&&<Button 
        type="button"
        onClick={() => handleSubmit(onUpdate)()}
        disabled={!isSigned || !isCertified}
        className={`w-full flex items-center gap-x-3 py-3 rounded-md ${
          isSigned && isCertified 
            ? 'bg-orange-500 text-white hover:bg-orange-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {t.update}  { isUpdating && <SmallSpinner color='#fff'/>}
      </Button>}

</div>

    </form>
    
     <ErrorModal
            isErrorModalOpen={isErrorModalOpen}
            setErrorModalState={() => setErrorModalState(false)}
            subheading={errorModalMessage || "Please check your inputs and try again."}
          />
    </>
  )
}

export default MedicalForm