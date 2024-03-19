import React from "react";
import "../style/Dashboard.css";
import SidebarAdmin from "./SidebarAdmin";

import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { MdCreateNewFolder } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Dashboard = () => {
  const routes = [
    {
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUser />,
    },
    {
      name: "Products",
      icon: <AiTwotoneFileExclamation />,
      subRoutes: [
        {
          path: "/admin/products",
          name: "All Products",
          icon: <LuExternalLink />,
        },
        {
          path: "/admin/create",
          name: "Create Product",
          icon: <MdCreateNewFolder />,
        },
      ],
    },
    {
      path: "/admin/orders",
      name: "Order",
      icon: <BsCartCheck />,
    },
  ];
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <div>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  ADMIN
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarAdmin
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        {/* <main>{children}</main> */}
      </div>
    </div>
  );
};

export default Dashboard;
