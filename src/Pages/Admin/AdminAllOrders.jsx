import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "../../Styling/AdminDashboard.css";
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Aplogo from "../../assets/AP-Creation-final-logo-2 (1).png";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getAllAdminOrders,updateOrderStatus
} from "../../Redux/Actions/orderActions";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import { clearErrors } from "../../Redux/Actions/productActions";
import { ADMIN_DELETE_ORDER_RESET } from "../../Redux/Constants/orderConstants";
import { saveAs } from "file-saver";
import { FileText } from "react-bootstrap-icons";
const AdminAllOrders = () => {
  const { order } = useSelector((state) => state.orderDetails);
  const { orders, loading } = useSelector((state) => state.allOrders);
  const { error, isDeleted } = useSelector((state) => state.updateOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOrders, setSelectedOrders] = useState([]); // Selected order IDs
  const [bulkStatus, setBulkStatus] = useState(""); // Status for bulk update
  // const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (newSelection) => {
    console.log("Selected row IDs:", newSelection);
  
    // Match selected IDs with `rows` instead of `orders`
    const selectedOrderData = rows.filter((row) => newSelection.includes(row.id));
  
    console.log("Selected Order Data:", selectedOrderData);
    setSelectedOrders(selectedOrderData);
    //  handleDownloadSelectedInvoices();
  };
  

  const handleDownloadSelectedInvoices = () => {
    if (!selectedOrders.length) {
      toast.error("No orders selected.");
      return;
    }
  
    selectedOrders.forEach((selectedOrder) => {
      // console.log(selectedOrders);
  
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFont("helvetica", "bold");
  
      if (Aplogo) {
        pdf.addImage(Aplogo, "PNG", 80, 10, 60, 20);
      }
  
      pdf.setFontSize(18);
      pdf.text("Invoice", 15, 40);
  
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Order ID: ${selectedOrder.displayId || "N/A"}`, 15, 50);
      pdf.text(`Date: ${selectedOrder.Orderdate || "N/A"}`, 15, 60);
  
      pdf.setFont("helvetica", "bold");
      pdf.text("Customer Details:", 15, 70);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Name: ${selectedOrder.userName || "N/A"}`, 15, 80);
  
      pdf.setFont("helvetica", "bold");
      pdf.text("Order Summary:", 15, 100);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Status: ${selectedOrder.status || "N/A"}`, 15, 110);
      pdf.text(`Total Price: $${selectedOrder.amount || "0.00"}`, 15, 120);
      pdf.text(`Item Quantity: ${selectedOrder.itemQty || "0"}`, 15, 130);
  
      pdf.setFont("helvetica", "bold");
      pdf.text("Order Items:", 15, 140);
      pdf.setFont("helvetica", "normal");
  
      const tableColumn = ["Product", "Price", "Quantity"];
      const tableRows = [
        [selectedOrder.items || "N/A", `$${selectedOrder.amount || "0.00"}`, selectedOrder.itemQty || "0"],
      ];
  
      pdf.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 150,
        styles: { fontSize: 10 },
      });
  
      pdf.save(`Invoice_${selectedOrder.displayId || "N/A"}.pdf`);
    });
  };
  

  const handleBulkStatusChange = async () => {
    if (selectedOrders.length === 0) {
      toast.warn("Please select at least one order.");
      return;
    }
    if (!bulkStatus) {
      toast.warn("Please select a status.");
      return;
    }
  
    try {
      // Extract orderIds from selectedOrders
      const orderIds = selectedOrders.map(order => order.id); // Assuming _id is the orderId field in your order object
  
      // Prepare the payload with orderIds and bulkStatus
      const payload = {
        orderIds, 
        status: bulkStatus,
      };
  
      // Call the updateOrderStatus action with the payload
      await dispatch(updateOrderStatus(payload));
  
      toast.success("Orders updated successfully!");
      setSelectedOrders([]); // Clear selection after update
      dispatch(getAllAdminOrders()); // Refresh orders
    } catch (err) {
      toast.error("Failed to update orders.");
    }
  };
  

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    {
      field: "displayId",
      headerName: "Order ID",
      minWidth: 150,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "items",
      headerName: "Order Item",
      minWidth: 250,
      flex: 2,
      cellClassName: "order-column",
      renderCell: (params) => (
        <div
          style={{
            wordWrap: "break-word",
            whiteSpace: "normal",
            fontSize: "12px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "userName",
      headerName: "User Name",
      minWidth: 200,
      flex: 1.5,
      cellClassName: "order-column",
    },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 120,
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "itemQty",
      headerName: "Items Quantity",
      minWidth: 100,
      type: "number",
      flex: 0.5,
      cellClassName: "order-column",
    },
    {
      field: "amount",
      headerName: "Total Amount",
      minWidth: 120,
      type: "number",
      flex: 1,
      cellClassName: "order-column",
    },
    {
      field: "Orderdate",
      headerName: "Order Date",
      minWidth: 120,
      flex: 1.5,
      cellClassName: "order-column",
    },
    {
      field: "Invoice",
      headerName: "Invoice",
      minWidth: 100,
      flex: 1,
      cellClassName: "order-column",
      renderCell: (params) => (
        <Button>
          <Link to={`/admin/all-orders/invoice/${params.row.id}`}
          className="text-white underline flex items-center gap-[100px]"
          >
             {/* Invoice  */}   <FileText size={35} className="text-white"></FileText> 
          </Link>
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 50,
      flex: 0.5,
      cellClassName: "order-column",
      renderCell: (params) => (
        <Button>
          <Link to={`/admin/all-orders/order/${params.row.id}`}>
            <img src={EditIcon} className="products-func-img" alt="Edit" />
          </Link>
        </Button>
      ),
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((order, index) => {
      const orderDate = new Date(order.paymentInfo.createdAt);
      const formattedDate = orderDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      rows.push({
        id: order._id,
        displayId: `AP${String(index + 1001)}`,
        itemQty: order.orderItems.length,
        userName: order.userName,
        Orderdate: formattedDate,
        status: order.paymentInfo.orderStatus,
        items: order.orderItems.map((item) => item.name).join(", "),
        amount: order.paymentInfo.totalPrice,
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
      dispatch({ type: ADMIN_DELETE_ORDER_RESET });
    }

    dispatch(getAllAdminOrders());
  }, [dispatch, error, isDeleted, navigate]);

  // const downloadCSV = () => {
  //   if (!rows.length) {
  //     alert("No orders available for download!");
  //     return;
  //   }

  //   const headers =
  //     columns
  //       .filter((col) => col.field !== "actions") // Exclude actions column if needed
  //       .map((col) => col.headerName)
  //       .join(",") + "\n";

  //   const csvRows = rows
  //     .map((row) =>
  //       [
  //         row.id,
  //         row.items,
  //         row.status,
  //         row.userName,
  //         row.itemQty,
  //         row.Orderdate,
  //         row.amount,
  //       ].join(",")
  //     )
  //     .join("\n");

  //   const csvContent = headers + csvRows;

  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   saveAs(blob, "orders.csv");
  // };

  const downloadCSV = () => {
    if (!rows.length) {
      alert("No orders available for download!");
      return;
    }

    // Define headers matching the DataGrid
    const headers =
      [
        "Order ID",
        "Order Item",
        "Order Status",
        "User Name",
        "Items Quantity",
        "Order Date",
        "Total Amount",
      ].join(",") + "\n";

    // Convert rows to CSV format
    const csvRows = rows
      .map((row) =>
        [
          `"${row.displayId}"`, // Order ID (keeping consistent with display)
          `"${row.items}"`, // Order Item (wrapped in quotes in case of commas)
          `"${row.status}"`, // Order Status
          `"${row.userName}"`, // User Name
          row.itemQty, // Items Quantity (numeric, no quotes needed)
          `"${row.Orderdate}"`, // Order Date
          row.amount, // Total Amount (numeric, no quotes needed)
        ].join(",")
      )
      .join("\n");

    // Combine headers and rows
    const csvContent = headers + csvRows;

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "orders.csv");
  };
  // const handleRowSelection = (selection) => {
  //   setSelectedRows(selection);
  //   console.log("Selected Rows:", selection);
  // };
  return (
    <>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <>
        <div
  className="container"
  style={{
    display: "flex",
    alignItems: "center",

  }}
>
  <h2 style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>
    All Orders
  </h2>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
    }}
  >
    <select
      value={bulkStatus}
      onChange={(e) => setBulkStatus(e.target.value)}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
        minWidth: "150px",
      }}
    >
      <option value="">Select Status</option>
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
    </select>

    <button
      onClick={handleBulkStatusChange}
      style={{
        padding: "8px 10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        minWidth: "130px",
      }}
    >
      Update Orders
    </button>

    <button
      onClick={handleDownloadSelectedInvoices}
      style={{
        padding: "8px 10px",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        minWidth: "130px",
      }}
    >
      Download Invoices
    </button>

    <button
      onClick={downloadCSV}
      style={{
        padding: "8px 10px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        minWidth: "130px",
      }}
    >
      Download CSV
    </button>
  </div>
</div>

          <div className="view-product-container" style={{ padding: "0 20px" }}>
            <div className="row d-flex justify-content-center">
              <div className="col-xl-10 col-md-12">
                <div className="order-data-card user-card-full">
                  <div className="row">
                    {orders.length > 0 ? (
                       <div style={{ height: "100%", width: "100%" }}>
                       <DataGrid
                         sx={{
                           "& .MuiDataGrid-toolbarFilterButton": { color: "white !important" },
                           "& .MuiButtonBase-root.MuiIconButton-root": { color: "white !important" },
                         }}
                         style={{ color: "white" }}
                         rows={rows}
                         columns={columns}
                         pageSize={10}
                         rowsPerPageOptions={[5, 10, 20]}
                         disableRowSelectionOnClick
                         cellClassName="grid-column"
                         checkboxSelection
                         onRowSelectionModelChange={handleRowSelection}
                         loading={loading}
                       />
                     </div>
                    ) : (
                      <div className="empty-cart">
                        <strong>No Orders Data Found 🤷‍♂</strong>
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

export default AdminAllOrders;
