import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/cartSlice";
import { useHistory } from "react-router";
import styles from "../App.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CheckOutSteps from "../components/CheckOutSteps";

const CheckOutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // get shippingAddress from store if already exists
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actions.saveShippingAddress({ address, city, postalCode, country })
    );
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ address, city, postalCode, country })
    );
    history.push("/payment");
  };

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <CheckOutSteps step1 step2 />
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mb-3">Shipping Information</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label> Address: </Form.Label>
                <Form.Control
                  className="mb-3"
                  required
                  type="text"
                  placeholder="Enter Address"
                  value={address ? address : ""}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  className="mb-3"
                  required
                  type="text"
                  placeholder="Enter city"
                  value={city ? city : ""}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control
                  className="mb-3"
                  required
                  type="text"
                  placeholder="Enter postal code"
                  value={postalCode ? postalCode : ""}
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>Country:</Form.Label>
                <Form.Control
                  className="mb-3"
                  required
                  type="text"
                  placeholder="Enter country"
                  value={country ? country : ""}
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
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

export default CheckOutPage;
