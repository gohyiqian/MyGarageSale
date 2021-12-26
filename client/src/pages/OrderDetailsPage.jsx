import { getOrderDetails } from "../redux/apiOrder";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderDetailsPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(location);
  const { orders, status, error } = useSelector((state) => state.order);
  // console.log(location.pathname.split("/")[2]);
  const orderId = params.id || location.pathname.split("/")[2];
  console.log(orderId);
  console.log(orders);
  if (!orders) {
    orders = JSON.parse(localStorage.getItem("orderItems"));
  }
  console.log(orders);
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    // localStorage.setItem("orderItems", JSON.stringify(orders));
  }, [dispatch, orderId]);

  return (
    <>
      {status === "loading" || status !== "success" ? (
        <Loader />
      ) : (
        <span>
          {orders.shippingAddress.country}
          {orders.shippingAddress.country}
          {orders.shippingAddress.city}
          // {orders.shippingAddress.postalCode}
        </span>
      )}
    </>
  );
};

export default OrderDetailsPage;
