// import React from "react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/search2.svg";
import "./header.scss";
import { HEADER_items, OPTIONS, OPTION_category } from "./constants";
import axios from "axios";

function exchangeSpacePlus(text) {
  const isPhrase = text.split(" ").length > 0 ? true : false;
  const phraseFormated = isPhrase ? text.replace(" ", "+") : text;
  return phraseFormated;
}

function Options(props) {
  return (
    <div className="container-options">
      <div className="all-options">
        {props.items.map(item => (
          <div
            className="option-item"
            key={item.id.toString()}
            value={item.text.en}
            name={item.text.en}
            onClick={event => {
              props.onAddFilter(
                props.selectedOption,
                OPTIONS[props.selectedOption][item.id.toString()]
              );
            }}
          >
            {item.text.pt}
          </div>
        ))}
      </div>
    </div>
  );
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isSelected: "", keySelected: 0, viewOptions: false };
    let showOptions = false;
    this.addFilter = this.addFilter.bind(this);
    this.selectedOption = this.selectedOption.bind(this);
    this.displayOptions = this.displayOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showOptionsItems = this.showOptionsItems.bind(this);
  }

  addFilter(option, value) {
    let filterOption = option === 0 ? "category" : "colors";
    let searchValue = value;

    const searchRequest = `&${filterOption}=${searchValue.en}`;
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

  selectedOption(option) {
    this.setState({ isSelected: option });
  }

  displayOptions(options) {
    let allOptions = [];
    options.map(value => {
      allOptions.push({ text: value, id: options.indexOf(value) });
    });
    return allOptions;
  }

  handleChange(e) {
    this.setState({ keySelected: e });
    this.showOptionsItems();
  }

  showOptionsItems() {
    this.setState({ viewOptions: !this.state.viewOptions });
  }

  render() {
    let optionFields = [];
    optionFields = this.displayOptions(
      OPTIONS[this.state.keySelected].map(value => value)
    );
    return (
      <div className="header">
        <div className="divBusca">
          <img src={logo} alt="Buscar..." />
          <input
            type="text"
            className="txtBusca"
            placeholder="Buscar..."
            value={this.props.phrase}
            onChange={event => {
              this.props.reset();
              this.props.onHandleInputChange(event);
            }}
          />
          <button
            className="btnBusca"
            onClick={event => {
              const isPhrase = exchangeSpacePlus(this.props.phrase);
              this.props.onSearch(isPhrase);
            }}
          >
            Buscar
          </button>
        </div>
        <div
          className="header-filter"
          onClick={event => this.showOptionsItems()}
        >
          <nav>
            <ul className="nav-list">
              {HEADER_items.map(value => (
                <li key={HEADER_items.indexOf(value)} className="nav-list-item">
                  <a
                    href="#"
                    name={value}
                    onClick={event => {
                      this.showOptions = !this.showOptions;
                      this.selectedOption(event.target.name);
                      this.handleChange(HEADER_items.indexOf(value));
                    }}
                  >
                    {value}
                  </a>
                  {this.state.keySelected === HEADER_items.indexOf(value) &&
                  this.state.viewOptions ? (
                    <Options
                      items={optionFields}
                      onAddFilter={this.addFilter}
                      onUpdateItems={this.onUpdateItems}
                      selectedOption={this.state.keySelected}
                      url={this.props.url}
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

Header.propTypes = {
  phrase: PropTypes.string,
  onHandleInputChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onUpdateItems: PropTypes.func.isRequired,
  url: PropTypes.string
};

export default Header;
