import API from "./api";

// Dashboard
export const getAdminDashboard = () => {
  return API.get("dashboard/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
};

// Customers
export const getCustomers = () => {
  return API.get("accounts/admin/customers/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
};

export const deleteCustomer = (id) => {
  return API.delete(`accounts/users/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
};