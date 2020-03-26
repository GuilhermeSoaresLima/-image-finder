import React, { Component } from "react";
import PropTypes from "prop-types";
import "./header.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import axios from "axios";
import { HEADER_items, OPTIONS, OPTION_category } from "./constants";

import InputSearch from "../input-search";
import Options from "./../options/";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedBoxOptions: "category", viewBoxOptions: false };

    this.addFilter = this.addFilter.bind(this);
    this.selectBoxOptions = this.selectBoxOptions.bind(this);
  }

  addFilter(filterOption, searchValue) {
    const searchRequest = `&${filterOption}=${searchValue}`;
    const apiResponse = axios
      .get(`${this.props.url}${searchRequest}`)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        // handle error

        return error;
      });

    apiResponse.then(value => {
      this.props.onUpdateItems(value.data.hits);
    });
  }

  selectBoxOptions(boxOptionName) {
    this.setState({ selectedBoxOptions: boxOptionName });
  }

  showBoxOptions() {
    this.setState({ viewBoxOptions: !this.state.viewBoxOptions });
  }

  render() {
    return (
      <Router>
        <div className="header">
          <InputSearch
            reset={this.props.reset}
            searchText={this.props.text}
            onSearch={this.props.onSearch}
            onText={this.props.onHandleInputChange}
          />
          <div className="header-filter">
            <nav>
              <ul className="nav-list">
                {HEADER_items.map(option => (
                  <li
                    key={HEADER_items.indexOf(option)}
                    className="nav-list-item"
                  >
                    <Link
                      to={`/${option}`}
                      onClick={event => {
                        this.selectBoxOptions(option);
                        this.showBoxOptions();
                      }}
                    >
                      {option}
                    </Link>
                    {this.state.selectedBoxOptions === `${option}` &&
                    this.state.viewBoxOptions ? (
                      <Switch>
                        <Route exact path="/"></Route>
                        <Route
                          path="/:id"
                          children={
                            <Options
                              onAddFilter={this.addFilter}
                              url={this.props.url}
                            />
                          }
                        />
                      </Switch>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Router>
    );
  }
}

export default Header;
