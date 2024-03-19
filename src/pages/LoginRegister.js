import React, { useEffect, useState } from "react";
import "../style/LoginRegister.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice/userSlice";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet/Helmet";

const LoginRegister = () => {
  const navigate = useNavigate();

  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(login({ loginEmail, loginPassword }));
  };

  useEffect(() => {
    if (user.user?.name) {
      navigate("/");
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [navigate, user]);

  return (
    <Helmet title="Login">
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
                    <p>Login</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form onSubmit={loginSubmitHandler}>
                      <input
                        type="email"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />{" "}
                      <br />
                      <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />{" "}
                      <br />
                      <p className="user-error-message d-flex align-items-center justify-content-start">
                        {user.message}
                      </p>
                      <Link to={"/password/forgot"}>
                        <p className="d-flex justify-content-start">
                          Forgot Password ?
                        </p>
                      </Link>
                      <input
                        type="submit"
                        className="login-btn"
                        value={
                          status === "loading" ? "Please Wait ..." : "Login"
                        }
                      />
                    </form>
                    <p className="mt-2 register-link">
                      Not Have Account?{" "}
                      <Link to={"/register"}>
                        <span>Register</span>
                      </Link>
                    </p>
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

export default LoginRegister;
