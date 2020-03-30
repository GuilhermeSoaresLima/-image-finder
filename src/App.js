import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import "./App.css";
import Main from "./pages/main";
import Category from "./pages/category";
import Colors from "./pages/colors";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const ComponentCategory = props => {
      let { id } = useParams();

      return (
        <div>
          <div className="main-screen">
            <Category id={id} />
          </div>
        </div>
      );
    };

    const ComponentColors = props => {
      let { id } = useParams();

      return (
        <div>
          <div className="main-screen">
            <Colors id={id} />
          </div>
        </div>
      );
    };

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/home" component={Main}></Route>
          {/* <Route exact path="/categoria/:id" component={ComponentCategory} />
          <Route exact path="/cor/:id" component={ComponentColors} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
