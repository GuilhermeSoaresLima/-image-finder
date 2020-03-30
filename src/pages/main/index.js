import React, { Component } from "react";
import Header from "./../../components/header";
// import ListImages from "./../../components/ListImages";
// import SeeMore from "./../../components/SeeMore";
// import Loader from "./../../components/Loader";
import axios from "axios";
import { API_URL, API_KEY } from "./../../constants";
import PixabayService from "./../../services/pixabay-service";

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

    this.service = new PixabayService();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestCurrentURL = this.requestCurrentURL.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    // console.log(this.service.nextPage(API_URL, API_KEY, 2));
    console.log(this.service.getDefaultImages(API_URL, API_KEY));
  }

  handleInputChange(event) {
    this.setState({ text: event.target.value }); //salvando texto digitado no state
  }

  requestCurrentURL = currentURL => {
    this.setState({ url: currentURL });

    const u = {
      url: this.state.url
    };

    console.log("atual url: ", u);
  };

  updateItems(newItems) {
    this.setState({ items: newItems });
    console.log("novos", this.state.items);
  }

  render() {
    return (
      <div>
        <div className="main-header">
          <Header
            text={this.state.text}
            onHandleInputChange={this.handleInputChange}
            onRequestCurrentURL={this.requestCurrentURL}
            OnUpdateItems={this.updateItems}
          />
        </div>
        <div className="main-body"></div>
      </div>
    );
  }
}

export default Main;
