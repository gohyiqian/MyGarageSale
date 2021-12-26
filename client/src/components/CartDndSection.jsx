import styled from "styled-components";
// import { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utilities/itemTypes";
// import CartTable from "./CartTable";
// import { useDispatch, useSelector } from "react-redux";
// import { actions, cartSelectors } from "../redux/cartSlice";

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  height: 200px;
  position: sticky;
  bottom: 0;
  z-index: 999;
  background-color: white;
  box-shadow: 0px -6px 10px 0px rgba(0, 0, 0, 0.1);
`;

const CartDiscardBox = styled.div`
  display: flex;
  flex: 1;
  background: #fcf5f5;
  margin: 30px 150px;
  border-radius: 20px;
  height: 150px;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 5px 5px rgb(0 0 0 / 5%);
`;

const CartAddBox = styled.div`
  display: flex;
  flex: 1;
  background: #fcf5f5;
  margin: 30px 150px;
  border-radius: 20px;
  height: 150px;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 5px 5px rgb(0 0 0 / 5%);
`;

// const CartStatus = styled.div`
//   display: flex;
//   flex: 2;
//   background: #fcf5f5;
//   height: 220px;
//   margin: 30px;
//   justify-content: center;
//   align-items: center;
// `;

const CartDndSection = () => {
  // const dispatch = useDispatch();
  // const cartItems = useSelector(cartSelectors.selectAll);
  // const [basket, setBasket] = useState([]);
  // Drag&Drop Feature
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    // drop: (item) =>
    //   setBasket((basket) =>
    //     !basket.includes(item) ? [...basket, item] : basket
    //   ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Container>
      <CartDiscardBox
        ref={drop}
        style={{
          backgroundPosition: "center",
          backgroundSize: "130% 120%",
          backgroundRepeat: "no-repeat",
          backgroundColor: isOver ? "#ffcccb" : "#f5f5f5",
        }}
      >
        {isOver && <div>Drop Here to Discard</div>}
      </CartDiscardBox>

      <CartAddBox
        ref={drop}
        style={{
          backgroundPosition: "center",
          backgroundSize: "130% 120%",
          backgroundRepeat: "no-repeat",
          backgroundColor: isOver ? "#deefc5" : "#f5f5f5",
        }}
      >
        {isOver && <div>Drop Here to Add to Cart</div>}
      </CartAddBox>

      {/* <CartTable /> */}
      {/* <CartStatus>Table of Status</CartStatus> */}
    </Container>
  );
};

export default CartDndSection;
