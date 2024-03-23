import React, { useEffect, useState } from "react";
import "../style/GetSingleUserDetailAdmin.css";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  userDetailAdmin,
  userUpdateAdmin,
} from "../store/UserListAdmin/UserListAdminSlice";
import { toast } from "react-toastify";

const GetSingleUserDetailAdmin = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const { user, status, error } = useSelector((state) => state.allUser);
  const { userUpdate } = useSelector((state) => state.allUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user.user?._id !== id.id) {
      dispatch(userDetailAdmin(id));
    } else {
      setName(user.user?.name);
      setEmail(user.user?.email);
      setRole(user.user?.role);
    }

    if (userUpdate?.success === true) {
      toast.success("User Was Update", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [error, userUpdate, user, id, dispatch]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    console.log("handlerCall");

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(userUpdateAdmin({ id, myForm }));
  };

  useEffect(() => {
    dispatch(userDetailAdmin(id));
  }, [dispatch, id]);
  return (
    <Helmet title="Update User">
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
                    <p>Update User</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form onSubmit={createProductSubmitHandler}>
                      <input
                        type="name"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // value={email}
                      />{" "}
                      <br />
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Choose Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>{" "}
                      <br />
                      <button
                        className="login-btn create-product"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? (
                          <Spinner
                            animation="border"
                            role="status"
                            size="sm"
                            variant="light"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : (
                          "Update"
                        )}
                      </button>
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
export default GetSingleUserDetailAdmin;
