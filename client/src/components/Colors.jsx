import React from "react";

const Colors = () => {
  return (
    <div>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? "fas fa-circle"
              : value >= 0.5
              ? "fas fa-circle-half-alt"
              : "far fa-circle"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? "fas fa-circle"
              : value >= 0.5
              ? "fas fa-circle-half-alt"
              : "far fa-circle"
          }
        ></i>
      </span>
    </div>
  );
};

export default Colors;
