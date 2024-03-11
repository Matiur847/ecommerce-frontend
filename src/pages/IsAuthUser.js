import React, { useState } from "react";
import "../style/IsAuthUser.css";
import SpeedDial from "@mui/material/SpeedDial";
import profileUser from "../img/profile-user.png";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedOut } from "../store/userSlice/userSlice";
import { toast } from "react-toastify";

const IsAuthUser = ({ user }) => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  const dialOption = [
    { icon: <i className="ri-list-check-3"></i>, name: "Orders", func: orders },
    { icon: <i className="ri-account-circle-line"></i>, name: "Profile", func: account },
    {
      icon: (
        <i className="ri-luggage-cart-fill" style={{ color: 'cartItems.length' > 0 ? "tomato" : "unset" }}></i> 
      ),
      name: `Cart(${'cartItems.length'})`,
      func: cart,
    },
    { icon: <i className="ri-logout-box-line"></i>, name: "Logout", func: logoutUser },
  ];


  if (user?.user.role === "admin") {
    dialOption.unshift({
      icon: <i class="ri-dashboard-fill"></i>,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/users");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(loggedOut(null));   
    toast.success("Logout Succesfully", {
      position: "top-right",
      autoClose: 2000,
    });
  }

  return (
    <div className="IsAuthUser-section">
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          <img
            src={user.user.avatar?.url ? user.user.avatar?.url : profileUser}
            className="SpeedDialIcon "
            alt="Profile"
          />
        }
      >
        {
          dialOption.map((item, index) => (
            <SpeedDialAction  
            key={index}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            />
          ))
        }
      </SpeedDial>
    </div>
  );
};

export default IsAuthUser;
