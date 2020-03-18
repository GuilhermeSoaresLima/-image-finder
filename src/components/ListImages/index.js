import React from "react";
import ImageContainer from "../ImageContainer";

function ListImages(props) {
  return (
    <div className="list">
      {props.items.map(value => (
        <ImageContainer key={value.id.toString()} url={value.previewURL} />
      ))}
    </div>
  );
}

export default ListImages;
