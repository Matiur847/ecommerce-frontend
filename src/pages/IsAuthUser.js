import React, { useState } from "react";
import '../style/IsAuthUser.css'
import SpeedDial from "@mui/material/SpeedDial";
import profileUser from "../img/profile-user.png";
import SpeedDialAction from '@mui/material/SpeedDialAction';

const IsAuthUser = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="IsAuthUser-section">
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={<img src={profileUser} className="SpeedDialIcon " alt="Profile" />}
      >
        <SpeedDialAction icon={<i className="ri-dashboard-fill"></i>} />
        <SpeedDialAction icon={<i className="ri-dashboard-fill"></i>} />
        <SpeedDialAction icon={<i className="ri-dashboard-fill"></i>} />
        <SpeedDialAction icon={<i className="ri-dashboard-fill"></i>} />
      </SpeedDial>
    </div>
  );
};

export default IsAuthUser;
