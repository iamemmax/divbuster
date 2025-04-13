const TOKEN_STORAGE_PREFIX = 'OPTICAL_TRADING_';
type LoginCredentials = {
  phone_number: string;
  password: string;
};
export const tokenStorage = {
  getToken: () => JSON.parse(
      window.localStorage.getItem(`${TOKEN_STORAGE_PREFIX}TOKEN`) as string,
  ),

  setToken: (token: string) => {
    window.localStorage.setItem(
      `${TOKEN_STORAGE_PREFIX}TOKEN`,
      JSON.stringify(token),
    );
  },
  
  clearToken: () => {
    window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
  },
  setReferral: (data: string) => {
    window.localStorage.setItem(
      `${TOKEN_STORAGE_PREFIX}REFERRAL`,
      JSON.stringify(data),
    );
  },
  getReferral: () => JSON.parse(
    window.localStorage.getItem(`${TOKEN_STORAGE_PREFIX}REFERRAL`) as string,
  ),
  clearReferral: () => {
    window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}REFERRAL`);
  },
  saveLoginDetails: ({ phone_number, password }: LoginCredentials) => {
    const data: LoginCredentials = { phone_number, password };
    window.localStorage.setItem(
      `${TOKEN_STORAGE_PREFIX}SAVED_LOGIN_CREDENTIALS`,
      JSON.stringify(data)
    );
  },

  getSavedLoginDetails: (): LoginCredentials | null => {
    const stored = window.localStorage.getItem(
      `${TOKEN_STORAGE_PREFIX}SAVED_LOGIN_CREDENTIALS`
    );
    return stored ? JSON.parse(stored) : null;
  },
  clearLoginDetails: () => {
    localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}SAVED_LOGIN_CREDENTIALS`);
  },

};
