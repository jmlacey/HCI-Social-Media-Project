import React from "react";

export default class Buddy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //FOR NOW WE ARE STORING THE BUDDY NAME IN USER ROLE. It will be an id.
      //326 is Wagz1 user id, for testing
      buddyID: "",
      buddyName: "",
    };
  }

  componentDidMount() {
    this.loadBuddy();
  }

  loadBuddy() {
    //Getting the buddy indo
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
          this.setState({
            buddyID: result.users[0].user_role,
          });
          this.IDToUserName();
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

  render() {
    return (
      <div>
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

        <p>Your sleep buddy is {this.state.buddyName}</p>
      </div>
    );
  }
}
