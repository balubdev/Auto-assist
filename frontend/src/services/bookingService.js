import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/bookings/bookings/";

export const getBookings = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addBooking = (data, token) => {
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBooking = (id, token) => {
  return axios.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBooking = (id, data, token) => {
  return axios.put(`${API_URL}${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};