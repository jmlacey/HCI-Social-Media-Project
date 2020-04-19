import React, { Component } from "react";
import Forms from "./forms";

class Edit extends Component {
  state = {};
  successMessage() {
    alert("Your profile has been saved");
  }

  render() {
    return (
      <div className="profileFormDiv">
        <Forms />
        <button className="profileButton rightCol1" onClick={this.props.action}>
          {" "}
          Save{" "}
        </button>
      </div>
    );
  }
}

export default Edit;
