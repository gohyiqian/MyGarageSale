import styled from "styled-components";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
// import axios from "axios";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
// import { dummyProducts } from "../dummyData";
import { getProductsByCategory } from "../redux/apiProduct";
// import { useHistory } from "react-router";
import Paginate from "./Paginate";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #fcf5f5;
`;

const ProductsListByCat = ({ category, filters, sort }) => {
  // (cat, filters, sort) props passed from ProductCategoryPage
  // console.log(filters);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  // const history = useHistory();

  // let category = history.location.search; //to pass to backend
  // console.log(category);
  // console.log(cat);

  const { productsByCat, catStatus, status, page, pages } = useSelector(
    (state) => state.products
  );
  console.log(productsByCat);

  useEffect(() => {
    console.log("useEffect 01: Getting Products by Category");
    if (catStatus === "idle") {
      dispatch(getProductsByCategory(category));
    }
  }, [category, catStatus, dispatch]);

  // filter products to find those that matches the category
  // useEffect activated when [products,filters] changes
  useEffect(() => {
    if (productsByCat) {
      console.log("useEffect 02: Filtering");
      // console.log(filters);
      if (filters.color === "All" || filters.size === "All") {
        setFilteredProducts(productsByCat);
        // console.log(filteredProducts);
      } else {
        const filterOption = productsByCat.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        );
        // console.log(filterOption);
        setFilteredProducts(filterOption);
        // console.log(filteredProducts);
      }
    }
  }, [filters, productsByCat]);

  // Sorting by Prices
  useEffect(() => {
    console.log("useEffect 03: Sorting");
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      {console.log("Rendering first")}

      {!productsByCat || catStatus === "loading" || status === "loading" ? (
        <Loader />
      ) : (
        <>
          <Container>
            {filteredProducts
              ? filteredProducts.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))
              : productsByCat.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
          </Container>
          <Paginate pages={pages} page={page} category={category} />
        </>
      )}
    </>
  );
};

export default ProductsListByCat;
