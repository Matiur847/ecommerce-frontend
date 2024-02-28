import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsProduct } from "../store/productSlice/productSlice";
import HashLoader from "react-spinners/HashLoader";
import Helmet from "../components/Helmet/Helmet";

const ProductDetails = () => {
  const id = useParams();
  const dispatch = useDispatch();

  const { product, status, error } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [id, dispatch]);

  let data;
  if (status === "loading") {
    data = (
      <div className="loading-spinner">
        <HashLoader color="#000000" />
      </div>
    );
  } else if(status === 'succeeded') {
    data = (
        <div>
            <h2>{product.product?.ratings}</h2>
        </div>)
  } else if(status === 'failed') {
    data = <h1>{error}</h1>;
  }

  return (
    <Helmet title="Details">
      <div className="product-details-container">
        <h1>this is product details component</h1>
        {data}
      </div>
    </Helmet>
  );
};

export default ProductDetails;
