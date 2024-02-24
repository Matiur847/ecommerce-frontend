import React from "react";
import "../style/Products.css";
import { Col, Row } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import laptop from "../img/laptop.jpg";
// import google from "../img/google.avif";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

const Product = ({ products }) => {
  console.log(products);
  return (
    <Helmet title="Products">
      <div className="product-container mt-5">
        <div className="ui-title mb-3">
          <h3>Just For You</h3>
        </div>
        <Row>
          {products?.map((item, index) => (
            <Col lg="3" md="4" sm="6" xs="6">
              <div className="product-card-container mb-3">
                <Card sx={{ width: 520, maxWidth: "100%", boxShadow: "lg" }}>
                  <CardOverflow>
                    <AspectRatio>
                      <img src={laptop} loading="lazy" alt="Product Img" className="productImg" />
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent>
                    <Typography
                      level="title-sm"
                      sx={{ mt: 1, fontWeight: "xl" }}
                    >
                      Price: ${item.price}
                    </Typography>
                    <Typography level="body-xs">Bluetooth Headset</Typography>

                    <Typography level="body-sm">
                      <b>{item.stock}</b> left in stock!
                    </Typography>
                  </CardContent>
                  <div className="add-cart">
                    <button>Add To <i className="ri-shopping-cart-line"></i></button>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Helmet>
  );
};

export default Product;
