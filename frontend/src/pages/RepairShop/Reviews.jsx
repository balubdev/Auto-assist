import { useEffect, useState } from "react";
import API from "../../services/api";

import RepairShopSidebar from "../../components/dashboard/RepairShopSidebar";
import Header from "../../components/dashboard/Header";


function Reviews() {

  const [reviews, setReviews] = useState([]);


  const fetchReviews = async()=>{

    try{

      const token = localStorage.getItem("access");

      const response = await API.get(
        "reviews/shop-reviews/",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setReviews(
        response.data.results || response.data
      );


    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchReviews();

  },[]);



  return (

    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <RepairShopSidebar />


      <div className="flex-1">

        <Header />


        <div className="p-8">


          <h1 className="text-3xl font-bold mb-6">
            Customer Reviews
          </h1>



          <div className="bg-white rounded-3xl shadow p-6">


          {
            reviews.length === 0 ?

            (
              <p className="text-slate-600">
                No reviews available
              </p>
            )

            :

            (

              reviews.map((item)=>(

                <div
                key={item.id}
                className="border-b py-4"
                >

                  <h2 className="font-bold">
                    Rating ⭐ {item.rating}
                  </h2>


                  <p className="mt-2">
                    {item.review}
                  </p>


                  <p className="text-slate-600 text-sm">
                    {item.created_at}
                  </p>


                </div>

              ))

            )

          }


          </div>


        </div>


      </div>


    </div>

  );

}


export default Reviews;