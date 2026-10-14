import API from "./api";

export const sendEmergency = (data, token) => {
  return API.post(
    "emergency/",
    data,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );
};