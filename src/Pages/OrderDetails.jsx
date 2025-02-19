import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../UrlHelper/baseUrl";
import Steps from "../assets/confirmStep.png";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { user } = useSelector((state) => state.userData);
  const [orderData, setOrderData] = useState({});
  const { id } = useParams();

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

  return (
    <>
      <div className="page-container">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-8 col-md-12">
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
                  <div className=" text-sm-right order-white">
                    <p className="mb-0">
                      Expected Arrival <span>02/12/23</span>
                    </p>
                  </div>
                </div>

                <div className="row d-flex justify-content-start px-3 top">
                  <div className="orderID">
                    <h5 >SHIPPING DETAILS</h5>
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
                        Rs. <small>{orderData.paymentInfo?.totalPrice}/-</small>
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
                        <small>{orderData?.paymentInfo?.orderStatus}</small>
                      </p>
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
                              data-mdb-ripple-color="light">
                              <img src={item.image}
                                className="w-100"  alt="cart-img" />
                            </div>
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0 cart-details">
                            <p className="cart-product-name">{item.name}</p>
                            <p className="cart-product-productId">
                              <small>#{item._id}</small>
                            </p>
                          </div>

                          <div className="col-lg-4 col-md-6 cart-details">
                            <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
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

                <div className="row justify-content-center">
                  <div className="col-12">
                    <ul id="progressbar" className="text-center">
                      <li className="active step0">
                        <img src={Steps} alt="one" className="steps-count" />
                      </li>
                      <li className="active step0">
                        <img src={Steps} alt="one" className="steps-count" />
                      </li>
                      <li className="active step0">
                        <img src={Steps} alt="one" className="steps-count" />
                      </li>
                      <li className="step0">
                        <img src={Steps} alt="one" className="steps-count" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-between gap-3 top">
                  <div className="col d-flex icon-content">
                    <img
                      className="icon"
                      src="https://i.imgur.com/9nnc9Et.png"  alt=""/>
                    <div className="d-flex flex-column">
                      <p className="font-weight-bold">
                        Order
                        <br />
                        Processed
                      </p>
                    </div>
                  </div>
                  <div className="col d-flex icon-content">
                    <img
                      className="icon"
                      src="https://i.imgur.com/u1AzR7w.png"
                      alt=""
                    />
                    <div className="d-flex flex-column">
                      <p className="font-weight-bold">
                        Order
                        <br />
                        Shipped
                      </p>
                    </div>
                  </div>
                  <div className="col d-flex icon-content">
                    <img
                      className="icon"
                      src="https://i.imgur.com/TkPm63y.png"
                      alt=""
                    />
                    <div className="d-flex flex-column">
                      <p className="font-weight-bold">Order En Route</p>
                    </div>
                  </div>
                  <div className="col d-flex icon-content">
                    <img
                      className="icon"
                      src="https://i.imgur.com/HdsziHP.png"
                      alt=""
                    />
                    <div className="d-flex flex-column">
                      <p className="font-weight-bold">
                        Order
                        <br />
                        Delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;