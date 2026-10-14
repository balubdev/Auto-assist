import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import { Star, MessageSquare } from "lucide-react";

import { getReviews, addReview } from "../../services/reviewService";
import { getBookings } from "../../services/bookingService";


function Reviews() {


  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewableShops, setReviewableShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState("");
  const [loadingShops, setLoadingShops] = useState(true);
  const [submitting, setSubmitting] = useState(false);



  useEffect(() => {

    loadReviews();
    loadReviewableShops();

  }, []);

  const loadReviewableShops = async () => {
    try {
      const response = await getBookings(localStorage.getItem("access"));
      const bookings = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];
      const uniqueShops = new Map();

      bookings
        .filter((booking) => booking.status === "Completed")
        .forEach((booking) => {
          const shopId = String(booking.repair_shop);
          if (!uniqueShops.has(shopId)) {
            uniqueShops.set(shopId, {
              id: shopId,
              name: booking.repair_shop_name || `Repair Shop ${shopId}`,
            });
          }
        });

      const shops = Array.from(uniqueShops.values());
      setReviewableShops(shops);
      setSelectedShopId((current) => current || shops[0]?.id || "");
    } catch (error) {
      console.error("Unable to load completed services:", error);
    } finally {
      setLoadingShops(false);
    }
  };





  const loadReviews = async () => {

    try {

      const token = localStorage.getItem("access");

      const res = await getReviews(token);


      setReviews(

        Array.isArray(res.data)

          ? res.data

          : res.data.results || []

      );


    } catch(error) {

      console.log(error);

    }

  };






  const handleSubmit = async () => {

    if (!selectedShopId) {
      alert("Select a repair shop where you completed a service.");
      return;
    }

    if (!comment.trim()) {

      alert("Please write your review.");

      return;

    }



    try {


      const token = localStorage.getItem("access");



      setSubmitting(true);
      await addReview(
        {
          repair_shop: Number(selectedShopId),
          rating,
          review: comment,
        },
        token
      );



      alert("Review Submitted Successfully");



      setComment("");

      setRating(5);

      setSubmitting(false);



      loadReviews();



    } catch(error) {


      console.log(error);

      alert(error.response?.data?.repair_shop?.[0] || "Review Failed");

      setSubmitting(false);


    }


  };






  return (


    <div className="flex min-h-screen bg-gray-100 text-slate-900">



      <Sidebar />



      <div className="flex-1">



        <Header />



        <div className="p-8">



          <h1 className="text-4xl font-bold mb-8">

            Reviews & Ratings

          </h1>





          <div className="bg-white rounded-3xl shadow-lg p-8">



            <h2 className="text-2xl font-bold mb-6">

              Write a Review

            </h2>

            <label className="mb-6 grid gap-2 font-medium text-slate-700">
              Select the repair shop you visited
              <select
                value={selectedShopId}
                onChange={(event) => setSelectedShopId(event.target.value)}
                disabled={loadingShops || reviewableShops.length === 0 || submitting}
                className="w-full rounded-xl border bg-white p-3 text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">
                  {loadingShops ? "Loading completed services..." : "Select a completed service shop"}
                </option>
                {reviewableShops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </label>

            {!loadingShops && reviewableShops.length === 0 && (
              <p className="mb-6 text-sm text-slate-600">
                You can review a repair shop after a service is marked completed.
              </p>
            )}





            <div className="flex gap-2 mb-6">


              {[1,2,3,4,5].map((star)=>(


                <Star

                  key={star}

                  size={35}

                  onClick={()=>setRating(star)}

                  className={

                    `cursor-pointer ${
                    star <= rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-slate-400"
                    }`

                  }

                />


              ))}



            </div>






            <textarea

              rows="5"

              value={comment}

              onChange={(e)=>setComment(e.target.value)}

              placeholder="Write your review..."

              className="w-full border rounded-xl p-4 text-slate-900 placeholder:text-slate-500"

            />






            <button

              onClick={handleSubmit}
              disabled={loadingShops || reviewableShops.length === 0 || submitting}

              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"

            >

              Submit Review

            </button>



          </div>







          <div className="mt-10 space-y-6">



            {reviews.map((review)=>(



              <div

                key={review.id}

                className="bg-white rounded-3xl shadow-lg p-6"

              >




                <div className="flex justify-between">



                  <h3 className="text-xl font-bold">

                    {review.repair_shop_name || review.repair_shop}

                  </h3>






                  <div className="flex">


                    {[...Array(review.rating)].map((_,index)=>(


                      <Star

                        key={index}

                        size={18}

                        className="text-yellow-500 fill-yellow-500"

                      />


                    ))}


                  </div>




                </div>






                <p className="flex gap-2 mt-4 text-slate-700">


                  <MessageSquare size={18}/>


                  {review.review}


                </p>





              </div>



            ))}




          </div>






        </div>



      </div>



    </div>



  );

}


export default Reviews;