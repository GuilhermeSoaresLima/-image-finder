import React, { Component } from "react";
import Header from "./../../components/header";
import ListImages from "./../../components/ListImages";
import SeeMore from "./../../components/see-more";
import Loader from "./../../components/loader";
// import axios from "axios";
import { API_URL, API_KEY } from "./../../constants";
import PixabayService from "./../../services/pixabay-service";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPage: 2,
      items: [],
      loader: false,
      text: "",
      url: `${API_URL}?key=${API_KEY}`
    };

    this.service = new PixabayService();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestCurrentURL = this.requestCurrentURL.bind(this);
    this.showMore = this.showMore.bind(this);
    this.updateConcatItems = this.updateConcatItems.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    const initialImages = this.service.gettImagesFromURL(
      API_URL,
      API_KEY,
      this.props.id
    );
    const promiseResolved = Promise.resolve(initialImages);

    promiseResolved.then(
      function(updatedItems) {
        return updatedItems;
      },
      function(e) {
        // not called
      }
    );

    initialImages.then(value => {
      this.updateItems(value.data.hits);
      this.requestCurrentURL(`${API_URL}?key=${API_KEY}&q=${this.props.id}`);
    });
  }

  displayLoader = () => {
    this.setState({ loader: !this.state.loader });
  };

  handleInputChange(event) {
    this.setState({ text: event.target.value }); //salvando texto digitado no state
  }

  requestCurrentURL(currentURL) {
    this.setState({ url: currentURL });
  }

  showMore() {
    this.setState({ itemsPage: this.state.itemsPage + 1 });
  }

  updateConcatItems(newItems) {
    this.setState({ items: this.state.items.concat(newItems) });
  }

  updateItems(newItems) {
    this.setState({ items: newItems });
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
          {this.state.loader ? <Loader /> : " "}
          {this.state.items.length >= 20 ? (
            <SeeMore
              itemsPage={this.state.itemsPage}
              more={this.showMore}
              OnUpdateConcatItems={this.updateConcatItems}
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

export default Category;
