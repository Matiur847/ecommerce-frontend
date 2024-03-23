import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineFindInPage } from "react-icons/md";

const RouteNotFound = () => {
  return (
    <Helmet title="Not Found 404">
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
                    <p>Not Found 404</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <Link to="/">
                      <MdOutlineFindInPage style={{fontSize: '70px', color: "red"}} />
                      <input className="login-btn mt-3" type="submit" value="Home" />
                    </Link>
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

export default RouteNotFound;
