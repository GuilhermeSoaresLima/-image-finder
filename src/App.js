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
      key: "15592454-3d4064f5f4cbfd171f337e41e",
      phrase: "",
      url: ""
    };
    this.requestCurrentURL = this.requestCurrentURL.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.showMore = this.showMore.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  handleChange(e) {
    console.log("phrase", e.target.value);
  }

  componentDidMount() {
    this.requestImages();
  }

  requestCurrentURL = currentURL => {
    console.log("chamada", currentURL);
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
        this.setState({
          items: response.data.hits
        });
      })
      .catch(error => {
        alert("Falha ao buscar imagens");
      });
  };

  showMore = () => {
    console.log("teste botao");
    if (this.state.items.length <= 20) {
      console.log(this.state.items.length);
      this.setState({ itemsPage: 40 });
      console.log("items page", this.state.itemsPage);
    } else {
      this.setState({ itemsPage: this.state.itemsPage + 20 });
    }
  };

  handleInputChange(event) {
    this.setState({ phrase: event.target.value }); //salvando texto digitado no state
    console.log("phrase: ", this.state.phrase);
    console.log("link", this.state.url);
  }

  getValue(value) {
    this.setState({ items: value });
  }

  changeState = value => {
    let moreitems = `&per_page=${this.state.itemsPage}`;
    this.setState({ phrase: value }); //atualizo o meu state

    const apiResponse =
      this.state.itemsPage === 0
        ? axios
            .get(
              "https://pixabay.com/api/?key=" +
                this.state.key +
                "&q=" +
                this.state.phrase
              // "&per_page=200"
            )
            .then(function(response) {
              // this.requestCurrentURL(
              //   "https://pixabay.com/api/?key=" +
              //     this.state.key +
              //     "&q=" +
              //     this.state.phrase
              // );
              // handle success
              console.log(response);

              return response;
            })
            .catch(function(error) {
              // handle error
              console.log(error);

              return error;
            })
        : axios
            .get(
              "https://pixabay.com/api/?key=" +
                this.state.key +
                "&q=" +
                this.state.phrase +
                moreitems
            )
            .then(function(response) {
              // handle success
              console.log(response);

              return response;
            })
            .catch(function(error) {
              // handle error
              console.log(error);

              return error;
            });

    apiResponse.then(value => {
      console.log("valor", value);
      this.setState({ items: value.data.hits });
      console.log("items", this.state.items);

      this.requestCurrentURL(
        "https://pixabay.com/api/?key=" +
          this.state.key +
          "&q=" +
          this.state.phrase
      );
    });
  };

  render() {
    return (
      <div className="main-screen">
        <div className="main-header">
          <Header
            onHandleInputChange={this.handleInputChange}
            onSearch={this.changeState}
            phrase={this.state.phrase}
            url={this.state.url}
          />
        </div>
        <div className="main-body">
          <ListImages items={this.state.items} url={this.props.url} />
          {this.state.items.length >= 20 ? (
            <SeeMore
              more={this.showMore}
              update={this.changeState}
              phrase={this.state.phrase}
              url={this.props.url}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
