import React, { useEffect, useState } from "react";
import "../style/Products.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/productSlice/productSlice";
import HashLoader from "react-spinners/HashLoader";
import { Link, useParams } from "react-router-dom";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import ReactStars from "react-rating-stars-component";
import { Col, Container, Row } from "react-bootstrap";
import laptop from "../img/laptop.jpg";
import Pagination from "react-js-pagination";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import ReactSlider from "react-bootstrap-range-slider";

const categoryes = ["mobile", "Laptop", "Gadgets"];

const Products = () => {
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategoy] = useState("");
  const [ratings, setRatings] = useState(0);

  const handleInput = (e) => {
    setPrice(e);
  };

  let { keyword } = useParams();
  const { products, status, error } = useSelector((state) => state.product);

  let [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNumber = (e) => {
    setCurrentPage(e);
  };

  const dispatch = useDispatch();

  if (!keyword) {
    keyword = "";
  }

  useEffect(() => {
    dispatch(fetchProduct({ keyword, currentPage, price, category, ratings }));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  let data;
  if (status === "loading") {
    data = (
      <div className="loading-spinner">
        <HashLoader color="#000000" />
      </div>
    );
  } else if (status === "succeeded") {
    data = products.allProduct?.map((product, index) => (
      <Col lg="3" md="4" sm="6" xs="6" key={index}>
        <div className="product-card-container mb-3 mt-4">
          <Card>
            <CardOverflow>
              <AspectRatio>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={laptop}
                    loading="lazy"
                    alt={product.name}
                    className="productImg"
                  />
                </Link>
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level="body-xs">Price: ${product.price}</Typography>
              <Typography level="title-sm" sx={{ mt: 1, fontWeight: "xl" }}>
                {product.name}
              </Typography>

              <Typography level="body-sm">
                <div className="product-stock-details">
                  {product.stock < 1 ? (
                    <span className="stock-product">Stock Out</span>
                  ) : (
                    <span className="stock-product">Stock {product.stock}</span>
                  )}
                  <div className="react-starts d-flex align-items-center justify-content-start">
                    <ReactStars
                      value={product.ratings}
                      edit={false}
                      isHalf={true}
                    />{" "}
                    <span>{`(${product.numOfReview})`}</span>
                  </div>
                </div>
              </Typography>
            </CardContent>
            <div className="add-cart">
              <button>
                Add To <i className="ri-shopping-cart-line"></i>
              </button>
            </div>
          </Card>
        </div>
      </Col>
    ));
  } else if (status === "failed") {
    data = (
      <h1 className="network-error">
        Somthing Worng, Check your Internet Connection!
        {error}
      </h1>
    );
  }

  return (
    <div className="products-section">
      <Container>
        <Row>
          <div className="ui-title mt-5 mb-2 d-flex align-items-center justify-content-between">
            <div className="ui-titles">
              <h3>All Products</h3>
            </div>
            <div className="price-range-title gap-3">
              <p>Filter</p>
            </div>
          </div>
          <div className="price-range-slider d-flex justify-content-between">
            <div className="range">
              <p className="mb-2">Price Range</p>
              <div className="price-value mb-3">
                <span className="mt-5">{`Min Price: ${price[0]}`}</span> <br />
                <span>{`Max Price: ${price[1]}`}</span>
              </div>
              <RangeSlider
                defaultValue={price}
                min={0}
                max={25000}
                value={price}
                setp={2000}
                onInput={(e) => handleInput(e)}
              />
              <div className="fieldset-container mt-3">
                <fieldset>
                  <span>Filter With Rating</span>
                  <ReactSlider
                    max={5}
                    value={ratings}
                    defaultValue={5}
                    onChange={(e) => setRatings(e.target.value)}
                    tooltip="auto"
                    tooltipPlacement="top"
                  />
                </fieldset>
              </div>
            </div>
            <div className="range-category">
              <h5>Category</h5>
              {categoryes.map((category, index) => (
                <div className="user-category-items" key={index}>
                  <ul>
                    <li>
                      <span onClick={() => setCategoy(category)}>
                        {category}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}
              <form action="">
                <button className="clear-filter" variant="light">Clear Filter</button>
              </form>
            </div>
          </div>
          {data}
          {products.resultPerPage < products.totalProduct && (
            <div className="pagination-box mt-3 d-flex align-items-center justify-content-center">
              {products.allProduct.length ? (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={products.resultPerPage}
                  totalItemsCount={products.totalProduct}
                  onChange={setCurrentPageNumber}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              ) : (
                <div>
                  <h3 className="productNotFound">Product Not Found!</h3>
                </div>
              )}
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Products;
