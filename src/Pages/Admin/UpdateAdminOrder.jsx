import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../UrlHelper/baseUrl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../Styling/AdminDashboard.css";
import { updateOrder } from "../../Redux/Actions/orderActions";
import { ADMIN_UPDATE_ORDER_RESET } from "../../Redux/Constants/orderConstants";
import { toast } from "react-toastify";

const UpdateAdminOrder = () => {
  const { user } = useSelector((state) => state.userData);
  const { isUpdated } = useSelector((state) => state.updateOrder);
  const [orderData, setOrderData] = useState({});
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/order/${id}`);
        if (data.success) {
          setOrderData(data.order);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const adminCategories = ["Processing", "Delivered"];

  const handleStatusChange = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set("status", status);

    dispatch(updateOrder(id, form));
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch({ type: ADMIN_UPDATE_ORDER_RESET });
      toast.success("Order Status Updated Successfully!!");
      navigate("/admin/all-orders");
    }
  }, [dispatch, navigate, isUpdated]);
  return (
    <>
      <Sidebar />
      <div className="page-container">
        <div className="row d-flex justify-content-end">
          <div className="col-xl-9 col-md-10">
            <div className="container px-1 px-md-4 py-5 mx-auto">
              <div className="card p-2">
                <div className="row d-flex justify-content-start top">
                  {orderData.orderItems ? (
                    orderData.orderItems.map((data) => (
                      <div className="orderID-one" key={data._id}>
                        <label>
                          ORDER
                          <span className="font-weight-bold">#{data._id}</span>
                        </label>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                  <div className=" text-sm-right order-black">
                    <p className="mb-0">
                      {/* Expected Arrival <span>02/12/23</span> */}
                    </p>
                  </div>
                </div>

                <div className="row d-flex justify-content-start px-3 top">
                  <div className="orderID">
                    <h5>SHIPPING DETAILS</h5>
                  </div>
                  <div className="card-body cart-details">
                    <div className="row">
                      <p className="cart-product-name">
                        <small>Name: </small>
                        <small>{user?.name}</small>
                      </p>
                      <p className="cart-product-name">
                        <small>Address: </small>
                        <small>{orderData.shippingInfo?.address}</small>
                      </p>
                      <p className="cart-product-name">
                        <small>Phone Number: </small>
                        <small>{orderData.shippingInfo?.phoneNo}</small>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-start px-3 top">
                  <div className="orderID">
                    <h5>PAYMENT DETAILS</h5>
                  </div>
                  <div className="card-body cart-details">
                    <div className="row">
                      <p className="cart-product-name">
                        <small>Payment Method: </small>
                        <small>Cash/online</small>
                      </p>
                      <p className="cart-product-name">
                        <small>Paid At: </small>
                        <small>
                          {orderData.paymentInfo?.createdAt &&
                            new Date(
                              orderData.paymentInfo.createdAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                        </small>
                      </p>
                      <p className="cart-product-name">
                        <small>Total Amount: </small>
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Rs.
                        </span>
                        <small>{orderData.paymentInfo?.totalPrice}/-</small>
                      </p>
                      <p className="cart-product-name">
                        <small>Payment Method: </small>
                        <small style={{ color: "green" }}>Cash/online</small>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-start px-3 top">
                  <div className="orderID">
                    <h5>ORDER STATUS</h5>
                  </div>
                  <div className="card-body cart-details">
                    <div className="row">
                      <p className="cart-product-name">
                        <small>Status : </small>
                        <small
                          style={{
                            color:
                              orderData?.paymentInfo?.orderStatus ===
                              "Processing"
                                ? "orange"
                                : "green",
                          }}
                        >
                          {orderData?.paymentInfo?.orderStatus}
                        </small>
                      </p>
                    </div>
                    <div className="d-flex flex-column pb-3">
                      <label for="email" className="login-text">
                        Change Status
                      </label>
                      <select
                        placeholder="Select Category"
                        className="login-input login-select-input"
                        style={{ color: "black" }}
                        onClick={(e) => setStatus(e.target.value)}
                      >
                        {adminCategories.map((data) => (
                          <option key={data} value={data}>
                            {data}
                          </option>
                        ))}
                      </select>

                      <button
                        className="login-button mt-4 login-select-button"
                        onClick={handleStatusChange}
                      >
                        <span>Update Status</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-start px-3 top">
                  <div className="orderID">
                    <h5>ORDER ITEMS</h5>
                  </div>
                  {orderData?.orderItems?.map((item) => (
                    <div className="card-body cart-details" key={item._id}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-2 col-md-4">
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={item.image}
                                className="w-100"
                                alt="cart-img"
                              />
                            </div>
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0 cart-details">
                            <p className="cart-product-name text-black">
                              {item.name}
                            </p>
                            <p className="cart-product-productId">
                              {/* <small>#{item._id}</small> */}
                            </p>
                          </div>

                          <div className="col-lg-4 col-md-6 cart-details">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <strong style={{ marginTop: ".5rem" }}>
                                {item.quantity} X {item.price} = ₹
                                {item.quantity * item.price}/-
                              </strong>
                            </div>
                          </div>
                        </div>

                        <hr className="my-4 mid-border" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAdminOrder;
