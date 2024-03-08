import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Register.css";
import profileUser from "../img/profile.jpg";

const Register = () => {
  const [avtar, setAvtar] = useState();
  const [avtarPreview, setAvtarPreview] = useState(profileUser);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventdefault();

    const myForm = FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
  };

  const registerAllData = (e) => {
    if (e.target.name === "avtar") {
        const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvtarPreview(reader.result);
          setAvtar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
        setUser({...user, [e.target.name]: [e.target.value]})
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
                    <input type="name" name="name" placeholder="Name" /> <br />
                    <input type="email" name="email" placeholder="Email" />{" "}
                    <br />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={registerAllData}
                    />{" "}
                    <br />
                    <input
                      type="file"
                      name="avtar"
                      accept="image/*"
                      placeholder="Password"
                      onChange={registerAllData}
                    />{" "}
                    <br />
                    <input
                      type="submit"
                      className="login-btn"
                      value="Register"
                      onChange={registerAllData}
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
