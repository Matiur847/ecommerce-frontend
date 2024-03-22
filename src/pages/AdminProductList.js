import React, { useEffect } from "react";
import "../style/AdminProductList.css";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { getAdminProducts } from "../store/adminProducts/adminProductSlice";
import { deleteProduct } from "../store/deleteProductSlice/deleteProductSlice";
import { toast } from "react-toastify";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const { adminProducts, status, error } = useSelector(
    (state) => state.adminAllProduct
  );
  const isDelete = useSelector((state) => state.deletProduct);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (isDelete.status === "succeeded") {
      toast.success("Product Delete Successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    }

    dispatch(getAdminProducts());
  }, [dispatch, isDelete]);

  const columns = [
    {
      field: "image",
      headerName: "IMG",
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div>
            <div className="imgField">
              <img src={row.img} alt="" className="w-75" />
            </div>
          </div>
        );
      },
    },
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/admin/product/${params.id}`}>
              <FaEdit className="admin-svgBtn" />
            </Link>

            {isDelete.status === "loading" ? (
              <Spinner
                animation="border"
                role="status"
                size="sm"
                variant="primary"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <MdDelete
                className="admin-svgBtn"
                onClick={() => handleDeleteProduct(params.id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  const rows = [];

  adminProducts.products &&
    adminProducts.products.forEach((item) => {
      rows.push({
        img: item.images[0].url,
        id: item._id,
        stock: `${item.stock}x`,
        price: `৳ ${item.price}`,
        name: item.name,
      });
    });

  let data;
  if (status === "loading") {
    data = (
      <div className="loading-spinner">
        <HashLoader color="#000000" />
      </div>
    );
  } else if (status === "succeeded") {
    data = (
      <div className="myOrders-table">
        <h4 className="text-center mt-2 mb-3 owner-order-titel">
          Product List {adminProducts.products?.length}
        </h4>
        <div className="admin-path">
          <Link to="/admin/dashboard">/dashboard</Link>
          <Link to="/admin/create">/create/product</Link>
          <Link to="/admin/orders">/orders</Link>
          <Link to="/admin/users">/users</Link>
        </div>
        <DataGrid
          getRowHeight={() => "auto"}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableColumnSelector
          autoHeight={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    );
  } else if (status === "failed") {
    data = <h1>{error}</h1>;
  }
  return (
    <Helmet title="ADMIN Products">
      <div className="myOrder-section">
        <Container>
          <Row>
            <Col md="12">{data}</Col>
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default AdminProductList;
