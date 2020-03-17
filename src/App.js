// import React from "react";
import React, { Component } from "react";
import "./App.css";
import "./styles/main.scss";
import logo from "./assets/search2.svg";
import $ from "jquery";
import axios from "axios";
// import "../src/assets/search3.png";

function Header(props) {
  return (
    <div className="header">
      <div className="divBusca">
        <img src={logo} alt="Buscar..." />
        <input
          type="text"
          className="txtBusca"
          placeholder="Buscar..."
          onChange={e => {
            console.log(e.target.value, "valor");
            console.log(props, "props");
            // console.log(event);
            // props.handleInputChange(e.target.value);
          }}
        />
        {/* <button className="btnBusca" onClick={props.handleInputChange}> */}
        <button
          className="btnBusca"
          // onClick={e => {
          //   // console.log(e, "teste");
          //   const b = props;
          //   console.log("b", props);
          // }}
          onClick={props.onClick}
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

function ListImages(props) {
  const listImg = [0, 1, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="list">
      {listImg.map(value => (
        <ImageContainer key={value.toString()} />
      ))}
    </div>
  );
}

function ImageContainer(props) {
  return (
    <div className="image-container">
      <div className="img-item">
        <img src="https://cdn.pixabay.com/user/2014/07/12/21-19-34-426_250x250.jpg" />
        {/* <img src="https://cdn.pixabay.com/user/2019/12/22/16-48-03-254_250x250.jpg" /> */}
      </div>
      <div className="image-detail">
        <div className="user-image"></div>
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { key: "15592454-3d4064f5f4cbfd171f337e41e", phrase: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(e) {
    // this.props.onPhraseChange(e.target.value);
    this.setState({ phrase: e.target.value });
    console.log("phrase", this.state.phrase);
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
        // "https://pixabay.com/api/?key=" +
        //   this.state.key +
        //   "&q=yellow+flowers&image_type=photo"
        "https://pixabay.com/api/?key=" +
          this.state.key +
          "&q=black+cat&image_type=photo"
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
  // return (
  //   <div className="main-screen">
  //     <div className="main-header">
  //       <Header />
  //     </div>
  //     <div className="main-body"></div>
  //   </div>
  // );

  handleInputChange(event) {
    const target = event.target;
    console.log("evento filho", event.target);
    // const value = target.name === "isGoing" ? target.checked : target.value;
    // const name = target.name;

    // this.setState({
    //   [name]: value
    // });
    // this.setState({
    //   phase: event.target
    // });
    // console.log(event);
    // console.log("phrase", this.state.phrase);
  }

  render() {
    const phrase = this.state.phrase;
    return (
      <div className="main-screen">
        <div className="main-header">
          <Header onClick={this.handleChange} />
        </div>
        <div className="main-body">
          <ListImages />
        </div>
      </div>
    );
  }
}

export default App;
