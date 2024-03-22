import React, { useEffect } from "react";
import "../style/MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../store/myOrders/myOrders";
import { Container, Row, Col } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";
import { DataGrid } from "@mui/x-data-grid";
import Helmet from "../components/Helmet/Helmet";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleSingleOrder = (id) => {
    navigate(`/order/${id}`);
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
              <img src={row.img} alt="" className="w-75" />
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
      field: "details",
      flex: 0.3,
      headerName: "Details",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <i
            className="ri-share-forward-line order-forward-icon"
            onClick={() => handleSingleOrder(params.id)}
          ></i>
        );
      },
    },
  ];

  const rows = [];

  orders.orders &&
    orders.orders.forEach((item, index) => {
      rows.push({
        img: item.orderItems[0].image,
        itemsQty: `${item.orderItems.length}x`,
        id: item._id,
        status: item.orderStatus,
        amount: `৳ ${item.totalPrice}`,
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
        <h4 className="text-center mt-2 mb-3 owner-order-titel">{`${user.user?.name} Your Orders`}</h4>
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
    <Helmet title={`${user.user?.name} - Orders`}>
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

export default MyOrders;
