// import React from "react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../UrlHelper/baseUrl";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../Styling/Cart.css";
import { addToCartReducer } from '../Redux/Reducers/cartReducers';
import { clearCart } from '../Redux/Actions/cartActions';
import { isNumber } from "@mui/x-data-grid/internals";
const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { cartItems, shippingInfo,shippingCharges } = useSelector((state) => state.cartData);
  const { user } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  if (!shippingInfo) {
    return <p>Loading...</p>;
  }
  const savedShippingCharges = localStorage.getItem("shippingCharges");
  const address=localStorage.getItem("address")
  const name=localStorage.getItem("name");
  const mobile=localStorage.getItem("mobile");


  console.log(savedShippingCharges);
  
  //const address =` ${shippingInfo.address};

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  
  // console.log("subtotal",subtotal);
  


  // const handleCashOnDelivery = async () => {
  //   setLoading(true); // Start loading
  
  //   try {
  //     // Replace with your actual API endpoint and payload
  //     const { data } = await axios.post(`${baseUrl}/order/new/cod`, {
  //       paymentInfo: { id: "cash", method: "COD" },
  //        shippingInfo,
  //        cartItems,
        
  //       // itemsPrice,
  //       // taxPrice,
  //       // shippingPrice,
  //       totalPrice,
  //     });
  
  //     if (data.success) {
  //       setOrderSuccess(true); // Mark order as successful
  //       toast.success("Order placed successfully!");
  //       console.log("cartitemksdb0ufhwbfg",cartItems);
  //       cartItems.clear; // Reset the cart to an empty array
      
  //       // Redirect to home page after order is successful
  //       // navigate("/");
  //       dispatch(addToCartReducer());
  //       setCartItems([ ]);
  //       dispatch(clearCart());
  //     } else {
  //       toast.error("Failed to place order. Please try again.");
  //       alert("Failed to place order. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong. Please try again.");
  //     console.error("Error placing order:", error);
  //   }
  // };
  const finalTotalPrice = Number(subtotal) + Number(savedShippingCharges) ; 
  const handleCashOnDelivery = async () => {
    setLoading(true); // Start loading
  
    try {
      // Replace with your actual API endpoint and payload
      const { data } = await axios.post(`${baseUrl}/order/new/cod`, {
        paymentInfo: { id: "cash", method: "COD" },
        shippingInfo,
        cartItems,
        finalTotalPrice,
      });
  
      if (data.success) {
        setOrderSuccess(true); // Mark order as successful
        toast.success("Order placed successfully!");
        
        // Dispatch the action to clear the cart
        dispatch(clearCart());  // Clear the cart in Redux
  
        localStorage.removeItem("cartItems");
        
        // Optional: If you are handling local state for cartItems, you can reset it like this:
        // setCartItems([]);  // Reset cart items locally
  
        // Redirect to home page or cart page after order is successful
        navigate("/");
      } else {
        toast.error("Failed to place order. Please try again.");
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error placing order:", error);
    }
  };
  const totalPrice = subtotal;
  
  return (
    <PayPalScriptProvider options={{ "client-id": "AfY1s5ulaV6prcE8wxhJp8A-yJJgTLnQWYI6S7UgSBA0GmcIGcunlGUEzTgiPMqm2xIAljlqvcE_R4fI" }}>
      <section className="h-100">
        <div className="container py-5">
          <CheckoutSteps activeStep={1} />
          <div className="row d-flex justify-content-center my-5">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3 cart-heading-container">
                  <h5 className="mb-0 cart-heading">SHIPPING ADDRESS</h5>
                </div>
                <div className="card-body cart-details">
                  <div className="row">
                    <p className="cart-product-name">
                      <strong>Name: </strong>
                      <strong>{name}</strong>
                    </p>
                    <p className="cart-product-name">
                      <small>Address: </small>
                      <small>{address}</small>
                    </p>
                    <p className="cart-product-name">
                      <small>Phone Number: </small>
                      <small>{mobile}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3 cart-heading-container">
                  <h5 className="mb-0 cart-heading">ALL ITEMS</h5>
                </div>

                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div className="card-body" key={item.productId}>
                      <div className="row">
                        <div className="col-lg-2 col-md-4">
                          <Link to={`/product/${item.productId}`}>
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={item.images}
                                className="w-100"
                                alt="cart-img"
                              />
                            </div>
                          </Link>
                        </div>

                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0 cart-details">
                          <p className="cart-product-name">{item.name}</p>
                          <p className="cart-product-productId">
                            <small>#{item.productId}</small>
                          </p>
                        </div>

                        <div className="col-lg-4 col-md-6 cart-details">
                          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                            <strong style={{ marginTop: ".5rem" }}>
                              {item.quantity} X ₹{item.price} = ₹
                              {(item.quantity * item.price)}/-
                            </strong>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4 mid-border" />
                    </div>
                  ))
                ) : (
                  <div className="empty-cart">
                    <strong>Your Cart is Empty 🤷‍♂️</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3 cart-heading-container">
                  <h5 className="mb-0 summary-heading" style={{ color: "black" }}>ORDER SUMMARY</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group pricing-container">
                    <li className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      <span style={{ color: "black" }}>Sub Total</span>
                      <span style={{ color: "black" }}>₹{subtotal}/-</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center px-0">
                      <span style={{ color: "black" }}>Shipping Charges</span>
                      <span style={{ color: "green" }}>{savedShippingCharges}</span>
                    </li>
                    <hr className="my-2 mid-border" />
                    <li className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <span style={{ color: "black" }}>Total Amount</span>
                      <strong style={{ color: "black" }}>₹{finalTotalPrice}/-</strong>
                    </li>
                  </ul>

                  {/* PayPal Payment Option */}
                  <div className="mb-3">
                    <PayPalButtons
                      style={{ layout: "horizontal" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalPrice, // Total amount to be paid
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        // Handle successful payment
                        navigate("/order-confirm/payment");
                      }}
                    />
                  </div>

                  {/* Separator */}
                  <div className="text-center my-3">
                    <p style={{ margin: "0", fontWeight: "bold", color: "black" }}>OR</p>
                  </div>

                  {/* Cash on Delivery Option */}
                  <div className="text-center">
                  <h5
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      background:"lightgreen",
                      cursor: "pointer",
                      textDecoration: loading ? "underline" : "none",
                    }}
                    onClick={handleCashOnDelivery}
                  >
                    Cash on Delivery
                  </h5>
                  {loading && <p>Placing your order...</p>}
                  {orderSuccess && <p style={{ color: "green",background:"green" }}>Order placed successfully!</p>}
                    {/* <p style={{ fontSize: "14px", color: "black" }}>
                      Pay when your order is delivered at your doorstep.
                    </p> */}
                  </div>
                </div>
              </div>
            </div>    
          </div>
        </div>
      </section>
    </PayPalScriptProvider>
  );
};

export default ConfirmOrder;