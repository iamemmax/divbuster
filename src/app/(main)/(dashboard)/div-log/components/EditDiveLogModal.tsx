"use client";
import React from 'react';
import { Dialog, DialogContent, Button } from '@/components/core';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/hooks/useLanguage';

interface EditDiveLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; title: string }) => void;
  initialData: {
    name: string;
    title: string;
  };
}

const EditDiveLogModal: React.FC<EditDiveLogModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      title: "Edit Dive Log",
      subtitle: "Update the name and title of your dive log",
      nameLabel: "Name",
      titleLabel: "Title",
      namePlaceholder: "Enter dive log name",
      titlePlaceholder: "Enter dive site title",
      cancel: "Cancel",
      save: "Save Changes",
      nameRequired: "Name is required",
      titleRequired: "Title is required"
    },
    es: {
      title: "Editar Registro de Buceo",
      subtitle: "Actualiza el nombre y título de tu registro de buceo",
      nameLabel: "Nombre",
      titleLabel: "Título",
      namePlaceholder: "Ingresa el nombre del registro",
      titlePlaceholder: "Ingresa el título del sitio de buceo",
      cancel: "Cancelar",
      save: "Guardar Cambios",
      nameRequired: "El nombre es requerido",
      titleRequired: "El título es requerido"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  React.useEffect(() => {
    if (isOpen) {
      setValue('name', initialData.name);
      setValue('title', initialData.title);
    }
  }, [isOpen, initialData, setValue]);

  const handleSave = (data: { name: string; title: string }) => {
    onSave(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
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
                {...register('name', { required: t.nameRequired })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-archivo"
                placeholder={t.namePlaceholder}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 font-archivo">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-archivo">
                {t.titleLabel}
              </label>
              <input
                {...register('title', { required: t.titleRequired })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-archivo"
                placeholder={t.titlePlaceholder}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1 font-archivo">{errors.title.message}</p>
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
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#F7931D] hover:bg-[#E8841A] rounded-lg transition-colors duration-200 font-archivo focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {t.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDiveLogModal;