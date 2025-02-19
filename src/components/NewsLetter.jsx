import React from "react";
import { Col, Row } from "react-bootstrap";

const NewsLetter = () => {
  return (
  <>
    {/* Newsletter Start */}
    <div
    className="container-fluid appointment my-5 py-5 wow fadeIn"
    data-wow-delay="0.1s"
    style={{ background: "#F58A69" }}
  >
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-8 offset-md-2 wow fadeIn" data-wow-delay="0.3s">
          <h1  className="display-6 text-black text-center mb-5">
            Subscribe to Our Newsletter
          </h1>
          <h4 className="text-black mb-5 text-center">
            Stay updated with our latest products and promotions.
          </h4>
          <div className=" rounded p-3" style={{ background: "#F58A69"}}>
            <form action="#" method="post" className="newsletter-form">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  aria-describedby="button-addon2"
                />
                <button 
                  className="btn"
                  style={{
                    backgroundColor: "rgb(255 86 0 / 78%)",
                    color: "white"
                  }}
                  type="submit"
                  id="button-addon2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Newsletter End */}
  </>
  );
};

export default NewsLetter;