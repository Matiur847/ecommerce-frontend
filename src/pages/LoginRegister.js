import React from "react";
import "../style/LoginRegister.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginRegister = () => {

  

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
                  <p>Login</p>
                  <div className="after-margin d-flex align-items-center justify-content-center"></div>
                </div>
                <div className="login-inputField">
                  <form>
                    <input type="email" placeholder="Email" /> <br />
                    <input type="password" placeholder="Password" /> <br />
                    <p className="d-flex justify-content-start">
                      Forgot Password ?
                    </p>
                    <input type="submit" className="login-btn" value="Login" />
                  </form>
                  <p className="mt-2 register-link">
                    Not Have Account?{" "}
                    <Link to={"/register"}>
                      <span>Register</span>
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

export default LoginRegister;
