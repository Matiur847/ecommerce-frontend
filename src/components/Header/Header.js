import "../../style/Header.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { cartActions } from "../../store/cartSlice.js/cartSlice";
import laptop from "../../img/laptop.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  const { cartItem, totalQuantity } = useSelector((state) => state.cart);
  console.log(totalQuantity);

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

  const handleDeletProduct = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  return (
    <div className="header">
      <nav className="navbar">
        <div className="logo">
          <h1 className="navbar-logo">Logo</h1>
        </div>
        <div className="search-icon d-flex align-items-center">
          <form onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Search Product"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        </div>
        <div className="nav-menu-link-container">
          <div className="nav-menu-link">
            <div className="nav-menu">
              <Link to="/">Home</Link>
              <Link to="/products">Product</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/about">About</Link>
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
              <Modal.Body>
                <div className="cart-items">
                  {cartItem.length === 0 ? (
                    <p className="text-center mt-3 mb-3">Empty Cart</p>
                  ) : (
                    cartItem.map((item) => (
                      <div className="cart-items-details d-flex align-items-center justify-content-around mt-2 mb-4">
                        <div className="cartItem-img">
                          <img className="w-75" src={laptop} alt="Product" />
                        </div>
                        <div className="cartItem-product-deatils">
                          <p className="m-0 mb-1">{item.name}</p>
                          <span>Price: {item.price}</span> <br />
                          <span>Quantity: {item.quantity}</span> <br />
                          <div className="isIncrease-removeBtn mt-2">
                            <div className="quantityBox">
                              <i
                                className="ri-subtract-line"
                                onClick={"decreaseQuantity"}
                              ></i>
                              <span>0</span>
                              <i
                                className="ri-add-line"
                                onClick={"increaseQuantity"}
                              ></i>
                            </div>{" "}
                            <button
                              className="handleRemoveBtn mt-2"
                              onClick={() => handleDeletProduct(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  <div className="borderDiv"></div>
                  <div className="cart-detils-btn text-center mt-3">
                    <Link to={"/cart"}>
                      <button className="handleRemoveBtn">Check Out</button>
                    </Link>
                  </div>
                </div>
              </Modal.Body>
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
                    <Link to="/about">About</Link>
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
