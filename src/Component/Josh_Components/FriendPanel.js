import React from "react";

export default class FriendPanel extends React.Component {
  // eslint-disable-next-line
  constructor() {
    super();

    this.state = {
      friends: [
        { name: "Joshua", image: document.getAttribute("src") },
        { name: "Joshua", image: document.getAttribute("src") },
        { name: "Joshua", image: document.getAttribute("src") },
        { name: "Joshua", image: document.getAttribute("src") },
        { name: "Joshua", image: document.getAttribute("src") }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>My friends:</h1>
        <br />

        {this.state.friends.map(name => (
          <span key={name}>{name}</span>
        ))}
      </div>
    );
  }
}