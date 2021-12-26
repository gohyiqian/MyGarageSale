import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "../App.module.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getProductsByKeyword,
  createProduct,
  deleteProduct,
} from "../redux/apiProduct";
import NavBar from "../components/NavBar";
import Paginate from "../components/Paginate";
import { actions } from "../redux/productSlice";

const AdminProductsListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user);
  const {
    status: productStatus,
    error: productError,
    products,
    page,
    pages,
  } = useSelector((state) => state.products);

  let keyword = history.location.search;
  console.log(keyword);

  useEffect(() => {
    dispatch(actions.productCreateReset());
    if (!userInfo && !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(getProductsByKeyword(keyword));
    }
  }, [dispatch, keyword, history, userInfo]);

  const handleCreate = () => {
    dispatch(createProduct());
    window.location.reload();
  };

  const handleDelete = (id) => {
    if (window.confirm("Confirm to delete this product?")) {
      dispatch(deleteProduct(id));
    }
    window.location.reload();
  };

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <div>
          <h2
            className="mb-3 py-1"
            style={{ color: "#945047", backgroundColor: "#fcf5f5" }}
          >
            All Products in Database
          </h2>
          <h5 className="mb-4" style={{ color: "grey" }}>
            Total Number of Products: {products.length * pages}
          </h5>
          <Row>
            <Col md={3} className="mb-4">
              <button className={styles.loginBtn} onClick={handleCreate}>
                <i className="fas fa-plus px-2"> </i> Add new Product
              </button>
            </Col>
            <Col></Col>
          </Row>

          {productStatus === "loading" ? (
            <Loader />
          ) : productError ? (
            <Message variant="danger">{productError}</Message>
          ) : (
            <div
              className={styles.customized_scrollbar}
              style={{ marginBottom: "20px" }}
            >
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Gender</th>
                    <th>Colors</th>
                    <th>Sizes</th>

                    <th>Edit | Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>
                        {item.stockCount === 0 ? (
                          <span style={{ color: "red" }}>Out of Stock </span>
                        ) : (
                          item.stockCount
                        )}
                      </td>
                      <td> {item.category}</td>
                      <td>{item.brand}</td>
                      <td>{item.gender}</td>
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td className="py-2">
                        <LinkContainer to={`/admin/product/${item.id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>

                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => handleDelete(item.id)}
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
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      </Container>
    </>
  );
};

export default AdminProductsListPage;
