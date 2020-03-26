import React, { Component } from "react";
import PropTypes from "prop-types";
// import logo from "../../assets/search2.svg";
import "./options.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { HEADER_items, OPTIONS, OPTION_category } from "./constants";

function Options(props) {
  let { url } = useRouteMatch();
  let filteredOption = url.replace("/", "");
  console.log("filtro", filteredOption);

  return (
    <div className="container-options">
      <div className="all-options">
        <div className="option-item">
          <ul className="item">
            {OPTIONS[filteredOption].map(item => (
              <li key={item.id}>
                <Link
                  to={`${url}/${item.pt}`}
                  onClick={event => props.onAddFilter(`${url}`, `${item.en}`)}
                >
                  {item.pt}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Options;
