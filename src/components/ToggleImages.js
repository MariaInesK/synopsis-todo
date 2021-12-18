import React from "react";
import Active from "./images/important-yellow.svg";
import Inactive from "./images/important-grey.svg";



function ToggleImages() {
  return (
    <>
      <h1>Priotity</h1>
      <div className="toggle-wrapper">
       
          <img className="active" src={Active} alt="important yellow" />
       
          <img className="inactive" src={Inactive} alt="important grey" />
        )
      </div>
    </>
  );
}

export default ToggleImages;

