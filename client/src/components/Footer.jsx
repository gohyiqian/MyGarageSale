import { MailOutline, Phone, Room } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsiveMobile";

const Container = styled.div`
  display: flex;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
  background-color: #fcf5f5;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Center = styled.div`
  flex: 1;
  padding: 30px;
  ${mobile({ display: "none" })}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  font-size: 12px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 30px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;
const Desc = styled.span`
  font-size: 13px;
  text-align: justify;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 13px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <h2>GARAGESALE</h2>
        <Desc className="mt-3 ">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        {/* <p>© 2021 yiqiangoh_kenji</p> */}
      </Left>
      <Center>
        <h3 className="mb-4">Useful Links</h3>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <h3 className="mb-4">Contact</h3>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 79 Anson Rd, Level 20,
          Singapore 079906
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +65 1234 5678
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@garagesale.com
        </ContactItem>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" />
      </Right>
    </Container>
  );
};

export default Footer;
