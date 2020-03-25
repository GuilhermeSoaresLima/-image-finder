// import React from "react";
import React, { Component } from "react";
import "./App.css";
import "./styles/main.scss";
import axios from "axios";
import Header from "./components/Header";
import ListImages from "./components/ListImages";
import SeeMore from "./components/SeeMore";
import Loader from "./components/Loader";
import { API_URL, API_KEY } from "./constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPage: 1,
      items: [],
      loader: false,
      phrase: "",
      url: ""
    };

    this.displayLoader = this.displayLoader.bind(this);
    this.getItemsFromApi = this.getItemsFromApi.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestCurrentURL = this.requestCurrentURL.bind(this);
    this.resetItems = this.resetItems.bind();
    this.showMore = this.showMore.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    this.requestImages();
  }

  displayLoader = () => {
    this.setState({ loader: !this.state.loader });
  };

  getItemsFromApi = value => {
    const apiResponse = axios
      .get(
        "https://pixabay.com/api/?key=" +
          API_KEY +
          "&q=" +
          this.state.phrase +
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
      this.setState({ items: this.state.items.concat(value.data.hits) });
      this.displayLoader();
      this.requestCurrentURL(
        "https://pixabay.com/api/?key=" + API_KEY + "&q=" + this.state.phrase
      );
    });
  };

  handleInputChange(event) {
    this.setState({ phrase: event.target.value }); //salvando texto digitado no state
  }

  requestCurrentURL = currentURL => {
    this.setState({ url: currentURL });
  };

  requestImages = queryStrings => {
    const queryStringResult = new URLSearchParams(queryStrings).toString();
    axios
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
  };

  resetItems = () => {
    this.setState({ items: [] });
  };

  showMore = () => {
    if (this.state.items.length <= 20) {
      this.setState({ itemsPage: 2 }, this.getItemsFromApi);
    } else {
      this.setState(
        { itemsPage: this.state.itemsPage + 1 },
        this.getItemsFromApi
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
      <div className="main-screen">
        <div className="main-header">
          <Header
            onHandleInputChange={this.handleInputChange}
            onSearch={this.getItemsFromApi}
            onUpdateItems={this.updateItems}
            phrase={this.state.phrase}
            reset={this.resetItems}
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

export default App;
