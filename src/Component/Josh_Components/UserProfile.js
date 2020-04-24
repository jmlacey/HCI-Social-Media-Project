import React, { Component } from "react";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      wakeTime: "",
      timeZone: ""
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

          let wakeTime = "";
          result.users[0]["user_prefs"].forEach(function (pref1) {
            if (pref1.pref_name === "WakeTime") {
              wakeTime = pref1;
            }
          });

          let timeZone = "";
          result.users[0]["user_prefs"].forEach(function (pref2) {
            if (pref2.pref_name === "TimeZone") {
              timeZone = pref2;
            }
          });
          this.setState({
            // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
            // try and make the form component uncontrolled, which plays havoc with react
            userName: result.users[0].username || "",
            firstName: result.users[0].first_name || "",
            lastName: result.users[0].last_name || "",
            wakeTime: wakeTime,
            timeZone: timeZone
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
      })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.message);
        },
        (error) => {
          alert("CURSES! FOILED AGAIN!");
        }
      );

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserPrefs",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          prefid: this.state.wakeTime.pref_id,
          prefname: "WakeTime",
          prefvalue: this.state.wakeTime.pref_value
        }),
      })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.message);

        },
        (error) => {
          alert("CURSES! FOILED AGAIN!");
        }
      );

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserPrefs",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          prefid: this.state.timeZone.pref_id,
          prefname: "TimeZone",
          prefvalue: this.state.timeZone.pref_value
        }),
      })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.message);
        },
        (error) => {
          alert("CURSES! FOILED AGAIN!");
        }
      );
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

  wakeTimeChangeHandler = (event) => {
    const prefs1 = JSON.parse(JSON.stringify(this.state.wakeTime));
    prefs1.pref_value = event.target.value;
    this.setState({
      wakeTime: prefs1,
    });
  };

  timeZoneChangeHandler = (event) => {
    const prefs1 = JSON.parse(JSON.stringify(this.state.timeZone));
    prefs1.pref_value = event.target.value;
    this.setState({
      timeZone: prefs1,
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

          <label for="fname">Wake Up Time</label>
          <input
            type="text"
            placeholder="Wake Time"
            onChange={this.wakeTimeChangeHandler}
            value={this.state.wakeTime
              ? this.state.wakeTime.pref_value
              : ""}
          ></input>

          <label for="fname">Time Zone</label>
          <input
            type="text"
            placeholder="Time Zone"
            onChange={this.timeZoneChangeHandler}
            value={this.state.timeZone
              ? this.state.timeZone.pref_value
              : ""
            }
          ></input>


          <input type="submit" value="Save"></input>
        </form>
      </div>
    );
  }
}

export default UserProfile;
