import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { LogOutUser } from "../Redux/Actions/userActions";
import ProfileIcon from "../assets/profile.png";
import LogoutIcon from "../assets/logout.png";
import cartIcon from "../assets/cart.png";
import DashboardIcon from "../assets/dashboard.png";
import "../Styling/Profile.css";
import "../Styling/Sidenav.css";
import './Sidenav.css';

const Sidenav = () => {
    const [show, setShow] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({
        aasans: false,
        brassPuja: false,
        pendants: false,
        poojaSamagri: false,
        publicProgramme: false,
        treatmentArticles: false
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.userData);

    const handleLogout = () => {
        dispatch(LogOutUser());
        navigate("/login");
    };

    const handleCart = () => {
        navigate("/cart");
    };

    const toggleDropdown = (category) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    return (
        <div>
            {/* Top navigation bar */}
            {/* <div className="container-fluid" style={{ overflowX: "scroll", whiteSpace: "nowrap", backgroundColor:  "#e37740" }}>
                <div className="row">
                    <ul className="list-unstyled d-flex justify-content-between text-light mb-2">
                        <li className="mx-2 fs-6" onClick={handleShow}>
                            <i className="fa-solid fa-bars text-light mt-1 mx-2 fs-6" />
                            All
                        </li>
                        <Link to="/products"><li className="mx-2 fs-6">All CATEGORIES</li></Link>
                        <Link to="/about"><li className="mx-2 fs-6">ABOUT US</li></Link>
                        <Link to="/login"><li className="mx-2 fs-6">LOGIN AS </li></Link>
                        <Link to="/contact"><li className="mx-2 fs-6">CONTACT</li></Link>
                        <Link to="/shipping_policy"><li className="mx-2 fs-6">HOW TO BUY</li></Link>
                    </ul>
                </div>
            </div> */}

            {/* Offcanvas sidebar */}
            {/* <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton style={{ backgroundColor: "rgb(35, 47, 62)", color: "white" }}>
                    <Offcanvas.Title>
                        {isAuthenticated ? (
                            <div>
                                <span>Hello, {user.name}</span>
                                <div className="mt-2">
                                    {user.role === "admin" && (
                                        <Link to="/admin/dashboard" title="Admin Dashboard">
                                            <img src={DashboardIcon} alt="Dashboard" className="logout-image" />
                                        </Link>
                                    )}
                                    {user.role !== "admin" && (
                                        <img src={cartIcon} alt="Cart" className="logout-image" onClick={handleCart} />
                                    )}
                                    <img src={LogoutIcon} alt="Logout" className="logout-image" onClick={handleLogout} />
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" style={{ color: "white" }}>Hello, Login</Link>
                        )}
                    </Offcanvas.Title>
                </Offcanvas.Header>

                {/* Offcanvas body with category links */}
                {/* <Offcanvas.Body>
                    <h4 className="fs-5 fw-bold mt-3 mb-2">Shop By Category</h4>
                    <ul>
                        <ul>
                            <Link to="/categories"><li className="mx-2 fs-6 set_li_sides">Badges </li></Link> <br />
                            <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Books (Shri Mataji's Precious Litreature (Sahitya)) </li></Link> <br />
                        </ul>
                        {/* Aasans & Chunris Dropdown */}
                        {/* <li className="mx-2 fs-6 set_li_side" onClick={() => toggleDropdown('aasans')}>Aasans & Chunris</li><br />
                        {dropdownOpen.aasans && (
                            <ul>
                                <Link to="/products/aasans1"><li className="fs-6 set_li_side" key="aasans1">Aasan & Chunri Combo</li></Link>
                                <Link to="/products/aasans2"><li className="fs-6 set_li_side" key="aasans2">Aasans </li></Link>
                                <Link to="/products/aasans3"><li className="fs-6 set_li_side" key="aasans3">Chunris</li></Link>
                            </ul>
                        )}


                        {/* Brass Puja Articles Dropdown */}
                        {/* <li className="mx-2 fs-6 set_li_side" onClick={() => toggleDropdown('brassPuja')}>Brass Puja Articles</li><br />
                        {dropdownOpen.brassPuja && (
                            <ul>
                                <Link to="/products/brass1"><li className="fs-6 set_li_side" key="brass1">Agarbatti / Incense Stick Stand</li></Link>
                                <Link to="/products/brass2"><li className="fs-6 set_li_side" key="brass2">Aarti</li></Link>
                                <Link to="/products/brass3"><li className="fs-6 set_li_side" key="brass3">Candle Stand</li></Link>
                                <Link to="/products/brass4"><li className="fs-6 set_li_side" key="brass4">Copper Puja Ultensils</li></Link>
                                <Link to="/products/brass5"><li className="fs-6 set_li_side" key="brass5">Deepak</li></Link>
                                <Link to="/products/brass6"><li className="fs-6 set_li_side" key="brass6">Havan Utensils</li></Link>
                            </ul>
                        )}
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Calendars</li></Link> <br />
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Car Articles</li></Link> <br />
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Glass printed wooden frames</li></Link> <br />
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Glass Shree Charan</li></Link> <br />
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Hawan Samagri</li></Link> <br />
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Malas</li></Link> <br /> */}

                        {/* Pendants/lockets Dropdown */}
                        {/* <li className="mx-2 fs-6 set_li_side" onClick={() => toggleDropdown('pendants')}>Pendants/lockets</li><br />
                        {dropdownOpen.pendants && (
                            <ul>
                                <Link to="/products/pendant1"><li className="fs-6 set_li_side" key="pendant1">Brass</li></Link>
                                <Link to="/products/pendant2"><li className="fs-6 set_li_side" key="pendant2">Diamond</li></Link>
                            </ul>
                        )}
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Photo Ballpens</li></Link> <br /> */}

                        {/* Pooja Samagri (Articles) Dropdown */}
                        {/* <li className="mx-2 fs-6 set_li_side" onClick={() => toggleDropdown('poojaSamagri')}>Pooja Samagri (Articles)</li><br />
                        {dropdownOpen.poojaSamagri && (
                            <ul>
                                <Link to="/products/pooja1"><li className="fs-6 set_li_side" key="pooja1">Aggarbatti/Incense Stick</li></Link>
                                <Link to="/products/pooja2"><li className="fs-6 set_li_side" key="pooja2">Attar</li></Link>
                                <Link to="/products/pooja3"><li className="fs-6 set_li_side" key="pooja3">Dry Agarbatti</li></Link>
                                <Link to="/products/pooja4"><li className="fs-6 set_li_side" key="pooja4">Dhoop & Batti (Wicks)</li></Link>
                                <Link to="/products/pooja5"><li className="fs-6 set_li_side" key="pooja5">Gulab Jal/Rose Water</li></Link>
                                <Link to="/products/pooja6"><li className="fs-6 set_li_side" key="pooja6">Kum Kum</li></Link>
                            </ul>
                        )} */}

                        {/* Public Programme Articles Dropdown */}
                        {/* <li className="mx-2 fs-6 set_li_side" onClick={() => toggleDropdown('publicProgramme')}>Public Programme Articles</li><br />
                        {dropdownOpen.publicProgramme && (
                            <ul>
                                <Link to="/products/public1"><li className="fs-6 set_li_side" key="public1">Pamphlets</li></Link>
                                <Link to="/products/public2"><li className="fs-6 set_li_side" key="public2">Parichay Pustika</li></Link>
                                <Link to="/products/public3"><li className="fs-6 set_li_side" key="public3">Standy & Flex</li></Link>
                                <Link to="/products/public4"><li className="fs-6 set_li_side" key="public4">Tent Card</li></Link>
                            </ul>
                        )}
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Shri Mataji Speeches and Bhajans - Audios & Videos </li></Link> <br />
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Silver & Gold Articles</li></Link> <br />
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Stickers</li></Link> <br />
                        <Link to="/products"><li className="mx-2 fs-6 set_li_sides">Travelling Article</li></Link> <br /> */}

                        {/* Public Treatment Articles Dropdown */}
                        {/* <li className="mx-2 fs-6 set_li_side" onClick={() => toggleDropdown('treatmentArticles')}>Treatment Articles</li><br />
                        {dropdownOpen.treatmentArticles && (
                            <ul>
                                <Link to="/products/public1"><li className="fs-6 set_li_side" key="public1">Ice Pack</li></Link>
                                <Link to="/products/public2"><li className="fs-6 set_li_side" key="public2">Kailash Jeevan</li></Link>
                                <Link to="/products/public3"><li className="fs-6 set_li_side" key="public3">Netranjan/Kajal</li></Link>
                                <Link to="/products/public4"><li className="fs-6 set_li_side" key="public4">Candles</li></Link>
                                <Link to="/products/public5"><li className="fs-6 set_li_side" key="public5">Ghee Kapoor</li></Link>
                            </ul>
                        )}
                    </ul>
                </Offcanvas.Body>  */}

            {/* </Offcanvas>  */}
        </div>
    );
};

export default Sidenav;
