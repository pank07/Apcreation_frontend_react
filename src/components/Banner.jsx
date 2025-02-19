import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import { useDispatch } from "react-redux";
import Sidenav from "./Sidenav";
import { toast } from "react-toastify";
import { AddToCart } from "../Redux/Actions/cartActions";
import { baseUrl } from "../UrlHelper/baseUrl";
import "../Styling/Banner.css";
import image1 from "../assets/1-6.jpg";
import image2 from "../assets/2-3.jpg";
import image3 from "../assets/pebblely2.jpeg";
import "../Styling/pappu.css";
const Banner = () => {
  const { loading } = useSelector((state) => state.allUsers);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [images, setImages] = useState([]);
  // const [category, setCategory] = useState([]);
  const [itemDetails, setItemDetails] = useState({});

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  // fetch all banners
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get(`${baseUrl}/banner`);
        console.log(response.data);

        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${baseUrl}/allcategory`);

        if (Array.isArray(response.data.categories)) {
          // Filter out invalid categories
          const formattedCategories = response.data.categories
            .filter((item) => item.category && item.category !== "undefined") // Remove undefined categories
            .map((item, index) => ({
              id: index, // Using index as key
              category: item.category,
              images:
                item.images && item.images.length > 0
                  ? item.images
                  : ["/path/to/placeholder.jpg"], // Default image
            }));

          setCategories(formattedCategories);
        } else {
          console.error(
            "Fetched data is not in expected format:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    fetchCategories();
  }, [baseUrl]);

  const handleRedirect = (category) => {
    // Redirect to the product's detailed page using the product ID (you can change the URL structure as needed)
    // navigate(`/product/${productId}`);
    // navigate(`/Categories/${category}`);
    // navigate(`/Categories/${encodeURIComponent(category)}`);
    navigate(`/Categories?category=${encodeURIComponent(category)}`);
  };
  const handleRedirectphoto = (category) => {
    // Redirect to the product's detailed page using the product ID (you can change the URL structure as needed)
    // navigate(`/product/${productId}`);
    // navigate(`/Categories/${category}`);
    // navigate(`/Categories/${encodeURIComponent(category)}`);
    navigate(`/photos?category=${encodeURIComponent(category)}`);
  };
  const handleAddToCart = (productId) => {
    // Your logic to add the product to the cart
    console.log(`Product ${productId} added to cart!`);
  };

  //fetch all products
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchpro() {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        // console.log(response)
        setProduct(response.data.products);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchpro();
  }, []);

  const increaseQuantity = () => {
    if (itemDetails.Stock <= quantity) {
      toast.warning("Product Reaches its Maximum Limit!! 🫡");
      return;
    }
    const increment = quantity + 1;
    setQuantity(increment);
  };

  return (
    <>
      <Sidenav />
      {/* carousle-start */}
      <div className="container-fluid mb-4">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "500px",
                    overflow: "hidden",
                  }}
                >
                  {/* Image */}
                  <img
                    src={image.image1}
                    alt={`slider-${index + 1}`}
                    className="d-block w-100"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // Ensures full coverage
                      filter: "brightness(1) contrast(1.1)", // Enhances clarity
                    }}
                  />

                  {/* Optional Overlay to enhance text readability */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.3)", // Slight dark overlay
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* carousle-end */}

      {/* product-1-start */}
      {/* <div  className="container-fluid mb-4"  style={{ backgroundColor: "E3E6E6"}}  >
          <div className="row mt-4">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-2 my_shadow">
              <div
                className="card border-0"
                style={{ minHeight: 400, backgroundColor: "white" }}
              >
                <h5 className="ms-2 mt-3 set_text" style={{ fontWeight: 600 }}>
                  {" "}
                  Discover Our Most Popular Models
                </h5>
                <div className="row">
                  {product?.slice(0, 4).map((item, index) => (
                    <>
                      <div className="col-lg-6 col-md-6  col-sm-6 col-6">
                        <div className="p-3" key={item._id} style={{ height: 160 }}>
                         <Link to={`/product/${item._id}`}> <img
                            src={item.images[0]}
                            style={{ width: "100%", height: "100%" }}
                            className="card-img-top "
                            alt="..."
                          /></Link>
                        </div>
                        <p className="ms-2 p-0 m-0 set_text">{item.name}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="card-body">
                  <p
                    className="card-text set_text"
                    style={{ fontWeight: 600, color: "rgb(34, 59, 51)" }}
                  >
                    See More{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-2 my_shadow">
              <div
                className="card border-0"
                style={{ minHeight: 400, backgroundColor: "white" }}
              >
                <h5 className="ms-2 mt-3 set_text" style={{ fontWeight: 600 }}>
                  {" "}
                  Check Out the Latest Printers on the Market!
                </h5>
                <div className="row">
                  {product?.slice(5, 9).map((item, index) => (
                    <>
                      <div className="col-lg-6 col-md-6  col-sm-6 col-6">
                      <div className="p-3" key={item._id} style={{ height: 160 }}>
                         <Link to={`/product/${item._id}`}> <img
                            src={item.images[0]}
                            style={{ width: "100%", height: "100%" }}
                            className="card-img-top "
                            alt="..."
                          /></Link>
                        </div>
                        <p className="ms-2 p-0 m-0 set_text">{item.name}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="card-body">
                  <p
                    className="card-text set_text"
                    style={{ fontWeight: 600, color: "rgb(34, 59, 51)" }}
                  >
                    See More{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-2 my_shadow">
              <div
                className="card border-0"
                style={{ minHeight: 400, backgroundColor: "white" }}
              >
                <h5 className="ms-2 mt-3 set_text" style={{ fontWeight: 600 }}>
                  {" "}
                  Explore Our Top-Rated Printers Today!
                </h5>
                <div className="row">
                  {product?.slice(10, 14).map((item, index) => (
                    <>
                      <div className="col-lg-6 col-md-6  col-sm-6 col-6">
                      <div className="p-3" key={item._id} style={{ height: 160 }}>
                         <Link to={`/product/${item._id}`}> <img
                            src={item.images[0]}
                            style={{ width: "100%", height: "100%" }}
                            className="card-img-top "
                            alt="..."
                          /></Link>
                        </div>
                        <p className="ms-2 p-0 m-0 set_text">{item.name}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="card-body">
                  <p
                    className="card-text set_text"
                    style={{ fontWeight: 600, color: "rgb(34, 59, 51)" }}
                  >
                    See More{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-2 my_shadow">
              <div
                className="card border-0"
                style={{ minHeight: 400, backgroundColor: "white" }}
              >
                <h5 className="ms-2 mt-3 set_text" style={{ fontWeight: 600 }}>
                  {" "}
                  Stay Ahead with Our Latest Printer Arrivals!
                </h5>
                <div className="row">
                  {product?.slice(15,19).map((item, index) => (
                    <>
                      <div className="col-lg-6 col-md-6  col-sm-6 col-6">
                      <div className="p-3" key={item._id} style={{ height: 160 }}>
                         <Link to={`/product/${item._id}`}> <img
                            src={item.images[0]}
                            style={{ width: "100%", height: "100%" }}
                            className="card-img-top "
                            alt="..."
                          /></Link>
                        </div>
                        <p className="ms-2 p-0 m-0 set_text">{item.name}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="card-body">
                  <p
                    className="card-text set_text"
                    style={{ fontWeight: 600, color: "rgb(34, 59, 51)" }}
                  >
                    See More{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {/* product-1-end */}

      {/* product-2-start */}
      <div className="container-fluid">
        {/* Title Section */}
        <div className="row mb-4">
          <div className="col-12">
            <p className="text-center page-title fs-2">
              <Link className="text-decoration-none text-dark">
                Top Selling Products/Categories
              </Link>
            </p>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="row justify-content-center">
          {categories.length > 0 ? (
            categories.slice(0, 12).map((item) => (
              <div
                className="col-4 col-sm-4 col-md-3 col-lg-2 mb-4 text-center"
                key={item.id} // Use id as key
              >
                <div className="category-container position-relative">
                  {/* Image Section */}
                  <div
                    className="category-image"
                    onClick={() => handleRedirect(item.category)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Show the first image or placeholder */}
                    <img
                      src={item.images[0]}
                      alt={item.category || "Unknown Category"}
                      className="img-fluid rounded-circle"
                    />
                  </div>

                  {/* Name Section */}
                  <div className="category-name mt-2">
                    <p
                      className="text-truncate"
                      onClick={() => handleRedirect(item.category)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.category || "Unknown Category"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No categories available</p>
            </div>
          )}
        </div>
      </div>
      {/* <div className="container-fluid mb-4"style={{  backgroundColor: "E3E6E6"}}>
          <div className="row mt-4">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-2 my_shadow">
              <div
                className="card border-0"
                style={{ minHeight: 400, backgroundColor: "white" }}
              >
                <h5 className="ms-2 mt-3 set_text" style={{ fontWeight: 600 }}>
                  {" "}
                  Shop Our Best-Selling Printers!
                </h5>
                <div className="row">
                  {product?.slice(20,24).map((item, index) => (
                    <>
                      <div className="col-lg-6 col-md-6  col-sm-6 col-6">
                      <div className="p-3" key={item._id} style={{ height: 160 }}>
                         <Link to={`/product/${item._id}`}> <img
                            src={item.images[0]}
                            style={{ width: "100%", height: "100%" }}
                            className="card-img-top "
                            alt="..."
                          /></Link>
                        </div>
                        <p className="ms-2 p-0 m-0 set_text">{item.name}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="card-body">
                  <p
                    className="card-text set_text"
                    style={{ fontWeight: 600, color: "rgb(34, 59, 51)" }}
                  >
                    See More{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-2 my_shadow">
              <div
                className="card border-0"
                style={{ minHeight: 400, backgroundColor: "white" }}
              >
                <h5 className="ms-2 mt-3 set_text" style={{ fontWeight: 600 }}>
                  {" "}
                  Grab Our Best Printer Deals!
                </h5>
                <div className="row">
                  {product?.slice(24,28).map((item, index) => (
                    <>
                      <div className="col-lg-6 col-md-6  col-sm-6 col-6">
                      <div className="p-3" key={item._id} style={{ height: 160 }}>
                         <Link to={`/product/${item._id}`}> <img
                            src={item.images[0]}
                            style={{ width: "100%", height: "100%" }}
                            className="card-img-top "
                            alt="..."
                          /></Link>
                        </div>
                        <p className="ms-2 p-0 m-0 set_text">{item.name}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="card-body">
                  <p
                    className="card-text set_text"
                    style={{ fontWeight: 600, color: "rgb(34, 59, 51)" }}
                  >
                    See More{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-2 my_shadow">
              <div
                className="card border-0"
                style={{ minHeight: 400, backgroundColor: "white" }}
              >
                <h5 className="ms-2 mt-3 set_text" style={{ fontWeight: 600 }}>
                  {" "}
                  Printers Loved by Our Users! </h5>
                <div className="row">
                  {product?.slice(12,16).map((item, index) => (
                    <>
                      <div className="col-lg-6 col-md-6  col-sm-6 col-6">
                      <div className="p-3" key={item._id} style={{ height: 160 }}>
                         <Link to={`/product/${item._id}`}> <img
                            src={item.images[0]}
                            style={{ width: "100%", height: "100%" }}
                            className="card-img-top "
                            alt="..."
                          /></Link>
                        </div>
                        <p className="ms-2 p-0 m-0 set_text">{item.name}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="card-body">
                  <p
                    className="card-text set_text"
                    style={{ fontWeight: 600, color: "rgb(34, 59, 51)" }}
                  >
                    See More{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-2 my_shadow">
              <div
                className="card border-0"
                style={{ minHeight: 400, backgroundColor: "white" }}
              >
                <h5 className="ms-2 mt-3 set_text" style={{ fontWeight: 600 }}>
                  {" "}
                  Save Big on Select Printers!
                </h5>
                <div className="row">
                  {product?.slice(0,4).map((item, index) => (
                    <>
                      <div className="col-lg-6 col-md-6  col-sm-6 col-6">
                      <div className="p-3" key={item._id} style={{ height: 160 }}>
                         <Link to={`/product/${item._id}`}> <img
                            src={item.images[0]}
                            style={{ width: "100%", height: "100%" }}
                            className="card-img-top "
                            alt="..."
                          /></Link>
                        </div>
                        <p className="ms-2 p-0 m-0 set_text">{item.name}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="card-body">
                  <p
                    className="card-text set_text"
                    style={{ fontWeight: 600, color: "rgb(34, 59, 51)" }}
                  >
                    See More{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {/* product-2-end */}

      {/* codepen-1-start */}
      <div className="container-fluid my_shadow">
        {/* Fixed Header */}
        <div
          className="row"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backgroundImage: "url('your-background-image-path.png')",
            backgroundSize: "cover",
            backgroundColor: "rgb(227, 119, 64)",
            textAlign: "center",
          }}
        >
          <div className="col-md-12">
            <h4
              className=" white-text "
              style={{
                fontFamily: "'Kalam', cursive",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#fff !important", // Ensure text color is white
                textShadow: "2px 2px 4px #000",
              }}
            >
              || जय श्री माताजी ||
            </h4>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          className="scrollable-content"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          {/* Add your content here that will be scrollable */}
          <div className="content-section">
            {/* <p>Your scrollable content goes here. This content will scroll while the header remains fixed at the top.</p> */}
            {/* You can add more content below */}
          </div>
        </div>
      </div>

      {/* <div className="container my-5">
        <h1 className="text-center mb-4">|| जय श्री माताजी ||</h1>

      </div> */}

      {/* codepen-1-end */}
      <br />
      {/* product3 start*/}

      <div className="container-wrapper">
        <div className="flex-layout">
          {/* Left Panel */}
          <div className="left-panel">
            <h2 className="panel-title">Glass Printed Wooden Frames</h2>
            <div className="item-grid">
              {/* Card Item 1 */}
              <div className="card-item">
                <img
                  src={image1}
                  alt="Shri Mataji Charan"
                  className="item-image"
                />
                <p className="item-title">Shri Mataji Charan</p>
                <button
                  onClick={() => handleRedirectphoto("Shri Mataji Charan")}
                  className="action-button"
                  aria-label="Select options for Shri Mataji Charan"
                >
                  Select Options
                </button>
              </div>

              {/* Card Item 2 */}
              <div className="card-item">
                <img
                  src={image2}
                  alt="Shri Mata Ji Photos"
                  className="item-image"
                />
                <p className="item-title">Shri Mata Ji Photos</p>
                <button
                  onClick={() => handleRedirectphoto("Mata ji Photo")}
                  className="action-button"
                  aria-label="Select options for Shri Mata Ji Photos"
                >
                  Select Options
                </button>
              </div>
            </div>

            {/* Uncomment to enable View All button */}
            {/* <button className="all-button" aria-label="View all glass printed wooden frames">
        View All
      </button> */}
          </div>

          {/* Separator */}
          <div className="separator" aria-hidden="true"></div>

          {/* Right Panel */}
          <div className="right-panel">
            <h2 className="panel-title">Glass Shri Charan</h2>
            <div className="item-grid single-item-container">
              {/* Card Item 3 */}
              <div className="card-item">
                <img
                  src={image3}
                  alt="Glass Shri Charan"
                  className="item-image"
                />
                <p className="item-title">Glass Shri Charan</p>
                <button
                  onClick={() => handleRedirectphoto("glass shree charan")}
                  className="action-button"
                  aria-label="Select options for Glass Shri Charan"
                >
                  Select Options
                </button>
              </div>
            </div>

            {/* Uncomment to enable View All button */}
            {/* <button className="all-button" aria-label="View all glass Shri Charan options">
        View All
      </button> */}
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 shadow-lg p-3 rounded-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                className="fw-bold"
                style={{
                  fontFamily: "'Kalam',",
                  fontSize: "1.2rem",
                  color: "#000",
                }}
              >
                HAWAN SAMAGRI
              </h4>
              <button
                className="btn btn-sm text-white px-4 py-2"
                style={{
                  backgroundColor: "rgba(224, 94, 28, 0.8)",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => handleRedirect("hawan samagri")}
              >
                View All
              </button>
            </div>

            {/* Swiper for Mobile View */}
            <div className="d-block d-md-none">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={15}
                freeMode={true}
                pagination={{ clickable: true }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                {product &&
                  product
                    .filter(
                      (item) =>
                        item.category?.name?.toLowerCase() === "hawan samagri"
                    )
                    .map((product) => (
                      <SwiperSlide
                        key={product._id}
                        style={{ width: "200px", textAlign: "center" }}
                      >
                        <div className="card border-0 shadow-sm rounded-3 p-3">
                          <div className="d-flex justify-content-center">
                            <img
                              src={product.images?.[0] || "/default-image.jpg"}
                              alt={product.name}
                              className="rounded-circle mb-3"
                              style={{
                                height: "120px",
                                width: "120px",
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                navigate(`/product/${product._id}`)
                              }
                            />
                          </div>
                          <h6 className="text-truncate fw-semibold">
                            {product.name}
                          </h6>
                          <p className="fw-bold text-dark mb-2">
                            ₹{product.price}
                          </p>
                          <button
                            className="btn w-100 text-white"
                            style={{
                              backgroundColor: "rgba(224, 94, 28, 0.8)",
                              borderRadius: "8px",
                              fontWeight: 600,
                            }}
                            onClick={() => navigate(`/product/${product._id}`)}
                          >
                            <i className="fa fa-cart-shopping me-1"></i> Add
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>

            {/* Grid Layout for Larger Screens */}
            <div className="row g-4 d-none d-md-flex">
              {product &&
                product
                  .filter(
                    (item) =>
                      item.category?.name?.toLowerCase() === "hawan samagri"
                  )
                  .map((product) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6"
                      key={product._id}
                    >
                      <div className="card border-0 shadow-sm rounded-3 text-center p-3">
                        <div className="d-flex justify-content-center">
                          <img
                            src={product.images?.[0] || "/default-image.jpg"}
                            alt={product.name}
                            className="rounded-circle mb-3"
                            style={{
                              height: "150px",
                              width: "150px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            onClick={() => navigate(`/product/${product._id}`)}
                          />
                        </div>
                        <h6 className="text-truncate fw-semibold">
                          {product.name}
                        </h6>
                        <p className="fw-bold text-dark mb-2">
                          ₹{product.price}
                        </p>
                        <button
                          className="btn w-100 text-white"
                          style={{
                            backgroundColor: "rgba(224, 94, 28, 0.8)",
                            borderRadius: "8px",
                            fontWeight: 600,
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          <i className="fa fa-cart-shopping me-1"></i> Add
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 shadow-lg p-5 rounded-4"> */}
      {/* <div className="d-flex justify-content-between align-items-center ">
              <h4
                className="fw-bold"
                style={{
                  fontFamily: "'Kalam', cursive",
                  fontSize: "1.7rem",
                  color: "#000",
                }}
              >
               AASANS & CHUNRIS
              </h4>
              <button
                className="btn btn-sm text-white px-4 py-2"
                style={{
                  backgroundColor: "rgba(224, 94, 28, 0.8)",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => handleRedirect("aasans & chunris")}
              >
                View All
              </button>
            </div> */}

      {/* <div className="row g-4">
              {product &&
                product
                  .filter(
                    (item) =>
                      item.category.name?.toLowerCase() == "aasans & chunris"
                  )
                  .map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={product._id}>
                      <div className="card border-0 shadow-sm rounded-3 d-flex flex-column align-items-center text-center p-4">
                        <img
                          src={product.images?.[0] || "/default-image.jpg"}
                          alt={product.name}
                          className="rounded-circle mb-3"
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        />
                        <h6 className="text-truncate w-100 fw-semibold" style={{ fontSize: "1.1rem" }}>
                          {product.name}
                        </h6>
                        <p className="fw-bold text-dark mb-2" style={{ fontSize: "1.1rem" }}>
                          ₹{product.price}
                        </p>
                        <button
                          className="btn w-100 text-white"
                          style={{
                            backgroundColor: "rgba(224, 94, 28, 0.8)",
                            borderRadius: "8px",
                            fontWeight: 600,
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          <i className="fa fa-cart-shopping me-1"></i> Add
                        </button>
                      </div>
                    </div>
                  ))}
            </div> */}
      {/* </div> */}
      {/* //   </div> */}
      {/* // </div> */}
      <div className="row justify-content-center">
  <div className="col-md-12">
    <div className="card border-0 shadow-lg p-3 rounded-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4
          className="fw-bold"
          style={{
            fontFamily: "'Kalam', sans-serif",
            fontSize: "1.2rem",
            color: "#000",
          }}
        >
          TREATMENT ARTICLES
        </h4>
        <button
          className="btn btn-sm text-white px-4 py-2"
          style={{
            backgroundColor: "rgba(224, 94, 28, 0.8)",
            borderRadius: "8px",
            fontWeight: 600,
          }}
          onClick={() => handleRedirect("treatment articles")}
        >
          View All
        </button>
      </div>

      {/* Swiper for Mobile View */}
      <div className="d-block d-md-none">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {product &&
            product
              .filter(
                (item) =>
                  item.category?.name?.toLowerCase() === "treatment articles"
              )
              .slice(0, 6) // Limit to 6 items for scrolling
              .map((product) => (
                <SwiperSlide
                  key={product._id}
                  style={{ width: "200px", textAlign: "center" }}
                >
                  <div className="card border-0 shadow-sm rounded-3 p-3">
                    {/* Image Centered in Card */}
                    <div className="d-flex justify-content-center">
                      <img
                        src={product.images?.[0] || "/default-image.jpg"}
                        alt={product.name}
                        className="rounded-circle mb-3"
                        style={{
                          height: "120px",
                          width: "120px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/product/${product._id}`)}
                      />
                    </div>
                    <h6 className="text-truncate fw-semibold">{product.name}</h6>
                    <p className="fw-bold text-dark mb-2">₹{product.price}</p>
                    <button
                      className="btn w-100 text-white"
                      style={{
                        backgroundColor: "rgba(224, 94, 28, 0.8)",
                        borderRadius: "8px",
                        fontWeight: 600,
                      }}
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <i className="fa fa-cart-shopping me-1"></i> Add
                    </button>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      {/* Grid Layout for Larger Screens */}
      <div className="row g-4 d-none d-md-flex">
        {product &&
          product
            .filter(
              (item) =>
                item.category?.name?.toLowerCase() === "treatment articles"
            )
            .slice(0, 4) // Show 4 products in grid
            .map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={product._id}>
                <div className="card border-0 shadow-sm rounded-3 text-center p-3">
                  {/* Image Centered in Card */}
                  <div className="d-flex justify-content-center">
                    <img
                      src={product.images?.[0] || "/default-image.jpg"}
                      alt={product.name}
                      className="rounded-circle mb-3"
                      style={{
                        height: "150px",
                        width: "150px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/product/${product._id}`)}
                    />
                  </div>
                  <h6 className="text-truncate fw-semibold">{product.name}</h6>
                  <p className="fw-bold text-dark mb-2">₹{product.price}</p>
                  <button
                    className="btn w-100 text-white"
                    style={{
                      backgroundColor: "rgba(224, 94, 28, 0.8)",
                      borderRadius: "8px",
                      fontWeight: 600,
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <i className="fa fa-cart-shopping me-1"></i> Add
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  </div>
</div>


      <br />

      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 shadow-lg p-3 rounded-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                className="fw-bold"
                style={{
                  fontFamily: "'Kalam', sans-serif",
                  fontSize: "1.2rem",
                  color: "#000",
                }}
              >
                PENDANT LOCKET
              </h4>
              <button
                className="btn btn-sm text-white px-4 py-2"
                style={{
                  backgroundColor: "rgba(224, 94, 28, 0.8)",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => handleRedirect("pendants lockets")}
              >
                View All
              </button>
            </div>

            {/* Swiper for Mobile View */}
            <div className="d-block d-md-none">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={15}
                freeMode={true}
                pagination={{ clickable: true }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                {product &&
                  product
                    .filter(
                      (item) =>
                        item.category?.name?.toLowerCase() ===
                        "pendants lockets"
                    )
                    .slice(0, 6) // Limit to 6 items for scrolling
                    .map((product) => (
                      <SwiperSlide
                        key={product._id}
                        style={{ width: "200px", textAlign: "center" }}
                      >
                        <div className="card border-0 shadow-sm rounded-3 d-flex flex-column align-items-center text-center p-4">
                          <img
                            src={product.images?.[0] || "/default-image.jpg"}
                            alt={product.name}
                            className="rounded-circle mb-3"
                            style={{
                              height: "120px",
                              width: "120px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            onClick={() => navigate(`/product/${product._id}`)}
                          />
                          <h6 className="text-truncate fw-semibold w-100 overflow-hidden">
                            {product.name}
                          </h6>
                          <p className="fw-bold text-dark mb-2">
                            ₹{product.price}
                          </p>
                          <button
                            className="btn w-100 text-white"
                            style={{
                              backgroundColor: "rgba(224, 94, 28, 0.8)",
                              borderRadius: "8px",
                              fontWeight: 600,
                            }}
                            onClick={() => navigate(`/product/${product._id}`)}
                          >
                            <i className="fa fa-cart-shopping me-1"></i> Add
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>

            {/* Grid Layout for Larger Screens */}
            <div className="row g-4 d-none d-md-flex">
              {product &&
                product
                  .filter(
                    (item) =>
                      item.category?.name?.toLowerCase() === "pendants lockets"
                  )
                  .slice(0, 4) // Show 4 products in grid
                  .map((product) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6"
                      key={product._id}
                    >
                      <div className="card border-0 shadow-sm rounded-3 d-flex flex-column align-items-center text-center p-4">
                        <img
                          src={product.images?.[0] || "/default-image.jpg"}
                          alt={product.name}
                          className="rounded-circle mb-3"
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        />
                        <h6 className="text-truncate fw-semibold">
                          {product.name}
                        </h6>
                        <p className="fw-bold text-dark mb-2">
                          ₹{product.price}
                        </p>
                        <button
                          className="btn w-100 text-white"
                          style={{
                            backgroundColor: "rgba(224, 94, 28, 0.8)",
                            borderRadius: "8px",
                            fontWeight: 600,
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          <i className="fa fa-cart-shopping me-1"></i> Add
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 shadow-lg p-2 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4
                className="fw-bold"
                style={{
                  fontFamily: "'Kalam', sans-serif",
                  fontSize: "1.2rem",
                  color: "#000",
                }}
              >
                STICKERS
              </h4>
              <button
                className="btn btn-sm text-white px-4 py-2"
                style={{
                  backgroundColor: "rgba(224, 94, 28, 0.8)",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => handleRedirect("STICKERS")}
              >
                View All
              </button>
            </div>

            {/* Swiper Slider for Mobile */}
            <div className="d-block d-md-none">
              <Swiper
                slidesPerView={1.5}
                spaceBetween={10}
                freeMode={true}
                pagination={{ clickable: true }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                {product &&
                  product
                    .filter(
                      (item) =>
                        item.category?.name?.toLowerCase() === "stickers"
                    )
                    .map((product) => (
                      <SwiperSlide key={product._id}>
                        <div className="card border-0 shadow-sm rounded-3 d-flex flex-column align-items-center text-center p-4">
                          <img
                            src={product.images?.[0] || "/default-image.jpg"}
                            alt={product.name}
                            className="rounded-circle mb-3"
                            style={{
                              height: "150px",
                              width: "150px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            onClick={() => navigate(`/product/${product._id}`)}
                          />
                          <h6
                            className="text-truncate w-100 fw-semibold"
                            style={{ fontSize: "1.1rem" }}
                          >
                            {product.name}
                          </h6>
                          <p
                            className="fw-bold text-dark"
                            style={{ fontSize: "1.1rem" }}
                          >
                            ₹{product.price}
                          </p>
                          <button
                            className="btn w-100 text-white"
                            style={{
                              backgroundColor: "rgba(224, 94, 28, 0.8)",
                              borderRadius: "8px",
                              fontWeight: 600,
                            }}
                            onClick={() => navigate(`/product/${product._id}`)}
                          >
                            <i className="fa fa-cart-shopping me-1"></i> Add
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>

            {/* Grid View for Desktop */}
            <div className="row g-4 d-none d-md-flex">
              {product &&
                product
                  .filter(
                    (item) => item.category?.name?.toLowerCase() === "stickers"
                  )
                  .slice(0, 4)
                  .map((product) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6"
                      key={product._id}
                    >
                      <div className="card border-0 shadow-sm rounded-3 d-flex flex-column align-items-center text-center p-4">
                        <img
                          src={product.images?.[0] || "/default-image.jpg"}
                          alt={product.name}
                          className="rounded-circle mb-3"
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        />
                        <h6
                          className="text-truncate w-100 fw-semibold"
                          style={{ fontSize: "1.1rem" }}
                        >
                          {product.name}
                        </h6>
                        <p
                          className="fw-bold text-dark"
                          style={{ fontSize: "1.1rem" }}
                        >
                          ₹{product.price}
                        </p>
                        <button
                          className="btn w-100 text-white"
                          style={{
                            backgroundColor: "rgba(224, 94, 28, 0.8)",
                            borderRadius: "8px",
                            fontWeight: 600,
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          <i className="fa fa-cart-shopping me-1"></i> Add
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div
        className="row justify-content-center"
        style={{
          backgroundColor: "#f9f9f9",
        }}
      ></div>

      {/* product 4 start*/}
      <div
        className="container-fluid mb-4 my_shadow"
        style={{ backgroundColor: "#E3E6E6" }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0">
              <div className="card-body">
                <h4 className="card-title p-3" style={{ fontWeight: 600 }}>
                  All In One
                </h4>
                <div
                  id="carouselExampleControls6"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div
                        className="row g-4 d-flex flex-nowrap overflow-x-auto"
                        style={{
                          whiteSpace: "nowrap",
                          scrollBehavior: "smooth",
                        }}
                      >
                        {product?.slice(5, 11).map((product) => (
                          <div
                            className="col-lg-2 col-md-4 col-6"
                            key={product._id}
                            style={{ minWidth: "180px" }} // Ensures correct item width
                          >
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
                                onClick={() =>
                                  navigate(`/product/${product._id}`)
                                }
                                src={product.images[0]}
                                className="card-img-top"
                                alt={product.name}
                                style={{
                                  height: "140px",
                                  width: "140px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                  margin: "10px auto 5px",
                                }}
                              />
                              <div className="card-body text-center">
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
                                  ₹ {product.price}
                                </p>
                                <button
                                  onClick={() =>
                                    navigate(`/product/${product._id}`)
                                  }
                                  className="w-100 rounded-4 mt-1 mb-1"
                                  style={{
                                    color: "black",
                                    backgroundColor: "rgba(224, 94, 28, 0.64)",
                                    border: "none",
                                    padding: "10px",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  <i className="fa fa-cart-shopping me-2"></i>{" "}
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls6"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls6"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* product 4 end*/}
    </>
  );
};

export default Banner;
