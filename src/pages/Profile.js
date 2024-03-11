import React, { useEffect } from "react";
import "../style/Profile.css";
import { Col, Container, Row } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, status, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <Helmet title="Profile">
      <div className="profile-container mt-5 mb-5">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col md="6">
              <div className="profile-detils-left">
                <div className="profile-info">
                  <div className="profile-img">
                    <img
                      src={user.user?.avatar.url}
                      alt="Profile"
                      className="w-50"
                    />
                  </div>
                  <div className="profile-infos mt-4">
                    <p>
                      Name: <span>{user.user?.name}</span>
                    </p>
                    <p>
                      Email: <span>{user.user?.email}</span>
                    </p>
                    <p>
                      Joined:{" "}
                      <span>{String(user.user?.createdAt).substr(0, 10)}</span>
                    </p>
                    <div className="update-profile text-center">
                      <Link to={'/profile/update'}>
                        <button className="profile-btn">Edit Profile</button>
                      </Link>
                      <Link>
                        <button className="profile-btn">Orders</button>
                      </Link>
                      <Link>
                        <button className="profile-btn">Change Password</button>
                      </Link>
                    </div>
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

export default Profile;
