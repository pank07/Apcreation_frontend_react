import React, { useState } from "react";

import "../Styling/Checkout.css";

import BgImage from "../assets/Bg-Image13.jpg";

import { Country, State } from "country-state-city";

import { useDispatch, useSelector } from "react-redux";

import { SaveShippingInfo } from "../Redux/Actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";



const Checkout = () => {

  const { shippingInfo } = useSelector((state) => state.cartData);

  const [city, setCity] = useState(shippingInfo.city);

  const [country, setCountry] = useState(shippingInfo.country);

  const [address, setAddress] = useState(shippingInfo.address);

  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);

  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const [state, setState] = useState(shippingInfo.state);

  const dispatch = useDispatch();

  const navigate = useNavigate();



  const SaveShippingHandler = (e) => {

    e.preventDefault();



    if (phoneNo.length < 10 || phoneNo.length > 10) {

      toast.error("Phone Number should be 10 digits Long!!");

      return;

    }

    dispatch(

      SaveShippingInfo({ address, city, state, country, pinCode, phoneNo })

    );

    navigate("/cart/order-confirm");

  };





  

  return (

    <>

      <div className="container p-5">

        <div className="row d-flex justify-content-start align-items-center ">

          <CheckoutSteps activeStep={0} />

          <div className="col-lg-5 col-10">

            <div className="pb-5 mt-5">

              <img src={BgImage} alt="" className="login-image" />

            </div>

          </div>

          <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">

          <div className="mt-1 mt-md-5">
          <div className="d-flex justify-content-between align-items-center">
  <h1 style={{ color: "black" }} className="login-system-register">
    Shipping Details
  </h1>
  <Button
    style={{ color: "black" }}
    className="login-system-register"
    // onClick={handleUseExistingAddress}
  >
    Use Existing Address
  </Button>
</div>




              <form

                className="pt-4"

                encType="multipart/form-data"

                onSubmit={SaveShippingHandler}>

                <div className="d-flex flex-column pb-3">

                  <label className="login-text">Your Address</label>

                  <textarea

                    type="text"

                    value={address}

                    onChange={(e) => setAddress(e.target.value)}

                    placeholder="Enter Full Address"

                    className="login-input"

                  />

                </div>



                <div className="d-flex flex-column pb-3">

                  <label className="login-text">Your City</label>

                  <input

                    type="text"

                    value={city}

                    onChange={(e) => setCity(e.target.value)}

                    placeholder="Enter your City Name"

                    className="login-input"

                  />

                </div>

                <div className="d-flex flex-column pb-3">

                  <label for="password" className="login-text">

                    Your Country

                  </label>

                  <select

                    type="text"

                    value={country}

                    onChange={(e) => setCountry(e.target.value)}

                    className="login-input"

                    placeholder="Enter your Country Name">

                    <option value="">Select your Country Name</option>

                    {Country &&

                      Country.getAllCountries().map((data) => (

                        <option key={data.isoCode} value={data.isoCode}>

                          {data.flag} &nbsp;

                          {data.name}

                        </option>

                      ))}

                  </select>

                </div>



                {country && (

                  <div className="d-flex flex-column pb-3">

                    <label for="password" className="login-text">

                      Your State

                    </label>

                    <select

                      type="text"

                      value={state}

                      onChange={(e) => setState(e.target.value)}

                      className="login-input"

                      placeholder="Enter your Country Name"

                    >

                      <option value="">Select your State Name</option>

                      {State &&

                        State.getStatesOfCountry(country).map((data) => (

                          <option key={data.isoCode} value={data.isoCode}>

                            {data.name}

                          </option>

                        ))}

                    </select>

                  </div>

                )}



                <div className="d-flex flex-column pb-3">

                  <label for="password" className="login-text">

                    Post Code

                  </label>

                  <input

                    type="number"

                    className="login-input"

                    value={pinCode}

                    onChange={(e) => setPinCode(e.target.value)}

                    placeholder="Enter your City Pin Code"

                  />

                </div>



                <div className="d-flex flex-column pb-3">

                  <label for="password" className="login-text">

                    Phone Number

                  </label>

                  <input

                    type="number"

                    className="login-input"

                    value={phoneNo}

                    onChange={(e) => setPhoneNo(e.target.value)}

                    placeholder="Enter Valid Phone Number"

                    size="10"/>

                </div>



                <button className="login-button mt-4">

                  <span style={{color:"black"}}>Continue</span>

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </>

  );

};



export default Checkout;


