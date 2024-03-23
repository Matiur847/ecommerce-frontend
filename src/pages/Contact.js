import React from "react";
import "../style/Contact.css";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet/Helmet";

const Contact = () => {
  const navigate = useNavigate();
  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("Message Send!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/");
  };

  return (
    <Helmet title="Contact">
      <div className="contact-section">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col md="6 ">
              <div className="contact-container d-flex align-items-center justify-content-center">
                <form onSubmit={handleContactSubmit}>
                  <h3>Contact Us</h3>
                  <input
                    type="name"
                    placeholder="Enter Your Name"
                    required
                  />{" "}
                  <br />
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                  />{" "}
                  <br />
                  <textarea name="" placeholder="text" required></textarea>
                  <button className="login-btn contactBtn">Contact Us</button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default Contact;
