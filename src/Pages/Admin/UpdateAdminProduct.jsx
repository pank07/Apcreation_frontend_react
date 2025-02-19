import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../UrlHelper/baseUrl";
import { toast } from "react-toastify";
import { ADMIN_UPDATE_PRODUCTS_RESET } from "../../Redux/Constants/productConstants";
import { updateNewProduct } from "../../Redux/Actions/productActions";

const UpdateAdminProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUpdated } = useSelector((state) => state.updateProduct);
  const [itemDetails, setItemDetails] = useState({});

  const productCategories = [
    "Travelling Articles",
    "Glass Shree Charan",
    "Calendars",
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

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product/${id}`);
        const data = response.data;
        if (data.success) {
          setItemDetails(data.getProduct);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productImage, setProductImage] = useState([]);
  const [oldProductImage, setOldProductImage] = useState([]);
  const [productImagePreview, setProductImagePreview] = useState([]);
  const [productCategory, setProductCategory] = useState("");

  useEffect(() => {
    setProductName(itemDetails.name);
    setProductDesc(itemDetails.description);
    setProductPrice(itemDetails.price);
    setProductQuantity(itemDetails.Stock);
    setProductCategory(itemDetails.category?.name);
    setProductCategory(itemDetails.category?.name);
    setOldProductImage(itemDetails.images);

    if (isUpdated) {
      toast.success("Product Updated Successfully!!");
      navigate("/admin/all-products");
      dispatch({ type: ADMIN_UPDATE_PRODUCTS_RESET });
    }
  }, [
    itemDetails.name,
    itemDetails.description,
    itemDetails.price,
    itemDetails.Stock,
    itemDetails.category,
    itemDetails.images,
    isUpdated,
    navigate,
    dispatch,
  ]);

  const updateProductHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", productName);
    form.append("description", productDesc);
    form.append("price", productPrice);
    form.append("Stock", productQuantity);
    form.append("category[name]", productCategory);
    // form.append("category[name]", productsubcategory);
    productImage.forEach((img) => {
      form.append("images", img);
    });

    dispatch(updateNewProduct(id, form));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setProductImage([]);
    setProductImagePreview([]);
    setOldProductImage([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductImagePreview((old) => [...old, reader.result]);
          setProductImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center login-container">
          <div className="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
            <div className=" mt-md-5">
              <h1 className="login-system-register">Update Product</h1>
              <form className="pt-2" onSubmit={updateProductHandler}>
                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Product Name
                  </label>
                  <input type="text"  required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product Name"
                    className="login-input"/>
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Description
                  </label>
                  <textarea  type="text"  required
                    rows={5}
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    placeholder="Add Product Description"
                    className="login-input"/>
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Enter Price
                  </label>
                  <input type="number"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Enter Price"
                    className="login-input" />
                </div>
                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Enter Tax
                  </label>
                  <input type="number"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Enter Price"
                    className="login-input" />
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Enter Stock
                  </label>
                  <input type="number" value={productQuantity} required
                   onChange={(e) => setProductQuantity(e.target.value)}
                    placeholder="Enter Product Quantity"
                    className="login-input" />
                </div>

                <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Select Category
                  </label>
                  <select  placeholder="Select Category"
                    className="login-input"
                    value={productCategory}
                    style={{ color: "black" }}
                    onChange={(e) => setProductCategory(e.target.value)}>
                    {productCategories &&
                      productCategories.map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                  </select>
                </div>
                {/* <div className="d-flex flex-column pb-3">
                  <label for="email" className="login-text">
                    Enter Sub-category
                  </label>
                  <input type="number" value={productsubcategory} required
                   onChange={(e) => setProductQuantity(e.target.value)}
                    placeholder="Enter Product Quantity"
                    className="login-input" />
                </div> */}
                <div className="d-flex flex-column pb-3">
                  <label for="avatar" className="login-text">
                    Upload Images
                  </label>
                  <div className="avatar-preview-container">
                    <input
                      type="file"
                      className="avatar-input"
                      onChange={updateProductImagesChange}
                      accept="image/*"
                      multiple
                    />
                  </div>
                  <div>
                    {oldProductImage &&
                      oldProductImage.map((image, i) => (
                        <img src={image.url}
                          alt="Old Product Img"
                          key={i}
                          className="avatar-preview mt-3"
                          data-tooltip="Default Image"
                        />
                      ))}
                  </div>

                  <div>
                    {productImagePreview &&
                      productImagePreview.map((image, i) => (
                        <img src={image} alt={i} key={i} className="avatar-preview mt-3"
                          data-tooltip="Default Image" />
                      ))}
                  </div>
                </div>

                <button className="login-button mt-4">
                  <span>Update Product</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAdminProduct;
