import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import "../style/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const {user, status, error} = useSelector((state) => state.user)

  const dispatch = useDispatch();

  const { token } = useParams();
  let profile;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch("updatePassword"(myForm));
  };

  return (
    <Helmet title="Password Update">
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
                    <p>Reset Password</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form onSubmit={registerSubmit}>
                      <input
                        type="password"
                        placeholder="New Password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />{" "}
                      <br />
                      {profile?.message && (
                        <p className="user-error-message d-flex align-items-center justify-content-start">
                          {profile?.message}
                        </p>
                      )}
                      <input
                        type="submit"
                        className="login-btn"
                        value={
                          status === "loading" ? "Please Wait ..." : "Reset"
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

export default ResetPassword;
