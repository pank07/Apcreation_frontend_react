import React, { useEffect, useState } from "react";
import "../Styling/Productdetails.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../UrlHelper/baseUrl";
import { Rating } from "@mui/material";
import CartIcon from "../assets/cart.png";
import Carousel from "react-material-ui-carousel";
import ProfileIcon from "../assets/profile.png";
import { useDispatch } from "react-redux";
import { AddToCart } from "../Redux/Actions/cartActions";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Starred from "../assets/starred.png";
import { createNewReview } from "../Redux/Actions/productActions";
import Typography from "@mui/material/Typography";
import Loader from "../components/Loader";



const ProductDetails = () => {
  const [itemDetails, setItemDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [reviewRates, setReviewRates] = useState(0);
  const [reviewDesc, setReviewDesc] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/product/${id}`);
       
        
        const data = response.data;

        if (data.success) {
          setItemDetails(data.getProduct);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const options = {
    size: "small",
    value: itemDetails.productRatings,
    readOnly: true,
    precision: 0.5,
  };

  const optionsTwo = {
    size: "medium",
    value: itemDetails.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (itemDetails.Stock <= quantity) {
      toast.warning("Product Reaches its Maximum Limit!! 🫡");
      return;
    }
    const increment = quantity + 1;
    setQuantity(increment);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const decrement = quantity - 1;
    setQuantity(decrement);
  };

  const AddToCartHandler = () => {
    dispatch(AddToCart(id, quantity));
    toast.success(`${itemDetails.name} Added to Cart Successfully 🥳`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("Ratings", reviewRates);
    myForm.set("Description", reviewDesc);
    myForm.set("ProductID", id);
    dispatch(createNewReview(myForm));
    setOpen(false);
  };

  const totalCost = itemDetails.price * quantity;

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };


  //fetch all products 
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchpro() {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        setProduct(response.data.products);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchpro();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-6 mt-3">
                <div className="card border-0 rounded-4 ">
                  <div className="card-body">
                    <Carousel className="product-carousel-container1">
                      <img
                        src={itemDetails?.images?.[selectedImageIndex]} style={{
                          width: '100%'
                        }}
                        alt="imageData"
                        className=" rounded-4"
                      />
                    </Carousel>

                  </div>
                </div>

              </div>
              <div className="col-md-6 mt-3">
                <div className="card border-0">
                  <div className="card-body">
                    <div className="rounded">
                      <div>
                        <h1
                          className="p-0 m-2 mx-3 text-dark"
                          style={{ fontSize: "20px", fontWeight: "700" }}
                        >
                           {itemDetails.category?.name}
                        </h1>
                        <div className="ratings-Box">
                          <span className="p-0 m-0">
                            <Rating {...options} style={{ color: "yellow" }} />
                          </span>
                          <label className="ratings-text">
                            <small style={{ color: "dark" }}>
                              ({itemDetails?.reviews?.length || 0})
                            </small>
                          </label>
                        </div>
                      </div>
                      <h2
                        className="p-0 m-0 mx-2 text-dark"
                        style={{
                          fontSize: "25px",
                          fontWeight: "700",
                          borderColor: "#682536",
                        }}
                      >
                        {itemDetails.name}
                      </h2>
                      <h3
                        className="p-0 m-0 mx-2 mt-3 text-dark"
                        style={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        {itemDetails.description}
                      </h3>
                      <div className="m-0 p-0 mx-2 text-dark">
                        {/* Price and Stock Section */}
                        <div className="d-flex align-items-center mb-3">
                          <div className="d-flex me-4">
                            <span
                              className="text-dark"
                              style={{ fontSize: "15px", fontWeight: "700", marginRight: "8px" }}
                            >
                              Price:
                            </span>
                            <span
                              className="text-dark"
                              style={{ fontSize: "15px", fontWeight: "700" }}
                            >
                              ₹ {totalCost}
                            </span>
                          </div>
                          <div className="d-flex">
                            <span
                              className="text-dark"
                              style={{ fontSize: "15px", fontWeight: "700", marginRight: "8px" }}
                            >
                              Stock:
                            </span>
                            <span
                              className={
                                itemDetails.Stock < 1 ? "stock-out" : "stock-count"
                              }
                              style={{ fontSize: "15px", fontWeight: "700", color: "black" }}
                            >
                              {itemDetails.Stock < 1 ? "Out of Stock" : itemDetails.Stock}
                            </span>
                          </div>
                        </div>

                        {/* Color Section */}
                        <ul className="d-flex align-items-center">
                          <li
                            className="text-dark"
                            style={{ fontSize: "15px", fontWeight: "700", marginRight: "8px" }}
                          >
                            Color:
                          </li>
                          {itemDetails?.images?.slice(0, 2).map((data, i) => (
                            <div key={i}>
                              <img
                                src={data}
                                alt="imageData"
                                className="mt-3 mx-4"
                                style={{
                                  height: "70px",
                                  width: "70px",
                                  cursor: "pointer",
                                  borderRadius: "10px",
                                }}
                                onClick={() => handleImageClick(i)}
                              />
                            </div>
                          ))}
                        </ul>

                        {/* Quantity Section */}
                        <ul>
                          <li
                            className="text-dark"
                            style={{ fontSize: "15px", fontWeight: "700" }}
                          >
                            Quantity
                          </li>
                          <li>
                            <div className="cart-quantity">
                              <button
                                className="quantity-btn decrease"
                                onClick={decreaseQuantity}
                              >
                                -
                              </button>
                              <input
                                className="quantity-input"
                                type="number"
                                value={quantity}
                                readOnly
                              />
                              <button
                                className="quantity-btn increase"
                                onClick={increaseQuantity}
                              >
                                +
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex">
                        <button
                          className="btn btn-info mb-3 text-light rounded-2 mt-4 w-100 border-0"
                          style={{
                            background: "rgba(224, 94, 28, 0.64)",
                            borderRadius: "10.4016px",
                          }}
                          onClick={AddToCartHandler}
                        >
                          <i
                            className="fa fa-cart-shopping me-2"
                            style={{
                              color: "black",
                              fontSize: "20px",
                              marginRight: "8px",
                              cursor: "pointer",
                            }}
                          ></i>
                          <span style={{ fontWeight: "bold", color: "#000" }}>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <h2 className="product-reviews">
              <span style={{ color: "black" }}> User Reviews</span>
              <Button
                variant="text"
                style={{ color: "black" }}
                size="small"
                onClick={handleClickOpen}
              >
                <img src={Starred} alt="icon" className="drawer-icon" /> Rate &
                Review Product
              </Button>
            </h2>
          </div>

          <div className="container-fluid mt-4 mb-4">
            <h4 className="fw-bold ms-4" style={{ fontStyle: "italic" }}>
              Related Products
            </h4>
            <div className="row g-4">
              {product.slice(0, 15).map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={product._id}>
                  <div
                    className="card text-center shadow-sm h-100"
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                      backgroundColor: "#fff",
                    }}
                  >
                    {/* Circular Image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="img-fluid"
                      style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "10px auto",
                      }}
                    />
                    <div className="card-body">
                      {/* Product Name */}
                      <h5
                        className="card-title text-truncate"
                        style={{ fontSize: "1rem", fontWeight: "600" }}
                      >
                        {product.name}
                      </h5>
                      {/* Product Price */}
                      <p
                        className="fw-bold mb-2"
                        style={{ fontSize: "1rem", color: "black" }}
                      >
                        ₹{product.price.toFixed(2)}
                      </p>
                      {/* Add to Cart Button */}
                      <button
                        className="w-100 rounded-4"
                        onClick={() => navigate(`/product/${product._id}`)}
                        style={{
                          color: "black",
                          backgroundColor: "rgba(224, 94, 28, 0.64)",
                          border: "none",
                          padding: "10px",
                          fontWeight: "600",
                        }}
                      >
                        <i className="fa fa-cart-shopping me-2"></i>Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* product3 start*/}
          <div className="container-fluid mb-4 my_shadow" style={{ backgroundColor: "#E3E6E6" }}>
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0">
                  <div className="card-body">
                    <h4 className="card-title p-3" style={{ fontWeight: 600 }}>
                      HAWAN SAMAGRI
                    </h4>
                    {/* First Row */}
                    <div className="row g-4">
                      {product &&
                        product
                          .slice(5, 11)
                          .filter((item) => item.category === "HAWAN SAMAGRI")
                          .map((product) => (
                            <div className="col-lg-2 col-md-3 col-sm-6 col-12" key={product._id}>
                              <div
                                className="card border-1 text-center shadow-sm"
                                style={{
                                  height: "320px",
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                }}
                              >
                                {/* Circular Image */}
                                <img
                                  onClick={() => navigate(`/product/${product._id}`)}
                                  src={product.images && product.images[0]}
                                  alt={product.name || "Product Image"}
                                  style={{
                                    height: "150px",
                                    width: "150px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    margin: "10px auto",
                                  }}
                                />
                                <div className="card-body">
                                  <h6
                                    className="mt-2 mb-2"
                                    style={{
                                      fontSize: "1rem",
                                      fontWeight: 500,
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {product.name}
                                  </h6>
                                  <p
                                    className="mb-2"
                                    style={{
                                      fontWeight: 700,
                                      color: "black",
                                      fontSize: "1rem",
                                    }}
                                  >
                                    ₹{product.price}
                                  </p>
                                  <button
                                    className="w-100 rounded-4 mt-1 mb-1"
                                    style={{
                                      color: "black",
                                      backgroundColor: "rgba(224, 94, 28, 0.64)",
                                      border: "none",
                                      padding: "10px",
                                      fontWeight: 600,
                                    }}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                  >
                                    <i className="fa fa-cart-shopping me-2"></i>Add
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>

                    {/* Second Row */}
                    <div className="row g-4">
                      {product &&
                        product.slice(12, 18).map((product) => (
                          <div className="col-lg-2 col-md-3 col-sm-6 col-12" key={product._id}>
                            <div
                              className="card border-1 text-center shadow-sm"
                              style={{
                                height: "320px",
                                borderRadius: "10px",
                                overflow: "hidden",
                              }}
                            >
                              {/* Circular Image */}
                              <img
                                src={product.images[0]}
                                alt={product.name || "Product Image"}
                                onClick={() => navigate(`/product/${product._id}`)}
                                style={{
                                  height: "150px",
                                  width: "150px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                  margin: "10px auto",
                                }}
                              />
                              <div className="card-body">
                                <h6
                                  className="mt-2 mb-2"
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {product.name}
                                </h6>
                                <p
                                  className="mb-2"
                                  style={{
                                    fontWeight: 700,
                                    color: "black",
                                    fontSize: "1rem",
                                  }}
                                >
                                  ₹{product.price}
                                </p>
                                <button
                                  className="w-100 rounded-4 mt-1 mb-1"
                                  style={{
                                    color: "black",
                                    backgroundColor: "rgba(224, 94, 28, 0.64)",
                                    border: "none",
                                    padding: "10px",
                                    fontWeight: 600,
                                  }}
                                  onClick={() => navigate(`/product/${product._id}`)}
                                >
                                  <i className="fa fa-cart-shopping me-2"></i>Add
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* product3 end*/}
        </>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        color="dark"
        fullWidth
      >
        <DialogTitle style={{ color: "black" }} id="responsive-dialog-title">
          <Typography style={{ color: "black" }}>Rate The Product</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="d-flex flex-column pb-3 w-108">
              <label className="login-text" style={{ color: "black" }}>
                Product Ratings
              </label>
              <Rating
                value={reviewRates}
                onChange={(e) => setReviewRates(e.target.value)}
                size="large"
              />
            </div>
          </DialogContentText>
          <DialogContentText>
            <div className="d-flex flex-column pb-3 w-108">
              <label className="login-text" style={{ color: "black" }}>
                Product Description
              </label>
              <textarea
                required
                rows={5}
                value={reviewDesc}
                onChange={(e) => setReviewDesc(e.target.value)}
                placeholder="Describe Your Product Experience"
                className="login-input"
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button onClick={reviewSubmitHandler} autoFocus>
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>

      <div className="review-container" style={{ color: "black" }}>
        {itemDetails?.reviews?.map((review, i) => (
          <div className="review-box" key={i}>
            <img
              src={ProfileIcon}
              className="reviewer-icon"
              alt="reviewer-profile"
            />
            <h6 className="reviewer-name" style={{ color: "black" }}>
              {review.name}
            </h6>
            <div className="ratings-Box">
              <Rating {...optionsTwo} style={{ color: "black" }} />
            </div>
            <small className="reviewer-comment" style={{ color: "black" }}>
              {review.comment}
            </small>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetails