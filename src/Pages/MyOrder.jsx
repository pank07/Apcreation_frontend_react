import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../components/Loader";
import { MyOrders } from "../Redux/Actions/orderActions";
import "../Styling/MyOrder.css";
import { Link } from "react-router-dom";

// import LaunchIcon from "@material-ui/icons/Launch";

const MyOrder = () => {
  const { orders, loading } = useSelector((state) => state.myOrder);
  const dispatch = useDispatch();
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: "order-column",
    },
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: "order-column",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      cellClassName: "order-column",
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      cellClassName: "order-column",
      // renderCell: (params) => {
      //   return (
      //     <Link to={`/all-orders/${params.getValue(params.id, "id")}`}>
      //       View Details
      //     </Link>
      //   );
      // },
      renderCell: (params) => {
        return (
          <Link to={`/all-orders/order/${params.row.id}`}>View Details</Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.paymentInfo.orderStatus,
        amount: item.paymentInfo.totalPrice,
      });
    });

  useEffect(() => {
    dispatch(MyOrders());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="page-container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-10 col-md-12">
                <div className="order-data-card user-card-full ">
                  <div className="row">
                    {orders.length > 0 ? (
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
                        <strong>No Orders Placed Yet 🤷‍♂️</strong>
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

export default MyOrder;
