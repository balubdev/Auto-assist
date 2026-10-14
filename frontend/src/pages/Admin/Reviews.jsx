import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {

    try {

      const res = await API.get("reviews/admin/reviews/");

      const data = res.data.results || res.data;

      setReviews(data);
      setFilteredReviews(data);

    } catch (err) {
      console.log(err);
    }

  };

  const handleSearch = (value) => {

    setSearch(value);

    const filtered = reviews.filter((review) =>
      review.review.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredReviews(filtered);

  };

  const deleteReview = async (id) => {

    if (!window.confirm("Delete this review?")) return;

    try {

      await API.delete(`reviews/admin/reviews/${id}/`);

      loadReviews();

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="flex">

      <AdminSidebar />

      <div className="flex-1 min-h-screen bg-slate-100 p-8 text-slate-900">

        <h1 className="text-3xl font-bold mb-6">
          Reviews Management
        </h1>

        <input
          type="text"
          placeholder="Search Review..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border rounded-lg p-2 mb-5 w-80 text-slate-900 placeholder:text-slate-500"
        />

        <table className="w-full border">

          <thead className="bg-slate-800 text-white">

            <tr>
              <th className="p-3">Customer</th>
              <th>Repair Shop</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredReviews.map((review) => (

              <tr
                key={review.id}
                className="border-b text-center"
              >

                <td>{review.customer}</td>

                <td>{review.repair_shop}</td>

                <td>{review.rating} ⭐</td>

                <td>{review.review}</td>

                <td>

                  <button
                    onClick={() => deleteReview(review.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reviews;