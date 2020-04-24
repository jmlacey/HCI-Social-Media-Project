import React, { Component } from "react";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      testArtifact: "",
    };
  }

  componentDidMount() {
    //Make a fetch call that grabs the three states and fills in the text boxes.

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getCompleteUsers",
          userid: sessionStorage.getItem("user"),
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
            // try and make the form component uncontrolled, which plays havoc with react
            userName: result.users[0].username || "",
            firstName: result.users[0].first_name || "",
            lastName: result.users[0].last_name || "",
          });
        },
        (error) => {
          alert("error!");
        }
      );
  }

  submitHandler = (event) => {
    //prevents from from actually submitting
    event.preventDefault();
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
          name: this.state.userName,
          mode: "ignorenulls",
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.message);
        },
        (error) => {
          alert("CURSES! FOILED AGAIN!");
        }
      );
    /*
      fetch(
        "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
        {
          method: "post",
          body: JSON.stringify({
  
            //API FIELDS
            action: "addOrEditUserPrefs",
            user_id: sessionStorage.getItem("user"),
            userid: sessionStorage.getItem("user"),
            session_token: sessionStorage.getItem("token"),
            prefname: "testPref",
            prefvalue: this.state.testArtifact, 
            
  
          }),}).then((res) => res.json()).then((result) => {
  
  
          //DO WHATEVER YOU WANT WITH THE JSON HERE
  
  
        },(error) => {alert("error!");});
        */
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

          <input
            type="text"
            placeholder="Enter anything. ANYTHING YOU WANT:"
            onChange={this.artifactsChangeHandler}
            value={this.state.testArtifact}
          ></input>

          <input type="submit" value="Save"></input>
        </form>
      </div>
    );
  }
}

export default UserProfile;
