import React, { Component } from "react";
import Forms from "./forms";

class Edit extends Component {
  state = {};
  render() {
    return (
      <div className="profileFormDiv">
        <Forms />
        <button className="profileButton" style={{ float: "right" }}>
          {" "}
          Finish{" "}
        </button>
      </div>
    );
  }
}

export default Edit;
