import React, { Component } from "react";
import PropTypes from "prop-types";
// import logo from "../../assets/search2.svg";
import "./options.scss";
import PixabayService from "./../../services/pixabay-service";
import { API_URL, API_KEY, OPTIONS, OPTION_category } from "./../../constants";

function Options(props) {
  const service = new PixabayService();

  return (
    <div className="container-options">
      <div className="all-options">
        <div className="option-item">
          <ul className="item">
            {OPTIONS[props.optionBox].map(item => (
              <li key={item.id} name={item.pt}>
                <div
                  onClick={event => {
                    const selectedOption = service.getFilteredImages(
                      API_URL,
                      API_KEY,
                      props.optionBox,
                      item.en
                    );

                    const promiseResolved = Promise.resolve(selectedOption);

                    promiseResolved.then(
                      function(updatedItems) {
                        props.OnUpdateItems(updatedItems.data.hits);
                      },
                      function(e) {
                        // not called
                      }
                    );

                    // props.requestCurrentURL(props.url);
                  }}
                >
                  {item.pt}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Options;
