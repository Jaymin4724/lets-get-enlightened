import React from "react";
import ErrorImage from "../../assets/errorpage/Error-404.png";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={ErrorImage}
        alt="Page Not Found"
        style={{ height: "75%", width: "75%", overflow: "hidden" }}
      />
    </div>
  );
};

export default NotFound;
