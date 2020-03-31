import React, { Component } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "./../constants";

class PixabayService extends Component {
  constructor(props) {
    super(props);
  }

  getDefaultImages(api_url, api_key) {
    // const queryStringResult = new URLSearchParams().toString();
    const apiResponse = axios
      .get(`${api_url}?key=${api_key}`)
      .then(response => {
        console.log("response IMAGES", response);

        return response;
      })
      .catch(error => {
        return error;
      });

    return apiResponse.then(value => {
      console.log("value", value);
    });
  }

  getFilteredImages(api_url, api_key, filterOption, searchValue) {
    const searchRequest = `&${filterOption}=${searchValue}`;
    const searchUrl = `${api_url}?key=${api_key}${searchRequest}`;
    const apiResponse = axios
      .get(searchUrl)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        // handle error

        return error;
      });

    return apiResponse.then(value => value);
  }

  getInputText(typedText, api_url, api_key) {
    const apiResponse = axios
      .get(`${api_url}?key=${api_key}`.concat("&q=" + typedText))
      .then(function(response) {
        // handle success
        return response;
      })
      .catch(function(error) {
        // handle error
        return error;
      });

    return apiResponse.then(value => value);

    // return apiResponse.then(value => value);
  }

  getNextPage(currentUrl, numberPage) {
    const apiResponse = axios
      .get(`${currentUrl}&page=${numberPage}`)
      .then(response => {
        // console.log("response", response);
        return response;
      })
      .catch(error => {
        alert("Falha ao buscar imagens");
        return error;
      });

    return apiResponse.then(value => value);
  }
}

export default PixabayService;
