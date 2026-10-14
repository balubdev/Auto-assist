import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/repairshops/shops/";

export const getRepairShops = async (token) => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchRepairShops = async (token, search = "") => {
  return await axios.get(`${API_URL}?search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};