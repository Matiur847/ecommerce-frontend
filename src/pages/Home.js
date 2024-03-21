import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import "../style/Home.css";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import ReactStars from "react-rating-stars-component";
import laptop from "../img/laptop.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/productSlice/productSlice";
import HashLoader from "react-spinners/HashLoader";
import { cartActions } from "../store/cartSlice.js/cartSlice";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);
  const { cartItem } = useSelector((state) => state.cart);
  console.log(products)
  
  const [itemId, setItemId] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchProduct("keyword"));
  }, [dispatch]);

  // get specific item current quantity
  useEffect(() => {
    const stockCount = cartItem.find((item) => item.id === itemId);
    setQuantity(stockCount?.quantity);
  }, [cartItem, itemId]);

  const bannerData = [
    {
      logo: <i className="ri-truck-line"></i>,
      title: "Fee Delivery",
      para: "product all over price $25",
    },

    {
      logo: <i className="ri-text-wrap"></i>,
      title: "7 days return",
      para: "For all users",
    },

    {
      logo: <i className="ri-secure-payment-line"></i>,
      title: "Secure Payment",
      para: "100% secure payment",
    },

    {
      logo: <i className="ri-questionnaire-line"></i>,
      title: "24/7 support",
      para: "Delivery support",
    },
  ];

  const addToCart = (item) => {
    if (item.stock <= quantity) {
      toast.warning(`Stock Limit ${item.stock}`, {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    const id = item._id;
    dispatch(
      cartActions.addItem({
        id,
        name: item.name,
        image: item.images[0].url,
        price: item.price,
        category: item.category,
        stock: item.stock,
      })
    );
  };

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
          <Card sx={{ zIndex: 1 }}>
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
                      size={20}
                      isHalf={true}
                    />{" "}
                    <span>{`(${product.numOfReview})`}</span>
                  </div>
                </div>
              </Typography>
            </CardContent>
            <div className="add-cart">
              <button
                disabled={product.stock < 1}
                onClick={() => {
                  addToCart(product);
                  setItemId(product._id);
                }}
              >
                Add To <i className="ri-shopping-cart-line"></i>
              </button>
            </div>
          </Card>
        </div>
      </Col>
    ));
  } else if (status === "failed") {
    data = <h1>{error}</h1>;
  }

  return (
    <Helmet title="Home">
      <div className="home-container">
        <Container>
          <div className="carousel">
            <Carousel />
          </div>
          <Row>
            {bannerData.map((item, index) => (
              <Col lg="3" md="4" sm="6" xs="6" key={index}>
                <h4 className="category-item d-flex align-items-center gap-3">
                  <div className="category-img">{item.logo}</div>
                  <div className="category-title">
                    <h6>{item.title}</h6>
                  </div>
                </h4>
              </Col>
            ))}
          </Row>

          <Row>
            <div className="ui-title mt-5 mb-2">
              <h3>Just For You</h3>
            </div>
            {data}
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default Home;
