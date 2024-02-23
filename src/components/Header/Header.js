import '../../style/Header.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';


const Header = ({name, ...props}) => {

    const [show, setShow] = useState(false);
    const [offcanShow, offcanSetShow] = useState(false);

    const handleClose = () => offcanSetShow(false);
    const handleShow = () => offcanSetShow(true);

    return (
        <div className="header">
            <nav className="navbar">
                <div className="logo">
                    <h1 className="navbar-logo">Logo</h1>
                </div>
                <div className="search-icon">
                    <input type="text" placeholder='Search Product' />
                </div>
                <div className="nav-menu-link-container">
                            <div className="nav-menu-link">
                                <div className='nav-menu'>
                                    <Link to='/'>Home</Link>
                                    <Link to='/product'>Product</Link>
                                    <Link to='/contact'>Contact</Link>
                                    <Link to='/about'>About</Link>
                                </div>
                            </div>
                    <div className="user-icon d-flex align-items-center justify-content-center">
                        <span className='cart-icon' onClick={() => setShow(true)}>
                            <i className="ri-shopping-bag-line"></i>
                            <sup>0</sup>
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
                                <p>Empty Cart</p>
                            </Modal.Body>
                        </Modal>
                        <button className='header-login-button'>Login</button>
                        <div className="offcanvas-container">
                            <div className="mobile-menu">
                                <i className="ri-menu-line" onClick={handleShow}></i>
                            </div>

                            <Offcanvas show={offcanShow} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>MENU</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <div className='nav-menu modal-nav'>
                                        <Link to='/'>Home</Link>
                                        <Link to='/product'>Product</Link>
                                        <Link to='/contact'>Contact</Link>
                                        <Link to='/about'>About</Link>
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