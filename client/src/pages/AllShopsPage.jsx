import styled from "styled-components";
import ShopCard from "../components/ShopCard";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
// import Paginate from "../components/Paginate";
import NavBar from "../components/NavBar";
import { getAllShops } from "../redux/apiShop";

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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fcf5f5;
`;

const AllShopsPage = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const { userInfo } = useSelector((state) => state.user);
  const { shops, status } = useSelector((state) => state.shop);
  console.log(shops);

  useEffect(() => {
    dispatch(getAllShops());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Title className="mt-3">
        Garage Seller Shops
        <i className="fas fa-store px-2" />
      </Title>

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          {/* <Paginate pages={pages} page={page} keyword={keyword} /> */}
          {status === "success" && Object.keys(shops).length !== 0 ? (
            <Container>
              {shops.map((shop) => (
                <ShopCard shop={shop} key={shop.shop_id} />
              ))}
            </Container>
          ) : (
            <Loader />
          )}

          {/* <Paginate pages={pages} page={page} keyword={keyword} /> */}
        </>
      )}
    </>
  );
};

export default AllShopsPage;
