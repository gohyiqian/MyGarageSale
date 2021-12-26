import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router";
import { getOrderById, payOrder, deliverOrder } from "../redux/apiOrder";
import { actions } from "../redux/orderSlice";
import styled from "styled-components";
import styles from "../App.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Message";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../components/Loader";

const Description = styled.p`
  font-weight: 600;
  line-height: 10px;
`;
const fontStyle = {
  color: "#945047",
  fontWeight: "600",
};

const OrderCompletePage = () => {
  const params = useParams();
  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname.split("/")[2]);
  const orderId = params.id || location.pathname.split("/")[2];

  console.log(orderId);
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.user);
  const { orders, status, error, payStatus, deliverStatus } = useSelector(
    (state) => state.order
  );
  console.log(orders);

  // useEffect(() => {
  //   if (!orders) {
  //     window.location.reload();
  //     orders = JSON.parse(localStorage.getItem("orderItems"));
  //     console.log(orders);
  //   }
  // }, []);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!orders || orders.id !== orderId) {
        dispatch(getOrderById(orderId));
        // localStorage.setItem("orderItems", JSON.stringify(orders));
      }
      if (payStatus || deliverStatus) {
        dispatch(actions.payOrderReset());
        dispatch(actions.deliverOrderReset());
      } else if (!orders.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId]);

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const handlePayment = (payment) => {
    dispatch(payOrder(orders.id, payment));
    window.location.reload();
    // history.push("/profile");
  };

  const handleDelivery = () => {
    dispatch(deliverOrder(orders));
    window.location.reload();
  };

  return (
    <>
      <NavBar />
      {status === "loading" || status !== "success" ? (
        <Loader />
      ) : (
        <Container style={{ margin: "auto" }} className="mt-4 mb-4">
          <CheckOutSteps step1 step2 step3 step4 step5 />
          {status === "loading" && <Loader />}
          <Row className="justify-content-md-center">
            <Col md={8}>
              <h1 className="mb-3 px-3">Order: #{orders.id}</h1>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2 className="mb-3">Shipping Information</h2>
                  <Description>
                    Name:
                    <span style={fontStyle}> {userInfo.name}</span>
                  </Description>
                  <Description>
                    Email:<span style={fontStyle}> {userInfo.email}</span>
                  </Description>
                  <Description>
                    Shipping Address:{" "}
                    {Object.keys(orders).length !== 0 ? (
                      <span style={fontStyle}>
                        {orders.shippingAddress.country}{" "}
                        {orders.shippingAddress.city},{" "}
                        {orders.shippingAddress.postalCode}{" "}
                        {orders.shippingAddress.address},{" "}
                      </span>
                    ) : (
                      <Loader />
                    )}
                  </Description>
                  {orders.isDelivered ? (
                    <Message variant="success">
                      Order has been delivered on:{" "}
                      {orders.deliveredAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="warning">Not Delivered</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h2 className="mb-3">Payment Method</h2>
                  <Description>
                    Payment by:{" "}
                    <span style={fontStyle}>{orders.paymentMethod}</span>
                  </Description>
                  {orders.isPaid ? (
                    <Message variant="success">
                      Order has been Paid on: {orders.paidAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="warning">Not Paid</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h2 className="mb-3">Order Items</h2>
                  <Description>
                    Total:{" "}
                    {Object.keys(orders) && status === "success" ? (
                      <span style={fontStyle}>
                        {orders.orderItems.reduce(
                          (acc, item) => acc + item.qty,
                          0
                        )}{" "}
                        Items{" "}
                      </span>
                    ) : (
                      <Loader />
                    )}
                  </Description>
                  {orders.orderItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {orders.orderItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>

                            <Col>{item.name}</Col>

                            <Col md={4}>
                              {item.qty} X ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h2>Order Summary</h2>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Items:</Col>
                      <Col>
                        $
                        {orders.orderItems
                          .reduce((acc, item) => acc + item.price * item.qty, 0)
                          .toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>
                        Shipping <br />
                        (Free only if above $1k):
                      </Col>
                      <Col>${orders.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>${orders.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Total:</Col>
                      <Col>${orders.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  {!orders.isPaid && (
                    <ListGroupItem>
                      {payStatus === "loading" && <Loader />}

                      {/* {!sdkReady ? (
                      <Loader />
                    ) : ( */}
                      <PayPalButton
                        amount={orders.totalPrice}
                        onSuccess={handlePayment}
                      />
                      {/* )} */}
                    </ListGroupItem>
                  )}
                  {deliverStatus === "loading" && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    orders.isPaid &&
                    !orders.isDelivered && (
                      <ListGroupItem>
                        <button
                          type="button"
                          className={styles.loginBtn}
                          onClick={handleDelivery}
                        >
                          Delivered
                        </button>
                      </ListGroupItem>
                    )}
                  {orders.isDelivered && (
                    <ListGroupItem>
                      <button type="button" className={styles.loginBtn}>
                        Refund
                      </button>
                    </ListGroupItem>
                  )}
                  {error && <Message variant="danger">{error} </Message>}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      <hr />
      <Footer />
    </>
  );
};

export default OrderCompletePage;
