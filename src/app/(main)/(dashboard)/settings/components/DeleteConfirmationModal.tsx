import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogBody, DialogContent } from '@/components/core';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  loading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Please be Aware!", 
  loading = false 
}) => {
  if (!isOpen) return null;

  return (
      <Dialog modal={true} open={isOpen}>
          <DialogContent className="w-full  ">
            <DialogBody className="p-0   w-full outline-none  ">
    
      <div className="bg-white rounded-2xl  w-full overflow-hidden">
        {/* Icon Section */}
        <div className="flex justify-center pt-8 pb-4">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE4E2"/>
<rect x="4" y="4" width="48" height="48" rx="24" stroke="#FEF3F2" stroke-width="8"/>
<g clip-path="url(#clip0_2542_38034)">
<path d="M29.5796 16C29.7254 16.0486 29.8783 16.0834 30.0241 16.1389C30.453 16.2953 30.8242 16.5783 31.0884 16.9505C31.3527 17.3227 31.4975 17.7664 31.5037 18.2229V19.0009H35.5327C35.7951 18.9868 36.0576 19.0282 36.303 19.1224C36.5484 19.2167 36.7711 19.3616 36.9566 19.5478C37.1421 19.734 37.2863 19.9572 37.3797 20.2029C37.4731 20.4486 37.5136 20.7112 37.4985 20.9737C37.4985 21.4252 37.4985 21.8767 37.4985 22.363C37.5058 22.4685 37.4903 22.5744 37.453 22.6734C37.4157 22.7725 37.3575 22.8623 37.2823 22.9368C37.2072 23.0113 37.1168 23.0687 37.0175 23.1051C36.9182 23.1415 36.8121 23.1561 36.7066 23.1479H18.8056C18.6968 23.1576 18.5871 23.1432 18.4845 23.1057C18.3818 23.0682 18.2887 23.0085 18.2117 22.9309C18.1348 22.8533 18.0759 22.7596 18.0393 22.6567C18.0027 22.5537 17.9892 22.4439 17.9998 22.3352C17.9777 21.742 17.9939 21.148 18.0485 20.5569C18.1112 20.1182 18.3324 19.7177 18.6702 19.431C19.0081 19.1443 19.4393 18.9913 19.8823 19.0009C21.1605 19.0009 22.4386 19.0009 23.7237 19.0009H24.0016V18.3062C23.9893 17.7716 24.1679 17.2501 24.5052 16.8352C24.8425 16.4202 25.3165 16.1389 25.8424 16.0417C25.8721 16.032 25.9002 16.018 25.9257 16H29.5796ZM30.0033 18.9939C30.0033 18.7438 30.0033 18.4868 30.0033 18.2368C30.0015 18.042 29.9233 17.8558 29.7856 17.7181C29.6479 17.5804 29.4617 17.5022 29.267 17.5004C28.2621 17.5004 27.2548 17.5004 26.2453 17.5004C26.0808 17.4978 25.9207 17.5535 25.7935 17.6578C25.6663 17.7622 25.5802 17.9082 25.5506 18.07C25.5297 18.3776 25.5297 18.6863 25.5506 18.9939H30.0033Z" fill="#FF8080"/>
<path d="M27.7245 24.6201H35.9074C36.2686 24.6201 36.3172 24.6826 36.3033 25.0508C36.213 26.836 36.1366 28.6213 36.0463 30.4065C35.9282 32.9211 35.8171 35.4288 35.6782 37.9434C35.6395 38.4994 35.3915 39.0199 34.9841 39.4002C34.5768 39.7805 34.0404 39.9922 33.4831 39.9926C32.5731 39.9926 31.6701 39.9926 30.767 39.9926H22.1187C21.5823 40.0121 21.0571 39.8362 20.6406 39.4976C20.2241 39.1591 19.9446 38.6809 19.8541 38.1518C19.7904 37.6635 19.7579 37.1716 19.7569 36.6792C19.6527 34.5605 19.5554 32.4349 19.4582 30.3162C19.3887 28.5518 19.2845 26.7874 19.2012 25.03C19.2012 24.7035 19.2429 24.6271 19.5763 24.6271L27.7245 24.6201ZM23.2232 31.3582V31.8514C23.2232 33.3101 23.2232 34.7758 23.2232 36.2346C23.2143 36.4225 23.2771 36.6067 23.3987 36.7501C23.5203 36.8936 23.6918 36.9856 23.8786 37.0076C24.0653 37.0296 24.2535 36.98 24.4052 36.8688C24.5568 36.7576 24.6607 36.593 24.6958 36.4082C24.7099 36.2999 24.7099 36.1901 24.6958 36.0818V27.4334C24.6958 27.1208 24.6958 26.8083 24.6958 26.4957C24.6928 26.3438 24.6441 26.1963 24.5562 26.0724C24.4682 25.9485 24.345 25.854 24.2026 25.801C24.0871 25.7583 23.9628 25.7449 23.8409 25.762C23.7189 25.7792 23.6031 25.8265 23.5039 25.8995C23.4048 25.9725 23.3253 26.069 23.2726 26.1803C23.22 26.2917 23.1958 26.4144 23.2023 26.5373C23.2347 28.1443 23.251 29.7512 23.251 31.3582H23.2232ZM28.4747 31.3582V26.5651C28.4857 26.4044 28.446 26.2442 28.3613 26.1072C28.2766 25.9701 28.151 25.8631 28.0023 25.801C27.8867 25.7649 27.7641 25.7574 27.6449 25.779C27.5258 25.8007 27.4136 25.8508 27.318 25.9252C27.2225 25.9996 27.1464 26.0961 27.0962 26.2063C27.046 26.3165 27.0232 26.4372 27.0298 26.5582V36.1443C27.0211 36.2611 27.0384 36.3783 27.0804 36.4877C27.1224 36.597 27.1882 36.6956 27.273 36.7764C27.3761 36.8807 27.5097 36.9496 27.6544 36.9733C27.7992 36.997 27.9477 36.9743 28.0787 36.9084C28.2201 36.8484 28.3395 36.746 28.4203 36.6154C28.5012 36.4848 28.5396 36.3323 28.5303 36.179L28.4747 31.3582ZM32.2258 31.3582V26.5582C32.2358 26.3976 32.1948 26.2379 32.1088 26.102C32.0227 25.966 31.8959 25.8607 31.7465 25.801C31.6276 25.7544 31.4987 25.7389 31.3721 25.756C31.2456 25.7732 31.1255 25.8223 31.0232 25.8988C30.9209 25.9753 30.8399 26.0767 30.7878 26.1933C30.7357 26.3099 30.7142 26.4379 30.7253 26.5651V36.2207C30.7253 36.4197 30.8044 36.6105 30.9451 36.7512C31.0858 36.8919 31.2766 36.9709 31.4756 36.9709C31.6745 36.9709 31.8653 36.8919 32.006 36.7512C32.1467 36.6105 32.2258 36.4197 32.2258 36.2207V31.3582Z" fill="#FF0000"/>
</g>
<defs>
<clipPath id="clip0_2542_38034">
<rect width="19.5056" height="24" fill="white" transform="translate(18 16)"/>
</clipPath>
</defs>
</svg>

        </div>

        {/* Content */}
        <div className="px-6 pb-6 text-center">
          <h2 className="md:text-lg text-base font-semibold text-[#101828] mb-4">
            {title}
          </h2>
          
          <div className="space-y-2 mb-4">
            <p className="text-[#667085] font-archivo md:text-sm text-xs">
              Account once deleted, can never be recovered again.
              You will loose all your personal data
            </p>
            
          </div>

          <p className="text-[#667085] font-archivo md:text-sm text-xs mb-8">
            Are you sure you want to delete?
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-3 text-nowrap text-xs md:text-sm font-archivo max-xxscren:text-xxs md:px-6 border border-gray-300 text-gray-700 rounded-xl font-medium
                       hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Discard
            </button>
            
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 py-3 px-3 text-nowrap text-xs md:text-sm font-archivo max-xxscren:text-xxs md:px-6 bg-red-500 text-white rounded-xl font-medium
                       hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                'Yes, Delete'
              )}
            </button>
          </div>
        </div>
      </div>
     </DialogBody>
    </DialogContent>
    </Dialog>
  );
};

// Demo component to show the modal in action
export default DeleteConfirmationModal