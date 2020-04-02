import React, { Component } from "react";
// import Avatar from "react-avatar";
import pic from "./sleepicon.png";

class Picture extends Component {
  state = {};
  render() {
    return (
      <div className="avatar">
        {/* <Avatar img src={pic} size="200" round={true} /> */}
        <button className="avatarButton"> Change Picture </button>
      </div>
    );
  }
}

export default Picture;
