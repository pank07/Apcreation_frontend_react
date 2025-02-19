import React from "react";
import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import cartIcon from "../assets/cart.png";
import userIcon from "../assets/user.png";
import { Offcanvas, Accordion } from "react-bootstrap";
import { LogOutUser } from "../Redux/Actions/userActions";
import LogoutIcon from "../assets/logout.png";
import { baseUrl } from "../UrlHelper/baseUrl";
import axios from "axios";
import DashboarduserIcon from "../assets/administrator.png";
import profileIcon from "../assets/profile.png";
import mellowIcon from "../assets/mellowIcon.png";
import { useSelector, useDispatch } from "react-redux";
import { searchUser } from "../Redux/Searchslice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "../Styling/Navbar.css";
import { ArrowBack } from "@mui/icons-material";

const NavBar = (DashboardIcon, WhatsAppIcon) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.userData);
  // const { isAuthenticated } = useSelector((state) => state.userData);
  const [authStatus, setAuthStatus] = useState(isAuthenticated);

  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useSelector((state) => state.cartData);
  const offcanvasRef = useRef(null); // Reference to the Offcanvas element
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  useEffect(() => {
    // const isToken = localStorage.getItem("token");
    // console.log({ isToken });
    // if (!isToken) {
    //   navigate("/login");

    // }
    const loggedInStatus = localStorage.getItem("isLoggedIn");
  
    setIsLoggedIn(loggedInStatus === "true");

    setAuthStatus(isAuthenticated);
   
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    const handleClickOutside = (event) => {
      // Check if the clicked target is outside the Offcanvas menu
      if (
        offcanvasWrapperRef.current &&
        !offcanvasWrapperRef.current.contains(event.target)
      ) {
        setShow(false); // Close the Offcanvas menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAuthenticated]);

  const handleRedirect = (category) => {
    // Redirect to the product's detailed page using the product ID (you can change the URL structure as needed)
    // navigate(`/product/${productId}`);
    // navigate(`/Categories/${category}`);
    // navigate(`/Categories/${encodeURIComponent(category)}`);
    navigate(`/Categories?category=${encodeURIComponent(category)}`);
  };
  const handleLogout = () => {
    dispatch(LogOutUser());
    navigate("/login");
  };

  const handleCart = () => {
    navigate("/cart");
  };
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };
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
              category: item.category, // Directly using category string
              images:
                item.images && item.images.length > 0
                  ? item.images
                  : ["/path/to/placeholder.jpg"], // Default image
            }));
  
          setCategories(formattedCategories);
        } else {
          console.error("Fetched data is not in expected format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }
  
    fetchCategories();
  }, [baseUrl]);

  const [searchdata, setSearchSata] = useState("");
  useEffect(() => {
    dispatch(searchUser(searchdata));
  }, [searchdata]);

  // const [location, setLocation] = useState({ city: "", postalCode: "" });
  const [error, setError] = useState(null);
  const apiKey = "AIzaSyBpcBi67uEbAIQTdShuxektx1E_v38CTHI";

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(showPosition, showError);
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  // const showPosition = (position) => {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;

  //   const apiUrl = https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey};

  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === "OK" && data.results && data.results.length > 0) {
  //         const { city, postalCode } = getCityAndPostalCode(
  //           data.results[0].address_components
  //         );
  //         setLocation({ city, postalCode });
  //       } else {
  //         console.error("Error:", data.status);
  //         setError("Error fetching location data.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setError("Error fetching data.");
  //     });
  // };
  const handleBack = () => {
    navigate(-1); 
  };
  const getCityAndPostalCode = (addressComponents) => {
    let city = "";
    let postalCode = "";
    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("postal_code")) {
        postalCode = component.long_name;
      }
    }
    return { city, postalCode };
  };
  const [show, setShow] = useState(false);
  const offcanvasWrapperRef = useRef(null);

  // Dropdown state for nested items
  const [dropdownOpen, setDropdownOpen] = useState({
    aasans: false,
    brassPuja: false,
    pendants: false,
    poojaSamagri: false,
    publicProgramme: false,
    treatmentArticles: false,
  });

  // Toggle Offcanvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Toggle dropdown items
  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };
  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      default:
        setError("An unknown error occurred.");
        break;
    }
  };

  return (
    <>
      <div
        className="whatsapp-icon-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* WhatsApp Link */}
        <a
          href="https://api.whatsapp.com/send?phone=7389925002"
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Security for external links
          className="whatsapp-icon"
        >
          {/* WhatsApp Icon */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
        </a>

        {/* QR Code Display on Hover */}
        {/* {isHovered && (
    <div className="qr-code">
      <img
        src="path-to-your-qr-code.png" // Replace with the correct QR code path
        alt="Scan the code"
        className="qr-img"
      />
      <span>Scan the code</span>
    </div>
  )} */}
      </div>

      {/* navbar start */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#252525",
          padding: "10px",
          position: "sticky",
          top: "0",
          zIndex: "1000",
        }}
      >
             {/* <button onClick={handleBack} className="bg-transparent text-white p-3">
              {/* <ArrowBack className="text-white" /> */}
            {/* </button> */} */
        <div className="container-fluid" style={{ backgroundColor: "#252525" }}>
          {/* Logo Section */}
          <Link
            className="navbar-brand"
            to="/"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="https://www.apcreation.in/wp-content/uploads/2023/01/AP-Creation-final-logo-2.png"
              alt="AP Creation"
              style={{ width: "170px" }}
            />
          
            <span
              style={{
                color: "#ff7033",
                fontWeight: "bold",
                fontSize: "16px",
                marginLeft: "10px",
              }}
            />
          </Link>
          <div className="d-lg-none ms-auto">
                <Link to="/cart" className="nav-link">
                  <div className="icon-circle">
                    <i
                      className="fa fa-shopping-cart"
                      style={{ fontSize: "18px" }}
                    ></i>
                  </div>
                </Link>
              </div>
          {/* Toggle Button */}
          <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleNavbar} // Handle toggle manually
                  aria-controls="navbarNav"
                  aria-expanded={isNavOpen}
                  aria-label="Toggle navigation"
          >
            <i
              className="fa-solid fa-bars"
              
              style={{ color: "#ff7033", fontSize: "18px" }}
            ></i>
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}  id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* All Categories Dropdown */}
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  style={{
                    color: "#ff7033",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={handleShow}
                >
                  <i
                    className="fa-solid fa-bars"
                    style={{ color: "#ff7033", marginRight: "8px" }}
                  />{" "}
                  All Categories
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/products"
                  style={{ color: "#ff7033", fontSize: "14px" }}
                >
                  All Products
                </Link>
              </li>
              {/* Other Navbar Links */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/about"
                  style={{ color: "#ff7033", fontSize: "14px" }}
                >
                  About Us
                </Link>
              </li>

              {/* Show "Login as Center" if NOT logged in */}
              {!authStatus ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ color: "#ff7033", fontSize: "14px" }}
                  >
                    Login as Center
                  </Link>
                </li>
              ) : null}

              {/* Other Links */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contact"
                  style={{ color: "#ff7033", fontSize: "14px" }}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/shipping_policy"
                  style={{ color: "#ff7033", fontSize: "14px" }}
                >
                  How to Buy
                </Link>
              </li>
            </ul>

            {/* Search and Icons */}
            <div className="d-flex align-items-center ms-auto">
              <li className="nav-item">
                <a href="/profile" className="nav-link">
                  <div className="icon-circle">
                    <i className="fa fa-user"></i>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a href="/cart" className="nav-link">
                  <div className="icon-circle">
                    <i className="fa fa-shopping-cart"></i>
                  </div>
                </a>
              </li>
            </div>

            {/* Admin Profile Section */}
            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  {user.role === "admin" && (
                    <OverlayTrigger
                      placement="bottom" // Try bottom, top, left, or right
                      overlay={
                        <Tooltip id="dashboard-tooltip">
                          Admin Dashboard
                        </Tooltip>
                      }
                    >
                      <Link to="/admin/dashboard" className="me-3">
                        <img
                          src={DashboarduserIcon}
                          alt="Dashboard"
                          className="logout-images"
                        />
                      </Link>
                    </OverlayTrigger>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-white"></Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Offcanvas Menu */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header
          closeButton
          style={{ backgroundColor: "rgb(3, 3, 3)", color: "white" }}
        >
          <Offcanvas.Title>
            {isAuthenticated ? (
              <div>
                <span>Hello, {user.name}</span>
                <div className="mt-2">
                  {/* Cart visible for non-admin users */}
                  {
                    <img
                      src={cartIcon}
                      alt="Cart"
                      className="logout-image"
                      onClick={() => {
                        handleCart();
                        handleClose();
                      }}
                    />
                  }

                  {/* Logout for all users */}
                  <img
                    src={LogoutIcon}
                    alt="Logout"
                    className="logout-image"
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                  />
                </div>
              </div>
            ) : (
              <Link to="/login" style={{ color: "white" }}>
                Hello, Login
              </Link>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>

        {/* Offcanvas Body with Category Links */}
        <Offcanvas.Body className="custom-background">
          <h4 className="fs-6 fw-bold mt-3 mb-2">Shop By Category</h4>
          <ul>
        <Accordion>
          {categories.map((cat, index) => (
            <Accordion.Item
              key={cat.id}
              eventKey={index.toString()}
              className="SSD custom-accordion-item"
            >
              <Link
                to={`/categories?category=${encodeURIComponent(cat.category)}`}
                onClick={() => console.log("Navigating")}
              >
                <li
                  onClick={handleClose}
                  className="mx-2 fs-6 set_li_sides custom-list-item"
                >
                  {cat.category}
                </li>
              </Link>

              {/* Subcategories Accordion */}
              <Accordion.Body>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <ul className="ps-3">
                    {cat.subcategories.map((subCat, subIndex) => (
                      <Link
                        key={subCat.id}
                        to={`/categories?subcategory=${encodeURIComponent(subCat.subcategory)}`}
                        onClick={() => console.log("Navigating to subcategory")}
                      >
                        <li
                          onClick={handleClose}
                          className="fs-6 set_li_sides custom-list-item"
                        >
                          {subCat.subcategory}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* navbar end */}
    </>
  );
};

export default NavBar;
