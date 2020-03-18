// import React from "react";
import React, { Component } from "react";
import "./App.css";
import "./styles/main.scss";
import axios from "axios";
import Header from "./components/Header";
import ListImages from "./components/ListImages";
import SeeMore from "./components/SeeMore";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itensPage: 0,
      itens: [],
      key: "15592454-3d4064f5f4cbfd171f337e41e",
      phrase: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.showMore = this.showMore.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  handleChange(e) {
    console.log("phrase", e.target.value);
  }

  componentDidMount() {
    // chamado depois da primeira reenderização
    console.log("DidMount");
    console.log("chave");
    console.log(this.state.key);

    // var URL =
    //   "https://pixabay.com/api/?key=" +
    //   this.state.key +
    //   "&q=" +
    //   // encodeURIComponent("red roses");
    //   encodeURIComponent("roses");
    // $.getJSON(URL, function(data) {
    //   if (parseInt(data.totalHits) > 0)
    //     $.each(data.hits, function(i, hit) {
    //       console.log(hit.pageURL);
    //       console.log(data);
    //     });
    //   else console.log("No hits");
    // });

    axios
      .get(
        "https://pixabay.com/api/?key=" +
          this.state.key +
          "&q=" +
          this.state.phrase +
          "&image_type=photo"
      )
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    // .then(function() {
    //   // always executed
    // });
  }

  showMore = () => {
    console.log("teste botao");
    if (this.state.itens.length <= 20) {
      console.log(this.state.itens.length);
      this.setState({ itensPage: 40 });
      console.log("itens page", this.state.itensPage);
    } else {
      this.setState({ itensPage: this.state.itensPage + 20 });
    }
  };

  handleInputChange(event) {
    const target = event.target;
    console.log("evento filho", event.target);
  }

  getValue(value) {
    this.setState({ itens: value });
  }

  changeState = value => {
    let moreItens = `&per_page=${this.state.itensPage}`;
    this.setState({ phrase: value }); //atualizo o meu state
    console.log("estado", this.state.phrase);
    console.log("itens", moreItens);
    const x =
      this.state.itensPage === 0
        ? axios
            .get(
              "https://pixabay.com/api/?key=" +
                this.state.key +
                "&q=" +
                this.state.phrase
              // "&per_page=200"
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
            })
        : axios
            .get(
              "https://pixabay.com/api/?key=" +
                this.state.key +
                "&q=" +
                this.state.phrase +
                moreItens
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

    x.then(value => {
      console.log("valor", value);
      this.setState({ itens: value.data.hits });
      console.log("itens", this.state.itens);
    });
  };

  render() {
    const phrase = this.state.phrase;
    return (
      <div className="main-screen">
        <div className="main-header">
          <Header
            // valuePhrase={this.handleChange}
            setStateDoPapaizineo={this.changeState}
            phrase={this.state.phrase}
          />
        </div>
        <div className="main-body">
          <ListImages itens={this.state.itens} />
          {this.state.itens.length >= 20 ? (
            <SeeMore
              more={this.showMore}
              update={this.changeState}
              phrase={this.state.phrase}
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
