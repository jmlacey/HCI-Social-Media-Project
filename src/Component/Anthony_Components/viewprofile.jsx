import React from "react";

export default class View extends React.Component {
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
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getCompleteUsers",
          user_id: sessionStorage.getItem("user")
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
            // try and make the form component uncontrolled, which plays havoc with react
            username: result.users[0].username || "",
            firstname: result.users[0].first_name || "",
            lastname: result.users[0].last_name || ""
          });
        },
        (error) => {
          alert("error!");
        }
      );
  }

  submitHandler = (event) => {
    //keep the form from actually submitting
    event.preventDefault();
  }

  render() {
    return (
      <div className="profileFormDiv">
        <p>Username : {this.state.username}</p>
        <p>Firstname : {this.state.firstname}</p>
        <p>Lastname : {this.state.lastname}</p>
        <p>Sleep Time: {this.state.sleepTime} </p>
        <p>Wake Time: {this.state.wakeTime} </p>
        <p>Time Zone: </p>

        <button className="profileButton rightCol1" onClick={this.props.action}>
          {" "}
          Edit{" "}
        </button>
      </div>
    );
  }
}
