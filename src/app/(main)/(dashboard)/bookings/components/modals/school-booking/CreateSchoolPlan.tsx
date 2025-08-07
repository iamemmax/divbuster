import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogBody, DialogContent } from '@/components/core';
import SchoolBookingInfo from './SchoolBookingInfo';
import SchoolDriverContact from './SchoolDriverContact';
import SelectField from '@/components/core/SelectField';
import SchoolParticipantForm from './SchoolParticipant';

// Validation schema
const createDivePlanSchema = z.object({
  diveLevel: z.string().min(1, "Please select a dive level"),
  location: z.string().min(1, "Please select a dive location"),
  diveSchool: z.string().min(1, "Please select a dive school"),
  diveClass: z.string().min(1, "Please select a dive class"),
  date: z.date({ required_error: "Please select a date" }),
});

type CreateDivePlanFormData = z.infer<typeof createDivePlanSchema>;

interface Props {
  isOpen: boolean;
  setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Calendar = ({
  onDateSelect,
  selectedDate,
}: {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 5)); // June 2024

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

  const days = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    days.push({ date: prevMonth.getDate() - i, isCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth();
    days.push({ date: day, isCurrentMonth: true, fullDate: date, isSelected });
  }

  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    days.push({ date: day, isCurrentMonth: false });
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
          }
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="font-semibold text-gray-900 dark:text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          onClick={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
          }
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday = day.isCurrentMonth && day.date === 6;
          const hasEvent = day.isCurrentMonth && (day.date === 11 || day.date === 24);

          return (
            <button
              key={index}
              onClick={() => day.isCurrentMonth && day.fullDate && onDateSelect(day.fullDate)}
              className={`
                relative p-2 h-10 text-sm rounded transition-colors
                ${day.isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}
                ${day.isSelected ? 'bg-blue-500 text-white' : ''}
                ${isToday ? 'bg-orange-500 text-white' : ''}
                hover:bg-gray-100 dark:hover:bg-gray-700
              `}
            >
              {day.date}
              {hasEvent && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// const SelectField = ({ field, placeholder, options, label }: any) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="space-y-2 grid grid-cols-1 md:grid-cols-[1fr_2fr]">
//       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full p-3 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <span className={field.value ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
//             {field.value ? options.find((opt: any) => opt.value === field.value)?.label : placeholder}
//           </span>
//           <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-300" />
//         </button>

//         {isOpen && (
//           <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
//             {options.map((option: any) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => {
//                   field.onChange(option.value);
//                   setIsOpen(false);
//                 }}
//                 className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg text-gray-900 dark:text-white"
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const CreateSchoolPlan = ({ isOpen, setIsOpenCardModal }: Props) => {
  const [activeStep, setActiveStep] = useState<'create' | 'book' | 'stage1' | 'stage2'>('create');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const createForm = useForm<CreateDivePlanFormData>({
    resolver: zodResolver(createDivePlanSchema),
    defaultValues: {
      diveLevel: '',
      location: '',
      diveSchool: '',
      diveClass: '',
    },
  });

  const onCreateSubmit = (data: CreateDivePlanFormData) => {
    console.log('Form submitted:', data);
    setActiveStep('book');
  };

  const diveLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const locations = [
    { value: 'eden-beach', label: 'Eden Beach' },
    { value: 'coral-reef', label: 'Coral Reef' },
  ];

  const diveSchools = [
    { value: 'wannadive', label: 'WannaDive' },
    { value: 'deep-blue', label: 'Deep Blue' },
  ];

  const diveClasses = [
    { value: 'discover-scuba', label: 'Discover Scuba Dive Exp. (US $95.00)' },
    { value: 'open-water', label: 'Open Water (US $350.00)' },
  ];

  if (!isOpen) return null;

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="!max-w-[917px] !max-h-[90vh]   bg-white dark:bg-gray-900">
        <DialogBody className="w-full max-md:px-2 outline-none text-gray-900 dark:text-white">

        {activeStep=== "create" && (
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold">Create a Dive Plan</h1>
          </div>)}
        {activeStep=== "book" && (
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold">Book a Dive Plan</h1>
          </div>)}
        {(activeStep!== "book" && activeStep!== "create" )&& (
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold">Complete your Booking</h1>
          </div>)}
          <div className="p-3">
            {activeStep === 'create' && (
                <div className="">

              <div className="space-y-6 px-3 overflow-y-auto max-h-[calc(88vh-160px)] ">
                {/* Dive Level */}
                <Controller
                  name="diveLevel"
                  control={createForm.control}
                  render={({ field }) => (
                    <SelectField
                      field={field}
                      label="Choose your Dive Level"
                      placeholder="Beginner"
                      options={diveLevels}
                      
                    />
                  )}
                />
                {createForm.formState.errors.diveLevel && (
                  <p className="text-red-500 text-sm">{createForm.formState.errors.diveLevel.message}</p>
                )}

                {/* Location */}
                <Controller
                  name="location"
                  control={createForm.control}
                  render={({ field }) => (
                    <SelectField
                      field={field}
                      label="Select Dive Location"
                      placeholder="Eden Beach"
                      options={locations}
                    />
                  )}
                />
                {createForm.formState.errors.location && (
                  <p className="text-red-500 text-sm">{createForm.formState.errors.location.message}</p>
                )}

                {/* Dive School */}
                <Controller
                  name="diveSchool"
                  control={createForm.control}
                  render={({ field }) => (
                    <SelectField
                      field={field}
                      label="Select Dive School"
                      placeholder="WannaDive"
                      options={diveSchools}
                    />
                  )}
                />
                {createForm.formState.errors.diveSchool && (
                  <p className="text-red-500 text-sm">{createForm.formState.errors.diveSchool.message}</p>
                )}

                {/* Dive Class */}
                <Controller
                  name="diveClass"
                  control={createForm.control}
                  render={({ field }) => (
                    <SelectField
                      field={field}
                      label="Select Dive Classes"
                      placeholder="Discover Scuba Dive Exp. (US $95.00)"
                      options={diveClasses}
                    />
                  )}
                />
                {createForm.formState.errors.diveClass && (
                  <p className="text-red-500 text-sm">{createForm.formState.errors.diveClass.message}</p>
                )}

                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Choose a date
                  </label>
                  <Controller
                    name="date"
                    control={createForm.control}
                    render={({ field }) => (
                      <Calendar
                        selectedDate={selectedDate}
                        onDateSelect={(date) => {
                          setSelectedDate(date);
                          field.onChange(date);
                        }}
                      />
                    )}
                  />
                </div>
                {createForm.formState.errors.date && (
                  <p className="text-red-500 text-sm">{createForm.formState.errors.date.message}</p>
                )}

                {/* Buttons */}
              </div>
                 <div className="flex justify-end gap-4  border-gray-200 dark:border-gray-700 px-6 pt-4 bg-white dark:bg-gray-900">

                  <button
                    type="button"
                    onClick={() => setIsOpenCardModal(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={createForm.handleSubmit(onCreateSubmit)}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Proceed
                  </button>
                </div>
                </div>
            )}

            {activeStep === 'book' && (
              <SchoolBookingInfo back={() => setActiveStep('create')} next={() => setActiveStep('stage1')} />
            )}
            {activeStep === 'stage1' && (
              <SchoolDriverContact back={() => setActiveStep('stage1')} next={() => setActiveStep('stage2')} />
            )}
            {activeStep === 'stage2' && (
              <SchoolParticipantForm back={() => setActiveStep('stage1')} next={() => setActiveStep('stage2')} />
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSchoolPlan;
