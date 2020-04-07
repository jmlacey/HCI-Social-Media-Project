import React, { Component } from "react";
import Image from "./fileinput.jsx";

class Picture extends Component {
  state = {};
  render() {
    return (
      <div>
        <Image />
        {/* <button className="avatarButton"> Change Picture </button> */}
      </div>
    );
  }
}

export default Picture;
