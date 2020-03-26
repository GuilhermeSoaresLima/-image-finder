import React, { Component } from "react";
import PropTypes from "prop-types";
import "./input-search.scss";
import logo from "../../assets/search2.svg";

function exchangeSpacePlus(text) {
  const isPhrase = text.split(" ").length > 0 ? true : false;
  const phraseFormated = isPhrase ? text.replace(" ", "+") : text;
  return phraseFormated;
}

function InputSearch(props) {
  return (
    <div className="divBusca">
      <img src={logo} alt="Buscar..." />
      <input
        type="text"
        className="txtBusca"
        placeholder="Buscar..."
        value={props.text}
        onChange={event => {
          props.reset();
          props.onText(event);
        }}
      />
      <button
        className="btnBusca"
        onClick={event => {
          const isLongText = exchangeSpacePlus(props.searchText);
          props.onSearch(isLongText);
        }}
      >
        Buscar
      </button>
    </div>
  );
}

export default InputSearch;
