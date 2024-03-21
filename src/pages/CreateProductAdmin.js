import React, { useEffect, useState } from "react";
import "../style/createProductAdmin.css";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import "../style/Register.css";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../components/Helmet/Helmet";
import { createProduct } from "../store/createProductAdmin/createProductAdminSlice";
import { toast } from "react-toastify";

const CreateProductAdmin = () => {
  const { product, status, error } = useSelector(
    (state) => state.createProduct
  );
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      toast.warning(error.message, {
        position: "top-right",
        autoClose: 200,
      });
    }

    if (product?.success === true) {
      toast.success("Product Created Successfully", {
        position: "top-right",
        autoClose: 2000,
      });

      setName("");
      setPrice(0);
      setDescription("");
      setCategory("");
      setStock(0);
      setImages([]);
    }
  }, [error, product]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Helmet title="Create Product">
      <div className="loginComp">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col
              md="6"
              className="d-flex align-items-center justify-content-center"
            >
              <div className="login-container text-center">
                <div className="login-sectino">
                  <div className="login-title">
                    <p>Create Product</p>
                    <div className="after-margin d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div className="login-inputField">
                    <form
                      encType="multipart/form-data"
                      onSubmit={createProductSubmitHandler}
                    >
                      <input
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="number"
                        placeholder="Price"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                      />{" "}
                      <br />
                      <textarea
                        placeholder="Product Description"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30"
                        rows="1"
                      ></textarea>{" "}
                      <br />
                      <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose Category</option>
                        {categories.map((cate) => (
                          <option key={cate} value={cate}>
                            {cate}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Stock"
                        required
                        onChange={(e) => setStock(e.target.value)}
                      />{" "}
                      <br />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                      />{" "}
                      <br />
                      <button
                        className="login-btn create-product"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? (
                          <Spinner
                            animation="border"
                            role="status"
                            size="sm"
                            variant="primary"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : (
                          "Create"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default CreateProductAdmin;
