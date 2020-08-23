import React from "react";

import "./loader.scss";

const Loader = (props) => {
  const { width, height, color } = props;

  return (
    <svg
      className="load-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: `${width || 50}px`, height: `${height || 50}px` }}
    >
      <circle cx="50" cy="50" r="45" stroke={color || "#2f3d4c"} />
    </svg>
  );
};

export default Loader;
