import React, { useState, useEffect } from "react";
import "../Styling/Photos.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { baseUrl } from "../UrlHelper/baseUrl";
import { AddToCartforphoto } from "../Redux/Actions/cartActions";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [selectedSize, setSelectedSize] = useState("3×4");
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    async function fetchImages() {
      try {
        if (!category) return; // Ensure category is not null or undefined
        const response = await axios.get(`${baseUrl}/category/${category}`);
      
        setImages(response.data.products || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, [category]); // Added category as dependency

  const handlePhotoClick = (index) => {
    setSelectedPhoto(index);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    const product = images[selectedPhoto];
   
    
    if (!product) return;
    const selectedPrice = sizePrices[selectedSize] || 0; 
    dispatch(AddToCartforphoto( {id: product._id,
      name: product.name,
      size: selectedSize,
      price: selectedPrice,
      quantity: quantity,}));
    toast.success(`${product.name} Added to Cart Successfully 🥳`);
  };

  const sizes = [
    "3×4", "4×6", "6×8", "9×12", "12×15", "12×18", "16×20",
    "18×24", "24×30", "24×36", "30×42", "36×48"
  ];

  const sizePrices = {
    "3×4": 100, "4×6": 140, "6×8": 180, "9×12": 550, "12×15": 750,
    "12×18": 850, "16×20": 1200, "18×24": 1500, "24×30": 2400,
    "24×36": 3000, "30×42": 4000, "36×48": 5500
  };

  return (
    <div className="containers">
      <h2>{category || "Select a Category"}</h2>

      <div className="content">
        {/* Left - Large Selected Image */}
        <div className="selected-image">
          {images[selectedPhoto]?.images?.[0] ? (
            <img
              src={images[selectedPhoto].images[0]}
              alt={`Selected Photo ${selectedPhoto + 1}`}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>

        {/* Right - Grid of Images and Controls */}
        <div className="image-options">
          <h4>Photo: {selectedPhoto + 1}</h4>
          <div className="photo-grid">
            {images.map((image, index) => (
              <div
                key={image._id || index}
                className={`photo ${selectedPhoto === index ? "selected" : ""}`}
                onClick={() => handlePhotoClick(index)}
              >
                {image.images?.[0] ? (
                  <img src={image.images[0]} alt={`Photo ${index + 1}`} />
                ) : (
                  <p>No Image</p>
                )}
                <div className="photo-number">{index + 1}</div>
              </div>
            ))}
          </div>

          <h4>Size (Inches)</h4>
          <div className="size-grid">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-button ${selectedSize === size ? "active" : ""}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Display Price */}
          <div className="price-display">
            Price: ₹{sizePrices[selectedSize] || "N/A"}
          </div>

          {/* Controls */}
          <div className="controls">
            <button className="clear-button" onClick={() => setSelectedPhoto(0)}>
              Clear
            </button>

            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
