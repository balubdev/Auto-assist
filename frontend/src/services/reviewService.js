import API from "./api";


export const getReviews = (token) => {
  return API.get("reviews/reviews/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const addReview = (data, token) => {
  return API.post("reviews/reviews/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};