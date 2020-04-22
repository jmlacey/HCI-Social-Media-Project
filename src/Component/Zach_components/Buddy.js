import React from "react";

export default class Buddy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testFriendID: "",
    };
  }
  state = {};

  componentDidMount() {}

  testTypeFriend = (event) => {
    this.setState({
      testFriendUserName: event.target.value,
    });
  };
  testAddFriend = (event) => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "addOrEditConnections",
          session_token: sessionStorage.getItem("token"),
          user_id: sessionStorage.getItem("user"),
          userid: sessionStorage.getItem("user"),
          connectuserid: this.state.testFriendID,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //DO WHATEVER YOU WANT WITH THE JSON HERE
          alert("did it work?");
        },
        (error) => {
          alert("error!");
        }
      );

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "addOrEditConnections",
          session_token: sessionStorage.getItem("token"),
          user_id: sessionStorage.getItem("user"),
          connectuserid: sessionStorage.getItem("user"),
          userid: this.state.testFriendID,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //DO WHATEVER YOU WANT WITH THE JSON HERE
          alert("yeee it worked!");
        },
        (error) => {
          alert("error!");
        }
      );
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="type test friend ID here"
          onChange={this.testTypeFriend}
        ></input>

        <input
          type="submit"
          value="Test Add Friend"
          onClick={this.testAddFriend}
        ></input>
      </div>
    );
  }
}
