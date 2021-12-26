import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Message from "../components/Message";
import styles from "../App.module.css";
import { addToCart, removeFromCart } from "../redux/apiCart";
import { actions } from "../redux/orderSlice";
// import { Add, Remove } from "@material-ui/icons";
import CheckOutSteps from "../components/CheckOutSteps";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  // fail safe
  // qty?=x, if doesnt exist, show qty = 1
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    dispatch(actions.createOrderReset());
    history.push("/shipping");
  };

  // const handleQuantity = (type) => {
  //   if (type === "dec") {
  //     qty > 1 && setQty(qty - 1);
  //   } else {
  //     setQty(qty + 1);
  //   }
  // };

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <CheckOutSteps step1 />
        <Link to="/" className="btn btn-light my-2">
          Go Back
        </Link>
        <Row>
          <Col md={8}>
            <h1 className="mb-4">Shopping Cart</h1>
            {!userInfo && (
              <Message variant="warning">
                Please Log in <Link to="/login">Here</Link> to Cart Out
              </Message>
            )}

            {cartItems.length === 0 ? (
              <Message variant="info">
                Your cart is empty <Link to="/">Start Shopping!</Link>
              </Message>
            ) : (
              <ListGroup
                variant="flush"
                className={styles.customized_scrollbar}
              >
                {cartItems.map((item) => (
                  <ListGroupItem key={item.productId}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </Col>

                      <Col md={2}>${item.price}</Col>

                      <Col md={3}>
                        {/* <Remove /> */}
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.productId, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.stockCount).keys()].map((x) => (
                            <option key={x + 1} value={Number(x) + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                        {/* <Add /> */}
                      </Col>

                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => {
                            dispatch(removeFromCart(item.productId));
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card className="mb-4">
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2 className="mb-4">Summary:</h2>
                  <hr />
                  <h3>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
                  </h3>
                  <h3>
                    Subtotal: $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h3>
                </ListGroupItem>
              </ListGroup>

              <ListGroupItem>
                <button
                  onClick={checkoutHandler}
                  className={styles.loginBtn}
                  disabled={cartItems.length === 0}
                  type="button"
                >
                  Proceed To Checkout
                </button>
              </ListGroupItem>
            </Card>

            {/* <Card>
              <ListGroup variant="flush">
                <ListGroupItem style={{ height: "300px" }}>
                  <h2>Drag Here to Discard:</h2>
                  <hr />
                </ListGroupItem>
              </ListGroup>
            </Card> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPage;
