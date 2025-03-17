


import React from "react";
// import { toast } from "react-hot-toast";

// Simple Toast Container for Pending State with a message prop
interface PendingToastContainerProps {
  message: string;
}

const PendingToastContainer: React.FC<PendingToastContainerProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 text-gray-800 rounded-lg p-4 shadow-lg w-60">
      <div className="w-6 h-6 border-4 border-t-4 border-[#DB8C00] border-t-[#cfb68b] rounded-full animate-spin"></div>
      <p className="ml-3 text-sm text-[#DB8C00]">{message}</p>
    </div>
  );
};


export default PendingToastContainer;
