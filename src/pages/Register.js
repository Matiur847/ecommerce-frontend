import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Register.css";

const Register = () => {
  return (
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
                  <p>Register</p>
                  <div className="after-margin d-flex align-items-center justify-content-center"></div>
                </div>
                <div className="login-inputField">
                  <form>
                    <input type="name" placeholder="Name" /> <br />
                    <input type="email" placeholder="Email" /> <br />
                    <input type="password" placeholder="Password" /> <br />
                    <input type="submit" className="login-btn" value="Register" />
                  </form>
                  <p className="mt-2 register-link">
                    Already Register?{" "}
                    <Link to={"/login"}>
                      <span>Login</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
