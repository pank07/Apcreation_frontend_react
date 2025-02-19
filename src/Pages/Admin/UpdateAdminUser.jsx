import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../Redux/Actions/userActions";
import { ADMIN_UPDATE_USER_RESET } from "../../Redux/Constants/userConstants";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../UrlHelper/baseUrl";

const UpdateAdminUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.singleUserDetail);
  console.log(user);
  const { isUpdated } = useSelector((state) => state.updateUser);
  const userCategories = ["admin", "user"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/admin/user/${id}`);
        if (data.success) {
          setUserData(data.getUser);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserDetails();
  }, [id]);

  useEffect(() => {
    setName(userData?.name);
    setEmail(userData?.email);
    setRole(userData?.role);

    if (isUpdated) {
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
      navigate("/admin/all-users");
      toast.success("User Updated Successfully!!");
    }
  }, [
    userData?.name,
    userData?.email,
    userData?.role,
    dispatch,
    navigate,
    isUpdated,
  ]);

  const updateUserHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set("name", name);
    form.set("email", email);
    form.set("role", role);

    dispatch(updateUser(id, form));
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center login-container">
          <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
            <h1 className="login-system-register">Update User</h1>
            <form className="pt-2" onSubmit={updateUserHandler}>
              <div className="d-flex flex-column pb-3">
                <label for="email" className="login-text">
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email Address"
                  className="login-input"
                />
              </div>

              <div className="d-flex flex-column pb-3">
                <label for="email" className="login-text">
                  Select Category
                </label>
                <select
                  placeholder="Select Category"
                  className="login-input"
                  value={role}
                  style={{ color: "black" }}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Select Category</option>
                  {userCategories &&
                    userCategories.map((data) => (
                      <option key={data} value={data}>
                        {data}
                      </option>
                    ))}
                </select>
              </div>

              <button className="login-button mt-4">
                <span>Update User</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAdminUser;
