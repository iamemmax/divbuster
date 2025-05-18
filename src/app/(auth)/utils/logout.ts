import { tokenStorage } from "./index";
import { deleteAxiosDefaultToken } from "@/lib/axios";

export const performLogout = () => {
  try {
    console.log("Performing logout...");
    
    // Explicitly clear DIVBUSTER tokens with correct capitalization
    localStorage.removeItem("DIVBUSTERTOKEN");
    
    // Force redirect to login page
    window.location.href = '/login';
    
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
};


