import React, { useState } from "react";
import "../style/Shipping.css";
import Helmet from "../components/Helmet/Helmet";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Country, State } from "country-state-city";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  return (
    <Helmet title="Shipping">
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
                    <p>Shipping Details</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form
                      onSubmit={"loginSubmitHandler"}
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
                        type="number"
                        placeholder="Pin Code"
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
