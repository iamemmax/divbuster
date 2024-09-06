const TOKEN_STORAGE_PREFIX = 'LIBERTY_LIFE_';

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
};
