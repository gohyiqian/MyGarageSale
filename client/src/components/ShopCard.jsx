import { useState } from "react";
import { Card, Modal, Row, Col } from "react-bootstrap";
import styles from "../App.module.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const Text = styled.p`
  color: #945047;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  padding-right: 5px;
`;

const ShopCard = ({ shop }) => {
  const history = useHistory();
  const [popOut, setPopOut] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const handleClose = () => {
    setPopOut(false);
    history.push("/login");
  };
  const handlePopOut = () => {
    setPopOut(true);
  };
  const handleViewShop = () => {
    if (userInfo !== null) {
      history.push(`/seller/shop/${shop.shop_id}`);
    } else history.push("/login");
  };

  return (
    <div className="m-2 py-3">
      <Card key={shop.id} className={styles.card_effect}>
        <Card.Img
          className={styles.card_img_top}
          variant="top"
          src={shop.image}
          alt=""
          height="250px"
          style={{ cursor: "pointer" }}
          onClick={!userInfo ? handlePopOut : handleViewShop}
        />

        <Card.Body>
          <Card.Title>{shop.name}</Card.Title>
          <Card.Text
            className={styles.limit_text_length}
            style={{ display: "flex" }}
          >
            <Text>Info: </Text>
            {shop.description}
          </Card.Text>
          <Card.Text style={{ display: "flex" }}>
            <Text>Contact: </Text> {shop.contact}
          </Card.Text>

          <button
            className={styles.loginBtn}
            variant="primary"
            onClick={!userInfo ? handlePopOut : handleViewShop}
          >
            <strong>VIEW SHOP </strong>
            <i className="fas fa-store px-2" />
          </button>
        </Card.Body>
      </Card>

      <Modal show={popOut} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Want to See More?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please Login or Register to view Shop's Products!
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <button className={styles.loginBtn} onClick={handleClose}>
                Go Login Now!
              </button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShopCard;
