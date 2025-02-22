import React, { useState, useEffect } from "react";
import "../Styling/Checkout.css";
import BgImage from "../assets/Bg-Image13.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleUserDetails } from "../Redux/Actions/userActions"; // Updated action name

const CheckoutNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from Redux store
  const { user, loading, error } = useSelector((state) => state.userData);

  // State for form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  if (name && address && mobile) {
    localStorage.setItem("name", String(name));
    localStorage.setItem("address", String(address));
    localStorage.setItem("mobile", String(mobile));
} else {
    console.error("Missing values: name, address, or mobile is undefined/null");
}
  // Fetch user details on mount
  useEffect(() => {
    dispatch(singleUserDetails()); // Fetch user details from backend
  }, [dispatch]);

  useEffect(() => {
    console.log("User Data from Redux:", user); // Check if user data is available
    console.log("Extracted User ID:", user?._id); // Debugging step
    
    if (user && user._id) {
      console.log("Dispatching singleUserDetails with ID:", user._id);
      dispatch(singleUserDetails(user._id)); // Call action with correct ID
    } else {
      console.error("❌ User ID is missing!");
    }
  }, [dispatch, user]);
  

  // Auto-fill form when user data is available
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAddress(user.address || "");
      setMobile(user.mobile || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      toast.error("Phone Number should be 10 digits long!");
      return;
    }

    console.log("Shipping Details:", { name, address, mobile });

    // Navigate to order confirmation
    navigate("/cart/order-confirm");
  };

  return (
    <div className="container p-5">
      <div className="row d-flex justify-content-start align-items-center">
        <div className="col-lg-5 col-10">
          <div className="pb-5 mt-5">
            <img src={BgImage} alt="Background" className="login-image" />
          </div>
        </div>
        <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
          <h1 className="login-system-register">Shipping Details</h1>

          {loading ? (
            <p>Loading user details...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <form className="pt-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="d-flex flex-column pb-3">
                <label className="login-text">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Full Name"
                  className="login-input"
                  required
                />
              </div>

              {/* Address Field */}
              <div className="d-flex flex-column pb-3">
                <label className="login-text">Your Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Full Address"
                  className="login-input"
                  required
                />
              </div>

              {/* Mobile Number Field */}
              <div className="d-flex flex-column pb-3">
                <label className="login-text">Mobile Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter Mobile Number"
                  className="login-input"
                  required
                />
              </div>

              <button type="submit" className="login-button mt-4">
                <span style={{ color: "black" }}>Save & Proceed</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutNew;