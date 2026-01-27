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
  showPhysicianInfo?: boolean
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
  const [canvasWidth, setCanvasWidth] = useState(typeof window !== 'undefined' ? window.innerWidth - 100 : 800)
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const [physicianSignatureData, setPhysicianSignatureData] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [doctorReportBase64, setDoctorReportBase64] = useState<string>("")
  
  const {data:medicalReport}=useFetchMedicalReport()
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<MedicalFormData>({
    defaultValues: {
      physicianName: medicalReport?.data?.physician_name || '',
      hospitalName: medicalReport?.data?.hospital_name || '',
      physicianEmail: medicalReport?.data?.physician_email || '',
      showPhysicianInfo: false,
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
      
      // Load physician report if available
      if (medicalReport.data.physician_report) {
        setDoctorReportBase64(medicalReport.data.physician_report)
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
  const showPhysicianInfo = watchedValues.showPhysicianInfo

 



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
        dive_instructor_id: 0,
        physician_report: doctorReportBase64,
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
        dive_instructor_id: 0,
        physician_report: doctorReportBase64,
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
        
        const width = window.innerWidth - 100
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

   

      <div>
        <label className="flex items-center space-x-3 mb-4">
          <input
            {...register('showPhysicianInfo')}
            type="checkbox"
            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Show Physician Information
          </span>
        </label>
      </div>

      {showPhysicianInfo && (
        <>
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
        </>
      )}

      {/* File Upload Section */}
      {showPhysicianInfo && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.uploadPhysicianReport}
          </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
          {uploadedFile || doctorReportBase64 ? (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {uploadedFile ? uploadedFile.name : 'Physician Report'}
                  </p>
                  {uploadedFile && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  )}
                  {!uploadedFile && doctorReportBase64 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">Previously uploaded</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {doctorReportBase64 && (
                  <a
                    href={doctorReportBase64}
                    download="physician-report"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                  >
                    {t.download || 'Download'}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFile(null)
                    setDoctorReportBase64("")
                  }}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  {t.removeFile}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file && file.size <= 10 * 1024 * 1024) {
                    setUploadedFile(file)
                    
                    // Convert to base64
                    const reader = new FileReader()
                    reader.onload = () => {
                      const base64 = reader.result as string
                      setDoctorReportBase64(base64)
                    }
                    reader.readAsDataURL(file)
                  }
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.dragDropFile}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{t.supportedFormats}</p>
              </label>
            </div>
          )}
        </div>
        </div>
      )}

      {showPhysicianInfo && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.physicianSignature}
          </label>
          <div className="border rounded-md p-2 bg-white w-full overflow-hidden border-gray-300 dark:border-gray-600">
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
                  touchAction: 'none'
                }
              }}
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
      )}

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