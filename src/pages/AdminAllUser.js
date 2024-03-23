import React, { useEffect } from "react";
import "../style/AdminAllUser.css";

import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import {
  getAllUsers,
  userDeleteAdmin,
} from "../store/UserListAdmin/UserListAdminSlice";

const AdminAllUser = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.allUser);
  const { userDelete } = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (userDelete.success === true) {
    toast.success("User Was Delete, Reload Page", {
      position: "top-right",
      autoClose: 2000,
    });
  }

  const handledeleteUser = (id) => {
    dispatch(userDeleteAdmin(id));
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
            <div className="imgField p-2">
              <img src={row.img} alt="" className="w-50" />
            </div>
          </div>
        );
      },
    },
    { field: "id", headerName: "User ID", minWidth: 400, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: ({ row }) => {
        return row.role === "admin" ? "colorRed" : "greenColor";
      },
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
            <Link to={`/admin/user/${params.id}`}>
              <FaEdit className="admin-svgBtn" />
            </Link>

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
              <MdDelete
                className="admin-svgBtn"
                onClick={() => handledeleteUser(params.id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  const rows = [];

  users.allUser &&
    users.allUser.forEach((item) => {
      rows.push({
        img: item.avatar.url,
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
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
          All Users {users.allUser?.length}
        </h4>
        <div className="admin-path">
          <Link to="/admin/dashboard">/dashboard</Link>
          <Link to="/admin/create">/create/product</Link>
          <Link to="/admin/orders">/orders</Link>
          <Link to="/admin/products">/products</Link>
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
    <Helmet title="All Users Admin">
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

export default AdminAllUser;
