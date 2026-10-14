import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";


// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";


// Customer Pages
import CustomerDashboard from "../pages/Customer/Dashboard";
import MyVehicles from "../pages/Customer/MyVehicles";
import AddVehicle from "../pages/Customer/AddVehicle";
import EditVehicle from "../pages/Customer/EditVehicle";
import BookService from "../pages/Customer/BookService";
import NearbyShops from "../pages/Customer/NearbyShops";
import AIRecommendation from "../pages/Customer/AIRecommendation";
import EmergencySOS from "../pages/Customer/EmergencySOS";
import BookingHistory from "../pages/Customer/BookingHistory";
import BookingDetails from "../pages/Customer/BookingDetails";
import CustomerReviews from "../pages/Customer/Reviews";
import CustomerProfile from "../pages/Customer/Profile";


// Repair Shop Pages
import RepairShopDashboard from "../pages/RepairShop/Dashboard";
import RepairShopBookings from "../pages/RepairShop/Bookings";
import RepairShopProfile from "../pages/RepairShop/Profile";
import Mechanics from "../pages/RepairShop/Mechanics";
import RepairShopServices from "../pages/RepairShop/Services";
import RepairShopReviews from "../pages/RepairShop/Reviews";
import Queue from "../pages/RepairShop/Queue";
import EmergencyService from "../pages/RepairShop/EmergencyService";


// Admin Pages
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import Customers from "../pages/Admin/Customers";
import CustomerDetails from "../pages/Admin/CustomerDetails";
import RepairShops from "../pages/Admin/RepairShops";
import Bookings from "../pages/Admin/Bookings";
import AdminBookingDetails from "../pages/Admin/BookingDetails";
import AdminReviews from "../pages/Admin/Reviews";
import AdminProfile from "../pages/Admin/Profile";
import Notifications from "../pages/Admin/Notifications";
import Analytics from "../pages/Admin/Analytics";


// Emergency
import Emergency from "../pages/Emergency/Emergency";

function ProtectedRoute({ loginPath = "/login" }) {
  const accessToken = localStorage.getItem("access");

  return accessToken ? <Outlet /> : <Navigate to={loginPath} replace />;
}

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Public */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/contact" element={<Contact />} />



        {/* Customer */}
        <Route element={<ProtectedRoute />}>

        <Route 
          path="/customer/dashboard" 
          element={<CustomerDashboard />} 
        />


        <Route 
          path="/customer/vehicles" 
          element={<MyVehicles />} 
        />


        <Route 
          path="/customer/vehicles/add" 
          element={<AddVehicle />} 
        />


        <Route 
          path="/customer/vehicles/edit/:id" 
          element={<EditVehicle />} 
        />


        <Route 
          path="/customer/book-service" 
          element={<BookService />} 
        />


        <Route 
          path="/customer/nearby-shops" 
          element={<NearbyShops />} 
        />


        <Route 
          path="/customer/ai-recommendation" 
          element={<AIRecommendation />} 
        />


        <Route 
          path="/customer/emergency" 
          element={<EmergencySOS />} 
        />


        <Route 
          path="/customer/booking-history" 
          element={<BookingHistory />} 
        />


        <Route 
          path="/customer/booking/:id" 
          element={<BookingDetails />} 
        />


        <Route 
          path="/customer/reviews" 
          element={<CustomerReviews />} 
        />


        <Route 
          path="/customer/profile" 
          element={<CustomerProfile />} 
        />
        </Route>



        {/* Repair Shop */}
        <Route element={<ProtectedRoute />}>

        <Route 
          path="/repairshop/dashboard" 
          element={<RepairShopDashboard />} 
        />


        <Route 
          path="/repairshop/bookings" 
          element={<RepairShopBookings />} 
        />


        <Route 
          path="/repairshop/profile" 
          element={<RepairShopProfile />} 
        />


        <Route 
          path="/repairshop/mechanics" 
          element={<Mechanics />} 
        />


        <Route 
          path="/repairshop/services" 
          element={<RepairShopServices />} 
        />


        <Route 
          path="/repairshop/reviews" 
          element={<RepairShopReviews />} 
        />


        <Route 
          path="/repairshop/queue" 
          element={<Queue />} 
        />

        <Route 
          path="/repairshop/emergency-service" 
          element={<EmergencyService />} 
        />
        </Route>



        {/* Admin */}
        <Route element={<ProtectedRoute loginPath="/admin/login" />}>

        <Route 
          path="/admin/login" 
          element={<AdminLogin />} 
        />


        <Route 
          path="/admin/dashboard" 
          element={<AdminDashboard />} 
        />


        <Route 
          path="/admin/customers" 
          element={<Customers />} 
        />


        <Route 
          path="/admin/customers/:id" 
          element={<CustomerDetails />} 
        />


        <Route 
          path="/admin/shops" 
          element={<RepairShops />} 
        />


        <Route 
          path="/admin/bookings" 
          element={<Bookings />} 
        />


        <Route 
          path="/admin/bookings/:id" 
          element={<AdminBookingDetails />} 
        />


        <Route 
          path="/admin/reviews" 
          element={<AdminReviews />} 
        />


        <Route 
          path="/admin/profile" 
          element={<AdminProfile />} 
        />


        <Route 
          path="/admin/notifications" 
          element={<Notifications />} 
        />


        <Route 
          path="/admin/analytics" 
          element={<Analytics />} 
        />
        </Route>



        {/* Emergency */}

        <Route 
          path="/emergency" 
          element={<Emergency />} 
        />


      </Routes>


    </BrowserRouter>

  );

}


export default AppRoutes;