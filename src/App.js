// import React from "react";
import React, { Component } from "react";
import "./App.css";
import "./styles/main.scss";
import axios from "axios";
import Header from "./components/Header";
import ListImages from "./components/ListImages";
import SeeMore from "./components/SeeMore";
import { API_URL, API_KEY } from "./constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPage: 0,
      items: [],
      phrase: "",
      url: ""
    };

    this.changeState = this.changeState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestCurrentURL = this.requestCurrentURL.bind(this);
    this.resetItems = this.resetItems.bind();
    this.showMore = this.showMore.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    this.requestImages();
  }

  changeState = value => {
    let moreitems = `&per_page=${this.state.itemsPage}`;

    const apiResponse =
      this.state.itemsPage === 0
        ? axios
            .get(
              "https://pixabay.com/api/?key=" +
                API_KEY +
                "&q=" +
                this.state.phrase
            )
            .then(function(response) {
              // handle success

              return response;
            })
            .catch(function(error) {
              // handle error

              return error;
            })
        : axios
            .get(
              "https://pixabay.com/api/?key=" +
                API_KEY +
                "&q=" +
                this.state.phrase +
                moreitems
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
      this.setState({ items: value.data.hits });

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
    this.setState({ itemsPage: 0 });
  };

  showMore = () => {
    if (this.state.items.length <= 20) {
      this.setState({ itemsPage: 40 }, this.changeState);
    } else {
      this.setState({ itemsPage: this.state.itemsPage + 20 }, this.changeState);
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
            reset={this.resetItems}
            onHandleInputChange={this.handleInputChange}
            onSearch={this.changeState}
            onUpdateItems={this.updateItems}
            phrase={this.state.phrase}
            url={this.state.url}
          />
        </div>
        <div className="main-body">
          <ListImages items={this.state.items} url={this.props.url} />
          {this.state.items.length >= 20 ? (
            <SeeMore more={this.showMore} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
