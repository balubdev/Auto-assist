import axios from "axios";

const API = "http://127.0.0.1:8000/api/accounts";

export const getProfile = (token) => {
  return axios.get(`${API}/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = (data, token) => {
  return axios.put(`${API}/profile/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = (data, token) => {
  return axios.post(`${API}/password/change/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};