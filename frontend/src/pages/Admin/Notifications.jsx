import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";


function Notifications() {

  const [notifications, setNotifications] = useState([]);


  const token = localStorage.getItem("access");


  useEffect(() => {

    fetchNotifications();

  }, []);



  const fetchNotifications = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/notifications/",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


const results = response.data.results || response.data;
setNotifications(results.filter((notification) => !notification.is_read));

    } catch(error){

      console.log(error);

    }

  };



  const markRead = async(id)=>{

    try{

      await axios.patch(

        `http://127.0.0.1:8000/api/notifications/${id}/`,

        {
          is_read:true
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      setNotifications((currentNotifications) =>
        currentNotifications.filter((notification) => notification.id !== id)
      );


    }catch(error){

      console.log(error);

    }

  };



  const deleteNotification = async(id)=>{

    try{

      await axios.delete(

        `http://127.0.0.1:8000/api/notifications/${id}/`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      fetchNotifications();


    }catch(error){

      console.log(error);

    }

  };



  return (

    <div className="flex">


      <AdminSidebar />


      <div className="flex-1 bg-gray-100 min-h-screen text-slate-900">


        <AdminHeader />


        <div className="p-8">


          <h1 className="text-3xl font-bold mb-6">
            Notifications
          </h1>



          <div className="bg-white rounded-xl shadow p-6">


          {
            notifications.length === 0 ? (

              <p>
                No new notifications
              </p>

            ) : (


              notifications.map((item)=>(


                <div
                  key={item.id}
                  className="border-b p-4 flex justify-between"
                >


                  <div>


                    <h3 className="font-bold">
                      {item.title}
                    </h3>


                    <p>
                      {item.message}
                    </p>


                    <small>
                      {item.is_read ? "Read" : "Unread"}
                    </small>


                  </div>



                  <div className="space-x-3">


                    {
                      !item.is_read &&

                      <button

                        onClick={()=>markRead(item.id)}

                        className="bg-blue-600 text-white px-3 py-1 rounded"

                      >

                        Mark Read

                      </button>

                    }



                    <button

                      onClick={()=>deleteNotification(item.id)}

                      className="bg-red-600 text-white px-3 py-1 rounded"

                    >

                      Delete

                    </button>


                  </div>


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


export default Notifications;