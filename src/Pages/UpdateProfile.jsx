import React, { useEffect, useState } from "react";
import "../Styling/Login.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileIcon from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { LoadUser, updateUserProfile } from "../Redux/Actions/userActions";
import { UPDATE_PROFILE_RESET } from "../Redux/Constants/userConstants";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.userData);
  const { isUpdated } = useSelector((state) => state.profile);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [mobile, setmobile] = useState(user?.mobile);
  const [avatar, setAvatar] = useState(ProfileIcon);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profilepicture && user?.profilepicture?.url
      ? user?.profilepicture?.url
      : ProfileIcon
  );

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("mobile", mobile);
    myForm.set("email", email);
    myForm.set("avtar", avatar);
    dispatch(updateUserProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(LoadUser());
      navigate("/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, isUpdated, navigate]);

  return (
    <>
      <div className="container p-5">
        <div className="row d-flex justify-content-center align-items-center login-container">
          <div className="col-lg-4 ">
            <div className="mt-1 ">
              <h1 className="login-system-register" style={{color: "black" }}>Update Your Profile</h1>
              <form className="pt-2" onSubmit={updateProfileSubmit}>
                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Enter User Name"
                    className="login-input"
                  />
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your Email Address"
                    className="login-input"
                  />
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="mobile" className="login-text">
                   Mobile Number
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => {
                      setmobile(e.target.value);
                    }}
                    placeholder="Enter your mobile number"
                    className="login-input"
                  />
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="avatar" className="login-text">
                    Profile Image
                  </label>
                  <div className="avatar-preview-container">
                    <img
                      alt="preview"
                      className="avatar-preview"
                      data-tooltip="Default Image"
                      src={avatarPreview}
                    />
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      className="avatar-input"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                </div>

                <button className="login-button mt-4">
                  <span style={{color: "black" }}>Update Profile</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;