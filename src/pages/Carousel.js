import React from "react";
import "../style/Carousel.css";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import mobile from "../img/mobile.jpg";
// import mobile from '../img/rsz_mobile.jpg'
import laptop from "../img/laptop.jpg";
import gadget from "../img/gadget.jpg";

const Carousel = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  const slides = [
    {
      title: "Mobile",
      para: "Best Mobile ever",
      image: mobile,
    },
    {
      title: "Laptop",
      para: "Best Laptop for you",
      image: laptop,
    },
    {
      title: "Gadeget",
      para: "All new Gadget here",
      image: gadget,
    },
  ];

  return (
    <div>
      <Row className="mb-3">
        <Col md="4">
          <div className="carousel-container border h-full">
            <p className="mt-2">All Category</p>
            <div className="carousel-category">
              <i className="ri-smartphone-line"></i>
              <span>Mobile</span>
            </div>
            <div className="carousel-category">
              <i className="ri-infinity-line"></i>
              <span>All Mobile Gadget's</span>
            </div>
            <div className="carousel-category">
              <i className="ri-macbook-line"></i>
              <span className="gap-2">Laptop</span>
            </div>
            <div className="carousel-category">
              <i className="ri-alipay-fill"></i>
              <span>Laptop Accessories</span>
            </div>
          </div>
        </Col>
        <Col md="8">
          <div className="carousel-slider-container text-center">
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <div key={index} className="carousel-slider">
                  <div className="carousel-title">
                    <h3>{slide.title}</h3>
                    <p>{slide.para}</p>
                    <button className="details-button">Details</button>
                  </div>
                  <div className="carousel-img">
                    <img src={slide.image} alt={slide.title} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Carousel;
