import styled from "styled-components";
import styles from "../App.module.css";
import { useEffect, useState } from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { register } from "../redux/apiUser";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateUserProfile } from "../redux/apiUser";

const Hr = styled.hr`
  color: red;
  border: solid grey 1px;
  width: 300px;
`;

const linkStyle = {
  textDecoration: "none",
  color: "#945047",
};

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);
  const [popOut, setPopOut] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo, status, error } = useSelector((state) => state.user); // get user info from store

  useEffect(() => {
    if (userInfo) {
      setPopOut(true);
    }
    if (error) {
      setMessage(error);
    }
  }, [userInfo, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (error) {
      return setMessage(error);
    }
    if (!username && !email && !password && !confirmPassword) {
      return setMessage("Form is empty!");
    }
    if (!username || !email || !password || !confirmPassword) {
      return setMessage("Please complete your fill in!");
    }
    if (username === email) {
      return setMessage("Username same as email!");
    }
    if (email.includes("@") && email.includes(".com") === false) {
      return setMessage("Email format is wrong!");
    }
    if (password.length < 6) {
      return setMessage("Password to be > 6 char!");
    }
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match!");
    } else {
      dispatch(register(username, email, password));
      console.log("pop");
      setPopOut(true);
    }
  };

  const handleSeller = () => {
    dispatch(
      updateUserProfile({
        id: userInfo.id,
        username: username,
        email: email,
        password: password,
        is_buyer: isBuyer,
        is_seller: isSeller,
        bio: "Hello Everyone!",
      })
    );
    setPopOut(false);
    setMessage("");
    history.push("/login");
  };

  const handleClose = () => {
    setPopOut(false);
  };

  // Fetch() Method
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (username.length && email && password && confirmPassword === 0) {
  //     return setMessage("Please enter username");
  //   }
  //   if (confirmPassword !== password) {
  //     return setMessage("Please key same password");
  //   }
  //   const response = await fetch("api/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       email: email,
  //       password: password,
  //     }),
  //   });
  //   const result = await response.json();
  //   console.log(result);

  //   if (result.savedUser) {
  //     window.location.assign("/login");
  //   } else if (result.errors) {
  //     setMessage(result.errors[0].msg);
  //   }
  // };

  // Axios Method
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (username.length && email && password && confirmPassword === 0) {
  //     return setMessage("Please enter username");
  //   }
  //   if (confirmPassword !== password) {
  //     return setMessage("Please key same password");
  //   } else {
  //     const user = {
  //       username: username,
  //       email: email,
  //       password: password,
  //     };
  //     try {
  //       await axios
  //         .post(`${process.env.REACT_APP_BASE_URL}auth/register`, user)
  //         .then((response) => {
  //           console.log(response);
  //         });
  //       window.location.assign("/login");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <>
      <NavBar />
      <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>
          <Link to="/" style={linkStyle}>
            <h1 className="mb-2" style={{ color: "#945047" }}>
              GARAGESALE
            </h1>
          </Link>
          <p className="mb-4">
            <i>Create an Account Now!</i>
          </p>
          {status === "loading" && <Loader />}
          <Form>
            <Form.Group>
              <Form.Control
                type="username"
                className="mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control
                type="email"
                className="mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                type="password"
                className="mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control
                type="password"
                className="mb-4"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {message && <span className={styles.loginError}>{message}</span>}

            <button
              type="submit"
              className={styles.loginBtn}
              onClick={handleSubmit}
            >
              CREATE
            </button>
          </Form>

          <Link to="/login" style={linkStyle}>
            <p>Already have Account? Go Login!</p>
          </Link>
          <Hr />
          <p>Terms & Conditions Apply</p>
        </div>
      </div>
      {userInfo ? (
        <Modal show={popOut} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Welcome{" "}
              <strong style={{ color: "#945047" }}>{userInfo.name}!</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Welcome on board, what do you aspire to do!</Modal.Body>
          <Modal.Footer>
            <Form onSubmit={handleSeller}>
              <Row>
                <Col>
                  <Form.Group controlId="is_buyer">
                    <Form.Check
                      type="checkbox"
                      className="mb-3"
                      label="I just love shopping"
                      checked={isBuyer}
                      onChange={(e) => setIsBuyer(e.target.checked)}
                    ></Form.Check>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="is_seller">
                    <Form.Check
                      type="checkbox"
                      className="mb-3"
                      label="I want to start my Shop too!"
                      checked={isSeller}
                      onChange={(e) => setIsSeller(e.target.checked)}
                    ></Form.Check>
                  </Form.Group>
                </Col>
                <Col>
                  <button className={styles.loginBtn} type="submit">
                    Submit
                  </button>
                </Col>
              </Row>
            </Form>
          </Modal.Footer>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default RegisterPage;
