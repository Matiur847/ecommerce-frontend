import React, { useState } from "react";
import "../style/ProceedToPayment.css";
import CheckPointStep from "./CheckPointStep";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { createOrder } from "../store/orderSlice/orderSlice";

const ProceedToPayment = () => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItem, totalAmount } = useSelector(
    (state) => state.cart
  );
  console.log(cartItem)
  // const newOrder = useSelector((state) => state.newOrder);
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const orderInfo = JSON.parse(sessionStorage.getItem("payInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalAmounts * 100),
  };

  const order = {
    shippingPrice: orderInfo.shippingPrice,
    shippingInfo,
    totalPrice: orderInfo.totalAmounts,
    orderItems: cartItem,
    itemsPrice: totalAmount,
  };

  const paySubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.user.name,
            email: user.user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.postCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        setLoading(false);

        toast.warning(result.error.message, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.warning("Some issue cannot proceed to pay", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      if (error) {
        toast.warning("There are somthing broke", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      setLoading(false);
    }
  };

  return (
    <Helmet title="Payment">
      <div>
        <Container>
          <Row>
            <Col md="12">
              <CheckPointStep activeStep={2} />
            </Col>
          </Row>
          <Row className="d-flex align-items-center justify-content-center">
            <Col
              md="6"
              className="d-flex align-items-center justify-content-center"
            >
              <div className="login-container text-center">
                <div className="login-sectino">
                  <div className="login-title">
                    <p>Payment</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form onSubmit={paySubmitHandler} className="paymentForm">
                      <div>
                        {/* <i className="ri-bank-card-2-line"></i> */}
                        <CardNumberElement className="payInput" />
                      </div>
                      <div>
                        {/* <i class="ri-calendar-event-line"></i> */}
                        <CardExpiryElement className="payInput" />
                      </div>
                      <div>
                        {/* <i class="ri-key-fill"></i> */}
                        <CardCvcElement className="payInput" />
                      </div>
                      <button className="login-btn payBtn mt-3">
                        {loading === false ? (
                          `Pay - ৳${orderInfo.totalAmounts}`
                        ) : (
                          <Spinner
                            animation="border"
                            role="status"
                            size="sm"
                            variant="primary"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        )}
                      </button>
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

export default ProceedToPayment;
