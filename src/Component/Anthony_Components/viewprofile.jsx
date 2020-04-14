import React, { Component } from "react";
import Forms from "./forms";
import Edit from "./editprofile";

class View extends Component {
  state = {};
  testAlert() {
    alert("Im an alert");
  }
  render() {
    return (
      <div className="profileFormDiv">
        <Forms />
        <button className="profileButton leftCol1" onClick={this.props.action}>
          {" "}
          Edit{" "}
        </button>
        <button className="profileButton rightCol1"> Done </button>
      </div>
    );
  }
}

export default View;
