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
import { Button, Col, Container, Row } from "react-bootstrap";
import laptop from "../img/laptop.jpg";
import Pagination from "react-js-pagination";
import RangeSlider from "react-bootstrap-range-slider";
import MultiRangeSlider from "multi-range-slider-react";

const Products = () => {
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(2500000);
  const handleInput = (e) => {
    e.preventDefault();
    maxValue = 250000;
  };

  console.log("setPriceHandler", minValue, maxValue);

  let { keyword } = useParams();
  const { products, status, error } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNumber = (e) => {
    setCurrentPage(e);
  };

  const dispatch = useDispatch();

  if (!keyword) {
    keyword = "";
  }

  useEffect(() => {
    dispatch(fetchProduct({ keyword, currentPage, minValue, maxValue }));
  }, [dispatch, keyword, currentPage, minValue, maxValue]);

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
        <div className="product-card-container mb-3">
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
    data = <h1 className="network-error">{error}</h1>;
  }

  return (
    <div>
      <Container>
        <Row>
          <div className="ui-title mt-5 mb-2 d-flex align-items-center justify-content-between">
            <div className="ui-titles">
              <h3>All Products</h3>
            </div>
            <div className="price-range-title gap-3">
              <p>Price Filter</p>
            </div>
          </div>
          <div className="price-range-slider">
            <form>
              <input
                onChange={(e) => set_minValue(e.target.value)}
                type="text"
                placeholder="Min Price"
              />
              <input
                onChange={(e) => set_maxValue(e.target.value)}
                type="text"
                placeholder="Max Price"
              />
              <Button>Clear Filter</Button>
            </form>
          </div>
          {data}

          {products.resultPerPage < products.totalProduct && (
            <div className="pagination-box mt-3 d-flex align-items-center justify-content-center">
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
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Products;
