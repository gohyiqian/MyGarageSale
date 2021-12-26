import React from "react";
// import { ItemTypes } from "../utilities/itemTypes";
// import { useDrag } from "react-dnd";
import RatingStar from "./RatingStar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { LinkContainer } from "react-router-bootstrap";

const ProductCard = ({ product }) => {
  // const [{ isDragging }, drag] = useDrag({
  //   type: ItemTypes.CARD,
  //   product: product,
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  return (
    // <div ref={drag} className="m-2 py-3">
    <div className="m-2 py-3">
      <Card key={product.id} className={styles.card_effect}>
        <Link to={`/product/${product.id}`}>
          <Card.Img
            className={styles.card_img_top}
            variant="top"
            src={product.image}
            alt=""
            height="250px"
          />
        </Link>
        <Card.Body>
          <Card.Title className={styles.limit_text_length}>
            {product.name}
          </Card.Title>
          <Card.Text>${product.price}</Card.Text>

          <RatingStar
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"#f8e825"}
          />

          <LinkContainer to={`/product/${product.id}`}>
            <button className={styles.loginBtn} variant="primary">
              <strong>${product.price} | SHOP NOW </strong>
            </button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
