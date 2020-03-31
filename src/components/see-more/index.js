import React from "react";
import PropTypes from "prop-types";
import "./see-more.scss";
import PixabayService from "./../../services/pixabay-service";

function SeeMore(props) {
  const service = new PixabayService();
  return (
    <div className="container-button">
      <button
        className="btn-see-more"
        onClick={event => {
          props.more();
          props.showLoader();
          const selectedOption = service.getNextPage(
            props.url,
            props.itemsPage
          );

          const promiseResolved = Promise.resolve(selectedOption);

          promiseResolved.then(
            function(updatedItems) {
              console.log(props);
              props.showLoader();
              props.OnUpdateConcatItems(updatedItems.data.hits);
              console.log("itens", updatedItems);
            },
            function(e) {
              // not called
            }
          );
        }}
      >
        Ver mais...
      </button>
    </div>
  );
}

// SeeMore.propTypes = {
//   more: PropTypes.func.isRequired
// };

export default SeeMore;
