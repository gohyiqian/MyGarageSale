import styled from "styled-components";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
// import axios from "axios";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
// import { dummyProducts } from "../dummyData";
import { getProductsByKeyword } from "../redux/apiProduct";
import { useHistory } from "react-router";
import Paginate from "../components/Paginate";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #fcf5f5;
`;

const Title = styled.h1`
  display: flex;
  font-size: 22px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fcf5f5;
`;

const ProductsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, status, page, pages } = useSelector(
    (state) => state.products
  );
  // console.log(products);

  let keyword = history.location.search; //search keywords
  // console.log(keyword);

  // ?keyword=coat&page=1
  useEffect(() => {
    dispatch(getProductsByKeyword(keyword));
  }, [dispatch, keyword]);

  // getProducts by category
  // useEffect activated when [cat] changes
  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await axios.get(
  //         cat
  //           ? `${process.env.REACT_APP_BASE_URL}products?category=${cat}`
  //           : // if no cat, just fetch from this
  //             `${process.env.REACT_APP_BASE_URL}products`
  //       );
  //       setProducts(res.data);
  //       // console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getProducts();
  // }, [cat]);

  return (
    <>
      <Title className="mt-3">SHOP BY PRODUCTS</Title>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <Paginate pages={pages} page={page} keyword={keyword} />
          <Container>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </Container>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default ProductsList;
