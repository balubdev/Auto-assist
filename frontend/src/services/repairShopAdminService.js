import API from "./api";

const token = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

export const getAllShops = () => {
  return API.get("repairshops/shops/", token());
};

export const verifyShop = (id) => {
  return API.patch(
    `repairshops/shops/${id}/`,
    {
      is_verified: true,
    },
    token()
  );
};

export const rejectShop = (id) => {
  return API.patch(
    `repairshops/shops/${id}/`,
    {
      is_verified: false,
    },
    token()
  );
};

export const deleteShop = (id) => {
  return API.delete(
    `repairshops/shops/${id}/`,
    token()
  );
};