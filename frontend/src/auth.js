const ACCESS_TOKEN = "access";
const REFRESH_TOKEN = "refresh";

export const setTokens = (data) => {
  localStorage.setItem(ACCESS_TOKEN, data.access);
  localStorage.setItem(REFRESH_TOKEN, data.refresh);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(ACCESS_TOKEN);
};