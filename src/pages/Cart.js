import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice.js/cartSlice";
import { Link } from "react-router-dom";
import laptop from "../img/laptop.jpg";
import { toast } from "react-toastify";

const Cart = () => {
  // const { user } = useSelector((state) => state.user);
  const { cartItem, totalAmount } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleDeletProduct = (id) => {
    dispatch(cartActions.deleteItem(id));
  };

  const handleIncreaseProduct = (item) => {
    if (item.stock <= item.quantity) {
      toast.warning(`Max Item Stock ${item.stock}`, {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    const id = item.id;
    dispatch(
      cartActions.addItem({
        id,
        name: item.name,
        image: item.image,
        price: item.price,
        category: item.category,
        stock: item.stock,
      })
    );
  };

  const handleDecreaseProduct = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  // const checkOutHandler = () => {};

  return (
    <div>
      <div className="cart-items">
        {cartItem.length === 0 ? (
          <p className="text-center mt-3 mb-3">Empty Cart</p>
        ) : (
          cartItem.map((item) => (
            <div className="cart-items-details d-flex align-items-center justify-content-around mt-2 mb-4">
              <div className="cartItem-img">
                <img className="w-75" src={laptop} alt="Product" />
              </div>
              <div className="cartItem-product-deatils">
                <p className="m-0 mb-1">{item.name}</p>
                <span>Price: {item.price}</span> <br />
                <div className="isIncrease-removeBtn mt-2">
                  <div className="quantityBox">
                    <i
                      className="ri-subtract-line"
                      onClick={() => handleDecreaseProduct(item.id)}
                    ></i>
                    <span>{item.quantity}</span>
                    <i
                      className="ri-add-line"
                      onClick={() => {
                        handleIncreaseProduct(item);
                      }}
                    ></i>
                  </div>{" "}
                  <button
                    className="handleRemoveBtn mt-2"
                    onClick={() => handleDeletProduct(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="borderDiv"></div>
        <div className="cart-detils-btn text-center mt-3">
          <p className="subTotalAmount">
            Sub Total: <span>{totalAmount}</span>
          </p>
          {cartItem.length > 0 ? (
            <Link to={"/shipping"}>
              <button className="handleRemoveBtn">Check Out</button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
