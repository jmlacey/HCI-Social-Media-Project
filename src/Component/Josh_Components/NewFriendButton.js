import React from "react";
import "../../App.css";

export default class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      connectionID: "",
      idForDelete: "",
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

  addFriend() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "POST",
        body: JSON.stringify({
          action: "addOrEditConnections",
          user_id: sessionStorage.getItem("user"), //always me
          userid: this.state.connectionID,
          session_token: sessionStorage.getItem("token"),
          connectuserid: sessionStorage.getItem("user"),
          connectionstatus: "pending",
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        alert(
          "Sent " +
            this.state.userName +
            " AKA " +
            this.state.connectionID +
            " an invitation! Hooray!"
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
      </div>
    );
  }
}
