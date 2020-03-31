import React, { Component } from "react";
import "./header.scss";
import { API_KEY, API_URL, HEADER_items } from "./../../constants";
import Options from "./../options";

import InputSearch from "../input-search";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedBoxOptions: "category", viewBoxOptions: false };

    this.selectBoxOptions = this.selectBoxOptions.bind(this);
    this.showBoxOptions = this.showBoxOptions.bind(this);
  }

  selectBoxOptions(boxOptionName) {
    this.setState({ selectedBoxOptions: boxOptionName });
  }

  showBoxOptions() {
    this.setState({ viewBoxOptions: !this.state.viewBoxOptions });
  }

  render() {
    return (
      <div className="header">
        <InputSearch
          onHandleInputChange={this.props.onHandleInputChange}
          OnRequestCurrentURL={this.props.OnRequestCurrentURL}
          OnUpdateItems={this.props.OnUpdateItems}
          text={this.props.text}
        />
        <div className="header-filter">
          <nav>
            <ul className="nav-list">
              {HEADER_items.map(option => (
                <li key={option.id.toString()} className="nav-list-item">
                  <div
                    onClick={event => {
                      this.selectBoxOptions(option.name);
                      this.showBoxOptions();
                    }}
                  >
                    {option.name}
                  </div>
                  {this.state.selectedBoxOptions === `${option.name}` &&
                  this.state.viewBoxOptions ? (
                    <Options
                      // onAddFilter={this.addFilter}
                      // reset={this.this.props.reset}
                      // url={this.this.props.url}
                      OnUpdateItems={this.props.OnUpdateItems}
                      optionBox={option.name}
                      text={this.props.text}
                    />
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
