import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routes from "../../routes/Routers";
import IsAuthUser from "../../pages/IsAuthUser";
import { useSelector } from "react-redux";

const Layout = () => {
  const { user } = useSelector((state) => state.user);

  // globalSpeedDial

  return (
    <div>
      <Header />
      <div>
        <div className="globalSpeedDial">
          {user?.user ? <IsAuthUser user={user} /> : ""}
        </div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
