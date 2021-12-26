import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styled from "styled-components";
import styles from "../App.module.css";
import { getUserDetails, updateUserProfile } from "../redux/apiUser";
import { getMyOrders } from "../redux/apiOrder";
import { useHistory } from "react-router";
import axios from "axios";
import { mobile } from "../responsiveMobile";

const ProfileContainer = styled.div`
  height: 280px;
  position: relative;
`;
const UserCoverImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
`;

const UserProfileImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: 10vh 0 10vh 16vh;
  top: 100px;
  border: 5px solid white;
  ${mobile({ width: "25vh", height: "25vh", margin: "auto" })}
`;

const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [upload, setUpload] = useState(false);

  const {
    status: userStatus,
    userInfo,
    profileDetails,
  } = useSelector((state) => state.user);

  const isBuyer = userInfo.usertype.is_buyer;
  const isSeller = userInfo.usertype.is_seller;

  const {
    orderList,
    error: orderError,
    status: orderStatus,
  } = useSelector((state) => state.order);

  // console.log(orderList);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!profileDetails || userInfo.id !== profileDetails.id || !orderList) {
        // dispatch(actions.userProfileUpdateReset());
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrders());
      } else {
        // pre-fill the form with existing logged-in user data
        setName(profileDetails.name);
        setEmail(profileDetails.email);
        setPassword(profileDetails.password);
        setConfirmPassword(profileDetails.password);
        setBio(profileDetails.usertype.bio);
        setProfileImage(profileDetails.usertype.profile_image);
      }
    }
  }, [dispatch, history, userInfo, profileDetails, orderList]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: profileDetails.id,
          username: name,
          email: email,
          password: password,
          is_buyer: isBuyer,
          is_seller: isSeller,
          bio: bio,
        })
      );
      setMessage("");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", profileDetails.id);
    setUpload(true);
    try {
      const { data } = await axios.post("/api/users/upload/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setProfileImage(data);
      setUpload(false);
    } catch (error) {
      setUpload(false);
    }
    dispatch(getUserDetails("profile"));
  };

  const handleCoverImgUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", profileDetails.id);
    setUpload(true);
    try {
      const { data } = await axios.post("/api/users/upload/cover/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setCoverImage(data);
      setUpload(false);
    } catch (error) {
      setUpload(false);
    }
    dispatch(getUserDetails("profile"));
  };

  // Split out amazon url
  // console.log(
  //   profileDetails.usertype.cover_image.split("com/")[1].split("?")[0]
  // );
  // console.log(
  //   profileDetails.usertype.profile_image.split("com/")[1].split("?")[0]
  // );

  return (
    <>
      <NavBar />
      {!profileDetails && userStatus === "loading" && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
      {Object.keys(profileDetails).length !== 0 && userStatus === "success" ? (
        <ProfileContainer>
          <UserCoverImg
            src={
              Object.keys(profileDetails).length !== 0
                ? profileDetails.usertype.cover_image
                : // .split("com/")[1]
                  // .split("?")[0]
                  profileDetails.usertype.cover_image
            }
            alt=""
          />
          <UserProfileImg
            src={
              Object.keys(profileDetails).length !== 0
                ? profileDetails.usertype.profile_image
                : // .split("com/")[1]
                  // .split("?")[0]
                  profileDetails.usertype.profile_image
            }
            alt=""
          />
        </ProfileContainer>
      ) : (
        <Loader />
      )}

      <Row style={{ margin: "40px" }}>
        <Col
          md={3}
          // className="p-4"
          style={{ backgroundColor: "#fcf5f5" }}
          className={styles.scrollbar_v2}
        >
          <h2 style={{ textAlign: "center" }} className="mt-5">
            {userInfo.name}{" "}
          </h2>
          <hr />
          <h4 style={{ textAlign: "center" }}> My Bio </h4>
          <hr />
          <span>{userInfo.usertype.bio}</span>
          <h4 className="mt-3" style={{ textAlign: "center" }}>
            Joined
          </h4>
          <hr />
          <span>{userInfo.date_joined}</span>
          <h4 className="mt-3" style={{ textAlign: "center" }}>
            Edit Profile
          </h4>
          <hr />

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="mb-3"
                required
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                className="mb-3"
                required
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="passwordConfirm" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="text"
                rows={3}
                placeholder="Enter image"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                id="image-file"
                accept="image/png, image/jpeg"
                placeholder="Enter image"
                onFocus={coverImage}
                onChange={handleFileUpload}
              />
              {upload && <Loader />}
            </Form.Group>

            <Form.Group controlId="Bio" className="mb-3">
              <Form.Label>Update Biography</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Update Bio"
                value={bio}
                rows={5}
                onChange={(e) => setBio(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {message && <Message variant="danger">{message}</Message>}
            <button type="submit" className={styles.loginBtn}>
              Update
            </button>
          </Form>
        </Col>

        <Col md={9} className="px-4">
          {/* <Form.Group className="mb-4">
            <Form.Control
              type="file"
              id="image-file"
              accept="image/png, image/jpeg"
              onChange={handleCoverImgUpload}
            />
            {upload && <Loader />}
          </Form.Group> */}
          <h2
            style={{ color: "#945047", backgroundColor: "#fcf5f5" }}
            className="mb-3 py-1"
          >
            My Purchase Order
          </h2>
          {orderStatus === "loading" ? (
            <Loader />
          ) : orderError ? (
            <Message variant="danger">{orderError}</Message>
          ) : (
            <>
              <div className={styles.customized_scrollbar}>
                <Table striped responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Order Amount</th>
                      <th>Payment Status</th>
                      <th>Delivery Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orderList.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            <strong style={{ color: "green" }}>
                              Paid on {order.paidAt.substring(0, 10)}{" "}
                            </strong>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <strong style={{ color: "green" }}>
                              Sent on {order.paidAt.substring(0, 10)}
                            </strong>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order.id}`}>
                            <Button className="btn-sm" variant="secondary">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Col>
      </Row>
      <hr />
      <Footer />
    </>
  );
};

export default UserProfilePage;
