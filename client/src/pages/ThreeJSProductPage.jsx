import { useState, useEffect } from "react";
import Commerce from "@chec/commerce.js";
import Item from "../components/Item";
import NavBar from "../components/NavBar";
import styled from "styled-components";

const commerce = new Commerce(
  "pk_test_18265006f98e5bc6f77efa3b7d99014bf7e1a31d0e6a3"
);

const Container = styled.div`
  display: flex;
  padding: 80px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #fcf5f5;
`;

const ThreeJSProductPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    commerce.products.list().then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        {products.map((product) => (
          <Item key={product.id} {...product} />
        ))}
      </Container>
    </>
  );
};

export default ThreeJSProductPage;
