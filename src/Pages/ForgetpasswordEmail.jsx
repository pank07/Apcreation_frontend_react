import React, { useState, useEffect } from "react";
import "../Styling/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser, ForgetPassword} from "../Redux/Actions/userActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../Redux/Constants/userConstants";

const ForgetPasswordEmail = () => {
  const dispatch = useDispatch();
  const { isUpdated } = useSelector((state) => state.profile ||{});
  const [oldPassword, setOldPassword] = useState("");
  const [email, setemail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   // Debugging ke liye
    if (isUpdated) {
      dispatch(LoadUser());
      navigate("/");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, isUpdated, navigate]);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    // Log values for debugging

    // Create FormData object and append the values
    const myForm = new FormData();
    myForm.set("otp", oldPassword);
    myForm.set("email", email);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    // Log FormData to verify its contents (if needed)

    // Dispatch the ForgetPassword action with FormData
    dispatch(ForgetPassword(myForm,navigate));

};

  return (
    <>
      <div className="container p-5">
        <div className="row d-flex justify-content-center align-items-center login-container">
          <div className="col-lg-4">
            <div className="mt-1">
              <h1 className="login-system-register" style={{ color: "black" }}>
                Forget Your Password
              </h1>
              <form className="pt-2" onSubmit={updatePasswordSubmit}>
                <div className="d-flex flex-column pb-3">
                  <label htmlFor="oldPassword" className="login-text">
                    Enter OTP
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    className="login-input"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter OTP"
                  />
                </div>
                <div className="d-flex flex-column pb-3">
                  <label htmlFor="oldPassword" className="login-text">
                    Enter Existing Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter Email"
                  />
                </div>

                <div className="d-flex flex-column pb-3">
                  <label htmlFor="newPassword" className="login-text">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="login-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter Your New Password"
                  />
                </div>

                <div className="d-flex flex-column pb-3">
                  <label htmlFor="confirmPassword" className="login-text">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="login-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Your Password"
                  />
                </div>
                
                <button className="login-button mt-4">
                  <span style={{ color: "black" }}>Update Password</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordEmail;