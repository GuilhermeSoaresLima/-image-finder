import React from "react";

function SeeMore(props) {
  return (
    <div className="container-button">
      <button
        className="btn-see-more"
        onClick={event => {
          props.more();
          props.update(props.phrase);
        }}
      >
        Ver mais...
      </button>
    </div>
  );
}

export default SeeMore;
