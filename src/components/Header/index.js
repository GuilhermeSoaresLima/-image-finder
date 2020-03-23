// import React from "react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/search2.svg";
import { HEADER_items, OPTIONS, OPTION_category } from "./constants";
import $ from "jquery";
import axios from "axios";

function exchangeSpacePlus(text) {
  const isPhrase = text.split(" ").length > 0 ? true : false;
  const phraseFormated = isPhrase ? text.replace(" ", "+") : text;
  return phraseFormated;
}

function Options(props) {
  console.log("propriedades", props);
  return (
    <div className="container-options">
      {/* <form action="./option-value.js">
        <label
          onClick={event => {
            event.preventDefault();
            console.log(event.target);
          }}
        >
          Choose a car:
        </label>
        <select
          onClick={event => {
            // console.log("escolhido", event);
            // console.log("escolhido", event.value);
          }}
        >
          {props.items.map(item => (
            <option
              className="option-item"
              key={item.id.toString()}
              value={item.text.en}
              onClick={event => {
                event.preventDefault();
                console.log(event.target);
              }}
            >
              {item.text.pt}
            </option>
          ))}
        </select>
        <input
          type="submit"
          value="Submit"
          onClick={event => {
            console.log(event);
            event.preventDefault();
          }}
        ></input>
      </form> */}

      <div className="all-options">
        {props.items.map(item => (
          <div
            className="option-item"
            key={item.id.toString()}
            value={item.text.en}
            name={item.text.en}
            onClick={event => {
              event.preventDefault();
              console.log(event.target);
              const x = $(event.target);
              console.log("x", x[0].innerText);
              const texto = x[0].innerText;
              console.log(props.selectedOption);
              console.log(OPTIONS[props.selectedOption]);
              console.log(OPTIONS[props.selectedOption][item.id.toString()]);
              props.onAddFilter(
                props.selectedOption,
                OPTIONS[props.selectedOption][item.id.toString()]
              );
              // this.addFilter(
              //   props.selectedOption,
              //   OPTIONS[props.selectedOption][item.id.toString()]
              // );
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
  }

  // this.handleInputChange = this.handleInputChange.bind(this);

  addFilter(option, value) {
    // console.log(option, value);
    let filterOption = option === 0 ? "category" : "colors";
    let searchValue = value;
    console.log("opcao:", option);
    console.log("valor", value);
    console.log(`&${filterOption}=${searchValue.en}`);
    const searchRequest = `&${filterOption}=${searchValue.en}`;
    const apiResponse = axios
      .get(`${this.props.url}${searchRequest}`)
      .then(function(response) {
        console.log("nova busca: ", response);
        return response;
      })
      .catch(function(error) {
        // handle error
        console.log(error);

        return error;
      });

    apiResponse.then(value => {
      this.props.onUpdateItems(value.data.hits);
      // console.log("valor", value);
      // this.setState({ items: value.data.hits });
      // console.log("items", this.state.items);

      // this.requestCurrentURL(
      //   "https://pixabay.com/api/?key=" +
      //     this.state.key +
      //     "&q=" +
      //     this.state.phrase
      // );
    });
  }

  selectedOption(option) {
    this.setState({ isSelected: option });
    console.log("selecionado", this.state.isSelected);
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
    this.setState({ viewOptions: !this.state.viewOptions });
  }

  render() {
    let keysChild = [];
    keysChild = this.displayOptions(
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
        <div className="header-filter">
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
                      // debugger;
                    }}
                  >
                    {value}
                  </a>
                  {this.state.keySelected === HEADER_items.indexOf(value) &&
                  this.state.viewOptions ? (
                    <Options
                      items={keysChild}
                      url={this.props.url}
                      selectedOption={this.state.keySelected}
                      onAddFilter={this.addFilter}
                      onUpdateItems={this.onUpdateItems}
                    />
                  ) : (
                    ""
                  )}
                  {/* {this.showOptions ? "erado" : <Options />} */}
                  {/* {this.showOptions ? (
                    <Options option={this.state.isSelected} />
                  ) : (
                    "ërrado"
                  )} */}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
// function Header(props) {
//   let showOptions = false;
//   return (
//     <div className="header">
//       <div className="divBusca">
//         <img src={logo} alt="Buscar..." />
//         <input
//           type="text"
//           className="txtBusca"
//           placeholder="Buscar..."
//           value={props.phrase}
//           onChange={event => {
//             console.log("filtro", OPTION_category);
//             props.onHandleInputChange(event);
//           }}
//         />
//         <button
//           className="btnBusca"
//           onClick={event => {
//             console.log(props.phrase);

//             const isPhrase = exchangeSpacePlus(props.phrase);
//             props.onSearch(isPhrase);
//           }}
//         >
//           Buscar
//         </button>
//       </div>
//       <div className="header-filter">
//         <nav>
//           <ul className="nav-list">
//             {HEADER_items.map(value => (
//               <li key={HEADER_items.indexOf(value)} className="nav-list-item">
//                 <a
//                   href="#"
//                   name={value}
//                   onClick={event => {
//                     showOptions = !showOptions;
//                     console.log("options", showOptions);
//                     console.log("valor da opcao: ", event.target.name);

//                     debugger;
//                   }}
//                 >
//                   {value}
//                 </a>
//                 {showOptions ? "erado" : <Options />}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }

// Header.propTypes = {
//   onSearch: PropTypes.func.isRequired
// };

export default Header;
