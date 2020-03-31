import React, { Component } from "react";
import Header from "./../../components/header";
import ListImages from "./../../components/ListImages";
import SeeMore from "./../../components/see-more";
import Loader from "./../../components/loader";
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
      url: `${API_URL}?key=${API_KEY}`
    };

    this.service = new PixabayService();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestCurrentURL = this.requestCurrentURL.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    // console.log(this.service.nextPage(API_URL, API_KEY, 2));
    console.log(this.service.getDefaultImages(API_URL, API_KEY));

    const initialImages = this.service.getDefaultImages(API_URL, API_KEY);

    const promiseResolved = Promise.resolve(initialImages);

    promiseResolved.then(
      function(updatedItems) {
        // this.updateItems(updatedItems.data.hits);
      },
      function(e) {
        // not called
      }
    );
  }

  displayLoader = () => {
    this.setState({ loader: !this.state.loader });
  };

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

  showMore = () => {
    if (this.state.items.length <= 20) {
      this.setState({ itemsPage: 2 });
    } else {
      this.setState({ itemsPage: this.state.itemsPage + 1 });
    }
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
        <div className="main-body">
          <ListImages items={this.state.items} url={this.state.url} />
          {this.state.loader ? <Loader /> : ""}
          {this.state.items.length >= 20 ? (
            <SeeMore
              itemPage={this.state.itemsPage}
              OnUpdateItems={this.updateItems}
              showLoader={this.displayLoader}
              url={this.state.url}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Main;
