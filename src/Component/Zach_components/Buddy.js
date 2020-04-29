import React from "react";

export default class Buddy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //FOR NOW WE ARE STORING THE BUDDY NAME IN USER ROLE. It will be an id.
      //326 is Wagz1 user id, for testing
      alreadyHitButtonToday: false,
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

      activated: "",
      activatedID: "",
      timeToWakeUp: false,

      testDate: "",
    };
  }

  componentDidMount() {
    this.loadInfo();
  }

  updateTime() {
    this.setState({ time: new Date() });

    //Testing
    this.setState({ testDate: this.state.time.toLocaleDateString() });

    //If the time is before 10, do something. Else, do something else.
    let minutesString = this.state.time.toTimeString();
    if (minutesString.charAt(7) != " ") {
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
            wakeTime: wakeTime,
            wakeTimeId: wakeTimeId,
            timeZone: timeZone,
            timeZoneId: timeZoneId,
            lastHitButton: lastTimeWokeUp,
            lastHitButtonID: lastTimeWokeUpID,
            activated: sleepCycleActivated,
            activatedID: sleepCycleActivatedID,
          });

          if (this.state.time.toLocaleDateString() == lastTimeWokeUp) {
            this.setState({ alreadyHitButtonToday: true });
          }

          this.IDToUserName();
          this.getwakeTimeMinutes();
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
  renderNotActivated = () => {
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
            onClick={this.buttonSubmit()}
          ></input>
        </p>
      </div>
    );
  };

  renderActivated = () => {
    return (
      <div>
        <p>The current time is: {this.state.time.toLocaleTimeString()} </p>
        {this.state.timeToWakeUp
          ? this.renderWakeUpGame()
          : this.dontRenderWakeUpGame()}
      </div>
    );
  };

  renderWakeUpGame = () => {
    if (this.state.alreadyHitButtonToday) {
      return (
        <div>
          <p>You already hit the button today! Come back tomorrow!</p>
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
            onClick={this.buttonSubmit()}
          ></input>
        </div>
      );
    }
  };

  dontRenderWakeUpGame = () => {
    return (
      <div>
        <p>
          Your wakeup cycle has been activated! When it is time to wake up, you
          will have 10 minutes to finish the game and get your points!
        </p>
      </div>
    );
  };

  dontHaveSleepCycleSetUp = () => {
    return (
      <div>
        <p>
          Looks like you havent set up a sleep cycle yet! Set one here and begin
          your new lifestyle!
        </p>
        <input
          type="time"
          name="time"
          onChange={this.wakeTimeChangeHandler}
          value={this.state.wakeTime}
        ></input>
      </div>
    );
  };

  buttonSubmit() {
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
          prefname: "lastWokeUp",
          prefvalue: this.state.wakeTime,
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
  }

  render() {
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

    return (
      <div>
        <p>Your sleep buddy is {this.state.buddyName}</p>

        {this.state.activated != "true"
          ? this.renderNotActivated()
          : this.renderActivated()}
      </div>
    );
  }
}
