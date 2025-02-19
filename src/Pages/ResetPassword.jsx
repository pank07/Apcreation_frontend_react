import React, { useState, useEffect } from "react";
import "../Styling/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser, updatePassword } from "../Redux/Actions/userActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../Redux/Constants/userConstants";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isUpdated } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(LoadUser());
      navigate("/");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, isUpdated, navigate]);

  return (
    <>
      <div className="container p-5">
        <div className="row d-flex justify-content-center align-items-center login-container">
          <div className="col-lg-4 ">
            <div className="mt-1 ">
              <h1 className="login-system-register" style={{ color: "black"}}>Update Your Password</h1>
              <form className="pt-2" onSubmit={updatePasswordSubmit}>
                <div className="d-flex flex-column pb-3">
                  <label for="password" className="login-text">
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="login-input"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter Your Old Password"/>
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="password" className="login-text">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="login-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter Your New Password"/>
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="password" className="login-text">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="login-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Your Password"/>
                </div>
                <button className="login-button mt-4">
                  <span style={{ color: "black"}} >Update Password</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;