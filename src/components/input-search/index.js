import React, { Component } from "react";
import PropTypes from "prop-types";
import "./input-search.scss";
import logo from "../../assets/search2.svg";
import PixabayService from "./../../services/pixabay-service";
import { API_URL, API_KEY } from "./../../constants";

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
          props.onHandleInputChange(event);
        }}
      />
      <button
        className="btnBusca"
        onClick={event => {
          const service = new PixabayService();
          const isLongText = exchangeSpacePlus(props.text);
          const searchedItems = service.getInputText(
            isLongText,
            API_URL,
            API_KEY
          );

          props.OnRequestCurrentURL(
            //update current url
            `${API_URL}?key=${API_KEY}`.concat("&q=" + isLongText)
          );

          const promiseResolved = Promise.resolve(searchedItems);

          promiseResolved.then(
            function(updatedItems) {
              props.OnUpdateItems(updatedItems.data.hits);
            },
            function(e) {
              // not called
            }
          );
        }}
      >
        Buscar
      </button>
    </div>
  );
}

export default InputSearch;
