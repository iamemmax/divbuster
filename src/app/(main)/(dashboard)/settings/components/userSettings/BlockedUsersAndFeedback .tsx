import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronDown, Upload, X } from 'lucide-react';
import CloudIcon from '@/app/icons/(dashboard)/CloudIcon';

// Types
interface BlockedUser {
  name: string;
  date: string;
}

type FeedbackType = 'Suggestions' | 'Bug Report' | 'Feature Request' | 'General Feedback' | 'Compliment';

// Zod schema for feedback form
const feedbackSchema = z.object({
  feedbackType: z.string().min(1, 'Please select a feedback type'),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters long'),
  attachment: z.instanceof(File).optional()
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

// Mock blocked users data
const blockedUsers: BlockedUser[] = [
  { name: 'Kinslee Boone', date: '22/04/24' },
  { name: 'Malayah Sanchez', date: '22/04/24' },
  { name: 'Averie Benitez', date: '22/04/24' },
  { name: 'Jensen Rowland', date: '22/04/24' }
];

const feedbackTypes: FeedbackType[] = [
  'Suggestions', 
  'Bug Report', 
  'Feature Request', 
  'General Feedback', 
  'Compliment'
];

const BlockedUsersAndFeedback: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedbackType: '',
      feedback: '',
      attachment: undefined
    }
  });

  const selectedFeedbackType = watch('feedbackType');

  const onSubmit: SubmitHandler<FeedbackFormData> = (data) => {
    console.log('Form submitted:', {
      ...data,
      attachment: data.attachment ? {
        name: data.attachment.name,
        size: data.attachment.size,
        type: data.attachment.type
      } : null
    });
    // Handle form submission here
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload only PNG, JPG, or GIF files');
      return false;
    }
    
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (file: File): void => {
    if (validateFile(file)) {
      setSelectedFile(file);
      setValue('attachment', file);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = (): void => {
    setSelectedFile(null);
    setValue('attachment', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUnblock = (userName: string): void => {
    console.log('Unblocking user:', userName);
    // Handle unblock logic here
  };

  const openFileDialog = (): void => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl sm:px-6 min-h-screen">
      {/* Header */}
      <div className="">
        

          <h1 className="text-2xl font-semibold font-archivo text-[#09090B] mb-2">
      Blocked Users / Delete Account
      </h1>
      <p className="text-[#71717A] max-w-xl text-xs sm:text-sm font-archivo mb-8">
        People you remove from your friend list will appear here and also note that account 
          deleted can never be recovered again.
      </p>

      </div>

      {/* Blocked List Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Blocked List</h2>
        
        <div className="">
          {blockedUsers.map((user, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 py-5 bg-white  border-b border-gray-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center space-x-4">
                
                <span className="font-medium text-sm text-gray-900">{user.name}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 text-sm">{user.date}</span>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div>
        <h2 className="text-2xl font-semibold font-archivo text-[#09090B] mb-2">Feedback</h2>
        
        <p className="text-[#71717A] text-xs sm:text-sm font-archivo mb-8">
          We're a new dive application and we want to improve and make divebusters the best experience for all divers - so 
          we will appreciate any constructive feedback you have such as feature suggestions or errors you're encountering. 
          we take compliments too.
        </p>

        <div className="space-y-6">
          {/* Feedback Type Dropdown */}
          <div>
            <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-2">
              FeedBack Type
            </label>
            
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 text-left border border-[#ECEFF3] bg-[#F6F8FA] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between transition-colors"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                <span className={selectedFeedbackType ? 'text-gray-900' : 'text-gray-500'}>
                  {selectedFeedbackType || 'Suggestions'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {feedbackTypes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setValue('feedbackType', option);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      role="option"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {errors.feedbackType && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.feedbackType.message}
              </p>
            )}
          </div>

          {/* Feedback Text Area */}
          <div>
            {/* <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
             
            </label> */}
            
            <textarea
              {...register('feedback')}
              id="feedback"
              rows={2}
              className="w-full px-4 py-3 border border-[#ECEFF3] bg-[#F6F8FA] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
              placeholder=" Your Feedback"
            />
            
            {errors.feedback && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.feedback.message}
              </p>
            )}
          </div>

          {/* File Upload with Drag and Drop */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachment (Optional)
            </label>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={openFileDialog}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isDragOver ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                 <CloudIcon className={`w-6 h-6 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
                </div>
                
                {selectedFile ? (
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <span className="text-sm font-medium text-gray-700 block">
                        {selectedFile.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatFileSize(selectedFile.size)}
                      </span>
                    </div>
                    
                  </div>
                ) : (
                  <>
                    <div className="">
                      <button
                        type="button"
                        onClick={openFileDialog}
                        className="py-2 text-[#F7931D] text-sm rounded-lg  transition-colors font-medium"
                      >
                        Add Attachment
                      </button>
                      <p className="text-xs text-[#667085] font-archivo">
                      PNG, JPG or GIF (max. 1200x750px)
                      </p>
                    </div>
                 
                  </>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif"
                  onChange={handleFileInputChange}
                  className="hidden"
                  aria-label="File upload"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none"
              type="button"
              onClick={handleSubmit(onSubmit)}
              >
            
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsersAndFeedback;