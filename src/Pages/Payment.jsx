import React, { useRef, useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../UrlHelper/baseUrl";
import { useNavigate } from "react-router-dom";
import { createNewOrder } from "../Redux/Actions/orderActions";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cartData);
  const { user } = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(false);
  const paymentButton = useRef(null);
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  useEffect(() => {
    // Enable the payment button once the component is mounted
    paymentButton.current.disabled = false;
  }, []);

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();
    paymentButton.current.disabled = true;
    setLoading(true);
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${baseUrl}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        paymentButton.current.disabled = false;
        setLoading(false);
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const order = {
          shippingInfo: shippingInfo,
          orderItems: cartItems,
          itemsPrice: orderInfo.subtotal,
          taxPrice: orderInfo.tax,
          shippingPrice: orderInfo.shipping,
          totalPrice: orderInfo.totalPrice,
        };
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        dispatch(createNewOrder(order));
        navigate("/success");
        toast.success("Payment Received Successfully");
      } else {
        paymentButton.current.disabled = false;
        setLoading(false);
        toast.error("There's some issue while processing payment");
      }
    } catch (error) {
      paymentButton.current.disabled = false;
      setLoading(false);
      toast.error("An error occurred during payment processing.");
      console.error(error);
    }
  };

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  return (
    <>
      <div className="container p-5">
        <CheckoutSteps activeStep={2} />
        <div className="row d-flex justify-content-center align-items-center login-container">
          <div className="col-lg-4 col-md-6 ">
            <div className="payment-form mt-md-5">
              <h1 className="login-system-register">Card Information</h1>
              <form className="pt-4" onSubmit={(e) => paymentSubmitHandler(e)}>
                <div className="d-flex flex-column pb-3">
                  <CardNumberElement className="payment-input" />
                </div>
                <div className="d-flex flex-column pb-3">
                  <CardExpiryElement className="payment-input" />
                </div>
                <div className="d-flex flex-column pb-3">
                  <CardCvcElement className="payment-input" />
                </div>
                <button
                  className="login-button mt-4"
                  ref={paymentButton}
                  disabled={loading}
                >
                  <span>
                    {loading
                      ? "Processing..."
                      : `Pay ₹${orderInfo && orderInfo.totalPrice}`}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
