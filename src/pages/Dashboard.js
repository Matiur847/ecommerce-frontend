import React from "react";
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
  

  const bannerData = [
    {
      logo: <i>15</i>,
      title: "Products",
      path: "/admin/products",
    },

    {
      logo: <i>4</i>,
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
        data: [2, 10],
      },
    ],
  };
  return (
    <Helmet title="ADMIN Dashboard">
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
              <Col md='6'>
                <div className="line-chart-doughnut">
                  <Doughnut data={doughnutState} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Helmet>
  );
};

export default Dashboard;
