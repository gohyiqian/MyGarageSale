import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router";
import { Container, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getAllUsers, deleteUser } from "../redux/apiUser";
import NavBar from "../components/NavBar";
import { actions as userActions } from "../redux/userSlice";
import styles from "../App.module.css";

const AdminUsersListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, userInfo, error, users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.userDetailsReset());
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const handleDelete = (id) => {
    if (window.confirm("Confirm to delete this user?")) {
      dispatch(deleteUser(id));
    }
    window.location.reload();
  };

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <div>
          <h2
            className="mb-4 py-1"
            style={{ color: "#945047", backgroundColor: "#fcf5f5" }}
          >
            All Users in Database
          </h2>
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Seller</th>
                    <th>Buyer</th>
                    <th>Date Joined</th>
                    <th>Edit | Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {user.usertype.is_seller ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>

                      <td>
                        {user.usertype.is_buyer ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>{userInfo.date_joined.substring(0, 10)}</td>

                      <td className="py-2">
                        <LinkContainer to={`/admin/user/${user.id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>

                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default AdminUsersListPage;
