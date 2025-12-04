"use client"
import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/core'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const liabilitySchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  emergencyPhone: z.string().min(1, 'Emergency phone is required'),
  certificationLevel: z.string().min(1, 'Certification level is required'),
  certificationAgency: z.string().min(1, 'Certification agency is required'),
  agreementAccepted: z.boolean().refine(val => val === true, 'You must accept the agreement'),
  riskAcknowledged: z.boolean().refine(val => val === true, 'You must acknowledge the risks'),
  medicalFitness: z.boolean().refine(val => val === true, 'You must certify medical fitness')
})

type LiabilityFormData = z.infer<typeof liabilitySchema>

const LiabilityForm = () => {
  const sigRef = useRef<SignatureCanvas>(null)
  const [canSign, setCanSign] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<LiabilityFormData>({
    resolver: zodResolver(liabilitySchema),
    defaultValues: {
      agreementAccepted: false,
      riskAcknowledged: false,
      medicalFitness: false
    }
  })
  
  const watchedValues = watch()
  const allCheckboxesChecked = watchedValues.agreementAccepted && watchedValues.riskAcknowledged && watchedValues.medicalFitness

  const clearSignature = () => {
    sigRef.current?.clear()
    setCanSign(false)
  }
  
  const onSubmit = (data: LiabilityFormData) => {
    if (!sigRef.current?.isEmpty()) {
      console.log('Form submitted:', data)
      // Handle form submission
    } else {
      alert('Please provide your signature')
    }
  }
  
  React.useEffect(() => {
    setCanSign(allCheckboxesChecked)
  }, [allCheckboxesChecked])

  const waiverText = `
    RELEASE AND WAIVER OF LIABILITY, ASSUMPTION OF RISK AND INDEMNITY AGREEMENT

    PLEASE READ CAREFULLY. THIS IS A RELEASE OF LEGAL RIGHTS.

    In consideration of being allowed to participate in scuba diving activities and to use the facilities, equipment and services of DivBuster, I agree to the following:

    1. ACKNOWLEDGMENT OF RISKS: I acknowledge that scuba diving activities involve inherent risks including but not limited to: decompression sickness, arterial gas embolism, nitrogen narcosis, oxygen toxicity, hypothermia, marine life injuries, equipment failure, entanglement, entrapment, and drowning which can result in serious injury or death.

    2. ASSUMPTION OF RISK: I voluntarily assume full responsibility for any risks of loss, property damage or personal injury that may be sustained by me as a result of participating in scuba diving activities.

    3. RELEASE OF LIABILITY: I hereby release, discharge and covenant not to sue DivBuster, its owners, managers, employees, agents, and representatives from any and all liability, claims, demands, actions and causes of action whatsoever arising out of or related to any loss, damage, or injury that may be sustained by me while participating in scuba diving activities.

    4. INDEMNIFICATION: I agree to indemnify and hold harmless DivBuster from any loss or liability incurred in defending any claim made by me or anyone making a claim on my behalf.

    5. MEDICAL FITNESS: I certify that I am physically and mentally fit to participate in scuba diving activities and that I have not been advised otherwise by a qualified medical person.

    6. CERTIFICATION AND EXPERIENCE: I certify that I am a certified diver or am participating under proper supervision, and that I will not dive beyond the limits of my training and experience.

    This agreement shall be binding upon my heirs, next of kin, executors, administrators and assigns. I have read this agreement and understand that by signing it I am giving up substantial legal rights.
  `

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            {...register('fullName')}
            type="text"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth *
          </label>
          <input
            {...register('dateOfBirth')}
            type="date"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone *
          </label>
          <input
            {...register('phone')}
            type="tel"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Address *
        </label>
        <input
          {...register('address')}
          type="text"
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City *
          </label>
          <input
            {...register('city')}
            type="text"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            State *
          </label>
          <input
            {...register('state')}
            type="text"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Zip Code *
          </label>
          <input
            {...register('zipCode')}
            type="text"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Emergency Contact *
          </label>
          <input
            {...register('emergencyContact')}
            type="text"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.emergencyContact ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Emergency Phone *
          </label>
          <input
            {...register('emergencyPhone')}
            type="tel"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.emergencyPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Certification Level *
          </label>
          <select
            {...register('certificationLevel')}
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.certificationLevel ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select certification level</option>
            <option value="Open Water">Open Water</option>
            <option value="Advanced Open Water">Advanced Open Water</option>
            <option value="Rescue Diver">Rescue Diver</option>
            <option value="Divemaster">Divemaster</option>
            <option value="Instructor">Instructor</option>
          </select>
          {errors.certificationLevel && <p className="text-red-500 text-sm mt-1">{errors.certificationLevel.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Certification Agency *
          </label>
          <input
            {...register('certificationAgency')}
            type="text"
            placeholder="e.g., PADI, NAUI, SSI"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.certificationAgency ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.certificationAgency && <p className="text-red-500 text-sm mt-1">{errors.certificationAgency.message}</p>}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Liability Waiver Agreement
        </h3>
        <div className=" overflow-y-auto text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {waiverText}
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-start space-x-3">
          <input
            {...register('agreementAccepted')}
            type="checkbox"
            className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            I have read, understood, and agree to be bound by the terms of this Release and Waiver of Liability Agreement *
          </span>
        </label>
        {errors.agreementAccepted && <p className="text-red-500 text-sm">{errors.agreementAccepted.message}</p>}

        <label className="flex items-start space-x-3">
          <input
            {...register('riskAcknowledged')}
            type="checkbox"
            className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            I acknowledge and assume all risks associated with scuba diving activities *
          </span>
        </label>
        {errors.riskAcknowledged && <p className="text-red-500 text-sm">{errors.riskAcknowledged.message}</p>}

        <label className="flex items-start space-x-3">
          <input
            {...register('medicalFitness')}
            type="checkbox"
            className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            I certify that I am physically and mentally fit to participate in scuba diving activities and have not been advised otherwise by a medical professional *
          </span>
        </label>
        {errors.medicalFitness && <p className="text-red-500 text-sm">{errors.medicalFitness.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Digital Signature *
        </label>
        {!canSign && (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please accept all terms above before signing
            </p>
          </div>
        )}
        <div className={`border rounded-md p-2 bg-white w-full ${
          canSign ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 opacity-50'
        }`}>
          <SignatureCanvas
            ref={sigRef}
            canvasProps={{
              width: window?.innerWidth ? Math.min(window.innerWidth - 100, 800) : 800,
              height: 200,
              className: 'signature-canvas'
            }}
            penColor={canSign ? '#000000' : '#000000'}
          />
        </div>
        <Button
          type="button"
          onClick={clearSignature}
          disabled={!canSign}
          className="mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Clear Signature
        </Button>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> By signing this document, you are waiving certain legal rights. Please read carefully before proceeding.
        </p>
      </div>

      <Button 
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600"
      >
        Submit Liability Waiver
      </Button>
    </form>
  )
}

export default LiabilityForm