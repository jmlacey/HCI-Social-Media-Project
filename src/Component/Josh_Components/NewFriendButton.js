import React from "react";
import "../../App.css";

export default class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      connectionID: "",
      typingMessage: "",
      submitMessage: "",

      userid: props.userid,
      connections: [],
    };
  }
  userNameToID() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "POST",
        body: JSON.stringify({
          action: "getUsers",
          username: this.state.userName,
        }),
      }
    )
      .then((response) => response.json())
      .then(
        (response) => {
          this.setState({
            connectionID:
              response.users.length > 0 ? response.users[0].user_id : "",
          });

          if (this.state.connectionID !== "") {
            alert("Adding the friend! Lets GOOOOO");
            this.addFriend();
          } else {
            alert("Not a valid user!");
          }
        },
        (error) => {
          alert("error!");
        }
      );
  }
  //copy of above method, but for use with deletion of friends
  userNameToID2() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "POST",
        body: JSON.stringify({
          action: "getUsers",
          connectionid: "34",
          username: this.state.userName,
        }),
      }
    )
      .then((response) => response.json())
      .then(
        (response) => {
          this.setState({
            connectionID:
              response.users.length > 0 ? response.users[0].user_id : "",
          });

          if (this.state.connectionID !== "") {
            alert("Deleting friend, lets goo");
            this.deletefriend();
          } else {
            alert("Not a valid user!");
          }
        },
        (error) => {
          alert("error!");
        }
      );
  }

  addFriend() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "POST",
        body: JSON.stringify({
          action: "addOrEditConnections",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          connectuserid: this.state.connectionID,
          connectionstatus: "pending",
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        alert(
          "Added " +
            this.state.userName +
            " AKA " +
            this.state.connectionID +
            " to your friends list! Hooray!"
        );
        this.setState({
          submitMessage: response.Status,
        });
      });
  }

  addFriendButton = (event) => {
    event.preventDefault();
    this.userNameToID();
  };

  //simple api call for deleting friend
  deletefriend() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "deleteConnections",
          user_id: this.state.userid,
          session_token: sessionStorage.getItem("token"),
          connectuserid: this.state.connectionID,
        }),
      }
    );
  }

  //for deleting friends
  deleteFriendButton = (event) => {
    event.preventDefault();
    this.userNameToID2();
  };

  changeInputState = (event) => {
    this.setState({ userName: event.target.value });

    if (event.target.value === "") {
      this.setState({ typingMessage: "" });
    } else {
      this.setState({
        typingMessage: "Add " + event.target.value + " to your friends list!",
      });
    }
  };
  //change input but for deletion of friends
  changeInputState2 = (event) => {
    this.setState({ userName: event.target.value });

    if (event.target.value === "") {
      this.setState({ typingMessage: "" });
    } else {
      this.setState({
        typingMessage:
          "Delete " + event.target.value + " from your friends list!",
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.addFriendButton}>
          <h1>{this.state.typingMessage}</h1>
          <input
            type="text"
            placeholder="Enter a name to add here!"
            onChange={this.changeInputState}
          />
          <input type="submit" className="element_link" value="Add Friend!" />
        </form>
        <form onSubmit={this.deleteFriendButton}>
          <input
            type="text"
            placeholder="Enter the friends username that you want to delete here!"
            onChange={this.changeInputState2}
          />
          <input
            type="submit"
            className="element_link"
            value="Delete Friend!"
          />
        </form>
      </div>
    );
  }
}
