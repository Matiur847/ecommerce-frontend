import React, { useEffect } from "react";
import "../style/Dashboard.css";

import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";

import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
} from "chart.js";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../store/adminProducts/adminProductSlice";
import HashLoader from "react-spinners/HashLoader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement, //요기
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { adminProducts, status, error } = useSelector(
    (state) => state.adminAllProduct
  );
  const { adminOrders } = useSelector((state) => state.adminOrderList);
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  let outOfStock = 0;

  adminProducts.products?.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });


  const bannerData = [
    {
      logo: <i>{adminProducts.products?.length}</i>,
      title: "Products",
      path: "/admin/products",
    },

    {
      logo: <i>{adminOrders.orders?.length}</i>,
      title: "Orders",
      path: "/admin/orders",
    },

    {
      logo: <i>7</i>,
      title: "Users",
      path: "/admin/users",
    },
  ];

  const data = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, adminProducts.products?.length - outOfStock],
      },
    ],
  };

  let asyncData;
  if (status === "loading") {
    asyncData = (
      <div className="loading-spinner">
        <HashLoader color="#000000" />
      </div>
    );
  } else if (status === "succeeded") {
    asyncData = (
      <div>
        <div className="main-container">
          <SideBar />
          <Container>
            <Row>
              {bannerData.map((item, index) => (
                <Col lg="4" md="4" sm="6" xs="6" key={index}>
                  <Link to={item.path} className="admin-banner-details">
                    <h4 className="category-item d-flex align-items-center justify-content-center gap-3">
                      <div className="category-img">{item.logo}</div>
                      <div className="category-title">
                        <h6>{item.title}</h6>
                      </div>
                    </h4>
                  </Link>
                </Col>
              ))}
            </Row>
            <Row className="mt-4 mb-5">
              <Col md="6">
                <div className="line-chart">
                  <Line data={data} />
                </div>
              </Col>
              <Col md="6">
                <div className="line-chart-doughnut">
                  <Doughnut data={doughnutState} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  } else if (status === "failed") {
    asyncData = <h1 className="network-error">{error}</h1>;
  }

  return <Helmet title="ADMIN Dashboard">{asyncData}</Helmet>;
};

export default Dashboard;
