import React, { Component } from "react";
import Header from "./../../components/header";
import ListImages from "./../../components/ListImages";
import SeeMore from "./../../components/SeeMore";
import Loader from "./../../components/Loader";
import axios from "axios";
import { API_URL, API_KEY } from "./../../constants";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPage: 1,
      items: [],
      loader: false,
      text: "",
      url: ""
    };

    this.deleteRepeatedCategories = this.deleteRepeatedCategories.bind(this);
    this.deleteRepeatedColors = this.deleteRepeatedColors.bind(this);
    this.deleteRepeatValues = this.deleteRepeatValues.bind(this);
    this.defaultUrlValues = this.defaultUrlValues.bind(this);
    this.displayLoader = this.displayLoader.bind(this);
    this.getItemsFromApi = this.getItemsFromApi.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestCurrentURL = this.requestCurrentURL.bind(this);
    this.requestImages = this.requestImages.bind(this);
    this.resetItems = this.resetItems.bind();
    this.showMore = this.showMore.bind(this);
    this.showMoreItemsFromApi = this.showMoreItemsFromApi.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    this.requestImages();
  }

  displayLoader = () => {
    this.setState({ loader: !this.state.loader });
  };

  getItemsFromApi = value => {
    this.setState({ loader: true });
    const apiResponse = axios
      .get(
        "https://pixabay.com/api/?key=" +
          API_KEY +
          "&q=" +
          this.state.text +
          `&page=${this.state.itemsPage}`
      )
      .then(function(response) {
        // handle success

        return response;
      })
      .catch(function(error) {
        // handle error
        return error;
      });

    apiResponse.then(value => {
      console.log("valor", value);
      this.setState({ items: this.state.items.concat(value.data.hits) });
      this.requestCurrentURL(
        "https://pixabay.com/api/?key=" + API_KEY + "&q=" + this.state.text
      );
      this.setState({ loader: false });
      console.log("url atual", this.state.url);
    });
  };

  showMoreItemsFromApi() {
    this.setState({ loader: true });
    const apiResponse = axios
      .get(this.state.url + `&page=${this.state.itemsPage}`)
      .then(function(response) {
        // handle success

        return response;
      })
      .catch(function(error) {
        // handle error
        return error;
      });

    apiResponse.then(value => {
      this.setState({ items: this.state.items.concat(value.data.hits) });
      this.requestCurrentURL(this.state.url + `&page=${this.state.itemsPage}`);
      this.setState({ loader: false });
    });
  }

  handleInputChange(event) {
    this.setState({ text: event.target.value }); //salvando texto digitado no state
  }

  defaultUrlValues(category, color) {
    if (category && color) {
      return `${category}&${color}`;
    } else if (category) {
      return `${category}`;
    } else {
      return `${color}`;
    }
  }

  deleteRepeatValues(urlParamsValues) {
    const deleteRepeatWords = urlParamsValues.split("&");
    const defaultCategory = this.deleteRepeatedCategories(deleteRepeatWords);
    const defaultColor = this.deleteRepeatedColors(deleteRepeatWords);
    const urlParamsValue = this.defaultUrlValues(defaultCategory, defaultColor);
    let urlDefault = "";
    deleteRepeatWords.map(value => {
      if (!value.includes("category") && !value.includes("color")) {
        urlDefault = urlDefault.concat(`${value}&`);
      }
    });

    console.log("ultima url: ", urlDefault.concat(urlParamsValue));

    return urlDefault;
  }

  deleteRepeatedCategories(categoriesToDelete) {
    let categoryArray = [];
    categoriesToDelete.map(urlValue => {
      if (urlValue.includes("category")) {
        categoryArray = categoryArray.concat(urlValue);
      }
    });

    return categoryArray.slice(-1).find(value => value);
  }

  deleteRepeatedColors(colorsToDelete) {
    let colorsArray = [];
    colorsToDelete.map(urlValue => {
      if (urlValue.includes("color")) {
        colorsArray = colorsArray.concat(urlValue);
      } else {
        return "";
      }
    });

    return colorsArray.slice(-1).find(value => value);
  }

  requestCurrentURL = currentURL => {
    // const deleteRepeatWords = currentURL.split("&");
    // console.log(deleteRepeatWords);
    // debugger;
    // const cleanUrl = this.deleteRepeatValues(currentURL);
    // this.setState({ url: cleanUrl.replace("&&", "&") });
    this.setState({ url: currentURL });

    const u = {
      url: this.state.url
    };

    console.log("atual url: ", u);
  };

  requestImages = queryStrings => {
    const queryStringResult = new URLSearchParams(queryStrings).toString();
    const apiResponse = axios
      .get(`${API_URL}?key=${API_KEY}&${queryStringResult}`)
      .then(response => {
        this.requestCurrentURL(
          `${API_URL}?key=${API_KEY}&${queryStringResult}`
        );
        this.updateItems(response.data.hits);
      })
      .catch(error => {
        alert("Falha ao buscar imagens");
      });

    apiResponse.then(value => {
      this.requestCurrentURL(`${API_URL}?key=${API_KEY}&${queryStringResult}`);
      this.setState({ loader: false });
    });
  };

  resetItems = () => {
    this.setState({ items: [] });
  };
  showMore = () => {
    if (this.state.items.length <= 20) {
      this.setState({ itemsPage: 2 }, this.showMoreItemsFromApi);
    } else {
      this.setState(
        { itemsPage: this.state.itemsPage + 1 },
        this.showMoreItemsFromApi
      );
    }
  };

  updateItems(updatedItems) {
    this.setState({
      items: updatedItems
    });
  }

  render() {
    return (
      <div>
        <div className="main-header">
          <Header
            requestCurrentURL={this.requestCurrentURL}
            onHandleInputChange={this.handleInputChange}
            onSearch={this.getItemsFromApi}
            onUpdateItems={this.updateItems}
            reset={this.resetItems}
            text={this.state.text}
            url={this.state.url}
          />
        </div>
        <div className="main-body">
          <ListImages items={this.state.items} url={this.props.url} />
          {this.state.loader ? <Loader /> : ""}
          {this.state.items.length >= 20 ? (
            <SeeMore more={this.showMore} showLoader={this.displayLoader} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Main;
