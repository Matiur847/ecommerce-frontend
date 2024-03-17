import React, { useState } from "react";
import "../style/Shipping.css";
import Helmet from "../components/Helmet/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import CheckPointStep from "./CheckPointStep";
import { toast } from "react-toastify";
import { cartActions } from "../store/cartSlice.js/cartSlice";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);

  const shippingHandler = (e) => {
    e.preventDefault();

    if (phoneNo?.length < 10 || phoneNo?.length > 10) {
      toast.warning("Number Should be 10 digits long", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    dispatch(
      cartActions.shippingDetails({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );
    navigate("/order/confirm");
  };

  return (
    <Helmet title="Shipping">
      <div className="loginComp">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col md="12">
              <CheckPointStep activeStep={0} />
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
                    <p>Shipping Details</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form
                      onSubmit={shippingHandler}
                      encType="multipart/form-data"
                    >
                      <input
                        type="text"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="number"
                        placeholder="Post Code"
                        required
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="number"
                        placeholder="Phone Number"
                        required
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        size="10"
                      />{" "}
                      <br />
                      <select
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">Country</option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>{" "}
                      <br />
                      {Country && (
                        <select
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          <option value="">State</option>
                          {State &&
                            State.getStatesOfCountry(country).map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      )}
                      <br />
                      <input
                        type="submit"
                        value="Continue"
                        className="login-btn"
                        disabled={state ? false : true}
                      />
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

export default Shipping;
