import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const tabStyle = {
  backgroundColor: "#fff7f7",
  border: "0.5px solid #945047",
  // borderRadius: "10px",
  color: "#945047",
  textDecoration: "none",
};

const CheckoutSteps = ({ step1, step2, step3, step4, step5 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer style={tabStyle} to="/cart">
            <Nav.Link>Cart</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Cart</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer style={tabStyle} to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer style={tabStyle} to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer style={tabStyle} to="/order">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step5 ? (
          <LinkContainer style={tabStyle} to="/order/:id">
            <Nav.Link>Order Sent</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Order Sent</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
