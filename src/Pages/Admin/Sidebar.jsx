import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../../Redux/Actions/userActions";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import TocIcon from "@mui/icons-material/Toc";
import PeopleIcon from "@mui/icons-material/People";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const drawerWidth = 240;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(LogOutUser());
    navigate("/login");
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const adminRoutes = [
    { name: "Dashboard", redirect: "/admin/dashboard", icon: <DashboardIcon /> },
    { name: "All Products", redirect: "/admin/all-products", icon: <ShoppingCartIcon /> },
    { name: "Create Products", redirect: "/admin/all-products/create", icon: <AddIcon /> },
    { name: "All Orders", redirect: "/admin/all-orders", icon: <TocIcon /> },
    { name: "All Users", redirect: "/admin/all-users", icon: <PeopleIcon /> },
    { name: "Reviews", redirect: "/admin/all-reviews", icon: <ReviewsIcon /> },
    { name: "Add Banner", redirect: "/admin/banner", icon: <AddCircleIcon /> },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Navbar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#1b1b1b",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ marginRight: 2, color: "red" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>

          {/* Logout Button */}
          <IconButton
            onClick={handleLogout}
            sx={{
              backgroundColor: "#4CAF50",
              // borderRadius: "100%",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              position: "absolute",
              right: "20px",
              top:"20px",
              // bottom: "20px",
              "&:hover": { contain:"logout",backgroundColor: "red" },
            }}
          >
            <LogoutIcon sx={{ fontSize: 20, color: "white" }} />
          </IconButton>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1b1b1b",
              color: "white",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", color: "white" }}>
            <List>
              <Link to="/" style={{ textDecoration: "none" }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={toggleDrawer}>
                    <ListItemIcon style={{ color: "#fff" }}>
                      <img
                        src="https://i.ibb.co/ngRy5GJ/logo-ecommerce.png"
                        alt="Home"
                        style={{ width: 30, height: 30 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
              </Link>
              {adminRoutes.map((route, index) => (
                <Link to={route.redirect} key={index} style={{ textDecoration: "none" }}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={toggleDrawer}>
                      <ListItemIcon style={{ color: "#fff" }}>{route.icon}</ListItemIcon>
                      <ListItemText primary={route.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
