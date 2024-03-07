import React, { useRef } from "react";
import "../style/LoginRegister.css";
import { Col, Container, Row } from "react-bootstrap";

const LoginRegister = () => {

  return (
    <div>
      <Container>
        <Row>
          <Col md="12">
            <div className="LoginSignUpContainer">
              <div className="LoginSignUpBox">
                <div className="loginBtnss">
                  <div className="login_signUp_toggle text-center">
                    <p className="mt-3">LOGIN</p>
                  </div>
                </div>
                <form className="loginForm">
                  <div className="loginEmail">
                    {/* <i class="ri-mail-line"></i> */}
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      // value={loginEmail}
                      // onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    {/* <LockOpenIcon /> */}
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      // value={loginPassword}
                      // onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  {/* <Link to="/password/forgot">Forget Password ?</Link> */}
                  <input type="submit" value="Login" className="loginBtn" />
                </form>
                <form
                  className="signUpForm"
                  // ref={registerTab}
                  encType="multipart/form-data"
                  // onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    {/* <FaceIcon /> */}
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      // value={name}
                      // onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpEmail">
                    {/* <MailOutlineIcon /> */}
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      // value={email}
                      // onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpPassword">
                    {/* <LockOpenIcon /> */}
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      // value={password}
                      // onChange={registerDataChange}
                    />
                  </div>

                  <div id="registerImage">
                    {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
                    <span>Image</span>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      // onChange={registerDataChange}
                    />
                  </div>
                  <input type="submit" value="Register" className="signUpBtn" />
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginRegister;
