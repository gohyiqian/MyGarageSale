import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getProductsByShop } from "../redux/apiProduct";
import { getShopByShopId } from "../redux/apiShop";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
// import Paginate from "../components/Paginate";
import Loader from "../components/Loader";
import styles from "../App.module.css";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col } from "react-bootstrap";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #fcf5f5;
`;

const ProfileContainer = styled.div`
  height: 280px;
  position: relative;
`;

const Title = styled.h1`
  display: flex;
  font-size: 22px;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fcf5f5;
  // color: #ff69b4;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
`;

const ShopPage = ({ match }) => {
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.user);
  const { shop, status } = useSelector((state) => state.shop);
  const { products } = useSelector((state) => state.products);
  const [coverImg, setCoverImg] = useState("");

  // console.log(match.params.id);
  useEffect(() => {
    dispatch(getShopByShopId(match.params.id));
  }, [dispatch,match.params.id]);

  useEffect(() => {
    if (shop.shop_id) {
      dispatch(getShopByShopId(match.params.id));
      dispatch(getProductsByShop(shop.shop_id));
      setCoverImg(shop.image);
    }
  }, [dispatch,shop.shop_id, match.params.id, shop.image]);

  return (
    <>
      <NavBar />
      <ProfileContainer>
        <CoverImg src={coverImg} alt="" />
      </ProfileContainer>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <Row className="mb-2">
            <Col></Col>
            <Col>
              <LinkContainer to="/seller/shop">
                <button className={styles.loginBtn}>
                  <i className="fas fa-arrow-alt-circle-left px-2" /> Back
                </button>
              </LinkContainer>
            </Col>
            <Col md={4}>
              {" "}
              <Title>
                <i className="fas fa-store px-2" />
                {shop.name} <i className="fas fa-store px-2" />
              </Title>
            </Col>
            <Col>
              <LinkContainer to="/allshops">
                <button className={styles.loginBtn}>
                  View Other Shops <i className="fas fa-store px-2" />
                </button>
              </LinkContainer>
            </Col>
            <Col></Col>
          </Row>

          {/* <Paginate pages={pages} page={page} keyword={keyword} /> */}
          <Container>
            {products.length !== 0 ? (
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <span>Oops! This Shop has not listed any products yet</span>
            )}
          </Container>
          {/* <Paginate pages={pages} page={page} keyword={keyword} /> */}
        </>
      )}
    </>
  );
};

export default ShopPage;
