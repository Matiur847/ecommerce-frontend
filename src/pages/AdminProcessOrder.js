import React, { useEffect } from "react";
import "../style/AdminProcessOrder.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import laptop from "../img/laptop.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { getOrderDetail } from "../store/adminOrderListSlice/adminOrderListSlice";

const AdminProcessOrder = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItem, totalAmount } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.user);
  const { orderDetail } = useSelector((state) => state.adminOrderList);

  const shippingPrice = 99;
  const totalAmounts = totalAmount + shippingPrice;

  const proceedToPayment = () => {
    const paymentData = {
      totalAmounts,
      shippingPrice,
    };
    sessionStorage.setItem("payInfo", JSON.stringify(paymentData));
    navigate("/proceed/payment");
  };

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  return (
    <Helmet title="Confirm-Order">
      <div className="mb-5">
        <Container>
          <Row className="mt-5">
            <Col md="6">
              <div className="order-shipping-info">
                <div className="shipping-address">
                  <h3>Shipping Address</h3>
                  <div className="shipping-address-details">
                    <p>
                      Name: <span>{user.user?.name}</span>
                    </p>
                    <p>
                      Phone: <span>{shippingInfo.phoneNo}</span>
                    </p>
                    <p>
                      Address: <span>{shippingInfo.address}</span>
                    </p>
                  </div>
                </div>
                <div className="order-cart-items mt-3">
                  <h3>Your Cart Items</h3>
                  <div className="order-confirm-product-details">
                    {cartItem.map((item, index) => (
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
                          <p>
                            Total: <span>{item.totalPrice}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="order-confirm-summery">
                <h3 className="text-center order-summery adminProcessOrder">
                  Order Summery
                </h3>
                <p>Current Order Status: {orderDetail.order.orderStatus}</p>
                <button className="login-btn mt-3" onClick={proceedToPayment}>
                  Proceed To Payment
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default AdminProcessOrder;
