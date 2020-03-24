import React, { Component } from "react";
import Forms from "./forms";

class Create extends Component {
  state = {};
  render() {
    return (
      <div className="profileFormDiv">
        <Forms />
        <button className="profileButton" style={{ float: "right" }}>
          {" "}
          Save{" "}
        </button>
      </div>
    );
  }
}

export default Create;
