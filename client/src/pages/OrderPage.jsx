import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { addOrder } from "../redux/apiOrder";
import { useHistory } from "react-router";
import styles from "../App.module.css";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Message";
import { actions } from "../redux/orderSlice";

const Description = styled.p`
  font-weight: 600;
  line-height: 10px;
`;
const fontStyle = {
  color: "#945047",
  fontWeight: "600",
};

const OrderPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [message, setMessage] = useState("");
  const { paymentMethod, cartItems, shippingAddress } = useSelector(
    (state) => state.cart
  );
  // const code = useRef("");

  const { userInfo } = useSelector((state) => state.user);

  const itemsPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  const shippingPrice = (itemsPrice > 1000 ? 0 : itemsPrice * 0.1).toFixed(2);

  const taxPrice = Number(0.082 * itemsPrice).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const promoPrice = (totalPrice * 0.95).toFixed(2);

  const submitPromo = (e) => {
    // e.preventdefault();
    if (promoCode === "X12HYQ") {
      setFinalPrice(promoPrice);
      setMessage("Promo Code Applied");
    } else setMessage("Invalid Promo Code");
  };

  const { orders, status, error } = useSelector((state) => state.order);
  // console.log(orders);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!paymentMethod) {
    history.push("/payment");
  }

  if (!userInfo) {
    history.push("/login");
  }

  const handleOrder = () => {
    dispatch(
      addOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  useEffect(() => {
    if (status === "success") {
      history.push(`/order/${orders.id}`);
      dispatch(actions.createOrderReset());
    }
  }, [status, history, orders.id, dispatch]);

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <CheckOutSteps step1 step2 step3 step4 />
        {status === "loading" && <Loader />}
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1 className="mb-3 px-3">Your Order</h1>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2 className="mb-3">Shipping Information</h2>

                <Description>
                  Shipping Address:{" "}
                  <span style={fontStyle}>
                    {shippingAddress.address}, {shippingAddress.city},{" "}
                    {shippingAddress.country} {shippingAddress.postalCode}{" "}
                  </span>
                </Description>
              </ListGroupItem>

              <ListGroupItem>
                <h2 className="mb-3">Payment Method</h2>
                <Description>
                  Payment by: <span style={fontStyle}>{paymentMethod}</span>
                </Description>
              </ListGroupItem>

              <ListGroupItem>
                <h2 className="mb-3">Order Items</h2>
                <Description>
                  Total:{" "}
                  <span style={fontStyle}>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items{" "}
                  </span>
                </Description>
                {cartItems.length === 0 ? (
                  <Message variant="info">Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
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

                          <Col>
                            <Link to={`/product/${item.productId}`}>
                              {item.name}
                            </Link>
                          </Col>

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
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>
                      Shipping <br />
                      (Free only if above $1k):
                    </Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Promo Code</Col>
                    <Col>
                      <Form onSubmit={submitPromo}>
                        <Form.Group controlId="promocode">
                          <Form.Control
                            required
                            type="promocode"
                            placeholder="Enter Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        {/* 
                        <button type="submit" className={styles.loginBtn}>
                          Submit
                        </button> */}
                      </Form>
                    </Col>
                  </Row>
                  {message === "Invalid Promo Code" && (
                    <Message variant="danger">{message}</Message>
                  )}
                  {message === "Promo Code Applied" && (
                    <Message variant="info">{message}</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${finalPrice ? finalPrice : totalPrice}</Col>
                  </Row>
                </ListGroupItem>

                {error && <Message variant="danger">{error} </Message>}

                <ListGroupItem className="mt-2">
                  <button
                    type="button"
                    className={styles.loginBtn}
                    disabled={cartItems === 0}
                    onClick={handleOrder}
                  >
                    Place Order
                  </button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <hr />
      <Footer />
    </>
  );
};

export default OrderPage;
