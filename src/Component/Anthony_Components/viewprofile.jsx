import React, { Component } from "react";
import Forms from "./forms";

class View extends Component {
  state = {};
  render() {
    return (
      <div>
        <Forms />
        <button className="profileButton"> Done </button>
      </div>
    );
  }
}

export default View;
