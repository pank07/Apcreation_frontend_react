import React, { useState } from "react";
import "../Styling/Login.css";
import LoginImage from "../assets/login.jpg";
import { NavLink, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Redux/Actions/userActions";
import { useNavigate ,Link} from "react-router-dom";

const Login = () => {
  const userLoginData = useSelector((state) => state.userData);
  const { isAuthenticated } = userLoginData;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password ,navigate));
  };

  if (isAuthenticated) {
    navigate("/");
  }
  return (
    <>
      <div className="container p-5">
        <div className="row d-flex justify-content-start align-items-center login-container">
          <div className="col-lg-5 col-10">
            <div id="circle"></div>
            <div className="pb-5">
              <img src={LoginImage} alt="" className="login-image" />
            </div>
          </div>
          <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
            <div className="mt-1 mt-md-5">
              <h1 className="login-system">Login to your account</h1>
              <form className="pt-4" onSubmit={LoginSubmit}>
                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email Address"
                    className="login-input"
                  />
                </div>
                <div className="d-flex flex-column pb-3">
                  <label for="password" className="login-text">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="login-input"
                  />
                </div>
                <div className="d-flex jusity-content-end pb-4">
                  <div className="ml-auto">
                    <NavLink
                      to="/forgot-password"
                      className="login-forgot text-decoration-none"style={{color:"blue"}}
                    >
                      Forgot password?
                    </NavLink>
                  </div>
                </div>

                <button  className="login-button" >
                  <span style={{color:"black"}}>Login</span>
                  
                  
            
                </button>

                <div className="register mt-5">
                  <p style={{color:"black"}}>
                    Don't have an account?
                    <NavLink to="/register" className="register-account" style={{color:"black"}}>
                      {" "}
                      Create an account <Link to="/register">Register</Link>
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


export default Login;

