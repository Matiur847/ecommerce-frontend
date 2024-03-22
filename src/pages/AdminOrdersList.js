import React, { useEffect } from "react";

import "../style/AdminOrderList.css";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";
import { DataGrid } from "@mui/x-data-grid";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import {
  adminDeletOrder,
  adminOrderList,
} from "../store/adminOrderListSlice/adminOrderListSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminOrdersList = () => {
  const dispatch = useDispatch();
  const { adminOrders, status, error } = useSelector(
    (state) => state.adminOrderList
  );

  const adminDeleteOrder = useSelector((state) => state.adminOrderList);

  useEffect(() => {
    dispatch(adminOrderList());
  }, [dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    if (adminDeleteOrder.adminDeleteOrder.success === true) {
      toast.success("Order Deleted, Reload Page", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [adminDeleteOrder, navigate]);

  console.log(adminDeleteOrder);

  const handleDeleteOrder = (id) => {
    dispatch(adminDeletOrder(id));
  };

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
              <img src={row.img} alt="" className="w-50" />
            </div>
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
      cellClassName: "idClassName",
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: ({ row }) => {
        return row.status === "Processing" ? "greenColor" : "colorRed";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/admin/orders/${params.id}`}>
              <FaEdit className="admin-svgBtn" />
            </Link>

            {adminDeleteOrder.status === "loading" ? (
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
                onClick={() => handleDeleteOrder(params.id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  const rows = [];

  adminOrders.orders &&
    adminOrders.orders.forEach((item, index) => {
      rows.push({
        img: item.orderItems[0].image,
        itemsQty: `${item.orderItems.length}x`,
        id: item._id,
        status: item.orderStatus,
        amount: `৳ ${item.totalPrice}`,
        orderId: item.orderItems,
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
      <div style={{ minHeight: 400, width: "100%" }} className="myOrders-table">
        <h4 className="text-center mt-2 mb-3 owner-order-titel">
          Admin Order List
        </h4>
        <div className="admin-path">
          <Link to="/admin/dashboard">/dashboard</Link>
          <Link to="/admin/create">/create/product</Link>
          <Link to="/admin/products">/products</Link>
        </div>
        <DataGrid
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => "50"}
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
    <Helmet title="Admin Order List">
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

export default AdminOrdersList;
