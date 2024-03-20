import React, { useEffect } from "react";
import "../style/AdminProductList.css";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { getAdminProducts } from "../store/adminProducts/adminProductSlice";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const { adminProducts, status, error } = useSelector(
    (state) => state.adminAllProduct
  );
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
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

            <MdDelete className="admin-svgBtn" />
          </div>
        );
      },
    },
  ];

  const rows = [];

  adminProducts.products &&
    adminProducts.products.forEach((item) => {
      rows.push({
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
          Product List
        </h4>
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
          checkboxSelection
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
