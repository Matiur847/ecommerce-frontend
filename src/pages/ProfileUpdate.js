import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import "../style/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/profileSlice/profileSlice";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const { user } = useSelector((state) => state.user);
  const { profile, status, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));

    if (profile?.profile) {
      toast.success("Update Successfully", {
        autoClose: 2000,
      });
    }
  };

  const registerDataChange = (e) => {
    try {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      // handle your error here
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
    }
    if (profile.success === true) {
      toast.success("Update Successfully", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate('/profile');
    }
  }, [user, status, profile, navigate]);

  return (
    <Helmet title="Update Profile">
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
                    <p>Update Profile</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form
                      encType="multipart/form-data"
                      onSubmit={registerSubmit}
                    >
                      <input
                        type="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                      {/* <p className="user-error-message d-flex align-items-center justify-content-start">
                        {user.message}
                      </p> */}
                      <input
                        type="submit"
                        className="login-btn"
                        value={
                          status === "loading" ? "Please Wait ..." : "Update"
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

export default ProfileUpdate;
