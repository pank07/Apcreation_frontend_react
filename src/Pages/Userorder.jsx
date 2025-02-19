import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../UrlHelper/baseUrl";
import "../Styling/Cart.css";
// import DeleteIcon from "../assets/delete.png";
// import HeartIcon from "../assets/heart.png";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Loader from "../components/Loader";

const UserOrder = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userData);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`${baseUrl}/user/orders`);
        if (response.data.success && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else {
          console.error("Invalid order response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-300"
            >
              {/* Header */}
              <div className="bg-gray-800 text-cyan-400 p-3 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">ORDER SUMMARY</h3>
              </div>

              {/* Order Details */}
              <div className="p-4" >
                <p className="bg-black p-2 rounded" style={{color:"#00fefe"}}>
                  <p style={{color:"#00fefe"}}>Order ID:</p> {order.paymentInfo.id}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {order.paymentInfo.orderStatus}
                </p>
                <p className="text-gray-700">
                  <strong>Total Price:</strong> ₹{order.paymentInfo.totalPrice}
                </p>
                <p className="text-gray-700">
                  <strong>Shipping Address:</strong> {order.shippingInfo.address},{" "}
                  {order.shippingInfo.city}
                </p>
                <p className="text-gray-700"style={{color:"#4d4d4f"}} >
                  <strong>Payment Status:</strong> {order.paymentInfo.status}
                </p>
              </div>

              {/* Checkout Button */}
              <div className="p-4">
                <button className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">
                  Go to Checkout
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg font-semibold">No orders found.</p>
      )}
    </div>
  );
};

export default UserOrder;

