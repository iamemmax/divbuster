
export const performLogout = () => {
  try {
    
    // Explicitly clear DIVBUSTER tokens with correct capitalization
    localStorage.removeItem("DIVBUSTERTOKEN");
    
    // Force redirect to login page
    window.location.href = '/login';
    
    return true;
  } catch (error) {
    return false;
  }
};


