import React, { useEffect, useState } from "react";
import "../style/Home.css";
import Helmet from "../components/Helmet/Helmet";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "./Carousel";
import Product from "./Product";

const Home = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4242/api/v1/products")
      .then((data) => {
        setProducts(data.data.allProduct);
      })
      .catch((error) => console.log("Error", error.message));
  }, []);

  const bannerData = [
    {
      logo: <i className="ri-truck-line"></i>,
      title: "Fee Delivery",
      para: "product all over price $25",
    },

    {
      logo: <i className="ri-text-wrap"></i>,
      title: "90 days return",
      para: "For all users",
    },

    {
      logo: <i className="ri-secure-payment-line"></i>,
      title: "Secure Payment",
      para: "100% secure payment",
    },

    {
      logo: <i className="ri-questionnaire-line"></i>,
      title: "24/7 support",
      para: "Delivery support",
    },
  ];

  return (
    <Helmet title="Home">
      <div className="home-container">
        <Container>
          <div className="carousel">
            <Carousel />
          </div>
          <Row>
            {bannerData.map((item, index) => (
              <Col lg="3" md="4" sm="6" xs="6" key={index}>
                <div className="category-item d-flex align-items-center gap-3">
                  <div className="category-img">{item.logo}</div>
                  <div className="category-title">
                    <h6>{item.title}</h6>
                    {/* <p>{item.para}</p> */}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="products">
            <Product products={products} />
          </div>
        </Container>
      </div>
    </Helmet>
  );
};

export default Home;
