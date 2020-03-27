import React, { Component } from "react";
import Header from "../../components/header";
import ListImages from "../../components/ListImages";
import SeeMore from "../../components/SeeMore";
import Loader from "../../components/Loader";
import axios from "axios";
import { API_KEY, OPTIONS } from "../../constants";

class Colors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPage: 1,
      items: [],
      loader: false,
      text: "",
      url: `https://pixabay.com/api/?key=${API_KEY}`
    };
    this.textToFind = "";
    this.findColor = this.findColor.bind(this);
    this.findEnglishWord = this.findEnglishWord.bind(this);
    this.displayLoader = this.displayLoader.bind(this);
    this.getItemsFromApi = this.getItemsFromApi.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestCurrentURL = this.requestCurrentURL.bind(this);
    this.resetItems = this.resetItems.bind();
    this.showMore = this.showMore.bind(this);
    this.showMoreItemsFromApi = this.showMoreItemsFromApi.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    const englishWord = this.findEnglishWord(this.props.id);
    this.findColor(englishWord);
  }

  findColor(searchValue) {
    const searchRequest = `&&colors=${searchValue}`;
    const searchUrl = `${this.state.url}${searchRequest}`;
    const apiResponse = axios
      .get(searchUrl)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        // handle error

        return error;
      });

    apiResponse.then(value => {
      this.updateItems(value.data.hits);
      this.requestCurrentURL(searchUrl);
    });
  }

  displayLoader = () => {
    this.setState({ loader: !this.state.loader });
  };

  findEnglishWord(wordToFind) {
    const englishWord = OPTIONS.colors.find(word => word.pt === wordToFind);

    return englishWord.en;
  }

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
      this.setState({ items: this.state.items.concat(value.data.hits) });
      this.requestCurrentURL(
        "https://pixabay.com/api/?key=" + API_KEY + "&q=" + this.state.text
      );
      this.setState({ loader: false });
    });
  };

  handleInputChange(event) {
    this.setState({ text: event.target.value }); //salvando texto digitado no state
  }

  requestCurrentURL = currentURL => {
    this.setState({ url: currentURL });
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
            onHandleInputChange={this.handleInputChange}
            onSearch={this.getItemsFromApi}
            onUpdateItems={this.updateItems}
            requestCurrentURL={this.requestCurrentURL}
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

export default Colors;
