import React, { useState } from "react";
import "../Styling/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../UrlHelper/baseUrl";
import forgotImage from "../assets/forgot.jpg";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";  // Import Lottie
import loaderAnimation from "./Admin/formail.json";  // Import JSON animation

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true); // Show Loader

    try {
      const response = await axios.post(`${baseUrl}/password/forget`, { email });
      setMessage(response.data.message || "Reset link sent to your email.");
      setLoading(false); // Hide Loader
      navigate("/ForgetPasswordEmail");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send reset link.");
      setLoading(false); // Hide Loader on error
    }
  };

  return (
    <>
      <div className="container p-5">
        <div className="row d-flex justify-content-start align-items-center login-container">
          <div className="col-lg-5 col-10">
            <div id="circle"></div>
            <div className="pb-5">
              <img src={forgotImage} alt="" className="login-image mt-5" />
            </div>
          </div>
          <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
            <div className="mt-1 mt-md-5">
              <h1 className="login-system">Forgot Password</h1>
              <form className="pt-4" onSubmit={handleForgotPassword}>
                <div className="d-flex flex-column pb-3">
                  <label htmlFor="email" className="login-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    id="emailId"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email Address"
                    className="login-input"
                    disabled={loading} // Disable input while loading
                  />
                </div>

                {/* Show Lottie Animation while loading */}
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <Lottie animationData={loaderAnimation} loop={true} style={{ width: 100, height: 100 }} />
                  </div>
                ) : (
                  <button type="submit" className="login-button mt-3" disabled={loading}>
                    Send Mail
                  </button>
                )}

                <div className="register mt-5">
                  <p>
                    Don't have an account?
                    <NavLink to="/register" className="register-account">
                      {" "}
                      Create an account
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
