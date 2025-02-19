import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RegisterImage from "../assets/register.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { userRegister } from "../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import ProfileIcon from "../assets/profile.png";

const Register = () => {
  const userRegisterData = useSelector((state) => state.userData);
  const { isAuthenticated } = userRegisterData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(ProfileIcon);
  const [isMobileValid, setIsMobileValid] = useState(false); // For mobile validation
  const [showOtpField, setShowOtpField] = useState(false); // To show OTP field

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      password: "",
      confirmPassword: "",
      confirmOtp: "", // Add confirmOtp field to formik values
    },
    validationSchema: Yup.object({
      name: Yup.string().required("User Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      const userForm = new FormData();
      userForm.set("name", values.name);
      userForm.set("email", values.email);
      userForm.set("password", values.password);
      userForm.set("mobile", values.mobile);
      userForm.set("address", values.address);
      if (avatar) {
        userForm.set("avtar", avatar);
      }
      dispatch(userRegister(userForm, navigate));
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMobileChange = (e) => {
    const mobile = e.target.value;
    formik.setFieldValue("mobile", mobile);
    const isValid = /^[0-9]{10}$/.test(mobile); // Check if the mobile is valid
    setIsMobileValid(isValid);
    setShowOtpField(isValid); // Show OTP field if mobile is valid
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container p-5">
      <div className="row d-flex justify-content-start align-items-center login-container">
        <div className="col-lg-5 col-10">
          <div className="pb-5 mt-5">
            <img src={RegisterImage} alt="" className="login-image" />
          </div>
        </div>
        <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
          <div className="mt-1 mt-md-5">
            <h1 className="login-system-register">Register a New Account</h1>
            <form className="pt-4" onSubmit={formik.handleSubmit}>
              {[{
                label: "User Name", name: "name", type: "text"
              }, {
                label: "Email Address", name: "email", type: "email"
              }, {
                label: "Mobile", name: "mobile", type: "text", onChange: handleMobileChange
              }, {
                label: "Confirm OTP", name: "confirm_otp", type: "text", condition: showOtpField
              }, {
                label: "Address", name: "address", type: "text"
              }, {
                label: "Password", name: "password", type: "password"
              }, {
                label: "Confirm Password", name: "confirmPassword", type: "password"
              }].map(({ label, name, type, condition, onChange }) => (
                condition !== false && (
                  <div className="d-flex flex-column pb-3" key={name}>
                    <label htmlFor={name} className="login-text">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formik.values[name]}
                      onChange={onChange || formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={`Enter your ${label}`}
                      className="login-input"
                    />
                    {formik.touched[name] && formik.errors[name] && (
                      <div className="error-text">{formik.errors[name]}</div>
                    )}
                    {name === "mobile" && isMobileValid && (
                      <div className="valid-mobile">
                        <span role="img" aria-label="valid">✔️</span> Mobile is valid
                      </div>
                    )}
                  </div>
                )
              ))}
              <div className="d-flex flex-column pb-3">
                <label htmlFor="avatar" className="login-text">Profile Image</label>
                <div className="avatar-preview-container">
                  <img src={avatarPreview} alt="preview" className="avatar-preview" />
                  <input
                    type="file"
                    name="avtar"
                    id="avtar"
                    className="avatar-input"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
              <button type="submit" className="login-button mt-4">
                <span style={{ color: "black" }}>Register</span>
              </button>
              <div className="register mt-5">
                <p style={{ color: "black" }}>
                  Already have an Account?
                  <NavLink to="/login" className="register-account"> Login </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Internal CSS for Validation Error Messages */}
      <style jsx="true">{`
        .error-text {
          color: red;
          font-size: 12px;
        }
        .valid-mobile {
          color: green;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default Register;
