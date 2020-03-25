import React from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import "./loader.scss";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 2 auto;
  border-color: green;
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="loading-container">
        <BeatLoader
          css={override}
          size={15}
          color={"#5f9ea0"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loader;
