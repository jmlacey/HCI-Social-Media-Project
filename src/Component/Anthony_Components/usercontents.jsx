import React from "react";

export default class User extends React.Component {
  //copy and paste from profile.js
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      //removed fields that dont exist
    };
    this.fieldChangeHandler.bind(this);
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value,
    });
  }

  prefChangeHandler(field, e) {
    console.log("pref field change " + field);
    console.log(this.state.favoirtecolor);
    const prefs1 = JSON.parse(JSON.stringify(this.state.favoritecolor));
    console.log(prefs1);
    prefs1.pref_value = e.target.value;
    console.log(prefs1);

    this.setState({
      [field]: prefs1,
    });
  }

  componentDidMount() {
    //make the api call to the user API to get the user with all of their attached preferences
    fetch("http://stark.cse.buffalo.edu/hci/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getCompleteUsers",
        user_id: this.props.userid,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.users) {
            console.log(result.users);
            let favoritecolor = "";

            // read the user preferences and convert to an associative array for reference

            result.users[0]["user_prefs"].forEach(function (pref) {
              if (pref.pref_name === "FavoriteColor") {
                favoritecolor = pref;
              }
            });

            console.log(favoritecolor);

            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.users[0].username || "",
              firstname: result.users[0].first_name || "",
              lastname: result.users[0].last_name || "",
              favoritecolor: favoritecolor,
            });
          }
        },
        (error) => {
          alert("error!");
        }
      );
  }

  submitHandler = (event) => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the user controller
    fetch("http://stark.cse.buffalo.edu/cse410/reactioneers/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUsers",
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        mode: "ignorenull",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            responseMessage: result.Status,
          });
        },
        (error) => {
          alert("error!");
        }
      );

    //make the api call to the user prefs controller
    fetch("http://stark.cse.buffalo.edu/cse410/reactioneers/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        artifacttype: "sleepTime",
        artifacttype: "wakeTime",
        artifacttype: "timeZone",
        userid: sessionStorage.getItem("user"),
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            responseMessage: result.Status,
          });
        },
        (error) => {
          alert("error!");
        }
      );
  };
  //end of copy and paste from profile.js

  render() {
    return (
      <div>
        <p>Username : {this.state.username}</p>
        <p>Firstname : {this.state.firstname}</p>
        <p>Lastname : {this.state.lastname}</p>
        <p>Sleep Time: {this.state.sleepTime} </p>
        <p>Wake Time: {this.state.wakeTime} </p>
        <p>Time Zone: </p>

        {/* <p>Favorite Color : {this.state.favoritecolor.pref_value}</p> */}
      </div>
    );
  }
}
