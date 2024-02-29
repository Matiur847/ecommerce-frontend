import React, { useEffect, useState } from "react";
import '../style/Products.css'
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

const Products = () => {
  const { keyword } = useParams();
  const { products, totalProduct, resultPerPage, status, error } = useSelector(
    (state) => state.product
  );
  console.log(products)

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNumber = (e) => {
    setCurrentPage(e);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

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
                <Link to={product._id}>
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
          <div className="ui-title mt-5 mb-2">
            <h3>All Products</h3>
          </div>
          {data}

          <div className="pagination-box mt-3 d-flex align-items-center justify-content-center">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={products.resultPerPage}
              totalItemsCount={product.totalProduct}
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
        </Row>
      </Container>
    </div>
  );
};

export default Products;
