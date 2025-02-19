import React, { useEffect } from "react";
import "../Styling/Profile.css";
import ProfileIcon from "../assets/profile.png";
import LogoutIcon from "../assets/logout.png";
import cartIcon from "../assets/cart.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOutUser } from "../Redux/Actions/userActions";
import Dashboard from "../assets/dashboard.png";
import EditIcon from "../assets/edit.png";
import ResetPasswordIcon from "../assets/resetPassword.png";
import Loader from "../components/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.userData
  );

  const LogOutHandler = () => {
    dispatch(LogOutUser());
    navigate("/login");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    // console.log({ isToken });
    if (!isToken) {
      navigate("/login");
    }
  },);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-page-container" style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
  <div 
    className="profile-card" 
    style={{ 
      maxWidth: "600px", /* Increased width from 400px to 600px */
      margin: "0 auto", 
      borderRadius: "15px", 
      overflow: "hidden", 
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
      backgroundColor: "#fff" 
    }}
  >
    {/* Header with Gradient and Avatar */}
    <div
      className="profile-header"
      style={{
        background: "linear-gradient(135deg,rgb(255, 112, 51), #ff758c)",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <img
        src={
          user?.profilepicture && user?.profilepicture?.url
            ? user.profilepicture.url
            : ProfileIcon
        }
        alt="Profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          border: "4px solid #fff",
          objectFit: "cover",
        }}
      />
     <h2 style={{ margin: "10px 0 5px", color: "#fff" }}>
                {user?.name
                  ? user.name.charAt(0).toUpperCase() +
                    user.name.slice(1).toLowerCase()
                  : ""}
              </h2>
              <p style={{ margin: "0", color: "#fff", fontSize: "14px" }}>
                {user.role
                  ? user.role.charAt(0).toUpperCase() +
                    user.role.slice(1).toLowerCase()
                  : ""}
              </p>
    </div>

    {/* Profile Details Section */}
    <div className="profile-details" style={{ padding: "20px" }}>
      <div style={{ marginBottom: "15px" }}>
        <h4 style={{ marginBottom: "5px", color: "#333" }}>Email</h4>
        <p style={{ margin: "0", color: "#666" }}>{user?.email}</p>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <h4 style={{ marginBottom: "5px", color: "#333" }}>Phone</h4>
        <p style={{ margin: "0", color: "#666" }}>{user?.mobile}</p>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <h4 style={{ marginBottom: "5px", color: "#333" }}>Account Created On</h4>
        <p style={{ margin: "0", color: "#666" }}>{String(user?.createdAt).substring(0, 10)}</p>
      </div>
    </div>
    <div className="user-orders" style={{ padding: "20px", borderTop: "1px solid #eee" }}>
  <h4 style={{ marginBottom: "10px", color: "#333" }}>User Orders</h4>
  <Link
    to="/Userorder"
    style={{
      padding: "10px 20px",
      backgroundColor: "#ff758c",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      float: "right",
      textDecoration: "none",
      textAlign: "center",
    }}
  >
    View All Orders
  </Link>
</div>
    {/* Action Buttons */}
    <div
      className="profile-actions"
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 20px",
        borderTop: "1px solid #eee",
      }}
    >
      <Link to={"/profile/update"} style={{ textDecoration: "none", textAlign: "center" }}>
        <img
          src={EditIcon}
          alt="Edit"
          style={{ width: "30px", height: "30px" }}
        />
        <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#555" }}>Edit</p>
      </Link>

      <Link to={"/profile/update-password"} style={{ textDecoration: "none", textAlign: "center" }}>
        <img
          src={ResetPasswordIcon}
          alt="Reset Password"
          style={{ width: "30px", height: "30px" }}
        />
        <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#555" }}>Password</p>
      </Link>

      <div onClick={LogOutHandler} style={{ textAlign: "center", cursor: "pointer" }}>
        <img
          src={LogoutIcon}
          alt="Logout"
          style={{ width: "30px", height: "30px" }}
        />
        <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#555" }}>Logout</p>
      </div>
    </div>
  </div>
</div>

      )}
    </>
  );
};

export default Profile;