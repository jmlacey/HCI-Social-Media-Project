import React, { Component } from "react";
import Forms from "./forms";

class View extends Component {
  state = {};
  render() {
    return (
      <div className="profileFormDiv">
        <Forms />
        <button className="profileButton" style={{ float: "right" }}>
          {" "}
          Done{" "}
        </button>
      </div>
    );
  }
}

export default View;
