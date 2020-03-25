import React from "react";
import ImageContainer from "../ImageContainer";
import PropTypes from "prop-types";
import "./list-images.scss";
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
  items: PropTypes.array,
  url: PropTypes.string
};

export default ListImages;
