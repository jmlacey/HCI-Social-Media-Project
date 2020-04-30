import React from "react";

export default class Buddy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //FOR NOW WE ARE STORING THE BUDDY NAME IN USER ROLE. It will be an id.
      //326 is Wagz1 user id, for testing
      lastHitButton: "",
      lastHitButtonID: "",

      buddyID: "",
      buddyName: "",
      wakeTime: "",
      wakeTimeMinutes: -1,
      wakeTimeId: "",
      timeZone: "",
      timeZoneId: "",

      time: new Date(),
      timeMinutes: "",
      //Compare this to see if the user has already pressed the button today.
      currentDate: "",

      activated: "",
      activatedID: "",
      timeToWakeUp: false,

      yourSleepyPoints: "",
      theirSleepyPoints: "",

      theirWakeTimeID: "",
      theirSleepCycleActivatedID: "",
    };
    this.activateIt = this.activateIt.bind(this);
    this.deactivateIt = this.deactivateIt.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
  }

  componentDidMount() {
    this.loadInfo();

    this.setState({ time: new Date() });

    let day = this.state.time.getDate();
    let month = this.state.time.getMonth() + 1;
    let year = this.state.time.getFullYear();
    this.setState({ currentDate: day + "-" + month + "-" + year });
  }

  updateTime() {
    this.setState({ time: new Date() });

    //If the time is before 10, do something. Else, do something else.
    let minutesString = this.state.time.toTimeString();
    if (minutesString.charAt(7) !== " ") {
      let minutesInt =
        (parseInt(minutesString.charAt(0)) * 10 +
          parseInt(minutesString.charAt(1))) *
          60 +
        (parseInt(minutesString.charAt(3)) * 10 +
          parseInt(minutesString.charAt(4)));
      this.setState({ timeMinutes: minutesInt });
    } else {
      let minutesInt =
        parseInt(minutesString.charAt(0)) * 60 +
        (parseInt(minutesString.charAt(2)) * 10 +
          parseInt(minutesString.charAt(3)));
      this.setState({ timeMinutes: minutesInt });
    }
  }

  checkIfItsTimeToWakeUp() {
    if (
      this.state.timeMinutes >= this.state.wakeTimeMinutes &&
      this.state.timeMinutes < this.state.wakeTimeMinutes + 10
    ) {
      this.setState({ timeToWakeUp: true });
      console.log("TIME TO WAKE UP!");
      //alert("TIME TO WAKE UP!");
    } else {
      this.setState({ timeToWakeUp: false });
      console.log("NOT TIME TO WAKE UP!");
      //alert("NOT TIME TO WAKE UP!");
    }
  }

  componentWillMount() {
    setInterval(() => this.updateTime(), 1000);
    setInterval(() => this.checkIfItsTimeToWakeUp(), 1000);
  }

  loadInfo() {
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
          let wakeTimeId = "";
          result.users[0]["user_prefs"].forEach(function (pref1) {
            if (pref1.pref_name === "WakeTime") {
              wakeTime = pref1.pref_value;
              wakeTimeId = pref1.pref_id;
            }
          });

          let timeZone = "";
          let timeZoneId = "";
          result.users[0]["user_prefs"].forEach(function (pref2) {
            if (pref2.pref_name === "TimeZone") {
              timeZone = pref2.pref_value;
              timeZoneId = pref2.pref_id;
            }
          });

          let lastTimeWokeUp = "";
          let lastTimeWokeUpID = "";
          result.users[0]["user_prefs"].forEach(function (pref3) {
            if (pref3.pref_name === "lastWokeUp") {
              lastTimeWokeUp = pref3.pref_value;
              lastTimeWokeUpID = pref3.pref_id;
            }
          });

          let sleepCycleActivated = "";
          let sleepCycleActivatedID = "";
          result.users[0]["user_prefs"].forEach(function (pref4) {
            if (pref4.pref_name === "SleepCycleActivated") {
              sleepCycleActivated = pref4.pref_value;
              sleepCycleActivatedID = pref4.pref_id;
            }
          });

          this.setState({
            // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
            // try and make the form component uncontrolled, which plays havoc with react
            buddyID: result.users[0].user_role || "",
            yourSleepyPoints: result.users[0].status || "",
            wakeTime: wakeTime || "",
            wakeTimeId: wakeTimeId || "",
            timeZone: timeZone || "",
            timeZoneId: timeZoneId || "",
            lastHitButton: lastTimeWokeUp || "",
            lastHitButtonID: lastTimeWokeUpID || "",
            activated: sleepCycleActivated || "",
            activatedID: sleepCycleActivatedID || "",
          });

          this.IDToUserName();
          this.getwakeTimeMinutes();

          //Embedded getcompleteusers call!
          fetch(
            "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "getCompleteUsers",
                userid: this.state.buddyID,
              }),
            }
          )
            .then((res) => res.json())
            .then(
              (result) => {
                let buddywakeTime = "";
                let buddywakeTimeId = "";
                result.users[0]["user_prefs"].forEach(function (pref100) {
                  if (pref100.pref_name === "WakeTime") {
                    buddywakeTime = pref100.pref_value;
                    buddywakeTimeId = pref100.pref_id;
                  }
                });

                let buddyWakeTimeActivated = "";
                let buddyWakeTimeActivatedID = "";
                result.users[0]["user_prefs"].forEach(function (pref1001) {
                  if (pref1001.pref_name === "SleepCycleActivated") {
                    buddyWakeTimeActivated = pref1001.pref_value;
                    buddyWakeTimeActivatedID = pref1001.pref_id;
                  }
                });

                this.setState({
                  theirWakeTimeID: buddywakeTimeId || "",
                  theirSleepCycleActivatedID: buddyWakeTimeActivatedID || "",
                });
              },
              (error) => {
                alert("error!");
              }
            );
        },
        (error) => {
          alert("error!");
        }
      );
  }

  IDToUserName = () => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getUsers",
          userid: this.state.buddyID,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ buddyName: result.users[0].name });
        },
        (error) => {
          alert("error!");
        }
      );
  };

  wakeTimeChangeHandler = (event) => {
    let x = event.target;
    console.log("this is wake time" + x);
    this.setState({
      wakeTime: x.value,
    });
  };

  getwakeTimeMinutes() {
    let minutes =
      (parseInt(this.state.wakeTime.charAt(0)) * 10 +
        parseInt(this.state.wakeTime.charAt(1))) *
        60 +
      (parseInt(this.state.wakeTime.charAt(3)) * 10 +
        parseInt(this.state.wakeTime.charAt(4)));

    this.setState({ wakeTimeMinutes: minutes });
  }

  testAssignBuddy = () => {
    alert("Doing it!");
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "addOrEditUsers",
          user_id: sessionStorage.getItem("user"),
          userid: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userrole: this.state.buddyID,
        }),
      }
    );

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "addOrEditUsers",
          user_id: sessionStorage.getItem("user"),
          userid: this.state.buddyID,
          session_token: sessionStorage.getItem("token"),
          userrole: sessionStorage.getItem("user"),
        }),
      }
    );
    this.IDToUserName();
    alert("Did it!");
  };

  testBuddyChangeHandler = (event) => {
    this.setState({
      buddyID: event.target.value,
    });
  };

  //THE RENDER METHODS
  renderNotActivated() {
    return (
      <div>
        <p>
          Your sleep cycle has not been activated. Set a wakeup time and hit the
          button below to start!
        </p>
        <p>
          Your wakeup time:
          <input
            type="time"
            name="time"
            onChange={this.wakeTimeChangeHandler}
            value={this.state.wakeTime}
          ></input>
        </p>
        <p>
          <input
            type="submit"
            value="Activate!"
            onClick={this.activateIt}
          ></input>
        </p>
      </div>
    );
  }

  renderActivated() {
    return (
      <div>
        <p>The current time is: {this.state.time.toLocaleTimeString()} </p>
        <p>
          And your wakeup time is: {this.state.wakeTime} (24 hour time format)
        </p>
        {this.state.timeToWakeUp
          ? this.renderWakeUpGame()
          : this.dontRenderWakeUpGame()}
        <input
          type="submit"
          value="Deactivate Sleep Cycle"
          onClick={this.deactivateIt}
        ></input>
      </div>
    );
  }

  renderWakeUpGame() {
    if (this.state.lastHitButton === this.state.currentDate) {
      return (
        <div>
          <p>
            Congrats! You got your points for today! Come back tomorrow to get
            more!
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>YOU WOKE UP! You are woke.</p>
          <p>
            If you press this button, you and your sleep buddy will get 10
            points!
          </p>
          <input
            type="submit"
            value="I WOKE UP!"
            onClick={this.buttonSubmit}
          ></input>
        </div>
      );
    }
  }

  dontRenderWakeUpGame() {
    return (
      <div>
        <p>
          Your wakeup cycle has been activated! When it is time to wake up, you
          will have 10 minutes to finish the game and get your points!
        </p>
      </div>
    );
  }

  buttonSubmit() {
    //Updating the lastHitButton pref
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserPrefs",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          prefid: this.state.lastHitButtonID,
          prefname: "lastWokeUp",
          prefvalue: this.state.currentDate,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.message);
          this.setState({
            lastHitButton: this.state.currentDate,
          });
        },
        (error) => {
          alert("CURSES! FOILED AGAIN!");
        }
      );

    //Incrementing the sleep points of the user
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getUsers",
          userid: sessionStorage.getItem("user"),
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ yourSleepyPoints: result.users[0].status || "" });
          this.setState({
            yourSleepyPoints: parseInt(this.state.yourSleepyPoints) + 1,
          });

          fetch(
            "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "addOrEditUsers",
                user_id: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                userid: sessionStorage.getItem("user"),
                status: parseInt(this.state.yourSleepyPoints),
              }),
            }
          );
        },
        (error) => {
          alert("error!");
        }
      );

    alert(this.state.buddyID);

    //Incrementing the sleep points of the user's sleep buddy
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getUsers",
          userid: this.state.buddyID,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ theirSleepyPoints: result.users[0].status || "" });
          this.setState({
            theirSleepyPoints: parseInt(this.state.theirSleepyPoints) + 1,
          });

          alert(sessionStorage.getItem("user"));
          alert(this.state.theirSleepyPoints);
          alert(sessionStorage.getItem("token"));

          fetch(
            "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "addOrEditUsers",
                user_id: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                userid: this.state.buddyID,
                status: this.state.theirSleepyPoints,
              }),
            }
          );
        },
        (error) => {
          alert("error!");
        }
      );
  }

  activateIt() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserPrefs",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          prefid: this.state.activatedID,
          prefname: "SleepCycleActivated",
          prefvalue: "true",
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ activated: "true" });
        },
        (error) => {
          alert("CURSES! FOILED AGAIN!");
        }
      );

    //Submit the wake time.
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserPrefs",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          prefid: this.state.wakeTimeId,
          prefname: "WakeTime",
          prefvalue: this.state.wakeTime,
        }),
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
          userid: this.state.buddyID,
          prefid: this.state.theirWakeTimeID,
          prefname: "WakeTime",
          prefvalue: this.state.wakeTime,
        }),
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
          userid: this.state.buddyID,
          prefid: this.state.theirSleepCycleActivatedID,
          prefname: "SleepCycleActivated",
          prefvalue: "true",
        }),
      }
    );
  }

  deactivateIt() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserPrefs",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          prefid: this.state.activatedID,
          prefname: "SleepCycleActivated",
          prefvalue: "false",
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ activated: "false" });
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
          userid: this.state.buddyID,
          prefid: this.state.theirSleepCycleActivatedID,
          prefname: "SleepCycleActivated",
          prefvalue: "false",
        }),
      }
    );
  }

  renderSleepBuddyExists() {
    return (
      <div>
        <p>Your sleep buddy is {this.state.buddyName}</p>

        {this.state.activated !== "true"
          ? this.renderNotActivated()
          : this.renderActivated()}
      </div>
    );
  }

  renderSleepBuddyDoesNotExist() {
    return <p>You dont have a sleep buddy!</p>;
  }

  render() {
    return (
      <div>
        {false
          ? this.renderSleepBuddyExists()
          : this.renderSleepBuddyDoesNotExist()}
      </div>
    );
  }
}

/*
    <p>The time is: {this.state.time.toLocaleTimeString()} </p>
    <p>
      Your timezone is: {/\((.*)\)/.exec(this.state.time.toString())[1]}{" "}
    </p>
*/

/*
        <input
          type="text"
          placeholder="Test add buddy by id"
          onChange={this.testBuddyChangeHandler}
          value={this.state.email}
        ></input>
        <input
          type="submit"
          value="Do it!"
          onClick={this.testAssignBuddy}
        ></input>
*/
