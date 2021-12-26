import { useEffect } from "react";
// import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import { deleteUser } from "../redux/apiUser";
import NavBar from "../components/NavBar";
// import { actions as userActions } from "../redux/userSlice";
import { getAllOrders } from "../redux/apiOrder";
import styles from "../App.module.css";

const AdminOrderListsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, userInfo, error } = useSelector((state) => state.user);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  // const handleDelete = (id) => {
  //   if (window.confirm("Confirm to delete this user?")) {
  //     dispatch(deleteUser(id));
  //   }
  //   window.location.reload();
  // };
  console.log(orderList);
  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <div>
          <h2 className="mb-4">All Orders on Database</h2>
          {status === "loading" ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className={styles.customized_scrollbar}>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Buyer</th>
                    <th>Order Date</th>
                    <th>Order Amount</th>
                    <th>Order Paid</th>
                    <th>Delivery Status</th>
                  </tr>
                </thead>

                {/* {orderList.map((order) => (
                  <p>{order}</p>
                ))} */}

                {/* <tbody>
                  {orderList.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.user.username}</td>
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

                      <td className="py-2">
                        <LinkContainer to={`/order/${order.id}`}>
                          <button variant="light" className={styles.loginBtn}>
                            Details
                          </button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </Table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default AdminOrderListsPage;
