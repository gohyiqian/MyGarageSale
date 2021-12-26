import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <Form onSubmit={submitHandler} inline="true" style={{ display: "flex" }}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
        placeholder="Start Searching"
      ></Form.Control>

      <Button type="submit" variant="light" className="p-1 mx-3">
        <i className="fas fa-search px-2 mt-1" />
      </Button>
    </Form>
  );
};

export default SearchBar;
