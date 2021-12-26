import styled from "styled-components";
import { dummyProducts } from "../dummyData";
import { mobile } from "../responsiveMobile";
import CategoryItem from "./CategoryItem";
// import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  // padding: 1.25rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  ${mobile({ padding: "0px", flexDirection: "column" })}
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

const Categories = () => {
  // const [cat, setCat] = useState();

  //   useEffect(() => {
  //     const getProductCategories = async () => {
  //       const res = await fetch("api/products/categories", {
  //         method: "GET",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       });

  //       if (res.ok) {
  //         const payload = await res.json();
  //         setCat(payload);
  //         // console.log(payload);
  //       } else {
  //         console.error("Server Error");
  //       }
  //     };
  //     getProductCategories();
  //   }, []);

  // const getDistinctCat = async (e) => {
  //   try {
  //     const { data } = await axios.get("/api/products/distinct/category/", {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Title>SHOP BY CATEGORIES</Title>
      <Container className="p-4">
        {/* using image from dummyData for category cards on HomePage*/}
        {dummyProducts.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
