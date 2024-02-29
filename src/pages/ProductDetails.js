import React, { useEffect, useState } from "react";
import "../style/ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsProduct } from "../store/productSlice/productSlice";
import HashLoader from "react-spinners/HashLoader";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import ProgressBar from "react-bootstrap/ProgressBar";
import google from "../img/google.avif";
import laptop from "../img/laptop.jpg";
import mobile from "../img/mobile.jpg";
import gadget from "../img/gadget.jpg";

const ProductDetails = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const [mainImg, setMainImg] = useState("");
  console.log(mainImg);

  const { product, status, error } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [id, dispatch]);

  const image = [
    {
      url: google,
    },
    {
      url: laptop,
    },
    {
      url: mobile,
    },
    {
      url: gadget,
    },
  ];

  const [showText, setShowText] = useState(false);
  const hoverText = "Click To preview";

  let data;
  if (status === "loading") {
    data = (
      <div className="loading-spinner">
        <HashLoader color="#000000" />
      </div>
    );
  } else if (status === "succeeded") {
    data = (
      <Row>
        <Col md="4">
          <div className="product-details-img-container d-flex align-items-center">
            <div className="image3 gap-3 align-items-center">
              {image.map((item, index) => (
                <img
                  style={{ position: "relative", display: "inline-block" }}
                  onMouseOver={() => setShowText(true)}
                  onMouseOut={() => setShowText(false)}
                  src={item.url}
                  alt={index}
                  key={index}
                  className="w-50"
                  onClick={() => setMainImg(item)}
                />
              ))}
            </div>
            <div className="main-img">
              <img src={mainImg?.url} alt="" className="w-100" />

              {showText && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(255, 255, 255, 0.8)",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {hoverText}
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col md="8">
          <div className="product-title-container">
            <h4>{product.product?.name}</h4>
            <div className="react-starts d-flex ">
              <ReactStars edit={false} isHalf={true} value={product.product.ratings} />{" "}
              <span>{`(${product.product?.numOfReview})`}</span>
            </div>

            <div className="product-desc">
              <b>
                Price: <span>${product.product?.price}</span>
              </b>
              <p className="single-desc">{product.product?.description}</p>

              <div className="product-stocks text-center mb-5">
                <h4>Order now, before stock out this product</h4>
                <div className="sold-progress">
                  <div className="sold-items d-flex">
                    <span className="mb-1">STOCK NOW</span>
                  </div>
                  <div className="progressBar">
                    <ProgressBar
                      variant="warning"
                      now={product.product?.stock}
                      label={product.product?.stock}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="productDetils-order">
              <p>Quantity</p>
              <div className="quantityBox">
                <i class="ri-subtract-line"></i>
                <i class="ri-number-0"></i>
                <i class="ri-add-line"></i>
              </div>
              <div className="addCart-btn mt-3 mb-5">
                <button className="firstBtn">
                  Add To <i className="ri-shopping-bag-line"></i>
                </button>
                <button className="checkout">
                  Check Out <i class="ri-bank-card-line"></i>
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  } else if (status === "failed") {
    data = <h1>{error}</h1>;
  }

  return (
    <Helmet title="Details">
      <div className="productDetails-section mt-5">
        <Container>
          {data}
        </Container>
      </div>
    </Helmet>
  );
};

export default ProductDetails;
