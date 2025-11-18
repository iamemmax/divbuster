"use client";
import React, { useState, useEffect } from "react";
import { Button, ErrorModal } from "@/components/core";
import { useLanguage } from "@/hooks/useLanguage";
import { useRateDiveSite } from "../../api/div-sites/rateDiveSite";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { SmallSpinner } from "@/icons/core";
import { z } from "zod";

const ratingSchema = z.object({
  score: z.number().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(1, "Comment is required").max(500, "Comment must be less than 500 characters"),
});

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  removeModal: React.Dispatch<React.SetStateAction<boolean>>
  // onSubmit: (rating: { dive_site_id: number; score: number; comment: string; lang: string }) => void;
  diveSiteId: number;
  diveSiteName: string;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  // onSubmit,
  diveSiteId,
  diveSiteName,
  removeModal
}) => {
   const {
      isErrorModalOpen,
      setErrorModalState,
      openErrorModalWithMessage,
      errorModalMessage,
    } = useErrorModalState();
  
  const [score, setScore] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [errors, setErrors] = useState<{ score?: string; comment?: string }>({});
  const { language } = useLanguage();
const {mutate:handleRate,isLoading}=useRateDiveSite()
  const handleSubmit = () => {
    const validation = ratingSchema.safeParse({ score, comment });
    
    if (!validation.success) {
      const fieldErrors: { score?: string; comment?: string } = {};
      validation.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof typeof fieldErrors] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    
    handleRate({
      dive_site_id: diveSiteId,
      score,
      comment,
      lang: language,
    },
    
   {
        onSuccess: (data) => {

          toast.success("Dive site rated successfully")
          onClose();
          removeModal(false)
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
            onClose();
          removeModal(false)
          
        },
      }
  );
    
    // Reset form
  };

  const handleStarClick = (rating: number) => {
    setScore(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setScore(0);
      setComment("");
      setHoveredStar(0);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999999999999999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 z-[999999999999999999]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {/* Rate Dive Site */}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <p className="text-lg  text-gray-600 dark:text-white mb-2">
            Rate  {diveSiteName}
            </p>
          </div>

          {/* Star Rating */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoveredStar || score)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              ))}
            </div>
            {errors.score && (
              <p className="text-red-500 text-sm mt-1">{errors.score}</p>
            )}
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
                errors.comment 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-orange-500"
              }`}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={score === 0}
              className={`px-6 py-2 flex items-center justify-center gap-x-3 rounded-md font-medium ${
                score === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              Submit Rating {isLoading && <SmallSpinner/>}
            </Button>
          </div>
      </div>
       <ErrorModal
              isErrorModalOpen={isErrorModalOpen}
              setErrorModalState={() => setErrorModalState(false)}
              subheading={errorModalMessage || "Please check your inputs and try again."}
            />
    </div>
  );
};

export default RatingModal;