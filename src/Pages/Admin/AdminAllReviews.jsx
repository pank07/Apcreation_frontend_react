import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  clearErrors,
  updateReviewsAdmin,
} from "../../Redux/Actions/productActions";
import "../../Styling/AdminDashboard.css";
import DeleteIcon from "../../assets/delete.png";
import { Button } from "@mui/material";

const AdminAllReviews = () => {
  const { review, loading } = useSelector((state) => state.allReviews);
  const { error, isDeleted } = useSelector((state) => state.updateOrder);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (id) => {
    // dispatch(deleteOrder(id));
  };

  const getProductReviewHandler = (e) => {
    e.preventDefault();
    updateReviewsAdmin(productId);
  };



  useEffect(() => {
    if (productId.length === 24) {
      dispatch(updateReviewsAdmin(productId));
    }
  }, [productId, dispatch]);
  
  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 250,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "name",
      headerName: "Reviewers Name",
      minWidth: 100,
      flex: 0.5,
      cellClassName: "order-column",
    },
    {
      field: "comment",
      headerName: "Reviewers Comment",
      minWidth: 100,
      type: "number",
      flex: 0.5,
      cellClassName: "order-column",
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 100,
      type: "number",
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
            <Button onClick={() => deleteReviewHandler(params.row.id, "id")}>
              <img src={DeleteIcon} className="products-func-img" alt="" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  review &&
    review.forEach((rev) => {
      rows.push({
        id: rev._id,
        name: rev.name,
        comment: rev.comment,
        rating: rev.rating,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Removed Successfully!!");
      navigate("/admin/dashboard");
      // dispatch({ type: ADMIN_DELETE_ORDER_RESET });
    }

    // dispatch(getAllAdminOrders());
  }, [dispatch, error, isDeleted, navigate]);

  return (
    <>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <div className="container admin-main-container">
            <h2 style={{color:"black"}}> All Reviews</h2>
          </div>
          <div className="view-product-container">
            <div className="row d-flex justify-content-center ">
              <div className="col-xl-10 col-md-12">
                <form className="pt-2" onSubmit={getProductReviewHandler}>
                  <div className="d-flex flex-column pb-3">
                    <label for="email" className="login-text">
                      Product Name
                    </label>
                    <input
                      type="text"
                      required
                      value={productId}
                      maxLength={24}
                      onChange={(e) => setProductId(e.target.value)}
                      placeholder="Enter Product Name"
                      className="login-input"
                    />
                  </div>
                </form>
                <div className="order-data-card user-card-full ">
                  <div className="row">
                    {review && review.length > 0 ? (
                      <div
                        style={{
                          height: "%100",
                          width: "100%",
                        }}
                      >
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          disableRowSelectionOnClick
                          autoHeight
                          pageSizeOptions={10}
                          cellClassName="grid-column"
                        />
                      </div>
                    ) : (
                      <div className="empty-cart">
                        <strong>No Reviews Data Found 🤷‍♂️</strong>
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

export default AdminAllReviews;
