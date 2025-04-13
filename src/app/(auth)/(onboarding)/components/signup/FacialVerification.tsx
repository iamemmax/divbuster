import { signUpUserOtpSchema } from "@/app/schema/SignupValidation";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PinInput from "react-pin-input";
import { Button } from "@/components/core";

import { useClipboard } from "@/hooks";
import useIsMobile from "@/components/hooks/UseMobile";
import MessageIcon from "@/app/icons/MessageIcon";
import { SmallSpinner } from "@/icons/core";

interface prop {
  onNext: (value: SetStateAction<number>) => void;
  onPrev: (value: SetStateAction<number>) => void;
}

export type UserSignupOtpDetailsValue = z.infer<typeof signUpUserOtpSchema>;

const FacialVerification = ({ onNext, onPrev }: prop) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserSignupOtpDetailsValue>({
    resolver: zodResolver(signUpUserOtpSchema),
    mode: "onChange",
  });
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Start camera stream when the "Take a photo" button is clicked
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        if (!videoRef.current.srcObject) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Explicitly start the video
          setIsCameraStarted(true);
          streamRef.current = stream; // Save the stream for cleanup
        }
      }
    } catch (error) {
      alert("Error accessing the camera. Please check your permissions.");
    }
  };

  const handleSnap = () => {
    if (videoRef.current) {
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      // Ensure the video has valid dimensions before capturing
      if (videoWidth > 0 && videoHeight > 0) {
        // Create a temporary canvas element to draw the video frame
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (context) {
          canvas.width = videoWidth;
          canvas.height = videoHeight;

          // Draw the current video frame onto the canvas
          context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

          // Convert the canvas content to a base64-encoded image (PNG format)
          const dataUrl = canvas.toDataURL("image/png");

          // Set the captured image as the preview
          setImageSrc(dataUrl);
          setIsSnapped(true); // Mark the image as snapped
          setValidationError(null); // Clear any previous validation errors

          // Stop the camera after taking a snapshot
          stopCamera();
        }
      }
    }
  };

  // Stop the camera feed
  const stopCamera = () => {
    if (videoRef.current && streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks of the current stream
      streamRef.current = null; // Clear the stream reference
    }
    setIsCameraStarted(false);
  };

  // Retake the photo (reset the camera and captured image)
  const handleRetake = () => {
    setIsSnapped(false); // Reset the snap status
    setImageSrc(null); // Clear the captured image
    setValidationError(null); // Clear any validation errors
    startCamera(); // Restart the camera feed
  };

  // Validate the facial image
//   const validateFacialImage = async (imageData: string) => {
//     setIsProcessing(true);
//     setValidationError(null);
    
//     try {
//       // Here you would typically call your facial recognition API
//       // For demonstration purposes, we're using a simulated validation
      
//       // Simulated validation - in a real application, you would:
//       // 1. Send the image to a facial detection service
//       // 2. Check if facial features are visible enough
//       // 3. Return success/failure based on the detection results
//       const simulateValidation = () => {
//         return new Promise<boolean>((resolve) => {
//           setTimeout(() => {
//             // This would be replaced with actual validation logic
//             const randomSuccess = Math.random() > 0.3; // 70% success rate for demo
//             resolve(randomSuccess);
//           }, 1000);
//           onNext(5)
//         });
//       };
      
//       const isValid = await simulateValidation();
      
//       if (!isValid) {
//         setValidationError("Please ensure your face is clearly visible while keeping religious headwear in place.");
//         return false;
//       }
      
//       return true;
//     } catch (error) {
//       console.error("Error validating facial image:", error);
//       setValidationError("An error occurred while processing your photo. Please try again.");
//       return false;
//     } finally {
//       setIsProcessing(false);
//     }
//   };

  // Form submission
  const onSubmit = async () => {
    if (!imageSrc) {
      setValidationError("Please take a photo first.");
      return;
    }
    
    setLoading(true);
    onNext(5)
    // Validate the facial image before proceeding
    // const isValid = await validateFacialImage(imageSrc);

    
    if (!isValid) {
      setLoading(false);
      return;
    }
    
    // For demo purposes - in a real app, you would upload the image to your server
    // const uploadedImg = await uploadToCloudinary(String(imageSrc));
    // if(uploadedImg) {
    //   setcustomerInformation((prev) => {
    //     if (!prev) return { ...customerInformation, image_url:uploadedImg?.secure_url };
    //     return {
    //       ...prev,
    //       image_url:uploadedImg?.secure_url
    //     };
    //   });
    // }
    
    // Simulate successful processing
    setTimeout(() => {
      setLoading(false);
      onNext((prev) => prev + 1); // Move to next step
    }, 1500);
  };

  // Video metadata load event listener
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const onLoadedMetadata = () => {
        // Video metadata loaded handler
      };

      videoElement.addEventListener("loadedmetadata", onLoadedMetadata);

      // Clean up on unmount
      return () => {
        videoElement.removeEventListener("loadedmetadata", onLoadedMetadata);
        if (isCameraStarted) {
          stopCamera();
        }
      };
    }
  }, [isCameraStarted]);

  useEffect(() => {
    return () => {
      if (isCameraStarted) {
        stopCamera();
      }
    };
  }, [isCameraStarted]);

  const infomation = ["Stay in a well-lit environment","Remove glasses, hats, hijabs, face masks, or anything that hides the structure of your beautiful face.","Keep your face within the frame and","Tap ‘Take photo’ button below","Okay with photo taken? Tap ‘Continue button’"]

  return (
    <div className="text-white relative border-[.0187rem] py-6 xl:py-[1.5rem]  border-[#4649E5] px-6 md:px-[50px] 2xl:px-[6.1875rem] rounded-[1.25rem]">
      <div className="">
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
          Facial Verification
        </h2>
        <p className="font-outfit max-xxscren:text-xs text-sm xl:text-base text-white text-opacity-70 max-w-[250px] lg:max-w-[380px] font-light">
          Take clear image of yourself
        </p>
        <div className="absolute max-xxscren:right-3 right-10 xl:right-16 top-14">
          <p className="font-outfit font-semibold text-white text-xs xl:text-base">
            4/6
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex justify-center items-center mt-5 border-[0.3px] overflow-hidden max-w-[28.0625rem]  h-[16rem] sm:h-[18.75rem] rounded-[18px] border-[#898989]">
          {!isSnapped && !imageSrc ? (
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              autoPlay
              muted
              className=""
            />
          ) : (
            <img
              src={imageSrc as string}
              alt="Captured snapshot"
              className="rounded-[1.25rem] w-full h-full"
            />
          )}
        </div>

        {/* Validation error message */}
        {validationError && (
          <div className="mt-2 max-w-[28.0625rem] bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-3">
            <p className="text-red-400 text-xs font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
              </svg>
              {validationError}
            </p>
          </div>
        )}

        <div className="bg-[#02010D] max-w-[28.0625rem] px-[1.375rem] border-[0.5px] border-[#696969] rounded-lg py-7  mt-3">
          {infomation?.map((info, idx: number) => (
            <div className="flex items-start mt-3 gap-[.375rem]" key={idx}>
              <svg
                className="shrink-0"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.9584 2.04258C9.5334 1.55091 10.4751 1.55091 11.0584 2.04258L12.3751 3.17591C12.6251 3.39258 13.0917 3.56758 13.4251 3.56758H14.8417C15.7251 3.56758 16.4501 4.29258 16.4501 5.17591V6.59258C16.4501 6.91758 16.6251 7.39258 16.8417 7.64258L17.9751 8.95925C18.4667 9.53425 18.4667 10.4759 17.9751 11.0592L16.8417 12.3759C16.6251 12.6259 16.4501 13.0926 16.4501 13.4259V14.8426C16.4501 15.7259 15.7251 16.4509 14.8417 16.4509H13.4251C13.1001 16.4509 12.6251 16.6259 12.3751 16.8426L11.0584 17.9759C10.4834 18.4676 9.54173 18.4676 8.9584 17.9759L7.64173 16.8426C7.39173 16.6259 6.92506 16.4509 6.59173 16.4509H5.15006C4.26673 16.4509 3.54173 15.7259 3.54173 14.8426V13.4176C3.54173 13.0926 3.36673 12.6259 3.1584 12.3759L2.0334 11.0509C1.55007 10.4759 1.55007 9.54258 2.0334 8.96758L3.1584 7.64258C3.36673 7.39258 3.54173 6.92591 3.54173 6.60091V5.16758C3.54173 4.28424 4.26673 3.55924 5.15006 3.55924H6.59173C6.91673 3.55924 7.39173 3.38424 7.64173 3.16758L8.9584 2.04258Z"
                  fill="#0854C2"
                />
                <path
                  d="M8.99212 12.6421C8.82546 12.6421 8.66712 12.5754 8.55046 12.4587L6.53379 10.4421C6.29212 10.2004 6.29212 9.80039 6.53379 9.55872C6.77546 9.31706 7.17546 9.31706 7.41712 9.55872L8.99212 11.1337L12.5755 7.55039C12.8171 7.30872 13.2171 7.30872 13.4588 7.55039C13.7005 7.79206 13.7005 8.19206 13.4588 8.43372L9.43379 12.4587C9.31712 12.5754 9.15879 12.6421 8.99212 12.6421Z"
                  fill="white"
                />
              </svg>
              <p className="text-xxs sm:text-xs text-white">{info}</p>
            </div>
          ))}
        </div>
        {!isSnapped && !isCameraStarted && (
          <div className="flex justify-center items-center mt-5  max-w-[28.0625rem]">
            <Button
              className="mt-3 w-full rounded-2xl bg-white p-4 font-semibold tracking-wide text-[#1B1687]"
              type="button"
              onClick={startCamera}
            >
              Take a photo
            </Button>
          </div>
        )}

        <div className="flex flex-col h-full mt-5  ">
          <div className="flex-grow space-y-4 max-h-[65vh] overflow-y-auto"></div>
          <div className="mt-auto pb-4  max-w-[28.0625rem]">
            {/* Snap Button */}
            {!isSnapped && isCameraStarted && (
              <Button
                className="mt-3 w-full  max-w-[28.0625rem] rounded-2xl bg-white p-4 font-semibold tracking-wide text-[#1B1687]"
                type="button"
                onClick={handleSnap}
              >
                Take a photo
              </Button>
            )}

            {isSnapped && (
              <Button
                className="flex items-center gap-x-5 mt-3 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                disabled={loading || isProcessing}
                type="button"
                onClick={onSubmit}
              >
                {isProcessing ? "Validating..." : loading ? "Processing..." : "Continue"} 
                {(loading || isProcessing) && <SmallSpinner color="blue" />}
              </Button>
            )}
            {/* Retake Button */}
            {isSnapped && (
              <Button
                className="mt-6 w-full rounded-2xl border-white p-4 font-semibold tracking-wide text-white"
                variant={"outlined"}
                type="button"
                onClick={handleRetake}
              >
                Retake photo
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FacialVerification;