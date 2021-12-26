import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "../App.module.css";
import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import RatingStar from "../components/RatingStar";
import Loader from "../components/Loader";
// import { dummyProducts } from "../dummyData";
import { Add, Remove } from "@material-ui/icons";
import { addToCart } from "../redux/apiCart";
import { getProduct } from "../redux/apiProduct";
import Message from "../components/Message";
// import axios from "axios";
// import Message from '../components/Message'
import { createProductReview } from "../redux/apiProduct";
import { LinkContainer } from "react-router-bootstrap";
// import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

const Amount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
`;

const ShowProductPage = ({ match }) => {
  const [qty, setQty] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { product, status, error, reviewStatus } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.user);
  console.log(product);

  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [dispatch, match.params.id]);

  // useEffect(() => {
  //   async function getProduct() {
  //     const { data } = await axios.get(`/api/products/${match.params.id}`);
  //     console.log(data);
  //     setProduct(data);
  //   }
  //   getProduct();
  // }, []);

  // const addToCartHandler = () => {
  //   history.push(`/cart/${match.params.id}?qty=${qty}`);
  // };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
    window.location.reload();
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      qty > 1 && setQty(qty - 1);
    }
    if (type === "inc" && qty >= 1) {
      setQty(qty + 1);
    }
  };

  return (
    <>
      <NavBar />
      {status === "loading" ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container style={{ margin: "auto" }} className="mt-4 mb-4">
          <Row>
            <Col md={7} className={styles.show_img_parent}>
              <Image src={product.image} className={styles.show_img} />
            </Col>

            <Col md={5}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <RatingStar
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#945047"}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <strong> Item Price: </strong>${product.price}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Description: </strong> <br />
                  {product.description}
                </ListGroupItem>
              </ListGroup>

              <Card className="mt-5">
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Total Selected Price:</Col>
                      <Col>
                        <strong>${parseInt(product.price) * qty}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Pieces Available:</Col>
                      <Col>
                        {product.stockCount > 0 ? (
                          <i> In Stock </i>
                        ) : (
                          <i style={{ color: "red" }}> Out of Stock </i>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.stockCount > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Select Quantity:</Col>
                        <Col xs="auto" className="my-1">
                          <AmountContainer>
                            <Remove
                              style={{ cursor: "pointer" }}
                              onClick={() => handleQuantity("dec")}
                            />
                            <Amount>
                              <Form.Control
                                as="select"
                                value={Number(qty)}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                <option selected="true">Select Quantity</option>
                                {[...Array(product.stockCount).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={Number(x) + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Amount>
                            <Add
                              style={{ cursor: "pointer" }}
                              onClick={() => handleQuantity("inc")}
                            />
                          </AmountContainer>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Row>
                      <Col>Sizes Available:</Col>
                      <Col>{product.size}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Colors Available:</Col>
                      <Col>{product.color}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>
                        <LinkContainer to="/" className={styles.loginBtn}>
                          <button>Back to Shop</button>
                        </LinkContainer>
                      </Col>
                      <Col>
                        <button
                          onClick={() =>
                            dispatch(addToCart(product.id, Number(qty)))
                          }
                          className={styles.loginBtn}
                          disabled={product.stockCount === 0}
                          type="button"
                        >
                          Add to Cart
                        </button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Reviews</h4>
                  {!product.reviews && (
                    <Message variant="info">No Reviews</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>

              <ListGroup variant="flush">
                {product.reviews ? (
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <RatingStar value={review.rating} color={"#945047"} />
                      <p style={{ fontSize: "12px" }}>
                        Reviewed On: {review.createdAt.substring(0, 10)}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))
                ) : (
                  <Loader />
                )}

                <ListGroup.Item>
                  <h4>Write a review</h4>

                  {reviewStatus === "loading" && <Loader />}
                  {reviewStatus === "success" && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {reviewStatus === "failed" && (
                    <Message variant="danger">{error}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={handleReviewSubmit}>
                      <Form.Group controlId="rating">
                        <Form.Label>Choose Ratings:</Form.Label>
                        <Form.Control
                          className="mb-3"
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment" className="mb-2">
                        <Form.Label>Your Comments: </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <button
                        className={styles.loginBtn}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </button>
                    </Form>
                  ) : (
                    <Message variant="warning">
                      Please <Link to="/login">login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ShowProductPage;
