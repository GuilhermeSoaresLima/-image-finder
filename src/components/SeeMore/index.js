import React from "react";
import PropTypes from "prop-types";
function SeeMore(props) {
  return (
    <div className="container-button">
      <button
        className="btn-see-more"
        onClick={event => {
          props.more();
        }}
      >
        Ver mais...
      </button>
    </div>
  );
}

SeeMore.propTypes = {
  more: PropTypes.func.isRequired
};

export default SeeMore;
