import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/userSlice/userSlice";

const Register = () => {
  const { user, status } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState();

  const [users, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = users;

  const registerSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", avatar);

    // console.log('users', myForm);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    try {
      if (e.target.name === "avatar") {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatar(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      } else {
        setUser({ ...users, [e.target.name]: e.target.value });
      }
    } catch (error) {
      // handle your error here
    }
  };

  return (
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
                  <p>Register</p>
                  <div className="after-margin d-flex align-items-center justify-content-center"></div>
                </div>
                <div className="login-inputField">
                  <form encType="multipart/form-data" onSubmit={registerSubmit}>
                    <input
                      type="name"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={registerDataChange}
                    />{" "}
                    <br />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={registerDataChange}
                    />{" "}
                    <br />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={registerDataChange}
                    />{" "}
                    <br />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      placeholder="Password"
                      required
                      onChange={registerDataChange}
                    />{" "}
                    <br />
                    <p className="user-error-message d-flex align-items-center justify-content-start">
                      {user.message}
                    </p>
                    <input
                      type="submit"
                      className="login-btn"
                      value={
                        status === "loading" ? "Please Wait ..." : "Register"
                      }
                    />
                  </form>
                  <p className="mt-2 register-link">
                    Already Register?{" "}
                    <Link to={"/login"}>
                      <span>Login</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
