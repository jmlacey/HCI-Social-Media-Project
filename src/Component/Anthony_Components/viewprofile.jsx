import React, { Component } from "react";
import Forms from "./forms";

class View extends Component {
  state = {};
  testAlert() {
    alert("Im an alert");
  }
  render() {
    return (
      <div className="profileFormDiv">
        <Forms />
        <button className="profileButton leftCol1" onClick={this.testAlert}>
          {" "}
          Edit{" "}
        </button>
        <button className="profileButton rightCol1"> Done </button>
      </div>
    );
  }
}

export default View;
