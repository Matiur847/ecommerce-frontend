import React from "react";
import "../../style/Footer.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <Container fluid>
        <Row>
          <Col md="4">
            <div className="contact-us">
              <h3>Get In Touch</h3>
              <p>
                MOBILE: <span>+8801855110342</span>
              </p>
              <p>
                EMAIL: <span>firojkobirlimon@gmail.com</span>
              </p>
            </div>
          </Col>
          <Col md="4">
            <div className="contact-us contactUs2">
              <h3>Standing Here</h3>
              <p>
                Location: <span>Dolar Dorga, Nawabganj</span>
              </p>
              <p>
                <span>Dolar Dorga, 3637</span>
              </p>
            </div>
          </Col>
          <Col md="4">
            <div className="follow-us followUs text-center">
              <h3>Follow Us</h3>
              <Link to={"https://www.facebook.com/groups/1050660045505643/"}>
                <i className="ri-facebook-circle-fill"></i>
              </Link>
              <Link to={"https://www.facebook.com/groups/1050660045505643/"}>
                <i className="ri-twitter-fill"></i>
              </Link>
              <Link to={"https://www.facebook.com/groups/1050660045505643/"}>
                <i className="ri-instagram-fill"></i>
              </Link>
            </div>
          </Col>
          <div className="copyRight">
            <p>© 2024 Birampur, Dinajpur. All rights reserved</p>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
