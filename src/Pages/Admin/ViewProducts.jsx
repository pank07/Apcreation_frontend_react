import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Searchslice";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../Redux/Actions/productActions";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Sidebar from "./Sidebar";
import { baseUrl } from "../../UrlHelper/baseUrl";
import Autocomplete from "@mui/material/Autocomplete";
import "../../Styling/AdminDashboard.css";
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import { Button } from "@mui/material";

import { toast } from "react-toastify";
import { ADMIN_DELETE_PRODUCTS_RESET } from "../../Redux/Constants/productConstants";
import { styled, lighten, darken } from "@mui/system";
import { Autocomplete as MuiAutocomplete } from "@mui/material";
const ViewProducts = () => {
  const [categories, setCategories] = useState([]);

  const [searchdata, setSearchSata] = useState("");
  const [searchData, setSearchData] = useState("");
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
  const options = categories.map((category) => {
    const firstLetter = category.category[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      title: category.category,
      ...category,
    };
  });
  const { products, loading } = useSelector((state) => state.products);
  const { error, isDeleted } = useSelector((state) => state.updateProduct);
  const dispatch = useDispatch();
  // const [sortModel, setSortModel] = useState([{ field: "name", sort: "asc" }]);
  const navigate = useNavigate();
  const filteredProducts = products
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchData.toLowerCase()) || // Case-insensitive name search
        item.category.name.toLowerCase().includes(searchData.toLowerCase()) // Case-insensitive category search
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  const rows = filteredProducts.map((item,index) => ({
    id: item._id,
    displayID: `ap_product_${String(index + 1).padStart(2, "0")}`,
    name: item.name,
    image: item.images,
    stock: item.stock|| 0,
    price: item.price,
    category: item.category.name,
    created_at: String(item?.createdAt).substring(0, 10),
  }));
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      field: "displayID",
      headerName: "Product ID",
      minWidth: 200,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "image",
      headerName: "Image",
      minWidth: 150,
      flex: 1,
      cellClassName: "order-column",
      renderCell: (params) => (
        <img
          src={params.value?.[0] || "/path/to/placeholder.jpg"}
          alt="Product"
          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "category",
      headerName: "category",
      minWidth: 300,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 100,
      flex: 0.5,
      cellClassName: "order-column",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      cellClassName: "order-column",
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 150,
      flex: 0.5,
      cellClassName: "order-column",
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      cellClassName: "order-column",
      renderCell: (params) => {
        return (
          <>
            <Button>
              <Link to={`/admin/all-products/product/${params.row.id}`}>
                <img src={EditIcon} className="products-func-img" alt="" />
              </Link>
            </Button>

            <Button onClick={() => deleteProductHandler(params.row.id, "id")}>
              <img src={DeleteIcon} className="products-func-img" alt="" />
            </Button>
          </>
        );
      },
    },
  ];

  // const rows = [];

  // products &&
  //   products.forEach((item,index) => {
  //     rows.push({
  //       id: `ap_product_${String(index + 1).padStart(2, "0")}`,
  //       // id:item._id,
  //       name: item.name,
  //       stock: item.stock ?? 0,
  //       price: item.price,
  //       category: item.category.name,
  //       created_at: String(item?.createdAt).substring(0, 10),
  //     });
  //   });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully!!");
      navigate("/admin/all-products");
      dispatch({ type: ADMIN_DELETE_PRODUCTS_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, isDeleted, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <div className="container">
            {/* Search Bar & Title in a Single Line */}
            <div className="d-flex align-items-center justify-content-between mt-3">
              {/* Search Bar */}

              {/* Title */}
              <h2 className="text-dark m-0">All Products</h2>
              <div className="search-container" style={{ width: "19%" }}>
                <div
                  className="search-input-container d-flex align-items-center border rounded px-2 bg-white shadow-sm"
                  style={{ width: "220px", height: "35px" }}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control border-0 shadow-none"
                    style={{
                      color: "#333",
                      fontSize: "14px",
                      height: "100%",
                      paddingLeft: "8px",
                    }}
                    aria-label="Search Products"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                  />
                  <button
                    className="btn border-0 p-1 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <i className="fa-solid fa-magnifying-glass text-muted"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="view-product-container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-10 col-md-12">
                <div className="order-data-card user-card-full">
                  <div className="row">
                    {filteredProducts.length > 0 ? (
                      <div style={{ height: "100%", width: "100%" }}>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          disableRowSelectionOnClick
                          autoHeight
                          pageSizeOptions={[10]}
                          // sortModel={sortModel} // Apply sorting model
                          // onSortModelChange={(model) => setSortModel(model)} // Update sorting state
                        />
                      </div>
                    ) : (
                      <div className="empty-cart">
                        <strong>No Products Found 🤷‍♂️</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewProducts;
