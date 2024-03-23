import "../../style/Header.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Cart from "../../pages/Cart";
import { IoMdSearch } from "react-icons/io";
import logo from "../../img/logo.png";

const Header = () => {
  const { user, status } = useSelector((state) => state.user);
  const { totalQuantity } = useSelector((state) => state.cart);

  const [show, setShow] = useState(false);
  const [offcanShow, offcanSetShow] = useState(false);

  const handleClose = () => offcanSetShow(false);
  const handleShow = () => offcanSetShow(true);

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="header">
      <nav className="navbar">
        {/* <div className="logo"> */}
          <img src={logo} alt="Logo" className="logo" />
        {/* </div> */}
        <div className="search-icon d-flex align-items-center">
          <form>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="text"
                placeholder="Search Product"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <IoMdSearch onClick={searchHandler} />
            </div>
          </form>
        </div>
        <div className="nav-menu-link-container">
          <div className="nav-menu-link">
            <div className="nav-menu">
              <Link to="/">Home</Link>
              <Link to="/products">Product</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="user-icon d-flex align-items-center justify-content-center">
            <span className="cart-icon" onClick={() => setShow(true)}>
              <i className="ri-shopping-bag-line"></i>
              <sup>{totalQuantity}</sup>
            </span>
            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Cart
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>{show && <Cart />}</Modal.Body>
            </Modal>
            <div className="user-component">
              {status === "loading" ? (
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  variant="primary"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <Link
                  to={"/register"}
                  className={user?.user ? "cartIconDisplay" : ""}
                >
                  <i className="ri-user-3-fill cart-icon"></i>
                </Link>
              )}
            </div>
            <div className="offcanvas-container">
              <div className="mobile-menu">
                <i className="ri-menu-line" onClick={handleShow}></i>
              </div>

              <Offcanvas show={offcanShow} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>MENU</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className="nav-menu modal-nav">
                    <Link to="/">Home</Link>
                    <Link to="/products">Product</Link>
                    <Link to="/contact">Contact</Link>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
