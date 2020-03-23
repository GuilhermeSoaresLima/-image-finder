import React from "react";

function SeeMore(props) {
  return (
    <div className="container-button">
      <button
        className="btn-see-more"
        onClick={event => {
          props.more();
          // props.update(props.phrase);
        }}
      >
        Ver mais...
      </button>
    </div>
  );
}

SeeMore.propTypes = {
  more: PropTypes.func.isRequired,
  phrase: PropTypes.string,
  update: PropTypes.func.isRequired,
  url: PropTypes.string
};

export default SeeMore;
