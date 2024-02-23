import React from 'react';
import '../../style/Footer.css'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <div className='footer-container'>
            <Container fluid>
                <Row>
                    <Col>
                        <div className="contact-us">
                            <h3>CONTACT US</h3>
                            <p>MOBILE: <span>+8801859734052</span></p>
                            <p>EMAIL: <span>secondhand@gmail.com</span></p>
                        </div>
                    </Col><Col>
                        <div className="footer-logo text-center">
                            <h3>Logo IMG</h3>
                        </div>
                    </Col>
                    <Col>
                        <div className="follow-us text-center">
                            <h3>FOLLOW US</h3>
                            <span>
                                <i className="ri-facebook-circle-fill"></i>
                            </span>
                            <span>
                                <i className="ri-twitter-fill"></i>
                            </span>
                            <span>
                                <i className="ri-instagram-fill"></i>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;