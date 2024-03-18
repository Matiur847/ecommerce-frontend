import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <Helmet title="Login">
      <div className="loginComp">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col
              md="6"
              className="d-flex align-items-center justify-content-center"
            >
              <div className="login-container text-center">
                <div className="login-sectino">
                  <div className="login-title">
                    <p>Success</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form>
                      <i
                        style={{ fontSize: "50px", color: "red" }}
                        className="ri-checkbox-circle-line"
                      ></i>
                      <h3>Order has been placed Successfully!</h3>
                      <Link to="/orders">
                        <input className="login-btn" type="submit" value="View Orders" />
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default Success;
