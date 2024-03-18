import React, { useEffect } from "react";
import "../style/CompleteOrderDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetails } from "../store/orderDetailsSlice/orderDetailsSlice";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";
import laptop from "../img/laptop.jpg";

const CompleteOrderDetails = () => {
  const dispatch = useDispatch();
  const { order, status, error } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);
  console.log(order);
  const id = useParams();

  useEffect(() => {
    dispatch(orderDetails(id));
  }, [dispatch, id]);

  let data;
  if (status === "loading") {
    data = (
      <div className="loading-spinner">
        <HashLoader color="#000000" />
      </div>
    );
  } else if (status === "succeeded") {
    data = (
      <Row>
        <Col md="6">
          <div className="order-shipping-info">
            <div className="shipping-address">
              <h3>Order #{order.order._id}</h3>
              <h4 className="mt-5">Shipping Address</h4>
              <div className="shipping-address-details">
                <p>Name: {user.user?.name}</p>
                <p>Phone: {order.order.shippingInfo.phoneNo}</p>
                <p>Address: {order.order.shippingInfo.address}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="order-cart-items">
            <h4>Your Order Items {`(৳${order.order.totalPrice})`}</h4>
            <div className="order-confirm-product-details">
              {order.order &&
                order.order.orderItems.map((item, index) => (
                  <div
                    className="order-confirm-single-order d-flex justify-content-between"
                    key={index}
                  >
                    <div className="img d-flex gap-3 align-alitem-center text-center">
                      <img className="w-25" src={laptop} alt="" />
                      <p className="d-flex align-items-center confirm-product-name">
                        {item.name}
                      </p>
                    </div>
                    <div className="order-confirm-right">
                      <p>
                        Quantity: <span>{item.quantity}x</span>
                      </p>
                      <p>
                        Price: <span>{item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    );
  } else if (status === "failed") {
    data = <h1>{error}</h1>;
  }

  return (
    <Helmet title="Order Details">
      <div className="completeOrderDetails-section mt-4 mb-4">
        <Container>{data}</Container>
      </div>
    </Helmet>
  );
};

export default CompleteOrderDetails;
