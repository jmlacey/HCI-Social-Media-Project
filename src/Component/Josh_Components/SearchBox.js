import React from "react";

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.friend = [
      "Zach",
      "Anthony",
      "Josh",
      "Ousman",
      "Jessica",
      "Albert",
      "Omar",
      "Zane",
      "John",
      "Alex",
      "Jeff"
    ];

    //Something about state, which is a property special to react
    this.state = {
      suggestions: [],
      text: ""
    };
  }

  onTextChanged = e => {
    const value = e.target.value;

    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.friend.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(friend => (
          <li>{friend}</li>
        ))}
      </ul>
    );
  }

  //e means event
  render() {
    const { text } = this.state;
    return (
      <div>
        <input value={text} onChange={this.onTextChanged} type="text" />
        {this.renderSuggestions()}
      </div>
    );
  }
}
