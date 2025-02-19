import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAdminAllUsers } from "../../Redux/Actions/userActions";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "../../Styling/AdminDashboard.css";
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../components/Loader";
import { clearErrors } from "../../Redux/Actions/productActions";
import { toast } from "react-toastify";
import { ADMIN_DELETE_USER_RESET } from "../../Redux/Constants/userConstants";

const AdminAllUsers = () => {
  const { users, loading } = useSelector((state) => state.allUsers);
  const { error, isDeleted } = useSelector((state) => state.updateUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  const columns = [
    {
      field: "DisplayID",
      headerName: "User ID",
      minWidth: 250,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "email",
      headerName: "Email Address",
      minWidth: 250,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
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
              <Link to={`/admin/all-users/user/${params.row.id}`}>
                <img src={EditIcon} className="products-func-img" alt="" />
              </Link>
            </Button>

            <Button onClick={() => deleteUserHandler(params.row.id, "id")}>
              <img src={DeleteIcon} className="products-func-img" alt="" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((user,index) => {
      rows.push({
         id: user._id,
        DisplayID: `Ap_User_${String(index + 1).padStart(2, "0")}`,
        role: user.role,
        email: user.email,
        name: user.name,
        created_at: String(user?.createdAt).substring(0, 10),
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("User Details Deleted Successfully!!");
      navigate("/admin/dashboard");
      dispatch({ type: ADMIN_DELETE_USER_RESET });
    }

    dispatch(getAdminAllUsers());
  }, [dispatch, error, isDeleted, navigate]);

  return (
    <>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <div className="container">
            <h2 style={{color:"black"}}>All Users</h2>
          </div>
          <div className="view-product-container">
            <div className="row d-flex justify-content-center ">
              <div className="col-xl-10 col-md-12">
                <div className="order-data-card user-card-full ">
                  <div className="row">
                    {users.length > 0 ? (
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
                        <strong>No User Details Found 🤷‍♂️</strong>
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

export default AdminAllUsers;
