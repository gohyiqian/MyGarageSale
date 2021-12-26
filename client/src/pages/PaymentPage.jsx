import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/cartSlice";
import { useHistory } from "react-router";
import styles from "../App.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CheckOutSteps from "../components/CheckOutSteps";

const PaymentPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const history = useHistory();
  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();
  const [payment, setPayment] = useState("PayPal");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.savePaymentMethod(payment));
    localStorage.setItem("paymentMethod", JSON.stringify(payment));
    history.push("/order");
  };

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <CheckOutSteps step1 step2 step3 />
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mb-3">Payment</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label as="legend">Select Payment Method</Form.Label>
                <hr />
                <Col>
                  <Form.Check
                    type="radio"
                    label="Credit Card"
                    id="creditcard"
                    value="Credit Card"
                    name="paymentMethod"
                    onChange={(e) => setPayment(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="PayPal"
                    id="paypal"
                    value="Paypal"
                    name="paymentMethod"
                    checked
                    onChange={(e) => setPayment(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Stripe"
                    id="stripe"
                    value="Stripe"
                    name="paymentMethod"
                    onChange={(e) => setPayment(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    className="mb-3"
                    type="radio"
                    label="Crypto.com"
                    id="crypto"
                    value="Crypto.com"
                    name="paymentMethod"
                    onChange={(e) => setPayment(e.target.value)}
                  ></Form.Check>
                </Col>
              </Form.Group>

              <button type="submit" className={styles.loginBtn}>
                Continue
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
      <hr />
      <Footer />
    </>
  );
};

export default PaymentPage;
