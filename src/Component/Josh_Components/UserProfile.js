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
    // alert("WELCOME TO THE PROFILE PAGE");
    // fetch("http://stark.cse.buffalo.edu/cse410/reactioneers/usercontroller.php", {
    //   method: "post",
    //   body: JSON.stringify({
    //     action: "getCompleteUsers",
    //     user_id: this.props.userid
    //   })
    // })
    //   .then(res => res.json())
    //   .then(
    //     result => {
    //       this.setState({
    //         // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
    //         // try and make the form component uncontrolled, which plays havoc with react
    //         userName: result.users[0].username || "",
    //         firstName: result.users[0].first_name || "",
    //         lastName: result.users[0].last_name || "",
    //       });
    //     },
    //     error => {
    //       alert("error!");
    //     }
    //   );
  }

  submitHandler = (event) => {
    alert("OH BOI YOU HIT THE SUBMIT BUTTON");

    //prevents from from actually submitting
    event.preventDefault();

    alert("user_id is: " + sessionStorage.getItem("user"));
    alert("session_token is: " + sessionStorage.getItem("token"));

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUsers",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          username: this.state.userName,
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          mode: "ignorenulls",
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          alert("check postman");
          console.log(result.message);
        },
        (error) => {
          alert("CURSES! FOILED AGAIN!");
        }
      );
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
