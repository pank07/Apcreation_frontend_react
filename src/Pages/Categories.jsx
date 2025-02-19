import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styling/Categories.css"; // Updated CSS
import { baseUrl } from "../UrlHelper/baseUrl";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";


const Categories = () => {
    // const { loading } = useSelector((state) => state.allUsers);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [images, setImages] = useState([]);
    const [itemDetails, setItemDetails] = useState({});
  
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
  
    // const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
  
  
    // fetch all banners
    // useEffect(() => {
    //   async function fetchImages() {
    //     try {
  
    //       const response = await axios.get(`${baseUrl}/banner`);
    //       console.log(response.data)
  
    //       setImages(response.data);
  
    //     } catch (error) {
    //       console.error("Error fetching images:", error);
    //     }
    //   }
  
    //   fetchImages();
    // }, []);
  
  
  
  
    // const handleAddToCart = (productId) => {
    //   // Your logic to add the product to the cart
    //   // console.log(Product` ${productId} `added to cart!);
    // };
  
  
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
 
    const [products, setProducts] = useState([]);
        
      
    useEffect(() => {
      async function fetchCategory() {
        try {
          const response = await axios.get(`${baseUrl}/category/${category}`);
          setProducts(response.data.products);
       
          // dispatchEvent();
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      }
      fetchCategory();
    }, [category]);
   
    
    const handleRedirect = (category) => {
      // Redirect to the product's detailed page using the product ID (you can change the URL structure as needed)
      // navigate(`/product/${productId}`);
      // navigate(`/Categories/${category}`);
      // navigate(`/Categories/${encodeURIComponent(category)}`);
      navigate(`/Categories?category=${encodeURIComponent(category)}`);
      window.scrollTo(0, 0);
    };
    // const increaseQuantity = () => {
    //   if (itemDetails.Stock <= quantity) {
    //     toast.warning("Product Reaches its Maximum Limit!! 🫡");
    //     return;
    //   }
    //   const increment = quantity + 1;
    //   setQuantity(increment);
    // };
  
  
  
  
    return (
      <>
       <div className="container-fluid mt-4 mb-4">
       <h1 className="fw-bold ms-4" style={{ fontFamily: "Poppins, Sans-serif" }}>
       {category}
      </h1>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={product._id}>
            <div
              className="card text-center shadow-sm h-100"
              style={{
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
           
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
                  ₹{product.price}
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
        {/* <Sidenav /> */}
        {/* carousle-start */}
        {/* <div className="container-fluid mb-4">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={image.image1}
                    className="d-block img-fluid banner"
                    alt={`slider-${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              {/* <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              /> */}
              {/* <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next" */}
            {/* >
              {/* <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              />
              <span className="visually-hidden">Next</span> */}
            {/* </button>
          </div> */}
        {/* </div> */} 
        {/* carousle-end */}
  
  
  
        {/* product-2-start */} 
         <div className="container-fluid">
          {/* Title Section */}
          <div className="row mb-4">
            <div className="col-12">
              <p className="text-center page-title fs-2">
                <Link to="/product/677fc119907e39c4e0037ee4" className="text-decoration-none text-dark">
                
You may also like
 </Link>
              </p>
            </div>
          </div>
  
          {/* Product Grid Section */}
          <div className="row justify-content-center">
            {product && product.length > 0 ? (
              [...new Map(product.map((item) => [item.name, item])).values()]
                .slice(0, 12)
                .map((item, index) => (
                  <div
                    className="col-4 col-sm-4 col-md-3 col-lg-2 mb-4 text-center"
                    key={index}
                  >
                    <div className="category-container position-relative">
                      {/* Image Section */}
                      <div className="category-image">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          onClick={() => handleRedirect(item.category.name)}
                          className="img-fluid rounded-circle"
                        />
                      </div>
                       <div className="category-name mt-2">
                        <p className="text-truncate" >{item.category.name}</p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">No products available</p>
              </div>
            )}
          </div>
        </div> 
        

      </>
    );
  };
  

export default Categories;