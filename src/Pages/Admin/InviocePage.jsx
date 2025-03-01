import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleOrderDetails } from "../../Redux/Actions/orderActions";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
// import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Aplogo from "../../assets/AP-Creation-final-logo-2 (1).png";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const InvoicePage = () => {

  const { orderId } = useParams();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const invoiceRef = useRef();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (orderId) {
      dispatch(singleOrderDetails(orderId)); // Fetch order details when orderId changes
    }
  }, [dispatch, error, orderId]);

  useEffect(() => {
    if (order && order.order) {
      setIsReady(true); // Set ready state once the order is available
    }
  }, [order]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const handleDownload = () => {
    if (!order || !order.order) {
      toast.error("Invoice data is not available yet.");
      return;
    }
    console.log("order", order);
  
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("helvetica", "bold");
  
    // Add logo (Ensure Aplogo is properly imported and available as a Base64 image)
    if (Aplogo) {
      pdf.addImage(Aplogo, "PNG", 80, 10, 60, 20); // Adjust position & size
    }
  
    // // Title
    // pdf.setFontSize(18);
    // // pdf.text("Invoice", , 40, { align: "center" });
  
    // // Order Details
    // pdf.setFontSize(12);
    // pdf.setFont("helvetica", "normal");
    // pdf.text(`Order ID: ${order?.order?.paymentInfo?.id || "N/A"}`, 15, 50);
    // pdf.text(
    //   `Date: ${order?.order?.paymentInfo?.createdAt
    //     ? new Date(order.order.paymentInfo.createdAt).toLocaleString()
    //     : "N/A"
    //   }`,
    //   15,
    //   60
    // );
  
    // // Customer Details
    // pdf.setFont("helvetica", "bold");
    // pdf.text("Customer Details:", 15, 70);
    // pdf.setFont("helvetica", "normal");
    // pdf.text(`Name: ${order?.order?.user?.name || "N/A"}`, 15, 80);
    // pdf.text(`Email: ${order?.order?.user?.email || "N/A"}`, 15, 90);
  
    // // Shipping Info
    // pdf.setFont("helvetica", "bold");
    // pdf.text("Shipping Information:", 15, 100);
    // pdf.setFont("helvetica", "normal");
    // pdf.text(
    //   `Address: ${order?.order?.shippingInfo?.address || "N/A"}, ${order?.order?.shippingInfo?.city || "N/A"}, 
    //    ${order?.order?.shippingInfo?.state || "N/A"}, ${order?.order?.shippingInfo?.country || "N/A"}`,
    //   15,
    //   110,
    //   { maxWidth: 180 }
    // );
    // pdf.text(`Pin Code: ${order?.order?.shippingInfo?.pinCode || "N/A"}`, 15, 120);
    // pdf.text(`Phone: ${order?.order?.shippingInfo?.phoneNo || "N/A"}`, 15, 130);
    pdf.setFontSize(18);
pdf.text("Invoice", 105, 40, { align: "center" });

// Order Details
pdf.setFontSize(12);
pdf.setFont("helvetica", "normal");
pdf.text(`Order ID: ${order?.order?.paymentInfo?.id || "N/A"}`, 15, 50);
pdf.text(
  `Date: ${order?.order?.paymentInfo?.createdAt
    ? new Date(order.order.paymentInfo.createdAt).toLocaleString()
    : "N/A"
  }`,
  15,
  60
);

// Customer Details (Left Side)
pdf.setFont("helvetica", "bold");
pdf.text("Customer Details:", 15, 80);
pdf.setFont("helvetica", "normal");
pdf.text(`Name: ${order?.order?.user?.name || "N/A"}`, 15, 90);
pdf.text(`Email: ${order?.order?.user?.email || "N/A"}`, 15, 100);

// Shipping Information (Right Side)
pdf.setFont("helvetica", "bold");
pdf.text("Shipping Information:", 110, 80); // Shifted right
pdf.setFont("helvetica", "normal");
pdf.text(
  `Address: ${order?.order?.shippingInfo?.address || "N/A"}, ${order?.order?.shippingInfo?.city || "N/A"}, 
  ${order?.order?.shippingInfo?.state || "N/A"}, ${order?.order?.shippingInfo?.country || "N/A"}`,
  110,
  90,
  { maxWidth: 90 } // Adjust width for text wrapping
);
pdf.text(`Pin Code: ${order?.order?.shippingInfo?.pinCode || "N/A"}`, 110, 120);
pdf.text(`Phone: ${order?.order?.shippingInfo?.phoneNo || "N/A"}`, 110, 130);

  
    // Order Status
    pdf.setFont("helvetica", "bold");
    pdf.text("Order Summary:", 15, 140);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Order Status: ${order?.order?.paymentInfo?.orderStatus || "N/A"}`, 15, 150);
    pdf.text(`Payment Status: ${order?.order?.paymentInfo?.status || "N/A"}`, 15, 160);
    pdf.text(`Total Price: Rs${order?.order?.paymentInfo?.totalPrice || "0.00"}`, 15, 170);

    // Check if orderItems exist
    const orderItems = order?.order?.orderItems;
    if (!orderItems || orderItems.length === 0) {
      toast.error("No items found in the order.");
      return;
    }
  
    // Table Headers
    const tableColumn = ["Product", "Price", "Quantity"];
    const tableRows = [];
  
    orderItems.forEach((item) => {
      tableRows.push([item.name || "N/A", `  ${item.price || "0.00"}`, item.quantity || "0"]);
      
    });
  
    // Add Table
    pdf.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 180,
      styles: { fontSize: 10 },
    });
  
    // Save PDF
    pdf.save(`Invoice_${order?.order?.paymentInfo?.id || "N/A"}.pdf`);
    
  };
  
  

  // 📌 PRINT FUNCTION (Hide header & footer)
  const handlePrint = () => {
    const printContent = invoiceRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // 📌 Styles
  const styles = {
    page: {
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f8f9fa",
    },
    buttonsContainer: {
      textAlign: "right",
      marginBottom: "20px",
    },
    button: {
      marginRight: "10px",
      padding: "8px 12px",
      backgroundColor: "#ff5722",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
    },
    buttonHover: {
      backgroundColor: "#e64a19",
    },
    invoiceContainer: {
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#fff",
      color: "#333",
    },
    logo: {
      width: "150px",
      marginBottom: "10px",
    },
    section: {
      marginBottom: "20px",
    },
    sectionHeader: {
      fontWeight: "bold",
      marginBottom: "10px",
    },
    list: {
      listStyle: "none",
      paddingLeft: "0",
      backgroundColor: "#f1f1f1",
      padding: "10px",
      borderRadius: "5px",
    },
    listItem: {
      padding: "10px",
      borderBottom: "1px solid #ccc",
      fontWeight: "bold",
      color: "#333",
      display: "flex",
      alignItems: "center",
    },
    listItemImage: {
      width: "50px",
      height: "50px",
      marginRight: "10px",
      objectFit: "cover",
    },
    printStyles: `@media print {
      body * {
        visibility: hidden;
      }
      #invoiceRef, #invoiceRef * {
        visibility: visible;
      }
      #invoiceRef {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
    }`,
  };

  return (
    <div style={styles.page}>
      {/* Inject print styles */}
      <style>{styles.printStyles}</style>

      {/* Buttons for Print & Download */}
      <div style={styles.buttonsContainer}>
        <button
          style={styles.button}
          onClick={handlePrint}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Print Invoice
        </button>
        <button
          style={styles.button}
          onClick={handleDownload}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Download PDF
        </button>
      </div>

      {/* Invoice Content */}
      {isReady && (
        <div ref={invoiceRef} id="invoiceRef" style={styles.invoiceContainer}>
          <div style={styles.section}>
            <img
              src={Aplogo}
              alt="AP Creation Logo"
              style={styles.logo}
            />
          </div>

          <h2>Invoice for Order {order?.order?._id}</h2>

          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>Billing Details</h3>
            <p><strong>Address:</strong> {order?.order?.shippingInfo?.city}</p>
            <p><strong>City:</strong> {order?.order?.shippingInfo?.city}, {order?.order?.shippingInfo?.state}</p>
            <p><strong>Phone:</strong> {order?.order?.shippingInfo?.phoneNo}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>Order Details</h3>
            <p><strong>Status:</strong> {order?.order?.paymentInfo?.orderStatus}</p>
            <p><strong>Total Amount:</strong> ₹{order?.order?.paymentInfo?.totalPrice}</p>
          </div>

          <h4>Items:</h4>
          <ul style={styles.list}>
            {order?.order?.orderItems?.map((item) => (
              <li key={item._id} style={styles.listItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.listItemImage}
                />
                {item.name} (x{item.quantity}) - ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
