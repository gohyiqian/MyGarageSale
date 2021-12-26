import { Badge } from "@material-ui/core";
import SearchBar from "../components/SearchBar";
import {
  ShoppingCartOutlined,
  Instagram,
  Facebook,
  Pinterest,
  Person,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../App.module.css";
import { mobile } from "../responsiveMobile";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { actions } from "../redux/userSlice";
import { useHistory } from "react-router";
import { createShop } from "../redux/apiShop";
import { getShop } from "../redux/apiShop";

const NavBarStyle = {
  position: "sticky",
  top: "0",
  zIndex: "999",
  backgroundColor: "#945047",
  color: "white",
};

const Center = styled.div`
  flex: 2;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column", margin: "5px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.h1`
  display: flex;
  margin: 3px 15px;
  cursor: pointer;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 50px;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const SocialContainer = styled.div`
  display: flex;
  ${mobile({ display: "none" })}
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const NavBar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { shop } = useSelector((state) => state.shop);
  const history = useHistory();
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(actions.userProfileUpdateReset());
    dispatch(actions.logOut());
    history.push("/login");
  };
  const [popOut, setPopOut] = useState(false);

  const handleClose = () => {
    setPopOut(false);
  };
  const handlePopOut = () => {
    setPopOut(true);
  };

  const handleCreateShop = (e) => {
    e.preventDefault();
    dispatch(createShop());
    history.push(`/seller/shop`);
  };

  // check if shop exist
  useEffect(() => {
    if (userInfo) {
      dispatch(getShop());
    }
  }, [userInfo, dispatch]);

  return (
    <Navbar style={NavBarStyle} variant="light" expand="lg" collapseOnSelect>
      <Container>
        <Left>
          <LinkContainer to="/">
            <Logo>MYGARAGESALE</Logo>
          </LinkContainer>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Center>
            <SearchBar />
          </Center>

          <Nav className="ml-auto">
            <Right>
              <LinkContainer to="/cart">
                <Nav.Link className={styles.nav_dropdown}>
                  <Badge
                    badgeContent={cartItems.reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )}
                    color="primary"
                    max={100}
                  >
                    <ShoppingCartOutlined style={{ color: "white" }} />
                  </Badge>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <Person />
                  {userInfo.usertype.is_seller ? (
                    <NavDropdown
                      title={userInfo.name}
                      id="username"
                      className={styles.nav_dropdown}
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>
                          My Profile
                          <i className="fas fa-user px-2" />
                        </NavDropdown.Item>
                      </LinkContainer>
                      {/* <LinkContainer to="/seller/:id/shop"> */}
                      {shop.length !== 0 ? (
                        <LinkContainer to="/seller/shop">
                          <NavDropdown.Item>
                            Shop Profile <i className="fas fa-store px-2" />
                          </NavDropdown.Item>
                        </LinkContainer>
                      ) : (
                        <NavDropdown.Item onClick={handlePopOut}>
                          Create Shop <i className="fas fa-store px-2" />
                        </NavDropdown.Item>
                      )}
                      <NavDropdown.Item onClick={logOutHandler}>
                        Logout <i className="fas fa-sign-out-alt px-2" />
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title={userInfo.name}
                      id="username"
                      className={styles.nav_dropdown}
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>My Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logOutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <>
                  <LinkContainer to="/login" className={styles.nav_dropdown}>
                    <Nav.Link>
                      <span>Login</span>
                    </Nav.Link>
                  </LinkContainer>

                  {/* <LinkContainer to="/threejs" className={styles.nav_dropdown}>
                    <Nav.Link>
                      <span>3JS</span>
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/shop/nft" className={styles.nav_dropdown}>
                    <Nav.Link>
                      <span>NFTs</span>
                    </Nav.Link>
                  </LinkContainer> */}

                  <LinkContainer to="/shop/nft">
                    <Nav.Link>
                      <Button variant="dark">Connect Wallet</Button>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.usertype.is_seller && shop.length !== 0 && (
                <NavDropdown
                  title="Manage Shop"
                  id="seller"
                  className={styles.nav_dropdown}
                >
                  {/* <LinkContainer to="/">
                    <NavDropdown.Item>
                      My Buyers <i className="fas fa-money-bill px-2" />
                    </NavDropdown.Item>
                  </LinkContainer> */}

                  <LinkContainer to="/seller/productlist">
                    <NavDropdown.Item>
                      My Products <i className="fas fa-tshirt px-2" />
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="admin"
                  className={styles.nav_dropdown}
                >
                  <LinkContainer to="/admin/allusers">
                    <NavDropdown.Item>
                      All Users <i className="fas fa-users-cog px-2" />
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                      All Products <i className="fas fa-tshirt px-2" />
                    </NavDropdown.Item>
                  </LinkContainer>

                  {/* <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      All Orders
                      <i className="fas fa-shopping-basket px-2" />
                    </NavDropdown.Item>
                  </LinkContainer> */}
                </NavDropdown>
              )}
            </Right>
          </Nav>
        </Navbar.Collapse>

        {userInfo && userInfo.usertype.is_seller ? (
          <Modal show={popOut} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Hello{" "}
                <strong style={{ color: "#945047" }}>{userInfo.name}!</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Feeling excited to start your online business with us?
            </Modal.Body>
            <Modal.Footer>
              <Row>
                <Col>
                  <button
                    className={styles.loginBtn}
                    onClick={handleCreateShop}
                  >
                    Create Your Shop Now!
                  </button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>
        ) : (
          <div></div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
