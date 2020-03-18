import React from "react";

function ImageContainer(props) {
  return (
    <div className="image-container">
      <div className="img-item">
        <img src={props.url} alt="" />
      </div>
      <div className="image-detail">
        <div className="user-image"></div>
      </div>
    </div>
  );
}

export default ImageContainer;
