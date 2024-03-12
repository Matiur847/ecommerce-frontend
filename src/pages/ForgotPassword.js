import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../store/profileSlice/profileSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { profile, status } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (profile.success === false) {
      toast.warning(profile.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.success(profile.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [profile]);

  return (
    <Helmet title="Forgot Password">
      <div className="loginComp mt-5">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col
              md="6"
              className="d-flex align-items-center justify-content-center"
            >
              <div className="login-container text-center">
                <div className="login-sectino">
                  <div className="login-title">
                    <p>Forgot Password ?</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form onSubmit={registerSubmit}>
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="submit"
                        className="login-btn"
                        value={
                          status === "loading" ? "Please Wait ..." : "Submit"
                        }
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

export default ForgotPassword;
