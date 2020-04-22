import React, { Component } from "react";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {

    
    };
  }

  componentDidMount() {

  }

  submitHandler = (event) => {
  
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

  artifactsChangeHandler = (event) => {
    this.setState({
      testArtifact: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label for="fname">username</label>
          <input
            type="text"
            placeholder="Username"
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
            placeholder="Last Name"
            onChange={this.lastNameChangeHandler}
            value={this.state.lastName}
          ></input>


          <input type="submit" value="Save"></input>
        </form>
      </div>
    );
  }
}

export default UserProfile;
