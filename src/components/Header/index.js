import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/search2.svg";

function exchangeSpacePlus(text) {
  const isPhrase = text.split(" ").length > 0 ? true : false;
  const phraseFormated = isPhrase ? text.replace(" ", "+") : text;
  return phraseFormated;
}

function Header(props) {
  return (
    <div className="header">
      <div className="divBusca">
        <img src={logo} alt="Buscar..." />
        <input
          type="text"
          className="txtBusca"
          placeholder="Buscar..."
          value={props.phrase}
          onChange={event => props.onHandleInputChange(event)}
        />
        <button
          className="btnBusca"
          onClick={event => {
            const isPhrase = exchangeSpacePlus(props.phrase);
            props.onSearch(isPhrase);
          }}
        >
          Buscar
        </button>
      </div>
      <div className="header-filter">
        <nav>
          <ul className="nav-list">
            <li>
              <a href="#">Popular</a>
            </li>
            <li>
              <a href="#">Images</a>
            </li>
            <li>
              <a href="#">Orientation</a>
            </li>
            <li>
              <a href="#">Category</a>
            </li>
            <li>
              <a href="#">Size</a>
            </li>
            <li>
              <a href="#">Color</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Header;
