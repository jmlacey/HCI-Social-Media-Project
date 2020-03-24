import React, { Component } from "react";
import Forms from "./forms";

class Edit extends Component {
  state = {};
  render() {
    return (
      <div className="formDiv">
        <Forms />
        <button className="profileButton"> Finish </button>
      </div>
    );
  }
}

export default Edit;
