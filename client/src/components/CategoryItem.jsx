import styled from "styled-components";
import { mobile } from "../responsiveMobile";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { getProductsByCategory } from "../redux/apiProduct";
import { useDispatch } from "react-redux";

const Info = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ width: "40vh" })}
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  border-radius: 10px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  min-width: 250px;
  margin: 10px;
  position: relative;
  justify-content: center;
  cursor: pointer;

  &:hover ${Image} {
    opacity: 0.5;
  }
  &:hover ${Button} {
    background-color: #a94c4c;
    color: white;
    transition: all 0.5s ease;
    transform: scale(1.1);
  }
`;

const CategoryItem = ({ item }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getProductsByCategory(`?category=${item.category}&page=1`));
    history.push(`/${item.category}?category=${item.category}&page=1`);
  };

  return (
    <Container onClick={handleClick}>
      {/* <Link to={`/${item.category}?category=${item.category}&page=1`}> */}
      <Image src={item.image} />
      <Info>
        <Title>{item.category.toUpperCase()}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      {/* </Link> */}
    </Container>
  );
};

export default CategoryItem;
