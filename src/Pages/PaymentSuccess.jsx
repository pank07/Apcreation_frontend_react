import React from "react";
import success from "../assets/confirmStep.png";
import "../Styling/Cart.css";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <>
      <section className="h-100">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-5 ">
            <div className="col-md-8 ">
              <div className="card mb-4">
                <div className="card-body payment-success-container">
                  <div>
                    <img
                      src="https://3.bp.blogspot.com/-fm0Cg5WFsy8/WF6YWJyUvuI/AAAAAAAFof0/nRsq3JLfwNwPqZA20fPDFAH8aOUFLH7nACLcB/s1600/AW356234_04.gif"
                      alt=""
                      className="payment-success-image1"
                    />
                  </div>
                  <div className="row ">
                    <p className="cart-product-name ">
                      <strong>
                        Congratulations!! Your Order has been Placed
                        Successfully
                      </strong>
                      <img
                        src={success}
                        alt=""
                        className="payment-success-image2"
                      />
                    </p>
                  </div>
                  <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                    <Link to={"/all-orders"}>
                      <button className="login-button">
                        <span>See Orders</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentSuccess;
