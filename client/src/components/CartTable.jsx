import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import styles from "../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actions, cartSelectors } from "../redux/cartSlice";

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcf5f5;
  padding: 3px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 5px 10px;
  background-color: #945047;
  color: white;
  cursor: pointer;
  margin: auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #fce1e1;
    color: black;
  }
`;

const TableHead = styled.th`
  text-align: center;
  border: #f5f5f5 solid 1px;
`;
const TableItems = styled.td`
  text-align: center;
  border: #f5f5f5 solid 1px;
  padding: 0 5px;
`;

const CartTable = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelectors.selectAll);
  //   const [employees, setEmployees] = useState([]);
  // const [tableItems, setTableItems] = useState(cartItems);
  console.log(cartItems);

  let url = "https://fakestoreapi.com/products?limit=8";

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url);
      const cartItems = res.data;
      dispatch(actions.cartAddMany(cartItems));
    };
    getData();
  }, [url, dispatch]);

  const renderHeader = () => {
    let headerElement = ["No.", "Items", "Price", "Quantity", ""];
    return headerElement.map((key, index) => {
      return <TableHead key={index}>{key}</TableHead>;
    });
  };

  const renderBody = () => {
    return (
      cartItems &&
      cartItems.map(({ id, title, price, quantity }) => {
        return (
          <tr key={id}>
            <TableItems>{id}</TableItems>
            <TableItems>{title}</TableItems>
            <TableItems>{price}</TableItems>
            <TableItems>2</TableItems>
            <TableItems>
              <Button
                onClick={() => {
                  dispatch(actions.cartRemove(id));
                }}
              >
                Delete
              </Button>
            </TableItems>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <Container>
        <Title>User Cart</Title>
        <table className={styles.customized_scrollbar}>
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </Container>
    </>
  );
};

export default CartTable;
