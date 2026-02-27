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
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
    } catch (error) {
      // Error clearing token
    }
  },
  
  clearAll: () => {
    try {
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKENS`);
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}SAVED_LOGIN_CREDENTIALS`);
    } catch (error) {
      // Error clearing all tokens
    }
  }
};
