import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "50px",
        width: "50px",
        margin: "30px auto",
        padding: "auto",
        display: "flex",
        color: "#945047",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
