import { useEffect, useState } from "react";
import { Bot, Star, MapPin, ArrowRight } from "lucide-react";
import axios from "axios";

function AIRecommendation() {

  const [shop, setShop] = useState(null);


  useEffect(() => {

    const fetchRecommendation = async () => {

      try {

        const token = localStorage.getItem("access");


        const res = await axios.get(
          "http://127.0.0.1:8000/api/ai/recommend/?lat=9.9312&lng=76.2673",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        setShop(res.data[0]);


      } catch (err) {

        console.error(err);

      }

    };


    fetchRecommendation();


  }, []);




  if (!shop) return null;



  return (

    <div className="mt-8 rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-2xl">


      <div className="p-8">


        <div className="flex items-center gap-3 mb-6">


          <div className="bg-white/20 p-3 rounded-xl">

            <Bot size={30} />

          </div>



          <div>

            <h2 className="text-3xl font-bold">
              AI Recommendation
            </h2>


            <p className="text-blue-100">
              Best Repair Shop Based on AI Analysis
            </p>

          </div>


        </div>





        <div className="grid md:grid-cols-2 gap-8">


          <div>


            <h3 className="text-2xl font-bold">
              {shop.shop_name}
            </h3>



            <div className="mt-5 space-y-3">


              <p className="flex items-center gap-2">

                <Star
                  className="text-yellow-300"
                  fill="currentColor"
                />

                Rating : {shop.rating || 0}

              </p>




              <p className="flex items-center gap-2">

                <MapPin />

                Distance : {(shop.distance_km || 0).toFixed(1)} km

              </p>




              <p>

                Available Mechanics :

                <b>
                  {shop.available_mechanics || 0}
                </b>

              </p>




              <p>

                Current Queue :

                <b>
                  {shop.queue || 0}
                </b>

              </p>



            </div>


          </div>





          <div className="flex justify-center items-center">


            <button className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition">


              Book Recommended Shop


              <ArrowRight />


            </button>


          </div>




        </div>


      </div>


    </div>

  );

}


export default AIRecommendation;