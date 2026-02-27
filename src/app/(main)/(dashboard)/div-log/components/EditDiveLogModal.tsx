"use client";
import React from 'react';
import { Dialog, DialogContent, Button, ErrorModal } from '@/components/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/hooks/useLanguage';
import { useUpdateDiveLogHeader } from '../../api/div-logs/update/editDIveLogHeader';
import { useQueryClient } from 'react-query';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { useErrorModalState } from '@/hooks';
import { SmallSpinner } from '@/icons/core';
import toast from 'react-hot-toast';

interface EditDiveLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; start_date: string; end_date: string }) => void;
  initialData: {
    name: string;
    start_date: string;
    end_date: string;
    id:string
  };
}

const EditDiveLogModal: React.FC<EditDiveLogModalProps> = ({
  isOpen,
  onClose,
  initialData
}) => {
  const {
      isErrorModalOpen,
      setErrorModalState,
      openErrorModalWithMessage,
      errorModalMessage,
    } = useErrorModalState();
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  
  const translations = {
    en: {
      title: "Edit Dive Log",
      subtitle: "Update the name and title of your dive log",
      nameLabel: "Name",
      startDateLabel: "Start Date",
      endDateLabel: "End Date",
      namePlaceholder: "Enter dive log name",
      startDatePlaceholder: "Select start date",
      endDatePlaceholder: "Select end date",
      cancel: "Cancel",
      save: "Save Changes",
      nameRequired: "Name is required",
      startDateRequired: "Start date is required",
      endDateRequired: "End date is required",
      messages: {
        error: "Please check your inputs and try again."
      }
    },
    es: {
      title: "Editar Registro de Buceo",
      subtitle: "Actualiza el nombre y título de tu registro de buceo",
      nameLabel: "Nombre",
      startDateLabel: "Fecha de Inicio",
      endDateLabel: "Fecha de Fin",
      namePlaceholder: "Ingresa el nombre del registro",
      startDatePlaceholder: "Selecciona fecha de inicio",
      endDatePlaceholder: "Selecciona fecha de fin",
      cancel: "Cancelar",
      save: "Guardar Cambios",
      nameRequired: "El nombre es requerido",
      startDateRequired: "La fecha de inicio es requerida",
      endDateRequired: "La fecha de fin es requerida",
      messages: {
        error: "Por favor, verifique sus entradas e intente nuevamente."
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const schema = z.object({
    name: z.string().min(1, t.nameRequired),
    start_date: z.string().min(1, t.startDateRequired),
    end_date: z.string().min(1, t.endDateRequired)
  });

  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData
  });

  const watchedStartDate = watch('start_date');
  const watchedEndDate = watch('end_date');

  React.useEffect(() => {
    if (isOpen) {
      setValue('name', initialData.name);
      setValue('start_date', initialData.start_date);
      setValue('end_date', initialData.end_date);
    }
  }, [isOpen, initialData, setValue]);

  const {mutate:handleUpdate,isLoading}=useUpdateDiveLogHeader()
 const handleSave = (data: { name: string; start_date: string; end_date: string }) => {
  const payload = {
    id:initialData.id,
    name: data.name,
    start_date: data.start_date,
    end_date: data.end_date
  }
  
 handleUpdate(
        payload,
         {
           onSuccess: () => {
            toast.success("dive log updated successfully")
             onClose()
             queryClient.invalidateQueries({ queryKey: ["single-div-log"] });
             queryClient.invalidateQueries({ queryKey: ["div-logs"] });
           },
           onError: (error) => {
             const errorMessage = formatAxiosErrorMessage(error as AxiosError);
             openErrorModalWithMessage(String(errorMessage));
           },
         }
       );
   
  };
  const handleClose = () => {
    reset();
    onClose()
  
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-archivo">
              {t.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-archivo">
              {t.subtitle}
            </p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-archivo">
                {t.nameLabel}
              </label>
              <input
                {...register('name')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-archivo"
                placeholder={t.namePlaceholder}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 font-archivo">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-archivo">
                {t.startDateLabel}
              </label>
              <div className="relative">
                <input
                  {...register('start_date')}
                  type="date"
                  onChange={(e) => setValue('start_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-archivo opacity-0 absolute inset-0 cursor-pointer"
                  id="start-date-input"
                />
                <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-archivo text-left flex items-center justify-between pointer-events-none">
                  <span>{watchedStartDate ? new Date(watchedStartDate).toLocaleDateString() : t.startDatePlaceholder}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.start_date && (
                <p className="text-red-500 text-sm mt-1 font-archivo">{errors.start_date.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-archivo">
                {t.endDateLabel}
              </label>
              <div className="relative">
                <input
                  {...register('end_date')}
                  type="date"
                  onChange={(e) => setValue('end_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-archivo opacity-0 absolute inset-0 cursor-pointer"
                  id="end-date-input"
                />
                <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-archivo text-left flex items-center justify-between pointer-events-none">
                  <span>{watchedEndDate ? new Date(watchedEndDate).toLocaleDateString() : t.endDatePlaceholder}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.end_date && (
                <p className="text-red-500 text-sm mt-1 font-archivo">{errors.end_date.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-archivo"
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              className="px-6 py-2.5 flex justify-center items-center gap-x-3 text-sm font-medium text-white bg-[#F7931D] hover:bg-[#E8841A] rounded-lg transition-colors duration-200 font-archivo focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {t.save} {isLoading && <SmallSpinner color='#fff'/>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

     <ErrorModal
                isErrorModalOpen={isErrorModalOpen}
                setErrorModalState={() => {
                  setErrorModalState(false);
                }}
                subheading={errorModalMessage || t?.messages?.error}
              />
    </>
  );
};

export default EditDiveLogModal;