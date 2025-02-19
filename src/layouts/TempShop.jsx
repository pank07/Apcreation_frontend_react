import React from "react";
import { Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../Styling/tempShop.css";
import Favorite from "../assets/heart.png";
import CartIcon from "../assets/cart.png";
import { useDispatch } from "react-redux";
import { AddToCart } from "../Redux/Actions/cartActions";
import { toast } from "react-toastify";

const TempShop = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = {
    size: "small",
    value: products.productRatings || 0,
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = () => {
    dispatch(AddToCart(products._id, 1));
    navigate("/cart");
    toast.success(`${products.name} Added to Cart Successfully 🥳`);
  };

  return (
    <>
      <Link to={`/product/${products._id}`}>
        <div className="product-card">
          <div className="badge">Hot</div>
          <div className="product-tumb">
            <img src={products.images[0]} alt={products.name} className="image-backdrop"/>
          </div>
          <div className="product-details">
            <span className="product-category">{products.name}</span>
            <div className="product-bottom-details">
              <div className="product-price">
                <label>₹{products.price}</label>
                <div className="product-rating">
                  <Rating {...options} />
                  <small>({products.reviews.length}) </small>
                </div>
              </div>
              <div className="product-links">
                <button
                  className="add_to_cart_button"
                  onClick={addToCartHandler}
                >
                  <img
                    src={CartIcon}
                    alt="cartIcon"
                    className="card-cart-icon"
                  />
                  <span>Add to Cart</span>
                </button>
                <button>
                  <img
                    src={Favorite}
                    alt="favorite-icon"
                    className="favorite-icon"
                  ></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TempShop;
