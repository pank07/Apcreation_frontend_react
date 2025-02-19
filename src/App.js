import './App.css';
import {Routes, Route, useNavigate } from "react-router-dom";
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import ProductDetails from './Pages/ProductDetails';
import { LoadUser } from './Redux/Actions/userActions';
import { useEffect, useState } from 'react';
import Profile from './Pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UpdateProfile from './Pages/UpdateProfile';
import ResetPassword from './Pages/ResetPassword';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Categories from './Pages/Categories';
import Photos from './Pages/Photos';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Shop from './Pages/Shop';
import ConfirmOrder from './Pages/ConfirmOrder';
import Payment from './Pages/Payment';
import ForgetPasswordEmail from './Pages/ForgetpasswordEmail';
import { baseUrl } from './UrlHelper/baseUrl';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccess from './Pages/PaymentSuccess';
import MyOrder from './Pages/MyOrder';
import OrderDetails from './Pages/OrderDetails';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ViewProducts from './Pages/Admin/ViewProducts';
import AdminAllUsers from './Pages/Admin/AdminAllUsers';
import AdminAllOrders from './Pages/Admin/AdminAllOrders';
import AdminCreateProduct from './Pages/Admin/AdminCreateProduct';
import UpdateAdminProduct from './Pages/Admin/UpdateAdminProduct';
import UpdateAdminUser from './Pages/Admin/UpdateAdminUser';
import UpdateAdminOrder from './Pages/Admin/UpdateAdminOrder';
import InvoicePage from './Pages/Admin/InviocePage';
import AdminAllReviews from './Pages/Admin/AdminAllReviews';
import AdminBanner from './Pages/Admin/AdminBanner';
import UserOrder from './Pages/Userorder';
import PrivacyPolicy from './Policies/PrivacyPolicy';
import TermsConditions from './Policies/TermsConditions';
import CookiesPolicy from './Policies/CookiesPolicy';
import Disclaimer from './Policies/Disclaimer';
import ReturnRefundPolicy from './Policies/ReturnRefundPolicy';
import Shippingpolicy from './Policies/Shippingpolicy';
// axios.defaults.withCredentials = true;
axios.defaults.headers.common['token'] = localStorage.getItem('token')

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [stripeApiKey, setStripeApiKey] = useState("")


  async function fetchStripeApiKey() {
    const { data } = await axios.get(`${baseUrl}/payment/stripeapikey`)
    console.log(data, "<<<data")
    if(data.success){
      setStripeApiKey(data.stripeApiKey)
    }
  }
  useEffect(() => {
    fetchStripeApiKey();
  }, [])

  useEffect(() => {
    dispatch(LoadUser())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Routes>
        {/* Main Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/Categories' element={<Categories />} />
        {/* <Route path="/Categories/:category" element={<Categories />} /> */}
        <Route path='/Photos' element={<Photos />} />
        <Route path='/products' element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Auth Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/admin/all-orders/invoice/:orderId' element={<InvoicePage />} />
        <Route path='/Userorder' element={<UserOrder />} />
        {/* <Route path='/userorder/:id' element={<UserOrder />} /> */}
        <Route path='/register' element={<Register />} />
        <Route path='/upload' element={<upload />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* Cart Routes */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart/shipping' element={<Checkout />} />
        <Route path='/cart/order-confirm' element={<ConfirmOrder />} />
        <Route path='/ForgetPasswordEmail' element={<ForgetPasswordEmail />} />
        <Route path='/success' element={<PaymentSuccess />} />

        {/* Order Route */}
        <Route path='/all-orders' element={<MyOrder />} />
        <Route path='/all-orders/order/:id' element={<OrderDetails />} />

        {/* Profile Routes */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/update' element={<UpdateProfile />} />
        <Route path='/profile/update-password' element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/all-products' element={<ViewProducts />} />
        <Route path='/admin/all-users' element={<AdminAllUsers />} />
        <Route path='/admin/all-orders' element={<AdminAllOrders />} />
        <Route path='/admin/all-reviews' element={<AdminAllReviews />} />
        <Route path='/admin/banner' element={<AdminBanner />} />
        <Route path='/admin/all-products/create' element={<AdminCreateProduct />} />
        <Route path='/admin/all-products/product/:id' element={<UpdateAdminProduct />} />
        <Route path='/admin/all-users/user/:id' element={<UpdateAdminUser />} />
        <Route path='/admin/all-orders/order/:id' element={<UpdateAdminOrder />} />
   
     {/* policies-route */}
     <Route path='/privacypolicy' element={<PrivacyPolicy />} />
     <Route path='/TermsConditions' element={<TermsConditions />} />
     <Route path='/CookiesPolicy' element={<CookiesPolicy />} />
     <Route path='/Disclaimer' element={<Disclaimer />} />
     <Route path='/ReturnRefundPolicy' element={<ReturnRefundPolicy />} />
     <Route path='/shipping_policy' element={<Shippingpolicy />} />

        {stripeApiKey && (
          <Route path="/cart/order-confirm/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
          )}

      </Routes>
      <Footer/>
    </>
  );
}

export default App;