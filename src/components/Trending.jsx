import React from "react";
import "../Styling/Trending.css";
import { Link } from "react-router-dom";
import bgImage1 from "../assets/Bg-Image5.jpg";
import bgImage2 from "../assets/Bg-Image4.jpg";
import bgImage3 from "../assets/Bg-Image9.jpg";
import bgImage4 from "../assets/Bg-Image6.jpg";
import bgImage5 from "../assets/Bg-Image11.jpg";
import bgImage6 from "../assets/Bg-Image12.jpg";

const Options = [
  {
    img: bgImage1,
    link: "/products",
    text: "Latest Fashion Collection",
    subText: "Buy Summer Trendy Clothing from Popular Brands",
  },
  {
    img: bgImage3,
    link: "/products",
    text: "Latest Mobiles & Laptops",
    subText: "Buy Your Favorite Mobiles & Laptops from Top Brands",
  },
  {
    img: bgImage4,
    link: "/products",
    text: "Latest Books & Novels",
    subText: "Buy Books & Novels from Popular Authors",
  },
  {
    img: bgImage5,
    link: "/products",
    text: "Latest Electronics & Home Appliances",
    subText: "Buy High-end Electronics & Home Appliances ",
  },
  {
    img: bgImage2,
    link: "/products",
    text: "Latest Furniture & Decor",
    subText: "New Home Decor Products",
  },
  {
    img: bgImage6,
    link: "/products",
    text: "Latest Beauty & Health Products",
    subText: "Buy Popular Beauty & Health Products Kits",
  },
];

const Trending = () => {
  return (
    <>
      <div>
        <div className="container trending-container text-center mt-5">
          {Options.map((item, i) => (
            <div className="row" key={i}>
              <Link to={item.link} className="trending-card">
                <img src={item.img} className="trending-card__img" alt="" />
                <span className="trending-card__footer">
                  <span className="trending-text">{item.text}</span>
                  <span className="trending-sub-text">{item.subText}</span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
