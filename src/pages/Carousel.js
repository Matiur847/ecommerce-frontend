import React, { useEffect } from "react";
import "../style/Carousel.css";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
// import mobile from "../img/mobile.jpg";
// import mobile from '../img/rsz_mobile.jpg'
// import laptop from "../img/laptop.jpg";
// import gadget from "../img/gadget.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/productSlice/productSlice";
import HashLoader from "react-spinners/HashLoader";

const Carousel = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct("keyword"));
  }, [dispatch]);

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

  // const slides = [
  //   {
  //     title: "Mobile",
  //     para: "Best Mobile ever",
  //     image: mobile,
  //   },
  //   {
  //     title: "Laptop",
  //     para: "Best Laptop for you",
  //     image: laptop,
  //   },
  //   {
  //     title: "Gadeget",
  //     para: "All new Gadget here",
  //     image: gadget,
  //   },
  // ];

  return (
    <div>
      <Row className="mb-3">
        <Col md="4">
          <div className="carousel-container border h-full">
            <p className="mt-2">All Category</p>
            <div className="carousel-category">
              <i className="ri-smartphone-line"></i>
              <span>Smart Phones</span>
            </div>
            <div className="carousel-category">
              <i className="ri-infinity-line"></i>
              <span>All Mobile Gadget's</span>
            </div>
            <div className="carousel-category">
              <i className="ri-alipay-fill"></i>
              <span>Earphone</span>
            </div>
            <div className="carousel-category">
              <i className="ri-alipay-fill"></i>
              <span>Charger</span>
            </div>
          </div>
        </Col>
        <Col md="8">
          {status === "loading" ? (
            <div className="home-loader-spinner d-flex align-items-center justify-content-center">
              <HashLoader />
            </div>
          ) : (
            <div className="carousel-slider-container text-center">
              <Slider {...settings}>
                {products.allProduct?.map((slide, index) => (
                  <div key={index} className="carousel-slider">
                    <div className="carousel-title">
                      <h3>{slide.name.slice(0, 25)}</h3>
                      {/* <p>{slide.description}</p> */}
                      <button className="details-button">Details</button>
                    </div>
                    <div className="carousel-img">
                      <img src={slide.images[0].url} alt={slide.title} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Carousel;
