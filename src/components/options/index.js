import React, { Component } from "react";
import PropTypes from "prop-types";
// import logo from "../../assets/search2.svg";
import "./options.scss";
import PixabayService from "./../../services/pixabay-service";
import { OPTIONS, OPTION_category } from "./constants";

function Options(props) {
  //   let filteredOption =
  //     url.replace("/", "") === "categoria" ? "category" : "colors";

  return (
    <div className="container-options">
      <div className="all-options">
        <div className="option-item">
          <ul className="item">
            {OPTIONS[filteredOption].map(item => (
              <li key={item.id} name={item.pt}>
                <div
                  onClick={event => {
                    // props.onAddFilter(`${url}`, `${item.en}`);

                    // props.requestCurrentURL(props.url);
                    const u = { url: props.url };
                    console.log("url options: ", u);
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
