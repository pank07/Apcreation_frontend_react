import React from "react";
import "../Styling/Loader.css";

const Loader = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
