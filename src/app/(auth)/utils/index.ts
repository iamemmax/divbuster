const TOKEN_STORAGE_PREFIX = 'DIVBUSTER';
export const tokenStorage = {
  getToken: () => {
    try {
      const tokenString = window.localStorage.getItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
      if (!tokenString) return null;
      return tokenString;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  setToken: (token: string) => {
    try {
      if (!token) return;
      window.localStorage.setItem(`${TOKEN_STORAGE_PREFIX}TOKEN`, token);
    } catch (error) {
      console.error("Error setting token:", error);
    }
  },
  
  clearToken: () => {
    try {
      console.log("Clearing DIVBUSTER token");
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
      // Verify token was removed
      const tokenAfterClear = window.localStorage.getItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
      console.log("Token after clearing:", tokenAfterClear ? "still exists" : "successfully removed");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  },
  
  clearAll: () => {
    try {
      console.log("Clearing all DIVBUSTER tokens");
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKENS`);
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}SAVED_LOGIN_CREDENTIALS`);
      
      // Verify tokens were removed
      const tokenAfterClear = window.localStorage.getItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
      const tokensAfterClear = window.localStorage.getItem(`${TOKEN_STORAGE_PREFIX}TOKENS`);
      const credentialsAfterClear = window.localStorage.getItem(`${TOKEN_STORAGE_PREFIX}SAVED_LOGIN_CREDENTIALS`);
      
      console.log("Tokens after clearing:", {
        token: tokenAfterClear ? "still exists" : "removed",
        tokens: tokensAfterClear ? "still exists" : "removed",
        credentials: credentialsAfterClear ? "still exists" : "removed"
      });
    } catch (error) {
      console.error("Error clearing all tokens:", error);
    }
  }
};
