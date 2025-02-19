import React, { useEffect, useState } from "react";
import "../Styling/Shop.css";
import Favorite from "../assets/heart.png";
import CartIcon from "../assets/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../Redux/Actions/cartActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, Rating } from "@mui/material";
import Loader from "../components/Loader";
import Search from "../components/Search";
import Pagination from "react-js-pagination";
import { getProduct } from "../Redux/Actions/productActions";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DrawerIcon from "../assets/drawer.png";
import Slider from "@mui/material/Slider";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import StarsIcon from "@mui/icons-material/Stars";

const categories = [
  "BRASS POOJA ARTICLES",
  "SILVER/GOLD ARTICLES",
  "PUBLIC PROGRAMME ARTICLES",
  "BOOKS",
  "STICKERS",
  "photo ballpens",
  "MALAS",
  "CAR ARTICLES",
  "PENDANT LOCKET",
  "HAWAN SAMAGRI",
  "TREATMENT ARTICLES",
  "POOJA SAMAGRI ARTICLES",
  "AASANS & CHUNRIS",
  "All-in-One",
];

const Shop = () => {
  const { products, productCount, loading, productsPerPage } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, SetPrice] = useState([0, 50000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [barOpen, setBarOpen] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setBarOpen({ ...barOpen, [anchor]: open });
  };

  const list = (anchor)=> (
    <Box
      style={{ backgroundColor: "#1b1b1b", position: "relative" }}
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <Button
        style={{ position: "absolute", top: 10, right: 10, color: "white" }}
        onClick={toggleDrawer(anchor, false)}
      >
        X
      </Button>
      <List style={{ marginTop: "4rem" }}>
        <ListItem disablePadding style={{ marginBottom: "2rem" }}>
          <div className="price-range container">
            <ListItemButton style={{ marginBottom: "2rem" }}>
              <ListItemIcon style={{ color: "#fff" }}>
                <CurrencyRupeeIcon />
              </ListItemIcon>
              <ListItemText primary="Price Range" style={{ color: "#fff" }} />
            </ListItemButton>
  
            <Box sx={{ width: 200 }}>
              <Slider
                style={{ width: "12rem", color: "white", marginLeft: ".5rem" }}
                getAriaLabel={() => "Temperature range"}
                value={price}
                onChange={PriceHandler}
                valueLabelDisplay="on"
                min={0}
                max={50000}
              />
            </Box>
          </div>
        </ListItem>
  
        <Divider style={{ backgroundColor: "#ffff" }} />
        <ListItem disablePadding style={{ color: "aqua", marginBottom: "2rem" }}>
          <div className="price-range container">
            <ListItemButton style={{ marginBottom: "1rem" }}>
              <ListItemIcon style={{ color: "#fff" }}>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Top Categories" style={{ color: "#fff" }} />
            </ListItemButton>
            <Box sx={{ width: 200 }}>
              {categories.map((data) => (
                <Button
                  variant="outlined"
                  size="small"
                  key={data}
                  selected
                  style={{
                    color: "white",
                    margin: "3px",
                  }}
                  onClick={() => setCategory(data)}
                >
                  {data}
                </Button>
              ))}
            </Box>
          </div>
        </ListItem>
  
        <Divider style={{ backgroundColor: "#ffff" }} />
  
        <ListItem disablePadding style={{ color: "aqua", marginBottom: "5rem" }}>
          <div className="price-range container">
            <ListItemButton style={{ marginBottom: "2rem" }}>
              <ListItemIcon style={{ color: "#fff" }}>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="Choose Ratings" style={{ color: "#fff" }} />
            </ListItemButton>
            <Box sx={{ width: 200 }}>
              <Slider
                style={{ width: "12rem", color: "white", marginLeft: ".5rem" }}
                aria-label="Restricted values"
                value={rating}
                onChange={(e, rate) => setRating(rate)}
                valueLabelDisplay="on"
                min={0}
                max={5}
              />
            </Box>
          </div>
        </ListItem>
      </List>
    </Box>
  );
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProduct(currentPage, price, category, rating));
  }, [dispatch, currentPage, price, category, rating]);

  const options = {
    size: "small",
    value: products?.map((data) => data?.productRatings),
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = (productId, productName) => {
    dispatch(AddToCart(productId, 1));
    toast.success(`${productName} Added to Cart Successfully 🥳`);
  };

  const PriceHandler = (e, newPrice) => {
    SetPrice(newPrice);
  };


  const { Searchdata} = useSelector((state) => state. search);
  // console.log(Searchdata)
  return (
    <>
     <div className="product-shop-container">
  <Search />
  
  <div className="product-upper-container">
    <div className="drawer-wrapper">
      {["left"].map((anchor)=> (
        <div key={anchor} className="drawer-container">
          <Drawer
            anchor={anchor}
            open={barOpen[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </div>
      ))}
    </div>
  </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="product-shop">
            {products && products.filter((product) => {
            if (Searchdata.length === 0) {
              return product;
            } else  {
              return product.name.toLowerCase().includes(Searchdata.toLowerCase());
            }
          })
            .map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="product-card">
                  <div className="product-tumb">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="image-backdrop"
                    />
                  </div>
                  <div className="product-details">
                    <span className="product-category">{product.name}</span>
                    <div className="product-bottom-details">
                      <div className="product-price">
                        <label> ₹ {product.price} </label>
                        <div className="product-rating">
                          <Rating {...options} />
                          <small>({product?.reviews?.length || 0})</small>
                        </div>
                      </div>
                      <div className="product-links">
                        <button
                          className="add_to_cart_button"
                          onClick={() =>
                            addToCartHandler(product._id, product.name)
                          }
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
            ))}
          </div>
        )}

        <div className="pagination-container">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={productsPerPage}
            totalItemsCount={productCount}
            onChange={handlePageChange}
            itemclassName="page-item"
            linkclassName="page-link"
            firstPageText="1"
            lastPageText="Last"
            nextPageText="Next"
            prevPageText="Previous"
            activeclassName="pageItemActive"
            activeLinkclassName="pageLinkActive"
          />
        </div>
      </div>
    </>
  );
};

export default Shop;