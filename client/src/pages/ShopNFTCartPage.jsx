import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTs } from "../redux/productSlice";
import styled from "styled-components";
import styles from "../App.module.css";
import NavBar from "../components/NavBar";
import CartDndSection from "../components/CartDndSection";
import NFTCardTest from "../components/NFTCardTest";

const Container = styled.div`
  display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  flex-flow: row wrap;
  background-color: #fcf5f5;
  justify-content: space-around;
  padding: 50px;
`;

const ShopNFTCartPage = () => {
  const dispatch = useDispatch();
  const { nfts, status } = useSelector((state) => state.products);
  console.log(nfts);

  useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div>
        <div className={styles.loader} />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <h2
        style={{ margin: "10px", backgroundColor: "#fcf5f5", padding: "10px" }}
      >
        Shop OpenSea NFTs
      </h2>
      <Container>
        {nfts.map((product) => (
          <NFTCardTest product={product} key={product.id} />
        ))}
      </Container>
      <CartDndSection />
    </>
  );
};

export default ShopNFTCartPage;
