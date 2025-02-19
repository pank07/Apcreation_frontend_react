import React,{useState,useEffect} from "react";
import "../Styling/Cart.css";
import DeleteIcon from "../assets/delete.png";
import HeartIcon from "../assets/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveFromCart } from "../Redux/Actions/cartActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
// import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cartData);
  const { isAuthenticated } = useSelector((state) => state.userData);

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock <= quantity) {
      toast.warning("Product Reaches its Maximum Limit!! 🫡");
      return;
    }
    dispatch(AddToCart(id, newQuantity));
  };
  const [shippingCharges, setShippingCharges] = useState(0);

  useEffect(() => {
    const totalWeight = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.weight,
      0
    );
  
    const charges = totalWeight <= 1 ? 100 : Math.floor(totalWeight) * 60;
    
    localStorage.setItem("shippingCharges", charges);
    setShippingCharges(charges);
  }, [cartItems]);

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(AddToCart(id, newQuantity));
  };

  const deleteItemFromCart = (id) => {
    dispatch(RemoveFromCart(id));
  };
  console.log("cartItems", cartItems);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="h-100 ">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-5">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3 cart-heading-container">
                    <h5 className="mb-0 cart-heading">YOUR CART</h5>
                  </div>

                  {cartItems.length > 0 ? (
                    cartItems?.map((item) => (
                      <div className="card-body" key={item.productId}>
                        <div className="row">
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
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
                          </div>

                          <div
                            className="col-lg-5 co
                          l-md-6 mb-4 mb-lg-0 cart-details"
                          >
                            <p>
                              <strong className="cart-category">
                                {item.category.name}
                              </strong>
                            </p>
                            <p
                              className="cart-product-name"
                              style={{ color: "black" }}
                            >
                              {item.name}
                            </p>
                            <p className="cart-product-name">
                              <strong>Price: </strong>
                              <strong> ₹ {item.price}</strong>
                            </p>

                            <button
                              type="button"
                              className="cart-function-button"
                              data-mdb-toggle="tooltip"
                              // data-tooltip="Remove item"
                              onClick={() => deleteItemFromCart(item.productId)}
                            >
                              <img
                                src={DeleteIcon}
                                alt="delete"
                                className="cart-function-image"
                              />
                            </button>
                            <button
                              type="button"
                              className=" cart-function-button"
                              data-mdb-toggle="tooltip"
                              // data-tooltip="Move to the wish list"
                            >
                              <img
                                src={HeartIcon}
                                alt="Favorite"
                                className="cart-function-image"
                              />
                            </button>
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 cart-details">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <strong style={{ marginTop: ".5rem" }}>
                                Quantity &nbsp;
                              </strong>
                              <div className="cart-quantity">
                                <button
                                  className="quantity-btn decrease"
                                  onClick={() =>
                                    decreaseQuantity(
                                      item.productId,
                                      item.quantity
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  className="quantity-input"
                                  type="number"
                                  value={item.quantity}
                                  readOnly
                                />
                                <button
                                  className="quantity-btn increase"
                                  onClick={() =>
                                    increaseQuantity(
                                      item.productId,
                                      item.quantity,
                                      item.stock
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <p className="text-start text-md-start">
                              <strong>Stock: </strong>
                              <strong>
                                {item.quantity >= 1
                                  ? item.stock
                                  : "Out of Stock"}
                              </strong>
                            </p>
                            <p className="text-start text-md-start">
                              <strong>Weight: </strong>
                              <strong>{item.weight}</strong>
                            </p>
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
                    <h5 className="mb-0 summary-heading">PRICE SUMMARY</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group pricing-container">
                      <li className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        <strong>Products Price</strong>
                        <strong>
                          ₹{" "}
                          {cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )}
                        </strong>
                      </li>

                      {/* Total Weight */}
                      <li className="total-amount-container d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong style={{ color: "black" }}>
                            Total Weight
                          </strong>
                        </div>
                        <span>
                          <strong>
                            {cartItems
                              .reduce(
                                (acc, item) =>
                                  acc + item.quantity * item.weight,
                                0
                              )
                              .toFixed(2)}{" "}
                            kg
                          </strong>
                        </span>
                      </li>

                      {/* Shipping Charges */}
                      <li className="d-flex justify-content-between align-items-center px-0">
                        <strong>Shipping Charges</strong>
                        <strong style={{ color: "black" }}>
                          ₹ {shippingCharges}
                        </strong>
                      </li>

                      <hr className="my-2 mid-border" />

                      {/* Total Price Including Shipping */}
                      <li className="total-amount-container d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong style={{ color: "black" }}>
                            Total Price
                          </strong>
                        </div>
                        <span>
                          <strong>
                            ₹
                            {(
                              cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0
                              ) + shippingCharges
                            ).toFixed(2)}
                          </strong>
                        </span>
                      </li>
                    </ul>
                    {cartItems.length > 0 ? (
                      <Link to={isAuthenticated ? "/cart/shipping" : "/login"}>
                        <button
                          type="button"
                          className="login-button mt-4"
                          style={{
                            color: "black",
                            backgroundColor: "rgba(234, 115, 64, 0.83)",
                          }}
                        >
                          Go to checkout
                        </button>
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="login-button mt-4"
                          style={{
                            color: "black",
                            backgroundColor: "rgba(234, 115, 64, 0.83)",
                          }}
                          onClick={() =>
                            toast.error("Add Products to Continue 🤷‍♂️")
                          }
                        >
                          Go to checkout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
