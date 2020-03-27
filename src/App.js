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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const Componente = props => {
      const { id } = useParams();
      return <div> guilherme + {id}</div>;
    };

    // const categoryChildren = props => {
    //   const { id } = useParams();
    //   return (
    //     <div>
    //       <Category id={id} />
    //     </div>
    //   );
    // };

    const ComponentCategory = props => {
      let { id } = useParams();
      console.log("id", `${id}`);
      // return <div>Guilherme + {id}</div>;
      return (
        <div>
          <div className="main-screen">
            <Category id={id} />
          </div>
        </div>
      );
    };

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/home" component={Main}></Route>
          <Route exact path="/guilherme/:id" component={Componente} />
          {/* <Route exact path="/category/:id" children={<Category />} /> */}
          <Route exact path="/category/:id" component={ComponentCategory} />
        </Switch>
      </Router>
    );
  }
}

export default App;
