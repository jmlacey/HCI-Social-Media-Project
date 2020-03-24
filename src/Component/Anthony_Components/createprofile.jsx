import React, { Component } from "react";
import Forms from "./forms";

class Create extends Component {
  state = {};
  render() {
    return (
      <div>
        <Forms />
        <button className="profileButton"> Create </button>
      </div>
    );
  }
}

export default Create;
