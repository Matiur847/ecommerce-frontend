import React from "react";
import SideBar from "./SideBar";
import Helmet from "../components/Helmet/Helmet";
import {Container, Row, Col} from 'react-bootstrap'

const AdminProductList = () => {
  return (
    <Helmet title="ADMIN Products">
      <div>
        <SideBar />
        <Container>
          <Row>
            <Col md='12'></Col>
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default AdminProductList;
