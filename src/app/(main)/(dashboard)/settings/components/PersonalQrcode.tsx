import React, { useState, useEffect } from 'react';
import { X, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import LocationIcconbg from '@/app/icons/(dashboard)/LocationIconbg';
import Image from 'next/image';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';

interface prop{
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
     isModalOpen: boolean;
     userData: User | null
}
const PersonalQRCode = ({isModalOpen,setIsModalOpen, userData}:prop) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      const generateQRCode = async () => {
        try {
          setIsLoading(true);
          const dataURL = await QRCode.toDataURL('https://divebusters.com/profile/Bart000134', {
            width: 240,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            },
            errorCorrectionLevel: 'M'
          });
          setQrCodeDataURL(dataURL);
        } catch (error) {
          console.error('Failed to generate QR code:', error);
        } finally {
          setIsLoading(false);
        }
      };

      generateQRCode();
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
      >
        <QrCode className="w-5 h-5" />
        Show QR Code
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full mx-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="md:w-12 md:h-12 w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
  <Image
    alt='profile'
    src={String(userData?.profile_details?.profile_picture)}
    width={48}
    height={48}
    className='object-cover rounded-full w-full h-full'
  />
</div>
              </div>
              <button 
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
<div className="px-6 py-2">
                <h2 className="md:text-xl font-archivo  text-sm font-semibold text-[#101828]">Personal QR Code</h2>

</div>
            {/* QR Code Section */}
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-[1.25rem] p-[1.375rem] relative">
                {/* QR Code */}
                <div className="w-full h-64 bg-white rounded-lg border-2 border-gray-100 relative overflow-hidden flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-60 h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500 flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        Loading QR Code...
                      </div>
                    </div>
                  ) : qrCodeDataURL ? (
                    <img 
                      src={qrCodeDataURL} 
                      alt="QR Code for Bart000134"
                      className="max-w-full max-h-full"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  ) : (
                    <div className="w-60 h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500">Failed to load QR Code</div>
                    </div>
                  )}

                  {/* Center Logo Overlay */}
                  {qrCodeDataURL && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <LocationIcconbg width={75} height={75}/>
                    </div>
                  )}
                </div>

                {/* Dive ID */}
                <div className="flex items-center justify-center gap-x-2 mt-1">
                  <span className="text-[#344054] text-sm font-archivo font-medium">Dive ID:</span>
                  <span className="text-[#101828] font-archivo font-semibold text-base">Bart000134</span>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="px-6 pb-6 ">
              <div className="mb-6 grid grid-cols-2">
                <h3 className="md:text-sm text-xs font-archivo font-semibold text-gray-900 mb-2">Share QR Code</h3>
                <p className="text-gray-600 leading-relaxed font-archivo text-xs md:text-sm">
                  Your friends on DiveBusters can scan this code to start a chat with you.{' '}
                  <span className="text-orange-500 font-medium cursor-pointer hover:underline">
                    Learn more.
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={closeModal}
                  className="flex-1 py-[.5625rem] px-0 md:px-4  text-gray-700 font-medium text-sm rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-[.5625rem] md:px-4 px-3 text-nowrap  bg-orange-500 text-white text-xs md:text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors">
                  Share QR Code/Dive ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalQRCode;