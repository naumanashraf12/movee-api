import AxiosBase from "./AxiosBase";

const token = localStorage.getItem("token");
console.log(token);

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const tokenConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const postLogin = (username, password) =>
  AxiosBase.post(`/login`, { username, password }, config);

export const signup = (data) => AxiosBase.post(`/signup`, { ...data }, config);

export const getLoadUser = () => AxiosBase.get(`/my-profile`, tokenConfig);
// export const getLoadProfile = () => AxiosBase.get(`/my-profile`, tokenConfig);

export const updatePassword = (data) =>
  AxiosBase.patch("/update-password", data, tokenConfig);
export const updateOrginization = (data) =>
  AxiosBase.patch("/update-organization", data, tokenConfig);
export const ottpRequest = (data) =>
  AxiosBase.post("/forgot-password", data, tokenConfig);
export const ottpVerify = (data) =>
  AxiosBase.post("/verify-otp", data, tokenConfig);
export const resetedpassword = (data) =>
  AxiosBase.post("/reset-password", data, tokenConfig);
export const subs = (data) =>
  AxiosBase.post("/subscription", data, tokenConfig);
export const his = () => AxiosBase.get("/billing-history", tokenConfig);
export const postc = () => AxiosBase.get("/token", tokenConfig);
export const plans = () => AxiosBase.get("/plans", tokenConfig);
