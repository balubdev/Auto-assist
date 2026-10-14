import API from "./api";

export const registerUser = (data) => {
  return API.post("accounts/register/", data);
};

export const loginUser = (data) => {
  return API.post("accounts/token/", data);
};

export const getProfile = (token) => {
  return API.get("accounts/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};