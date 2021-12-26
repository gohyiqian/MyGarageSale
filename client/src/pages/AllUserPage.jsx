import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, userSelectors } from "../redux/userSlice";
import styled from "styled-components";
import styles from "../App.module.css";
import { getUsers } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  justifycontent: space-between;
  margin: 10px;
`;

const AllUserPage = () => {
  const [newUserName, setNewUserName] = useState("");
  const dispatch = useDispatch();
  // const { users, status } = useSelector((state) => state.users);
  const { status } = useSelector((state) => state.users);
  // console.log(users);

  // // Alternatively, can use this to get all user from userSlice
  const users = useSelector(userSelectors.selectAll);
  console.log(users);

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);

  // if (status === "loading") {
  //   return (
  //     <div>
  //       <div className={styles.loader} />
  //     </div>
  //   );
  // }

  // // Alternatively, can use useEffect here instead of createAsyncThunk in userSlice
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then(({ results }) => {
        const users = results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first}${user.name.last}`,
          image: user.picture.thumbnail,
        }));
        dispatch(actions.usersAddMany(users));
      });
  }, []);

  // onClick Add a user
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actions.usersAddOne({
        id: String(Math.random()),
        name: newUserName,
        image: "https://placeimg.com/48/48/people",
      })
    );
    setNewUserName("");
  };

  return (
    <>
      <h2 className={styles.title}>
        Users:
        <form onSubmit={handleFormSubmit}>
          <input
            style={{ display: "inline" }}
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <input style={{ display: "inline" }} type="submit" value="Create" />
        </form>
      </h2>

      <div>
        {users.map((user) => (
          <Container key={user.id}>
            <img src={user.image} alt="" />
            <input
              style={{ flex: "1", margin: "0 10px" }}
              value={user.name}
              onChange={(e) => {
                dispatch(
                  actions.userUpdate({
                    id: user.id,
                    changes: { name: e.target.value },
                  })
                );
              }}
            />
            <button
              style={{ marginBottom: 0 }}
              onClick={() => {
                dispatch(actions.userRemove(user.id));
              }}
            >
              delete
            </button>
          </Container>
        ))}
      </div>
    </>
  );
};

export default AllUserPage;
