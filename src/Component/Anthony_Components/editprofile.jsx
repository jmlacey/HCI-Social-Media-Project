import React, { Component } from "react";
import Forms from "./forms";

class Edit extends Component {
  state = {};
  render() {
    return (
      <div className="profileFormDiv">
        <Forms />
        <button className="profileButton rightCol1" onClick={this.props.action}>
          {" "}
          Finish{" "}
        </button>
      </div>
    );
  }
}

export default Edit;
