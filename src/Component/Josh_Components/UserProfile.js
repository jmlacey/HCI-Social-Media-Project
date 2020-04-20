import React, { Component } from "react";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {
    //Make a fetch call that grabs the three states and fills in the text boxes.
    alert("WELCOME TO THE PROFILE PAGE");
  }

  submitHandler = (event) => {
    alert("OH BOI YOU HIT THE SUBMIT BUTTON");
    //Make a giant fetch call to update userName, firstName, lastName.
  };

  userNameChangeHandler = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  firstNameChangeHandler = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  lastNameChangeHandler = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label for="fname">username</label>
          <input
            type="text"
            placeholder="First Name"
            onChange={this.userNameChangeHandler}
            value={this.state.userName}
          ></input>

          <label for="fname">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            onChange={this.firstNameChangeHandler}
            value={this.state.firstName}
          ></input>

          <label for="fname">Last Name</label>
          <input
            type="text"
            placeholder="First Name"
            onChange={this.lastNameChangeHandler}
            value={this.state.lastName}
          ></input>

          <input type="submit" value="YES"></input>
        </form>
      </div>
    );
  }
}

export default UserProfile;
