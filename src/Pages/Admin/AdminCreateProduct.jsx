
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { createNewProduct } from "../../Redux/Actions/productActions";
import { ADMIN_CREATE_PRODUCTS_RESET } from "../../Redux/Constants/productConstants";
import { toast } from "react-toastify";

const productCategories = [
  "Travelling Articles",
  "Glass Shree Charan",
  "Calendars",
  "Shri Mataji Charan",
  "Rudraksha",
  "Puja Thalis",
  "Badges",
  "Glass Printed Wooden Frames",
  "SILVER & GOLD ARTICLES",
  "PUBLIC PROGRAMME ARTICLES",
  "Pamphlets",
  "Parichay Pustika",
  "Standy & Flex",
  "Mata ji Photo",
  "Tent Card",
  "BOOKS",
  "STICKERS",
  "AASANS & CHUNRIS",
  "Aasan & Chunri Combo",
  "Aasans",
  "Chunris",
  "BRASS POOJA ARTICLES",
  "Agarbatti / Incense Stick Stand",
  "Aarti",
  "Candle Stand",
  "Copper Puja Utensils",
  "Deepak",
  "Haven Utensils",
  "Pendants/Lockets",
  "Brass",
  "Diamond",
  "photo ballpens",
  "MALAS",
  "CAR ARTICLES",
  "PENDANT LOCKET",
  "HAWAN SAMAGRI",
  "TREATMENT ARTICLES",
  "Candle",
  "Ghee Kapoor",
  "POOJA SAMAGRI ARTICLES",
  "Aggarbatti/Incense Stick",
  "Attar",
  "Dry Agarbatti",
  "Dhoop & Batti(Wicks)",
  "Gulab Jal/Rose Water",
  "Kum Kum",
  "Coins & Tokens",
  "Puja Coins",
  "Gold Coins",
  "Decoratives",
  "Wall Hanging",
  "Table Decor",
  "Religious Gifts",
  "Gift Items",
  "Puja Gift Sets",
  "All-in-One",
];
const productSizes = [
  "3x4",
  "4x6",
  "6x8",
  "9x12",
  "12x15",
  "12x18",
  "16x20",
  "18x24",
  "24x30",
  "24x36",
  "30x42",
  "36x48",
];

const AdminCreateProduct = () => {
  const { loading, success, error } = useSelector(
    (state) => state.createNewProduct
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productDiscount, setProductDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [productImagePreview, setProductImagePreview] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [sizeType, setSizeType] = useState("single");
  const [sizes, setSizes] = useState([{ size: "", price: "" }]);
  const createProductHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", productName);
    form.append("description", productDesc);
    form.append("Stock", productQuantity);
    form.append("color", productDiscount);
    form.append("tax", tax);
    form.append("subcategories", subCategory);
    if (sizeType === "single") {
      form.append("price", productPrice);
      form.append("productType", sizeType);
  
    }
    // form.append("category", productCategory);
    form.append("category", JSON.stringify({ name: productCategory }));
    if (sizeType === "bySize") {
   
      form.append("productType", sizeType);
      form.append("priceDetails", JSON.stringify(sizes));
    }
    productImage.forEach((img) => {
      form.append("images", img);
    });

    // Dispatch the action to create product
    dispatch(createNewProduct(form));

    // Log FormData contents
 
    for (let [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setProductImage([]);
    setProductImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductImagePreview((oldPreviews) => [
            ...oldPreviews,
            reader.result,
          ]);
        }
      };

      setProductImage((old) => [...old, file]);
      reader.readAsDataURL(file);
    });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = value;
    setSizes(updatedSizes);
  };

  const removeSizeField = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

  const addSizeField = () => {
    setSizes([...sizes, { size: "", price: "" }]);
  };

  useEffect(() => {
    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/all-products");
      dispatch({ type: ADMIN_CREATE_PRODUCTS_RESET });
    } else if (error) {
      toast.error(error);
    }
  }, [dispatch, navigate, success, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="mt-md-5">
                  <h1  className="login-system-register"  style={{color : "black"}} >Create Product</h1>
                  <form className="pt-2" onSubmit={createProductHandler}>
                    <div className="d-flex flex-column pb-3">
                      <label htmlFor="name" className="login-text">
                        Product Name
                      </label>
                      <input
                        type="text"
                        required
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter Product Name"
                        className="login-input"
                        id="name"
                      />
                    </div>
                    <div className="d-flex flex-column pb-3">
                      <label htmlFor="description" className="login-text">
                        Description
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={productDesc}
                        onChange={(e) => setProductDesc(e.target.value)}
                        placeholder="Add Product Description"
                        className="login-input"
                        id="description"
                      />
                    </div>
                    <div className="d-flex flex-column pb-3">
                      <label htmlFor="quantity" className="login-text">
                        Enter Stock
                      </label>
                      <input
                        type="number"
                        required
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                        placeholder="Enter Product Quantity"
                        className="login-input"
                        id="quantity"
                      />
                    </div>
                    <div className="d-flex flex-column pb-3">
                      <label htmlFor="sizeType" className="login-text">
                        Select Price Type
                      </label>
                      <select
                        value={sizeType}
                        onChange={(e) => setSizeType(e.target.value)}
                        className="login-input"
                      >
                        <option value="single">Single Price</option>
                        <option value="bySize">Price by Size</option>
                      </select>
                    </div>
                    {sizeType === "single" && (
                      <div className="d-flex flex-column pb-3">
                        <label htmlFor="price" className="login-text">
                          Enter Price
                        </label>
                        <input
                          type="number"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          placeholder="Enter Price"
                          className="login-input"
                          id="price"
                        />
                      </div>
                    )}
                    
                    <div className="d-flex flex-column pb-3">
                      <label htmlFor="tax" className="login-text">
                        Enter Tax
                      </label>
                      <input
                        type="number"
                        required
                        value={tax}
                        onChange={(e) => setTax(e.target.value)}
                        placeholder="Enter Tax"
                        className="login-input"
                        id="tax"
                      />
                    </div>
                   
                    <div className="d-flex flex-column pb-3">
                      <label htmlFor="category" className="login-text">
                        Select Category
                      </label>
                      <select
                        required
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="login-input"
                        id="category"
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {productCategories.map((data) => (
                          <option key={data} value={data}>
                            {data}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex flex-column pb-3">
                      <label htmlFor="subCategory" className="login-text">
                        Enter Sub-Category
                      </label>
                      <input
                        type="text"
                      
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        placeholder="Enter Sub-Category"
                        className="login-input"
                        id="sub_category"
                      />
                    </div>
                    {sizeType === "bySize" && (
                      <div className="d-flex flex-column pb-3">
                        <label>Sizes and Prices</label>
                        {sizes.map((size, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center"
                          >
                            <select
                              value={size.size}
                              onChange={(e) =>
                                handleSizeChange(index, "size", e.target.value)
                              }
                              required
                              className="form-select me-2"
                            >
                              <option value="" disabled>
                                Select Size
                              </option>
                              {productSizes.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              value={size.price}
                              onChange={(e) =>
                                handleSizeChange(index, "price", e.target.value)
                              }
                              placeholder="Enter Price"
                              className="form-control me-2"
                              required
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeSizeField(index)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSizeField}
                          style={{ background: "green" }}
                          className="btn btn-success mt-3"
                        >
                          Add Size
                        </button>
                      </div>
                    )}
                    <div className="d-flex flex-column pb-3">
                      <label htmlFor="images" className="login-text">
                        Upload Images
                      </label>
                      <div className="avatar-preview-container">
                        <input
                          type="file"
                          id="images"
                          className="avatar-input"
                          required
                          onChange={createProductImagesChange}
                          accept="image/*"
                          multiple
                        />
                      </div>
                      <div>
                        {productImagePreview.map((image, i) => (
                          <img
                            src={image}
                            alt={`preview-${i}`}
                            key={i}
                            className="avatar-preview mt-3"
                            data-tooltip="Default Image"
                          />
                        ))}
                      </div>
                    </div>
                    <button className="login-button mt-2 mb-2">
                      <span style={{ color: "black" }}>Create Product</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminCreateProduct;