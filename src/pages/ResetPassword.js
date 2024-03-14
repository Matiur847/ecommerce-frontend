import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import "../style/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../store/profileSlice/profileSlice";

const ResetPassword = () => {
  const { profile, status } = useSelector((state) => state.profile);

  console.log("Profile", profile);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword({ myForm, token }));
  };

  useEffect(() => {
    if (profile) {
      toast.warning(profile.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    if (profile.success === true) {
      toast.warning('Password Rest Successfully', {
        position: "top-right",
        autoClose: 2000,
      });
      navigate('/login')
    }
  }, [profile, navigate]);

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
