import {useEffect,useState,React}  from "react";
import "../../Styling/AdminDashboard.css";
import Money from "../../assets/payment.png";
import User from "../../assets/user.png";
import { baseUrl } from "../../UrlHelper/baseUrl";
import PriceRange from "../../assets/priceRange.png";
import Cart from "../../assets/cart.png";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import axios from "axios";

const AdminDashboard = () => {
  // const { products } = useSelector((state) => state.products);
  // const { orders, totalAmount } = useSelector((state) => state.allOrders);
  // const { users } = useSelector((state) => state.allUsers);

  const [products, setTotalProducts] = useState(0); // Local state for total products
  const [orders, setTotalOrders] = useState(0); // Local state for total orders
  const [totalAmount, setTotalAmount] = useState(0); // Local state for total amount
  const [users, setTotalUsers] = useState(0); // Local state for total users



  useEffect(() => {
    // Fetch total products count
    const fetchTotalProducts = async () => {
      console.log("hello insise function")
      try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const response = await axios.get(`${baseUrl}/admin/countProduct`,config); // Replace with actual API
        // console.log("Products Resons eis",response)\

        // const response = await axios.get("/admin/countProduct"); // Adjust the API endpoint
        setTotalProducts(response.data.totalProducts); // Set the state with the total product count
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // // Fetch total orders count
    const fetchTotalOrders = async () => {
      try {
        const config = { headers:{
          'Content-Type': 'application/json'},  };
        const response = await axios.get(`${baseUrl}/admin/countOrders`,config); // Replace with actual API
        // const response = await axios.get("/admin/countOrders"); // Adjust the API endpoint
        setTotalOrders(response.data.totalOrders); // Set the state with the total orders count
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Fetch total amount
    const fetchTotalAmount = async () => {
      try {
        const config = { headers:{
          'Content-Type': 'application/json'},  };
        const response = await axios.get(`${baseUrl}/admin/totalAmount`,config); // Replace with actual API
        // const response = await axios.get("/admin/totalAmount"); // Adjust the API endpoint
        setTotalAmount(response.data.totalAmount); // Set the state with the total amount
      } catch (error) {
        console.error("Error fetching amount:", error);
      }
    };

    // // Fetch total users count
    const fetchTotalUsers = async () => {
      try {
        const config = { headers:{
          'Content-Type': 'application/json'},  };
    const response = await axios.get(`${baseUrl}/admin/countUser`,config); // Replace with actual API
        // const response = await axios.get("/admin/countUsers"); // Adjust the API endpoint
        setTotalUsers(response.data.totalUsers); // Set the state with the total users count
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Call all the fetch functions
    fetchTotalProducts();
    fetchTotalOrders();
    fetchTotalAmount();
    fetchTotalUsers();
  }, []); // Empty dependency array to run only on component mount



console.log("idsjfhgijndfsighn",products);

  
  const dataPackets = [
    {
      id: 1,
      img: PriceRange,
      heading: products,
      about: "Total Products",
    },
    {
      id: 2,
      img: Cart,
      heading: orders,
      about: "Total Orders",
    },
    {
      id: 3,
      img: User,
      heading:  users,
      about: "Total Users",
    },
    {
      id: 4,
      img: Money,
      heading: totalAmount ? totalAmount : "0",
      about: "Total Amount",
    },
  ];

  const heandeler = () => {
    

  }

  return (
    <>
      <Sidebar />
      <div className="container">
        <h2 style={{color:"black"}}>Admin Dashboard</h2>
    
        <div className="container text-center features mt-5">
          <div className="row">
            {dataPackets.map((data) => (
              <div className="mt-1 col-lg-3 col-md-2 col-sm-6" key={data.id}>
                <img src={data.img} alt={data.img} />
                <p className="mt-4" style={{color:"#15949D"}}>{data.heading}</p>
                <b className="fs-5" style={{color:"#15949D"}}>{data.about}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="card doughnut-container" style={{visibility:"hidden"}}>
          <div className="card-header py-3 cart-heading-container">
            <h5 className="mb-0 cart-heading">TOTAL AMOUNT CHART</h5>
          </div>
        </div>

        <div className="card doughnut-container" style={{visibility:"hidden"}}>
          <div className="card-header py-3 cart-heading-container">
            <h5 className="mb-0 cart-heading">TOTAL AMOUNT CHART</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;