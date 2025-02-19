import React from "react";
import headphones from "../assets/headphones.png";
import payment from "../assets/payment.png";
import delivery from "../assets/delivery.png";
import search from "../assets/search.png";

const Features = () => {
  const data = [
    {
      id: 1,
      img: delivery,
      heading: "Free Shipping",
      about: "For All Order",
    },
    {
      id: 2,
      img: payment,
      heading: "Money Back Guarantee",
      about: "Within 24 hours",
    },
    {
      id: 3,
      img: headphones,
      heading: "Online Support 24/7",
      about: "Dedicated Support",
    },
    {
      id: 4,
      img: search,
      heading: "Payment Secure",
      about: "100% secure payment",
    },
  ];
  return (
    <>
      <div className="container text-center features mt-5" style={{ backgroundColor: "E3E6E6",position:"relative", top:"-50px"  }}>
        <div className="row">
          {data.map((data) => (
            <div className="mt-5 col-lg-3 col-md-4 col-sm-6" key={data.id}>
              <img src={data.img} alt={data.img} />
              <p className="mt-4">{data.heading}</p>
              <b>{data.about}</b>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;
