import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CheckPointStep from "./CheckPointStep";

const OrderConfirm = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md="12">
            <CheckPointStep activeStep={1} />
          </Col>
        </Row>
        <Row>
          <Col md="8">OrderDetails</Col>
          <Col md="4">OderSummery</Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderConfirm;
