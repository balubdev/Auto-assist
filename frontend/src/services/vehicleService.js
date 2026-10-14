import API from "./api";

export const getVehicles = (token) => {
  return API.get("accounts/vehicles/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addVehicle = (data, token) => {
  return API.post("accounts/vehicles/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVehicle = (id, data, token) => {
  return API.put(`accounts/vehicles/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteVehicle = (id, token) => {
  return API.delete(`accounts/vehicles/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};