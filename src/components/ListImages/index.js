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

ListImages.propTypes = {
  items: PropTypes.string,
  url: PropTypes.string
};

export default ListImages;
