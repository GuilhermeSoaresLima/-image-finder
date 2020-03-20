// import React from "react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/search2.svg";
import { HEADER_items, OPTION_category } from "./constants";

function exchangeSpacePlus(text) {
  const isPhrase = text.split(" ").length > 0 ? true : false;
  const phraseFormated = isPhrase ? text.replace(" ", "+") : text;
  return phraseFormated;
}

function Options(props) {
  console.log("propriedades", props);
  console.log(props.keyId[0].id);
  var teste = [];
  props.items.forEach(value =>
    teste.push({
      id: props.items.indexOf(value)
    })
  );
  console.log(teste);
  return (
    // <div className="container-options">
    //   {OPTION_category.map(value => (
    //     // <ul>
    //     //   <li key={OPTION_category.indexOf(value)}>
    //     //     <a>{value.pt}</a>
    //     //   </li>
    //     // </ul>
    //     <div key={OPTION_category.indexOf(value)} className="itens-options">
    //       {/* <a>{value.pt}</a> */}
    //     </div>
    //   ))}
    // </div>

    <div className="container-options">
      {/* <select
        multiple={true}
        value={props.items}
        className="itens-options"
      ></select> */}

      <select>
        {props.items.map(item => (
          // <option key={props.items.valueOf(item)} value={item}>
          // <option key={props.keyId[props.items.valueOf(item)].id} value={item}>
          // <option key={teste[props.items.valueOf(item)].id} value={item}>
          <option key={props.items.valueOf(item)} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isSelected: "", keySelected: 0 };
    let showOptions = false;
    this.selectedOption = this.selectedOption.bind(this);
  }

  // this.handleInputChange = this.handleInputChange.bind(this);

  selectedOption(option) {
    this.setState({ isSelected: option });
    console.log("selecionado", this.state.isSelected);
  }

  render() {
    let keysChild = [];

    HEADER_items.forEach((value, index) => {
      keysChild.push({ id: index });
      console.log(keysChild);
    });
    // console.log('vetor' + keysChild);
    console.log(`vetor ${keysChild}`);
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
              console.log("filtro", OPTION_category);
              this.props.onHandleInputChange(event);
            }}
          />
          <button
            className="btnBusca"
            onClick={event => {
              console.log(this.props.phrase);

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
                      console.log("options", this.showOptions);
                      console.log("valor da opcao: ", event.target.name);
                      this.selectedOption(event.target.name);
                      debugger;
                    }}
                  >
                    {value}
                  </a>
                  {this.state.keySelected === HEADER_items.indexOf(value) ? (
                    <Options items={HEADER_items} keyId={keysChild} />
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
